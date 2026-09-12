import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import {
  createAnalysis,
  getUserAnalyses,
  getAnalysisById,
  canUserAnalyzeEssay,
  canUserAnalyzeUniversity,
  consumeEssayCredit,
  consumeUniversityCredit,
  getUserCredits,
  getUserPayments,
  generateFingerprint,
  canAnonymousAnalyze,
  createAnonymousAnalysis,
  createOrder,
  getUserOrders,
  findOrCreateGuestUserByEmail,
  consumePaidEssayCredit,
  getLatestAnonymousEssay,
  getLatestAnonymousUcas,
  getDeviceCredits,
  consumeDeviceCredit,
  addDeviceCredits,
  deleteAnonymousAnalysis,
  deleteUserAnalysis,
  updateAnonymousResult,
  setAnonymousUnlocked,
  markAnalysisUnlocked,
  consumeAnonymousRerun,
  createRerunAnalysis,
  refundAnonymousRerun,
  refundAnalysisRerun,
  consumeAnalysisRerun,
} from "./db";
import { checkUcasMechanics, buildUcasSystemPrompt, buildUcasUserPrompt, UCAS_TOTAL_CHAR_LIMIT, UCAS_MIN_CHARS_PER_ANSWER } from "../shared/ucas";
import { createLemonsqueezyCheckout } from "./lemonsqueezy/lemonsqueezy";
import { LEMONSQUEEZY_VARIANTS, PRODUCT_KEY_TO_LS_SKU } from "../shared/pricing";
import { randomUUID } from "crypto";
import { PRODUCTS } from "./products";
import { getRubric, buildRubricPromptFragment } from "../shared/rubrics";

const IB_SUBJECTS = [
  "Business Management", "Economics", "History", "Biology", "Chemistry",
  "Physics", "Mathematics", "English A: Language and Literature", "English A: Literature",
  "Psychology", "Computer Science", "Geography", "Visual Arts", "Music", "Film",
  "Environmental Systems and Societies", "Philosophy",
] as const;

const ESSAY_TYPES = ["IA", "EE", "TOK"] as const;

const productKeySchema = z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]);

/**
 * Build the system prompt for essay analysis.
 * Includes rubric-specific instructions when a rubric is available.
 */
function buildEssaySystemPrompt(essayType: string, subject: string, examSession?: string): string {
  const rubric = getRubric(essayType, subject, examSession);
  const rubricFragment = buildRubricPromptFragment(essayType, subject, examSession);

  let base = `You are an experienced IB examiner with 12 years of grading experience across multiple subjects. Analyze the student's work strictly according to IB assessment criteria. Be specific, constructive, and honest. Reference actual IB criteria names and descriptors.

IMPORTANT FORMATTING RULES:
- Respond with a single valid JSON object. No markdown, no text before or after the JSON.
- Write ALL text in plain text only. NEVER use HTML entities like &amp; &lt; &gt; &quot; — write the actual characters: & < > " instead.
- Do not use any HTML tags or HTML encoding in your response.`;

  if (rubricFragment) {
    base += "\n" + rubricFragment;
  } else {
    base += `\n\nNOTE: No official IB rubric is available for this specific (${essayType}, ${subject}) combination. Provide generic IB-style feedback. Make it clear in your overall_comment that this is generic feedback, not based on the official subject rubric.`;
  }

  return base;
}

/**
 * Build the user prompt for essay analysis.
 * Dynamically generates the expected JSON criteria structure from the rubric.
 */
function buildEssayUserPrompt(essayType: string, subject: string, researchQuestion: string | undefined, essayText: string, examSession?: string, reflections?: string): string {
  const rubric = getRubric(essayType, subject, examSession);

  let criteriaExample: string;
  if (rubric) {
    // Build criteria array from the rubric
    const criteriaEntries = rubric.criteria.map(c =>
      `    {"name": "${c.name}", "score": 0, "max": ${c.max}, "comment": "Specific feedback for this criterion"}`
    ).join(",\n");
    criteriaExample = `[\n${criteriaEntries}\n  ]`;
  } else {
    criteriaExample = `[
    {"name": "Criterion name", "score": 0, "max": 4, "comment": "Specific feedback for this criterion"}
  ]`;
  }

  // Criterion E of the Extended Essay is marked on the reflective statement (RPF
  // from May 2027, RPPF before it), not on the essay. Marking it from the essay
  // text invents a score; deducting for its absence charges the student for a
  // document this form did not ask for. Say which of the two situations we are in.
  const reflectionText = (reflections || "").trim();
  let reflectionBlock = "";
  if (essayType === "EE") {
    if (reflectionText) {
      reflectionBlock = `

REFLECTIVE STATEMENT (the student's ${examSession === "may2027" ? "RPF" : "RPPF"}, submitted separately from the essay):
${reflectionText.substring(0, 6000)}

Mark the reflection criterion on this statement alone, never on the essay text.`;
    } else {
      reflectionBlock = `

NO REFLECTIVE STATEMENT WAS SUBMITTED. The reflection criterion is marked on the ${examSession === "may2027" ? "RPF" : "RPPF"}, which is not part of this submission.
- Do not award a score for the reflection criterion and do not deduct marks for its absence.
- Return it in the criteria array with "score": null and a comment saying it was not assessed because the reflective statement was not submitted.
- "max_score" must be the sum of the maximum marks of the criteria you actually assessed, and "band_range" must be expressed on that same total.
- Do not list the missing reflective statement as a risk. The student was never asked for it.`;
    }
  }

  return `Analyze this IB ${essayType} for: ${subject}
Research Question: ${researchQuestion || "not provided"}

TEXT:
${essayText.substring(0, 30000)}${reflectionBlock}

Respond with this exact JSON structure:
{
  "band_range": "<range on the same total as max_score, e.g. 18-22>",
  "predicted_score": <integer>,
  "max_score": <total marks of the criteria you assessed>,
  "overall_comment": "Detailed overall assessment of the work",
  "criteria": ${criteriaExample},
  "risks": [
    {"title": "Risk title", "description": "What specifically loses marks and why"}
  ],
  "leverage_zones": [
    {"title": "Improvement area", "description": "Specific actionable advice to gain marks"}
  ],
  "next_steps": ["Specific step 1", "Specific step 2", "Specific step 3"]
}`;
}


/**
 * Server-side gate: the free tier returns a TEASER only. The full report
 * (exact score, all criteria, comments, fix lists) never leaves the server
 * until it is unlocked with a paid credit. Do not widen this shape.
 */
/**
 * A criterion is "not assessable from the pasted text" when it marks down a document the
 * submission form never asks for (the EE reflective form, RPF/RPPF). Showing that as the
 * free weakest-criterion sample burns the single demonstration slot on something the student
 * could not have supplied, so those criteria are skipped when picking the teaser sample.
 */
function isNotAssessableFromText(c: any): boolean {
  const name = String(c?.name || "").toLowerCase();
  const comment = String(c?.comment || "").toLowerCase();
  const isReflection = name.includes("reflection") || name.includes("engagement");
  if (!isReflection) return false;
  return /\brpf\b|\brppf\b|reflective (form|statement)|not (been )?(submitted|provided|included|attached)|no reflection|absence of (a )?reflect/.test(comment);
}

/** Same rule for risks: never bill a student for a document the form did not ask for. */
function isRiskAboutMissingReflection(r: any): boolean {
  const text = `${r?.title || ""} ${r?.description || ""}`.toLowerCase();
  if (!/\brpf\b|\brppf\b|reflect/.test(text)) return false;
  return /missing|not submitted|absence|no reflection|without a reflect|automatic 0|automatic zero/.test(text);
}

/** Cut at a sentence boundary where possible so the teaser reads as deliberate, not broken. */
function softTruncate(text: string, limit: number): string {
  if (typeof text !== "string" || text.length <= limit) return text;
  const window = text.slice(0, limit);
  const lastStop = Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? "));
  if (lastStop > limit * 0.5) return window.slice(0, lastStop + 1);
  return window.replace(/\s+\S*$/, "") + "\u2026";
}

/**
 * Free preview for a personal statement. The character arithmetic is given away in full — it is
 * factual, the applicant can verify it in the UCAS form anyway, and withholding it would just look
 * mean. What stays behind the unlock is the reading: two of the three answers and the statement-level
 * issues.
 */
function buildUcasTeaser(result: any) {
  const answers: any[] = Array.isArray(result?.answers) ? result.answers : [];
  const rank: Record<string, number> = { weak: 0, adequate: 1, strong: 2 };
  const sorted = [...answers].sort((a, b) => (rank[a?.status] ?? 1) - (rank[b?.status] ?? 1));
  const sample = sorted[0] || null;
  return {
    locked: true as const,
    format: "ucas_2026" as const,
    verdict: result?.verdict ?? null,
    verdict_reason: result?.verdict_reason ?? null,
    mechanics: result?._mechanics ?? null,
    course: result?._course ?? null,
    sample_answer: sample,
    other_answers: answers
      .filter((a) => a?.id !== sample?.id)
      .map((a) => ({ id: a?.id, status: a?.status })),
    statement_level_count: Array.isArray(result?.statement_level) ? result.statement_level.length : 0,
  };
}

function buildTeaser(result: any) {
  const criteria: any[] = Array.isArray(result?.criteria) ? result.criteria : [];
  const scored = criteria.filter((c) => typeof c?.score === "number" && c?.max > 0);
  const assessable = scored.filter((c) => !isNotAssessableFromText(c));
  const pool = assessable.length ? assessable : scored;
  let weakest = pool.length
    ? [...pool].sort((a, b) => a.score / a.max - b.score / b.max)[0]
    : null;
  // Holistic instruments have a single criterion whose comment IS the whole verdict —
  // truncate it in the teaser so the full reasoning stays behind the unlock.
  if (weakest && criteria.length === 1 && typeof weakest.comment === "string" && weakest.comment.length > 320) {
    weakest = { ...weakest, comment: softTruncate(weakest.comment, 320) };
  }
  let nearEdge: boolean | null = null;
  const m = String(result?.band_range || "").match(/(\d+)\s*[-\u2013\u2014]\s*(\d+)/);
  if (m && typeof result?.predicted_score === "number") {
    const lo = parseInt(m[1], 10);
    const hi = parseInt(m[2], 10);
    nearEdge = result.predicted_score <= lo || result.predicted_score >= hi;
  }
  // The model sometimes writes "14-18 out of 26" into band_range. The number of
  // marks it is out of is already max_score, so keep the range and drop the tail.
  const bandRange = typeof result?.band_range === "string"
    ? (result.band_range.match(/\d+\s*[-\u2013\u2014]\s*\d+|\d+/)?.[0] ?? result.band_range).trim()
    : result?.band_range ?? null;
  const risks = (Array.isArray(result?.risks) ? result.risks : [])
    .filter((r: any) => !isRiskAboutMissingReflection(r))
    .slice(0, 3)
    .map((r: any) => ({
    title: typeof r === "string" ? r : r?.title || "",
    description: typeof r === "string" ? "" : softTruncate(String(r?.description || ""), 280),
  }));
  return {
    locked: true as const,
    band_range: bandRange,
    max_score: result?.max_score ?? null,
    weakest_criterion: weakest,
    risks,
    criteria_names: criteria.map((c) => ({ name: c?.name, max: c?.max })),
    near_band_edge: nearEdge,
    criteria_count: criteria.length,
    _rubricAvailable: result?._rubricAvailable,
    _rubricLabel: result?._rubricLabel,
    _rubricTotalMarks: result?._rubricTotalMarks,
  };
}

// ---- Essay Analysis Router ----
const essayRouter = router({
  // Capture email of anonymous users who want their report + tips (remarketing list)
  saveReportEmail: publicProcedure
    .input(z.object({ email: z.string().email(), fingerprint: z.string().optional() }))
    .mutation(async ({ input }) => {
      await findOrCreateGuestUserByEmail(input.email.toLowerCase().trim());
      console.log(`[Report Email] captured for fp=${input.fingerprint || "n/a"}`);
      return { ok: true } as const;
    }),

  // Paid unlock of a previously generated (teaser-gated) report.
  unlockAnalysis: protectedProcedure
    .input(z.object({
      fingerprint: z.string().optional(),
      analysisId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (input.analysisId) {
        const rec = await getAnalysisById(input.analysisId, ctx.user.id);
        if (!rec || rec.userId !== ctx.user.id || !rec.resultJson) throw new Error("Report not found");
        if (!(rec as any).unlocked) {
          await consumePaidEssayCredit(ctx.user.id);
          await markAnalysisUnlocked(rec.id);
        }
        return { result: rec.resultJson };
      }
      if (input.fingerprint) {
        const rec = await getLatestAnonymousEssay(input.fingerprint);
        if (!rec || !rec.resultJson) throw new Error("No report found for this device");
        if (!(rec as any).unlocked) {
          await consumePaidEssayCredit(ctx.user.id);
          await setAnonymousUnlocked(rec.id);
          // Keep a copy in the user's dashboard history
          const copy = await createAnalysis({
            userId: ctx.user.id,
            type: "essay",
            essayType: rec.essayType,
            subject: rec.subject,
            researchQuestion: rec.researchQuestion,
            resultJson: rec.resultJson,
            predictedGrade: rec.predictedGrade,
            unlocked: true,
          });
          if (copy?.id) await markAnalysisUnlocked(copy.id);
        }
        return { result: rec.resultJson };
      }
      throw new Error("Nothing to unlock");
    }),

  // Lightweight status for the "you have a locked report" banner. Leaks no scores.
  // A paid report includes two free re-checks of the same draft within 14 days. Students revise
  // and want to know whether the fix landed; charging again for that is what pushes them to
  // a free chatbot instead.
  rerunAnalysis: protectedProcedure
    .input(z.object({
      analysisId: z.number(),
      essayText: z.string().min(300, "Paste at least 300 characters, roughly 50 words, or there is nothing to mark.").max(120000, "That is longer than any IB coursework. Paste the work itself, up to about 20,000 words."),
      reflections: z.string().max(8000).optional(),
      examSession: z.enum(["nov2026", "may2027"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const gate = await consumeAnalysisRerun(input.analysisId, ctx.user.id);
      if (!gate) throw new Error("Database unavailable");
      if (!gate.ok) throw new Error(gate.reason);
      const rec: any = gate.record;

      try {
        // The session comes from the report being re-checked. Taking it from the
        // form re-marked a November 2026 report on the May 2027 scale, and the
        // before/after comparison we sell then compared two different rubrics.
        const session = (rec.examSession as "nov2026" | "may2027" | null) ?? input.examSession;
        const systemPrompt = buildEssaySystemPrompt(rec.essayType, rec.subject, session);
        const userPrompt = buildEssayUserPrompt(rec.essayType, rec.subject, rec.researchQuestion || undefined, input.essayText, session, input.reflections);
        const startedAt = Date.now();
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });
        console.log(`[Timing] re-check answered in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");
        const result = JSON.parse(jsonMatch[0].replace(/,\s*([\]\}])/g, "$1"));
        const rubric = getRubric(rec.essayType, rec.subject, session);
        if (rubric) {
          result._rubricAvailable = true;
          result._rubricLabel = rubric.label;
          result._rubricTotalMarks = rubric.totalMarks;
        }

        const analysis = await createAnalysis({
          userId: ctx.user.id,
          type: "essay",
          essayType: rec.essayType,
          subject: rec.subject,
          researchQuestion: rec.researchQuestion,
          resultJson: result,
          predictedGrade: `${result.predicted_score}/${result.max_score}`,
          unlocked: true,
          rerunOf: rec.rerunOf ?? rec.id,
          examSession: rec.examSession ?? input.examSession ?? null,
        });
        if (analysis?.id) await markAnalysisUnlocked(analysis.id);

        const prev: any = rec.resultJson || {};
        return {
          id: analysis.id,
          result,
          rerunsLeft: gate.rerunsLeft,
          previous: {
            predicted_score: prev?.predicted_score ?? null,
            max_score: prev?.max_score ?? null,
            band_range: prev?.band_range ?? null,
          },
        };
      } catch (error: any) {
        // The student got nothing back, so the re-check they spent returns.
        await refundAnalysisRerun(input.analysisId).catch(() => {});
        throw new Error(error?.message || "Re-check failed. Please try again.");
      }
    }),

  /**
   * UCAS personal statement review (2026 entry format). Kept separate from the IB graders because
   * UCAS publishes no mark scheme: there is no score here, only evidence-based feedback, and the
   * character arithmetic is done in code rather than by the model.
   */
  analyzeUcasAnonymous: publicProcedure
    .input(z.object({
      course: z.string().min(2, "Tell us which course you are applying for.").max(120),
      universityType: z.enum(["typical", "competitive"]).default("typical"),
      q1: z.string().default(""),
      q2: z.string().default(""),
      q3: z.string().default(""),
      clientFingerprint: z.string().min(1),
      /** Explicitly buy this review with a credit the user already owns. */
      spendCredit: z.boolean().optional(),
      /** Or with a credit this device owns, bought without an account. */
      spendDeviceCredit: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const answers = { q1: input.q1, q2: input.q2, q3: input.q3 };
      const mechanics = checkUcasMechanics(answers);

      if (mechanics.totalChars < 200) {
        throw new Error("Please paste your draft answers first — there is not enough text to review.");
      }
      if (mechanics.totalChars > UCAS_TOTAL_CHAR_LIMIT + 2000) {
        throw new Error(`Your answers total ${mechanics.totalChars} characters. UCAS allows ${UCAS_TOTAL_CHAR_LIMIT}; trim the draft before reviewing it.`);
      }

      // A signed-in user with a paid credit gets the full review; everyone else gets the free
      // preview once per device. Telling someone who is already signed in to "sign in" was the
      // old behaviour and it read as a broken site.
      // Spending a credit has to be asked for. This procedure used to take one
      // from any signed-in user who had one, behind a button saying "free".
      const user = (ctx as any).user;
      let paidCredit = false;
      let paidByDevice = false;
      if (user && input.spendCredit) {
        const credits = await getUserCredits(user.id);
        paidCredit = (credits?.essayCredits ?? 0) > 0;
        if (!paidCredit) throw new TRPCError({ code: "FORBIDDEN", message: "No credit available. A full review is $9.99." });
      }

      if (!paidCredit) {
        const usage = await canAnonymousAnalyze(input.clientFingerprint, "ucas");
        if (!usage.allowed && input.spendDeviceCredit === true) {
          paidByDevice = await consumeDeviceCredit(input.clientFingerprint);
        }
        if (!usage.allowed && !paidByDevice) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: user
              ? "You have used your free review. Unlock a full review for $9.99 to continue."
              : "You have used your free review from this device. A full review is $9.99 — no account needed.",
          });
        }
      }
      const fingerprint = input.clientFingerprint;

      // Claim the free slot before the model is called: the check and the write
      // were eighty seconds apart, which is a free second review for anyone who
      // submits twice.
      const claim = (paidCredit || paidByDevice) ? null : await createAnonymousAnalysis({
        fingerprint,
        type: "essay",
        essayType: "UCAS",
        subject: input.course.slice(0, 100),
        researchQuestion: null,
        resultJson: null,
        predictedGrade: null,
      });

      try {
        const systemPrompt = buildUcasSystemPrompt(input.course, input.universityType);
        const userPrompt = buildUcasUserPrompt(input.course, answers, mechanics);
        const startedAt = Date.now();
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });
        console.log(`[Timing] LLM answered in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");
        const result = JSON.parse(jsonMatch[0].replace(/,\s*([\]\}])/g, "$1"));

        result._mechanics = mechanics;
        result._course = input.course;
        result._format = "ucas_2026";
        result._universityType = input.universityType;

        const paid = paidCredit || paidByDevice;
        let saved: any = null;
        if (claim?.id) {
          await updateAnonymousResult(claim.id, result, null);
          saved = { id: claim.id };
        } else {
          saved = await createAnonymousAnalysis({
            fingerprint,
            type: "essay",
            essayType: "UCAS",
            subject: input.course.slice(0, 100),
            researchQuestion: null,
            resultJson: result,
            predictedGrade: null,
            // A paid review is unlocked from the start. Without this it had no
            // re-checks, could not be reopened, and retention would delete it.
            unlocked: paid,
            unlockedAt: paid ? new Date() : null,
          });
        }

        if (paid) {
          if (paidCredit) await consumePaidEssayCredit(user.id);
          return { result, wasAnonymous: !paidCredit, unlocked: true as const, id: saved?.id };
        }
        return { result: buildUcasTeaser(result), wasAnonymous: true };
      } catch (error: any) {
        console.error("[UCAS PS Review] Error:", error);
        if (claim?.id) await deleteAnonymousAnalysis(claim.id).catch(() => {});
        if (paidByDevice) await addDeviceCredits(fingerprint, 1).catch(() => {});
        throw new Error(error.message || "Review failed. Please try again.");
      }
    }),

  /**
   * Two free re-checks of the same work within 14 days, for someone who bought
   * without an account. The authenticated path (rerunAnalysis) cannot serve them:
   * their report is an anonymous row, not a row on a user.
   */
  rerunAnonymous: publicProcedure
    .input(z.object({
      fingerprint: z.string().min(1),
      essayText: z.string().min(300).max(120000).optional(),
      reflections: z.string().max(8000).optional(),
      examSession: z.enum(["nov2026", "may2027"]).optional(),
      answers: z.object({ q1: z.string(), q2: z.string(), q3: z.string() }).optional(),
    }))
    .mutation(async ({ input }) => {
      const gate = await consumeAnonymousRerun(input.fingerprint, input.answers ? "ucas" : "essay");
      if (!gate.ok) throw new TRPCError({ code: "FORBIDDEN", message: gate.reason });
      const rec: any = gate.record;

      try {
        let systemPrompt: string;
        let userPrompt: string;
        let mechanics: any = null;

        if (rec.essayType === "UCAS") {
          if (!input.answers) throw new Error("Paste your revised answers to re-check them.");
          mechanics = checkUcasMechanics(input.answers);
          const course = String(rec.subject || "your course");
          // Keep the standard the first review was written against.
          const level = ((rec.resultJson as any)?._universityType === "competitive" ? "competitive" : "typical") as "typical" | "competitive";
          systemPrompt = buildUcasSystemPrompt(course, level);
          userPrompt = buildUcasUserPrompt(course, input.answers, mechanics);
        } else {
          if (!input.essayText) throw new Error("Paste your revised draft to re-check it.");
          const session = (rec.examSession as "nov2026" | "may2027" | null) ?? input.examSession;
          systemPrompt = buildEssaySystemPrompt(rec.essayType, rec.subject, session);
          userPrompt = buildEssayUserPrompt(rec.essayType, rec.subject, rec.researchQuestion || undefined, input.essayText, session, input.reflections);
        }

        const startedAt = Date.now();
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });
        console.log(`[Timing] re-check answered in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");
        const result = JSON.parse(jsonMatch[0].replace(/,\s*([\]\}])/g, "$1"));
        if (mechanics) {
          result._mechanics = mechanics;
          result._course = rec.subject;
          result._format = "ucas_2026";
        }

        // Keep the marker of whether real criteria were behind this, exactly as the
        // first run does, or the report silently loses its provenance badge.
        if (rec.essayType !== "UCAS") {
          const rubric = getRubric(rec.essayType, rec.subject, (rec.examSession as any) ?? input.examSession);
          result._rubricAvailable = !!rubric;
          result._rubricLabel = rubric?.label ?? null;
          result._rubricTotalMarks = rubric?.totalMarks ?? null;
        }

        await createRerunAnalysis(rec, result, result?.predicted_score != null ? String(result.predicted_score) : undefined);
        const prev: any = rec.resultJson || {};
        return {
          result,
          rerunsLeft: gate.rerunsLeft,
          previous: {
            predicted_score: prev?.predicted_score ?? null,
            max_score: prev?.max_score ?? null,
            band_range: prev?.band_range ?? null,
          },
        };
      } catch (error: any) {
        console.error("[Re-check] Error:", error);
        // The student got nothing, so the re-check they spent comes back.
        await refundAnonymousRerun(rec.id).catch(() => {});
        throw new Error(error.message || "Re-check failed. Please try again.");
      }
    }),

  /**
   * The full report for an anonymous device, returned only once the purchase has
   * unlocked it. This is how a guest reads what they paid for: they never sign in,
   * so the authenticated unlock path is closed to them.
   */
  /** Reports this device has already paid for and not yet spent. */
  deviceCredits: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1) }))
    .query(async ({ input }) => ({ credits: await getDeviceCredits(input.fingerprint) })),

  anonymousReport: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1), kind: z.enum(["essay", "ucas"]).optional() }))
    .query(async ({ input }) => {
      const rec: any = input.kind === "ucas"
        ? await getLatestAnonymousUcas(input.fingerprint)
        : await getLatestAnonymousEssay(input.fingerprint);
      if (!rec || !rec.resultJson || !rec.unlocked) return { unlocked: false as const };
      const started = rec.unlockedAt ? new Date(rec.unlockedAt).getTime() : new Date(rec.createdAt).getTime();
      const daysLeft = Math.max(0, 14 - (Date.now() - started) / 86400000);
      return {
        unlocked: true as const,
        result: rec.resultJson,
        rerunsLeft: Math.max(0, 2 - (rec.rerunsUsed ?? 0)),
        daysLeft: Math.floor(daysLeft),
      };
    }),

  lockedReport: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1) }))
    .query(async ({ input }) => {
      const rec = await getLatestAnonymousEssay(input.fingerprint);
      if (!rec || !rec.resultJson) return { exists: false as const };
      const rj: any = rec.resultJson;
      const unlocked = !!(rec as any).unlocked;
      return {
        exists: true as const,
        unlocked,
        essayType: rec.essayType,
        subject: rec.subject,
        band: rj?.band_range ?? null,
        // Whatever was already shown for free stays available — taking back a preview the
        // student has already read is the fastest way to lose their trust.
        preview: unlocked ? null : buildTeaser(rj),
      };
    }),

  // Anonymous analysis — no login required, 1 free analysis per fingerprint
  analyzeAnonymous: publicProcedure
    .input(z.object({
      essayType: z.enum(ESSAY_TYPES),
      subject: z.string().min(1),
      researchQuestion: z.string().optional(),
      essayText: z.string().min(300, "Paste at least 300 characters, roughly 50 words, or there is nothing to mark.").max(120000, "That is longer than any IB coursework. Paste the work itself, up to about 20,000 words."),
      reflections: z.string().max(8000).optional(),
      clientFingerprint: z.string().min(1),
      examSession: z.enum(["nov2026", "may2027"]).optional(),
      /** Spend a credit this device owns. Asked for explicitly, never assumed. */
      spendDeviceCredit: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      // Use client-provided fingerprint (UUID stored in localStorage)
      const fingerprint = input.clientFingerprint;

      // The free run, or a credit this device bought. Guests have no account to
      // hold credits, so a pack bought without one lives on the device.
      const usage = await canAnonymousAnalyze(fingerprint);
      let paidByDevice = false;
      if (!usage.allowed) {
        paidByDevice = input.spendDeviceCredit === true && await consumeDeviceCredit(fingerprint);
        if (!paidByDevice) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: usage.reason || "You have used your free analysis on this device.",
          });
        }
      }

      // Claim the free slot before the model is called, not after. The analysis
      // takes over a minute, and everything submitted inside that window used to
      // pass the check: two production devices already got two free runs each.
      const claim = paidByDevice ? null : await createAnonymousAnalysis({
        fingerprint,
        type: "essay",
        essayType: input.essayType,
        subject: input.subject,
        researchQuestion: input.researchQuestion || null,
        resultJson: null,
        predictedGrade: null,
        examSession: input.examSession ?? null,
      });

      const systemPrompt = buildEssaySystemPrompt(input.essayType, input.subject, input.examSession);
      const userPrompt = buildEssayUserPrompt(input.essayType, input.subject, input.researchQuestion, input.essayText, input.examSession, input.reflections);

      try {
        const startedAt = Date.now();
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        console.log(`[Timing] LLM answered in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");

        const cleaned = jsonMatch[0].replace(/,\s*([\]\}])/g, '$1');
        const result = JSON.parse(cleaned);

        // Attach rubric metadata so frontend knows whether this was rubric-based
        const rubric = getRubric(input.essayType, input.subject, input.examSession);
        result._rubricAvailable = !!rubric;
        if (rubric) {
          result._rubricLabel = rubric.label;
          result._rubricTotalMarks = rubric.totalMarks;
        }

        // Fill in the slot claimed before the model ran, or write a fresh row for
        // a run paid with a device credit.
        if (claim?.id) {
          await updateAnonymousResult(claim.id, result, `${result.predicted_score}/${result.max_score}`);
        } else {
          await createAnonymousAnalysis({
            fingerprint,
            type: "essay",
            unlocked: paidByDevice,
            unlockedAt: paidByDevice ? new Date() : null,
            essayType: input.essayType,
            subject: input.subject,
            researchQuestion: input.researchQuestion || null,
            resultJson: result,
            predictedGrade: `${result.predicted_score}/${result.max_score}`,
          });
        }

        return paidByDevice
          ? { result, wasAnonymous: true, unlocked: true as const }
          : { result: buildTeaser(result), wasAnonymous: true };
      } catch (error: any) {
        console.error("[Anonymous Essay Analysis] Error:", error);
        // A run that produced nothing must not cost the free slot it claimed, nor
        // the credit it spent.
        if (claim?.id) await deleteAnonymousAnalysis(claim.id).catch(() => {});
        if (paidByDevice) await addDeviceCredits(fingerprint, 1).catch(() => {});
        throw new Error(error.message || "Analysis failed. Please try again.");
      }
    }),

  // Check if anonymous user can still analyze
  canAnalyzeAnonymous: publicProcedure
    .input(z.object({ clientFingerprint: z.string().min(1) }))
    .query(async ({ input }) => {
      const usage = await canAnonymousAnalyze(input.clientFingerprint);
      return { canAnalyze: usage.allowed };
    }),

  analyze: protectedProcedure
    .input(z.object({
      essayType: z.enum(ESSAY_TYPES),
      subject: z.string().min(1),
      researchQuestion: z.string().optional(),
      essayText: z.string().min(300, "Paste at least 300 characters, roughly 50 words, or there is nothing to mark.").max(120000, "That is longer than any IB coursework. Paste the work itself, up to about 20,000 words."),
      reflections: z.string().max(8000).optional(),
      examSession: z.enum(["nov2026", "may2027"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const usage = await canUserAnalyzeEssay(ctx.user.id);
      if (!usage.allowed) {
        throw new Error(usage.reason || "No essay credits remaining");
      }

      const systemPrompt = buildEssaySystemPrompt(input.essayType, input.subject, input.examSession);
      const userPrompt = buildEssayUserPrompt(input.essayType, input.subject, input.researchQuestion, input.essayText, input.examSession, input.reflections);

      try {
        const startedAt = Date.now();
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        console.log(`[Timing] LLM answered in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");

        const cleaned = jsonMatch[0].replace(/,\s*([\]\}])/g, '$1');
        const result = JSON.parse(cleaned);

        // Attach rubric metadata
        const rubric = getRubric(input.essayType, input.subject, input.examSession);
        result._rubricAvailable = !!rubric;
        if (rubric) {
          result._rubricLabel = rubric.label;
          result._rubricTotalMarks = rubric.totalMarks;
        }

        const analysis = await createAnalysis({
          userId: ctx.user.id,
          type: "essay",
          essayType: input.essayType,
          subject: input.subject,
          researchQuestion: input.researchQuestion || null,
          resultJson: result,
          predictedGrade: `${result.predicted_score}/${result.max_score}`,
          unlocked: !usage.isFree,
          // Recorded so a re-check cannot silently move the work to another rubric.
          examSession: input.examSession ?? null,
        });

        await consumeEssayCredit(ctx.user.id);

        // Free tier gets a teaser; paid credits get the full report immediately.
        if (usage.isFree) {
          return { id: analysis.id, result: buildTeaser(result), wasFree: true };
        }
        return { id: analysis.id, result, wasFree: false };
      } catch (error: any) {
        console.error("[Essay Analysis] Error:", error);
        throw new Error(error.message || "Analysis failed. Please try again.");
      }
    }),
});

// ---- University Strategy Router ----
const universityRouter = router({
  analyze: protectedProcedure
    .input(z.object({
      predictedScore: z.number().min(24).max(45),
      averageGrade: z.number().min(1).max(7),
      fieldOfStudy: z.string().min(1),
      budget: z.string(),
      regions: z.array(z.string()),
      extracurriculars: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const usage = await canUserAnalyzeUniversity(ctx.user.id);
      if (!usage.allowed) {
        throw new Error(usage.reason || "No university strategy credits remaining");
      }

      const now = new Date();
      const currentDate = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      const yr = now.getFullYear();

      const systemPrompt = `You are an experienced IB university counselor with 15 years of advising students on university admissions worldwide. Give realistic, data-informed advice based on actual IB score requirements and admission statistics. Be honest about chances.

IMPORTANT FORMATTING RULES:
- Respond with a single valid JSON object. No markdown, no text before or after the JSON.
- Write ALL text in plain text only. NEVER use HTML entities like &amp; &lt; &gt; &quot; — write the actual characters: & < > " instead.
- Do not use any HTML tags or HTML encoding in your response.`;

      const userPrompt = `Today is ${currentDate}. Build a university strategy for this IB student:
Predicted: ${input.predictedScore}/45, Average Grade: ${input.averageGrade}/7
Field: ${input.fieldOfStudy}
Regions: ${input.regions.length ? input.regions.join(", ") : "any"}
Budget: ${input.budget}
Extracurriculars: ${input.extracurriculars || "not specified"}
Notes: ${input.notes || "none"}

Include 3 safe + 3 match + 3 reach universities. Roadmap must use real dates starting from ${currentDate}.

Respond with this exact JSON structure:
{
  "profile_summary": "Honest assessment of the student's profile",
  "universities": [
    {"name": "University Name", "country": "Country", "type": "safe", "program": "Program Name", "typical_ib": "30-34", "admission_prob": 75, "why": "Specific reason this university fits"}
  ],
  "essay_angle": "Specific positioning angle for personal statement",
  "roadmap": [
    {"period": "March-May ${yr}", "action": "Specific action to take"}
  ],
  "strengths": ["Specific profile strength"],
  "red_flags": ["Specific concern to address"]
}`;

      try {
        const startedAt = Date.now();
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        console.log(`[Timing] LLM answered in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");

        const cleaned = jsonMatch[0].replace(/,\s*([\]\}])/g, '$1');
        const result = JSON.parse(cleaned);

        const analysis = await createAnalysis({
          userId: ctx.user.id,
          type: "university",
          essayType: null,
          subject: null,
          predictedScore: input.predictedScore,
          averageGrade: String(input.averageGrade),
          fieldOfStudy: input.fieldOfStudy,
          resultJson: result,
          predictedGrade: `${input.predictedScore}/45`,
          unlocked: true,
        });

        await consumeUniversityCredit(ctx.user.id);

        return { id: analysis.id, result };
      } catch (error: any) {
        console.error("[University Strategy] Error:", error);
        throw new Error(error.message || "Strategy generation failed. Please try again.");
      }
    }),
});

// ---- Dashboard Router ----
const dashboardRouter = router({
  history: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).optional() }).optional())
    .query(async ({ ctx, input }) => {
      const rows = await getUserAnalyses(ctx.user.id, input?.limit || 20);
      // A locked analysis must not expose the exact predicted score anywhere — that score is
      // the headline of the paid report.
      return rows.map((r: any) => (r.unlocked ? r : { ...r, predictedGrade: null, resultJson: null }));
    }),

  /** Delete one report from the account, for real, because the privacy page says so. */
  deleteAnalysis: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const removed = await deleteUserAnalysis(input.id, ctx.user.id);
      if (!removed) throw new TRPCError({ code: "NOT_FOUND", message: "Report not found" });
      return { deleted: true as const };
    }),

  analysis: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const analysis: any = await getAnalysisById(input.id, ctx.user.id);
      if (!analysis) throw new Error("Analysis not found");
      // A locked report is locked on the wire too. Hiding it in the component
      // left the full text one devtools tab away from anyone who looked.
      if (!analysis.unlocked) {
        return { ...analysis, resultJson: null, predictedGrade: null, locked: true as const };
      }
      return { ...analysis, locked: false as const };
    }),

  credits: protectedProcedure.query(async ({ ctx }) => {
    const credits = await getUserCredits(ctx.user.id);
    if (!credits) throw new Error("User not found");

    return {
      freeEssayAvailable: !credits.freeEssayUsed,
      essayCredits: credits.essayCredits,
      universityCredits: credits.universityCredits,
      canAnalyzeEssay: !credits.freeEssayUsed || credits.essayCredits > 0,
      canAnalyzeUniversity: credits.universityCredits > 0,
    };
  }),

  payments: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).optional() }).optional())
    .query(async ({ ctx, input }) => {
      return getUserPayments(ctx.user.id, input?.limit || 20);
    }),

  orders: protectedProcedure.query(async ({ ctx }) => {
    const rows = await getUserOrders(ctx.user.id);
    // Orders are created when the checkout link is generated, so an abandoned checkout leaves a
    // "pending" row. Showing it as a purchase makes people think they were charged.
    return rows.filter((o: any) => o.status === "paid" || o.status === "refunded");
  }),
});

// ---- Pricing info (public) ----
const pricingRouter = router({
  products: publicProcedure.query(() => {
    return {
      ESSAY_SINGLE: { name: PRODUCTS.ESSAY_SINGLE.name, price: PRODUCTS.ESSAY_SINGLE.priceAmount / 100, description: PRODUCTS.ESSAY_SINGLE.description },
      ESSAY_PACK_5: { name: PRODUCTS.ESSAY_PACK_5.name, price: PRODUCTS.ESSAY_PACK_5.priceAmount / 100, description: PRODUCTS.ESSAY_PACK_5.description },
      ESSAY_PACK_10: { name: PRODUCTS.ESSAY_PACK_10.name, price: PRODUCTS.ESSAY_PACK_10.priceAmount / 100, description: PRODUCTS.ESSAY_PACK_10.description },
      UNIVERSITY_SINGLE: { name: PRODUCTS.UNIVERSITY_SINGLE.name, price: PRODUCTS.UNIVERSITY_SINGLE.priceAmount / 100, description: PRODUCTS.UNIVERSITY_SINGLE.description },
    };
  }),
});

// ---- Payment Router (LemonSqueezy) ----
const paymentRouter = router({
  // Create LemonSqueezy card checkout for guest (unauthenticated) users
  createGuestCheckout: publicProcedure
    .input(z.object({
      productKey: z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]),
      email: z.string().email("Please enter a valid email address"),
      /** Device the locked report sits on, so the payment can open it without an account. */
      fingerprint: z.string().min(1).optional(),
      /** Page to return to after paying. */
      returnTo: z.enum(["essay", "ucas-personal-statement"]).optional(),
    }))
    .mutation(async ({ input }) => {
      if (input.productKey === "UNIVERSITY_SINGLE") {
        throw new Error("The University Strategy is temporarily unavailable while we rebuild it on verified data.");
      }
      const product = PRODUCTS[input.productKey];
      if (!product) throw new Error("Invalid product");

      const lsSku = PRODUCT_KEY_TO_LS_SKU[input.productKey];
      const variantId = LEMONSQUEEZY_VARIANTS[lsSku];
      if (!variantId) throw new Error("No LemonSqueezy variant for this product");

      const skuMap: Record<string, string> = {
        ESSAY_SINGLE: "essay_single",
        ESSAY_PACK_5: "essay_pack_5",
        ESSAY_PACK_10: "essay_pack_10",
        UNIVERSITY_SINGLE: "university_single",
      };
      const sku = skuMap[input.productKey] as any;

      // Find or create a guest user account by email
      const { id: userId } = await findOrCreateGuestUserByEmail(input.email);

      // Create order in DB
      const orderId = randomUUID();
      await createOrder({
        id: orderId,
        userId,
        sku,
        amountUsd: product.priceAmount,
        currency: "usd",
        status: "pending",
        provider: "lemonsqueezy",
      });

      // Create LemonSqueezy checkout with email pre-filled
      const { checkoutUrl } = await createLemonsqueezyCheckout(
        orderId,
        variantId,
        input.email,
        sku,
        product.priceAmount,
        // Every essay purchase carries the device, packs included: the buyer is
        // looking at a locked report right now and that is what they think they bought.
        input.fingerprint,
        input.returnTo,
      );

      return { checkoutUrl, orderId };
    }),

  // Create LemonSqueezy card checkout (requires authentication)
  createLemonsqueezyCheckout: protectedProcedure
    .input(z.object({
      productKey: z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]),
      /** Signed-in buyers have a device too, and their report lives on it. */
      fingerprint: z.string().min(1).optional(),
      returnTo: z.enum(["essay", "ucas-personal-statement"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (input.productKey === "UNIVERSITY_SINGLE") {
        throw new Error("The University Strategy is temporarily unavailable while we rebuild it on verified data.");
      }
      const product = PRODUCTS[input.productKey];
      if (!product) throw new Error("Invalid product");

      const lsSku = PRODUCT_KEY_TO_LS_SKU[input.productKey];
      const variantId = LEMONSQUEEZY_VARIANTS[lsSku];
      if (!variantId) throw new Error("No LemonSqueezy variant for this product");

      // Map product key to SKU enum
      const skuMap: Record<string, string> = {
        ESSAY_SINGLE: "essay_single",
        ESSAY_PACK_5: "essay_pack_5",
        ESSAY_PACK_10: "essay_pack_10",
        UNIVERSITY_SINGLE: "university_single",
      };
      const sku = skuMap[input.productKey] as any;

      // Create order in DB
      const orderId = randomUUID();
      await createOrder({
        id: orderId,
        userId: ctx.user.id,
        sku,
        amountUsd: product.priceAmount,
        currency: "usd",
        status: "pending",
        provider: "lemonsqueezy",
      });

      // Create LemonSqueezy checkout. The device travels with it for signed-in
      // buyers too: their report is an anonymous row until they unlock it, and
      // without this a paid UCAS review could never be opened at all.
      const { checkoutUrl } = await createLemonsqueezyCheckout(
        orderId,
        variantId,
        ctx.user.email || null,
        sku, // productSlug for redirect URL tracking
        product.priceAmount, // valueUsd in cents for redirect URL tracking
        input.fingerprint,
        input.returnTo,
      );

      return { checkoutUrl, orderId };
    }),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  essay: essayRouter,
  university: universityRouter,
  dashboard: dashboardRouter,
  pricing: pricingRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
