import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";

export default function RefundPolicy() {
  return (
    <div className="py-16 bg-background">
      <SEOHead
        title="Refund Policy — 7-Day Money-Back Guarantee | IBLens"
        description="IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund."
        canonical="/refund-policy"
      />
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Refund Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: April 30, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">7-Day Money-Back Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              We want you to be completely satisfied with your IBLens purchase. If for any reason you are not happy with your essay analysis or university strategy report, you may request a full refund within <strong className="text-foreground">7 days</strong> of your purchase date — no questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Request a Refund</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Email us at <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline font-medium">glushkovim@gmail.com</a> within 7 days of your purchase.</li>
              <li>Include your account email address and the product you purchased.</li>
              <li>We will process your refund within 3–5 business days via the original payment method.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Refund Methods</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Card payments (via LemonSqueezy):</strong> Refunded to the original card. Please allow 5–10 business days for the refund to appear on your statement.</li>
              <li><strong className="text-foreground">Cryptocurrency payments (via NOWPayments):</strong> Refunded in the original cryptocurrency to the wallet address you provide. Processing time depends on network confirmation speed (typically 1–3 business days).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              All paid products are eligible for a refund within the 7-day window, including single essay analyses, essay packs, and university strategy reports. The free first essay analysis is not applicable for refund as no payment was made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Unused Credits</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you purchased an essay pack (5 or 10 analyses) and have used some credits, we will still issue a full refund within the 7-day window. We believe in making this process simple and fair.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our refund policy, please reach out to <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline font-medium">glushkovim@gmail.com</a>. We typically respond within 24 hours.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
