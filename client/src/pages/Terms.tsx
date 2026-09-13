import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="py-16 bg-background">
      <SEOHead
        title="Terms of Use | IBLens"
        description="Terms for using IBLens: scores are AI estimates, not official IB grades; acceptable use; and the independence of IBLens from the International Baccalaureate Organization."
        canonical="/terms"
      />
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Use</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: 13 September 2026</p>
        <div className="prose prose-sm max-w-none text-foreground space-y-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1.5">
          <p>By using IBLens you agree to these terms. If you do not agree, please do not use the service.</p>

          <h2>What IBLens is</h2>
          <p>IBLens is an AI tool that reads a piece of work you paste in (coursework in 14 subjects, including the externally assessed Visual Arts, Music and Film coursework, an Extended Essay, a Theory of Knowledge essay or exhibition commentary, or a UCAS personal statement) and gives feedback on how it performs against the published assessment criteria or guidance, before you submit it.</p>

          <h2>Estimates, not official grades</h2>
          <p>Any score or band shown by IBLens is an <strong>AI-generated estimate</strong> to help you improve your own work. It is not an official grade, not a prediction of your final result, and not a substitute for your teacher's or the examiner's assessment. Your school and the examining body determine your actual marks. Do not make irreversible decisions (such as whether to pay for a re-mark) solely on the basis of IBLens output.</p>

          <h2>Independence from the IB</h2>
          <p>IBLens is an independent service. It is <strong>not affiliated with, endorsed by, or connected to the International Baccalaureate Organization</strong>. References to IB programmes, subjects, and assessment criteria are used descriptively to identify the coursework the tool gives feedback on. All IB trademarks belong to their owner.</p>

          <h2>Acceptable use and academic integrity</h2>
          <ul>
            <li>Use IBLens only for feedback on work you wrote yourself.</li>
            <li>Do not paste AI-generated text into work you submit for assessment.</li>
            <li>Follow your school's own policy on the use of AI tools; when in doubt, disclose. See our <Link href="/resources/academic-integrity" className="text-primary hover:underline">academic integrity guide</Link>.</li>
          </ul>

          <h2>Accounts and payment</h2>
          <p>Full reports are paid for one at a time or in packs of 5 or 10. Prices are shown in US dollars at checkout, payment is handled by Lemon Squeezy, and refunds are covered by our <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>. A paid report includes two free re-checks: a revised version of the same piece of work, for the same task and subject, submitted within 14 days of the report opening. A different piece of work needs its own report. You are responsible for keeping your account secure.</p>

          <h2>No warranty and limitation of liability</h2>
          <p>IBLens is provided "as is", without warranty that its feedback is accurate, complete, or suitable for a particular purpose. To the extent permitted by law, we are not liable for any loss arising from reliance on the tool's output, including grades, admissions outcomes, or re-mark decisions. Nothing in these terms limits any right you have by law, including under the consumer protection law where you live.</p>

          <h2>Age and parental consent</h2>

      <p>
        IBLens is built for secondary-school students preparing IB coursework and UCAS applications, most of whom are under 18.
      </p>

      <p>
        <strong>If you are under 18, you may only make a purchase with the permission of the person who
        owns the payment card.</strong> By paying, you confirm that you either own the card or have that
        permission. If a payment was made without it, email us and we will refund it, regardless of the
        7-day window in our <Link href="/refund-policy">refund policy</Link>.
      </p>

      <p>
        If you are below the digital-consent age in your country (13 to 16 depending on where you live),
        please ask a parent, guardian or teacher before submitting work for analysis.
      </p>

      <h2>Changes</h2>
          <p>We may update these terms; the date above reflects the latest version. Questions: <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline">glushkovim@gmail.com</a>. See also our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
        </div>
      </div>
    </div>
  );
}
