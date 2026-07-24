import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="py-16 bg-background">
      <SEOHead
        title="Privacy Policy | IBLens"
        description="How IBLens handles your data: what we collect, how your essay is processed by our AI provider, retention, your rights, and children's privacy."
        canonical="/privacy"
      />
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: 16 July 2026</p>
        <div className="prose prose-sm max-w-none text-foreground space-y-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1.5">
          <p>This policy explains what personal data IBLens collects, why, who processes it, how long we keep it, and the rights you have. IBLens is operated by an independent developer; for any privacy request, contact <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline">glushkovim@gmail.com</a>.</p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Essay text you submit</strong> for analysis (IA, EE or TOK), plus the subject and essay type you select.</li>
            <li><strong>Account details</strong> if you sign in (name and email address via Google sign-in), or an email you provide to save a report.</li>
            <li><strong>Usage and device data</strong> through cookies and analytics (Google Tag Manager, Google Analytics, Google Ads), such as pages viewed and approximate location for consent handling.</li>
          </ul>

          <h2>How your essay is processed (AI disclosure)</h2>
          <p>To produce your analysis, the text you submit is transmitted over an encrypted connection to our AI provider, <strong>Anthropic PBC</strong>, which processes it on our behalf solely to generate the feedback you receive. We do not use your essay to train any AI model, and we do not sell it. Anonymous analyses are not stored permanently; if you are signed in, your analysis history is stored in your account until you delete it.</p>

          <h2>Who we share data with</h2>
          <p>We do not sell your personal data. We share it only with the service providers needed to run IBLens, each acting under their own terms:</p>
          <ul>
            <li><strong>Anthropic PBC</strong> - AI processing of your essay to generate analysis.</li>
            <li><strong>LemonSqueezy</strong> - payment processing and receipts (they handle your card data; we never see full card numbers).</li>
            <li><strong>Google</strong> - analytics, advertising measurement, and sign-in.</li>
          </ul>
          <p>We do not share your essay content with your school, universities, examiners, or other students.</p>

          <h2>How long we keep it</h2>
          <ul>
            <li>Anonymous analyses: not stored permanently.</li>
            <li>Signed-in analysis history: kept until you delete it or ask us to.</li>
            <li>Account email: kept while your account is active, then on request.</li>
          </ul>

          <h2>Your rights</h2>
          <p>You can ask us to access, correct, or delete your data, or to stop processing it. Email <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline">glushkovim@gmail.com</a> and we will action deletion promptly. If you are in the UK/EU, you also have the right to complain to your data protection authority.</p>

          <h2>Children and young people</h2>
          <p>IBLens is intended for secondary-school students preparing IB coursework, some of whom are under 18. We collect only what is needed to provide the analysis and, where required by law such as the UK Children's Code, aim to keep data use to a minimum. If you are below the digital-consent age in your country, please use IBLens with the awareness of a parent, guardian, or teacher. We do not knowingly collect more personal data from young users than the service requires.</p>

          <h2>International processing</h2>
          <p>Our providers may process data in countries outside your own, including the United States. Where required, transfers rely on the safeguards those providers put in place.</p>

          <h2>Cookies and consent</h2>
          <p>We use essential cookies to run the site and, subject to your consent where required, analytics and advertising cookies. In regions that require it, a consent banner controls non-essential cookies.</p>

          <h2>Changes</h2>
          <p>We may update this policy; material changes will be reflected by the date above. Questions: <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline">glushkovim@gmail.com</a>. See also our <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>.</p>
        </div>
      </div>
    </div>
  );
}
