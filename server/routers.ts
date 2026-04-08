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
  canUserAnalyzeEssay,
  canUserAnalyzeUniversity,
  consumeEssayCredit,
  consumeUniversityCredit,
  getUserCredits,
  getUserPayments,
} from "./db";
import { createStripeCheckout } from "./stripe/stripe";
import { PRODUCTS, ProductKey } from "./stripe/products";
import { createLSCheckoutSession } from "./lemonsqueezy/lemonsqueezy";
import { createNPInvoice } from "./nowpayments/nowpayments";

const IB_SUBJECTS = [
  "Business Management", "Economics", "History", "Biology", "Chemistry",
  "Physics", "Mathematics", "English A Literature", "Psychology",
  "Computer Science", "Geography", "Visual Arts", "Music",
  "Environmental Systems and Societies", "Philosophy",
] as const;

const ESSAY_TYPES = ["IA", "EE", "TOK"] as const;

const productKeySchema = z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]);

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
      const usage = await canUserAnalyzeEssay(ctx.user.id);
      if (!usage.allowed) {
        throw new Error(usage.reason || "No essay credits remaining");
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

        await consumeEssayCredit(ctx.user.id);

        return { id: analysis.id, result, wasFree: usage.isFree };
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
      return getUserAnalyses(ctx.user.id, input?.limit || 20);
    }),

  analysis: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const analysis = await getAnalysisById(input.id, ctx.user.id);
      if (!analysis) throw new Error("Analysis not found");
      return analysis;
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

// ---- Payment Router ----
const paymentRouter = router({
  stripeCheckout: protectedProcedure
    .input(z.object({ origin: z.string(), productKey: productKeySchema }))
    .mutation(async ({ ctx, input }) => {
      const session = await createStripeCheckout({
        userId: ctx.user.id,
        userEmail: ctx.user.email,
        userName: ctx.user.name,
        origin: input.origin,
        productKey: input.productKey,
      });
      return { url: session.url };
    }),

  lemonSqueezyCheckout: protectedProcedure
    .input(z.object({ origin: z.string(), productKey: productKeySchema }))
    .mutation(async ({ ctx, input }) => {
      const result = await createLSCheckoutSession({
        userId: ctx.user.id,
        userEmail: ctx.user.email,
        userName: ctx.user.name,
        origin: input.origin,
        productKey: input.productKey,
      });
      return { url: result.url };
    }),

  cryptoCheckout: protectedProcedure
    .input(z.object({ origin: z.string(), productKey: productKeySchema }))
    .mutation(async ({ ctx, input }) => {
      const result = await createNPInvoice({
        userId: ctx.user.id,
        userEmail: ctx.user.email,
        origin: input.origin,
        productKey: input.productKey,
      });
      return { url: result.invoiceUrl };
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
