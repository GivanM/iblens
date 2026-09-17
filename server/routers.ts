import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { sdk } from "./_core/sdk";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM, MODEL_DECLINED } from "./_core/llm";
import { parseModelJson } from "./_core/modelJson";
import {
  createAnalysis,
  upsertAccountCopy,
  getUserAnalyses,
  getRecentlyOpenedReport,
  getAnalysisById,
  canUserAnalyzeEssay,
  consumeEssayCredit,
  refundEssayConsumption,
  getUserCredits,
  getUserPayments,
  generateFingerprint,
  canAnonymousAnalyze,
  createAnonymousAnalysis,
  claimAnonymousFreeRun,
  createOrder,
  getUserOrders,
  findOrCreateGuestUserByEmail,
  consumePaidEssayCredit,
  getLatestAnonymousEssay,
  getLatestAnonymousUcas,
  getDeviceCredits,
  takeAllDeviceCredits,
  adoptDeviceReports,
  grantCreditsViaLedger,
  consumeDeviceCredit,
  addDeviceCredits,
  takeFromOldestLot,
  returnToLot,
  moveDeviceLotsToAccount,
  findAccountCopyOf,
  isPurchaseRefunded,
  reopenAccountChain,
  findUnlockedCopyInChain,
  openDeviceRowsOfOpenCopies,
  getUserById,
  getLatestAccountVersion,
  getOrderById,
  deleteAnonymousAnalysis,
  deleteUserAnalysis,
  updateAnonymousResult,
  setAnonymousUnlocked,
  markAnalysisUnlocked,
  claimAnalysisUnlock,
  claimAnonymousUnlock,
  consumeAnonymousRerun,
  createRerunAnalysis,
  getAnonymousChainHead,
  getAnonymousRowForDevice,
  getDeviceReports,
  refundAnonymousRerun,
  refundAnalysisRerun,
  consumeAnalysisRerun,
} from "./db";
import { checkWordLimit, storableWordCheck, type WordCheck } from "../shared/wordcount";
import { checkUcasMechanics, buildUcasSystemPrompt, buildUcasUserPrompt, UCAS_TOTAL_CHAR_LIMIT, UCAS_MIN_CHARS_PER_ANSWER } from "../shared/ucas";
import { createLemonsqueezyCheckout } from "./lemonsqueezy/lemonsqueezy";
import { LEMONSQUEEZY_VARIANTS, PRODUCT_KEY_TO_LS_SKU } from "../shared/pricing";
import { randomUUID } from "crypto";
import { PRODUCTS } from "./products";
import { getRubric, buildRubricPromptFragment, unmarkableReason } from "../shared/rubrics";
import { reconcileScores, buildTeaser, computeTeaser, softTruncate } from "./scores";

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
// Tasks marked on one holistic instrument: the band is free, so the paid report must say why the mark is the higher or lower one in it.
const HOLISTIC_TYPES = new Set(["TOK", "TOK Exhibition"]);

function buildEssaySystemPrompt(essayType: string, subject: string, examSession?: string): string {
  const rubric = getRubric(essayType, subject, examSession);
  const rubricFragment = buildRubricPromptFragment(essayType, subject, examSession);

  let base = `You are an experienced IB examiner with 12 years of grading experience across multiple subjects. Analyse the work strictly according to IB assessment criteria. Be specific, constructive, and honest. Reference actual IB criteria names and descriptors.

IMPORTANT FORMATTING RULES:
- Respond with a single valid JSON object. No markdown, no text before or after the JSON.
- Write ALL text in plain text only. NEVER use HTML entities like &amp; &lt; &gt; &quot;. Write the actual characters instead: & < > "
- Do not use em dashes or en dashes as punctuation anywhere in the text. Use a comma, a colon, brackets or a new sentence instead. Write number ranges with a plain hyphen, for example 13-16.
- Do not use any HTML tags or HTML encoding in your response.
- Never write sentences or paragraphs the student could paste into their work: no rewritten passages, model answers, example paragraphs or suggested wording. Describe what to change and why, and quote the student's own words only to point at a passage.
- Write to the student in the second person ("you", "your essay"). Never refer to them as "the student" or "the candidate".
- In every comment longer than three sentences, put a blank line (two newline characters) between separate points, so it reads as short paragraphs.
- Use British spelling (analyse, organise, recognise, behaviour).
- Never write a criterion's mark or the total inside a comment, risk, leverage zone, next step or the overall comment: the report shows the marks separately. Describe the level in words (for example "the Good band descriptor"), never as a number, and never say where in a level the mark sits (top, bottom, upper or lower end) in any of those; a cap may name, in words, the highest mark it allows.${HOLISTIC_TYPES.has(essayType) ? " This task is marked as a whole: explain why the mark is the higher or the lower mark of its band only in the separate \"band_position\" field, in words and without writing the mark (leave it empty if the mark is zero), and nowhere else." : ""} Rules the notes ask you to explain, such as a cap or no marks for an essay not on a prescribed title, must still be stated, in words.
- The work arrives as pasted text, so graphs, images, photos, diagrams and screenshots never come through, and tables may lose their layout. Never lower a mark because a graph or image is not visible, and never call one missing. Where the work describes a graph or image, judge what the description shows, and put anything about the graph itself (axes, error bars, labels) as a check for the student to make, not as a reason for the mark. If the criteria require a diagram or graph and the text refers to none, say that none was referred to and ask the student to check.`;

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
/**
 * The word count is measured here and handed to the model, the way UCAS character
 * counts are: a model asked to count words guesses. Pages promise that IBLens
 * checks the count and flags a draft over the limit, so this is where that happens.
 */
function buildWordCountBlock(check: WordCheck | null): string {
  if (!check) return "";
  const limit = `${check.max} words${check.unit ? ` ${check.unit}` : ""}`;
  const lines = [
    "",
    "",
    `WORD COUNT, MEASURED BY IBLENS (do not recount): the text as pasted is ${check.words} words. The official limit for this task is ${limit}${check.min ? `, and the report should be at least ${check.min} words` : ""}. The official count leaves out ${check.excludes}, and the pasted text may contain some of that material.`,
  ];
  if (check.unit) {
    lines.push(`- The limit applies ${check.unit}. If the paste contains more than one, apply it to each separately.`);
  }
  if (check.status === "over") {
    lines.push(check.stopsAt
      ? `- The pasted text is over the limit. Unless the excess is plainly material the official count leaves out, include a risk saying that marking stops at ${check.max} words and nothing after that point is assessed, which in this text falls at: "${check.cutoff ?? ""}". Say what could be cut.`
      : `- The pasted text is over the limit. Unless the excess is plainly material the official count leaves out, include a risk saying the text is over the maximum the subject guide sets, and say what could be cut. Do not claim that examiners stop reading at the limit.`);
  } else if (check.status === "under_min") {
    lines.push(`- The pasted text is under the ${check.min}-word minimum for this report. Unless part of the report is plainly missing from the paste, include a risk about it.`);
  } else {
    lines.push("- Do not raise the word count as a risk: the text is within the limit. If part of the task is underdeveloped, criticise the content, not the number of words.");
  }
  return lines.join("\n");
}

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
  // Examiners stop reading reflections at 500 words, so only those reach the model.
  const reflectionWords = (reflections || "").trim().split(/\s+/).filter(Boolean);
  const reflectionOver = reflectionWords.length > 500;
  const reflectionText = reflectionOver ? reflectionWords.slice(0, 500).join(" ") : (reflections || "").trim();
  let reflectionBlock = "";
  if (essayType === "EE") {
    if (reflectionText) {
      reflectionBlock = `

REFLECTIVE STATEMENT (the student's ${examSession === "may2027" ? "RPF" : "RPPF"}, submitted separately from the essay):
${reflectionText.substring(0, 6000)}

${examSession === "may2027" ? "Mark the reflection criterion on this statement alone, never on the essay text." : "Mark the reflection criterion on these reflections, using the essay only as context for what the reflections describe."}${reflectionOver ? `
The student pasted ${reflectionWords.length} words; examiners stop reading at 500, so only the first 500 are shown above. Include a risk saying that everything after word 500 of the reflection will not be read.` : ""}`;
    } else {
      reflectionBlock = `

NO REFLECTIVE STATEMENT WAS SUBMITTED. The reflection criterion is marked on the ${examSession === "may2027" ? "RPF" : "RPPF"}, which is not part of this submission.
- Do not award a score for the reflection criterion and do not deduct marks for its absence.
- Return it in the criteria array with "score": null and a comment saying it was not assessed because the reflective statement was not submitted.
- "max_score" must be the sum of the maximum marks of the criteria you actually assessed, and "band_range" must be expressed on that same total.
- Do not list the missing reflective statement as a risk. The student was never asked for it.`;
    }
  }

  const wordBlock = buildWordCountBlock(checkWordLimit(rubric, essayText));

  // TOK work has no subject: the subject field carries "Exhibition" for the exhibition.
  const task = essayType === "TOK"
    ? (subject.trim().toLowerCase() === "exhibition" ? "TOK exhibition" : "TOK essay")
    : `${essayType} for: ${subject}`;
  return `Analyse this IB ${task}
Research Question: ${(researchQuestion || "").slice(0, 500) || "not provided"}

TEXT:
${essayText.substring(0, 30000)}${reflectionBlock}${wordBlock}

Respond with this exact JSON structure:
{${essayType === "IA" && subject.startsWith("English A") ? `
  "paste_kind": "<transcript if the paste is a transcript of the spoken oral, outline if it is notes or an outline>",` : ""}
  "band_range": "<range on the same total as max_score, e.g. 18-22>",
  "predicted_score": <integer>,
  "max_score": <total marks of the criteria you assessed>,
  "overall_comment": "Detailed overall assessment of the work",
  "criteria": ${criteriaExample},${essayType === "TOK" ? `
  "band_position": "Why the mark is the higher or the lower mark of its band, in words, without the mark itself",` : ""}
  "risks": [
    {"title": "Risk title", "description": "What specifically loses marks and why"}
  ],
  "leverage_zones": [
    {"title": "Improvement area", "description": "Specific actionable advice to gain marks"}
  ],
  "next_steps": ["Specific step 1", "Specific step 2", "Specific step 3"]
}

ORDER: list "risks" from the one costing the most marks to the least, "leverage_zones" from the most marks recoverable to the least, and "next_steps" from the change likely to recover the most marks to the least. The report shows them in this order and describes them as ranked.`;
}


/**
 * Server-side gate: the free tier returns a TEASER only. The full report
 * (exact score, all criteria, comments, fix lists) never leaves the server
 * until it is unlocked with a paid credit. Do not widen this shape.
 */

/** Same rule for risks: never bill a student for a document the form did not ask for. */
/**
 * The exam session a stored report was marked on. Checks from /remark and older rows
 * saved none, and re-checking those on whatever the form showed moved a 34-mark
 * Extended Essay onto the 30-mark criteria. The total it was marked out of says which.
 */
function sessionOfReport(rec: any, fallback?: "nov2026" | "may2027"): "nov2026" | "may2027" | undefined {
  if (rec?.examSession === "nov2026" || rec?.examSession === "may2027") return rec.examSession;
  const total = Number((rec?.resultJson as any)?._rubricTotalMarks ?? 0);
  const nov = getRubric(String(rec?.essayType ?? ""), String(rec?.subject ?? ""), "nov2026")?.totalMarks;
  const may = getRubric(String(rec?.essayType ?? ""), String(rec?.subject ?? ""), "may2027")?.totalMarks;
  if (total && nov !== may) {
    if (total === nov) return "nov2026";
    if (total === may) return "may2027";
  }
  return fallback;
}

/** What a re-check is compared with: the totals and each criterion's mark before it. */
function previousScores(prev: any) {
  return {
    predicted_score: prev?.predicted_score ?? null,
    max_score: prev?.max_score ?? null,
    band_range: prev?.band_range ?? null,
    criteria: Array.isArray(prev?.criteria)
      ? prev.criteria.map((c: any) => ({ name: String(c?.name ?? ""), score: typeof c?.score === "number" ? c.score : null, max: typeof c?.max === "number" ? c.max : null }))
      : [],
  };
}

/**
 * What a student sees when a run fails. Messages written for people pass through;
 * transport and parsing failures ("relay poll timeout after 240s", "Failed to parse
 * AI response") do not, because they read as a broken site and say nothing useful.
 */
/**
 * A device credit and the purchase it belongs to, taken together. Signing in between the two
 * moved the purchase to the account, and the report was saved with no purchase a refund could close.
 */
async function spendDeviceCredit(fingerprint: string): Promise<{ ok: boolean; orderId: string | null }> {
  const orderId = await takeFromOldestLot({ fingerprint });
  if (await consumeDeviceCredit(fingerprint)) return { ok: true, orderId };
  if (orderId) await returnToLot(orderId).catch(() => true);
  return { ok: false, orderId: null };
}

const REFUNDED_DURING_RECHECK = "This report's purchase was refunded while the re-check ran, so the re-check is closed with the report.";

function friendlyRunError(error: any, what: string): string {
  const msg = String(error?.message || "");
  if (msg === REFUNDED_DURING_RECHECK || msg === MODEL_DECLINED) return msg;
  if (!msg || /relay|timeout|timed out|parse|json|fetch|econn|socket|network|status code|\b5\d\d\b|overloaded|rate.?limit|anthropic|invalid response|unexpected token|undefined|null/i.test(msg)) {
    return `The ${what} did not finish, and nothing was used up. Please try again in a minute.`;
  }
  return msg;
}

/**
 * The prompts ask for plain hyphens, and the model still writes "14\u201317" or an
 * em dash now and then. Reports are published text on this site, where those marks
 * are not used, so every model answer is cleaned on the way in and on the way out
 * (older stored reports were saved before this existed).
 */
function normalizeDashes<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/(\d)\s*[\u2013\u2014]\s*(\d)/g, "$1-$2")
      .replace(/\b([A-G])[\u2013\u2014]([A-G])\b/g, "$1-$2")
      .replace(/\s*[\u2013\u2014]\s*/g, ", ") as unknown as T;
  }
  if (Array.isArray(value)) return value.map((v) => normalizeDashes(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(value as any)) out[k] = normalizeDashes(v);
    return out;
  }
  return value;
}

/** Cut at a sentence boundary where possible so the teaser reads as deliberate, not broken. */
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


// ---- Essay Analysis Router ----
const essayRouter = router({

  // Paid unlock of a previously generated (teaser-gated) report.
  unlockAnalysis: protectedProcedure
    .input(z.object({
      fingerprint: z.string().optional(),
      analysisId: z.number().optional(),
      /** Which device preview: an essay report or a UCAS review. */
      kind: z.enum(["essay", "ucas"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (input.analysisId) {
        const rec = await getAnalysisById(input.analysisId, ctx.user.id);
        if (!rec || rec.userId !== ctx.user.id || !rec.resultJson) throw new Error("Report not found");
        if (!(rec as any).unlocked) {
          await consumePaidEssayCredit(ctx.user.id);
          // The purchase the credit came from, so a refund of it closes this report.
          const orderId = await takeFromOldestLot({ userId: ctx.user.id });
          // A double click sends two of these; only the one that opens the report
          // keeps the credit, the other gives it straight back.
          if (!(await claimAnalysisUnlock(rec.id, orderId))) {
            if (await returnToLot(orderId)) await refundEssayConsumption(ctx.user.id, false);
          }
        }
        return { result: normalizeDashes(rec.resultJson) };
      }
      if (input.fingerprint) {
        const rec = input.kind === "ucas"
          ? await getLatestAnonymousUcas(input.fingerprint)
          : await getLatestAnonymousEssay(input.fingerprint);
        if (!rec || !rec.resultJson) throw new Error("No report found for this device");
        if (!(rec as any).unlocked) {
          // Already open in the account (reopened there after a refund): open the device rows
          // for the same purchase without charging a second time.
          const openCopy = await findUnlockedCopyInChain(ctx.user.id, rec as any).catch(() => null);
          if (openCopy) {
            await claimAnonymousUnlock(rec.id, openCopy.unlockOrderId ?? null);
            return { result: normalizeDashes(rec.resultJson) };
          }
          await consumePaidEssayCredit(ctx.user.id);
          const orderId = await takeFromOldestLot({ userId: ctx.user.id });
          // As above: the request that lost the race returns its credit and does
          // not add a second copy to the dashboard.
          if (!(await claimAnonymousUnlock(rec.id, orderId))) {
            if (await returnToLot(orderId)) await refundEssayConsumption(ctx.user.id, false);
            return { result: normalizeDashes(rec.resultJson) };
          }
          // Keep a copy in the user's dashboard history. A re-check version reopened after a
          // refund is copied with its report and linked, not as a report with re-checks of its own.
          if ((rec as any).rerunOf) {
            await adoptDeviceReports(input.fingerprint, ctx.user.id).catch(() => 0);
            // Adoption copies only reports bought by this account's orders. A credit from a
            // storefront purchase or another email opens the report too, so without a copy of
            // the original, the version itself is kept below rather than lost at sign-out.
            const originalCopy = await findAccountCopyOf(ctx.user.id, (rec as any).rerunOf).catch(() => null);
            if (originalCopy) {
              // A copy a refund locked, whose device rows this credit has just opened: open it
              // and its re-check copies too, instead of offering to charge for it again.
              await reopenAccountChain(originalCopy.id, orderId).catch(() => {});
              return { result: normalizeDashes(rec.resultJson) };
            }
          }
          const copy = await upsertAccountCopy({
            userId: ctx.user.id,
            type: "essay",
            essayType: rec.essayType,
            subject: rec.subject,
            researchQuestion: rec.researchQuestion,
            resultJson: rec.resultJson,
            predictedGrade: rec.predictedGrade,
            unlocked: true,
            // The session the report was marked on, so a re-check uses the same rubric.
            examSession: (rec as any).examSession ?? null,
            // The device row stays unlocked; linking it lets Delete remove both.
            adoptedFromId: rec.id,
            unlockOrderId: orderId,
          });
          if (copy?.id) await markAnalysisUnlocked(copy.id, orderId ?? undefined);
        }
        return { result: normalizeDashes(rec.resultJson) };
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
      essayText: z.string().min(300, "Paste at least 300 characters, roughly 50 words, or there is nothing to mark.").max(120000, "That is far longer than any IB coursework, and only the first 30,000 characters, about 5,000 words, are marked. Paste the work itself."),
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
        const session = sessionOfReport(rec, input.examSession);
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
        const result = normalizeDashes(parseModelJson(content));
        const rubric = getRubric(rec.essayType, rec.subject, session);
        if (rubric) {
          result._rubricAvailable = true;
          result._rubricLabel = rubric.label;
          result._rubricTotalMarks = rubric.totalMarks;
        }
        result._wordCheck = storableWordCheck(checkWordLimit(rubric, input.essayText));
        reconcileScores(result, { essayType: rec.essayType, subject: rec.subject, reflectionsPasted: !!input.reflections?.trim(), session });
        // Kept with the re-check as with any report, so a refund that locks it shows one fixed
        // preview, never whatever the model wrote under the same key.
        result._preview = computeTeaser(result);

        // Compared with the newest version before this one, as guest re-checks are: a second
        // re-check showed the original as "before" and hid what the first one changed.
        const before: any = await getLatestAccountVersion(rec.id, ctx.user.id).catch(() => null);
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
          examSession: session ?? null,
          // A re-check belongs to the purchase that opened the report, so a refund closes it too.
          unlockOrderId: rec.unlockOrderId ?? null,
        });
        if (analysis?.id) await markAnalysisUnlocked(analysis.id, rec.unlockOrderId ?? undefined);
        // Refunded while the model ran: the re-check is removed, not left as a locked version to sell.
        if (await isPurchaseRefunded(rec.unlockOrderId).catch(() => false)) {
          if (analysis?.id) await deleteUserAnalysis(analysis.id, ctx.user.id).catch(() => false);
          throw new TRPCError({ code: "FORBIDDEN", message: REFUNDED_DURING_RECHECK });
        }

        return {
          id: analysis.id,
          result,
          rerunsLeft: gate.rerunsLeft,
          previous: previousScores((before?.resultJson ?? rec.resultJson) || {}),
        };
      } catch (error: any) {
        // The student got nothing back, so the re-check they spent returns.
        await refundAnalysisRerun(input.analysisId).catch(() => {});
        throw new Error(friendlyRunError(error, "re-check"));
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
      clientFingerprint: z.string().min(1).max(64),
      /** Explicitly buy this review with a credit the user already owns. */
      spendCredit: z.boolean().optional(),
      /** Or with a credit this device owns, bought without an account. */
      spendDeviceCredit: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const answers = { q1: input.q1, q2: input.q2, q3: input.q3 };
      const mechanics = checkUcasMechanics(answers);

      if (mechanics.totalChars < 200) {
        throw new Error("Please paste your draft answers first. There is not enough text to review yet.");
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
      let ucasDeviceOrderId: string | null = null;
      if (user && input.spendCredit) {
        const credits = await getUserCredits(user.id);
        paidCredit = (credits?.essayCredits ?? 0) > 0;
        if (!paidCredit) throw new TRPCError({ code: "FORBIDDEN", message: "No credit available. A full review is $9.99." });
      }

      if (!paidCredit) {
        const usage = await canAnonymousAnalyze(input.clientFingerprint, "ucas");
        if (input.spendDeviceCredit === true) {
          const spent = await spendDeviceCredit(input.clientFingerprint);
          paidByDevice = spent.ok;
          ucasDeviceOrderId = spent.orderId;
        }
        if (!usage.allowed && !paidByDevice) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: user
              ? "You have used the free UCAS preview. A full review is $9.99."
              : "You have used the free UCAS preview on this device. A full review is $9.99, and no account is needed.",
          });
        }
      }
      const fingerprint = input.clientFingerprint;

      // Take the credit before the model too, not ninety seconds later: two tabs
      // on one credit produced two full reviews.
      if (paidCredit) await consumePaidEssayCredit(user.id);
      // The purchase each paid review is charged to, so a refund of it closes the review.
      const creditOrderId = paidCredit ? await takeFromOldestLot({ userId: user.id }) : null;
      const deviceOrderId = paidByDevice ? ucasDeviceOrderId : null;

      // Claim the free slot before the model is called: the check and the write
      // were eighty seconds apart, which is a free second review for anyone who
      // submits twice.
      const claim = (paidCredit || paidByDevice) ? null : await claimAnonymousFreeRun({
        fingerprint,
        type: "essay",
        essayType: "UCAS",
        subject: input.course.slice(0, 100),
        researchQuestion: null,
        resultJson: null,
        predictedGrade: null,
      }, "ucas");
      if (!(paidCredit || paidByDevice) && !claim) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You have used the free UCAS preview on this device." });
      }

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
        const result = normalizeDashes(parseModelJson(content));

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
            unlockOrderId: paidByDevice ? deviceOrderId : creditOrderId,
          });
        }

        // Paid from the account, so it belongs in the account. The device row alone
        // disappeared from reach when the buyer signed out and the device id rotated.
        if (paidCredit && user && saved?.id) {
          await createAnalysis({
            userId: user.id,
            type: "essay",
            essayType: "UCAS",
            subject: input.course.slice(0, 100),
            researchQuestion: null,
            resultJson: result,
            predictedGrade: null,
            unlocked: true,
            unlockedAt: new Date(),
            adoptedFromId: saved.id,
            unlockOrderId: creditOrderId,
          }).catch((copyErr) => console.warn("[UCAS PS Review] Account copy failed:", copyErr));
        }
        // Refunded while the model ran: the row was closed again, so only its preview goes back.
        const refundedMeanwhile = paid && await isPurchaseRefunded(paidByDevice ? deviceOrderId : creditOrderId).catch(() => false);
        if (paid && !refundedMeanwhile) {
          return { result, wasAnonymous: !paidCredit, unlocked: true as const, id: saved?.id };
        }
        return { result: buildUcasTeaser(result), wasAnonymous: true, refunded: refundedMeanwhile };
      } catch (error: any) {
        console.error("[UCAS PS Review] Error:", error);
        if (claim?.id) await deleteAnonymousAnalysis(claim.id).catch(() => {});
        // Not a report from a purchase refunded while the review ran: the refund has closed it.
        if (paidByDevice && await returnToLot(deviceOrderId).catch(() => true)) {
          await addDeviceCredits(fingerprint, 1).catch(() => {});
        }
        // The account credit comes back too: nothing was produced.
        if (paidCredit && user && await returnToLot(creditOrderId).catch(() => true)) {
          await grantCreditsViaLedger(user.id, 1, 0, "refund:ucas-failed").catch(() => {});
        }
        throw new Error(friendlyRunError(error, "review"));
      }
    }),

  /**
   * Two free re-checks of the same work within 14 days, for someone who bought
   * without an account. The authenticated path (rerunAnalysis) cannot serve them:
   * their report is an anonymous row, not a row on a user.
   */
  rerunAnonymous: publicProcedure
    .input(z.object({
      fingerprint: z.string().min(1).max(64),
      essayText: z.string().min(300).max(120000).optional(),
      reflections: z.string().max(8000).optional(),
      examSession: z.enum(["nov2026", "may2027"]).optional(),
      answers: z.object({ q1: z.string().max(4000), q2: z.string().max(4000), q3: z.string().max(4000) }).optional(),
      /** The course as it stands now, in case the applicant changed it. */
      course: z.string().max(120).optional(),
      /** Which report on this device to re-check; the newest of its kind when absent. */
      recordId: z.number().int().positive().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const gate = await consumeAnonymousRerun(input.fingerprint, input.answers ? "ucas" : "essay", input.recordId);
      if (!gate.ok) throw new TRPCError({ code: "FORBIDDEN", message: gate.reason });
      const rec: any = gate.record;
      const head: any = (gate as any).head ?? rec;
      const headId: number = head?.id ?? rec.id;
      // The purchase fixes the standard: the session and, for UCAS, the applicant pool
      // come from the report that was bought, not from the newest re-check's JSON.
      const session = sessionOfReport(head) ?? sessionOfReport(rec, input.examSession);
      const ucasLevel = ((head?.resultJson as any)?._universityType === "competitive" ? "competitive" : "typical") as "typical" | "competitive";
      const ucasCourse = (input.course || String(rec.subject || "your course")).trim();

      try {
        let systemPrompt: string;
        let userPrompt: string;
        let mechanics: any = null;

        if (rec.essayType === "UCAS") {
          if (!input.answers) throw new Error("Paste your revised answers to re-check them.");
          mechanics = checkUcasMechanics(input.answers);
          if (mechanics.totalChars > UCAS_TOTAL_CHAR_LIMIT + 2000) {
            throw new TRPCError({ code: "BAD_REQUEST", message: `Your answers total ${mechanics.totalChars.toLocaleString("en-GB")} characters. UCAS allows ${UCAS_TOTAL_CHAR_LIMIT.toLocaleString("en-GB")}; trim the draft before re-checking it.` });
          }
          systemPrompt = buildUcasSystemPrompt(ucasCourse, ucasLevel);
          userPrompt = buildUcasUserPrompt(ucasCourse, input.answers, mechanics);
        } else {
          if (!input.essayText) throw new Error("Paste your revised draft to re-check it.");
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
        const result = normalizeDashes(parseModelJson(content));
        if (mechanics) {
          result._mechanics = mechanics;
          result._course = ucasCourse;
          result._format = "ucas_2026";
          result._universityType = ucasLevel;
        }

        // Keep the marker of whether real criteria were behind this, exactly as the
        // first run does, or the report silently loses its provenance badge.
        if (rec.essayType !== "UCAS") {
          const rubric = getRubric(rec.essayType, rec.subject, session);
          result._rubricAvailable = !!rubric;
          result._rubricLabel = rubric?.label ?? null;
          result._rubricTotalMarks = rubric?.totalMarks ?? null;
          result._wordCheck = storableWordCheck(checkWordLimit(rubric, input.essayText ?? ""));
          reconcileScores(result, { essayType: rec.essayType, subject: rec.subject, reflectionsPasted: !!input.reflections?.trim(), session });
          result._preview = computeTeaser(result);
        }

        const child = await createRerunAnalysis(rec, result, result?.predicted_score != null ? (result?.max_score != null ? `${result.predicted_score}/${result.max_score}` : String(result.predicted_score)) : undefined, headId);
        const signedIn = (ctx as any).user;
        if (signedIn && child?.id && rec.essayType === "UCAS") {
          // A re-check of the review that was bought, not a review of its own: counted as
          // one, it made a refund think the purchase had opened more than it had.
          const parentCopy = await findAccountCopyOf(signedIn.id, headId).catch(() => null);
          // Only into an account that holds the review itself, open. On a shared browser whoever was
          // signed in got someone else's review in their dashboard.
          if (parentCopy?.unlocked) await createAnalysis({
            userId: signedIn.id,
            type: "essay",
            essayType: "UCAS",
            subject: rec.subject,
            researchQuestion: null,
            resultJson: result,
            predictedGrade: null,
            unlocked: true,
            unlockedAt: new Date(),
            unlockOrderId: rec.unlockOrderId ?? null,
            adoptedFromId: child.id,
            rerunOf: parentCopy.id,
          }).catch((copyErr) => console.warn("[Re-check] Account copy failed:", copyErr));
        }
        // Refunded while the model ran: the re-check and its account copy are removed, not left locked.
        if (await isPurchaseRefunded(rec.unlockOrderId).catch(() => false)) {
          if (signedIn && child?.id) {
            const copy = await findAccountCopyOf(signedIn.id, child.id).catch(() => null);
            if (copy?.id) await deleteUserAnalysis(copy.id, signedIn.id).catch(() => false);
          }
          if (child?.id) await deleteAnonymousAnalysis(child.id).catch(() => {});
          throw new TRPCError({ code: "FORBIDDEN", message: REFUNDED_DURING_RECHECK });
        }
        return {
          result,
          rerunsLeft: gate.rerunsLeft,
          previous: previousScores(rec.resultJson || {}),
        };
      } catch (error: any) {
        console.error("[Re-check] Error:", error);
        // The student got nothing, so the re-check they spent comes back.
        await refundAnonymousRerun(headId).catch(() => {});
        throw new Error(friendlyRunError(error, "re-check"));
      }
    }),

  /**
   * The full report for an anonymous device, returned only once the purchase has
   * unlocked it. This is how a guest reads what they paid for: they never sign in,
   * so the authenticated unlock path is closed to them.
   */
  /**
   * Move credits bought on this device onto the account that just signed in.
   * A guest purchase leaves them on the device, and signing in used to look like
   * the way to keep them while actually stranding them there.
   */
  claimDeviceCredits: protectedProcedure
    .input(z.object({ fingerprint: z.string().min(1).max(64) }))
    .mutation(async ({ ctx, input }) => {
      // Reports first: they are what was actually bought, and they used to stay
      // in one browser for ever.
      const adopted = await adoptDeviceReports(input.fingerprint, ctx.user.id).catch(() => 0);
      // Previews on this browser whose report this account has already paid for open here too.
      const reopened = await openDeviceRowsOfOpenCopies(input.fingerprint, ctx.user.id).catch(() => 0);
      // Unused reports go to whoever signs in on this browser, whatever e-mail paid for
      // them: signing out starts a new device id, so credits left behind for another
      // address could never be used again. The checkout says so.
      const credits = await getDeviceCredits(input.fingerprint);
      if (credits <= 0) return { moved: 0, adopted, reopened };
      const taken = await takeAllDeviceCredits(input.fingerprint, ctx.user.id);
      if (taken <= 0) return { moved: 0, adopted, reopened };
      // The purchases those reports came from move with them, so a refund still finds them.
      await moveDeviceLotsToAccount(input.fingerprint, ctx.user.id);
      await grantCreditsViaLedger(ctx.user.id, taken, 0, `device-claim:${input.fingerprint.slice(0, 8)}`);
      return { moved: taken, adopted, reopened };
    }),

  /** Reports this device has already paid for and not yet spent. */
  deviceCredits: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1).max(64) }))
    .query(async ({ input }) => ({ credits: await getDeviceCredits(input.fingerprint) })),

  /**
   * Open the locked preview on this device with a report the device already owns.
   * A guest who bought a pack for new work had no way to open an earlier preview
   * short of pasting the work again and paying for a second run.
   */
  unlockPreviewWithDeviceCredit: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1).max(64), kind: z.enum(["essay", "ucas"]).optional() }))
    .mutation(async ({ ctx, input }) => {
      const rec: any = input.kind === "ucas"
        ? await getLatestAnonymousUcas(input.fingerprint)
        : await getLatestAnonymousEssay(input.fingerprint);
      if (!rec || !rec.resultJson) throw new TRPCError({ code: "NOT_FOUND", message: "There is no preview on this device to open." });
      if (rec.unlocked) return { result: normalizeDashes(rec.resultJson) };
      // Already paid for in the signed-in account: open it without spending another report.
      const signedIn = (ctx as any).user;
      const openCopy = signedIn ? await findUnlockedCopyInChain(signedIn.id, rec).catch(() => null) : null;
      if (openCopy) {
        await claimAnonymousUnlock(rec.id, openCopy.unlockOrderId ?? null);
        return { result: normalizeDashes(rec.resultJson) };
      }
      const spent = await spendDeviceCredit(input.fingerprint);
      if (!spent.ok) {
        throw new TRPCError({ code: "FORBIDDEN", message: "This browser has no paid reports left. A full report is $9.99." });
      }
      const orderId = spent.orderId;
      // Two taps at once: the second finds the row already open and returns its report.
      if (!(await claimAnonymousUnlock(rec.id, orderId))) {
        if (await returnToLot(orderId).catch(() => true)) await addDeviceCredits(input.fingerprint, 1).catch(() => {});
      }
      return { result: normalizeDashes(rec.resultJson) };
    }),

  anonymousReport: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1).max(64), kind: z.enum(["essay", "ucas"]).optional() }))
    .query(async ({ input }) => {
      const rec: any = input.kind === "ucas"
        ? await getLatestAnonymousUcas(input.fingerprint)
        : await getLatestAnonymousEssay(input.fingerprint);
      if (!rec || !rec.resultJson || !rec.unlocked) return { unlocked: false as const };
      const head: any = await getAnonymousChainHead(rec);
      const started = head.unlockedAt ? new Date(head.unlockedAt).getTime() : new Date(head.createdAt).getTime();
      const daysLeft = Math.max(0, 14 - (Date.now() - started) / 86400000);
      return {
        unlocked: true as const,
        id: rec.id as number,
        essayType: rec.essayType as string | null,
        subject: rec.subject as string | null,
        result: normalizeDashes(rec.resultJson),
        // Past the 14 days there are none, whatever the counter says: the page offered
        // "2 left" and the server then refused every one.
        rerunsLeft: daysLeft > 0 ? Math.max(0, 2 - (head.rerunsUsed ?? 0)) : 0,
        daysLeft: Math.floor(daysLeft),
      };
    }),

  /** Every paid report on this device, newest first, one entry per purchase. */
  deviceReports: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1).max(64), kind: z.enum(["essay", "ucas"]) }))
    .query(async ({ input }) => getDeviceReports(input.fingerprint, input.kind)),

  /** One paid report on this device, to reopen it. */
  deviceReport: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1).max(64), id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const rec: any = await getAnonymousRowForDevice(input.fingerprint, input.id);
      if (!rec || !rec.unlocked || !rec.resultJson) return { found: false as const };
      return { found: true as const, id: rec.id as number, essayType: rec.essayType, subject: rec.subject, examSession: rec.examSession, result: normalizeDashes(rec.resultJson) };
    }),

  lockedReport: publicProcedure
    .input(z.object({ fingerprint: z.string().min(1).max(64), kind: z.enum(["essay", "ucas"]).optional() }))
    .query(async ({ input }) => {
      const ucas = input.kind === "ucas";
      const rec = ucas ? await getLatestAnonymousUcas(input.fingerprint) : await getLatestAnonymousEssay(input.fingerprint);
      if (!rec || !rec.resultJson) return { exists: false as const };
      const rj: any = normalizeDashes(rec.resultJson);
      const unlocked = !!(rec as any).unlocked;
      // Whatever was already shown for free stays available: taking back a preview the
      // student has already read, on a reload, is the fastest way to lose their trust.
      const preview: any = unlocked ? null : ucas ? buildUcasTeaser(rj) : buildTeaser(rj);
      return {
        exists: true as const,
        unlocked,
        // A locked row that was paid for once (a refund closed it) did not use the free preview.
        wasFreeRun: !(rec as any).unlockOrderId && !(rec as any).rerunOf,
        essayType: rec.essayType,
        subject: rec.subject,
        createdAt: rec.createdAt,
        // The same range the preview shows: the stored one could differ after a scoring change,
        // and two ranges side by side narrow the mark.
        band: ucas ? null : preview?.band_range ?? rj?.band_range ?? null,
        preview,
      };
    }),

  // Anonymous analysis — no login required, 1 free analysis per fingerprint
  analyzeAnonymous: publicProcedure
    .input(z.object({
      essayType: z.enum(ESSAY_TYPES),
      subject: z.string().min(1).max(100),
      researchQuestion: z.string().max(500, "Keep the research question or title under 500 characters.").optional(),
      essayText: z.string().min(300, "Paste at least 300 characters, roughly 50 words, or there is nothing to mark.").max(120000, "That is far longer than any IB coursework, and only the first 30,000 characters, about 5,000 words, are marked. Paste the work itself."),
      reflections: z.string().max(8000).optional(),
      clientFingerprint: z.string().min(1).max(64),
      examSession: z.enum(["nov2026", "may2027"]).optional(),
      /** Spend a credit this device owns. Asked for explicitly, never assumed. */
      spendDeviceCredit: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const unmarkable = unmarkableReason(input.essayType, input.subject, input.examSession);
      if (unmarkable) throw new TRPCError({ code: "BAD_REQUEST", message: unmarkable });
      // Use client-provided fingerprint (UUID stored in localStorage)
      const fingerprint = input.clientFingerprint;

      // The free run, or a credit this device bought. Guests have no account to
      // hold credits, so a pack bought without one lives on the device.
      const usage = await canAnonymousAnalyze(fingerprint);
      let paidByDevice = false;
      // Someone who asks for a paid report gets one, even if their free preview
      // is still unused: they pressed the button that says it costs a credit.
      let takenOrderId: string | null = null;
      if (input.spendDeviceCredit === true) {
        const spent = await spendDeviceCredit(fingerprint);
        paidByDevice = spent.ok;
        takenOrderId = spent.orderId;
      }
      if (!usage.allowed && !paidByDevice) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: usage.reason || "You have used the free preview on this device.",
        });
      }

      // Claim the free slot before the model is called, not after. The analysis
      // takes over a minute, and everything submitted inside that window used to
      // pass the check: two production devices already got two free runs each.
      const claim = paidByDevice ? null : await claimAnonymousFreeRun({
        fingerprint,
        type: "essay",
        essayType: input.essayType,
        subject: input.subject,
        researchQuestion: input.researchQuestion || null,
        resultJson: null,
        predictedGrade: null,
        examSession: input.examSession ?? null,
      }, "essay");
      if (!paidByDevice && !claim) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You have used the free preview on this device." });
      }
      // The purchase this report is charged to, fixed when the credit is taken.
      const deviceOrderId = paidByDevice ? takenOrderId : null;

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
        const result = normalizeDashes(parseModelJson(content));

        // Attach rubric metadata so frontend knows whether this was rubric-based
        const rubric = getRubric(input.essayType, input.subject, input.examSession);
        result._rubricAvailable = !!rubric;
        if (rubric) {
          result._rubricLabel = rubric.label;
          result._rubricTotalMarks = rubric.totalMarks;
        }
        result._wordCheck = storableWordCheck(checkWordLimit(rubric, input.essayText));
        reconcileScores(result, { essayType: input.essayType, subject: input.subject, reflectionsPasted: !!input.reflections?.trim(), session: input.examSession });
        // The preview is kept with the report, so the student is always shown the same one.
        result._preview = computeTeaser(result);

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
            // Opened with a pack credit: tie it to the pack, so it follows the buyer
            // into their account and closes if the pack is refunded.
            unlockOrderId: deviceOrderId,
            examSession: input.examSession ?? null,
            essayType: input.essayType,
            subject: input.subject,
            researchQuestion: input.researchQuestion || null,
            resultJson: result,
            predictedGrade: `${result.predicted_score}/${result.max_score}`,
          });
        }

        // Refunded while the model ran: the row was closed again, so only its preview goes back.
        const refundedMeanwhile = paidByDevice && await isPurchaseRefunded(deviceOrderId).catch(() => false);
        return paidByDevice && !refundedMeanwhile
          ? { result, wasAnonymous: true, unlocked: true as const }
          : { result: refundedMeanwhile ? { ...buildTeaser(result), _refunded: true } : buildTeaser(result), wasAnonymous: true, refunded: refundedMeanwhile };
      } catch (error: any) {
        console.error("[Anonymous Essay Analysis] Error:", error);
        // A run that produced nothing must not cost the free slot it claimed, nor
        // the credit it spent.
        if (claim?.id) await deleteAnonymousAnalysis(claim.id).catch(() => {});
        if (paidByDevice && await returnToLot(deviceOrderId).catch(() => true)) {
          await addDeviceCredits(fingerprint, 1).catch(() => {});
        }
        throw new Error(friendlyRunError(error, "marking"));
      }
    }),

  // Check if anonymous user can still analyze
  canAnalyzeAnonymous: publicProcedure
    .input(z.object({ clientFingerprint: z.string().min(1).max(64), kind: z.enum(["essay", "ucas"]).optional() }))
    .query(async ({ input }) => {
      const usage = await canAnonymousAnalyze(input.clientFingerprint, input.kind ?? "essay");
      return { canAnalyze: usage.allowed };
    }),

  analyze: protectedProcedure
    .input(z.object({
      essayType: z.enum(ESSAY_TYPES),
      subject: z.string().min(1).max(100),
      researchQuestion: z.string().max(500, "Keep the research question or title under 500 characters.").optional(),
      essayText: z.string().min(300, "Paste at least 300 characters, roughly 50 words, or there is nothing to mark.").max(120000, "That is far longer than any IB coursework, and only the first 30,000 characters, about 5,000 words, are marked. Paste the work itself."),
      reflections: z.string().max(8000).optional(),
      examSession: z.enum(["nov2026", "may2027"]).optional(),
      /**
       * Mark this work with a paid report even though the free preview is unused. Without
       * it the free slot always went first, so a buyer's first report cost the preview
       * as well as a credit.
       */
      spendCredit: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const unmarkable = unmarkableReason(input.essayType, input.subject, input.examSession);
      if (unmarkable) throw new TRPCError({ code: "BAD_REQUEST", message: unmarkable });
      const usage = await canUserAnalyzeEssay(ctx.user.id);
      if (!usage.allowed) {
        throw new Error(usage.reason || "No essay credits remaining");
      }

      const systemPrompt = buildEssaySystemPrompt(input.essayType, input.subject, input.examSession);
      const userPrompt = buildEssayUserPrompt(input.essayType, input.subject, input.researchQuestion, input.essayText, input.examSession, input.reflections);

      // Take the free slot or the credit before the model runs, and give it back
      // if nothing comes out. Checking first and charging afterwards let two tabs
      // run two free analyses, the same race the anonymous path had.
      // What was actually taken, not what we predicted would be taken: the free
      // slot can be gone by now, and giving back the wrong one loses a credit.
      let consumed: "free" | "credit";
      if (input.spendCredit === true) {
        await consumePaidEssayCredit(ctx.user.id);
        consumed = "credit";
      } else {
        consumed = await consumeEssayCredit(ctx.user.id);
      }
      // Decided by what was taken. The earlier read can say "free" when a second
      // tab took the free slot first, and this run then spends a paid credit.
      const wasFree = consumed === "free";
      const creditOrderId = wasFree ? null : await takeFromOldestLot({ userId: ctx.user.id });

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
        const result = normalizeDashes(parseModelJson(content));

        // Attach rubric metadata
        const rubric = getRubric(input.essayType, input.subject, input.examSession);
        result._rubricAvailable = !!rubric;
        if (rubric) {
          result._rubricLabel = rubric.label;
          result._rubricTotalMarks = rubric.totalMarks;
        }
        result._wordCheck = storableWordCheck(checkWordLimit(rubric, input.essayText));
        reconcileScores(result, { essayType: input.essayType, subject: input.subject, reflectionsPasted: !!input.reflections?.trim(), session: input.examSession });
        result._preview = computeTeaser(result);

        const analysis = await createAnalysis({
          userId: ctx.user.id,
          type: "essay",
          essayType: input.essayType,
          subject: input.subject,
          researchQuestion: input.researchQuestion || null,
          resultJson: result,
          predictedGrade: `${result.predicted_score}/${result.max_score}`,
          unlocked: !wasFree,
          unlockedAt: wasFree ? null : new Date(),
          unlockOrderId: creditOrderId,
          // Recorded so a re-check cannot silently move the work to another rubric.
          examSession: input.examSession ?? null,
        });

        // Free tier gets a teaser; paid credits get the full report immediately.
        // Refunded while the model ran: the row was closed again, so only its preview goes back.
        if (wasFree) {
          return { id: analysis.id, result: buildTeaser(result), wasFree: true };
        }
        if (await isPurchaseRefunded(creditOrderId).catch(() => false)) {
          return { id: analysis.id, result: { ...buildTeaser(result), _refunded: true }, wasFree: true, refunded: true };
        }
        return { id: analysis.id, result, wasFree: false };
      } catch (error: any) {
        console.error("[Essay Analysis] Error:", error);
        // Nothing was produced, so the free slot or credit comes back.
        // A credit from a purchase refunded while the model ran stays spent: the refund closed it.
        if (wasFree || await returnToLot(creditOrderId).catch(() => true)) {
          await refundEssayConsumption(ctx.user.id, consumed === "free").catch(() => {});
        }
        throw new Error(friendlyRunError(error, "marking"));
      }
    }),
});


// ---- Dashboard Router ----
const dashboardRouter = router({
  history: protectedProcedure
    // The dashboard lists every report: a pack with its re-checks is dozens of rows,
    // and a cap of 20 hid older reports along with their Delete buttons.
    .input(z.object({ limit: z.number().min(1).max(500).optional() }).optional())
    .query(async ({ ctx, input }) => {
      const rows = await getUserAnalyses(ctx.user.id, input?.limit || 20);
      // A locked analysis must not expose the exact predicted score anywhere — that score is
      // the headline of the paid report.
      return rows.map((r: any) => (r.unlocked ? r : { ...r, predictedGrade: null, resultJson: null }));
    }),

  /** The newest report opened in the last day, for the "your full report is open" notice. */
  recentlyOpened: protectedProcedure.query(async ({ ctx }) => {
    const row = await getRecentlyOpenedReport(ctx.user.id, 24 * 60 * 60 * 1000);
    return row ? { id: row.id, essayType: row.essayType, subject: row.subject } : null;
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
        // What the free preview showed stays readable here; only the paid part is withheld.
        const preview = analysis.resultJson && analysis.essayType !== "UCAS" ? buildTeaser(normalizeDashes(analysis.resultJson)) : null;
        return { ...analysis, resultJson: null, predictedGrade: null, preview, locked: true as const };
      }
      return { ...analysis, resultJson: normalizeDashes(analysis.resultJson), locked: false as const };
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
  /**
   * Whether an order has been paid, for the purchase event on the page the buyer returns
   * to. Taking the product and amount from the address bar let anyone record a sale.
   */
  orderStatus: publicProcedure
    .input(z.object({ orderId: z.string().uuid() }))
    .query(async ({ input }) => {
      const order: any = await getOrderById(input.orderId);
      if (!order || order.status !== "paid") return { paid: false as const };
      // QA purchases are made with example.com addresses; the page does not report them to analytics.
      const buyer: any = await getUserById(order.userId).catch(() => null);
      const test = /@example\.(com|org|net)$/i.test(String(buyer?.email || ""));
      return { paid: true as const, sku: String(order.sku), valueUsd: Number(order.amountUsd) / 100, test };
    }),

  // Create LemonSqueezy card checkout for guest (unauthenticated) users
  createGuestCheckout: publicProcedure
    .input(z.object({
      productKey: z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]),
      email: z.string().email("Please enter a valid email address"),
      /** Device the locked report sits on, so the payment can open it without an account. */
      fingerprint: z.string().min(1).max(64).optional(),
      /** Page to return to after paying. */
      returnTo: z.enum(["essay", "ucas-personal-statement"]).optional(),
      /** Bought beside a locked preview, which the payment should open. */
      unlockPreview: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      if (input.productKey === "UNIVERSITY_SINGLE") {
        throw new Error("The University Strategy is no longer offered.");
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
        // Every purchase carries the device, because a guest's reports live on it.
        // Whether it also opens a preview is the buyer's context, not a guess.
        input.fingerprint,
        input.returnTo,
        undefined,
        input.unlockPreview === true,
        true,
      );

      return { checkoutUrl, orderId };
    }),

  // Create LemonSqueezy card checkout (requires authentication)
  createLemonsqueezyCheckout: protectedProcedure
    .input(z.object({
      productKey: z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]),
      /** Signed-in buyers have a device too, and their report lives on it. */
      fingerprint: z.string().min(1).max(64).optional(),
      returnTo: z.enum(["essay", "ucas-personal-statement"]).optional(),
      /** The locked account report the buyer is looking at, opened when the payment lands. */
      analysisId: z.number().int().positive().optional(),
      /** Bought beside a locked device preview, which the payment should open. */
      unlockPreview: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (input.productKey === "UNIVERSITY_SINGLE") {
        throw new Error("The University Strategy is no longer offered.");
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
      // A signed-in preview is an account row, so name it; only a report this
      // account owns can be opened by its payment.
      let unlockAnalysisId: number | undefined;
      if (input.analysisId) {
        const own = await getAnalysisById(input.analysisId, ctx.user.id);
        if (own && (own as any).userId === ctx.user.id && !(own as any).unlocked) unlockAnalysisId = own.id;
      }
      const { checkoutUrl } = await createLemonsqueezyCheckout(
        orderId,
        variantId,
        ctx.user.email || null,
        sku, // productSlug for redirect URL tracking
        product.priceAmount, // valueUsd in cents for redirect URL tracking
        input.fingerprint,
        input.returnTo,
        unlockAnalysisId,
        input.unlockPreview === true,
        false,
      );

      return { checkoutUrl, orderId };
    }),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(async ({ ctx }) => {
      const token = sdk.sessionTokenFrom(ctx.req);
      if (token) await sdk.revokeSession(token);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  essay: essayRouter,
  dashboard: dashboardRouter,
  pricing: pricingRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
