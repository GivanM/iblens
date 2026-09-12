/**
 * Server-side static HTML content injected into <div id="root"> before React hydrates.
 * Google's crawler indexes this text. React replaces it with the interactive UI on load.
 * All content is keyword-optimised and factually accurate against the IB rubric.
 */

const S = (s: string) => s; // identity, keeps template literals readable

export const staticContent: Record<string, string> = {
  "/privacy": S(`  <main style="max-width:800px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
      <h1>Privacy Policy</h1>
      <p>This policy explains what personal data IBLens collects and how it is used. Operated by an independent developer; contact glushkovim@gmail.com.</p>
      <h2>What we collect</h2>
      <p>Essay text you submit for analysis and the subject/type you select; account details (name, email) if you sign in; usage and device data via cookies and analytics.</p>
      <h2>How your essay is processed</h2>
      <p>Your text is transmitted over an encrypted connection through a relay server we operate in Helsinki, Finland, and on to our AI provider, Anthropic PBC, solely to generate your analysis. We do not use it to train any AI model and do not sell it. The essay text is never written to our database, and an anonymous report that was not purchased is deleted after 90 days.</p>
      <h2>Sharing</h2>
      <p>We do not sell personal data. We share it only with the providers needed to run IBLens: Anthropic (AI analysis), LemonSqueezy (payments), Google (analytics, ads, sign-in). We do not share your essay with your school, universities, examiners, or other students.</p>
      <h2>Your rights and children</h2>
      <p>You can request access or deletion at glushkovim@gmail.com. IBLens is intended for secondary-school students; we collect only what the service needs and, where laws such as the UK Children's Code apply, keep data use to a minimum.</p>
    </main>`),
  "/terms": S(`  <main style="max-width:800px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
      <h1>Terms of Use</h1>
      <p>By using IBLens you agree to these terms.</p>
      <h2>What IBLens is</h2>
      <p>An AI tool that reads a piece of IB coursework (IA, EE, or TOK) you submit and estimates how it performs against published assessment criteria, before submission.</p>
      <h2>Estimates, not official grades</h2>
      <p>Any score, band, or probability is an AI-generated estimate to help you improve your own work. It is not an official grade and not a substitute for your teacher's or examiner's assessment. Do not make irreversible decisions on the basis of IBLens output alone.</p>
      <h2>Independence from the IB</h2>
      <p>IBLens is not affiliated with, endorsed by, or connected to the International Baccalaureate Organization. References to IB programmes and criteria are descriptive; all IB trademarks belong to their owner.</p>
      <h2>Acceptable use</h2>
      <p>Use IBLens only for feedback on work you wrote yourself; never submit AI-generated text for assessment; follow your school's AI policy.</p>
      <h2>No warranty</h2>
      <p>IBLens is provided as is, without warranty of accuracy. We are not liable for losses arising from reliance on its output.</p>
    </main>`),

  "/remark": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › IB Remark Guide</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">Should you pay for an IB remark?</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">A re-mark (enquiry upon results, category 1) costs a fee set by the IB, refunded only if your grade changes. The grade can go down as well as up, and for the May session your school must submit the request by 15 September. Most students decide without knowing how close they are to a boundary. Here is how to decide with more to go on.</p>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">The three facts that matter</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Cost:</strong> the IB publishes the fee to schools, so your coordinator can tell you what it is. There is no charge for a category 1 re-mark that changes your grade.</li>
    <li><strong>Risk:</strong> a re-mark can raise or lower the grade, which is why your school needs your written consent before requesting one.</li>
    <li><strong>Deadline:</strong> 15 September for the May session, through your school, which may set an earlier internal deadline.</li>
  </ul>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">You are deciding blind, unless you mark the essay again first</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The usual advice is to request a re-mark only when you are one or two marks from a boundary, but most students see only their subject grade. Your Extended Essay and TOK essay are externally assessed, which is what a category 1 re-mark covers, and you can read them against the criteria again yourself. Paste the essay you submitted into IBLens: it is marked against the published criteria and tells you whether it sits near a band edge. Near the edge, a re-mark has real upside. Solidly mid-band, it probably changes nothing. The first preview is free; the full report is $9.99.</p>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Key dates after results day</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>6 July:</strong> May session results released from 12:00 GMT on candidates.ibo.org</li>
    <li><strong>By 29 July:</strong> register for November retakes by midnight GMT for the lowest fees</li>
    <li><strong>15 September:</strong> last day for enquiry upon results requests for the May session</li>
    <li><strong>November:</strong> retake examination session</li>
  </ul>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can my grade go down after a remark?</dt>
    <dd style="margin-top:4px">Yes. A category 1 re-mark can raise or lower the grade, so it makes most sense when you have reason to think you are near a boundary.</dd>
    <dt style="font-weight:600;margin-top:16px">Remark or retake?</dt>
    <dd style="margin-top:4px">Consider a re-mark when your externally assessed essay reads close to a boundary. Consider a November retake when you are several marks off; register by 29 July for the lowest fees.</dd>
  </dl>
  <p style="margin-top:24px"><a href="/remark" style="color:#7B1D2E;font-weight:600">Mark my submitted essay: the first preview is free →</a></p>
</main>`),


  "/": S(`  <main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <p style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7B1D2E;margin-bottom:12px">IB Essay Grader</p>
  <h1 style="font-size:34px;font-weight:800;line-height:1.2;margin:0 0 16px">Know your IB score before the exam</h1>
  <p style="font-size:17px;color:#374151;line-height:1.7;margin-bottom:24px">IBLens is a free AI IB essay grader that scores your Internal Assessment (IA), Extended Essay (EE), or Theory of Knowledge (TOK) essay against the official IB rubric in about 90 seconds. Get a criterion-by-criterion breakdown, a predicted band, the exact marks you are losing, and specific improvements. Your first analysis is free, no account required, no subscription. IBLens is instructed to mark strictly against the published criteria, no inflated scores.</p>
  <h2 style="font-size:22px;font-weight:700;margin:28px 0 12px">What IBLens grades</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:24px">
    <li><strong>Coursework</strong> in 14 subjects (the IA in eleven, plus the externally assessed coursework in Visual Arts, Music and Film): Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, Visual Arts, Music and Film.</li>
    <li><strong>Extended Essay (EE)</strong> in the 14 subjects listed above, against the five official EE criteria.</li>
    <li><strong>Theory of Knowledge (TOK)</strong> essays and the TOK Exhibition.</li>
  </ul>
  <h2 style="font-size:22px;font-weight:700;margin:28px 0 12px">How the IB essay grader works</h2>
  <ol style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:24px">
    <li>Paste your essay and select your subject and essay type.</li>
    <li>The AI evaluates every official IB criterion in about 90 seconds.</li>
    <li>You get a predicted score, per-criterion feedback, and specific fixes.</li>
  </ol>
  <h2 style="font-size:22px;font-weight:700;margin:28px 0 12px">Why IB students use IBLens</h2>
  <p style="color:#374151;line-height:1.7;margin-bottom:20px">IB tutors charge $50–150 per hour. A single IBLens analysis costs $9.99 and takes about 90 seconds, with feedback based on the official IB marking criteria, available 24/7. Your first essay is graded free.</p>
  <p style="line-height:2"><a href="/essay">Grade my IB essay free →</a> &nbsp;·&nbsp; <a href="/pricing">See pricing</a> &nbsp;·&nbsp; <a href="/resources">Free IB study guides</a></p>

  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Applying to UK universities through UCAS?</h2>
  <p style="line-height:1.7;margin:0 0 14px">From 2026 entry the UCAS personal statement is three separate questions sharing one 4,000-character budget, with a 350-character minimum per answer. Our <a href="/ucas-personal-statement">UCAS personal statement checker</a> reviews each answer from an admissions-tutor perspective: what a tutor would credit, what they would expect and not find, and what to change first. No invented score, UCAS publishes no mark scheme. First review free.</p>
  </main>`),

  "/pricing": S(`  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › Pricing</nav>
  <h1 style="font-size:30px;font-weight:800;line-height:1.2;margin:0 0 16px">IBLens Pricing, IB Essay Analysis from $9.99</h1>
  <p style="font-size:16px;color:#374151;line-height:1.7;margin-bottom:24px">Your first IB essay analysis is free, no account, no credit card. After that, pay only for what you use. No subscription, and a 7-day money-back guarantee on every purchase.</p>
  <h2 style="font-size:20px;font-weight:700;margin:28px 0 12px">Plans</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:24px">
    <li><strong>Free</strong>: one free preview per device, with mark range, weakest criterion and top risks.</li>
    <li><strong>Single analysis, $9.99</strong>, one full IB essay analysis (IA, EE or TOK).</li>
    <li><strong>Pack of 5, $24.99</strong>, five analyses, credits never expire.</li>
    <li><strong>Pack of 10, $44.99</strong>, ten analyses, best value per essay.</li>
  </ul>
  <h2 style="font-size:20px;font-weight:700;margin:28px 0 12px">How IBLens compares to an IB tutor</h2>
  <p style="color:#374151;line-height:1.7;margin-bottom:20px">IB tutors charge $50–150 per hour. A single IBLens analysis costs $9.99 and returns criterion-by-criterion feedback against the official IB rubric in about 90 seconds, any time of day. Credits stay on your account and we do not expire them, and every purchase is covered by a 7-day money-back guarantee.</p>
  <p><a href="/essay">Start free →</a></p>
</main>`),

  "/university": S(`<main style="max-width:800px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> ‹ University Strategy</nav>
  <h1 style="font-size:28px;font-weight:700;margin:0 0 16px">IB University Strategy, no longer offered</h1>
  <p style="color:#374151;line-height:1.75">We have taken the University Strategy offline while we rebuild it on verified, official university requirements and deadlines from primary sources. In the meantime, grade your IB essays free: <a href="/essay">IB Essay Analyzer</a></p>
</main>`),

  "/essay/biology-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Biology IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Biology IA Grader, Free AI Feedback on Lab Reports</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Biology Internal Assessment against the official IB Biology IA rubric, criterion by criterion, and gives you a predicted score in about 90 seconds. Paste your lab report, get specific, actionable feedback on every criterion. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Biology IA rubric: what examiners look for (24 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The Biology IA is worth 20% of your final IB grade. Under the current (first assessment 2025) scientific investigation, examiners assess four criteria worth 6 marks each, and the same rubric applies at SL and HL. The report has a maximum of 3,000 words.</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Research design, 6 marks</strong>: Research question within a broader context, methodology, variables and controls, and safety, ethical and environmental considerations. IBLens checks whether your research question is focused, your variables are correctly identified, and your method is reproducible.</li>
    <li><strong>Data analysis, 6 marks</strong>: Recording, processing and presenting data, including the treatment of uncertainties, in ways relevant to the research question. IBLens checks for correct uncertainty analysis, appropriate statistical tests, and whether your data presentation supports your research question.</li>
    <li><strong>Conclusion, 6 marks</strong>: A conclusion justified by your analysis, answering the research question and compared with the accepted scientific context. IBLens checks whether your conclusion follows from your data and is interpreted against the wider scientific literature.</li>
    <li><strong>Evaluation, 6 marks</strong>: Evaluation of methodological weaknesses and limitations, with realistic, specific improvements. IBLens checks whether your improvements are specific and realistic rather than generic.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Biology IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Missing uncertainty analysis</strong>: Not including absolute or percentage uncertainties in data tables, or failing to propagate uncertainties through calculations. This alone can drop your Data analysis score from 6 to 3.</li>
    <li><strong>Unfocused research question</strong>: A broad or descriptive question with no methodological rationale weakens Research design, examiners want a specific question set in a clear scientific context, with justified variables and controls.</li>
    <li><strong>Weak evaluation section</strong>: Listing limitations without analysing their impact on your results, or proposing impractical improvements like "use better equipment".</li>
    <li><strong>Conclusion not linked to the science</strong>: Stating a result without comparing it to accepted scientific context or literature values loses marks on the Conclusion criterion.</li>
    <li><strong>Insufficient statistical processing</strong>: Not using t-tests or chi-squared tests when the data type requires them.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Biology IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report, exact score and the full report with comments, unlocks for $9.99, or $24.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">How accurate is the predicted score?</dt>
    <dd style="margin-top:4px">IBLens uses the official IB Biology IA rubric descriptors and examiner language. The predicted score is an estimate, not a measured match to examiner marks. Your teacher's assessment is the official one.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I use this for Biology EE?</dt>
    <dd style="margin-top:4px">No, the Biology IA grader uses the IA-specific rubric. For Extended Essays, use the <a href="/essay/extended-essay">Extended Essay grader</a>. For IB Biology EE tips, see our <a href="/resources/ib-biology-extended-essay">Biology EE guide</a>.</dd>
    <dt style="font-weight:600;margin-top:16px">Does IBLens store my essay?</dt>
    <dd style="margin-top:4px">Anonymous analyses are not permanently stored. Signed-in users can access analysis history from their dashboard.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-biology-ia-examples">Biology IA examples</a> · <a href="/resources/ib-biology-extended-essay">Biology Extended Essay</a> · <a href="/resources/ib-ia-feedback">Check your IA against the criteria</a></p>
  </main>`),

  "/essay/economics-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Economics IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Economics IA Grader, Free AI Feedback on Your Commentary</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Economics Internal Assessment commentary against the official IB Economics IA rubric. Get criterion-by-criterion feedback on Diagrams, Terminology, Application and analysis, Key concept, and Evaluation in about 90 seconds. First analysis free, no account needed.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Economics IA rubric: five criteria per commentary (14 marks each)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">You submit a portfolio of three commentaries, one for each unit, Microeconomics, Macroeconomics, and The global economy, and each commentary must be built around a different key concept. Each commentary is marked out of 14 across five criteria (A–E). The whole portfolio is marked out of 45: three commentaries at 14 marks each (42) plus Criterion F, Rubric requirements (3 marks), which rewards using different units, different sources and articles published within one year of writing.</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A, Diagrams (3 marks)</strong>: Correct, clearly labelled diagrams that are directly relevant to the article and fully explained in the text. IBLens checks whether your diagrams are accurate, have all axes and curves labelled, and are genuinely integrated into your analysis.</li>
    <li><strong>Criterion B, Terminology (2 marks)</strong>: Accurate use of economic terminology throughout. IBLens checks for misused terms, vague language, and missing technical vocabulary.</li>
    <li><strong>Criterion C, Application and analysis (3 marks)</strong>: Relevant economic theory applied to the article with developed, accurate analysis. IBLens checks whether your analysis explains mechanisms (why and how) and stays focused on the article rather than drifting into generic theory.</li>
    <li><strong>Criterion D, Key concept (3 marks)</strong>: Identification of one key concept and effective linkage of it to the article. IBLens checks whether a single key concept genuinely frames the commentary.</li>
    <li><strong>Criterion E, Evaluation (3 marks)</strong>: Judgments supported by reasoned argument, short-run/long-run distinctions, stakeholders, and assumptions. IBLens checks for genuine two-sided evaluation, not just listing pros and cons.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Economics IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Unlabelled or incorrect diagrams</strong>: Missing price/quantity labels, curves not named (e.g., "D1", "D2"), or shifts drawn incorrectly. These mistakes cost marks in every commentary.</li>
    <li><strong>Describing instead of analysing</strong>: Explaining what happened in the article without using economic models to explain why or how. Analysis requires you to work through the chain of causation using a diagram.</li>
    <li><strong>One-sided evaluation</strong>: Only discussing benefits or only drawbacks. Examiners expect consideration of different stakeholders, time horizons, and limitations of the policy or event.</li>
    <li><strong>Going over the word limit</strong>: Each commentary has an 800-word limit (excluding references and diagrams); moderators stop reading at 800 words. IBLens checks approximate word count and flags content that should be cut.</li>
    <li><strong>Weak article-concept link</strong>: Using a concept that only loosely relates to the article. The article must be central to your commentary, not just a brief mention in the introduction.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Economics IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report, exact score and the full report with comments, unlocks for $9.99, or $24.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I grade all three of my Economics IA commentaries?</dt>
    <dd style="margin-top:4px">Yes, each commentary is graded separately. Run one analysis per commentary to get specific feedback on each.</dd>
    <dt style="font-weight:600;margin-top:16px">Does the grader check my word count?</dt>
    <dd style="margin-top:4px">IBLens counts the words in your pasted text and will flag if you are over or near the 800-word limit.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-economics-ia">Economics IA guide</a> · <a href="/resources/ib-economics-extended-essay">Economics Extended Essay</a> · <a href="/resources/ib-ia-feedback">Check your IA against the criteria</a></p>
  </main>`),

  "/essay/history-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB History IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB History IA Grader, Free AI Feedback on Your Historical Investigation</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB History Internal Assessment (Historical Investigation) against the official IB History IA rubric. Get criterion-by-criterion feedback on your Section A, B, and C in about 90 seconds. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB History IA rubric: three sections (25 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Section A, Identification and Evaluation of Sources (6 marks)</strong>: You select two primary or secondary sources and evaluate their origin, purpose, value, and limitation (OPVL). IBLens checks whether your OPVL analysis goes beyond surface-level description and genuinely connects to your investigation's question.</li>
    <li><strong>Section B, Investigation (15 marks)</strong>: Your historical argument, supported by evidence from a range of sources. IBLens checks whether your argument is consistently analytical rather than narrative, whether counter-arguments are addressed, and whether evidence directly supports your claims.</li>
    <li><strong>Section C, Reflection (4 marks)</strong>: Your reflection on the methods and challenges historians face. IBLens checks whether your reflection is specific to your investigation and demonstrates genuine understanding of historical methodology.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB History IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Descriptive Section B</strong>: Narrating what happened instead of arguing why or how. Examiners want analytical writing, every paragraph should advance your argument, not retell events.</li>
    <li><strong>Surface-level OPVL</strong>: Saying a source is "biased because the author has an opinion" without specifying how the bias affects its value or limitation for your specific investigation.</li>
    <li><strong>Weak research question</strong>: Questions like "What caused World War I?" are too broad. A strong History IA research question is specific, debatable, and historically significant.</li>
    <li><strong>Generic reflection</strong>: Section C should reference specific methodological challenges you encountered in your own investigation, not generic statements about what historians do.</li>
    <li><strong>Over-reliance on one type of source</strong>: Using only secondary sources, or only sources from one perspective, limits your Section B marks.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can I paste just Section B for feedback?</dt>
    <dd style="margin-top:4px">Yes, you can paste any section separately. For the most complete feedback, paste your full investigation including all three sections.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the History IA word limit?</dt>
    <dd style="margin-top:4px">The IB History IA has a 2,200-word limit (excluding the bibliography). IBLens checks your approximate word count and will flag if you are over the limit.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the History IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report, exact score and the full report with comments, unlocks for $9.99, or $24.99 for a pack of five.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-history-ia">History IA guide</a> · <a href="/resources/ib-history-extended-essay">History Extended Essay</a></p>
  </main>`),

  "/essay/extended-essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › Extended Essay</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Extended Essay Grader, Free AI Feedback on Your EE</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Extended Essay against the official IB EE rubric, all five criteria, and reads it against the published instrument in about 90 seconds. Paste up to 4,000 words (or your full EE) and get a predicted score with specific improvement suggestions. A free preview is included; the full report is $9.99.</p>
  <p style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;color:#92400e;font-size:14px;line-height:1.6"><strong>Which criteria apply to you?</strong> Sessions through November 2026 use the 34-mark EE criteria below. The <strong>May 2027 cohort</strong> (students who began the DP in 2025, including current drafts) is assessed on the new 30-mark criteria (Framework 6, Knowledge 6, Analysis and line of argument 6, Discussion and evaluation 8, Reflection 4). Select your session in the analyzer.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Extended Essay rubric: five criteria (34 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A, Focus and Method (6 marks)</strong>: The clarity and focus of your research question, the appropriateness of your methodology, and how well you demonstrate awareness of your approach. IBLens checks whether your research question is arguable, specific, and suitable for an extended investigation.</li>
    <li><strong>Criterion B, Knowledge and Understanding (6 marks)</strong>: Depth of subject-specific knowledge, correct use of terminology, and understanding of the academic context. IBLens checks whether you use subject-specific vocabulary accurately and whether your engagement with existing research is genuine.</li>
    <li><strong>Criterion C, Critical Thinking (12 marks)</strong>: The quality of your argument, the strength of your analysis, the handling of counter-arguments, and the logical structure of your reasoning. This is the highest-weighted criterion, IBLens gives detailed feedback on argument quality.</li>
    <li><strong>Criterion D, Presentation (4 marks)</strong>: Adherence to the required structure (title page, table of contents, introduction, body, conclusion, bibliography), the 4,000-word limit, and formatting. IBLens checks structure and approximate word count.</li>
    <li><strong>Criterion E, Engagement (6 marks)</strong>: Assessed through your Reflections on Planning and Progress (RPPF). IBLens evaluates the depth of your intellectual engagement and self-reflection demonstrated in your written work.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common Extended Essay mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Research question too broad or descriptive</strong>: "What is the impact of social media?" cannot be argued in 4,000 words. IBLens checks whether your research question is narrow enough for genuine analysis.</li>
    <li><strong>Descriptive body sections</strong>: Summarising sources instead of building an analytical argument. Every paragraph in the body should advance your answer to the research question.</li>
    <li><strong>Weak conclusion</strong>: Conclusions that introduce new evidence or simply restate the introduction. Your conclusion must directly and specifically answer your research question based on your argument.</li>
    <li><strong>Unbalanced criterion C</strong>: Having good analysis but no counter-argument, or good counter-arguments but no sustained position. IBLens checks for both.</li>
    <li><strong>Over the 4,000-word limit</strong>: examiners stop reading at 4,000 words, anything beyond is not assessed. There is no official minimum, but very short essays rarely sustain enough analysis. IBLens checks your word count.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can I paste my full 4,000-word EE?</dt>
    <dd style="margin-top:4px">Yes, IBLens accepts up to 30,000 characters. A 4,000-word EE is approximately 24,000 characters and will be fully analysed.</dd>
    <dt style="font-weight:600;margin-top:16px">Which EE subjects does the grader cover?</dt>
    <dd style="margin-top:4px">The EE criteria are the same across subjects, and the selector offers the 14 subjects we hold rubrics for. Pick yours so the feedback on knowledge and terminology is subject-specific.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Extended Essay grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report, exact score and the full report with comments, unlocks for $9.99, or $24.99 for a pack of five.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-extended-essay-guide">IB Extended Essay Guide</a> · <a href="/resources/ib-extended-essay-new-criteria-2027">New criteria for May 2027</a> · <a href="/resources/ib-extended-essay-feedback">How to get feedback before you submit</a> · <a href="/resources/ib-ee-examples-by-subject">EE examples by subject</a></p>
  </main>`),

  "/essay/tok-essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › TOK Essay</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB TOK Essay Grader, Free AI Feedback on Theory of Knowledge</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Theory of Knowledge essay against the official IB TOK rubric and reads it against the published instrument in about 90 seconds. Find out if your knowledge claims are developed enough, whether your counter-claims are genuinely addressed, and whether your essay actually answers the prescribed title. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB TOK Essay rubric: how it is marked (holistic, out of 10)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">Since the 2022 syllabus the TOK essay is marked holistically against a single global-impression instrument, scored out of 10. There are no sub-criteria. The examiner works from one guiding question, "Does the student provide a clear, coherent and critical exploration of the essay title?", and places your 1,600-word essay in one of five bands:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Excellent (9–10)</strong>: A clear, coherent and critical exploration of the title, sustained throughout, with convincing and well-developed points. IBLens checks whether every part of your essay advances a focused exploration of the exact title.</li>
    <li><strong>Good (7–8)</strong>: A focused and mostly convincing exploration, with points that are developed and supported but not fully sustained. IBLens flags where argument or support thins out.</li>
    <li><strong>Satisfactory (5–6)</strong>: An exploration that is on topic but only partly developed, with some points asserted rather than argued. IBLens shows which claims need evidence and analysis.</li>
    <li><strong>Basic (3–4)</strong>: A largely descriptive response with limited exploration of the title. IBLens highlights where you describe rather than analyse knowledge.</li>
    <li><strong>Rudimentary (1–2)</strong>: Little or no relevant exploration of the title; unsupported assertions. IBLens shows the gap between your draft and a genuine knowledge exploration.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common TOK Essay mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Not answering the prescribed title</strong>: Writing a good essay on a TOK topic that does not directly engage with the specific wording of the title. Every paragraph must connect back to the prescribed title.</li>
    <li><strong>Examples as evidence without analysis</strong>: Presenting examples (a historical event, a scientific discovery) without using them to build or challenge a knowledge claim. Examples must do epistemic work in your argument.</li>
    <li><strong>Unaddressed counter-claims</strong>: Presenting only one side of a knowledge question. Examiners expect you to engage with perspectives that challenge your position and explain why you ultimately hold your view.</li>
    <li><strong>Ignoring the areas of knowledge</strong>: Making broad claims about knowledge without grounding them in specific areas of knowledge (such as the natural sciences, history or mathematics), where "evidence" and "certainty" actually mean different things.</li>
    <li><strong>Personal opinion as argument</strong>: "I think mathematics is universal" is not a knowledge claim, it must be developed and tested against counter-examples and alternative perspectives.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the TOK Essay grader different from the TOK Exhibition grader?</dt>
    <dd style="margin-top:4px">Yes, they use different rubrics. The TOK Essay is a 1,600-word written essay on a prescribed title. The TOK Exhibition involves three real-world objects linked to an IA prompt. Use the <a href="/essay/tok-exhibition">TOK Exhibition grader</a> for exhibition commentaries.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the TOK Essay word limit?</dt>
    <dd style="margin-top:4px">1,600 words. IBLens checks your word count and will flag if you are over or significantly under.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the TOK Essay grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/tok-essay-guide">TOK Essay Guide</a> · <a href="/resources/tok-essay-checklist">TOK Essay Checklist</a> · <a href="/resources/tok-essay-structure">TOK Essay Structure</a></p>
  </main>`),

  "/essay/tok-exhibition": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › TOK Exhibition</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB TOK Exhibition Grader, Free AI Feedback on All 3 Objects</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Theory of Knowledge Exhibition commentary against the official IB TOK exhibition instrument, which is a single holistic scale out of 10, and gives you specific feedback in about 90 seconds. Find out if your object justifications make convincing links to the IA prompt and to TOK concepts. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB TOK Exhibition rubric: how it is marked (holistic, out of 10)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">Since the 2022 syllabus the TOK exhibition is marked holistically against a single global-impression instrument, out of 10, with no sub-criteria. The examiner works from one guiding question, "Does the exhibition successfully show how TOK manifests in the world around us?", and places your commentary in one of five bands: Excellent (9–10), Good (7–8), Satisfactory (5–6), Basic (3–4), Rudimentary (1–2).</p>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">Your exhibition must present exactly three objects with a commentary of about 950 words in total. The number of objects caps your possible mark: with only two objects the maximum is 6, and with a single object the maximum is 3.</p>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">A high-scoring exhibition therefore does three things well, and IBLens checks each:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Specific, real objects tied to the prompt</strong>: Each object is concrete and particular (not a generic or symbolic stand-in), and its link to the exact wording of the chosen IA prompt is made explicit.</li>
    <li><strong>Genuine TOK content</strong>: Each object is used to explore how knowledge works, not merely named, with enough depth to illuminate the prompt.</li>
    <li><strong>A coherent, justified whole</strong>: The commentary argues rather than asserts, and the three objects work together to answer the prompt.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common TOK Exhibition mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Generic or symbolic objects</strong>: Choosing abstract symbols ("a book representing knowledge") rather than specific, real-world objects with a concrete epistemic connection to the prompt.</li>
    <li><strong>Naming TOK concepts without engaging with them</strong>: Asserting that an object "connects to knowledge" without explaining how the object actually shows knowledge being produced, shared or valued in the world.</li>
    <li><strong>Objects that do not work together</strong>: Three disconnected objects that each make separate points, rather than building a coherent, cumulative argument about knowledge in the context of the prompt.</li>
    <li><strong>Weak justification length</strong>: Each object commentary runs to roughly 300 words, since 950 is the total across all three. Brief, superficial justifications score in the lowest mark band.</li>
    <li><strong>Ignoring the IA prompt wording</strong>: Your justification must address the specific language of the chosen IA prompt, not just the general topic of knowledge.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">How is the TOK Exhibition different from the TOK Essay?</dt>
    <dd style="margin-top:4px">The TOK Exhibition involves choosing three real-world objects and writing a short commentary (roughly 950 words total) explaining how each object connects to one of the 35 IA prompts. The <a href="/essay/tok-essay">TOK Essay</a> is a 1,600-word essay on a prescribed title.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the word limit for the TOK Exhibition?</dt>
    <dd style="margin-top:4px">The IB recommends approximately 950 words total across all three object commentaries, with no strict per-object limit.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the TOK Exhibition grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report, exact score and the full report with comments, unlocks for $9.99, or $24.99 for a pack of five.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/tok-exhibition-checklist">TOK Exhibition Checklist</a> · <a href="/resources/tok-essay-guide">TOK Essay Guide</a></p>
  </main>`),

  "/essay/math-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Math IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Math IA Grader, Free AI Feedback on Your Exploration</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Mathematics Internal Assessment (Exploration) against the official IB Math IA rubric, all five criteria, free preview first, full report $9.99. Works for both Mathematics: Analysis and Approaches (AA) and Mathematics: Applications and Interpretation (AI). A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Math IA rubric: five criteria (20 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A, Presentation (0–4 marks)</strong>: The organisation and coherence of your exploration. IBLens checks whether your exploration has a clear aim, is logically structured, and reads as a coherent whole.</li>
    <li><strong>Criterion B, Mathematical communication (0–4 marks)</strong>: Correct and consistent mathematical language, notation and representation, variables, functions, equations, graphs and tables, with key terms defined. IBLens checks your notation throughout.</li>
    <li><strong>Criterion C, Personal engagement (0–3 marks)</strong>: Evidence of independent thinking, creativity and genuine personal interest, your own conjectures and unexpected directions rather than reproduced textbook content.</li>
    <li><strong>Criterion D, Reflection (0–3 marks)</strong>: Critical reflection on the significance of your results, the limitations of your approach, and possible extensions. IBLens checks whether your reflection is genuinely critical or merely descriptive.</li>
    <li><strong>Criterion E, Use of mathematics (0–6 marks)</strong>: Relevant mathematics commensurate with the level of the course, used correctly; the top levels of this criterion have separate SL and HL descriptor ladders, with HL additionally demanding sophistication and rigour.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Math IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Textbook-style exploration</strong>: Reproducing mathematical results from a textbook without personal investigation. Examiners look for your own mathematical journey, conjectures, dead ends, and discoveries.</li>
    <li><strong>Mathematics too simple for HL/SL level</strong>: Using arithmetic or basic algebra when your syllabus level requires calculus or statistics. The Use of Mathematics criterion expects sophistication appropriate to your course.</li>
    <li><strong>No clear aim</strong>: Starting without stating what mathematical question you are exploring and why. The Communication criterion requires a clear, concise aim in your introduction.</li>
    <li><strong>Generic reflection</strong>: Writing "my exploration had some limitations" without specifying what those limitations were and how they affected your results or conclusions.</li>
    <li><strong>Computational errors</strong>: Arithmetic or algebraic errors that undermine your conclusions. IBLens checks the logical consistency of your work.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Does this work for both Math AA and Math AI?</dt>
    <dd style="margin-top:4px">Yes, the IB Math IA rubric is identical for both Mathematics: Analysis and Approaches and Mathematics: Applications and Interpretation. See also our dedicated <a href="/essay/maths-aa-ia">Math AA IA grader</a> and <a href="/essay/maths-ai-ia">Math AI IA grader</a> pages.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the word limit for the Math IA?</dt>
    <dd style="margin-top:4px">The IB sets no word limit for the exploration and suggests roughly 12 to 20 pages, with no strict word limit. Typically 1,500–3,000 words plus mathematical working.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Math IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-math-ia-examples">Math IA examples</a> · <a href="/essay/maths-aa-ia">Maths AA IA grader</a> · <a href="/essay/maths-ai-ia">Maths AI IA grader</a></p>
  </main>`),

  "/essay/psychology-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Psychology IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Psychology IA Grader, Free AI Feedback on Your Experimental Report</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Psychology Internal Assessment experimental report against the official IB Psychology IA rubric, all four criteria, free preview first, full report $9.99. Get specific feedback on your Introduction, Exploration, Analysis, and Evaluation. A free preview is included; the full report is $9.99. From May 2027 the IA becomes a research proposal marked out of 24, select your session in the analyzer.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Psychology IA rubric: four criteria (22 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Introduction (6 marks)</strong>: Background theory, aim, and hypothesis. IBLens checks whether your introduction clearly links the psychological theory to your experimental design and whether your hypothesis is directional and operationalised.</li>
    <li><strong>Exploration (4 marks):</strong> the research design, sampling technique and controlled variables, with the ethical considerations of your own study.</li><li><strong>Analysis (6 marks):</strong> descriptive and inferential statistics applied correctly, with the reasoning behind the test you chose.</li><li><strong>Evaluation (6 marks):</strong> discussion of your results against the background theory, with the limitations of your design and realistic improvements.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Psychology IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Hypothesis not operationalised</strong>: Writing "stress affects memory" instead of specifying what stress manipulation and what memory measure you used.</li>
    <li><strong>Wrong statistical test</strong>: Using a t-test for nominal data or a Mann-Whitney U for normally distributed interval data. IBLens checks whether your statistical choice matches your data type and research design.</li>
    <li><strong>Evaluation too general</strong>: Listing common Psychology limitations ("small sample size") without relating them to how your specific results may have been affected.</li>
    <li><strong>No ethical considerations</strong>: Failing to mention informed consent, the right to withdraw, or debrief procedures in your Exploration section.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Psychology IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report, exact score and the full report with comments, unlocks for $9.99, or $24.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">Does IBLens grade Psychology Extended Essays?</dt>
    <dd style="margin-top:4px">Yes, use the <a href="/essay/extended-essay">Extended Essay grader</a> and select Psychology as your subject.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-psychology-ia">Psychology IA guide</a> · <a href="/resources/ib-psychology-ia-2027">What changes in 2027</a> · <a href="/resources/ib-psychology-extended-essay">Psychology Extended Essay</a></p>
  </main>`),

  "/essay/chemistry-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Chemistry IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Chemistry IA Grader, Free AI Feedback on Your Lab Report</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Chemistry Internal Assessment against the official IB Chemistry IA rubric, all four criteria, free preview first, full report $9.99. Get feedback on Research design, Data analysis, Conclusion, and Evaluation. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Chemistry IA rubric (24 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The Chemistry IA uses the current (first assessment 2025) scientific investigation rubric, four criteria worth 6 marks each, identical at SL and HL, with a 3,000-word maximum, but Chemistry-specific expectations apply:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Research design (6 marks)</strong>: Focused research question set in a scientific context, with clearly identified independent, dependent, and controlled variables and appropriate safety and ethical considerations for chemical procedures.</li>
    <li><strong>Data analysis (6 marks)</strong>: Correct propagation of uncertainties through calculations, appropriate significant figures, and correct processing and presentation of data.</li>
    <li><strong>Conclusion (6 marks)</strong>: A conclusion justified by the analysis, answering the research question and compared with accepted chemical theory, including correct chemical equations where relevant.</li>
    <li><strong>Evaluation (6 marks)</strong>: Discussion of systematic and random errors, their effect on your result, and realistic improvements specific to your method.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Chemistry IA mistakes</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Incorrect uncertainty propagation</strong>: Not using the correct rules (addition/subtraction vs multiplication/division) when propagating uncertainties through multi-step calculations.</li>
    <li><strong>Too few repeats</strong>: Chemistry IAs need enough data (typically at least 5 values of the independent variable) to demonstrate a trend. Fewer data points significantly limits your Data analysis score.</li>
    <li><strong>Confusing systematic and random errors</strong>: Listing "human reaction time" as a systematic error rather than a random one, or vice versa. IBLens checks whether your error analysis uses correct terminology.</li>
    <li><strong>Missing or incorrect chemical equations</strong>: If your investigation involves a chemical reaction, the balanced equation must be present and correct.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Chemistry IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report, exact score and the full report with comments, unlocks for $9.99, or $24.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I use this for IB Chemistry EE?</dt>
    <dd style="margin-top:4px">For Chemistry Extended Essays, use the <a href="/essay/extended-essay">Extended Essay grader</a> and select Chemistry as your subject. See also our <a href="/resources/ib-chemistry-extended-essay">IB Chemistry EE guide</a>.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-chemistry-ia-examples">Chemistry IA examples</a> · <a href="/resources/ib-chemistry-extended-essay">Chemistry Extended Essay</a> · <a href="/resources/ib-ia-feedback">Check your IA against the criteria</a></p>
  </main>`),

  "/essay/physics-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Physics IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Physics IA Grader, Free AI Feedback on Your Lab Report</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Physics Internal Assessment against the official IB Physics IA rubric, criterion by criterion, free preview first, full report $9.99. Get feedback on your exploration, data analysis, uncertainty propagation, and evaluation. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Physics IA rubric (24 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The Physics IA uses the current (first assessment 2025) scientific investigation rubric: four criteria worth 6 marks each, identical at SL and HL, with a 3,000-word maximum.</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Research design (6 marks)</strong>: A focused, measurable research question set in a scientific context; clearly identified variables; a sound, safe experimental design.</li>
    <li><strong>Data analysis (6 marks)</strong>: Correct data presentation with appropriate significant figures, uncertainty analysis, and linearisation of graphs where required.</li>
    <li><strong>Conclusion (6 marks)</strong>: A conclusion justified by the analysis, answering the research question and compared to accepted theoretical or literature values.</li>
    <li><strong>Evaluation (6 marks)</strong>: Critical evaluation of your method and results, and specific, realistic improvements.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Physics IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Linearisation not attempted</strong>: For non-linear relationships (e.g., period vs length), Physics examiners expect you to linearise your graph (e.g., T² vs L). Not doing this limits your Analysis score.</li>
    <li><strong>Percentage error vs percentage uncertainty</strong>: Confusing percentage error (deviation from theory) with percentage uncertainty (precision of measurement). These are different calculations serving different purposes.</li>
    <li><strong>No comparison to literature value</strong>: Your Evaluation section should compare your experimental value to a known theoretical or literature value and calculate the percentage error.</li>
    <li><strong>Research question too qualitative</strong>: "How does temperature affect resistance?" needs to specify the range and units: "How does temperature (20°C–80°C) affect the resistance (Ω) of a nichrome wire?"</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Physics IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I paste only part of my IA?</dt>
    <dd style="margin-top:4px">Yes, but for criterion-by-criterion feedback, paste your full report for the most accurate score prediction.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-physics-ia-examples">Physics IA examples</a> · <a href="/resources/ib-ia-feedback">Check your IA against the criteria</a></p>
  </main>`),

  "/essay/business-management-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Business Management IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Business Management IA Grader, Free AI Feedback on Your IA</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Business Management Internal Assessment (the Business research project, first assessment 2024) against the official IB BM IA rubric. Get criterion-by-criterion feedback in about 90 seconds on your key concept, supporting documents, and analysis. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Business Management IA rubric: seven criteria (25 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The current Business research project is a business report of up to 1,800 words, supported by 3–5 supporting documents published within three years, and built around one key concept, change, creativity, ethics or sustainability. It is marked out of 25 across seven criteria (A–G):</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A, Integration of a key concept (5 marks)</strong>: How well your chosen key concept (change, creativity, ethics or sustainability) is integrated throughout the project and linked to the research question. IBLens checks whether the concept genuinely frames your report.</li>
    <li><strong>Criterion B, Supporting documents (4 marks)</strong>: Relevance, depth and breadth of your 3–5 supporting documents and how well you use them. IBLens checks whether your documents are appropriate and current.</li>
    <li><strong>Criterion C, Selection and application of tools and theories (4 marks)</strong>: Appropriate selection and accurate application of business tools and theories (SWOT, Porter's Five Forces, financial ratios, etc.) to the research question.</li>
    <li><strong>Criterion D, Analysis and evaluation (5 marks)</strong>: Quality of analysis, synthesis of findings, and evaluation leading to substantiated judgments. IBLens checks whether evidence is analysed critically rather than summarised.</li>
    <li><strong>Criterion E, Conclusions (3 marks)</strong>: Conclusions consistent with the evidence and the research question. IBLens checks whether your conclusions are supported by your findings.</li>
    <li><strong>Criterion F, Structure (2 marks)</strong>: A logical structure for the project.</li>
    <li><strong>Criterion G, Presentation (2 marks)</strong>: The required presentation elements (title page, table of contents, references, appendices).</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Business Management IA mistakes</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>RQ too broad or not business-focused</strong>: "How can Company X improve?" covers too much ground. A strong BM RQ focuses on one specific business problem or decision.</li>
    <li><strong>Describing tools without applying them</strong>: Listing SWOT categories without connecting them to your evidence and research question. Tools must do analytical work, not just fill a template.</li>
    <li><strong>Summarising interviews instead of analysing</strong>: Quoting what the CEO said without evaluating how it answers your research question or what it implies for your business analysis.</li>
    <li><strong>Recommendations not supported by evidence</strong>: Your recommendations in the conclusions section must trace directly back to your findings, not general business advice.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Business Management IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the word limit for the IB Business Management IA?</dt>
    <dd style="margin-top:4px">The Business research project has a maximum of 1,800 words for the report, plus 3–5 supporting documents. IBLens checks your approximate word count and will flag if you are significantly over.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-ia-feedback">Check your IA against the criteria</a> · <a href="/resources/ib-internal-assessment-guide">IB Internal Assessment Guide</a></p>
  </main>`),

  "/essay/english-essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB English Essay</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB English IA Grader, Free AI Feedback on Your Individual Oral</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB English A Individual Oral (IA) transcript or written commentary against the official IB English rubric, all four criteria, free preview first, full report $9.99. Works for both English A: Language and Literature and English A: Literature. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB English IA rubric: four criteria (40 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A, Knowledge, understanding, and interpretation (10 marks)</strong>: Your understanding of the chosen works and global issue, supported by accurate references. IBLens checks whether your interpretation is substantiated and whether you engage with the text's context.</li>
    <li><strong>Criterion B, Analysis and evaluation (10 marks)</strong>: Analysis of authorial choices, literary devices, structure, tone, diction, and how they construct meaning. IBLens checks whether your analysis goes beyond identification to evaluate the effect of the choices.</li>
    <li><strong>Criterion C, Focus and organisation (10 marks)</strong>: Logical structure, coherent line of argument, and clear focus on the global issue and works. IBLens checks whether your oral builds a sustained argument or drifts between points.</li>
    <li><strong>Criterion D, Language (10 marks)</strong>: Clarity, precision, and register of language. IBLens checks for vague phrasing, over-hedging, and imprecise literary terminology.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB English IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Identifying without analysing</strong>: Saying "the author uses a metaphor" without explaining what the metaphor does and how it contributes to your global issue argument.</li>
    <li><strong>Weak global issue link</strong>: Mentioning the global issue in the introduction and conclusion but not sustaining its relevance throughout the analysis of each extract.</li>
    <li><strong>Summarising the plot</strong>: Retelling what happens in the text rather than analysing how the author constructs meaning through specific choices.</li>
    <li><strong>Imbalance between the two works</strong>: Spending 80% of your oral on one work and barely touching the other. Both works should receive sustained, roughly equal analysis.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can I paste a transcript of my spoken oral?</dt>
    <dd style="margin-top:4px">Yes, paste your oral transcript or a written draft of your argument. IBLens evaluates the content against the rubric criteria.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the English IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-english-extended-essay">English Extended Essay</a> · <a href="/resources/ib-ia-feedback">Check your IA against the criteria</a></p>
  </main>`),

  "/essay/computer-science-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Computer Science IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Computer Science IA Grader, Free AI Feedback on Your Solution</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Computer Science Internal Assessment report against the official IB CS IA rubric, all five criteria, free preview first, full report $9.99. Get feedback on your planning, design, development, and evaluation. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Computer Science IA rubric: five criteria (34 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A, Planning (6 marks)</strong>: The identification of the client, the problem, the proposed solution, and success criteria. IBLens checks whether your problem is clearly defined, your client is identified, and your success criteria are specific and measurable.</li>
    <li><strong>Criterion B, Solution Overview (6 marks)</strong>: The design of your solution including UML diagrams, flow charts, record structures, and test data. IBLens checks whether your design documentation is complete and directly reflects your implemented solution.</li>
    <li><strong>Criterion C, Development (12 marks)</strong>: The techniques used in developing your solution and the sophistication of your code. IBLens checks whether you explain the most complex parts of your code, justify design decisions, and demonstrate appropriate use of data structures and algorithms.</li>
    <li><strong>Criterion D, Functionality (4 marks)</strong>: Whether your solution works as intended and meets the success criteria. IBLens checks whether your test evidence demonstrates all required functionality.</li>
    <li><strong>Criterion E, Evaluation (6 marks)</strong>: A critical evaluation of your solution against your success criteria, with client feedback and suggested improvements. IBLens checks whether your evaluation is specific and honest rather than superficially positive.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Computer Science IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Vague success criteria</strong>: "The app should be user-friendly" is not measurable. Success criteria must be specific (e.g., "The user can log in within 3 clicks and the process takes under 5 seconds").</li>
    <li><strong>Development criterion not justified</strong>: Including code without explaining why you chose specific data structures, algorithms, or OOP patterns. Criterion C rewards explanation of your development decisions, not just working code.</li>
    <li><strong>No client evidence</strong>: Failing to include evidence of client consultation in Planning or client feedback in Evaluation. The client's input must be documented throughout your report.</li>
    <li><strong>Incomplete test evidence</strong>: Not including test tables showing expected vs actual output for all major functions, including boundary and error cases.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can I paste just my Development section?</dt>
    <dd style="margin-top:4px">Yes, you can paste any part of your IA. For the most accurate predicted score across all five criteria, paste your full report.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Computer Science IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-computer-science-ia-2027">What changes in 2027</a> · <a href="/resources/ib-ia-feedback">Check your IA against the criteria</a></p>
  </main>`),

  "/essay/maths-aa-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Math AA IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Math AA IA Grader, Free AI Feedback on Analysis & Approaches</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Mathematics: Analysis and Approaches Internal Assessment exploration against the official IB Math rubric, all five criteria, free preview first, full report $9.99. Works for both SL and HL. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Math AA IA: how the rubric works (20 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The IB Math AA IA uses the same five criteria as Math AI. However, examiners apply them with an expectation of more abstract, proof-oriented, or algebraic mathematics for AA students, especially at HL.</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Presentation (4 marks)</strong>: Coherent structure, a clear aim, and an organised, self-contained exploration. Examiners expect AA students to present rigorous mathematical arguments.</li>
    <li><strong>Mathematical communication (4 marks)</strong>: Correct and consistent use of variables, formal notation, symbols and mathematical language, with key terms defined. For AA, this includes formal proof notation where relevant.</li>
    <li><strong>Personal engagement (3 marks)</strong>: Evidence of genuine exploration, your own conjectures, creative approaches, and original insights into the mathematics.</li>
    <li><strong>Reflection (3 marks)</strong>: Critical evaluation of your mathematical approach, limitations, and possible extensions or generalisations.</li>
    <li><strong>Use of mathematics (6 marks)</strong>: Relevant mathematics commensurate with the course, used correctly; this criterion has separate SL and HL descriptor ladders. For AA, examiners typically expect calculus, proof by induction, complex numbers, or similarly advanced content at HL, and functions, statistics, or geometry at SL.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">What is the difference between Math AA IA and Math AI IA?</dt>
    <dd style="margin-top:4px">The rubric is identical, but the expected sophistication differs. Math AA is more focused on pure mathematics (calculus, proof, algebra). Math AI focuses more on applied mathematics (statistics, modelling, real-world problems). See our <a href="/essay/maths-ai-ia">Math AI IA grader</a> for AI-specific feedback.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Math AA IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-math-ia-examples">Math IA examples</a> · <a href="/essay/math-ia">General Math IA grader</a> · <a href="/essay/maths-ai-ia">Maths AI IA grader</a></p>
  </main>`),

  "/essay/maths-ai-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Math AI IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Math AI IA Grader, Free AI Feedback on Applications & Interpretation</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Mathematics: Applications and Interpretation Internal Assessment exploration against the official IB Math rubric in about 90 seconds. Works for both SL and HL. Get feedback on communication, personal engagement, reflection, and use of mathematics. A free preview is included; the full report is $9.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Math AI IA: what examiners look for (20 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">Math AI students are expected to apply mathematics to real-world contexts. Examiners look for meaningful data collection, statistical modelling, and genuine mathematical analysis of a real-world phenomenon.</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Presentation (4 marks)</strong>: A clear aim, logical structure, and organised exploration. For AI, this includes a clear explanation of your real-world context and why it is mathematically interesting.</li>
    <li><strong>Mathematical communication (4 marks)</strong>: Correct and consistent use of statistical notation, labelled graphs, regression models, and mathematical vocabulary appropriate to your investigation, with key terms defined.</li>
    <li><strong>Personal engagement (3 marks)</strong>: Evidence of genuine curiosity about the real-world data or problem, original data collection, unexpected findings you pursued, or creative modelling choices.</li>
    <li><strong>Reflection (3 marks)</strong>: Critical evaluation of your model's fit, limitations of your data, and what a more sophisticated approach would look like.</li>
    <li><strong>Use of mathematics (6 marks)</strong>: Relevant mathematics commensurate with the course, used correctly; this criterion has separate SL and HL descriptor ladders. For AI, examiners expect regression analysis, statistical hypothesis testing, differential equations in context, or similar applied techniques appropriate to your level.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">What topics work well for a Math AI IA?</dt>
    <dd style="margin-top:4px">Strong Math AI IA topics involve real data you collect or curate, a genuine mathematical question, and applied techniques from your syllabus. Examples: modelling COVID-19 case growth, analysing sports statistics with regression, or using differential equations to model a physical system.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Math AI IA grader free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion, top risks). The full report is $9.99.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the difference between Math AI and Math AA?</dt>
    <dd style="margin-top:4px">Math AI focuses on applied and statistical mathematics in real-world contexts. Math AA focuses on pure mathematics including calculus, proof, and algebra. See our <a href="/essay/maths-aa-ia">Math AA IA grader</a> for AA-specific feedback.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Guides for this component</h2>
  <p style="line-height:1.8;margin:0 0 14px"><a href="/resources/ib-math-ia-examples">Math IA examples</a> · <a href="/essay/math-ia">General Math IA grader</a> · <a href="/essay/maths-aa-ia">Maths AA IA grader</a></p>
  </main>`),

  "/ucas-personal-statement": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">UCAS Personal Statement Checker, the three-question format from 2026 entry</h1>
  <p style="line-height:1.7;margin:0 0 14px">From 2026 entry the UCAS personal statement is no longer one free-form essay. It is three separate questions sharing a single 4,000-character budget (including spaces), with a minimum of 350 characters per answer. You can split the 4,000 characters across the three answers however you like, and admissions staff still read the three answers as one statement.</p>
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">The three questions, as they appear in the application</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0 0 14px">
  <li><strong>1. Why do you want to study this course or subject?</strong></li>
  <li><strong>2. How have your qualifications and studies helped you to prepare for this course or subject?</strong></li>
  <li><strong>3. What else have you done to prepare outside of education, and why are these experiences useful?</strong></li></ul>
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">What admissions tutors are looking for</h2>
  <p style="line-height:1.7;margin:0 0 14px">UCAS states that tutors want evidence that you are passionate and knowledgeable about the subject, and that you have the relevant skills, experiences and potential to be a great student. In practice that means specific evidence tied to the course rather than general enthusiasm, and reflection on what an experience taught you rather than a list of what you did.</p>
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Rules worth checking your draft against</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0 0 14px">
  <li>The three answers are read as one statement, do not repeat the same evidence across them.</li>
  <li>Each answer needs at least 350 characters; the three together must stay within 4,000.</li>
  <li>Do not exaggerate: you may be asked to elaborate at interview.</li>
  <li>Avoid quotations from other people and cliches.</li>
  <li>Do not post your statement online, UCAS checks submitted statements for similarity against previously submitted work and published samples.</li>
  <li>Submitting AI-generated text as your own can be treated as cheating by universities; you declare that the statement is your own work.</li></ul>
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">There is no mark scheme, and no honest tool will give you a score</h2>
  <p style="line-height:1.7;margin:0 0 14px">UCAS publishes no rubric and no points for the personal statement, so any tool that returns a score or an admission probability is inventing it. What can be checked is concrete: whether each answer meets the character rules, whether the evidence is specific to the course, whether claims are supported, and whether the three answers repeat each other.</p>
  <p style="line-height:1.7;margin:0 0 14px">IBLens reviews each of the three answers separately from an admissions-tutor perspective and shows what a tutor would credit, what they would expect and not find, and what to change first. The character arithmetic is computed exactly, not estimated. Your first review is free. <a href="/ucas-personal-statement">Check your statement</a> · <a href="/resources/academic-integrity">How to use AI feedback without risking your application</a></p>
  </main>`),
  "/essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Essay Grader, Free AI Feedback on IA, Extended Essay & TOK</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens is a free AI essay grader for IB students. Paste your Internal Assessment, Extended Essay, or TOK Essay and get criterion-by-criterion feedback with a predicted score in about 90 seconds, against the official IB rubric for your subject. No account required for your first analysis.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Subjects and work types supported</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">IBLens grades all major IB assessment types:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Internal Assessments (IA)</strong>: <a href="/essay/biology-ia">Biology</a>, <a href="/essay/chemistry-ia">Chemistry</a>, <a href="/essay/physics-ia">Physics</a>, <a href="/essay/economics-ia">Economics</a>, <a href="/essay/history-ia">History</a>, <a href="/essay/psychology-ia">Psychology</a>, <a href="/essay/math-ia">Mathematics</a> (AA and AI), <a href="/essay/computer-science-ia">Computer Science</a>, <a href="/essay/business-management-ia">Business Management</a>, and <a href="/essay/english-essay">English A</a></li>
    <li><strong>Extended Essay (EE)</strong>: the 14 subjects listed above, the <a href="/essay/extended-essay">Extended Essay grader</a> uses the universal EE rubric and applies subject-specific knowledge expectations</li>
    <li><strong>TOK</strong>: Both the <a href="/essay/tok-essay">TOK Essay</a> (1,600-word prescribed title essay) and <a href="/essay/tok-exhibition">TOK Exhibition</a> (three-object commentary)</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">How IBLens works</h2>
  <ol style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Select your work type and subject</strong>, IBLens loads the official IB rubric for your specific assessment</li>
    <li><strong>Paste your text</strong>, copy and paste from your word processor; no file upload required</li>
    <li><strong>Add your research question or title</strong> (optional), helps the AI evaluate whether your analysis addresses the question</li>
    <li><strong>Get your feedback in about 90 seconds</strong>, a predicted score for each criterion with specific, actionable improvement suggestions</li>
  </ol>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">How IBLens compares to RevisionDojo</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">IBLens and RevisionDojo are both AI IB essay graders. The main differences:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Pricing</strong>: RevisionDojo charges $19/month subscription. IBLens charges per analysis ($9.99) with a free first analysis, better value for students who only need occasional feedback.</li>
    <li><strong>No account needed</strong>: IBLens lets you run your first analysis without creating an account. RevisionDojo requires registration.</li>
    <li><strong>TOK Exhibition</strong>: IBLens grades TOK Exhibitions against the official rubric. RevisionDojo also supports this.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is IBLens free?</dt>
    <dd style="margin-top:4px">Your first analysis is free (band range, weakest criterion with full feedback, top risks). The full report unlocks for $9.99, or $24.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">How accurate is the AI grading?</dt>
    <dd style="margin-top:4px">IBLens uses the official IB rubric descriptors for each subject and assessment type. The predicted score is an estimate produced from the published criteria, not a measured match to examiner marks, but your teacher's assessment is always the official mark.</dd>
    <dt style="font-weight:600;margin-top:16px">Is my essay stored or used to train AI?</dt>
    <dd style="margin-top:4px">No. The essay text is never written to our database. The report it produces is deleted after 90 days unless you bought it, and IBLens does not use student essays to train AI models.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I grade my essay more than once?</dt>
    <dd style="margin-top:4px">Yes, many students grade a draft, then revise and grade again. Each analysis uses one credit. A pack of five analyses ($24.99) is designed for iterative improvement across drafts.</dd>
  </dl>

  <section style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;margin:26px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px">Why students use IBLens</h2>
  <ul style="line-height:1.8;padding-left:20px;margin:0">
  <li>Marks against the official IB assessment criteria for each subject and component, including both Extended Essay rubrics: the current 34-mark criteria (through November 2026) and the new 30-mark May 2027 criteria.</li>
  <li>$9.99 for the full report and two re-checks, no subscription, and it includes two free re-checks of the same draft within 14 days.</li>
  <li>Your first analysis is free: predicted band range, your weakest criterion with full feedback, and the top risks in your draft. No account needed.</li>
  <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
  </ul></section>

  <script type="application/ld+json">{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IBLens", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": "https://iblens.com/essay", "description": "AI feedback on IB coursework against the official assessment criteria: coursework in 14 subjects, the Extended Essay (both the current 34-mark and the new May 2027 30-mark rubrics), the TOK essay and the TOK exhibition.", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD", "description": "Criterion-by-criterion report plus two free re-checks of the same draft within 14 days, enough to revise and confirm the fix before you submit; free preview first"}}</script>
  
  <h2 style="font-size:22px;font-weight:700;margin:24px 0 10px">Applying to UK universities through UCAS?</h2>
  <p style="line-height:1.7;margin:0 0 14px">From 2026 entry the UCAS personal statement is three separate questions sharing one 4,000-character budget, with a 350-character minimum per answer. Our <a href="/ucas-personal-statement">UCAS personal statement checker</a> reviews each answer from an admissions-tutor perspective: what a tutor would credit, what they would expect and not find, and what to change first. No invented score, UCAS publishes no mark scheme. First review free.</p>
  </main>`),


  // ── Resource pages ──
"/resources/tok-essay-format": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB TOK Essay Format</nav>
      <h1>IB TOK Essay Format, Everything You Need to Know</h1>

      <p>
        The IB Theory of Knowledge essay has strict formatting rules. Formatting itself earns no marks, but a file an examiner cannot read is a problem you do not need. This guide covers every official formatting requirement: word count rules, structural expectations, citation format, what does and does not count toward the limit, and what examiners expect when they open your essay.
      </p>

      <h2>Word Count: The 1,600-Word Rule</h2>

      <p>
        The TOK essay has a <strong>maximum word count of 1,600 words</strong>. This limit is strictly enforced:
      </p>

      <ul>
        <li><strong>Essays that exceed 1,600 words:</strong> Examiners are instructed to stop reading at the 1,600-word mark. Any argument, conclusion, or example after that point will not be assessed. This is one of the most costly mistakes IB students make, a brilliant conclusion on page 4 may never be read.</li>
        <li><strong>The title page and bibliography are NOT counted:</strong> These do not contribute to your 1,600 words.</li>
        <li><strong>Footnotes with references are not counted:</strong> the word count covers the body of the essay including quotations, and excludes references given in footnotes, endnotes or in text. A footnote carrying argument rather than a reference is a different matter: keep argument in the body, where the examiner reads it.</li>
        <li><strong>Quotations are counted:</strong> Direct quotes from sources are included in the word count.</li>
        <li><strong>Diagrams, tables, and mathematical notation:</strong> Not typically counted, but avoid using them to circumvent the limit, examiners notice.</li>
      </ul>

      <p>
        There is no official minimum word count, but essays significantly below 1,600 words rarely score well. A 900-word essay simply does not have enough space for the depth of analysis required for a top score. Aim for 1,400–1,600 words.
      </p>

      <h2>Required Format Elements</h2>

      <p>The IBO specifies the following formal requirements for all submitted TOK essays:</p>

      <ul>
        <li><strong>Title page:</strong> Must include your session number (not your name, essays are marked anonymously), the prescribed title you selected (written in full, exactly as published by the IBO), and your school name.</li>
        <li><strong>Word count declaration:</strong> You must declare the word count on the title page. If your declared count differs significantly from the actual count, this can be flagged.</li>
        <li><strong>Readable font and spacing:</strong> While the IBO does not specify an exact font, essays should be readable, 12pt Times New Roman or Arial with double spacing is standard. Use 1.5 or double spacing, which is what schools ask for and what reads cleanly.</li>
        <li><strong>Page numbering:</strong> Number your pages. This is not required by the rubric but is expected by examiners and makes it easier if pages become separated.</li>
        <li><strong>No name on the essay body:</strong> Your name must not appear anywhere in the essay itself, only your session number. This protects anonymity during marking.</li>
      </ul>

      <h2>Essay Structure: The Expected Format</h2>

      <p>
        The TOK essay does not have a mandated five-paragraph structure, but there is a standard format that examiners expect. Deviating from it without good reason typically hurts your score.
      </p>

      <h3>Introduction (approximately 150–200 words)</h3>

      <p>Your introduction should:</p>

      <ul>
        <li><strong>Restate the prescribed title in your own words</strong>, show you understand what it is asking</li>
        <li><strong>Define key terms</strong>, especially any terms that are ambiguous or central to your argument (e.g., "knowledge," "certainty," "prove")</li>
        <li><strong>Introduce your thesis</strong>, state your overall position on the prescribed title question</li>
        <li><strong>Outline your two Areas of Knowledge (AOKs)</strong>, briefly indicate which AOKs you will use to develop your argument</li>
      </ul>

      <p>
        Avoid: padding your introduction with general philosophical statements that say nothing specific. "Knowledge is one of the most complex topics that humans have ever grappled with" is a wasted 20 words.
      </p>

      <h3>Body Paragraphs: Claim / Counter-Claim Structure (approximately 1,100–1,200 words)</h3>

      <p>
        Each body section should examine one Area of Knowledge through the lens of the prescribed title. The standard structure per AOK is:
      </p>

      <ol>
        <li><strong>Knowledge claim:</strong> An assertion about how knowledge works in this AOK in relation to the title (e.g., "In the natural sciences, mathematical models provide knowledge that is reliable precisely because it can be falsified")</li>
        <li><strong>Specific example:</strong> A concrete, real-world example that illustrates the claim, not a hypothetical. The example should be described in enough detail that it actually supports the argument.</li>
        <li><strong>Counter-claim:</strong> A genuine challenge to your claim from within the same AOK or from a different perspective (e.g., "However, models in quantum mechanics show that even formally rigorous science involves probabilistic rather than certain knowledge")</li>
        <li><strong>Mini-conclusion:</strong> What does this AOK tell us about the prescribed title question?</li>
      </ol>

      <p>
        Most high-scoring essays use two AOKs, with two to three knowledge claims per AOK. Do not try to cover four or five AOKs, you will have insufficient depth in each.
      </p>

      <h3>Conclusion (approximately 200–250 words)</h3>

      <p>Your conclusion should:</p>

      <ul>
        <li><strong>Answer the prescribed title directly</strong>, do not end with "therefore, this is a complex issue." Take a position.</li>
        <li><strong>Synthesise rather than summarise</strong>, draw together your AOK analysis into a coherent overall claim about knowledge</li>
        <li><strong>Acknowledge limitations or implications</strong>, what remains uncertain, or what does your argument imply about knowledge more broadly?</li>
        <li><strong>Connect to real-world significance</strong>, optional, but a brief statement about why this knowledge question matters often strengthens the conclusion</li>
      </ul>

      <h2>Citations and Referencing Format</h2>

      <p>
        The IBO does not prescribe a specific citation format for the TOK essay. You may use MLA, APA, Chicago, or any other consistent system, your school may have a preference. What matters is:
      </p>

      <ul>
        <li><strong>Consistency:</strong> Use the same format throughout. Mixing MLA in-text citations with APA reference lists is not acceptable.</li>
        <li><strong>All sources must be cited:</strong> Specific claims, statistics, and direct quotes must be attributed. General knowledge claims (e.g., "Einstein developed the theory of relativity") do not need citation.</li>
        <li><strong>Avoid excessive citation:</strong> The TOK essay is an argument, not a research paper. Over-referencing can make your essay feel like a literature review rather than an analytical piece.</li>
        <li><strong>Bibliography goes after the essay:</strong> Place your bibliography or works cited list on a new page after the essay body. It is not counted in the word total.</li>
      </ul>

      <h2>What NOT to Include</h2>

      <p>Avoid these common formatting mistakes:</p>

      <ul>
        <li><strong>Subheadings within the essay body:</strong> TOK essays should read as continuous prose. Subheadings like "Claim 1" or "Natural Sciences" are not appropriate and may signal a formulaic approach to the examiner.</li>
        <li><strong>Bullet points in the body:</strong> The essay must be written in paragraphs. Bullet points are appropriate for planning but not for the final submission.</li>
        <li><strong>Images and graphs:</strong> These are not required and generally not appropriate unless directly relevant to your argument (very rare).</li>
        <li><strong>Appendices:</strong> There is no provision for appendices in the TOK essay format. Do not attach additional materials.</li>
        <li><strong>Personal information:</strong> No name, photograph, or identifying details other than your session number.</li>
      </ul>

      <h2>The TOK Essay Format vs. Other IB Essays</h2>

      <p>
        Students often confuse TOK essay formatting expectations with EE or IA formatting. Key differences:
      </p>

      <ul>
        <li><strong>No title is given to sections:</strong> Unlike the EE, the TOK essay does not use labelled sections (Introduction, Body, Conclusion), these are implicit</li>
        <li><strong>No table of contents:</strong> At 1,600 words, a table of contents would be absurd and is not expected</li>
        <li><strong>No abstract:</strong> Unlike the EE, there is no abstract or research question box, you begin directly with the essay</li>
        <li><strong>Shorter but denser:</strong> The EE allows up to 4,000 words across a structured research document; the TOK essay packs comparable analytical depth into 1,600 words of continuous argument</li>
      </ul>

      <h2>Check Your Essay Against the Marking Criteria</h2>

      <p>
        Before submission, format checklist:
      </p>

      <ul>
        <li>Word count is 1,600 or below (not including title page and bibliography)</li>
        <li>Title page includes session number, full prescribed title (copied exactly), and school name</li>
        <li>Word count is declared on the title page</li>
        <li>No name appears in the essay body</li>
        <li>Bibliography is present and consistently formatted</li>
        <li>Essay is in paragraph form, no bullets or subheadings in the body</li>
        <li>Font is readable and spacing is at least 1.5</li>
        <li>Pages are numbered</li>
      </ul>

      <p>
        The format itself does not earn marks, but violating it costs them. Use IBLens to check that your TOK essay argument is as strong as its presentation.
      </p>

      <p>
        <a href="/essay/tok-essay">Analyse your TOK essay with IBLens →</a>
      </p>
    
  </main>`,
};