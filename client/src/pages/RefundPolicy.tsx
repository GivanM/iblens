import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";

export default function RefundPolicy() {
  return (
    <div className="py-16 bg-background">
      <SEOHead
        title="Refund Policy: 7-Day Money-Back Guarantee | IBLens"
        description="IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund to your original payment method."
        canonical="/refund-policy"
      />
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Refund Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: 13 September 2026</p>

        <div className="prose prose-sm max-w-none text-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">7-day money-back guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              We want you to be completely satisfied with your IBLens purchase. If for any reason you are not happy with your essay or personal statement report, you may request a full refund within <strong className="text-foreground">7 days</strong> of your purchase date, no questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to request a refund</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Email us at <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline font-medium">glushkovim@gmail.com</a> within 7 days of your purchase.</li>
              <li>Include the email address you used at checkout and the product you purchased.</li>
              <li>We will process your refund within 3-5 business days via the original payment method.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Refund methods</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">All payments (via Lemon Squeezy):</strong> Refunded to the original payment method, whichever you used at checkout. Please allow 5-10 business days for the refund to appear on your statement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              All paid products are eligible for a refund within the 7-day window, including full reports, packs of 5 or 10 reports and UCAS personal statement reviews. The free preview is not refundable, as no payment was made. If you are under 18 and paid without the permission of the person who owns the card, email us and we will refund the payment, even after the 7 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Partly used packs</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you bought a pack of 5 or 10 reports and have used some of them, we will still issue a full refund within the 7-day window. We believe in making this process simple and fair.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">What a refund closes</h2>
            <p className="text-muted-foreground leading-relaxed">
              A refund cancels what that purchase paid for. The reports it opened close again and their re-checks end: an essay report shows only its free preview, and a UCAS review shows only its free preview on the UCAS page and is no longer available in your dashboard. Any reports from it you have not used yet are removed. Reports and packs you paid for separately are not affected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our refund policy, please reach out to <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline font-medium">glushkovim@gmail.com</a>. Every refund request gets an answer by email.
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
