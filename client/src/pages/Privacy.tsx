import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="py-16 bg-background">
      <SEOHead
        title="Privacy Policy | IBLens"
        description="How IBLens handles your data: what we collect, how your essay is processed by our AI provider (Anthropic), retention, your rights, and children's privacy."
        canonical="/privacy"
      />
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: 13 September 2026</p>
        <div className="prose prose-sm max-w-none text-foreground space-y-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1.5">
          <p>This policy explains what personal data IBLens collects, why, who processes it, how long we keep it, and the rights you have. IBLens is operated by an independent developer; for any privacy request, contact <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline">glushkovim@gmail.com</a>.</p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Text you submit</strong> for analysis: IB coursework (IA, EE or TOK) or UCAS personal statement answers, plus the subject, essay type, research question or course you enter.</li>
            <li><strong>The reports we generate</strong> from that text. A report can quote short passages from what you submitted.</li>
            <li><strong>Account details</strong> if you sign in: your name, email address and account ID from Google sign-in (Google also sends your profile picture, which we do not keep), and the email address you type into the checkout form if you buy without an account. It is stored when you continue to checkout, even if you then do not pay.</li>
            <li><strong>Purchase records</strong>: the order, the product, the amount and the name and email address our payment provider sends us when you pay.</li>
            <li><strong>Usage and device data</strong> through Google Tag Manager, Google Analytics and Google Ads, such as pages viewed. Their scripts load on every page. Until you accept analytics and advertising cookies they run in Google's consent mode, which sets no such cookies but can still send Google basic signals without cookies, such as that a page was loaded. We also keep a random device identifier in your browser and on our server, and pass it to Lemon Squeezy with each checkout, so that a free preview, a purchase made without an account and its re-checks stay tied to this browser. On the home page we also count, per day, how often each version of the headline was shown and whether it was followed by a button press, a submission or a checkout. These are totals only: nothing is stored in your browser for them and nothing identifies you.</li>
          </ul>

          <h2>Why we are allowed to use it</h2>
          <ul>
            <li><strong>To provide what you ask for</strong> (performance of a contract): marking your work, your free preview, purchases, re-checks and your account.</li>
            <li><strong>Your consent</strong>: analytics and advertising cookies. You can withdraw it at any time under "Cookie settings".</li>
            <li><strong>Legal obligation</strong>: keeping purchase records for accounting and tax.</li>
            <li><strong>Legitimate interests</strong>: keeping the free preview to one per device or account with the random device identifier, preventing abuse and keeping the service secure; and measuring which ads lead to purchases. When a purchase completes, our server sends Google the order number, the product and the amount, with no name, email address or account, whatever your cookie choice; and before you accept cookies, Google's scripts may send basic signals without cookies. You can object to any of this by emailing us.</li>
          </ul>

          <h2>How your essay is processed (AI disclosure)</h2>
          <p>To produce your analysis, the text you submit is transmitted over an encrypted connection to our AI provider, <strong>Anthropic PBC</strong>, which processes it on our behalf solely to generate the feedback you receive. We do not use your essay to train any AI model, and we do not sell it. Anthropic's own policy for this kind of use is to delete inputs and outputs within 30 days, and to keep them longer only where content is flagged under its usage policy or the law requires it.</p>
          <p>One detail most services leave out, and we would rather state it: the request does not travel to Anthropic directly. It passes through <strong>a relay server we operate in Helsinki, Finland</strong> (Hetzner Online GmbH), which exists because our main server cannot reach the AI provider reliably on its own. The relay holds your text in memory only while the analysis runs, keeps the answer in memory for up to 15 minutes so our server can collect it, writes neither to disk, and nobody else has access to it. The full text you submit, an essay or a personal statement, is never written to our database, at any stage; the stored report can quote short passages from it.</p>

          <h2>Who we share data with</h2>
          <p>We do not sell your personal data. We share it only with the service providers needed to run IBLens, each acting under their own terms:</p>
          <ul>
            <li><strong>Anthropic PBC:</strong> AI processing of your essay to generate the analysis.</li>
            <li><strong>Hetzner Online GmbH</strong> (Helsinki, Finland): the server we operate to reach the AI provider; your text passes through it in transit.</li>
            <li><strong>Lemon Squeezy:</strong> payment processing and receipts (they handle your card data; we never see full card numbers).</li>
            <li><strong>Google:</strong> analytics, advertising measurement, sign-in, and web fonts (Google Fonts receives your IP address when a page loads). When a purchase completes, the page and our server send Google the order number, the product and the amount, without your name, email address or account.</li>
          </ul>
          <p>We do not share your essay content with your school, universities, examiners, or other students.</p>

          <h2>How long we keep it</h2>
          <ul>
            <li>Reports made without an account (essays and UCAS statements): the report and the research question or course are deleted 90 days after the analysis, unless the report was purchased. Purchased reports are kept so you can reopen them and use your re-checks; ask us and we delete them. The full text you submitted is never stored.</li>
            <li>Checkouts that are started but never paid: the order and the email typed into the checkout form are deleted after 30 days.</li>
            <li>Signed-in analysis history: kept until you delete it. Every report in your dashboard has a Delete button, which also removes the copy kept on the device the report was bought on, and you can ask us to remove everything.</li>
            <li>Purchase records: kept for as long as we need them for accounting, tax and refunds.</li>
            <li>Account email: kept while your account is active, then on request.</li>
          </ul>

          <h2>Your rights</h2>
          <p>You can ask us to access, correct, or delete your data, or to stop processing it. Email <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline">glushkovim@gmail.com</a> and we will action deletion promptly. If you are in the UK/EU, you also have the right to complain to your data protection authority.</p>

          <h2>Children and young people</h2>
          <p>IBLens is intended for secondary-school students preparing IB coursework and UCAS applications, most of whom are under 18. We collect only what is needed to provide the analysis and, where required by law such as the UK Children's Code, aim to keep data use to a minimum. If you are below the digital-consent age in your country (13 to 16 depending on where you live), please ask a parent, guardian or teacher before submitting work for analysis. We do not knowingly collect more personal data from young users than the service requires.</p>

          <h2>International processing</h2>
          <p>Our providers may process data in countries outside your own, including the United States. Where required, transfers rely on the safeguards those providers put in place.</p>

          <h2>Cookies and consent</h2>
          <p>We use essential browser storage to run the site and, only with your consent, analytics and advertising cookies. A consent banner is shown to every visitor, non-essential cookies stay off until you accept them, and you can change your choice at any time under "Cookie settings" at the bottom of every page.</p>

          <h2>Changes</h2>
          <p>We may update this policy; material changes will be reflected by the date above. Questions: <a href="mailto:glushkovim@gmail.com" className="text-primary hover:underline">glushkovim@gmail.com</a>. See also our <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>.</p>
        </div>
      </div>
    </div>
  );
}
