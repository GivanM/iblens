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
  generateFingerprint,
  canAnonymousAnalyze,
  createAnonymousAnalysis,
  createOrder,
  getUserOrders,
} from "./db";
import { createNowPaymentsInvoice } from "./nowpayments/nowpayments";
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
function buildEssaySystemPrompt(essayType: string, subject: string): string {
  const rubric = getRubric(essayType, subject);
  const rubricFragment = buildRubricPromptFragment(essayType, subject);

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
function buildEssayUserPrompt(essayType: string, subject: string, researchQuestion: string | undefined, essayText: string): string {
  const rubric = getRubric(essayType, subject);

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

  return `Analyze this IB ${essayType} for: ${subject}
Research Question: ${researchQuestion || "not provided"}

TEXT:
${essayText.substring(0, 6000)}

Respond with this exact JSON structure:
{
  "band_range": "4-5",
  "predicted_score": 4,
  "max_score": 7,
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

// ---- Essay Analysis Router ----
const essayRouter = router({
  // Anonymous analysis — no login required, 1 free analysis per fingerprint
  analyzeAnonymous: publicProcedure
    .input(z.object({
      essayType: z.enum(ESSAY_TYPES),
      subject: z.string().min(1),
      researchQuestion: z.string().optional(),
      essayText: z.string().min(150, "Please provide at least 200 words for meaningful analysis."),
      clientFingerprint: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      // Use client-provided fingerprint (UUID stored in localStorage)
      const fingerprint = input.clientFingerprint;

      // Check if this anonymous user already used their free analysis
      const usage = await canAnonymousAnalyze(fingerprint);
      if (!usage.allowed) {
        throw new Error(usage.reason || "Free analysis already used. Sign in to continue.");
      }

      const systemPrompt = buildEssaySystemPrompt(input.essayType, input.subject);
      const userPrompt = buildEssayUserPrompt(input.essayType, input.subject, input.researchQuestion, input.essayText);

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

        // Attach rubric metadata so frontend knows whether this was rubric-based
        const rubric = getRubric(input.essayType, input.subject);
        result._rubricAvailable = !!rubric;
        if (rubric) {
          result._rubricLabel = rubric.label;
          result._rubricTotalMarks = rubric.totalMarks;
        }

        // Save anonymous analysis
        await createAnonymousAnalysis({
          fingerprint,
          type: "essay",
          essayType: input.essayType,
          subject: input.subject,
          researchQuestion: input.researchQuestion || null,
          resultJson: result,
          predictedGrade: `${result.predicted_score}/${result.max_score}`,
        });

        return { result, wasAnonymous: true };
      } catch (error: any) {
        console.error("[Anonymous Essay Analysis] Error:", error);
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
      essayText: z.string().min(150, "Please provide at least 200 words for meaningful analysis."),
    }))
    .mutation(async ({ ctx, input }) => {
      const usage = await canUserAnalyzeEssay(ctx.user.id);
      if (!usage.allowed) {
        throw new Error(usage.reason || "No essay credits remaining");
      }

      const systemPrompt = buildEssaySystemPrompt(input.essayType, input.subject);
      const userPrompt = buildEssayUserPrompt(input.essayType, input.subject, input.researchQuestion, input.essayText);

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

        // Attach rubric metadata
        const rubric = getRubric(input.essayType, input.subject);
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
          essayType: null,
          subject: null,
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

  orders: protectedProcedure.query(async ({ ctx }) => {
    return getUserOrders(ctx.user.id);
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

// ---- Payment Router (LemonSqueezy + NOWPayments) ----
const paymentRouter = router({
  // Create NOWPayments crypto invoice (requires authentication)
  createCryptoInvoice: protectedProcedure
    .input(z.object({
      productKey: z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const product = PRODUCTS[input.productKey];
      if (!product) throw new Error("Invalid product");

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
        provider: "nowpayments",
      });

      // Create NOWPayments invoice
      const priceUsd = product.priceAmount / 100; // Convert cents to dollars
      const description = `IBLens: ${product.name} (user:${ctx.user.id}, sku:${sku})`;

      const { invoiceUrl, invoiceId } = await createNowPaymentsInvoice(
        orderId,
        priceUsd,
        description,
      );

      // Update order with invoice ID
      const { updateOrderStatus } = await import("./db");
      await updateOrderStatus(orderId, "pending", undefined);
      // Store npInvoiceId
      const { getDb } = await import("./db");
      const { orders } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();
      if (db) {
        await db.update(orders).set({ npInvoiceId: invoiceId }).where(eq(orders.id, orderId));
      }

      return { invoiceUrl, orderId };
    }),

  // Create LemonSqueezy card checkout (requires authentication)
  createLemonsqueezyCheckout: protectedProcedure
    .input(z.object({
      productKey: z.enum(["ESSAY_SINGLE", "ESSAY_PACK_5", "ESSAY_PACK_10", "UNIVERSITY_SINGLE"]),
    }))
    .mutation(async ({ ctx, input }) => {
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

      // Create LemonSqueezy checkout
      const { checkoutUrl } = await createLemonsqueezyCheckout(
        orderId,
        variantId,
        ctx.user.email || null,
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
