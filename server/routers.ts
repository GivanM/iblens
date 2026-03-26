import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import {
  createAnalysis,
  getUserAnalyses,
  getAnalysisById,
  incrementAnalysisCount,
  canUserAnalyze,
  getUserUsageStats,
} from "./db";
import { createCheckoutSession } from "./stripe/stripe";
import { createLSCheckoutSession } from "./lemonsqueezy/lemonsqueezy";

const IB_SUBJECTS = [
  "Business Management", "Economics", "History", "Biology", "Chemistry",
  "Physics", "Mathematics", "English A Literature", "Psychology",
  "Computer Science", "Geography", "Visual Arts", "Music",
  "Environmental Systems and Societies", "Philosophy",
] as const;

const ESSAY_TYPES = ["IA", "EE", "TOK"] as const;

const FIELDS_OF_STUDY = [
  "Business / Management", "Sports Management / Hospitality", "Economics",
  "Law", "Engineering", "Medicine / Pre-med", "Computer Science",
  "Psychology / Social Sciences", "Humanities / Liberal Arts", "Natural Sciences",
] as const;

// ---- Essay Analysis Router ----
const essayRouter = router({
  analyze: protectedProcedure
    .input(z.object({
      essayType: z.enum(ESSAY_TYPES),
      subject: z.string().min(1),
      researchQuestion: z.string().optional(),
      essayText: z.string().min(150, "Please provide at least 200 words for meaningful analysis."),
    }))
    .mutation(async ({ ctx, input }) => {
      const usage = await canUserAnalyze(ctx.user.id);
      if (!usage.allowed) {
        throw new Error(usage.reason || "Analysis limit reached");
      }

      const systemPrompt = `You are an experienced IB examiner with 12 years of grading experience across multiple subjects. Analyze the student's work strictly according to IB assessment criteria. Be specific, constructive, and honest. Reference actual IB criteria names and descriptors.

IMPORTANT: Respond with a single valid JSON object. No markdown, no text before or after the JSON.`;

      const userPrompt = `Analyze this IB ${input.essayType} for: ${input.subject}
Research Question: ${input.researchQuestion || "not provided"}

TEXT:
${input.essayText.substring(0, 6000)}

Respond with this exact JSON structure:
{
  "band_range": "4-5",
  "predicted_score": 4,
  "max_score": 7,
  "overall_comment": "Detailed overall assessment of the work",
  "criteria": [
    {"name": "Criterion A: Knowledge and Understanding", "score": 3, "max": 4, "comment": "Specific feedback for this criterion"}
  ],
  "risks": [
    {"title": "Risk title", "description": "What specifically loses marks and why"}
  ],
  "leverage_zones": [
    {"title": "Improvement area", "description": "Specific actionable advice to gain marks"}
  ],
  "next_steps": ["Specific step 1", "Specific step 2", "Specific step 3"]
}`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");

        const cleaned = jsonMatch[0].replace(/,\s*([\]\}])/g, '$1');
        const result = JSON.parse(cleaned);

        const analysis = await createAnalysis({
          userId: ctx.user.id,
          type: "essay",
          essayType: input.essayType,
          subject: input.subject,
          researchQuestion: input.researchQuestion || null,
          resultJson: result,
          predictedGrade: `${result.predicted_score}/${result.max_score}`,
        });

        await incrementAnalysisCount(ctx.user.id);

        return { id: analysis.id, result };
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
      const usage = await canUserAnalyze(ctx.user.id);
      if (!usage.allowed) {
        throw new Error(usage.reason || "Analysis limit reached");
      }

      const now = new Date();
      const currentDate = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      const yr = now.getFullYear();

      const systemPrompt = `You are an experienced IB university counselor with 15 years of advising students on university admissions worldwide. Give realistic, data-informed advice based on actual IB score requirements and admission statistics. Be honest about chances.

IMPORTANT: Respond with a single valid JSON object. No markdown, no text before or after the JSON.`;

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
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        const rawContent = response.choices?.[0]?.message?.content;
        const content = typeof rawContent === "string" ? rawContent : "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");

        const cleaned = jsonMatch[0].replace(/,\s*([\]\}])/g, '$1');
        const result = JSON.parse(cleaned);

        const analysis = await createAnalysis({
          userId: ctx.user.id,
          type: "university",
          predictedScore: input.predictedScore,
          averageGrade: String(input.averageGrade),
          fieldOfStudy: input.fieldOfStudy,
          resultJson: result,
          predictedGrade: `${input.predictedScore}/45`,
        });

        await incrementAnalysisCount(ctx.user.id);

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
      return getUserAnalyses(ctx.user.id, input?.limit || 20);
    }),

  analysis: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const analysis = await getAnalysisById(input.id, ctx.user.id);
      if (!analysis) throw new Error("Analysis not found");
      return analysis;
    }),

  usage: protectedProcedure.query(async ({ ctx }) => {
    const stats = await getUserUsageStats(ctx.user.id);
    if (!stats) throw new Error("User not found");

    const canAnalyze = stats.tier === "pro" || stats.analysisCount < stats.freeAnalysisLimit;
    const remaining = stats.tier === "pro" ? -1 : Math.max(0, stats.freeAnalysisLimit - stats.analysisCount);

    return {
      tier: stats.tier,
      analysisCount: stats.analysisCount,
      freeAnalysisLimit: stats.freeAnalysisLimit,
      canAnalyze,
      remaining,
      hasSubscription: !!stats.stripeSubscriptionId,
    };
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
  stripe: router({
    createCheckout: protectedProcedure
      .input(z.object({ origin: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const session = await createCheckoutSession({
          userId: ctx.user.id,
          userEmail: ctx.user.email,
          userName: ctx.user.name,
          origin: input.origin,
        });
        return { url: session.url };
      }),
  }),
  lemonsqueezy: router({
    createCheckout: protectedProcedure
      .input(z.object({ origin: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const result = await createLSCheckoutSession({
          userId: ctx.user.id,
          userEmail: ctx.user.email,
          userName: ctx.user.name,
          origin: input.origin,
        });
        return { url: result.url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
