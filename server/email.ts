import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(RESEND_API_KEY);
  }
  return resend;
}

interface PaymentConfirmationParams {
  email: string;
  userName: string | null;
  amountUsd: number; // in cents
  skuHumanName: string;
  essayCredits: number;
  universityCredits: number;
}

const SKU_HUMAN_NAMES: Record<string, string> = {
  essay_single: "Single Essay Analysis",
  essay_pack_5: "5-Pack Essay Analyses",
  essay_pack_10: "10-Pack Essay Analyses",
  university_single: "University Strategy Report",
  university_strategy: "University Strategy Report",
};

export function getSkuHumanName(sku: string): string {
  return SKU_HUMAN_NAMES[sku] || sku;
}

export async function sendPaymentConfirmationEmail(params: PaymentConfirmationParams): Promise<boolean> {
  const client = getResend();
  if (!client) {
    console.warn("[Email] Email skipped: RESEND_API_KEY not configured");
    return false;
  }

  const { email, userName, amountUsd, skuHumanName, essayCredits, universityCredits } = params;

  // Determine display name: first name or email local part
  const displayName = userName
    ? userName.split(" ")[0]
    : email.split("@")[0];

  // Build credit balance string
  const balanceParts: string[] = [];
  if (essayCredits > 0) balanceParts.push(`${essayCredits} essay credit${essayCredits !== 1 ? "s" : ""}`);
  if (universityCredits > 0) balanceParts.push(`${universityCredits} university credit${universityCredits !== 1 ? "s" : ""}`);
  const balanceStr = balanceParts.length > 0 ? balanceParts.join(" + ") : "updated";

  const amount = `$${(amountUsd / 100).toFixed(2)}`;

  const body = `Hi ${displayName},

Your payment of ${amount} for ${skuHumanName} has been confirmed.

Your credit balance is now ${balanceStr}.

Start analyzing: https://iblens.com/essay
View your purchase history: https://iblens.com/dashboard

If you have questions, reply to this email.

— IBLens`;

  try {
    const { error } = await client.emails.send({
      from: "IBLens <noreply@iblens.com>",
      to: email,
      subject: "IBLens — payment confirmed",
      text: body,
    });

    if (error) {
      console.error("[Email] Failed to send payment confirmation:", error);
      return false;
    }

    console.log(`[Email] Payment confirmation sent to ${email}`);
    return true;
  } catch (err) {
    console.error("[Email] Error sending payment confirmation:", err);
    return false;
  }
}
