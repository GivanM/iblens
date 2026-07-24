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
      <p>Your text is transmitted over an encrypted connection to our AI provider, Anthropic PBC, solely to generate your analysis. We do not use it to train any AI model and do not sell it. Anonymous analyses are not stored permanently.</p>
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
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">Should You Pay for an IB Remark in 2026?</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">A remark (Enquiry Upon Results, EUR Category 1) costs around \$100–120 per subject, your grade can go down as well as up, and requests close around September 15. Most students decide blind — here is how to decide with data.</p>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">The three facts that matter</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Cost:</strong> around \$100–120 per subject, refunded only if your grade changes.</li>
    <li><strong>Risk:</strong> grades can go down on a remark, and the result is final.</li>
    <li><strong>Deadline:</strong> ~September 15 via your IB coordinator — schools often set earlier cutoffs.</li>
  </ul>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">You are deciding blind — unless you re-grade first</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The standard advice — remark only if you are 1–2 marks from a boundary — is useless when IB does not show you component marks. Your Extended Essay and TOK essay are externally marked, exactly where remarks apply and where examiner judgement varies most. Paste the essay you actually submitted into IBLens: strict, criterion-by-criterion grading against the official rubric. If it lands near a boundary, a remark has real upside. If it sits mid-band, save your \$110. First analysis free, then \$4.99.</p>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Key dates after results day</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>July 6:</strong> results at 12:00 GMT on candidates.ibo.org</li>
    <li><strong>July 6–29:</strong> cheapest registration window for November retakes</li>
    <li><strong>~September 15:</strong> remark requests close</li>
    <li><strong>November:</strong> retake session · <strong>December 16:</strong> November results</li>
  </ul>
  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can my grade go down after a remark?</dt>
    <dd style="margin-top:4px">Yes — up or down, and the new grade is final. Only remark with evidence you are near a boundary.</dd>
    <dt style="font-weight:600;margin-top:16px">Remark or retake?</dt>
    <dd style="margin-top:4px">Remark when your externally-marked essay reads close to a boundary. Retake in November when you are several marks off — register July 6–29 for the lowest fees.</dd>
  </dl>
  <p style="margin-top:24px"><a href="/essay" style="color:#7B1D2E;font-weight:600">Grade my submitted essay — first one free →</a></p>
</main>`),


  "/": S(`  <main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <p style="font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7B1D2E;margin-bottom:12px">IB Essay Grader</p>
  <h1 style="font-size:34px;font-weight:800;line-height:1.2;margin:0 0 16px">Know your IB score before the exam</h1>
  <p style="font-size:17px;color:#374151;line-height:1.7;margin-bottom:24px">IBLens is a free AI IB essay grader that scores your Internal Assessment (IA), Extended Essay (EE), or Theory of Knowledge (TOK) essay against the official IB rubric in 60 seconds. Get a criterion-by-criterion breakdown, a predicted band, the exact marks you are losing, and specific improvements. Every essay gets a free preview — no account required, no subscription. IBLens is calibrated to grade like a strict examiner — no inflated scores.</p>
  <h2 style="font-size:22px;font-weight:700;margin:28px 0 12px">What IBLens grades</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:24px">
    <li><strong>Internal Assessments (IA)</strong> for every IB subject — Biology, Chemistry, Physics, Economics, History, Psychology, Business Management, Maths AA/AI, Computer Science and more.</li>
    <li><strong>Extended Essay (EE)</strong> across all subjects, against the five official EE criteria.</li>
    <li><strong>Theory of Knowledge (TOK)</strong> essays and the TOK Exhibition.</li>
  </ul>
  <h2 style="font-size:22px;font-weight:700;margin:28px 0 12px">How the IB essay grader works</h2>
  <ol style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:24px">
    <li>Paste your essay and select your subject and essay type.</li>
    <li>The AI evaluates every official IB criterion in about 60 seconds.</li>
    <li>You get a predicted score, per-criterion feedback, and specific fixes.</li>
  </ol>
  <h2 style="font-size:22px;font-weight:700;margin:28px 0 12px">Why IB students use IBLens</h2>
  <p style="color:#374151;line-height:1.7;margin-bottom:20px">IB tutors charge $50–150 per hour. A single IBLens analysis costs $4.99 and takes 60 seconds — with feedback based on the official IB marking criteria, available 24/7. Your first essay is graded free.</p>
  <p style="line-height:2"><a href="/essay">Grade my IB essay free →</a> &nbsp;·&nbsp; <a href="/pricing">See pricing</a> &nbsp;·&nbsp; <a href="/resources">Free IB study guides</a></p>
</main>`),

  "/pricing": S(`  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › Pricing</nav>
  <h1 style="font-size:30px;font-weight:800;line-height:1.2;margin:0 0 16px">IBLens Pricing — IB Essay Analysis from $4.99</h1>
  <p style="font-size:16px;color:#374151;line-height:1.7;margin-bottom:24px">Your first IB essay analysis is free — no account, no credit card. After that, pay only for what you use. No subscription, and a 7-day money-back guarantee on every purchase.</p>
  <h2 style="font-size:20px;font-weight:700;margin:28px 0 12px">Plans</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:24px">
    <li><strong>Free</strong> — free preview for every essay — band range, weakest criterion, top risks.</li>
    <li><strong>Single analysis — $4.99</strong> — one full IB essay analysis (IA, EE or TOK).</li>
    <li><strong>Pack of 5 — $19.99</strong> — five analyses, credits never expire.</li>
    <li><strong>Pack of 10 — $34.99</strong> — ten analyses, best value per essay.</li>
  </ul>
  <h2 style="font-size:20px;font-weight:700;margin:28px 0 12px">How IBLens compares to an IB tutor</h2>
  <p style="color:#374151;line-height:1.7;margin-bottom:20px">IB tutors charge $50–150 per hour. A single IBLens analysis costs $4.99 and returns criterion-by-criterion feedback against the official IB rubric in 60 seconds, any time of day. Credits never expire, and every purchase is covered by a 7-day money-back guarantee.</p>
  <p><a href="/essay">Start free →</a></p>
</main>`),

  "/university": S(`<main style="max-width:800px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> ‹ University Strategy</nav>
  <h1 style="font-size:28px;font-weight:700;margin:0 0 16px">IB University Strategy — being rebuilt</h1>
  <p style="color:#374151;line-height:1.75">We have taken the University Strategy offline while we rebuild it on verified, official university requirements and deadlines from primary sources. In the meantime, grade your IB essays free: <a href="/essay">IB Essay Analyzer</a></p>
</main>`),

  "/essay/biology-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Biology IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Biology IA Grader — Free AI Feedback on Lab Reports</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Biology Internal Assessment against the official IB Biology IA rubric — criterion by criterion — and gives you a predicted score in 60 seconds. Paste your lab report, get specific, actionable feedback on every criterion. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Biology IA rubric: what examiners look for (24 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The Biology IA is worth 20% of your final IB grade. Examiners assess five criteria:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Personal Engagement (PE) — 2 marks</strong>: Your individual connection to the topic, evidence of genuine curiosity beyond generic statements. IBLens checks whether your introduction demonstrates authentic, specific personal engagement.</li>
    <li><strong>Exploration (Ex) — 6 marks</strong>: Research question, hypothesis, variables, methodology, safety and ethical considerations. IBLens checks whether your research question is focused, your variables are correctly identified, and your method is reproducible.</li>
    <li><strong>Analysis (A) — 6 marks</strong>: Raw data, data processing, graphs, and statistical analysis. IBLens checks for correct uncertainty analysis, appropriate statistical tests, and whether your data presentation supports your research question.</li>
    <li><strong>Evaluation (Ev) — 6 marks</strong>: Conclusions, comparison to literature, evaluation of weaknesses, and suggested improvements. IBLens checks whether your conclusion follows from your data and whether your improvements are specific and realistic.</li>
    <li><strong>Communication (C) — 4 marks</strong>: Structure, scientific language, referencing, and presentation. IBLens checks for precise scientific vocabulary and whether your report meets IB format requirements.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Biology IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Missing uncertainty analysis</strong>: Not including absolute or percentage uncertainties in data tables, or failing to propagate uncertainties through calculations. This alone can drop your Analysis score from 6 to 3.</li>
    <li><strong>Vague personal engagement</strong>: Writing "I chose this topic because biology interests me" — examiners need a specific personal experience or connection to award both PE marks.</li>
    <li><strong>Weak evaluation section</strong>: Listing limitations without analysing their impact on your results, or proposing impractical improvements like "use better equipment".</li>
    <li><strong>Non-scientific language</strong>: Using "amount" instead of "concentration", or "things" instead of "variables". The Communication criterion is easy to lose through imprecise language.</li>
    <li><strong>Insufficient statistical processing</strong>: Not using t-tests or chi-squared tests when the data type requires them.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Biology IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report — exact score and every criterion with comments — unlocks for $4.99, or $19.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">How accurate is the predicted score?</dt>
    <dd style="margin-top:4px">IBLens uses the official IB Biology IA rubric descriptors and examiner language. The predicted score is a close approximation. Your teacher's assessment is the official one.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I use this for Biology EE?</dt>
    <dd style="margin-top:4px">No — the Biology IA grader uses the IA-specific rubric. For Extended Essays, use the <a href="/essay/extended-essay">Extended Essay grader</a>. For IB Biology EE tips, see our <a href="/resources/ib-biology-extended-essay">Biology EE guide</a>.</dd>
    <dt style="font-weight:600;margin-top:16px">Does IBLens store my essay?</dt>
    <dd style="margin-top:4px">Anonymous analyses are not permanently stored. Signed-in users can access analysis history from their dashboard.</dd>
  </dl>
</main>`),

  "/essay/economics-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Economics IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Economics IA Grader — Free AI Feedback on Your Commentary</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Economics Internal Assessment commentary against the official IB Economics IA rubric. Get criterion-by-criterion feedback on Diagrams, Terminology, Application, Analysis, and Evaluation in 60 seconds. First analysis free — no account needed.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Economics IA rubric: five criteria (45 marks total)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">Each IB Economics IA commentary is marked out of 45 marks across five criteria. You submit three commentaries, each on a different section of the syllabus (Microeconomics, Macroeconomics, International Economics, or Development Economics).</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A — Diagrams (3 marks)</strong>: Correct, clearly labelled diagrams that are directly relevant to the article and fully explained in the text. IBLens checks whether your diagrams are accurate, have all axes and curves labelled, and are genuinely integrated into your analysis.</li>
    <li><strong>Criterion B — Terminology (3 marks)</strong>: Accurate use of economic terminology throughout. IBLens checks for misused terms, vague language, and missing technical vocabulary.</li>
    <li><strong>Criterion C — Application (3 marks)</strong>: Effective application of economic concepts to the real-world article. IBLens checks whether your analysis stays focused on the article rather than drifting into generic theory.</li>
    <li><strong>Criterion D — Analysis (5 marks)</strong>: Depth and accuracy of economic analysis including relevant theory, models, and cause-and-effect chains. IBLens checks whether your analysis explains mechanisms (why and how) rather than just describing what happens.</li>
    <li><strong>Criterion E — Evaluation (5 marks)</strong>: Balanced, well-supported evaluation with short-run/long-run distinctions, stakeholder analysis, and limitations. IBLens checks for genuine two-sided evaluation — not just listing pros and cons.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Economics IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Unlabelled or incorrect diagrams</strong>: Missing price/quantity labels, curves not named (e.g., "D1", "D2"), or shifts drawn incorrectly. These mistakes cost marks in every commentary.</li>
    <li><strong>Describing instead of analysing</strong>: Explaining what happened in the article without using economic models to explain why or how. Analysis requires you to work through the chain of causation using a diagram.</li>
    <li><strong>One-sided evaluation</strong>: Only discussing benefits or only drawbacks. Examiners expect consideration of different stakeholders, time horizons, and limitations of the policy or event.</li>
    <li><strong>Going over the word limit</strong>: Each commentary has a 750-word limit (excluding references and diagrams). IBLens checks approximate word count and flags content that should be cut.</li>
    <li><strong>Weak article-concept link</strong>: Using a concept that only loosely relates to the article. The article must be central to your commentary, not just a brief mention in the introduction.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Economics IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report — exact score and every criterion with comments — unlocks for $4.99, or $19.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I grade all three of my Economics IA commentaries?</dt>
    <dd style="margin-top:4px">Yes — each commentary is graded separately. Run one analysis per commentary to get specific feedback on each.</dd>
    <dt style="font-weight:600;margin-top:16px">Does the grader check my word count?</dt>
    <dd style="margin-top:4px">IBLens counts the words in your pasted text and will flag if you are over or near the 750-word limit.</dd>
  </dl>
</main>`),

  "/essay/history-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB History IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB History IA Grader — Free AI Feedback on Your Historical Investigation</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB History Internal Assessment (Historical Investigation) against the official IB History IA rubric. Get criterion-by-criterion feedback on your Section A, B, and C in 60 seconds. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB History IA rubric: three sections (25 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Section A — Identification and Evaluation of Sources (9 marks)</strong>: You select two primary or secondary sources and evaluate their origin, purpose, value, and limitation (OPVL). IBLens checks whether your OPVL analysis goes beyond surface-level description and genuinely connects to your investigation's question.</li>
    <li><strong>Section B — Investigation (13 marks)</strong>: Your historical argument, supported by evidence from a range of sources. IBLens checks whether your argument is consistently analytical rather than narrative, whether counter-arguments are addressed, and whether evidence directly supports your claims.</li>
    <li><strong>Section C — Reflection (3 marks)</strong>: Your reflection on the methods and challenges historians face. IBLens checks whether your reflection is specific to your investigation and demonstrates genuine understanding of historical methodology.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB History IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Descriptive Section B</strong>: Narrating what happened instead of arguing why or how. Examiners want analytical writing — every paragraph should advance your argument, not retell events.</li>
    <li><strong>Surface-level OPVL</strong>: Saying a source is "biased because the author has an opinion" without specifying how the bias affects its value or limitation for your specific investigation.</li>
    <li><strong>Weak research question</strong>: Questions like "What caused World War I?" are too broad. A strong History IA research question is specific, debatable, and historically significant.</li>
    <li><strong>Generic reflection</strong>: Section C should reference specific methodological challenges you encountered in your own investigation — not generic statements about what historians do.</li>
    <li><strong>Over-reliance on one type of source</strong>: Using only secondary sources, or only sources from one perspective, limits your Section B marks.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can I paste just Section B for feedback?</dt>
    <dd style="margin-top:4px">Yes — you can paste any section separately. For the most complete feedback, paste your full investigation including all three sections.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the History IA word limit?</dt>
    <dd style="margin-top:4px">The IB History IA has a 2,200-word limit (excluding the bibliography). IBLens checks your approximate word count and will flag if you are over the limit.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the History IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report — exact score and every criterion with comments — unlocks for $4.99, or $19.99 for a pack of five.</dd>
  </dl>
</main>`),

  "/essay/extended-essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › Extended Essay</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Extended Essay Grader — Free AI Feedback on Your EE</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Extended Essay against the official IB EE rubric — all five criteria — and gives you criterion-by-criterion feedback in 60 seconds. Paste up to 4,000 words (or your full EE) and get a predicted score with specific improvement suggestions. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Extended Essay rubric: five criteria (34 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A — Focus and Method (6 marks)</strong>: The clarity and focus of your research question, the appropriateness of your methodology, and how well you demonstrate awareness of your approach. IBLens checks whether your research question is arguable, specific, and suitable for an extended investigation.</li>
    <li><strong>Criterion B — Knowledge and Understanding (6 marks)</strong>: Depth of subject-specific knowledge, correct use of terminology, and understanding of the academic context. IBLens checks whether you use subject-specific vocabulary accurately and whether your engagement with existing research is genuine.</li>
    <li><strong>Criterion C — Critical Thinking (12 marks)</strong>: The quality of your argument, the strength of your analysis, the handling of counter-arguments, and the logical structure of your reasoning. This is the highest-weighted criterion — IBLens gives detailed feedback on argument quality.</li>
    <li><strong>Criterion D — Presentation (4 marks)</strong>: Adherence to the required structure (title page, table of contents, introduction, body, conclusion, bibliography), the 4,000-word limit, and formatting. IBLens checks structure and approximate word count.</li>
    <li><strong>Criterion E — Engagement (6 marks)</strong>: Assessed through your Reflections on Planning and Progress (RPPF). IBLens evaluates the depth of your intellectual engagement and self-reflection demonstrated in your written work.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common Extended Essay mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Research question too broad or descriptive</strong>: "What is the impact of social media?" cannot be argued in 4,000 words. IBLens checks whether your research question is narrow enough for genuine analysis.</li>
    <li><strong>Descriptive body sections</strong>: Summarising sources instead of building an analytical argument. Every paragraph in the body should advance your answer to the research question.</li>
    <li><strong>Weak conclusion</strong>: Conclusions that introduce new evidence or simply restate the introduction. Your conclusion must directly and specifically answer your research question based on your argument.</li>
    <li><strong>Unbalanced criterion C</strong>: Having good analysis but no counter-argument, or good counter-arguments but no sustained position. IBLens checks for both.</li>
    <li><strong>Over the 4,000-word limit</strong>: examiners stop reading at 4,000 words — anything beyond is not assessed. There is no official minimum, but very short essays rarely sustain enough analysis. IBLens checks your word count.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Can I paste my full 4,000-word EE?</dt>
    <dd style="margin-top:4px">Yes — IBLens accepts up to 30,000 characters. A 4,000-word EE is approximately 24,000 characters and will be fully analysed.</dd>
    <dt style="font-weight:600;margin-top:16px">Does the grader work for all EE subjects?</dt>
    <dd style="margin-top:4px">Yes — the EE rubric is the same across all subjects. Select your subject in the dropdown so the AI can give subject-specific feedback on knowledge and terminology.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Extended Essay grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report — exact score and every criterion with comments — unlocks for $4.99, or $19.99 for a pack of five.</dd>
  </dl>
</main>`),

  "/essay/tok-essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › TOK Essay</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB TOK Essay Grader — Free AI Feedback on Theory of Knowledge</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Theory of Knowledge essay against the official IB TOK rubric and gives you criterion-by-criterion feedback in 60 seconds. Find out if your knowledge claims are developed enough, whether your counter-claims are genuinely addressed, and whether your essay actually answers the prescribed title. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB TOK Essay rubric: what examiners look for (10 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Understanding Knowledge Questions (0–5 marks)</strong>: How well you identify, develop, and analyse genuine knowledge questions related to the prescribed title. IBLens checks whether your knowledge claims go beyond personal opinions and genuinely engage with epistemological questions.</li>
    <li><strong>Quality of Analysis of Knowledge Questions (0–5 marks)</strong>: The depth, nuance, and rigour of your analysis. IBLens checks whether you explore multiple perspectives, acknowledge limitations, and build a coherent argument rather than simply listing examples.</li>
    <li><strong>Connections Across Areas of Knowledge (0–5 marks — included in newer IB frameworks)</strong>: Whether you make genuine, illuminating connections across different Areas of Knowledge or Ways of Knowing. IBLens checks whether your connections are substantive or merely cosmetic.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common TOK Essay mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Not answering the prescribed title</strong>: Writing a good essay on a TOK topic that does not directly engage with the specific wording of the title. Every paragraph must connect back to the prescribed title.</li>
    <li><strong>Examples as evidence without analysis</strong>: Presenting examples (a historical event, a scientific discovery) without using them to build or challenge a knowledge claim. Examples must do epistemic work in your argument.</li>
    <li><strong>Unaddressed counter-claims</strong>: Presenting only one side of a knowledge question. Examiners expect you to engage with perspectives that challenge your position and explain why you ultimately hold your view.</li>
    <li><strong>Vague Ways of Knowing references</strong>: Mentioning "emotion" or "reason" as Ways of Knowing without explaining how they specifically function in the context of your knowledge claim.</li>
    <li><strong>Personal opinion as argument</strong>: "I think mathematics is universal" is not a knowledge claim — it must be developed and tested against counter-examples and alternative perspectives.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the TOK Essay grader different from the TOK Exhibition grader?</dt>
    <dd style="margin-top:4px">Yes — they use different rubrics. The TOK Essay is a 1,600-word written essay on a prescribed title. The TOK Exhibition involves three real-world objects linked to an IA prompt. Use the <a href="/essay/tok-exhibition">TOK Exhibition grader</a> for exhibition commentaries.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the TOK Essay word limit?</dt>
    <dd style="margin-top:4px">1,600 words. IBLens checks your word count and will flag if you are over or significantly under.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the TOK Essay grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
  </dl>
</main>`),

  "/essay/tok-exhibition": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › TOK Exhibition</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB TOK Exhibition Grader — Free AI Feedback on All 3 Objects</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Theory of Knowledge Exhibition commentary against the official IB TOK Exhibition rubric — all three criteria — and gives you specific feedback in 60 seconds. Find out if your object justifications make convincing links to the IA prompt and to TOK concepts. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB TOK Exhibition rubric: three criteria (10 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Links between objects and the selected IA prompt (0–4 marks)</strong>: How clearly and specifically each object connects to your chosen IA prompt. IBLens checks whether your objects are concrete and specific (not generic or symbolic), and whether each object is justified in terms of the exact prompt wording.</li>
    <li><strong>Links between objects and TOK (0–3 marks)</strong>: Whether each object connects to genuine TOK concepts — knowledge questions, Ways of Knowing, or Areas of Knowledge — with sufficient depth. IBLens checks whether you are naming TOK concepts or actually engaging with them.</li>
    <li><strong>Quality of justification (0–3 marks)</strong>: How convincing, coherent, and developed your justification is for each object. IBLens checks whether you build an argument or simply make assertions, and whether the three objects work together as a coherent whole.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common TOK Exhibition mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Generic or symbolic objects</strong>: Choosing abstract symbols ("a book representing knowledge") rather than specific, real-world objects with a concrete epistemic connection to the prompt.</li>
    <li><strong>Naming TOK concepts without engaging with them</strong>: Writing "this connects to emotion as a Way of Knowing" without explaining how emotion specifically operates in this object's context.</li>
    <li><strong>Objects that do not work together</strong>: Three disconnected objects that each make separate points, rather than building a coherent, cumulative argument about knowledge in the context of the prompt.</li>
    <li><strong>Weak justification length</strong>: Each object commentary should be roughly 100 words of substantive argument. Brief, superficial justifications score in the lowest mark band.</li>
    <li><strong>Ignoring the IA prompt wording</strong>: Your justification must address the specific language of the chosen IA prompt — not just the general topic of knowledge.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">How is the TOK Exhibition different from the TOK Essay?</dt>
    <dd style="margin-top:4px">The TOK Exhibition involves choosing three real-world objects and writing a short commentary (roughly 950 words total) explaining how each object connects to one of the 35 IA prompts. The <a href="/essay/tok-essay">TOK Essay</a> is a 1,600-word essay on a prescribed title.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the word limit for the TOK Exhibition?</dt>
    <dd style="margin-top:4px">The IB recommends approximately 950 words total across all three object commentaries, with no strict per-object limit.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the TOK Exhibition grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report — exact score and every criterion with comments — unlocks for $4.99, or $19.99 for a pack of five.</dd>
  </dl>
</main>`),

  "/essay/math-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Math IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Math IA Grader — Free AI Feedback on Your Exploration</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Mathematics Internal Assessment (Exploration) against the official IB Math IA rubric — all five criteria — in 60 seconds. Works for both Mathematics: Analysis and Approaches (AA) and Mathematics: Applications and Interpretation (AI). A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Math IA rubric: five criteria (20 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Communication (0–4 marks)</strong>: The clarity, organisation, and coherence of your exploration. IBLens checks whether your exploration has a clear aim, is logically structured, and uses mathematical notation correctly throughout.</li>
    <li><strong>Mathematical Presentation (0–3 marks)</strong>: Correct use of mathematical language, notation, and representation. IBLens checks for correct use of variables, functions, equations, graphs, and tables.</li>
    <li><strong>Personal Engagement (0–3 marks)</strong>: Evidence that you personally explored the mathematics — your own conjectures, unexpected directions, and genuine curiosity. IBLens checks for signs of personal mathematical thinking rather than reproducing textbook content.</li>
    <li><strong>Reflection (0–3 marks)</strong>: Critical reflection on the significance of your results, limitations of your approach, and possible extensions. IBLens checks whether your reflection is genuinely critical or merely descriptive.</li>
    <li><strong>Use of Mathematics (0–6 marks)</strong>: The sophistication, accuracy, and relevance of the mathematics used. IBLens checks whether the mathematics is correct, whether it is at an appropriate level of complexity, and whether it is relevant to your aim.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Math IA mistakes IBLens catches</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Textbook-style exploration</strong>: Reproducing mathematical results from a textbook without personal investigation. Examiners look for your own mathematical journey — conjectures, dead ends, and discoveries.</li>
    <li><strong>Mathematics too simple for HL/SL level</strong>: Using arithmetic or basic algebra when your syllabus level requires calculus or statistics. The Use of Mathematics criterion expects sophistication appropriate to your course.</li>
    <li><strong>No clear aim</strong>: Starting without stating what mathematical question you are exploring and why. The Communication criterion requires a clear, concise aim in your introduction.</li>
    <li><strong>Generic reflection</strong>: Writing "my exploration had some limitations" without specifying what those limitations were and how they affected your results or conclusions.</li>
    <li><strong>Computational errors</strong>: Arithmetic or algebraic errors that undermine your conclusions. IBLens checks the logical consistency of your work.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Does this work for both Math AA and Math AI?</dt>
    <dd style="margin-top:4px">Yes — the IB Math IA rubric is identical for both Mathematics: Analysis and Approaches and Mathematics: Applications and Interpretation. See also our dedicated <a href="/essay/maths-aa-ia">Math AA IA grader</a> and <a href="/essay/maths-ai-ia">Math AI IA grader</a> pages.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the word limit for the Math IA?</dt>
    <dd style="margin-top:4px">The IB recommends 6–12 pages, with no strict word limit. Typically 1,500–3,000 words plus mathematical working.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Math IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
  </dl>
</main>`),

  "/essay/psychology-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Psychology IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Psychology IA Grader — Free AI Feedback on Your Experimental Report</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Psychology Internal Assessment experimental report against the official IB Psychology IA rubric — all six criteria — in 60 seconds. Get specific feedback on your Introduction, Exploration, Analysis, Evaluation, and more. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Psychology IA rubric: six criteria (22 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Introduction (6 marks)</strong>: Background theory, aim, and hypothesis. IBLens checks whether your introduction clearly links the psychological theory to your experimental design and whether your hypothesis is directional and operationalised.</li>
    <li><strong>Exploration (4 marks)</strong>: Research design, sampling method, materials, and ethical considerations. IBLens checks whether your design choices are justified and whether you explain how you controlled for confounding variables.</li>
    <li><strong>Analysis (6 marks)</strong>: Descriptive and inferential statistics, graphs, and interpretation. IBLens checks whether you select the correct statistical test, present results clearly, and interpret the statistics accurately.</li>
    <li><strong>Evaluation (6 marks)</strong>: Discussion of results in relation to the background theory, limitations, and suggestions for modification. IBLens checks whether your evaluation is specific and whether limitations directly relate to your findings.</li>
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
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report — exact score and every criterion with comments — unlocks for $4.99, or $19.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">Does IBLens grade Psychology Extended Essays?</dt>
    <dd style="margin-top:4px">Yes — use the <a href="/essay/extended-essay">Extended Essay grader</a> and select Psychology as your subject.</dd>
  </dl>
</main>`),

  "/essay/chemistry-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Chemistry IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Chemistry IA Grader — Free AI Feedback on Your Lab Report</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Chemistry Internal Assessment against the official IB Chemistry IA rubric — all five criteria — in 60 seconds. Get feedback on Personal Engagement, Exploration, Analysis, Evaluation, and Communication. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Chemistry IA rubric (24 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The Chemistry IA uses the same five criteria as other science IAs, but Chemistry-specific expectations apply:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Personal Engagement (2 marks)</strong>: Specific personal connection to the chemistry topic, not generic interest statements.</li>
    <li><strong>Exploration (6 marks)</strong>: Focused research question with clearly identified independent, dependent, and controlled variables. Safety and ethical considerations for chemical procedures.</li>
    <li><strong>Analysis (6 marks)</strong>: Correct propagation of uncertainties through calculations, appropriate significant figures, and correct chemical equations where relevant.</li>
    <li><strong>Evaluation (6 marks)</strong>: Discussion of systematic and random errors, their effect on your result, and realistic improvements specific to your method.</li>
    <li><strong>Communication (4 marks)</strong>: Correct chemical notation, SI units, and clear labelling of all apparatus diagrams.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Chemistry IA mistakes</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Incorrect uncertainty propagation</strong>: Not using the correct rules (addition/subtraction vs multiplication/division) when propagating uncertainties through multi-step calculations.</li>
    <li><strong>Too few repeats</strong>: Chemistry IAs require at minimum 5 data points to demonstrate a trend. Fewer data points significantly limits your Analysis score.</li>
    <li><strong>Confusing systematic and random errors</strong>: Listing "human reaction time" as a systematic error rather than a random one, or vice versa. IBLens checks whether your error analysis uses correct terminology.</li>
    <li><strong>Missing or incorrect chemical equations</strong>: If your investigation involves a chemical reaction, the balanced equation must be present and correct.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Chemistry IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report — exact score and every criterion with comments — unlocks for $4.99, or $19.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I use this for IB Chemistry EE?</dt>
    <dd style="margin-top:4px">For Chemistry Extended Essays, use the <a href="/essay/extended-essay">Extended Essay grader</a> and select Chemistry as your subject. See also our <a href="/resources/ib-chemistry-extended-essay">IB Chemistry EE guide</a>.</dd>
  </dl>
</main>`),

  "/essay/physics-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Physics IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Physics IA Grader — Free AI Feedback on Your Lab Report</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Physics Internal Assessment against the official IB Physics IA rubric — criterion by criterion — in 60 seconds. Get feedback on your exploration, data analysis, uncertainty propagation, and evaluation. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Physics IA rubric (24 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Personal Engagement (2 marks)</strong>: A specific personal connection to the physics investigation — not a generic statement about enjoying physics.</li>
    <li><strong>Exploration (6 marks)</strong>: A focused, measurable research question; clearly identified variables; a sound, safe experimental design.</li>
    <li><strong>Analysis (6 marks)</strong>: Correct data presentation with appropriate significant figures, uncertainty analysis, and linearisation of graphs where required.</li>
    <li><strong>Evaluation (6 marks)</strong>: Critical evaluation of your method and results, comparison to accepted theoretical values, and specific, realistic improvements.</li>
    <li><strong>Communication (4 marks)</strong>: Correct use of SI units, scientific notation, and clear diagram labels.</li>
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
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I paste only part of my IA?</dt>
    <dd style="margin-top:4px">Yes — but for criterion-by-criterion feedback, paste your full report for the most accurate score prediction.</dd>
  </dl>
</main>`),

  "/essay/business-management-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Business Management IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Business Management IA Grader — Free AI Feedback on Your IA</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Business Management Internal Assessment against the official IB BM IA rubric. Get criterion-by-criterion feedback in 60 seconds on your research proposal, findings, and analysis. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Business Management IA rubric (25 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Research Proposal (5 marks)</strong>: A clear business research question, statement of intent, and identification of primary and secondary sources. IBLens checks whether your RQ is specific enough for investigation and whether your sources are appropriate.</li>
    <li><strong>Theoretical framework and sources (5 marks)</strong>: Application of relevant business concepts and theories. IBLens checks whether you correctly apply BM tools (SWOT, Porter's Five Forces, financial ratios, etc.) and whether your sources are evaluated.</li>
    <li><strong>Primary and secondary research (5 marks)</strong>: Quality and relevance of evidence gathered. IBLens checks whether your primary data (interviews, surveys) is analysed critically rather than just summarised.</li>
    <li><strong>Results and analysis (5 marks)</strong>: Depth of analysis linking evidence to your research question. IBLens checks whether you draw substantiated conclusions from your data.</li>
    <li><strong>Conclusions and evaluation (5 marks)</strong>: Balanced conclusions, recommendations, and limitations. IBLens checks whether your recommendations are realistic and supported by your research.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Common IB Business Management IA mistakes</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>RQ too broad or not business-focused</strong>: "How can Company X improve?" covers too much ground. A strong BM RQ focuses on one specific business problem or decision.</li>
    <li><strong>Describing tools without applying them</strong>: Listing SWOT categories without connecting them to your evidence and research question. Tools must do analytical work, not just fill a template.</li>
    <li><strong>Summarising interviews instead of analysing</strong>: Quoting what the CEO said without evaluating how it answers your research question or what it implies for your business analysis.</li>
    <li><strong>Recommendations not supported by evidence</strong>: Your recommendations in the conclusions section must trace directly back to your findings — not general business advice.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is the Business Management IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the word limit for the IB Business Management IA?</dt>
    <dd style="margin-top:4px">1,500–2,000 words for the main body. IBLens checks your approximate word count and will flag if you are significantly over.</dd>
  </dl>
</main>`),

  "/essay/english-essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB English Essay</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB English IA Grader — Free AI Feedback on Your Individual Oral</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB English A Individual Oral (IA) transcript or written commentary against the official IB English rubric — all four criteria — in 60 seconds. Works for both English A: Language and Literature and English A: Literature. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB English IA rubric: four criteria (40 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A — Knowledge, understanding, and interpretation (10 marks)</strong>: Your understanding of the chosen works and global issue, supported by accurate references. IBLens checks whether your interpretation is substantiated and whether you engage with the text's context.</li>
    <li><strong>Criterion B — Analysis and evaluation (10 marks)</strong>: Analysis of authorial choices — literary devices, structure, tone, diction — and how they construct meaning. IBLens checks whether your analysis goes beyond identification to evaluate the effect of the choices.</li>
    <li><strong>Criterion C — Focus and organisation (10 marks)</strong>: Logical structure, coherent line of argument, and clear focus on the global issue and works. IBLens checks whether your oral builds a sustained argument or drifts between points.</li>
    <li><strong>Criterion D — Language (10 marks)</strong>: Clarity, precision, and register of language. IBLens checks for vague phrasing, over-hedging, and imprecise literary terminology.</li>
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
    <dd style="margin-top:4px">Yes — paste your oral transcript or a written draft of your argument. IBLens evaluates the content against the rubric criteria.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the English IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
  </dl>
</main>`),

  "/essay/computer-science-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Computer Science IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Computer Science IA Grader — Free AI Feedback on Your Solution</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Computer Science Internal Assessment report against the official IB CS IA rubric — all five criteria — in 60 seconds. Get feedback on your planning, design, development, and evaluation. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">IB Computer Science IA rubric: five criteria (34 marks)</h2>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Criterion A — Planning (6 marks)</strong>: The identification of the client, the problem, the proposed solution, and success criteria. IBLens checks whether your problem is clearly defined, your client is identified, and your success criteria are specific and measurable.</li>
    <li><strong>Criterion B — Solution Overview (6 marks)</strong>: The design of your solution including UML diagrams, flow charts, record structures, and test data. IBLens checks whether your design documentation is complete and directly reflects your implemented solution.</li>
    <li><strong>Criterion C — Development (12 marks)</strong>: The techniques used in developing your solution and the sophistication of your code. IBLens checks whether you explain the most complex parts of your code, justify design decisions, and demonstrate appropriate use of data structures and algorithms.</li>
    <li><strong>Criterion D — Functionality (4 marks)</strong>: Whether your solution works as intended and meets the success criteria. IBLens checks whether your test evidence demonstrates all required functionality.</li>
    <li><strong>Criterion E — Evaluation (6 marks)</strong>: A critical evaluation of your solution against your success criteria, with client feedback and suggested improvements. IBLens checks whether your evaluation is specific and honest rather than superficially positive.</li>
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
    <dd style="margin-top:4px">Yes — you can paste any part of your IA. For the most accurate predicted score across all five criteria, paste your full report.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Computer Science IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
  </dl>
</main>`),

  "/essay/maths-aa-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Math AA IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Math AA IA Grader — Free AI Feedback on Analysis & Approaches</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Mathematics: Analysis and Approaches Internal Assessment exploration against the official IB Math rubric — all five criteria — in 60 seconds. Works for both SL and HL. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Math AA IA: how the rubric works (20 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">The IB Math AA IA uses the same five criteria as Math AI. However, examiners apply them with an expectation of more abstract, proof-oriented, or algebraic mathematics for AA students — especially at HL.</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Communication (4 marks)</strong>: Coherent structure, clear aim, and consistent mathematical notation. Examiners expect AA students to present rigorous mathematical arguments.</li>
    <li><strong>Mathematical Presentation (3 marks)</strong>: Correct use of variables, formal notation, and mathematical language. For AA, this includes formal proof notation where relevant.</li>
    <li><strong>Personal Engagement (3 marks)</strong>: Evidence of genuine exploration — your own conjectures, creative approaches, and original insights into the mathematics.</li>
    <li><strong>Reflection (3 marks)</strong>: Critical evaluation of your mathematical approach, limitations, and possible extensions or generalisations.</li>
    <li><strong>Use of Mathematics (6 marks)</strong>: For AA, examiners typically expect calculus, proof by induction, complex numbers, or similarly advanced content for HL, and functions, statistics, or geometry for SL.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">What is the difference between Math AA IA and Math AI IA?</dt>
    <dd style="margin-top:4px">The rubric is identical, but the expected sophistication differs. Math AA is more focused on pure mathematics (calculus, proof, algebra). Math AI focuses more on applied mathematics (statistics, modelling, real-world problems). See our <a href="/essay/maths-ai-ia">Math AI IA grader</a> for AI-specific feedback.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Math AA IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
  </dl>
</main>`),

  "/essay/maths-ai-ia": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/essay">Essay Grader</a> › IB Math AI IA</nav>
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Math AI IA Grader — Free AI Feedback on Applications & Interpretation</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens grades your IB Mathematics: Applications and Interpretation Internal Assessment exploration against the official IB Math rubric in 60 seconds. Works for both SL and HL. Get feedback on communication, personal engagement, reflection, and use of mathematics. A free preview is included; the full report is $4.99.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Math AI IA: what examiners look for (20 marks)</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">Math AI students are expected to apply mathematics to real-world contexts. Examiners look for meaningful data collection, statistical modelling, and genuine mathematical analysis of a real-world phenomenon.</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Communication (4 marks)</strong>: Clear aim, logical structure, and consistent notation. For AI, this includes clear explanation of your real-world context and why it is mathematically interesting.</li>
    <li><strong>Mathematical Presentation (3 marks)</strong>: Correct use of statistical notation, labelled graphs, regression models, and mathematical vocabulary appropriate to your investigation.</li>
    <li><strong>Personal Engagement (3 marks)</strong>: Evidence of genuine curiosity about the real-world data or problem — original data collection, unexpected findings you pursued, or creative modelling choices.</li>
    <li><strong>Reflection (3 marks)</strong>: Critical evaluation of your model's fit, limitations of your data, and what a more sophisticated approach would look like.</li>
    <li><strong>Use of Mathematics (6 marks)</strong>: For AI, examiners expect regression analysis, statistical hypothesis testing, differential equations in context, or similar applied techniques appropriate to your level.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">What topics work well for a Math AI IA?</dt>
    <dd style="margin-top:4px">Strong Math AI IA topics involve real data you collect or curate, a genuine mathematical question, and applied techniques from your syllabus. Examples: modelling COVID-19 case growth, analysing sports statistics with regression, or using differential equations to model a physical system.</dd>
    <dt style="font-weight:600;margin-top:16px">Is the Math AI IA grader free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion, top risks). The full report is $4.99.</dd>
    <dt style="font-weight:600;margin-top:16px">What is the difference between Math AI and Math AA?</dt>
    <dd style="margin-top:4px">Math AI focuses on applied and statistical mathematics in real-world contexts. Math AA focuses on pure mathematics including calculus, proof, and algebra. See our <a href="/essay/maths-aa-ia">Math AA IA grader</a> for AA-specific feedback.</dd>
  </dl>
</main>`),

  "/essay": S(`<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Essay Grader — Free AI Feedback on IA, Extended Essay & TOK</h1>
  <p style="font-size:16px;color:#374151;line-height:1.75;margin-bottom:28px">IBLens is a free AI essay grader for IB students. Paste your Internal Assessment, Extended Essay, or TOK Essay and get criterion-by-criterion feedback with a predicted score in 60 seconds — against the official IB rubric for your subject. No account required for your first analysis.</p>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Subjects and work types supported</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">IBLens grades all major IB assessment types:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Internal Assessments (IA)</strong>: <a href="/essay/biology-ia">Biology</a>, <a href="/essay/chemistry-ia">Chemistry</a>, <a href="/essay/physics-ia">Physics</a>, <a href="/essay/economics-ia">Economics</a>, <a href="/essay/history-ia">History</a>, <a href="/essay/psychology-ia">Psychology</a>, <a href="/essay/math-ia">Mathematics</a> (AA and AI), <a href="/essay/computer-science-ia">Computer Science</a>, <a href="/essay/business-management-ia">Business Management</a>, and <a href="/essay/english-essay">English A</a></li>
    <li><strong>Extended Essay (EE)</strong>: All subjects — the <a href="/essay/extended-essay">Extended Essay grader</a> uses the universal EE rubric and applies subject-specific knowledge expectations</li>
    <li><strong>TOK</strong>: Both the <a href="/essay/tok-essay">TOK Essay</a> (1,600-word prescribed title essay) and <a href="/essay/tok-exhibition">TOK Exhibition</a> (three-object commentary)</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">How IBLens works</h2>
  <ol style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Select your work type and subject</strong> — IBLens loads the official IB rubric for your specific assessment</li>
    <li><strong>Paste your text</strong> — copy and paste from your word processor; no file upload required</li>
    <li><strong>Add your research question or title</strong> (optional) — helps the AI evaluate whether your analysis addresses the question</li>
    <li><strong>Get your feedback in 60 seconds</strong> — a predicted score for each criterion with specific, actionable improvement suggestions</li>
  </ol>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">How IBLens compares to RevisionDojo</h2>
  <p style="color:#374151;line-height:1.75;margin-bottom:16px">IBLens and RevisionDojo are both AI IB essay graders. The main differences:</p>
  <ul style="color:#374151;line-height:1.9;padding-left:20px;margin-bottom:28px">
    <li><strong>Pricing</strong>: RevisionDojo charges $19/month subscription. IBLens charges per analysis ($4.99) with a free first analysis — better value for students who only need occasional feedback.</li>
    <li><strong>No account needed</strong>: IBLens lets you run your first analysis without creating an account. RevisionDojo requires registration.</li>
    <li><strong>TOK Exhibition</strong>: IBLens grades TOK Exhibitions against the official rubric. RevisionDojo also supports this.</li>
  </ul>

  <h2 style="font-size:20px;font-weight:600;margin:32px 0 12px">Frequently asked questions</h2>
  <dl style="color:#374151;line-height:1.75">
    <dt style="font-weight:600;margin-top:16px">Is IBLens free?</dt>
    <dd style="margin-top:4px">Every essay gets a free preview (band range, weakest criterion with full feedback, top risks). The full report unlocks for $4.99, or $19.99 for a pack of five.</dd>
    <dt style="font-weight:600;margin-top:16px">How accurate is the AI grading?</dt>
    <dd style="margin-top:4px">IBLens uses the official IB rubric descriptors for each subject and assessment type. The predicted score closely approximates what an experienced examiner would award — but your teacher's assessment is always the official mark.</dd>
    <dt style="font-weight:600;margin-top:16px">Is my essay stored or used to train AI?</dt>
    <dd style="margin-top:4px">No — your essay is sent to the AI for analysis and not stored permanently. IBLens does not use student essays to train AI models.</dd>
    <dt style="font-weight:600;margin-top:16px">Can I grade my essay more than once?</dt>
    <dd style="margin-top:4px">Yes — many students grade a draft, then revise and grade again. Each analysis uses one credit. A pack of five analyses ($19.99) is designed for iterative improvement across drafts.</dd>
  </dl>
</main>`),


  // ── Resource pages ──
"/resources/tok-essay-format": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB TOK Essay Format</nav>
      <h1>IB TOK Essay Format — Everything You Need to Know</h1>

      <p>
        The IB Theory of Knowledge essay has strict formatting rules. Getting the format wrong — even with excellent ideas — can cost you marks or trigger an automatic penalty. This guide covers every official formatting requirement: word count rules, structural expectations, citation format, what does and does not count toward the limit, and what examiners expect when they open your essay.
      </p>

      <h2>Word Count: The 1,600-Word Rule</h2>

      <p>
        The TOK essay has a <strong>maximum word count of 1,600 words</strong>. This limit is strictly enforced:
      </p>

      <ul>
        <li><strong>Essays that exceed 1,600 words:</strong> Examiners are instructed to stop reading at the 1,600-word mark. Any argument, conclusion, or example after that point will not be assessed. This is one of the most costly mistakes IB students make — a brilliant conclusion on page 4 may never be read.</li>
        <li><strong>The title page and bibliography are NOT counted:</strong> These do not contribute to your 1,600 words.</li>
        <li><strong>Footnotes and endnotes ARE counted:</strong> If you use footnotes for citations or additional commentary, every word counts toward your total.</li>
        <li><strong>Quotations are counted:</strong> Direct quotes from sources are included in the word count.</li>
        <li><strong>Diagrams, tables, and mathematical notation:</strong> Not typically counted, but avoid using them to circumvent the limit — examiners notice.</li>
      </ul>

      <p>
        There is no official minimum word count, but essays significantly below 1,600 words rarely score well. A 900-word essay simply does not have enough space for the depth of analysis required for a top score. Aim for 1,400–1,600 words.
      </p>

      <h2>Required Format Elements</h2>

      <p>The IBO specifies the following formal requirements for all submitted TOK essays:</p>

      <ul>
        <li><strong>Title page:</strong> Must include your session number (not your name — essays are marked anonymously), the prescribed title you selected (written in full, exactly as published by the IBO), and your school name.</li>
        <li><strong>Word count declaration:</strong> You must declare the word count on the title page. If your declared count differs significantly from the actual count, this can be flagged.</li>
        <li><strong>Readable font and spacing:</strong> While the IBO does not specify an exact font, essays should be readable — 12pt Times New Roman or Arial with double spacing is standard. Single-spaced essays may be returned or penalised.</li>
        <li><strong>Page numbering:</strong> Number your pages. This is not required by the rubric but is expected by examiners and makes it easier if pages become separated.</li>
        <li><strong>No name on the essay body:</strong> Your name must not appear anywhere in the essay itself — only your session number. This protects anonymity during marking.</li>
      </ul>

      <h2>Essay Structure: The Expected Format</h2>

      <p>
        The TOK essay does not have a mandated five-paragraph structure, but there is a standard format that examiners expect. Deviating from it without good reason typically hurts your score.
      </p>

      <h3>Introduction (approximately 150–200 words)</h3>

      <p>Your introduction should:</p>

      <ul>
        <li><strong>Restate the prescribed title in your own words</strong> — show you understand what it is asking</li>
        <li><strong>Define key terms</strong> — especially any terms that are ambiguous or central to your argument (e.g., "knowledge," "certainty," "prove")</li>
        <li><strong>Introduce your thesis</strong> — state your overall position on the prescribed title question</li>
        <li><strong>Outline your two Areas of Knowledge (AOKs)</strong> — briefly indicate which AOKs you will use to develop your argument</li>
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
        <li><strong>Specific example:</strong> A concrete, real-world example that illustrates the claim — not a hypothetical. The example should be described in enough detail that it actually supports the argument.</li>
        <li><strong>Counter-claim:</strong> A genuine challenge to your claim from within the same AOK or from a different perspective (e.g., "However, models in quantum mechanics show that even formally rigorous science involves probabilistic rather than certain knowledge")</li>
        <li><strong>Mini-conclusion:</strong> What does this AOK tell us about the prescribed title question?</li>
      </ol>

      <p>
        Most high-scoring essays use two AOKs, with two to three knowledge claims per AOK. Do not try to cover four or five AOKs — you will have insufficient depth in each.
      </p>

      <h3>Conclusion (approximately 200–250 words)</h3>

      <p>Your conclusion should:</p>

      <ul>
        <li><strong>Answer the prescribed title directly</strong> — do not end with "therefore, this is a complex issue." Take a position.</li>
        <li><strong>Synthesise rather than summarise</strong> — draw together your AOK analysis into a coherent overall claim about knowledge</li>
        <li><strong>Acknowledge limitations or implications</strong> — what remains uncertain, or what does your argument imply about knowledge more broadly?</li>
        <li><strong>Connect to real-world significance</strong> — optional, but a brief statement about why this knowledge question matters often strengthens the conclusion</li>
      </ul>

      <h2>Citations and Referencing Format</h2>

      <p>
        The IBO does not prescribe a specific citation format for the TOK essay. You may use MLA, APA, Chicago, or any other consistent system — your school may have a preference. What matters is:
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
        <li><strong>No title is given to sections:</strong> Unlike the EE, the TOK essay does not use labelled sections (Introduction, Body, Conclusion) — these are implicit</li>
        <li><strong>No table of contents:</strong> At 1,600 words, a table of contents would be absurd and is not expected</li>
        <li><strong>No abstract:</strong> Unlike the EE, there is no abstract or research question box — you begin directly with the essay</li>
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
        <li>Essay is in paragraph form — no bullets or subheadings in the body</li>
        <li>Font is readable and spacing is at least 1.5</li>
        <li>Pages are numbered</li>
      </ul>

      <p>
        The format itself does not earn marks — but violating it costs them. Use IBLens to check that your TOK essay argument is as strong as its presentation.
      </p>

      <p>
        <a href="/essay/tok-essay">Analyse your TOK essay with IBLens →</a>
      </p>
    
  </main>`,
  "/resources/ib-biology-extended-essay": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Biology Extended Essay</nav>
      <p>
        The IB Biology Extended Essay (EE) is a 4,000-word independent research
        project that can earn up to three bonus points toward your Diploma score.
        Biology is a popular EE subject, but most students underestimate how
        different a Biology EE is from a Biology IA. This guide covers what
        examiners reward, which research questions work, and how to score Band A.
      </p>

      <h2>How the Biology EE Differs From the IA</h2>
      <p>
        The Biology IA demonstrates experimental skills across approximately 12 pages.
        The Biology EE is a 4,000-word essay that requires a narrower research question,
        deeper engagement with published literature, and critical evaluation of
        methodology across a much longer piece of writing. The key distinction:
        the EE must address a question whose answer is not already in the textbook,
        while the IA tests whether you can correctly apply the scientific method.
      </p>

      <h2>Choosing a Research Question for Biology EE</h2>
      <p>
        The research question is the most important decision in your Extended Essay.
        A strong Biology EE research question has four characteristics:
      </p>
      <ul>
        <li><strong>Measurable:</strong> You can collect quantitative data, not just observe qualitatively.</li>
        <li><strong>Narrow:</strong> It specifies the organism, the variable, and the condition being tested.</li>
        <li><strong>Not trivially answered by existing literature:</strong> If the answer is in your textbook, it is not an EE question.</li>
        <li><strong>Feasible:</strong> You can run the experiment or access the data with available equipment and time.</li>
      </ul>

      <h3>Examples of Strong Biology EE Research Questions</h3>
      <ul>
        <li>How does soil pH affect the germination rate and root elongation of <em>Phaseolus vulgaris</em> seeds over a 14-day period?</li>
        <li>To what extent does caffeine concentration affect the heart rate of <em>Daphnia magna</em>?</li>
        <li>How does wavelength of light during the vegetative phase affect anthocyanin concentration in <em>Ocimum basilicum</em> leaves?</li>
        <li>What is the relationship between dissolved oxygen levels and macroinvertebrate species diversity in three sections of a local river?</li>
      </ul>

      <h3>Common Research Question Mistakes</h3>
      <p>
        The most frequent error is a question that is too broad. "How does temperature
        affect enzyme activity?" is not an EE question — it is a review article topic.
        "How does temperature (10-50 degrees C, in 10 degree increments) affect the rate of
        starch hydrolysis by salivary amylase, measured by iodine absorbance at 580 nm?"
        is an EE question.
      </p>

      <h2>IB Biology EE Assessment Criteria</h2>
      <p>
        The Biology EE is marked out of 34 across five criteria:
      </p>
      <ul>
        <li><strong>Criterion A - Focus and Method (6 marks):</strong> Is the research question clearly stated? Is the methodology appropriate, detailed, and reproducible?</li>
        <li><strong>Criterion B - Knowledge and Understanding (6 marks):</strong> Does the essay demonstrate understanding of biological concepts beyond the syllabus? Correct use of terminology and peer-reviewed sources.</li>
        <li><strong>Criterion C - Critical Thinking (12 marks):</strong> The highest-weighted criterion. Does your analysis go beyond describing data? Do you evaluate sources, discuss anomalies, and compare findings to published literature?</li>
        <li><strong>Criterion D - Presentation (4 marks):</strong> Structure, layout, citations, correctly labelled figures and tables.</li>
        <li><strong>Criterion E - Engagement (6 marks):</strong> Assessed via the RPPF (three written reflections). Rewards intellectual honesty about challenges and genuine personal investment.</li>
      </ul>
      <p>
        A score of 28/34 or above typically corresponds to Grade A. The most common
        reason students score Grade B instead of A is weak Critical Thinking (Criterion C):
        they summarise results without connecting them to published research or evaluating
        why their findings deviate from what the literature predicts.
      </p>

      <h2>How to Structure a Biology EE</h2>
      <p>Within the 4,000-word limit, Biology EEs that score well share this structure:</p>
      <ul>
        <li><strong>Introduction (400-500 words):</strong> State the research question, provide biological context, cite at least two peer-reviewed sources. End with a clear hypothesis if experimental.</li>
        <li><strong>Background Theory (500-700 words):</strong> Explain the biology relevant to your investigation at a level beyond the IB syllabus. This is where Criterion B marks are won.</li>
        <li><strong>Methodology (400-600 words):</strong> Write a complete, reproducible method. State variables explicitly: independent, dependent, controlled, and uncontrolled. Justify sample size and replication numbers.</li>
        <li><strong>Results and Analysis (700-900 words):</strong> Present data in labelled tables and graphs. Apply appropriate statistical tests with error bars. Identify trends and anomalies.</li>
        <li><strong>Discussion and Evaluation (800-1000 words):</strong> Compare your findings to published literature explicitly. Discuss methodological limitations systematically. Suggest specific improvements.</li>
        <li><strong>Conclusion (200-300 words):</strong> Answer the research question directly. State your confidence in the answer given the limitations identified.</li>
      </ul>

      <h2>Biology EE Topics That Score Well</h2>
      <ul>
        <li><strong>Microbiology and antimicrobial activity:</strong> Testing the effect of plant extracts on bacterial growth using disk diffusion assays. Yields measurable quantitative data and connects to antibiotic resistance literature.</li>
        <li><strong>Ecology and population studies:</strong> Comparing species richness across disturbed and undisturbed habitats using quadrat sampling. Strong for Criterion C because you can compare findings to published biodiversity indices.</li>
        <li><strong>Plant physiology:</strong> Effect of different light spectra on chlorophyll production, stomatal density, or growth rate. Feasible with school equipment and produces clear quantitative results.</li>
        <li><strong>Biochemistry and enzymes:</strong> The classic choice, but only when you go beyond basic kinetics — calculating the Michaelis constant, investigating inhibitors, or comparing enzyme activity across pH and ionic strength.</li>
      </ul>

      <h2>The RPPF: What Examiners Look For</h2>
      <p>
        Criterion E is assessed only through the three RPPF reflections, not through
        the essay itself. Weak entries describe what happened: "I collected my data
        this week and it went well." Strong entries demonstrate intellectual engagement:
        "My initial results showed a negative correlation opposite to what the literature
        predicts. I investigated whether instrument calibration was the cause, found
        a zero-point error of approximately 12%, recalibrated, and re-ran trials 3-5."
        Intellectual honesty about obstacles earns top Criterion E marks.
      </p>

      <h2>Analyse Your Biology EE With IBLens</h2>
      <p>
        IBLens analyses IB extended essays against the official assessment criteria.
        Upload a draft of your Biology EE to receive criterion-by-criterion feedback
        identifying where you are losing marks — especially on Criterion C and the
        focus of your research question in Criterion A.
      </p>
      <p>
        <a href="/analyze">Analyse your Biology EE with IBLens</a>
      </p>
    
  </main>`,
  "/resources/ib-ia-grader": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB IA Grader</nav>
      <h1>IB IA Grader — Free AI Feedback on Your Internal Assessment</h1>

      <p>
        An IB Internal Assessment is worth between 20% and 30% of your final subject grade. Most students submit without knowing whether they are on track for a 6 or a 3 — because getting meaningful feedback before submission is hard. A teacher review is one or two sessions a year. Tutors charge by the hour. Peer feedback misses the nuance of what examiners actually look for.
      </p>

      <p>
        IBLens is an AI-powered IB IA grader that reads your Internal Assessment against the official IB rubric for your subject and gives you a criterion-by-criterion score, the specific marks you are losing, and exactly what to fix. It takes 60 seconds and the first analysis is free.
      </p>

      <p>
        <a href="/essay">Grade My IB IA Free →</a>
      </p>

      <h2>Which IB Subjects Does the Grader Support?</h2>

      <p>IBLens grades Internal Assessments for all major IB subjects, each evaluated against the specific rubric for that subject:</p>

      <ul>
        <li><strong><a href="/essay/biology-ia">IB Biology IA</a></strong> — Science IA rubric: Personal Engagement, Exploration, Analysis, Evaluation, Communication (total 24 marks)</li>
        <li><strong><a href="/essay/chemistry-ia">IB Chemistry IA</a></strong> — Science IA rubric: same five criteria as Biology (24 marks)</li>
        <li><strong><a href="/essay/physics-ia">IB Physics IA</a></strong> — Science IA rubric: same five criteria (24 marks)</li>
        <li><strong><a href="/essay/math-ia">IB Mathematics IA (Exploration)</a></strong> — Math IA rubric: Communication, Mathematical Presentation, Personal Engagement, Reflection, Use of Mathematics (20 marks)</li>
        <li><strong><a href="/essay/economics-ia">IB Economics IA</a></strong> — Per-commentary rubric: Diagrams, Terminology, Application, Analysis, Evaluation (14 marks per commentary)</li>
        <li><strong>IB Business Management IA</strong> — Research Question, Methodology, Analysis, Conclusions, Evaluation, Structure (25 marks)</li>
        <li><strong><a href="/essay/history-ia">IB History IA</a></strong> — Historical Investigation: Identification, Investigation, Reflection, Citation, Presentation (25 marks)</li>
        <li><strong><a href="/essay/psychology-ia">IB Psychology IA</a></strong> — Introduction, Exploration, Analysis, Evaluation, Presentation (22 marks)</li>
        <li><strong>IB Computer Science IA</strong> — Planning, Solution Overview, Development, Functionality, Evaluation (34 marks)</li>
        <li><strong>IB English A IA (Literature / Language & Literature)</strong> — assessed against the subject-specific oral or written commentary rubric</li>
        <li><strong>IB Visual Arts IA, Music IA, Film IA</strong> — assessed against subject-specific criteria</li>
      </ul>

      <p>
        For subjects not listed (Geography, Philosophy, Environmental Systems), the grader provides general IB IA feedback — not subject-specific rubric scoring.
      </p>

      <h2>How the IB IA Grader Works</h2>

      <ol>
        <li><strong>Choose your essay type and subject.</strong> Select "Internal Assessment (IA)" and your IB subject from the dropdown.</li>
        <li><strong>Paste your IA text.</strong> Copy the full text of your Internal Assessment — methodology, analysis, evaluation, everything.</li>
        <li><strong>Enter your research question.</strong> This helps the AI assess whether your investigation stays focused on a specific, answerable question.</li>
        <li><strong>Get your grade report.</strong> Within 60 seconds you receive a criterion-by-criterion score, a predicted grade, the marks you are losing and why, and specific steps to recover them.</li>
      </ol>

      <h2>What You Get in the Grade Report</h2>

      <ul>
        <li><strong>Predicted score and IB band</strong> — how your IA scores overall against the rubric, with the corresponding IB grade (1–7)</li>
        <li><strong>Criterion breakdown</strong> — each criterion scored individually with an explanation of why you received that score</li>
        <li><strong>Risk areas</strong> — the specific parts of your IA that are losing marks and why</li>
        <li><strong>Leverage zones</strong> — criteria where a small improvement would gain the most marks</li>
        <li><strong>Actionable next steps</strong> — concrete changes to make before submission</li>
      </ul>

      <h2>IBLens vs Other IB IA Graders</h2>

      <p>
        Several tools claim to grade IB IAs. Here is how IBLens compares:
      </p>

      <ul>
        <li><strong>vs. RevisionDojo:</strong> RevisionDojo bundles IA grading inside a $19/month subscription that also includes videos and practice papers. IBLens is pay-per-analysis — $4.99 for a single analysis, $19.99 for 5. No subscription required. If you just need feedback on one or two IAs, IBLens is significantly cheaper.</li>
        <li><strong>vs. ChatGPT / Claude directly:</strong> Generic AI models don't know the specific IB rubric for your subject. IBLens is built on the official IBO marking criteria and formats the feedback to match how real IB examiners score work.</li>
        <li><strong>vs. a tutor:</strong> A tutor commonly charges $50–150 per hour and may give you subjective feedback. IBLens applies the rubric mechanically — the same way an examiner does — and identifies specific mark losses by criterion.</li>
      </ul>

      <h2>Is the First IB IA Analysis Really Free?</h2>

      <p>
        Yes. Every new user gets one complete analysis free — no credit card, no account required. You see the full grade report: predicted score, criterion breakdown, risk areas, and next steps. After that, individual analyses are $4.99 or $3.50–$3.99 per analysis in packs.
      </p>

      <h2>How Accurate Is the AI Grade?</h2>

      <p>
        The grader applies the official IB rubric criteria as written in IBO subject guides. It cannot perfectly predict what a human moderator will decide on boundary cases — no tool can. But it is reliable for identifying which criteria are underdeveloped, what the mark range is, and where to focus revision effort. Students consistently report that the AI flags the same issues their teachers later point out.
      </p>

      <p>
        <a href="/essay">Grade My IB IA Free →</a>
      </p>
    
  </main>`,
  "/resources/ib-extended-essay-guide": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Extended Essay Guide</nav>
      <h1>The Complete IB Extended Essay Guide</h1>

      <p>
        The Extended Essay (EE) is one of the three core requirements of the IB Diploma Programme, alongside Theory of Knowledge and CAS. It is a 4,000-word independent research paper that asks students to investigate a topic of personal interest within one of the IB subject areas. For many students, the EE represents their first experience with sustained academic research, and it contributes up to 3 bonus points toward the IB Diploma when combined with the TOK grade.
      </p>

      <p>
        This guide covers everything you need to know about the Extended Essay: from choosing a research question to understanding how examiners apply the assessment criteria. Whether you are just starting your EE journey or revising a final draft, the information below will help you understand what examiners are looking for and how to maximize your score.
      </p>

      <h2>What Is the IB Extended Essay?</h2>

      <p>
        The Extended Essay is a required component for all IB Diploma candidates. It is an in-depth study of a focused topic chosen from one of the student's six DP subjects (or, in some cases, from an interdisciplinary perspective under the World Studies option). The essay must be the result of the student's own research and must demonstrate the ability to formulate an appropriate research question, engage in personal exploration of the topic, communicate ideas effectively, and develop a reasoned argument.
      </p>

      <p>
        The EE is supervised by a teacher at the student's school, but the research and writing must be the student's own work. The IBO allocates approximately 40 hours of work to the Extended Essay, spread across the final two years of the Diploma Programme. Students are expected to meet regularly with their supervisor, who provides guidance on methodology, structure, and academic conventions — but does not edit or rewrite the essay.
      </p>

      <h2>Word Count and Timeline</h2>

      <p>
        The maximum word count for the Extended Essay is <strong>4,000 words</strong>. This limit includes the introduction, body, conclusion, and any quotations. It does <em>not</em> include the abstract (which was removed from the requirements in 2018), table of contents, maps, charts, diagrams, annotated illustrations, tables, equations, formulas, calculations, citations/references, bibliography, or appendices.
      </p>

      <p>
        Going significantly under the word count (below 3,500 words) often indicates insufficient depth of analysis. Going over the limit means the examiner will stop reading at 4,000 words and will not assess any content beyond that point. Aim for 3,800–4,000 words to demonstrate thorough engagement without padding.
      </p>

      <p>
        A typical timeline for the Extended Essay spans 12–18 months:
      </p>

      <ul>
        <li><strong>Months 1–3:</strong> Subject selection, initial research, supervisor assignment, research question formulation</li>
        <li><strong>Months 4–7:</strong> Deep research, data collection, experimentation (for sciences), primary source analysis (for humanities)</li>
        <li><strong>Months 8–10:</strong> First draft writing, supervisor feedback sessions</li>
        <li><strong>Months 11–12:</strong> Revision, final draft, formatting, and submission</li>
      </ul>

      <p>
        Schools set their own internal deadlines, which are typically earlier than the IBO's final submission deadline. Missing internal deadlines can result in loss of supervisor support or, in extreme cases, inability to submit the essay.
      </p>

      <h2>Choosing a Research Question</h2>

      <p>
        The research question (RQ) is arguably the most important element of the Extended Essay. A well-crafted RQ provides focus, determines the scope of research, and guides the entire argument. A poor RQ leads to unfocused essays that struggle to demonstrate analysis.
      </p>

      <p>
        Characteristics of a strong research question:
      </p>

      <ul>
        <li><strong>Specific and focused:</strong> "To what extent did propaganda influence voter turnout in the 1933 German federal election?" is better than "How did propaganda affect Germany?"</li>
        <li><strong>Answerable within 4,000 words:</strong> If the question requires a book-length answer, it is too broad</li>
        <li><strong>Researchable:</strong> Sufficient primary and secondary sources must be available</li>
        <li><strong>Analytical, not descriptive:</strong> Questions beginning with "To what extent," "How far," or "Evaluate" tend to produce better arguments than "What" or "Describe" questions</li>
        <li><strong>Connected to a subject area:</strong> The RQ must clearly fit within one IB subject's methodology and assessment criteria</li>
      </ul>

      <p>
        Common mistakes in research question formulation include choosing a topic that is too broad (resulting in superficial treatment), too narrow (running out of material before 4,000 words), too personal (lacking academic rigor), or too reliant on a single source.
      </p>

      <h2>Structure and Formatting</h2>

      <p>
        While the IBO does not mandate a single structure for all Extended Essays (since structure varies by subject), most successful essays follow this general framework:
      </p>

      <ul>
        <li><strong>Title page:</strong> Research question, subject, word count, candidate information</li>
        <li><strong>Table of contents:</strong> With page numbers</li>
        <li><strong>Introduction (300–400 words):</strong> Context, research question, scope, methodology overview</li>
        <li><strong>Body (3,000–3,200 words):</strong> Organized into logical sections with clear headings, presenting evidence, analysis, and argumentation</li>
        <li><strong>Conclusion (200–300 words):</strong> Direct answer to the RQ, summary of findings, acknowledgment of limitations, suggestions for further research</li>
        <li><strong>Bibliography:</strong> Consistent citation style (MLA, APA, Chicago, or Harvard — pick one and use it throughout)</li>
        <li><strong>Appendices (if needed):</strong> Raw data, interview transcripts, supplementary materials</li>
      </ul>

      <p>
        For science subjects, the structure typically mirrors a lab report: introduction, methodology, results, analysis, conclusion. For humanities and social sciences, a thematic or chronological structure with argumentative sections works best.
      </p>

      <h2>Assessment Criteria (A–E)</h2>

      <p>
        The Extended Essay is assessed against five criteria, totaling 34 marks. The criteria were updated in 2018 and apply uniformly across all subjects:
      </p>

      <table>
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Focus</th>
            <th>Max Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A: Focus and Method</strong></td>
            <td>Topic, research question, methodology</td>
            <td>6</td>
          </tr>
          <tr>
            <td><strong>B: Knowledge and Understanding</strong></td>
            <td>Context, subject-specific terminology, source use</td>
            <td>6</td>
          </tr>
          <tr>
            <td><strong>C: Critical Thinking</strong></td>
            <td>Research, analysis, discussion, evaluation</td>
            <td>12</td>
          </tr>
          <tr>
            <td><strong>D: Presentation</strong></td>
            <td>Structure, layout, formatting</td>
            <td>4</td>
          </tr>
          <tr>
            <td><strong>E: Engagement</strong></td>
            <td>Reflections on planning and progress (RPPF)</td>
            <td>6</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Criterion C (Critical Thinking)</strong> carries the most weight at 12 marks. This is where examiners assess whether you have genuinely analyzed your evidence, considered alternative perspectives, evaluated the reliability of sources, and developed a reasoned argument. Descriptive essays that merely report information without analysis will score poorly here.
      </p>

      <p>
        <strong>Criterion E (Engagement)</strong> is assessed through the Reflections on Planning and Progress Form (RPPF), which consists of three reflections written at different stages of the research process plus a final reflection after the viva voce. This criterion evaluates intellectual engagement, decision-making, and the student's ability to reflect on their learning process.
      </p>

      <h2>Common Mistakes</h2>

      <p>
        Based on examiner reports published by the IBO, the most frequent issues with Extended Essays include:
      </p>

      <ul>
        <li><strong>Descriptive rather than analytical writing:</strong> Reporting what happened or what sources say without evaluating, comparing, or arguing</li>
        <li><strong>Research question too broad:</strong> Attempting to cover too much ground, resulting in superficial treatment</li>
        <li><strong>Over-reliance on secondary sources:</strong> Particularly in history and social science essays where primary sources are expected</li>
        <li><strong>Poor source evaluation:</strong> Citing sources without assessing their reliability, bias, or limitations</li>
        <li><strong>Weak conclusion:</strong> Failing to directly answer the research question or introducing new material in the conclusion</li>
        <li><strong>Inconsistent referencing:</strong> Mixing citation styles or failing to cite all borrowed ideas</li>
        <li><strong>Ignoring the RPPF:</strong> Treating the reflections as an afterthought rather than a genuine record of intellectual engagement</li>
        <li><strong>Exceeding word count:</strong> Including material that will not be read or assessed</li>
      </ul>

      <h2>How to Score an A</h2>

      <p>
        An A grade on the Extended Essay (equivalent to approximately 28–34 marks out of 34) requires excellence across all five criteria. Based on analysis of high-scoring essays and examiner commentary, here are the key characteristics of A-grade Extended Essays:
      </p>

      <p>
        <strong>Clear, focused research question</strong> that is genuinely interesting and allows for in-depth analysis within 4,000 words. The best RQs often emerge from genuine curiosity rather than from trying to find a "safe" topic.
      </p>

      <p>
        <strong>Sophisticated critical thinking</strong> demonstrated through evaluation of evidence, consideration of counter-arguments, acknowledgment of limitations, and nuanced conclusions. A-grade essays rarely present black-and-white answers; they acknowledge complexity.
      </p>

      <p>
        <strong>Effective use of subject-specific methodology:</strong> In sciences, this means rigorous experimental design and statistical analysis. In humanities, it means engagement with historiographical debates or literary theory. In social sciences, it means appropriate research methods and ethical considerations.
      </p>

      <p>
        <strong>Genuine personal engagement</strong> visible in the RPPF reflections and in the essay itself. Examiners can tell when a student is genuinely interested in their topic versus going through the motions.
      </p>

      <p>
        <strong>Professional presentation:</strong> Clear structure, consistent formatting, accurate referencing, and polished academic writing. While presentation only accounts for 4 marks, poor presentation creates a negative impression that can affect how examiners perceive the quality of thinking.
      </p>

      <h2>Final Checklist Before Submission</h2>

      <p>
        Before submitting your Extended Essay, verify the following:
      </p>

      <ul>
        <li>Word count is between 3,800 and 4,000 words (check what is included/excluded)</li>
        <li>Research question is clearly stated on the title page and in the introduction</li>
        <li>Every section of the body directly relates to answering the research question</li>
        <li>Conclusion directly answers the research question with evidence from the body</li>
        <li>All sources are cited consistently using one citation style throughout</li>
        <li>Bibliography is complete and properly formatted</li>
        <li>RPPF contains three substantive reflections plus the viva voce reflection</li>
        <li>Table of contents has accurate page numbers</li>
        <li>Headers and formatting are consistent throughout</li>
        <li>No material in appendices that should be in the main body</li>
        <li>The essay has been proofread for grammar, spelling, and clarity</li>
      </ul>

      <p>
        If you want objective, criterion-based feedback on your Extended Essay before submission, <a href="/essay/extended-essay">IBLens can grade your Extended Essay</a> against the official IB EE criteria — focus &amp; method, knowledge, critical thinking, presentation, and engagement — in under 60 seconds.
      </p>

      <p>
        For more on how IB assessment criteria work across all essay types, see our guide on <a href="/resources/ib-essay-criteria-explained">IB Essay Criteria Explained</a>. If you are working on an IA instead, check our <a href="/resources/ib-internal-assessment-guide">Internal Assessment Guide</a>.
      </p>
    
  </main>`,
  "/resources/ib-internal-assessment-guide": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Internal Assessment Guide</nav>
      <h1>The Complete IB Internal Assessment Guide</h1>

      <p>
        Internal Assessments (IAs) are a core component of every IB Diploma Programme subject. Unlike externally examined papers, IAs are completed during the course, supervised by your teacher, and then externally moderated by IBO examiners. They typically account for 20–25% of your final subject grade, making them one of the most controllable elements of your IB score — you have weeks or months to refine them, unlike a timed exam.
      </p>

      <p>
        This guide explains how IAs work across different subject groups, what examiners look for when applying criteria, the most common mistakes students make, and concrete strategies for achieving top marks. Whether you are writing a History IA, a Biology lab report, or a Mathematics exploration, the principles of strong IA work are consistent.
      </p>

      <h2>What Is the Internal Assessment?</h2>

      <p>
        The Internal Assessment is a piece of coursework completed under teacher supervision that demonstrates your ability to apply subject knowledge independently. The format varies significantly by subject:
      </p>

      <ul>
        <li><strong>Group 1 (Language & Literature):</strong> Individual Oral (IO) — a recorded oral commentary and discussion</li>
        <li><strong>Group 2 (Language Acquisition):</strong> Individual Oral — a recorded oral assessment based on literary/non-literary works</li>
        <li><strong>Group 3 (Individuals & Societies):</strong> Written investigation (History: 2,200 words; Economics: 800 words per commentary × 3; Psychology: experimental study report)</li>
        <li><strong>Group 4 (Sciences):</strong> Scientific investigation report (Biology, Chemistry, Physics: 6–12 pages)</li>
        <li><strong>Group 5 (Mathematics):</strong> Mathematical Exploration (12–20 pages)</li>
        <li><strong>Group 6 (The Arts):</strong> Varies by subject (Visual Arts: comparative study; Music: creating/performing)</li>
      </ul>

      <p>
        Despite these format differences, all IAs share common expectations: independent work, engagement with subject methodology, clear communication, and demonstration of understanding beyond what is covered in class.
      </p>

      <h2>How IAs Differ by Subject Group</h2>

      <p>
        Understanding the specific expectations for your subject is critical. Here is a deeper look at what distinguishes IAs across the major subject groups:
      </p>

      <h3>Sciences (Group 4)</h3>

      <p>
        Science IAs require you to design and conduct an original experiment (or simulation/modeling in some cases). The emphasis is on the <strong>scientific method</strong>: formulating a testable hypothesis, controlling variables, collecting sufficient data, processing results with appropriate statistical tools, and evaluating the methodology. Examiners want to see that you understand why you made each methodological choice, not just what you did. A common misconception is that complex experiments score higher — in reality, a simple experiment executed with rigorous methodology and thoughtful evaluation often outscores an ambitious experiment with poor controls.
      </p>

      <h3>History (Group 3)</h3>

      <p>
        The History IA is a 2,200-word investigation into a historical question. It requires you to identify and evaluate sources (Section 1), investigate the topic using evidence (Section 2), and reflect on the methods used by historians (Section 3). The key differentiator for top marks is <strong>genuine engagement with historiography</strong> — showing that you understand how different historians have interpreted the same events and why their interpretations differ based on methodology, perspective, or available evidence.
      </p>

      <h3>Mathematics (Group 5)</h3>

      <p>
        The Mathematics Exploration is unique in that it asks you to explore a mathematical topic of personal interest. There is no fixed structure, but examiners look for <strong>personal engagement</strong> with the mathematics, use of appropriate notation and terminology, and mathematical thinking that goes beyond mere calculation. The best explorations connect mathematics to a real-world context that genuinely interests the student, then demonstrate sophisticated mathematical reasoning within that context.
      </p>

      <h3>Economics (Group 3)</h3>

      <p>
        Economics requires three commentaries of 800 words each, based on published news articles. Each commentary must apply economic theory to explain a real-world event, use appropriate diagrams, and evaluate the economic implications. The challenge is demonstrating <strong>depth of analysis within a tight word limit</strong> — every sentence must contribute to the argument. Examiners penalize commentaries that merely describe the article without applying economic models.
      </p>

      <h2>Assessment Criteria Explained</h2>

      <p>
        While specific criteria vary by subject, most IAs are assessed against 4–5 criteria that evaluate similar competencies:
      </p>

      <table>
        <thead>
          <tr>
            <th>Competency</th>
            <th>What Examiners Look For</th>
            <th>Common Weakness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Research Question / Focus</strong></td>
            <td>Clear, specific, answerable question appropriate to the subject</td>
            <td>Too broad, too vague, or not genuinely investigable</td>
          </tr>
          <tr>
            <td><strong>Methodology / Investigation</strong></td>
            <td>Appropriate methods, sufficient data/evidence, controlled variables</td>
            <td>Insufficient data, poor controls, unexplained choices</td>
          </tr>
          <tr>
            <td><strong>Knowledge & Understanding</strong></td>
            <td>Accurate use of subject terminology, concepts, and theories</td>
            <td>Superficial understanding, incorrect terminology</td>
          </tr>
          <tr>
            <td><strong>Analysis & Evaluation</strong></td>
            <td>Critical thinking, interpretation of results, acknowledgment of limitations</td>
            <td>Descriptive rather than analytical, ignoring anomalies</td>
          </tr>
          <tr>
            <td><strong>Communication</strong></td>
            <td>Clear structure, appropriate format, academic conventions</td>
            <td>Poor organization, missing citations, exceeding word/page limits</td>
          </tr>
        </tbody>
      </table>

      <p>
        The most heavily weighted criterion in nearly every subject is <strong>Analysis and Evaluation</strong>. This is where the difference between a 5 and a 7 is determined. Students who merely describe their findings without interpreting them, evaluating their significance, or acknowledging limitations will consistently score in the middle bands regardless of how well they perform on other criteria.
      </p>

      <h2>Common Pitfalls Per Criterion</h2>

      <p>
        Based on published examiner reports and moderation feedback, here are the most frequent issues that cost students marks:
      </p>

      <p>
        <strong>Research Question:</strong> Students often choose questions that are either too broad ("How does temperature affect enzyme activity?") or too narrow ("Does the pH of my school's water fountain change between 8am and 9am on Tuesdays?"). The sweet spot is a question that allows for genuine investigation within the constraints of your resources and time.
      </p>

      <p>
        <strong>Methodology:</strong> In sciences, the most common issue is insufficient repetition (fewer than 5 trials per condition) and failure to identify and control key variables. In humanities, it is over-reliance on a single source type or failure to evaluate source reliability.
      </p>

      <p>
        <strong>Analysis:</strong> The single biggest pitfall is <strong>describing rather than analyzing</strong>. Stating "the graph shows an upward trend" is description. Explaining why the trend occurs, whether it matches theoretical predictions, what anomalies suggest, and what the limitations of the data are — that is analysis.
      </p>

      <p>
        <strong>Evaluation:</strong> Many students treat the evaluation section as a place to list "errors" (e.g., "human error" or "the timer was inaccurate"). Examiners want to see <strong>specific, realistic limitations</strong> that actually affected results, along with concrete suggestions for how the investigation could be improved if repeated.
      </p>

      <h2>How Examiners Actually Mark</h2>

      <p>
        Understanding the marking process helps you write for your audience. Here is how IA assessment typically works:
      </p>

      <p>
        Your teacher marks your IA first, applying the subject-specific criteria and assigning a mark out of the maximum (typically 20–30 marks depending on the subject). Your teacher's marks are then submitted to the IBO along with a sample of student work from your school.
      </p>

      <p>
        An external moderator (an experienced examiner appointed by the IBO) reviews the sample to check whether your teacher's marking is consistent with the global standard. If the moderator finds that your teacher has been too generous or too harsh, they adjust the marks for the entire cohort up or down. This means your final IA mark may differ from what your teacher awarded.
      </p>

      <p>
        Key implications for students:
      </p>

      <ul>
        <li>Your IA must be self-explanatory — the moderator has never met you and cannot ask clarifying questions</li>
        <li>Clarity of communication matters enormously; if the moderator cannot follow your argument, they cannot award marks for it</li>
        <li>Following the prescribed structure and format for your subject makes it easier for moderators to find evidence of each criterion</li>
        <li>Your teacher's feedback is valuable but not final — aim to exceed the criteria rather than just meeting your teacher's expectations</li>
      </ul>

      <h2>Time Management for IA</h2>

      <p>
        Most IAs require 10–20 hours of focused work spread across several weeks or months. The biggest time management mistake is leaving the IA until the last few weeks before the deadline. This leads to rushed methodology, insufficient data collection, and superficial analysis.
      </p>

      <p>
        A recommended timeline for a science IA (adaptable to other subjects):
      </p>

      <ul>
        <li><strong>Weeks 1–2:</strong> Topic exploration, background research, research question formulation</li>
        <li><strong>Weeks 3–4:</strong> Methodology design, preliminary trials, variable identification</li>
        <li><strong>Weeks 5–7:</strong> Data collection (with sufficient repetitions and controlled conditions)</li>
        <li><strong>Weeks 8–9:</strong> Data processing, graph creation, statistical analysis</li>
        <li><strong>Weeks 10–11:</strong> Writing the report (introduction, methodology, results, analysis, evaluation, conclusion)</li>
        <li><strong>Week 12:</strong> Revision, proofreading, formatting, teacher review</li>
      </ul>

      <p>
        Starting early also gives you time to redo experiments if initial results are inconclusive, or to pivot your approach if your original methodology proves unworkable.
      </p>

      <h2>Editing and Revision Strategy</h2>

      <p>
        The difference between a good IA and an excellent one often comes down to revision. Here is a structured approach to editing your IA:
      </p>

      <p>
        <strong>First pass: Structure and argument.</strong> Read your IA from start to finish and ask: Does every section contribute to answering the research question? Is there a logical flow from introduction to conclusion? Are there any gaps in the argument?
      </p>

      <p>
        <strong>Second pass: Criteria alignment.</strong> Go through each criterion for your subject and highlight where in your IA you have addressed each one. If you cannot find clear evidence for a criterion, you need to add content. This is where tools like <a href="/essay">IBLens</a> can help — by analyzing your IA against the specific criteria for your subject, you can identify which areas need strengthening before submission.
      </p>

      <p>
        <strong>Third pass: Academic conventions.</strong> Check citations, formatting, terminology, and word/page count. Ensure all graphs have titles, axes labels, and units. Verify that your bibliography is complete and consistently formatted.
      </p>

      <p>
        <strong>Fourth pass: Clarity and concision.</strong> Remove redundant sentences, replace vague language with specific terminology, and ensure every paragraph has a clear purpose. In subjects with tight word limits (like Economics commentaries), every word must earn its place.
      </p>

      <p>
        For a deeper understanding of how criterion-based marking works across all IB essay types, see our <a href="/resources/ib-essay-criteria-explained">IB Essay Criteria Explained</a> guide. If you are working on your Extended Essay alongside your IA, our <a href="/resources/ib-extended-essay-guide">Extended Essay Guide</a> covers the specific requirements for that component. For understanding how your IA mark contributes to your overall IB score, check our <a href="/resources/ib-grade-boundaries">IB Grade Boundaries</a> explainer.
      </p>

      <p>
        Get instant AI feedback on your IA: <a href="/essay/biology-ia">Biology IA</a>, <a href="/essay/chemistry-ia">Chemistry IA</a>, <a href="/essay/physics-ia">Physics IA</a>, <a href="/essay/economics-ia">Economics IA</a>, <a href="/essay/history-ia">History IA</a>, <a href="/essay/business-management-ia">Business Management IA</a>, <a href="/essay/math-ia">Mathematics IA</a>, or <a href="/essay/psychology-ia">Psychology IA</a> — each graded against the official IB rubric in 60 seconds.
      </p>
    
  </main>`,
  "/resources/tok-essay-guide": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB TOK Essay Guide</nav>
      <h1>The Complete IB TOK Essay Guide</h1>

      <p>
        The Theory of Knowledge (TOK) essay is one of the most distinctive and challenging components of the IB Diploma Programme. Unlike subject-specific essays that test your knowledge of content, the TOK essay asks you to reflect on the nature of knowledge itself — how we know what we claim to know, what counts as evidence, and how different ways of knowing interact with different areas of knowledge.
      </p>

      <p>
        The TOK essay is 1,600 words maximum and must respond to one of six prescribed titles released by the IBO for each examination session. Combined with the TOK Exhibition, it contributes up to 3 bonus points to your IB Diploma (through the EE/TOK matrix). This guide explains what TOK is actually testing, how to structure your essay, and the most common mistakes that cost students marks.
      </p>

      <h2>What TOK Is Testing</h2>

      <p>
        TOK is not testing your knowledge of any particular subject. It is testing your ability to think critically about knowledge itself. Specifically, the TOK essay assesses whether you can:
      </p>

      <ul>
        <li><strong>Identify and analyze knowledge questions:</strong> Questions about the nature, scope, and limitations of knowledge (e.g., "How do we distinguish between correlation and causation?")</li>
        <li><strong>Develop knowledge claims and counter-claims:</strong> Make assertions about knowledge and then challenge them with alternative perspectives</li>
        <li><strong>Use specific, concrete examples:</strong> Illustrate abstract arguments with real-world cases from different areas of knowledge</li>
        <li><strong>Evaluate perspectives:</strong> Assess the strengths and limitations of different approaches to knowledge without simply declaring one "right"</li>
        <li><strong>Demonstrate personal engagement:</strong> Show that you have genuinely thought about these questions rather than reproducing textbook answers</li>
      </ul>

      <p>
        The most common misconception about TOK is that it is about expressing opinions. It is not. TOK requires <strong>reasoned argumentation</strong> — claims must be supported with evidence and reasoning, and counter-claims must be genuinely engaged with rather than dismissed.
      </p>

      <h2>The Prescribed Titles Structure</h2>

      <p>
        Each examination session, the IBO releases six prescribed titles. These are carefully crafted questions that invite exploration of knowledge issues across multiple areas of knowledge (AOKs). You must choose one title and respond to it directly — you cannot modify the title or create your own question.
      </p>

      <p>
        Prescribed titles typically take one of these forms:
      </p>

      <ul>
        <li><strong>Comparative:</strong> "To what extent do the methods of the natural sciences differ from those of the human sciences?"</li>
        <li><strong>Evaluative:</strong> "Is it possible to have knowledge that is free from cultural bias?"</li>
        <li><strong>Exploratory:</strong> "What role does imagination play in the production of knowledge?"</li>
        <li><strong>Provocative/Quotation-based:</strong> "'Statistics conceal as much as they reveal.' Discuss with reference to two areas of knowledge."</li>
      </ul>

      <p>
        When choosing your title, consider: Which title genuinely interests you? Which title can you find strong, specific examples for? Which title connects to areas of knowledge where you have personal experience or deep understanding? The best TOK essays come from genuine intellectual curiosity, not from choosing the title that seems "easiest."
      </p>

      <h2>Building Knowledge Claims and Counter-Claims</h2>

      <p>
        The backbone of a TOK essay is the claim/counter-claim structure. A <strong>knowledge claim</strong> is an assertion about knowledge — for example, "Mathematical knowledge is more certain than historical knowledge because it is based on logical proof rather than interpretation of evidence."
      </p>

      <p>
        A <strong>counter-claim</strong> challenges or qualifies the initial claim — for example, "However, the certainty of mathematical knowledge depends on accepting axioms that cannot themselves be proven, suggesting that mathematics also rests on assumptions."
      </p>

      <p>
        Strong TOK essays typically develop 2–3 main claims, each with a corresponding counter-claim. For each claim/counter-claim pair:
      </p>

      <ul>
        <li>State the claim clearly and explain the reasoning behind it</li>
        <li>Provide a specific, concrete example that illustrates the claim (from a particular AOK)</li>
        <li>Present the counter-claim and explain why it challenges the original claim</li>
        <li>Provide a specific example for the counter-claim (ideally from a different AOK)</li>
        <li>Evaluate: which perspective is more convincing, and under what circumstances?</li>
      </ul>

      <p>
        The evaluation step is crucial. Weak essays present claims and counter-claims but never resolve the tension between them. Strong essays show <strong>nuanced judgment</strong> — perhaps the claim holds in one context but not another, or perhaps the truth lies in a synthesis of both perspectives.
      </p>

      <h2>Areas of Knowledge and Ways of Knowing</h2>

      <p>
        The TOK framework organizes knowledge into <strong>Areas of Knowledge (AOKs)</strong> — broad disciplines that produce knowledge using characteristic methods:
      </p>

      <ul>
        <li>Mathematics</li>
        <li>Natural Sciences</li>
        <li>Human Sciences</li>
        <li>History</li>
        <li>The Arts</li>
        <li>Ethics (added in the 2022 curriculum revision)</li>
      </ul>

      <p>
        <strong>Ways of Knowing (WOKs)</strong> are the tools or faculties through which we acquire knowledge: reason, sense perception, language, emotion, imagination, faith, intuition, and memory. While the 2022 curriculum de-emphasized the formal WOK framework, these concepts remain useful for analyzing how knowledge is produced and justified.
      </p>

      <p>
        Most prescribed titles require you to draw examples from at least two different AOKs. The strongest essays show how the same knowledge question plays out differently across AOKs — for example, how "evidence" means something different in natural science (empirical data) versus history (primary sources) versus mathematics (logical proof).
      </p>

      <h2>Assessment Criteria</h2>

      <p>
        The TOK essay is assessed against a single holistic criterion with descriptors at different levels. The key dimensions examiners evaluate are:
      </p>

      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>What Top-Scoring Essays Do</th>
            <th>What Low-Scoring Essays Do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Understanding of knowledge questions</strong></td>
            <td>Identify and explore nuanced knowledge questions embedded in the title</td>
            <td>Treat the title as a factual question rather than a knowledge question</td>
          </tr>
          <tr>
            <td><strong>Quality of analysis</strong></td>
            <td>Develop claims and counter-claims with clear reasoning and evaluation</td>
            <td>Make assertions without supporting reasoning or counter-arguments</td>
          </tr>
          <tr>
            <td><strong>Examples</strong></td>
            <td>Use specific, varied examples that genuinely illuminate the argument</td>
            <td>Use vague or generic examples, or examples that don't connect to the argument</td>
          </tr>
          <tr>
            <td><strong>Connections across AOKs</strong></td>
            <td>Show how knowledge questions manifest differently across disciplines</td>
            <td>Treat AOKs in isolation without drawing connections</td>
          </tr>
          <tr>
            <td><strong>Personal engagement</strong></td>
            <td>Demonstrate genuine thinking and original perspective</td>
            <td>Reproduce generic arguments found in TOK textbooks</td>
          </tr>
        </tbody>
      </table>

      <p>
        The essay is marked out of 10, with the following approximate boundaries: 9–10 = Excellent (A), 7–8 = Good (B), 5–6 = Satisfactory (C), 3–4 = Mediocre (D), 0–2 = Elementary (E).
      </p>

      <h2>Worked Example: Strong vs. Weak Argumentation</h2>

      <p>
        Consider the prescribed title: "Is certainty achievable in any area of knowledge?"
      </p>

      <p>
        <strong>Weak approach:</strong> "Yes, certainty is achievable in mathematics because 2+2=4 is always true. No, certainty is not achievable in history because we cannot go back in time." This is superficial — it makes obvious claims without analysis and uses trivial examples.
      </p>

      <p>
        <strong>Strong approach:</strong> "Mathematical certainty appears absolute within formal systems — the Pythagorean theorem, for instance, has been proven with logical necessity. However, Gödel's incompleteness theorems demonstrate that any sufficiently complex formal system contains statements that are true but unprovable within that system, suggesting that even mathematical certainty has boundaries. In contrast, historical knowledge operates through inference from evidence rather than proof. The historian's claim that 'the Treaty of Versailles contributed to World War II' cannot be proven with mathematical certainty, yet the weight of evidence makes it a highly justified belief. This suggests that certainty exists on a spectrum rather than as a binary — and that the appropriate standard of certainty varies by area of knowledge."
      </p>

      <p>
        The strong approach demonstrates genuine analysis, uses specific examples (Gödel, Treaty of Versailles), acknowledges nuance, and arrives at a substantive insight about the nature of certainty.
      </p>

      <h2>Common Errors</h2>

      <p>
        Based on examiner reports, the most frequent issues with TOK essays include:
      </p>

      <ul>
        <li><strong>Not answering the prescribed title:</strong> Writing about a related topic rather than directly addressing the specific question asked</li>
        <li><strong>Treating TOK as a subject essay:</strong> Writing about the content of a subject (e.g., explaining how photosynthesis works) rather than about knowledge questions related to that subject</li>
        <li><strong>Generic examples:</strong> Using "2+2=4" as the only example of mathematical knowledge, or "the Holocaust" as the only example of historical knowledge. Examiners have read these thousands of times</li>
        <li><strong>False balance:</strong> Presenting claim and counter-claim as equally valid without evaluation, ending with "it depends on the person" rather than a reasoned conclusion</li>
        <li><strong>Excessive use of WOK/AOK jargon:</strong> Forcing every sentence through the WOK/AOK framework rather than using these concepts naturally where they illuminate the argument</li>
        <li><strong>Exceeding word count:</strong> The 1,600-word limit is strict. Examiners stop reading at the limit</li>
        <li><strong>No personal voice:</strong> Essays that read like they were assembled from TOK textbook passages rather than reflecting genuine personal thinking</li>
      </ul>

      <p>
        If you want to test whether your TOK essay effectively addresses the prescribed title and develops strong argumentation, <a href="/essay/tok-essay">IBLens can provide criterion-based feedback on your TOK essay</a> — scored against the official IB TOK rubric in 60 seconds. For understanding how the TOK grade combines with your Extended Essay grade to contribute bonus points, see our <a href="/resources/ib-grade-boundaries">IB Grade Boundaries</a> guide. For a broader look at how IB criteria work across essay types, read our <a href="/resources/ib-essay-criteria-explained">IB Essay Criteria Explained</a> article.
      </p>
    
  </main>`,
  "/resources/ib-essay-criteria-explained": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Essay Criteria Explained</nav>
      <h1>IB Essay Criteria Explained</h1>

      <p>
        One of the most distinctive features of the IB Diploma Programme is its use of <strong>criterion-based assessment</strong>. Unlike norm-referenced systems (where your grade depends on how you perform relative to other students), the IB assesses each piece of work against fixed criteria with defined descriptors. This means that in theory, every student in a cohort could achieve a 7 — or every student could receive a 3 — depending on how well their work meets the criteria.
      </p>

      <p>
        Understanding how criterion-based marking works is one of the most powerful things you can do to improve your IB grades. When you know exactly what examiners are looking for at each level, you can write strategically to demonstrate those qualities. This guide explains the system, shows you what distinguishes different performance levels, and gives you tools for self-assessment.
      </p>

      <h2>Why Criterion-Based Marking Exists</h2>

      <p>
        The IBO uses criterion-based assessment for several reasons:
      </p>

      <p>
        <strong>Consistency across contexts:</strong> IB students study in over 150 countries with different educational traditions. Criterion-based marking ensures that a 7 in History means the same thing whether the student is in Singapore, Germany, or Brazil. Examiners worldwide apply the same criteria to the same standard.
      </p>

      <p>
        <strong>Transparency:</strong> Students can read the criteria before they begin their work and understand exactly what is expected. There are no hidden requirements or subjective preferences — the criteria are published and available to all students.
      </p>

      <p>
        <strong>Developmental feedback:</strong> Because criteria describe specific competencies at different levels, teachers can give targeted feedback: "Your analysis is at band 3–4; to reach band 5–6, you need to evaluate the reliability of your sources rather than just citing them."
      </p>

      <p>
        <strong>Fairness:</strong> Criterion-based marking reduces (though does not eliminate) the impact of examiner subjectivity. When examiners disagree, they can point to specific descriptors and discuss which level the work best matches.
      </p>

      <h2>Common Criteria Across Subjects</h2>

      <p>
        While each IB subject has its own specific criteria, certain competencies appear across nearly all subjects. Understanding these common threads helps you develop transferable skills:
      </p>

      <h3>Knowledge and Understanding</h3>
      <p>
        Every IB subject assesses whether you understand the relevant content, concepts, and terminology. At lower levels, this means accurate recall and basic application. At higher levels, it means demonstrating <strong>deep, nuanced understanding</strong> — seeing connections between concepts, understanding why something works (not just that it works), and using terminology precisely rather than loosely.
      </p>

      <h3>Application and Analysis</h3>
      <p>
        This criterion assesses whether you can apply your knowledge to specific situations and break down complex problems into components. In sciences, this might mean applying a theory to explain experimental results. In humanities, it might mean analyzing a primary source by considering its context, purpose, and limitations. The key distinction: <strong>description tells what; analysis tells why and how</strong>.
      </p>

      <h3>Synthesis and Evaluation</h3>
      <p>
        The highest-order thinking skill assessed in the IB. Synthesis means combining ideas from different sources or perspectives to create new understanding. Evaluation means making reasoned judgments about the value, reliability, or significance of evidence, arguments, or methods. This is consistently the criterion that separates good work (band 4–5) from excellent work (band 6–7).
      </p>

      <h3>Communication and Presentation</h3>
      <p>
        Assessed in every subject: can you communicate your ideas clearly, using appropriate structure, conventions, and academic language? This includes proper citation, logical organization, correct use of subject-specific formats (lab reports, essays, commentaries), and writing that is precise rather than vague.
      </p>

      <h2>How Examiners Apply Criteria in Practice</h2>

      <p>
        Understanding the mechanics of marking helps you write for your audience. Here is how the process typically works:
      </p>

      <p>
        <strong>Best-fit approach:</strong> Examiners do not mark individual sentences or paragraphs. Instead, they read the entire piece of work and then determine which band descriptor best fits the overall quality for each criterion. This means that a few weak paragraphs will not necessarily drag down your mark if the overall quality is strong — but it also means that one brilliant paragraph cannot compensate for generally weak work.
      </p>

      <p>
        <strong>Positive marking:</strong> IB examiners are trained to look for evidence of achievement rather than counting errors. They ask "What has this student demonstrated?" rather than "What mistakes did they make?" This is why it is important to <strong>show your thinking</strong> — even if your conclusion is slightly off, demonstrating strong analytical reasoning will earn marks.
      </p>

      <p>
        <strong>Holistic reading:</strong> Examiners read the entire response before assigning marks. They do not allocate marks paragraph by paragraph. This means your essay needs to work as a coherent whole — a strong introduction that sets up the argument, a body that develops it logically, and a conclusion that synthesizes the findings.
      </p>

      <p>
        <strong>Standardization:</strong> Before marking begins, examiners attend standardization meetings where they mark sample scripts and discuss how to apply the criteria consistently. This ensures that different examiners marking the same script would arrive at similar marks (within 1–2 marks of each other in most cases).
      </p>

      <h2>The Difference Between Band 5 and Band 7</h2>

      <p>
        Many students find it relatively straightforward to reach band 4–5 (a solid "good" performance) but struggle to break into band 6–7 (excellent/outstanding). Here is what typically distinguishes these levels:
      </p>

      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Band 4–5 (Good)</th>
            <th>Band 6–7 (Excellent)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Argument</strong></td>
            <td>Clear argument with supporting evidence</td>
            <td>Nuanced argument that acknowledges complexity, counter-arguments, and limitations</td>
          </tr>
          <tr>
            <td><strong>Evidence use</strong></td>
            <td>Relevant evidence cited to support claims</td>
            <td>Evidence critically evaluated for reliability, bias, and significance</td>
          </tr>
          <tr>
            <td><strong>Analysis depth</strong></td>
            <td>Explains what happened and why</td>
            <td>Explains significance, implications, connections to broader patterns</td>
          </tr>
          <tr>
            <td><strong>Terminology</strong></td>
            <td>Correct use of key terms</td>
            <td>Precise, sophisticated use of terminology that demonstrates deep understanding</td>
          </tr>
          <tr>
            <td><strong>Structure</strong></td>
            <td>Logical organization with clear paragraphs</td>
            <td>Sophisticated structure where each section builds on the previous one toward a compelling conclusion</td>
          </tr>
          <tr>
            <td><strong>Conclusion</strong></td>
            <td>Summarizes main points</td>
            <td>Synthesizes findings into new insight, acknowledges limitations, suggests implications</td>
          </tr>
        </tbody>
      </table>

      <p>
        The fundamental difference is <strong>depth of thinking</strong>. Band 5 work shows competence — the student understands the material and can apply it. Band 7 work shows <strong>intellectual sophistication</strong> — the student can evaluate, synthesize, and generate original insight.
      </p>

      <h2>Self-Assessment Using Criteria</h2>

      <p>
        One of the most effective study strategies is to assess your own work against the published criteria before submitting it. Here is a practical approach:
      </p>

      <p>
        <strong>Step 1: Obtain the criteria.</strong> Every IB subject guide contains the assessment criteria for each component. Your teacher should have shared these with you. If not, ask — you have a right to see exactly how your work will be assessed.
      </p>

      <p>
        <strong>Step 2: Read the top band descriptors.</strong> For each criterion, read the descriptor for the highest band (typically band 5–6 or band 7–8 depending on the scale). This tells you what "excellent" looks like for that criterion.
      </p>

      <p>
        <strong>Step 3: Highlight evidence in your work.</strong> Go through your essay or IA and highlight where you have demonstrated each criterion. If you cannot find clear evidence of a criterion, that is a gap you need to fill.
      </p>

      <p>
        <strong>Step 4: Compare to band descriptors.</strong> For each criterion, honestly assess which band your work currently sits in. The gap between your current band and the top band tells you exactly what you need to improve.
      </p>

      <p>
        <strong>Step 5: Targeted revision.</strong> Focus your revision effort on the criteria where you have the largest gap between current performance and target. There is no point polishing your communication (Criterion D) if your analysis (Criterion C) is still at band 3.
      </p>

      <h2>How AI Feedback Maps to Criteria</h2>

      <p>
        Tools like <a href="/essay">IBLens</a> are designed to replicate this criterion-based assessment process. When you upload an essay, the AI evaluates your work against the specific criteria for your subject and essay type, providing:
      </p>

      <ul>
        <li><strong>Per-criterion scores:</strong> A predicted mark for each criterion, showing where you are strong and where you need improvement</li>
        <li><strong>Band-level feedback:</strong> Explanation of which band your work currently matches and what would be needed to reach the next band</li>
        <li><strong>Specific evidence:</strong> Pointing to particular sections of your essay that demonstrate (or fail to demonstrate) each criterion</li>
        <li><strong>Actionable suggestions:</strong> Concrete steps you can take to improve your score on each criterion</li>
      </ul>

      <p>
        This is particularly valuable because self-assessment is inherently limited — it is difficult to objectively evaluate your own work, especially when you have been immersed in it for weeks. An external perspective (whether from a teacher, peer, or AI tool) can identify blind spots that you cannot see yourself.
      </p>

      <p>
        The key advantage of criterion-based AI feedback over general writing feedback is specificity. Generic feedback like "your essay needs more analysis" is unhelpful because it does not tell you <em>which</em> criterion is weak, <em>where</em> in the essay the analysis is lacking, or <em>what</em> analysis at the next band level looks like. Criterion-mapped feedback addresses all three.
      </p>

      <h2>Practical Tips for Criterion-Based Writing</h2>

      <p>
        Based on examiner reports and common patterns in high-scoring work:
      </p>

      <ul>
        <li><strong>Address every criterion explicitly.</strong> If a criterion asks for "evaluation of sources," make sure there is a visible section or paragraph where you evaluate sources. Do not assume the examiner will infer it.</li>
        <li><strong>Use criterion language in your writing.</strong> If the criterion mentions "critical analysis," use phrases like "This evidence suggests..." or "A critical examination reveals..." to signal to the examiner that you are doing what the criterion asks.</li>
        <li><strong>Front-load your strongest work.</strong> Examiners form impressions early. If your introduction demonstrates sophisticated thinking, the examiner approaches the rest of your essay with a positive expectation.</li>
        <li><strong>Do not sacrifice one criterion for another.</strong> A beautifully written essay (high communication marks) that lacks analysis will not score well overall. Balance your effort across all criteria.</li>
        <li><strong>Check word/page limits.</strong> Exceeding limits means the examiner stops reading. Everything beyond the limit is invisible to the assessment.</li>
      </ul>

      <p>
        For subject-specific guidance on how criteria apply to different essay types, see our guides on the <a href="/resources/ib-extended-essay-guide">Extended Essay</a>, <a href="/resources/ib-internal-assessment-guide">Internal Assessment</a>, and <a href="/resources/tok-essay-guide">TOK Essay</a>. To understand how criterion scores translate into final grades, read our <a href="/resources/ib-grade-boundaries">IB Grade Boundaries</a> explainer.
      </p>
    
  </main>`,
  "/resources/ib-extended-essay-word-count": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Extended Essay Word Count</nav>
      <p>
        The IB Extended Essay has a maximum word count of 4000 words. This is one of
        the most misunderstood rules in the entire IB programme — students frequently
        ask whether footnotes count, whether the bibliography counts, and what happens if they go over by fifty words. This guide
        answers all of those questions and explains the strategy behind hitting the
        word count effectively.
      </p>

      <h2>What Counts Toward the 4000-Word Limit</h2>
      <p>
        According to the IB's official Extended Essay guide, the word count includes:
      </p>
      <ul>
        <li>The introduction</li>
        <li>The body of the essay (all sections)</li>
        <li>The conclusion</li>
        <li>Quotations embedded in the text</li>
        <li>Substantive footnote commentary (referencing itself is excluded)</li>
      </ul>

      <h2>What Does NOT Count Toward the 4000-Word Limit</h2>
      <p>
        The following are explicitly excluded from the word count:
      </p>
      <ul>
        <li><strong>The title page</strong></li>
        <li><strong>The contents page / table of contents</strong></li>
        <li><strong></li>
        <li><strong>Acknowledgements</strong></li>
        <li><strong>The bibliography / references list</strong></li>
        <li><strong>Footnotes and endnotes</strong> (if used purely for citations)</li>
        <li><strong>Captions for figures, tables, and diagrams</strong></li>
        <li><strong>Headers and subheadings</strong></li>
        <li><strong>Appendices</strong></li>
      </ul>
      <p>
        Note: if you put substantive analysis in footnotes rather than the body of
        the essay, examiners are instructed to ignore that analysis when marking.
        Footnotes are for citations and minor clarifications, not for content that
        should be in the main text.
      </p>

      <h2>What Happens If You Go Over 4000 Words</h2>
      <p>
        Examiners are instructed to stop reading at 4000 words. Any content beyond the
        limit is not assessed. This means that if your conclusion starts at word 3950
        and your most critical evaluation point appears at word 4050, that point does
        not exist as far as your mark is concerned.
      </p>
      <p>
        Going over the word count does not result in an automatic penalty beyond this —
        there is no "minus 5 marks for exceeding the limit." The penalty is subtler and
        worse: your work is simply cut off. If you write 4500 words, the last 500 are
        invisible to the examiner.
      </p>
      <p>
        This is why submitting an essay that is significantly over the word count is a
        strategic error, not just a rule violation. Every student who goes over the limit
        is effectively submitting an unfinished essay.
      </p>

      <h2>How Close to 4000 Words Should You Aim?</h2>
      <p>
        The IB does not set a minimum word count for the Extended Essay. However, the
        4000-word limit exists because that is the length considered sufficient to
        develop a sustained argument to the required depth. In practice:
      </p>
      <ul>
        <li><strong>Under 3000 words:</strong> Almost always indicates insufficient depth of argument or analysis. Scores on Criterion B (Knowledge and Understanding) and Criterion C (Critical Thinking) will be low.</li>
        <li><strong>3000–3500 words:</strong> Can score well if the writing is dense and every sentence earns its place. More common in Mathematics EEs where economy of expression is valued.</li>
        <li><strong>3500–3800 words:</strong> The sweet spot for most subjects. Leaves enough margin for the examiner to read your conclusion in full and demonstrates that you have developed your argument fully.</li>
        <li><strong>3800–4000 words:</strong> Fine, but leaves little margin for error. If your bibliography citation count is high (increasing your in-text citation word count), you may accidentally exceed the limit when you add final edits.</li>
        <li><strong>Over 4000 words:</strong> Never acceptable. Cut until you are under the limit, then review once more.</li>
      </ul>

      <h2>The Abstract Word Count</h2>
      <p>
        The EE abstract has a separate limit of 300 words and is not included in the
        4000-word count. The abstract must state: the research question, the scope of
        the investigation, and the conclusion reached. It should not include personal
        opinion or extensive background — it is a concise summary of the essay's
        structure and findings.
      </p>
      <p>
        From the May 2018 exam session onward, the abstract is abolished and must not be included; previously it was formally
        assessed as part of the IB criteria. However, it is still required and will
        be read by your supervisor and potentially by the examiner to orient
        themselves before reading the full essay. A clear, accurate abstract makes
        a good first impression and helps the examiner locate your research question
        and argument quickly.
      </p>

      <h2>Subject-Specific Word Count Guidance</h2>

      <h3>Sciences (Biology, Chemistry, Physics, Environmental Systems)</h3>
      <p>
        Science EEs often include data tables, graphs, and calculations. These elements
        (as figures and tables with captions) do not count toward the word count, so
        students sometimes find they have significant content but are under 3000 words
        of prose. This is fine — the analysis and evaluation of that data is what
        must reach the required depth in the word-counted sections. Do not pad with
        description; deepen the analysis.
      </p>

      <h3>Mathematics</h3>
      <p>
        Mathematics EEs are typically shorter in prose but dense in notation. Mathematical
        expressions and equations technically count as words if they are typeset inline,
        but most word processors handle this inconsistently. Aim for 2500–3500 words
        with substantial mathematical working in between. The depth of the mathematics
        matters more than the word count.
      </p>

      <h3>Humanities (History, Geography, Economics, Philosophy)</h3>
      <p>
        Humanities EEs are usually prose-heavy and most naturally approach the 4000-word
        limit. History EEs in particular need careful word management — it is easy to
        spend 600 words on historical context and have only 2400 for analysis and
        evaluation. Keep context brief and keep returning to your research question.
      </p>

      <h3>Language and Literature</h3>
      <p>
        Literary analysis EEs should stay between 3500 and 4000 words. Quotation from
        primary texts counts toward the word count, so choose your textual evidence
        carefully. Short, precisely chosen quotations with detailed analysis are
        preferred over long block quotations that use up word count without adding depth.
      </p>

      <h2>How to Cut Your Extended Essay When Over the Limit</h2>
      <p>
        If your draft exceeds 4000 words, do not start cutting from the end. Work through
        the essay systematically:
      </p>
      <ol>
        <li><strong>Remove summary sentences:</strong> Any sentence that merely restates what the preceding paragraph said can be deleted. Transitions like "In summary, the above analysis shows that…" add no new argument.</li>
        <li><strong>Shorten quotations:</strong> If you have a three-sentence quotation but only need to analyse one sentence of it, use an ellipsis and cut the rest.</li>
        <li><strong>Cut background context:</strong> The introduction often contains historical or contextual information that is tangential to the research question. If a paragraph does not directly set up your argument, consider moving it to an appendix or deleting it.</li>
        <li><strong>Tighten analysis paragraphs:</strong> Look for phrases like "This is important because…" followed by a restatement. Replace with direct analysis.</li>
        <li><strong>Remove redundant examples:</strong> If you have three examples illustrating the same point, one strong example is more effective (and shorter) than three moderate ones.</li>
      </ol>

      <h2>Does Word Count Affect Your IB Grade?</h2>
      <p>
        The word count itself is not a graded criterion — there is no criterion that
        says "you used X words, therefore you score Y." The word count matters because
        it determines how much of your essay the examiner reads, which affects every
        criterion that depends on reading the full essay: Critical Thinking,
        Presentation, and Engagement.
      </p>
      <p>
        The most efficient essay — the one that makes every word count toward the
        argument — is usually also the best essay. Students who write to fill space
        rather than to make a point typically score lower on Critical Thinking even
        when they stay within the limit.
      </p>

      <h2>Get Your Extended Essay Draft Assessed Before Submission</h2>
      <p>
        Once your Extended Essay is submitted, the grade is final. The most effective
        intervention is criterion-by-criterion feedback on a draft: are you developing
        your argument to the depth the examiner expects? Is your research question
        focused enough to be answered in 4000 words? Where exactly are marks being lost?
      </p>
      <p>
        IBLens analyses your Extended Essay draft against the official IB rubric
        and gives you specific, actionable feedback on each criterion before you submit.
      </p>
      <p>
        <a href="/essay">Upload your Extended Essay draft to IBLens for rubric-based feedback →</a>
      </p>
    
  </main>`,
  "/resources/ib-economics-ia": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Economics IA</nav>
      <p>
        The IB Economics Internal Assessment consists of three commentaries — one each
        on Microeconomics, Macroeconomics, and International Economics — each written
        in response to a real news article published after the start of your IB course.
        Each commentary is worth a third of the overall IA mark, which contributes 20%
        to your final grade. Most students find the IA easier to score well on than
        the Papers — but the difference between a 6 and a 7 comes down to a handful
        of consistently applied skills that this guide covers.
      </p>

      <h2>How the IB Economics IA Is Marked</h2>
      <p>
        Each commentary is marked on four criteria, for a maximum of 14 marks per
        commentary (42 total, converted to 20%):
      </p>
      <ul>
        <li><strong>Criterion A — Diagrams (3 marks):</strong> Are diagrams used? Are they accurately labelled? Do they directly illustrate the economics being discussed?</li>
        <li><strong>Criterion B — Terminology (2 marks):</strong> Is economic terminology used correctly and consistently throughout?</li>
        <li><strong>Criterion C — Application and Analysis (4 marks):</strong> Does the commentary correctly explain the economics of the situation described in the article? Is the analysis developed and accurate?</li>
        <li><strong>Criterion D — Evaluation (5 marks):</strong> Does the student weigh up different perspectives, consider short-run versus long-run effects, or analyse who gains and who loses? Is the evaluation balanced and well-reasoned?</li>
      </ul>
      <p>
        The most common mark distribution for a student who gets a 6 rather than a 7 is:
        Criterion A = 2, B = 2, C = 3, D = 3. The 2 marks typically lost are one on
        Diagrams (usually a labelling error) and two on Evaluation (surface-level
        rather than developed evaluation).
      </p>

      <h2>How to Choose a Good Article</h2>
      <p>
        The article selection is 80% of the battle. A good IA article has three properties:
      </p>
      <h3>1. It describes a real market event with a clear cause and effect</h3>
      <p>
        "Government announces new sugar tax" → this immediately gives you a negative
        externality / demerit good framework to work with. You can draw a diagram,
        explain the welfare effects, and evaluate the policy. Avoid articles that
        are purely statistical ("GDP grew 2.3% last quarter") without a policy event
        to analyse.
      </p>
      <h3>2. It connects to a single main syllabus topic</h3>
      <p>
        Do not choose articles that require you to use four different concepts from
        different units. An article about rent control in a city gives you a clean
        price ceiling analysis. An article about a trade war that also involves
        currency depreciation and domestic unemployment is too complex to analyse
        well in 750 words.
      </p>
      <h3>3. It is recent and sourced from a reliable outlet</h3>
      <p>
        Articles must be published after the official start of your IB course and
        from a published news source (Reuters, BBC, The Economist, local newspaper).
        Blog posts, opinion pieces, and Wikipedia do not count.
      </p>

      <h2>IB Economics IA Examples by Unit</h2>

      <h3>Microeconomics Commentary</h3>
      <p>
        Strong topics: price controls (rent ceilings, minimum wage), taxes and
        subsidies, negative externalities (pollution, cigarettes, sugar), positive
        externalities (education, vaccination), price discrimination, market failure.
      </p>
      <p>
        Example article scenario: A local government announces a $2/kg tax on
        plastic packaging to reduce plastic waste.
      </p>
      <p>
        What a 7-scoring commentary does: draws a correctly labelled negative
        externality diagram showing the divergence between MPC and MSC, explains
        the welfare loss triangle before the tax, shows how the tax corrects the
        externality by internalising the external cost, then evaluates: will
        producers pass the tax on to consumers (depends on PED/PES)? Is the tax
        set at the right level? What are the distributional effects — does the
        tax burden fall disproportionately on lower-income households?
      </p>

      <h3>Macroeconomics Commentary</h3>
      <p>
        Strong topics: fiscal policy (government spending, tax cuts), monetary
        policy (interest rate changes), inflation, unemployment, economic growth,
        the Phillips curve trade-off.
      </p>
      <p>
        Example article scenario: The central bank raises interest rates by 50
        basis points to combat inflation running at 7%.
      </p>
      <p>
        What a 7-scoring commentary does: draws an AD/AS diagram showing the
        leftward shift of AD as a result of higher interest rates, explains the
        transmission mechanism (higher rates → higher borrowing costs → reduced
        consumption and investment → fall in AD), then evaluates: time lags
        in monetary policy transmission; the risk of causing recession if rates
        are raised too far; whether supply-side inflation (caused by energy prices)
        can actually be addressed by demand-side monetary policy.
      </p>

      <h3>International Economics Commentary</h3>
      <p>
        Strong topics: tariffs, quotas, trade agreements, exchange rate changes
        and their effect on trade, current account deficits, protectionism vs
        free trade.
      </p>
      <p>
        Example article scenario: A country imposes a 25% tariff on imported
        steel to protect domestic producers.
      </p>
      <p>
        What a 7-scoring commentary does: draws a tariff diagram showing domestic
        price increase, reduced imports, consumer and producer surplus changes,
        and the deadweight welfare loss; evaluates the trade-off between protecting
        domestic jobs in the steel industry and the costs to downstream industries
        that use steel as an input; considers retaliatory tariffs from trading
        partners and the WTO implications.
      </p>

      <h2>Diagrams: The Cheapest Marks in the IA</h2>
      <p>
        Criterion A (Diagrams) is worth 3 marks per commentary — and losing 1 mark
        here is extremely common. The most frequent errors are:
      </p>
      <ul>
        <li><strong>Axes not labelled:</strong> Every diagram must have clearly labelled axes (Price/Quantity, or Price Level/Real GDP, etc.).</li>
        <li><strong>Shifts not labelled:</strong> If a curve shifts, label both the original curve (S₁, D₁) and the new curve (S₂, D₂) and show the direction of shift with an arrow.</li>
        <li><strong>Equilibrium points not marked:</strong> Mark original equilibrium (P₁, Q₁) and new equilibrium (P₂, Q₂) with dotted lines to the axes.</li>
        <li><strong>Diagram not explained in text:</strong> Every feature on your diagram should be mentioned in your commentary. A diagram that is drawn but not referred to scores 0 on Criterion A.</li>
        <li><strong>Wrong diagram for the scenario:</strong> Using a supply-and-demand diagram for a macroeconomics article about fiscal policy (which needs AD/AS) loses all 3 marks.</li>
      </ul>

      <h2>Evaluation: The Hardest Marks to Get</h2>
      <p>
        Criterion D (Evaluation) is 5 marks and is where most students fall short.
        There are four reliable evaluation frameworks that work across almost any
        Economics article:
      </p>
      <ol>
        <li><strong>Short run vs. long run:</strong> The policy may have one effect immediately and a different effect over time. Rent control reduces rents in the short run but reduces housing supply in the long run as developers exit the market.</li>
        <li><strong>Winners and losers:</strong> Who gains from this policy and who loses? A minimum wage helps low-wage workers but may reduce employment for the most marginally employed workers.</li>
        <li><strong>Magnitude depends on elasticity:</strong> The size of the effect always depends on PED, PES, or YED. A sin tax on cigarettes has a small effect on quantity demanded if demand is inelastic.</li>
        <li><strong>Limitations of the policy:</strong> Why might the policy fail to achieve its stated goal? Externality taxes only work if set at the correct Pigouvian level, which requires accurate measurement of external cost — which is practically very difficult.</li>
      </ol>
      <p>
        Apply two or three of these frameworks to your specific article context and
        you have a developed, balanced evaluation.
      </p>

      <h2>Word Count and Structure</h2>
      <p>
        Each commentary has a 750-word limit (not including diagrams, references, or
        the article itself). Every word counts. The structure that works best:
      </p>
      <ul>
        <li><strong>Opening context (50–80 words):</strong> Briefly describe what the article is about and identify the main economic concept. Do not summarise the article — you are analysing it.</li>
        <li><strong>Economic analysis (300–400 words):</strong> Explain the economics using diagrams, correct terminology, and the relevant theory. Describe cause and effect precisely.</li>
        <li><strong>Evaluation (250–350 words):</strong> Weigh up the effects, consider limitations, discuss who gains and loses. Use two to three distinct evaluation points — do not make one point three times.</li>
        <li><strong>Conclusion (50–80 words):</strong> State your overall judgement. Is the policy likely to achieve its goal? Under what conditions?</li>
      </ul>

      <h2>Getting Your Commentary Checked Before Submission</h2>
      <p>
        The most common experience after receiving IA marks is: "I didn't realise my
        diagram was missing labels" or "my evaluation was describing, not evaluating."
        These are easy marks to recover — if you catch them in time.
      </p>
      <p>
        IBLens analyses your IB essay and commentary drafts against the official IB
        marking criteria and identifies exactly where you are losing marks on each
        criterion before your teacher submits your work.
      </p>
      <p>
        <a href="/essay">Upload your Economics IA commentary to IBLens for rubric-based feedback →</a>
      </p>
    
  </main>`,
  "/resources/ib-history-ia": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB History IA</nav>
      <p>
        The IB History Internal Assessment is a Historical Investigation of 2200 words
        that requires you to investigate a historical question using primary and
        secondary sources, evaluate two specific sources in detail, and write an
        analytical argument supported by evidence. It is worth 25% of your final grade
        at SL and 20% at HL. Most students find the IA less difficult than Paper 2
        or Paper 3 — but the specific structure and the source evaluation sections
        trip up a significant number of students who don't understand exactly what
        each section requires.
      </p>

      <h2>The Three-Section Structure of the IB History IA</h2>
      <p>
        The History IA must follow a precise three-section structure. Understanding
        what each section requires is more important than general writing skill.
      </p>

      <h3>Section 1 — Identification and Evaluation of Sources (approx. 500 words)</h3>
      <p>
        This section focuses on two sources specifically relevant to your research
        question. For each source, you must analyse it using the OPCVL framework:
        Origin, Purpose, Content, Value, and Limitation.
      </p>
      <p>
        <strong>What examiners want:</strong> Not a description of what the source says,
        but an analysis of what its origin and purpose mean for its value and
        limitations. A speech by a government minister on the eve of a controversial
        decision is valuable as evidence of the official government position — but
        limited because it was designed to persuade, not to inform, and likely
        omits inconvenient facts. That is the level of analysis required.
      </p>
      <p>
        <strong>Common mistake:</strong> Students summarise what the source says
        (content) instead of evaluating what its origin and purpose tell us about
        its reliability and usefulness. The mark scheme explicitly says that
        describing the content without connecting it to value and limitation earns
        minimal credit.
      </p>
      <p>
        <strong>Source selection:</strong> One primary source (a document, speech,
        photograph, or statistical record produced at the time) and one secondary
        source (a historian's analysis) works well. Both must be specifically relevant
        to your research question — not just to the general topic.
      </p>

      <h3>Section 2 — Investigation (approx. 1300 words)</h3>
      <p>
        This is the analytical body of your IA. It should directly answer your
        research question using evidence from multiple sources. Think of it as a
        mini-essay with a clear argument, organised into thematic or chronological
        subsections.
      </p>
      <p>
        <strong>What distinguishes a 7 from a 5 here:</strong> Students who score
        5–6 on Section 2 typically present evidence chronologically and describe
        what happened. Students who score 7 organise their argument thematically,
        weigh competing interpretations, and maintain a consistent answer to the
        research question throughout. Every paragraph should either advance or
        qualify the argument — not just add more information.
      </p>
      <p>
        Use a minimum of 8–10 sources in the Investigation. Footnote or parenthetically
        cite every piece of evidence you use. Do not quote at excessive length —
        short, precise quotations with analysis are better than long block quotes
        that consume word count.
      </p>

      <h3>Section 3 — Reflection (approx. 400 words)</h3>
      <p>
        This section asks you to reflect on the methods historians use and the
        challenges involved. It is the most misunderstood section of the History IA.
      </p>
      <p>
        <strong>What it is not:</strong> A summary of your findings. A comment on
        how interesting your topic was. A restatement of your conclusion.
      </p>
      <p>
        <strong>What it is:</strong> A genuine methodological reflection on what
        you learned about historical investigation by doing this project. Specifically,
        examiners look for engagement with questions like:
      </p>
      <ul>
        <li>What kinds of sources were available to you — and what kinds were not? How did this shape what you could know?</li>
        <li>How did the perspective of your sources affect the conclusions you could draw?</li>
        <li>What does the existence of contradictory historical interpretations tell you about the nature of historical knowledge?</li>
        <li>How would a historian with access to different archives or sources approach this question differently?</li>
      </ul>
      <p>
        Students who score 5–6 on Section 3 write a paragraph about their personal
        experience ("I found it challenging to find primary sources, but it was
        rewarding"). Students who score 7 engage with specific methodological
        questions raised by their investigation.
      </p>

      <h2>How to Choose a Good Research Question</h2>
      <p>
        The research question determines how achievable a high score is. Good History
        IA research questions have these properties:
      </p>
      <ul>
        <li><strong>Narrow enough to answer in 1300 words of analysis.</strong> "What caused World War One?" cannot be answered in 1300 words. "To what extent did the Schlieffen Plan's failure determine Germany's military strategy in 1914?" can.</li>
        <li><strong>Debatable — requiring evaluation of evidence, not just description.</strong> A question that can be answered by reciting a sequence of events is not suitable. A question where historians disagree — where you must weigh evidence and come to a justified position — is ideal.</li>
        <li><strong>Supported by accessible sources.</strong> You need primary sources for Section 1. Topics where primary sources are available in translation, digitised, or held in a local archive are preferable to topics where all relevant sources are in an archive in another country.</li>
        <li><strong>Distinct from Paper 2 and Paper 3 topics.</strong> The IB prefers (though does not strictly require) that your IA topic is different from your examined topics. Using the same topic risks formulaic writing; using a genuinely new topic demonstrates independent historical thinking.</li>
      </ul>

      <h2>Source Evaluation: What OPCVL Actually Means</h2>
      <p>
        OPCVL is the framework for Section 1 source evaluation. Many students memorise
        the acronym without understanding what the evaluation should achieve.
      </p>
      <table>
        <thead>
          <tr><th>Element</th><th>Question to answer</th><th>Why it matters</th></tr>
        </thead>
        <tbody>
          <tr><td>Origin</td><td>Who produced this? When? Where? Under what conditions?</td><td>Context affects what the source could and could not contain.</td></tr>
          <tr><td>Purpose</td><td>Why was this produced? For what audience?</td><td>Purpose shapes what is included, what is omitted, and how it is framed.</td></tr>
          <tr><td>Content</td><td>What does it say that is relevant to the research question?</td><td>Brief — the main value/limitation analysis flows from content, not from it.</td></tr>
          <tr><td>Value</td><td>What makes this source useful for investigating the research question?</td><td>Value comes from origin + purpose, not just content.</td></tr>
          <tr><td>Limitation</td><td>What does this source not tell us, or tell us unreliably?</td><td>All sources have limitations — pretending they don't is a mark loss.</td></tr>
        </tbody>
      </table>

      <h2>Word Count Management</h2>
      <p>
        The 2200-word limit is strict. The most common distribution problem is
        an overlong Investigation (1700+ words) at the expense of the Reflection
        (200 words instead of 400). Examiners notice when the Reflection is thin.
        Plan your word count by section before you start writing:
      </p>
      <ul>
        <li>Section 1: 450–500 words (250 per source)</li>
        <li>Section 2: 1250–1350 words</li>
        <li>Section 3: 380–420 words</li>
      </ul>

      <h2>Getting Feedback That Actually Helps</h2>
      <p>
        Your History teacher can give you one full draft review. General feedback
        ("your analysis could be more developed") does not tell you which paragraphs
        in Section 2 are describing instead of arguing, or which aspect of the
        Reflection is missing methodological depth.
      </p>
      <p>
        IBLens analyses your History IA against the official IB marking criteria
        and provides criterion-by-criterion feedback — so you know exactly what
        to change before you submit the final version.
      </p>
      <p>
        <a href="/essay">Upload your History IA draft to IBLens for rubric-based feedback →</a>
      </p>
    
  </main>`,

  "/resources/ib-university-admissions": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB University Admissions</nav>
  <h1>IB to University — How Scores Translate to Admissions</h1>

      <p>
        The IB Diploma is recognized by universities in over 100 countries, but how institutions evaluate IB scores varies significantly by country, university, and program. Understanding these differences is critical for making informed application decisions — choosing the right universities based on your predicted grades, and knowing which aspects of your IB profile matter most for your target programs.
      </p>

      <p>
        This guide explains how major university systems around the world evaluate IB Diploma scores, what typical offers look like, and how to strategically position your application based on your IB profile.
      </p>

      <h2>United Kingdom: UCAS Points and Conditional Offers</h2>

      <p>
        UK universities make conditional offers based primarily on Higher Level (HL) subject grades. The typical format is "766 at HL" or "36 points overall with 6,6,5 at HL." Understanding this system is essential for IB students applying to the UK:
      </p>

      <p>
        <strong>HL grades matter most.</strong> UK universities focus heavily on your three Higher Level subjects because these are considered equivalent to A-Levels — the qualification most UK applicants hold. A student with 38 total points but 7,7,6 at HL is generally more competitive than a student with 40 points but 6,6,5 at HL for selective programs.
      </p>

      <p>
        <strong>Subject requirements are strict.</strong> Unlike some systems where any combination of strong grades suffices, UK universities often require specific subjects at HL. A medical school might require Biology and Chemistry at HL with grade 7; an engineering program might require Mathematics and Physics at HL with grade 6. Missing these requirements typically means automatic rejection regardless of total points.
      </p>

      <table>
        <thead>
          <tr>
            <th>University Tier</th>
            <th>Typical IB Offer</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Oxbridge / Top Medical</strong></td>
            <td>40–42 points, 7,7,6 or 7,6,6 at HL</td>
            <td>Oxford, Cambridge, Imperial Medicine</td>
          </tr>
          <tr>
            <td><strong>Russell Group Top</strong></td>
            <td>36–40 points, 6,6,6 or 6,6,5 at HL</td>
            <td>UCL, Edinburgh, King's College London, Warwick</td>
          </tr>
          <tr>
            <td><strong>Russell Group Mid</strong></td>
            <td>32–36 points, 6,5,5 or 5,5,5 at HL</td>
            <td>Birmingham, Leeds, Sheffield, Nottingham</td>
          </tr>
          <tr>
            <td><strong>Other Strong Universities</strong></td>
            <td>28–32 points, 5,5,4 at HL</td>
            <td>Many excellent programs with slightly lower entry requirements</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>UCAS Tariff Points:</strong> Since 2017 UCAS has awarded tariff points per subject grade (HL and SL separately, plus TOK/EE bands) rather than for the overall IB total — the old “45 = 720 points” scale is long obsolete. Most selective universities make offers in IB points anyway; when a tariff number is needed, use the official UCAS calculator.
      </p>

      <h2>United States: Holistic Admissions</h2>

      <p>
        US universities use holistic admissions, meaning IB scores are one factor among many. However, the IB Diploma is highly regarded by US admissions officers because it demonstrates academic rigor, breadth, and the ability to handle a demanding workload.
      </p>

      <p>
        <strong>Predicted grades matter for Early Decision/Action.</strong> Since US applications are submitted before final IB results, universities rely on predicted grades. A strong predicted score (38+) signals academic capability, but it is evaluated alongside SAT/ACT scores, extracurriculars, essays, and recommendations.
      </p>

      <p>
        <strong>HL subjects demonstrate depth.</strong> US universities appreciate that HL subjects represent advanced study. Taking Mathematics Analysis HL or Physics HL signals preparation for STEM programs, while English Literature HL or History HL signals humanities readiness.
      </p>

      <p>
        <strong>Credit and placement:</strong> Many US universities grant college credit or advanced placement for HL scores of 5, 6, or 7. This can allow students to skip introductory courses, graduate early, or take more advanced electives. Policies vary by institution — check each university's IB credit policy.
      </p>

      <table>
        <thead>
          <tr>
            <th>University Selectivity</th>
            <th>Typical IB Profile of Admitted Students</th>
            <th>Role of IB in Decision</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Ivy League / Top 20</strong></td>
            <td>40–45 predicted, mostly 7s at HL</td>
            <td>Confirms academic excellence; other factors differentiate</td>
          </tr>
          <tr>
            <td><strong>Top 20–50</strong></td>
            <td>36–42 predicted</td>
            <td>Strong IB scores can compensate for slightly lower test scores</td>
          </tr>
          <tr>
            <td><strong>Top 50–100</strong></td>
            <td>32–38 predicted</td>
            <td>IB Diploma itself is a positive signal of rigor</td>
          </tr>
        </tbody>
      </table>

      <h2>Canada: Provincial Equivalencies</h2>

      <p>
        Canadian universities convert IB scores to provincial grade equivalencies. The conversion varies by province and university, but generally:
      </p>

      <ul>
        <li>IB 7 = 96–100% equivalent</li>
        <li>IB 6 = 90–95% equivalent</li>
        <li>IB 5 = 80–89% equivalent</li>
        <li>IB 4 = 70–79% equivalent</li>
      </ul>

      <p>
        <strong>University of Toronto</strong> typically requires 34–38 points for competitive programs (Engineering, Commerce, Life Sciences). <strong>UBC</strong> converts IB scores to a percentage and requires approximately 90%+ equivalent for competitive programs. <strong>McGill</strong> makes offers based on total IB points, typically 36–41 for competitive programs.
      </p>

      <p>
        Canadian universities generally value the IB Diploma highly and often grant transfer credit for HL scores of 5+. Some programs (like UBC's Science One) are specifically designed for IB graduates.
      </p>

      <h2>Europe: Country-Specific Recognition</h2>

      <p>
        European universities outside the UK have varying approaches to IB recognition:
      </p>

      <p>
        <strong>Netherlands:</strong> IB Diploma is fully recognized. Universities like Amsterdam, Leiden, and Delft typically require 34–38 points for competitive programs. Some programs have specific HL subject requirements.
      </p>

      <p>
        <strong>Germany:</strong> The IB Diploma is recognized as equivalent to the Abitur if certain conditions are met (including specific subject combinations and minimum scores). The conversion formula produces an Abitur-equivalent grade between 1.0 and 4.0.
      </p>

      <p>
        <strong>Switzerland:</strong> ETH Zurich and EPFL require the IB Diploma with specific subject requirements and minimum scores (typically 38+ for ETH). The Swiss system values the breadth of the IB.
      </p>

      <p>
        <strong>Scandinavia:</strong> Universities in Sweden, Denmark, and Norway recognize the IB and convert scores to local equivalencies. Requirements are generally lower than UK/US equivalents for similar quality programs.
      </p>

      <h2>Australia and Asia-Pacific</h2>

      <p>
        <strong>Australia:</strong> IB scores are converted to an ATAR (Australian Tertiary Admission Rank). An IB score of 45 converts to ATAR 99.95; 38 converts to approximately ATAR 95; 30 converts to approximately ATAR 80. Universities like Melbourne, Sydney, and ANU all recognize the IB.
      </p>

      <p>
        <strong>Singapore:</strong> NUS and NTU recognize the IB and typically require 38–44 points for competitive programs. The IB is well-understood in Singapore given the large number of IB schools in the country.
      </p>

      <p>
        <strong>Hong Kong:</strong> HKU and HKUST recognize the IB with typical requirements of 36–42 points for competitive programs.
      </p>

      <h2>Strategic Application Decisions</h2>

      <p>
        Given how differently universities evaluate IB scores, strategic application decisions can significantly impact your outcomes:
      </p>

      <p>
        <strong>Match your HL subjects to target programs.</strong> If you are applying to UK universities, your HL subject choices are critical — they cannot be changed after Year 1. Research subject requirements early and ensure your HL combination opens the doors you want.
      </p>

      <p>
        <strong>Understand the difference between total points and HL grades.</strong> A student with 38 points (7,7,6 at HL, 6,6,6 at SL) is more competitive for UK universities than a student with 40 points (6,6,6 at HL, 7,7,7,1 bonus at SL) because UK offers focus on HL grades.
      </p>

      <p>
        <strong>Use predicted grades strategically.</strong> If your predicted grades are strong (38+), you can aim for highly selective universities. If they are moderate (32–36), focus on programs where your score is above the typical offer — being above the threshold is more important than being at the median.
      </p>

      <p>
        <strong>Consider credit policies.</strong> If you achieve 6s and 7s at HL, some universities will grant significant credit — potentially saving a semester or year of tuition. This can be worth tens of thousands of dollars and should factor into your university choice.
      </p>

      <h2>How IBLens University Strategy Helps</h2>

      <p>
        Navigating the complexity of IB-to-university pathways is exactly what <a href="/university">IBLens's University Strategy tool</a> is designed for. Based on your predicted scores, subject combination, and preferences (country, program, campus size), it identifies:
      </p>

      <ul>
        <li><strong>Target universities:</strong> Programs where your profile is a strong match</li>
        <li><strong>Reach universities:</strong> Programs where you are competitive but not guaranteed</li>
        <li><strong>Safety options:</strong> Programs where your scores exceed typical offers</li>
        <li><strong>Credit opportunities:</strong> Universities where your HL scores would earn significant transfer credit</li>
      </ul>

      <p>
        The tool draws on historical admissions data and university-specific IB policies to provide personalized recommendations rather than generic advice. This is particularly valuable for international students who may not have access to country-specific counseling for every system they are considering.
      </p>

      <p>
        For understanding how your current essay quality maps to predicted grades, use <a href="/essay">IBLens essay analysis</a> to get criterion-based predictions. For more on how the IB scoring system works, see our <a href="/resources/ib-grade-boundaries">Grade Boundaries Guide</a>. To understand how to maximize your IA marks (which directly affect your subject grades and therefore your university competitiveness), read our <a href="/resources/ib-internal-assessment-guide">Internal Assessment Guide</a>.
      </p>
</main>`,

  "/resources/ib-math-ia-examples": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Math IA Examples</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Math IA Examples</h1>
  <p>
        The IB Mathematics Internal Assessment is worth 20% of your final grade — and
        it is the one component where you control the topic, the approach, and the
        depth of exploration. That freedom is also what makes it difficult. Most
        students who score below a 6 do so not because their mathematics is wrong, but
        because their exploration lacks personal engagement, mathematical sophistication,
        or a clearly communicated aim. This guide walks through what high-scoring IB Math
        IA examples actually look like and how to replicate their structure.
      </p>

      <h2>What the Examiner Is Looking For</h2>
      <p>
        The IB Math IA is marked on five criteria, each worth a maximum of 4 marks
        (except Criterion E which is 6):
      </p>
      <ul>
        <li><strong>Criterion A — Presentation (4 marks):</strong> Is the work well-organized, clearly written, and appropriately concise? Is there a table of contents and a bibliography?</li>
        <li><strong>Criterion B — Mathematical Communication (4 marks):</strong> Are mathematical symbols, notation, and diagrams used correctly and consistently?</li>
        <li><strong>Criterion C — Personal Engagement (4 marks):</strong> Does the exploration reflect your genuine curiosity? Is the approach original rather than a textbook rehash?</li>
        <li><strong>Criterion D — Reflection (4 marks):</strong> Do you discuss limitations, surprises, and what you would do differently? Is your thinking visible throughout?</li>
        <li><strong>Criterion E — Use of Mathematics (6 marks):</strong> Is the mathematics relevant to the aim? Is it commensurate with the level of the course? Is it applied correctly?</li>
      </ul>
      <p>
        A student who scores 4, 4, 3, 3, 5 = 19/20 has a high chance of a 7 on the IA.
        A student with correct but shallow mathematics (Criterion E = 3) combined with
        no reflection (Criterion D = 1) ends up around 14/20 — which is a 5 or low 6.
      </p>

      <h2>IB Math IA Examples by Topic Area</h2>

      <h3>Analysis and Approaches (AA) HL/SL — Strong Topic Examples</h3>

      <h4>1. Modelling the spread of a rumour using differential equations</h4>
      <p>
        This classic exploration uses a logistic differential equation to model how
        information spreads through a population. A student who chooses a real
        data source — for instance, tweet counts from a viral news event — scores
        highly on Personal Engagement because the context is self-selected and
        the data is original. The mathematics involves solving the logistic equation,
        fitting parameters to data, and comparing the model against observed values.
        At HL, this can be extended to include a delayed-response model (a delay
        differential equation), pushing Criterion E toward 5 or 6.
      </p>
      <p>
        <em>Common mistake:</em> Students who simply write out the logistic model without
        collecting their own data score 2 on Criterion C. The personal engagement
        comes from the student's specific choice of context and data, not from the
        mathematics alone.
      </p>

      <h4>2. Investigating the golden ratio in architecture or music</h4>
      <p>
        A perennially popular topic — but one that frequently scores low because
        students state that golden ratio connections "prove" aesthetic preference
        without using any statistical testing. A high-scoring version tests whether
        the ratio appears in a specific set of buildings or musical compositions using
        hypothesis testing or regression, then reflects honestly on whether the data
        supports the claim. The reflection ("the correlation was weaker than expected,
        which suggests…") is what earns marks on Criterion D.
      </p>

      <h4>3. Optimisation of a packaging design</h4>
      <p>
        Calculus-based optimisation is reliable AA content. A student who chooses a
        product they actually use — a protein bar wrapper, a tea tin, a specific shoe
        box — and measures real dimensions before comparing against the theoretical
        optimum earns strong marks on Criterion C. The mathematics should include
        second derivative tests and, for HL, possibly Lagrange multipliers if the
        constraint is complex.
      </p>

      <h3>Applications and Interpretation (AI) HL/SL — Strong Topic Examples</h3>

      <h4>4. Regression analysis of Premier League goal data</h4>
      <p>
        An AI exploration built around regression is appropriate if the variables have
        a plausible relationship and the student goes beyond a single regression line.
        A strong version compares linear, quadratic, and exponential models, uses
        residual analysis to evaluate fit, and discusses which model is most appropriate
        and why. At HL, adding a chi-squared test for independence between two
        categorical variables (e.g., home/away result versus number of shots on target)
        strengthens Criterion E.
      </p>

      <h4>5. Using Voronoi diagrams to optimise emergency service locations</h4>
      <p>
        Voronoi diagrams appear explicitly in the AI HL syllabus. An exploration
        that applies Voronoi tessellation to a real map — choosing the nearest ambulance
        station for each postcode in a city, or the nearest recycling point in a
        neighbourhood — scores well because the application is practical and the
        mathematics is used rather than described. The student should measure real
        distances, compute the Voronoi cells, and reflect on what the model ignores
        (traffic, road layout, capacity constraints).
      </p>

      <h4>6. Analysing body mass index data across age groups using statistics</h4>
      <p>
        A statistics-heavy AI exploration using publicly available health data. The
        student collects or downloads data, applies t-tests or ANOVA to compare
        distributions, and reflects on whether the statistical differences are
        meaningful in context. The key to Criterion D here is acknowledging that
        statistical significance does not equal practical significance — a nuance
        that signals genuine mathematical understanding.
      </p>

      <h2>Structure of a High-Scoring IB Math IA</h2>
      <p>
        Examiners read hundreds of IAs. A clear structure signals organisation (Criterion A)
        and makes the mathematics easier to follow (Criterion B). The following
        structure appears in most top-scoring explorations:
      </p>
      <ol>
        <li><strong>Introduction (150–250 words):</strong> Why this topic? What is the aim? State your research question explicitly. Do not start with "Mathematics is everywhere."</li>
        <li><strong>Background mathematics (optional, 200–400 words):</strong> Explain only the theory a reader needs to follow your exploration. Do not include textbook definitions of concepts your reader already knows.</li>
        <li><strong>Exploration (the bulk, 800–1500 words):</strong> Your calculations, models, graphs, and reasoning. Show working. Label every figure. Explain what each step means, not just what it is.</li>
        <li><strong>Reflection (200–400 words):</strong> What did you find? Were you surprised? What are the limitations of your model? What would you do differently?</li>
        <li><strong>Conclusion (100–200 words):</strong> Restate what you found in relation to your aim. Do not introduce new material here.</li>
        <li><strong>Bibliography:</strong> Cite every data source, textbook, and website you used.</li>
      </ol>
      <p>
        Total length: 12–20 pages including figures, or roughly 2000–4000 words of prose.
        Going over 4000 words rarely improves scores and often signals that the student
        included padding rather than depth.
      </p>

      <h2>The Most Common Reasons IB Math IAs Score Below Expectations</h2>

      <h3>Choosing a topic that is too broad</h3>
      <p>
        "The mathematics of climate change" cannot be explored in 20 pages. A focused
        version — "modelling the rate of Arctic ice loss using exponential decay" with
        a specific dataset — can. Narrow your aim to something you can actually answer
        with the mathematics you know.
      </p>

      <h3>Listing results without explaining them</h3>
      <p>
        A student who writes "the derivative is 2x, therefore the minimum is at x=0"
        without explaining why this matters for the aim is scoring low on Criterion B
        and D. Every result should be connected back to the research question.
      </p>

      <h3>Copying a well-known example</h3>
      <p>
        The "SIR model for disease spread" and the "mathematics of music and Fourier
        series" are among the most submitted IA topics. Examiners recognise them
        immediately. If you choose a familiar topic, you need an original data source,
        an unusual angle, or a self-collected dataset to score well on Criterion C.
      </p>

      <h3>Weak or absent reflection</h3>
      <p>
        Criterion D = 1 is the single most preventable mark loss in the Math IA.
        Students who write one paragraph at the end saying "in conclusion, my model
        was reasonably accurate" are describing, not reflecting. Reflection means
        asking: what did I assume? What could go wrong? How does this connect to
        real-world constraints? What mathematics could extend this exploration?
      </p>

      <h2>How Your IA Draft Compares to the Rubric</h2>
      <p>
        Reading high-scoring IB Math IA examples is useful — but the gap between
        understanding a strong example and writing one yourself is where most marks
        are lost. When you have a draft, the most efficient use of your time is
        to get criterion-by-criterion feedback: exactly where is Criterion D weak?
        Is your Criterion B notation consistent throughout? Are there places where
        the mathematical reasoning is unclear?
      </p>
      <p>
        IBLens analyses your IB essay or IA draft against the official IB marking
        criteria and identifies precisely where marks are being lost — before your
        teacher submits your final grade.
      </p>
      <p>
        <a href="/essay">Upload your Math IA draft to IBLens for rubric-based feedback →</a>
      </p>
</main>`,

  "/resources/ib-extended-essay-examples": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Extended Essay Examples</nav>
  <h1>IB Extended Essay Examples — What Real High-Scoring EEs Look Like</h1>
      <p>The Extended Essay is one of the most intimidating pieces of work in the IB Diploma Programme. At 4,000 words, it is longer than anything most 16–17-year-olds have ever written, and the open-ended format — choose your own topic, design your own research question, argue your own thesis — leaves many students paralysed. The best way to break through that paralysis is to study strong IB extended essay examples and understand <em>why</em> they worked, not just what they said.</p>
      <p>This guide walks through what examiners actually reward, gives you concrete example research questions by subject, shows the most common mistakes that drag scores down, and explains the mindset shift that separates a C-grade EE from one that earns a coveted A.</p>

      <h2>What Makes a High-Scoring IB Extended Essay?</h2>
      <p>The IB grades Extended Essays against five criteria: Focus and Method (Criterion A), Knowledge and Understanding (B), Critical Thinking (C), Presentation (D), and Engagement (E). Total marks available are 34. An A requires roughly 28+ marks; most students earning a B or C lose the majority of their marks on Criterion C — critical thinking.</p>
      <p>Examiners are not looking for a Wikipedia-style overview of a topic. They want to see a student take a narrow, specific question and subject it to sustained, disciplined analysis. The difference between a mediocre essay and an excellent one almost always comes down to three things:</p>
      <ul>
        <li><strong>Specificity of the research question.</strong> Vague questions produce vague answers. A question like "How does social media affect mental health?" cannot be answered in 4,000 words. A question like "To what extent did Instagram's algorithmic feed, introduced in 2016, correlate with self-reported anxiety scores among UK adolescent girls aged 14–17?" is narrow enough to actually investigate.</li>
        <li><strong>A genuine argument.</strong> High-scoring EEs take a position and defend it with evidence. They do not merely present information from both sides and conclude "it is complicated."</li>
        <li><strong>Engagement with counter-evidence.</strong> A sophisticated essay acknowledges evidence that challenges its thesis, explains why it does not overturn the argument, and emerges stronger for it.</li>
      </ul>

      <h2>IB Extended Essay Examples by Subject</h2>

      <h3>Economics Extended Essay Examples</h3>
      <p>Economics EEs are popular because students feel comfortable with theory, but they are frequently penalised for being too theoretical and not empirical enough. Strong Economics EEs apply specific microeconomic or macroeconomic concepts to a real, local, measurable situation.</p>
      <ul>
        <li><em>"To what extent did the introduction of the sugar tax in the UK (2018) reduce consumption of high-sugar soft drinks among 10–16-year-olds?"</em> — This works because it picks a specific policy, a specific country, a specific demographic, and a specific measurable outcome.</li>
        <li><em>"How effective has price-cap regulation been in limiting profit margins for energy retailers in Germany following the 2021–2022 energy crisis?"</em> — Strong because it uses a defined time window, a defined mechanism, and quantifiable profitability data.</li>
        <li><em>"To what extent does monopsony power explain wage stagnation among supermarket shelf-stackers in regional Australia, 2015–2023?"</em> — Excellent because it applies a specific market structure theory to a concrete labour market with accessible wage data.</li>
      </ul>

      <h3>History Extended Essay Examples</h3>
      <p>History EEs must be based on events that ended at least ten years before submission. The best ones focus on historiographical debate.</p>
      <ul>
        <li><em>"To what extent was Stalin's collectivisation policy driven by ideological commitment to Marxism rather than pragmatic economic necessity, 1929–1933?"</em></li>
        <li><em>"How significant was the role of Japanese-American internment in shaping domestic opposition to civil liberties restrictions in post-war America?"</em></li>
        <li><em>"To what extent did the Berlin Airlift (1948–1949) represent a turning point in Western Cold War strategy, rather than a continuation of pre-existing policy?"</em></li>
      </ul>

      <h3>Biology Extended Essay Examples</h3>
      <p>Biology EEs that score highest usually involve a self-designed experiment or primary data collection.</p>
      <ul>
        <li><em>"How does the concentration of caffeine in growth medium affect the germination rate and early root elongation of Vigna radiata (mung bean) seeds?"</em></li>
        <li><em>"To what extent does the gut microbiome composition of Crohn's disease patients differ from healthy controls, and what implications does this have for probiotic therapy?"</em></li>
        <li><em>"What is the relationship between ambient light intensity and the rate of photosynthesis in Elodea canadensis measured by oxygen bubble production?"</em></li>
      </ul>

      <h3>English Extended Essay Examples</h3>
      <p>English EEs require close textual analysis focused on literary technique and its effect on meaning.</p>
      <ul>
        <li><em>"How does Kazuo Ishiguro use unreliable first-person narration in Never Let Me Go to explore complicity in systemic injustice?"</em></li>
        <li><em>"In what ways does the figurative language of confinement in Sylvia Plath's The Bell Jar construct the novel's critique of 1950s American femininity?"</em></li>
        <li><em>"How does Chimamanda Ngozi Adichie's use of code-switching in Americanah function as a marker of cultural identity negotiation?"</em></li>
      </ul>

      <h3>Psychology Extended Essay Examples</h3>
      <ul>
        <li><em>"To what extent does the evidence from twin studies support a genetic basis for schizophrenia over environmental explanations?"</em></li>
        <li><em>"How reliable is eyewitness testimony as legal evidence, in light of psychological research on memory reconstruction?"</em></li>
      </ul>

      <h3>Physics Extended Essay Examples</h3>
      <ul>
        <li><em>"How does the angle of incidence of a laser beam on a diffraction grating affect the spacing of interference fringes, and how well does this conform to the grating equation?"</em></li>
        <li><em>"To what extent can the coefficient of drag of a model car be accurately determined using a ballistic pendulum method compared to manufacturer specifications?"</em></li>
      </ul>

      <h2>What Kills an Extended Essay Score</h2>

      <h3>The "Big Topic" Trap</h3>
      <p>The single most common reason for a low score is a research question that is too broad. "What caused World War One?" is a doctoral dissertation, not a 4,000-word essay. Examiners can spot this within the first 300 words, and the score for Criterion A rarely recovers.</p>

      <h3>Description Masquerading as Analysis</h3>
      <p>Many students describe what sources say without evaluating why it matters. Criterion C — critical thinking — accounts for 12 of the 34 available marks. In History, engage with historiography. In Biology, discuss limitations of your method. In Economics, apply theory to real data.</p>

      <h3>A Weak Conclusion</h3>
      <p>The conclusion must directly and explicitly answer the research question. It should not introduce new evidence or vaguely state "the issue is complex." A strong conclusion names the answer, acknowledges the strongest counter-argument, and identifies what further research would be needed.</p>

      <h3>Weak Sources</h3>
      <p>Using Wikipedia or student essay banks as primary sources signals to the examiner that the student did not engage seriously with academic literature. For Sciences, peer-reviewed journals are expected. For Humanities, scholarly books and academic journals set the standard.</p>

      <h2>Before You Submit: Get Feedback on Your Draft</h2>
      <p>One of the hardest parts of the EE process is getting objective feedback. Your supervisor may be encouraging but not specific. By the time you have spent months on a topic, it is almost impossible to read your own essay with fresh eyes.</p>
      <p><a href="/essay">IBLens is an AI tool built specifically for IB students that analyses your Extended Essay draft against the official IB criteria</a> — giving you criterion-by-criterion feedback on Focus and Method, Critical Thinking, and Knowledge and Understanding before you hand it in. It identifies where your argument loses coherence, where your sources need strengthening, and whether your conclusion actually answers your research question.</p>

      <h2>Final Checklist Before Submitting</h2>
      <ul>
        <li>Does your research question appear word-for-word in your introduction and conclusion?</li>
        <li>Is every paragraph contributing to your argument, or are some just providing background?</li>
        <li>Have you engaged with at least one significant counter-argument?</li>
        <li>Are all sources academic-quality and correctly cited?</li>
        <li>Is your word count between 3,800 and 4,000 words?</li>
        <li>Does your conclusion explicitly answer the research question?</li>
        <li>Have you completed your RPPF with genuine reflection?</li>
      </ul>
      <p>The Extended Essay rewards students who treat it as an intellectual exercise. Choose a question you are genuinely curious about, narrow it until it feels almost too specific, and build an argument you are willing to defend.</p>
</main>`,

  "/resources/ib-score-calculator": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Score Calculator</nav>
  <h1>IB Score Calculator & Grade Boundaries: The Complete Guide</h1>
      <h2>How IB Scoring Works: The 45-Point System Explained</h2>
      <p>Every IB diploma candidate takes six subjects — three at Higher Level (HL) and three at Standard Level (SL). Each subject is graded on a scale of 1 to 7, giving a raw maximum of 42 subject points. The remaining 3 points come from the core: Theory of Knowledge (TOK) and the Extended Essay (EE) together award between 0 and 3 bonus points.</p>
      <p><strong>Maximum total: 6 subjects × 7 points = 42 + 3 bonus points = 45 points.</strong></p>

      <h2>How to Calculate Your Predicted IB Score Step by Step</h2>
      <ol>
        <li><strong>List your six subject predicted grades.</strong> Add them together. A student predicted 7, 7, 6, 6, 6, 6 scores 38 subject points.</li>
        <li><strong>Add your TOK and EE grades to the bonus matrix</strong> (see the table below). The combination determines your bonus: 0, 1, 2, or 3 points.</li>
        <li><strong>Sum subject points + bonus points.</strong> The result is your predicted IB diploma score.</li>
        <li><strong>Check the failing conditions</strong> (see below).</li>
      </ol>
      <p>Example: 7, 7, 7, 6, 6, 5 = 38 subject points. TOK grade A, EE grade B = 3 bonus points. Predicted total = <strong>41 points</strong>.</p>

      <h2>IB Bonus Points Matrix: TOK and Extended Essay</h2>
      <p>Your bonus depends on the letter grade you receive in both TOK and the EE (A highest to E lowest). An E in either TOK or EE is an automatic failing condition regardless of your total points.</p>

        <table>
          <caption>IB Bonus Points: TOK × EE Grade Combinations</caption>
          <thead>
            <tr>
              <th>EE \ TOK</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            <table style="border-collapse:collapse;width:100%"><tr><th>EE \\ TOK</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr><tr><td>A</td><td>3</td><td>3</td><td>2</td><td>2</td><td>Fail</td></tr><tr><td>B</td><td>3</td><td>2</td><td>2</td><td>1</td><td>Fail</td></tr><tr><td>C</td><td>2</td><td>2</td><td>1</td><td>0</td><td>Fail</td></tr><tr><td>D</td><td>2</td><td>1</td><td>0</td><td>0</td><td>Fail</td></tr><tr><td>E</td><td>Fail</td><td>Fail</td><td>Fail</td><td>Fail</td><td>Fail</td></tr></table>
              </tr>
            ))}
          </tbody>
        </table>


      <h2>IB Grade Boundaries: What They Are and Why They Change</h2>
      <p>Grade boundaries are the minimum raw marks required to achieve each grade from 1 to 7. They are set by the IB <em>after</em> each examination session by senior examiners who review the actual distribution of student scores. <strong>Grade boundaries are not fixed.</strong> A mark of 65% in one session might earn a grade 6, while the same mark earns a grade 7 in a harder paper.</p>

      <h3>Why Grade Boundaries Change Each Session</h3>
      <ul>
        <li><strong>Paper difficulty:</strong> If the May 2025 Mathematics HL paper was harder than May 2024, the boundary for grade 7 will typically drop.</li>
        <li><strong>Cohort performance:</strong> Statistical standardisation ensures grade distributions remain broadly consistent across years.</li>
        <li><strong>Curriculum changes:</strong> New syllabuses often produce boundary shifts in transition years.</li>
      </ul>

      <h3>Grade Boundary Trends 2022–2026</h3>
      <p>Mathematics Analysis and Approaches HL, Physics HL, and Economics HL frequently require 75–85% of available marks for a grade 7. Biology and Chemistry HL boundaries have been relatively stable. The post-pandemic 2022 session produced notable boundary drops; by 2025–2026 most subjects are tracking back toward pre-2020 historical norms.</p>

      <h2>What IB Score Do You Need for Top Universities?</h2>

      <h3>UK Universities</h3>
      <ul>
        <li><strong>Oxford and Cambridge:</strong> 38–40 points overall, with specific HL grade requirements (e.g., 7,7,6). Medicine typically requires 40–42 with 7s in Biology and Chemistry HL.</li>
        <li><strong>Imperial / UCL / LSE:</strong> 36–39 points with relevant HL grades of 6 or 7.</li>
        <li><strong>Russell Group generally:</strong> 32–36 points.</li>
      </ul>

      <h3>US Universities</h3>
      <ul>
        <li><strong>Ivy League:</strong> Most admitted IB students score 38–43. No formal cutoff but below 36 is rare in top-10 admitted pools.</li>
        <li><strong>Top-30 US:</strong> 34–40 points with strong HL performance in intended major area.</li>
      </ul>

      <h3>Other International</h3>
      <ul>
        <li><strong>University of Toronto / McGill:</strong> 32–36 for competitive programmes; 38+ for medicine.</li>
        <li><strong>ETH Zürich:</strong> 37–40 with strong Mathematics and Sciences HL.</li>
        <li><strong>NUS / NTU (Singapore):</strong> 38–43 for medicine and law; 34–38 for engineering and science.</li>
      </ul>

      <h2>Failing Conditions: When a High Score Doesn't Save You</h2>
      <ul>
        <li><strong>Grade E in either TOK or EE</strong> — automatic diploma failure.</li>
        <li><strong>CAS not completed</strong> — diploma failure regardless of academic scores.</li>
        <li><strong>Grade 1 in any subject</strong> — automatic failure.</li>
        <li><strong>Grade 2 in three or more subjects</strong> (HL or SL) — automatic failure.</li>
        <li><strong>A grade of 3 or lower awarded more than three times</strong> across the diploma — automatic failure.</li>
        <li><strong>Total subject score below 24 points</strong> — automatic failure.</li>
        <li><strong>Malpractice finding</strong> — diploma withdrawal.</li>
      </ul>

      <h2>Improve Your Essay Scores — Improve Your Diploma Total</h2>
      <p>The Extended Essay and TOK essay directly affect both your bonus points and your teacher's confidence in your predicted score. A weak EE draft can cost you up to 3 bonus points and reduce your predicted grade — a double penalty at the worst possible time.</p>
      <p><a href="/essay">IBLens analyses your IB essay against the official criteria and shows you exactly where marks are being lost →</a></p>
</main>`,

  "/resources/ib-extended-essay-help": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Extended Essay Help</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Extended Essay Help</h1>
  <p>
        If you have typed "write my extended essay" or "help with IB extended essay"
        into a search bar at 11pm, you are not alone. The Extended Essay is the longest
        piece of academic writing most IB students have ever attempted, and it is easy
        to get stuck — not because you are not capable, but because you are not sure
        what "good enough" actually looks like. This guide explains the most common
        reasons students get stuck, what you can realistically do to get unstuck, and
        what kind of help is actually worth pursuing.
      </p>

      <h2>Why the Extended Essay Feels Impossible (And Why It Isn't)</h2>

      <h3>You don't have a focused enough research question</h3>
      <p>
        The most common reason IB students stall on their EE is that their research
        question is too broad to answer in 4000 words. "What is the impact of social
        media on mental health?" cannot be answered rigorously in a 4000-word essay.
        "To what extent does passive Instagram scrolling increase self-reported anxiety
        scores among female secondary school students in [your city]?" is a question
        you could actually investigate with a survey and secondary literature.
      </p>
      <p>
        If you are stuck, the first thing to do is not write more — it is to narrow
        your question until it is specific enough to answer. Your supervisor's main
        job during the EE process is to help you with exactly this. Book a meeting
        and come with three versions of your question, each narrower than the last.
      </p>

      <h3>You have research but don't know how to structure an argument</h3>
      <p>
        Many students have read enough sources to fill 8000 words — they just don't
        know how to organise it into a coherent argument. The structure that works for
        almost every EE subject is:
      </p>
      <ol>
        <li><strong>Introduction:</strong> State your research question, define key terms, outline the scope of your investigation and how you will answer it. (~300–400 words)</li>
        <li><strong>Background / context:</strong> Give the reader the minimum context they need to understand your argument. This is not a literature review — it is setup. (~400–600 words)</li>
        <li><strong>Body:</strong> 2–4 focused sections, each making one clear point that advances your answer. Each section presents evidence, analyses it, and connects it back to your research question. (~2000–2500 words)</li>
        <li><strong>Conclusion:</strong> Answer your research question directly. State what your investigation showed, acknowledge its limitations, and note what further research would be needed. (~300–400 words)</li>
      </ol>
      <p>
        If you outline your essay to this structure before writing, the blank page
        problem mostly disappears. You are not writing an essay — you are filling
        in sections you have already planned.
      </p>

      <h3>You don't know what the examiner wants</h3>
      <p>
        The IB Extended Essay is marked on six criteria. Most students do not study
        these criteria carefully, which means they cannot calibrate their writing to
        meet the examiner's expectations. The criteria are:
      </p>
      <ul>
        <li><strong>Criterion A — Focus and Method (6 marks):</strong> Is the research question clear? Is the methodology appropriate for answering it?</li>
        <li><strong>Criterion B — Knowledge and Understanding (6 marks):</strong> Does the student demonstrate understanding of the subject area and relevant theory?</li>
        <li><strong>Criterion C — Critical Thinking (12 marks):</strong> Is the analysis developed, original, and connected to the research question? Are conclusions supported by evidence?</li>
        <li><strong>Criterion D — Presentation (4 marks):</strong> Is the essay well-structured, properly formatted, and within the word limit?</li>
        <li><strong>Criterion E — Engagement (6 marks):</strong> Does the student demonstrate personal involvement in the investigation, intellectual curiosity, and reflective thinking in the RPPF?</li>
      </ul>
      <p>
        Criterion C (Critical Thinking) is worth 12 of 34 marks — more than any
        other single criterion. If you are not sure where your marks are going, start
        with your analysis sections: are you arguing, or are you describing?
      </p>

      <h2>What Your EE Supervisor Can (and Can't) Do</h2>
      <p>
        Your IB Extended Essay supervisor is assigned to give you guidance — but
        within specific limits set by the IBO. They can:
      </p>
      <ul>
        <li>Help you narrow and focus your research question</li>
        <li>Advise on appropriate sources and methodology</li>
        <li>Give general feedback on whether your argument is developing well</li>
        <li>Read one full draft and provide written or verbal feedback</li>
        <li>Confirm whether your essay is within the required guidelines</li>
      </ul>
      <p>
        They are not permitted to:
      </p>
      <ul>
        <li>Correct your grammar or edit your writing directly</li>
        <li>Tell you the mark your essay would receive</li>
        <li>Rewrite sections or substantially restructure your argument</li>
        <li>Give you more than one full supervised draft review</li>
      </ul>
      <p>
        This means that after your supervisor's draft feedback, you are largely on
        your own to implement changes — without knowing whether those changes
        actually improved your score on each criterion.
      </p>

      <h2>What Paying Someone to Write Your Essay Actually Costs You</h2>
      <p>
        This needs to be said plainly: submitting work written by someone else as
        your own is academic misconduct under IB regulations. If detected, the
        consequence is disqualification from the IB Diploma — not just a failing
        grade on the EE, but losing the diploma entirely. The IB uses plagiarism
        detection software and examiners are trained to identify writing that
        does not match a student's other assessed work. The risk is not worth it.
      </p>
      <p>
        Beyond the rule, there is a practical problem: an essay written by someone
        else cannot pass the Engagement criterion (Criterion E), which is partially
        assessed through your Reflection on Planning and Progress Form (RPPF). If
        the RPPF describes a personal intellectual journey that does not match the
        essay's content, examiners notice.
      </p>

      <h2>What Actually Works: Getting Feedback on Your Own Draft</h2>
      <p>
        The most effective intervention available to IB students — other than doing
        the work — is getting criterion-level feedback on a draft you wrote yourself.
        The difference between a 28/34 and a 34/34 Extended Essay is usually not
        "more research" or "better writing." It is knowing exactly which sections
        are weak on which criteria and fixing them before submission.
      </p>
      <p>
        The challenge is that your supervisor can only give one full draft review,
        and general feedback ("your analysis could be deeper") does not tell you where
        to make changes. What you need is specific, criterion-by-criterion feedback:
        "Your Criterion C score is limited because your argument in Section 2 describes
        the sources rather than analysing them. Here is what analytical writing looks
        like in contrast."
      </p>
      <p>
        That is what IBLens provides. Upload your Extended Essay draft and receive
        detailed feedback mapped to each IB criterion — the same rubric your examiner
        uses — so you know exactly what to improve before you submit.
      </p>
      <p>
        <a href="/essay">Get criterion-by-criterion feedback on your Extended Essay draft →</a>
      </p>

      <h2>Practical Tips to Get Unstuck Right Now</h2>
      <ul>
        <li><strong>Write a terrible first draft on purpose.</strong> Set a timer for 90 minutes and write from memory, without checking sources. You cannot edit a blank page. Get something on paper and then improve it.</li>
        <li><strong>Reverse-outline your current draft.</strong> Write one sentence summarising each paragraph as it currently exists. If any paragraph does not connect back to your research question, it is probably padding and can be cut or redirected.</li>
        <li><strong>Read the introduction and conclusion back-to-back.</strong> They should feel like they belong to the same essay. If the conclusion does not directly answer the question asked in the introduction, something in the middle went wrong.</li>
        <li><strong>Check your word count at the section level.</strong> If your background section is 1200 words and your analysis is 800, you have the proportions wrong. The analysis should be the longest section of the essay.</li>
        <li><strong>Ask your supervisor one specific question.</strong> Not "can you read my draft" but "is the methodology in Section 2 appropriate to answer my research question, and why or why not?" Specific questions get specific answers.</li>
      </ul>
</main>`,

  "/resources/ib-chemistry-ia-examples": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Chemistry IA Examples</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Chemistry IA Examples</h1>
  <p>
        The IB Chemistry Internal Assessment is a 10-hour scientific investigation
        worth 20% of your final grade. It is marked on the same five criteria as
        other Group 4 IAs — Personal Engagement, Exploration, Analysis, Evaluation,
        and Communication — but Chemistry brings specific challenges: quantitative
        data is expected, error calculations are required, and examiners have a low
        tolerance for vague methodology. This guide covers what high-scoring IB
        Chemistry IA examples look like, which investigation types work best, and
        where marks are most commonly lost.
      </p>

      <h2>How the IB Chemistry IA Is Marked</h2>
      <ul>
        <li><strong>Personal Engagement (2 marks):</strong> Evidence that the student shaped the investigation. A genuine question from their own experience, a non-standard variable, or an original data source earns this.</li>
        <li><strong>Exploration (6 marks):</strong> Clear research question, relevant background theory, correct identification of variables (independent, dependent, controlled), and a reproducible methodology.</li>
        <li><strong>Analysis (6 marks):</strong> Quantitative data processing (means, uncertainties, graphs), correct use of units, and a conclusion supported by the data. Error propagation is expected at HL.</li>
        <li><strong>Evaluation (6 marks):</strong> Specific assessment of methodological limitations, systematic and random errors, and concrete improvements. The most under-scored criterion.</li>
        <li><strong>Communication (4 marks):</strong> Clear structure, appropriate scientific notation, correct citations, and appropriate length (6–12 pages).</li>
      </ul>

      <h2>IB Chemistry IA Topics That Score Well</h2>

      <h3>1. Effect of concentration on reaction rate (colorimetry)</h3>
      <p>
        Rate kinetics is a core HL and SL topic. A well-executed version uses a
        colorimeter to measure absorbance at regular intervals, processes the data
        to determine rate constants, and — at HL — determines the order of reaction
        with respect to the varying reactant. The personal engagement mark comes from
        choosing a reaction with a real-world context: the bleaching of food dyes,
        the oxidation of ascorbic acid, or the iodine clock with household starch.
      </p>
      <p>
        <em>What separates a 7 from a 5:</em> Processing the data to produce a rate
        law expression (rate = k[A]ⁿ), including uncertainty bars on graphs, and
        discussing whether the deviation from expected order is due to temperature
        fluctuation or the colorimeter's detection limit.
      </p>

      <h3>2. Titration-based investigations</h3>
      <p>
        Acid-base or redox titrations are reliable but need a non-textbook angle to
        score Personal Engagement. Strong examples include: determining the vitamin C
        content of different apple varieties across a ripening period; comparing
        acidity of commercial kombucha brands; measuring iron(II) content in iron
        supplement tablets before and after air exposure. The methodology is
        standard — the originality comes from the context.
      </p>
      <p>
        For Analysis, calculating the percentage uncertainty of each piece of
        equipment (burette, pipette) and propagating those through to the final
        result is expected. Students who report only "the percentage error was 3%"
        without showing the calculation source lose Analysis marks.
      </p>

      <h3>3. Effect of temperature on equilibrium position (Le Chatelier's principle)</h3>
      <p>
        Investigating the equilibrium between NO₂ and N₂O₄, or the cobalt(II)
        chloride equilibrium in different solvents, allows a student to measure
        colour change quantitatively using a colorimeter and apply Le Chatelier's
        principle. A strong version compares experimental equilibrium constants
        at different temperatures with literature values for ΔH, and discusses
        why the observed shift matches (or doesn't match) the exothermic/endothermic
        prediction.
      </p>

      <h3>4. Electrochemistry — cell potential investigations</h3>
      <p>
        Measuring electrochemical cell potentials using different metal electrodes
        or concentrations allows for comparison with standard electrode potentials
        from data tables. Using the Nernst equation at HL to predict how cell
        potential should vary with concentration, then comparing this to measured
        values, produces rich data for both Analysis and Evaluation. Personal
        engagement comes from choosing electrode combinations with a practical
        context (batteries in consumer electronics, corrosion of specific metals).
      </p>

      <h3>5. Chromatography and separation science</h3>
      <p>
        Paper chromatography or TLC to identify components of natural dyes, food
        colouring, or plant pigments is accessible and visually clear. The
        quantitative measure is the Rf value; a strong IA compares calculated
        Rf values to literature values across different solvent systems, discusses
        polarity effects on separation, and proposes which solvent system would
        be optimal for a specific application.
      </p>

      <h2>The Most Common Reasons Chemistry IAs Score Below a 6</h2>

      <h3>Insufficient replicates</h3>
      <p>
        Chemistry examiners expect a minimum of five trials per condition to
        calculate a meaningful standard deviation. Three replicates produce a
        standard deviation that is statistically unreliable. If you have five
        conditions (five concentrations, five temperatures) × five replicates,
        that is 25 data points — achievable in a 10-hour IA. Students who run
        three replicates because they ran out of time are losing Analysis marks
        that are very easy to earn.
      </p>

      <h3>Random errors treated as systematic errors (or vice versa)</h3>
      <p>
        A common Evaluation error is writing "there were errors in my measurements"
        without distinguishing between random error (scatter around the mean,
        reduced by averaging) and systematic error (consistent bias in one
        direction, not fixed by averaging). A colorimeter that was not zeroed
        correctly produces systematic error. Temperature fluctuations during
        titration produce random error. Each requires a different improvement —
        and examiners can tell whether the student understands the distinction.
      </p>

      <h3>Conclusions that don't reference the data</h3>
      <p>
        "The results supported the hypothesis" is not a conclusion. "The reaction
        rate constant k increased from 0.023 s⁻¹ at 25°C to 0.091 s⁻¹ at 45°C,
        consistent with the Arrhenius equation prediction and within the range
        reported by [source]" is a conclusion. Every number in your conclusion
        should be traceable to a row in your data table.
      </p>

      <h3>Evaluation that lists errors without quantifying their effect</h3>
      <p>
        Examiners want to know the <em>direction and magnitude</em> of each
        limitation's effect. "The water bath fluctuated by ±1.5°C. Since the
        rate constant is exponentially sensitive to temperature (from the Arrhenius
        equation), this represents approximately a 12% variation in rate constant
        at the temperatures used, which explains the scatter visible in the graph
        at higher temperatures" — that is developed evaluation. "The temperature
        was not perfectly controlled" is not.
      </p>

      <h2>Uncertainty Calculations: What's Actually Required</h2>
      <p>
        IB Chemistry explicitly requires uncertainty propagation. The basics:
      </p>
      <ul>
        <li>Record absolute uncertainty for every instrument (e.g., burette: ±0.05 cm³ per reading, so ±0.10 cm³ per titre).</li>
        <li>For addition/subtraction: add absolute uncertainties.</li>
        <li>For multiplication/division: add percentage uncertainties.</li>
        <li>Report final results with appropriate significant figures and absolute uncertainty.</li>
        <li>Compare your percentage uncertainty to your percentage error (difference between experimental and literature values). If your percentage error exceeds your calculated uncertainty, there is a systematic error — this is worth discussing in Evaluation.</li>
      </ul>

      <h2>How to Get Criterion-Level Feedback on Your Chemistry IA</h2>
      <p>
        The difference between a Chemistry IA that scores 18/24 and one that scores
        22/24 is usually two specific marks on Evaluation and one on Analysis. These
        are not visible from a general read-through — they require mapping each
        paragraph against the criterion descriptors to identify exactly what is
        missing.
      </p>
      <p>
        IBLens analyses your IB IA or essay against the official marking criteria
        and shows you precisely where marks are being lost — before your teacher
        submits your moderated grade.
      </p>
      <p>
        <a href="/essay">Upload your Chemistry IA draft to IBLens for rubric-based feedback →</a>
      </p>
</main>`,

  "/resources/ib-physics-ia-examples": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Physics IA Examples</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Physics IA Examples</h1>
  <p>
        The IB Physics Internal Assessment is a practical investigation worth 20%
        of your final grade. Physics IAs are particularly unforgiving on data
        quality: examiners expect quantitative analysis, proper uncertainty
        propagation, and graphs that are correctly processed. A student who
        designs a clever investigation but takes sloppy data will score lower
        than a student who runs a simpler experiment with rigorous measurement.
        This guide covers which IB Physics IA topics produce reliable high scores
        and what the marking criteria actually require.
      </p>

      <h2>Marking Criteria Overview</h2>
      <ul>
        <li><strong>Personal Engagement (2 marks):</strong> A genuine personal motivation for the investigation. The most credible evidence is a non-standard choice of variable, a context from the student's own life, or an original approach to a known phenomenon.</li>
        <li><strong>Exploration (6 marks):</strong> Research question, background theory, identified variables (IV, DV, controlled), and a methodology detailed enough to be reproduced.</li>
        <li><strong>Analysis (6 marks):</strong> Processed data with uncertainties, appropriate graphs (often linearised), and a conclusion with a comparison to expected values or theory.</li>
        <li><strong>Evaluation (6 marks):</strong> Specific, directional assessment of limitations and improvements. Random vs systematic error distinction. This is where most marks are lost.</li>
        <li><strong>Communication (4 marks):</strong> Clear structure, correct physics notation, appropriate length.</li>
      </ul>

      <h2>IB Physics IA Examples That Score Well</h2>

      <h3>1. Simple harmonic motion — spring constant or pendulum period</h3>
      <p>
        Investigating how the period of a spring-mass system varies with mass
        (T = 2π√(m/k)) is a clean, quantitative Physics IA. The key to a high
        score is linearisation: plot T² vs m and fit a straight line, extracting
        k from the gradient. This demonstrates mathematical processing (Analysis
        criterion) beyond simply plotting T vs m. Adding error bars on both axes
        and a best-fit/worst-fit line analysis to determine uncertainty in k pushes
        the Analysis score to 5 or 6.
      </p>
      <p>
        Personal Engagement: investigate the spring constant of a specific object
        with physical meaning — the spring in a retractable pen, a bungee cord
        sample, a guitar string under tension. This transforms a textbook lab into
        an original investigation.
      </p>

      <h3>2. Optics — focal length of lenses using the lens equation</h3>
      <p>
        Measuring image and object distances for convex lenses and applying 1/f =
        1/v + 1/u is a reliable method. A strong version linearises the equation
        (plot 1/v vs 1/u, extract f from the intercepts), compares the experimental
        focal length to the manufacturer's specification, and discusses how lens
        aberrations affect accuracy at small object distances. Personal engagement:
        use lenses from a real optical system — reading glasses, a camera lens,
        a magnifying glass from a specific application.
      </p>

      <h3>3. Projectile motion and drag</h3>
      <p>
        Investigating how launch angle or initial speed affects range — and then
        extending to quantify the effect of air resistance — is engaging and
        produces good data. Video analysis (using Tracker or equivalent software)
        allows frame-by-frame position measurement, making the velocity and
        acceleration calculations rigorous. A student who extracts a drag
        coefficient from the data and compares it to expected values for the
        projectile's shape earns strong Analysis and Evaluation marks.
      </p>

      <h3>4. Electromagnetic induction — Faraday's law</h3>
      <p>
        Dropping a magnet through a coil and measuring the induced EMF as a
        function of magnet speed, coil turns, or magnet strength directly
        tests Faraday's law (EMF = -dΦ/dt). This works well because it generates
        multiple measurable variables, is quantitatively predictable, and the
        deviations from ideal behaviour (flux leakage, finite coil resistance)
        provide rich Evaluation content. A data logger or oscilloscope makes
        the measurement precise; a smartphone with a magnetometer app can substitute
        in a resource-limited school.
      </p>

      <h3>5. Specific heat capacity of metals or liquids</h3>
      <p>
        Measuring specific heat capacity by electrical heating (E = mcΔT) is
        accessible, quantitative, and directly comparable to literature values.
        The investigation is most original when applied to a non-standard material:
        different cooking oils, metals from specific alloys, or composite materials.
        The systematic error from heat loss to the surroundings is significant and
        must be addressed in Evaluation — either by applying a cooling correction
        or by estimating the heat loss rate and showing its effect on the result.
      </p>

      <h2>Linearisation: The Most Important Analysis Skill</h2>
      <p>
        Physics IAs almost always involve a relationship between two variables that
        is not linear in its raw form. Examiners reward students who linearise their
        graphs because it demonstrates understanding of the underlying physics.
      </p>
      <p>Common linearisations in IB Physics:</p>
      <ul>
        <li>T = 2π√(L/g) → plot T² vs L to get a straight line with gradient 4π²/g</li>
        <li>E = hf - φ → plot maximum kinetic energy vs frequency (photoelectric effect)</li>
        <li>I = I₀e^(-μx) → plot ln(I) vs x to get a straight line with gradient -μ</li>
        <li>v² = u² + 2as → plot v² vs s to get gradient 2a</li>
        <li>P = IV → if investigating resistance, plot V vs I to confirm linearity (Ohm's law)</li>
      </ul>
      <p>
        Once linearised, use the gradient and intercept to extract physical constants,
        then compare to accepted values and calculate percentage error.
      </p>

      <h2>Uncertainty Analysis: What Examiners Actually Want</h2>
      <p>
        The single most common reason Physics IAs score Analysis = 3 or 4 instead
        of 5 or 6 is incomplete uncertainty handling. What examiners expect:
      </p>
      <ol>
        <li>Record absolute uncertainty for every measuring instrument (ruler: ±0.5 mm, stopwatch: ±0.1 s, digital balance: ±0.01 g).</li>
        <li>Calculate absolute uncertainty of derived quantities using propagation rules.</li>
        <li>Plot error bars on graphs (both x and y if both have significant uncertainty).</li>
        <li>Draw a best-fit line AND a worst-case line (max gradient, min gradient) to determine the uncertainty in any gradient you extract.</li>
        <li>Express the final result as value ± uncertainty with appropriate significant figures.</li>
        <li>Compare your percentage uncertainty to your percentage error from the accepted value — and explain the discrepancy if they differ significantly.</li>
      </ol>

      <h2>Evaluation: How to Write It Well</h2>
      <p>
        The Evaluation criterion rewards students who go beyond listing errors to
        actually analysing them. The structure that consistently earns 5–6 marks:
      </p>
      <ul>
        <li><strong>Identify the limitation specifically:</strong> Not "human error" — name the exact source (parallax reading a ruler, air currents in the lab, temperature drift during a 30-minute experiment).</li>
        <li><strong>State whether it is random or systematic:</strong> Random errors increase scatter; systematic errors shift all values in one direction.</li>
        <li><strong>Quantify the effect where possible:</strong> "The temperature rose by 2°C during the experiment; using the temperature coefficient of resistance for copper, this introduces a systematic 0.8% error in resistance."</li>
        <li><strong>Propose a concrete improvement:</strong> Not "be more careful" — identify a specific change (use a thermostatically controlled enclosure, replace the stopwatch with a light gate, use a digital vernier instead of a ruler) and explain why it would reduce that specific error.</li>
      </ul>

      <h2>Get Feedback Before Your Teacher Submits</h2>
      <p>
        Physics IA marks are often lower than students expect because the gap between
        "correct experiment" and "correct report" is larger than it appears. A well-run
        investigation with poorly presented uncertainty analysis or vague Evaluation
        loses 4–6 marks needlessly.
      </p>
      <p>
        IBLens analyses your Physics IA against the official IB marking rubric and
        identifies exactly where marks are being lost on each criterion — before your
        teacher finalises the moderated submission.
      </p>
      <p>
        <a href="/essay">Upload your Physics IA draft to IBLens for rubric-based feedback →</a>
      </p>
</main>`,

  "/resources/ib-psychology-ia": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Psychology IA</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Psychology IA</h1>
  <p>
        The IB Psychology Internal Assessment is a replication study: you choose an
        existing published psychological study, adapt it for an ethical school setting,
        collect data from a minimum of ten participants per condition, and write a
        formal report in the style of a scientific paper. It is worth 25% of your
        final grade at SL and 20% at HL. Unlike other IB IAs, Psychology explicitly
        requires you to replicate an existing study rather than design a completely
        original experiment — and this constraint is both an advantage and a challenge.
      </p>

      <h2>The Four Sections of the IB Psychology IA Report</h2>
      <p>
        The Psychology IA has a specific required structure that differs from other
        Group 3 IAs. The four sections and their approximate word allocations are:
      </p>
      <ul>
        <li><strong>Introduction (approx. 200–300 words):</strong> Background to the original study, explanation of the research question and aim, and a clear directional hypothesis (one-tailed or two-tailed).</li>
        <li><strong>Exploration (approx. 200–350 words):</strong> Design of your study — independent variable, dependent variable, controls, sampling method, ethical considerations (including informed consent and right to withdraw).</li>
        <li><strong>Analysis (approx. 150–250 words):</strong> Descriptive statistics (means, standard deviations) presented in a table, an appropriate graph, and the result of an inferential test.</li>
        <li><strong>Evaluation (approx. 200–350 words):</strong> Comparison of your results to the original study, discussion of limitations, and suggested improvements.</li>
      </ul>
      <p>
        Total word limit: 1500–2200 words (not including references, raw data in
        appendix, or participant consent forms). Staying within the word limit is
        itself assessed under Communication.
      </p>

      <h2>Choosing the Right Study to Replicate</h2>
      <p>
        The choice of original study determines how straightforward your IA will be.
        A good replication study for the IB Psychology IA has four properties:
      </p>
      <ol>
        <li><strong>Simple, operationalisable IV and DV:</strong> The independent variable must be something you can manipulate in a school setting (two word lists, two images, two conditions) and the dependent variable must be measurable numerically (number of words recalled, response time in seconds, rating on a scale).</li>
        <li><strong>Ethical with secondary school participants:</strong> Studies involving deception are acceptable if debriefing is provided, but anything involving stress induction, deception about a participant's health or performance, or sensitive topics (eating, depression, self-esteem) requires especially careful ethical planning.</li>
        <li><strong>Accessible to replicate with ≥10 participants per condition:</strong> A study requiring clinical populations, specific age groups you cannot access, or expensive equipment is unsuitable.</li>
        <li><strong>An expected result that is testable with a Mann-Whitney U test or Wilcoxon signed-rank test:</strong> These are the two inferential tests specified in the IB Psychology course. Your study design must produce data suited to one of them.</li>
      </ol>

      <h2>IB Psychology IA Study Examples That Work Well</h2>

      <h3>1. Replication of Loftus and Palmer (1974) — leading questions and eyewitness memory</h3>
      <p>
        Show participants a short video clip of an everyday event (not a car crash —
        less distressing). Vary the verb in a critical question ("How fast was the
        car going when it <em>contacted/smashed into</em> the other vehicle?").
        Compare estimated speeds between the two conditions. This is a between-subjects
        design; use the Mann-Whitney U test. Well understood, easy to run, clear results.
      </p>

      <h3>2. Replication of Stroop (1935) — cognitive interference</h3>
      <p>
        Create two word lists: colour words printed in a congruent colour (RED in red)
        and the same words printed in an incongruent colour (RED in blue). Measure
        time to name the ink colour for each list. This is a within-subjects design;
        use the Wilcoxon signed-rank test. Response time is the DV — measurable with
        a stopwatch, no specialist equipment needed.
      </p>

      <h3>3. Replication of Miller (1956) — the magical number 7 and working memory capacity</h3>
      <p>
        Give participants a sequence of random digits (lists of varying length: 5, 7,
        9, or 11 digits) to recall immediately. Measure accuracy by list length. A
        simpler version: compare recall accuracy for a 7-item list vs a 11-item list
        (between subjects). This directly tests Miller's claim about working memory
        capacity limits. Easy to standardise, clear ethical picture.
      </p>

      <h3>4. Replication of Craik and Lockhart (1972) — levels of processing</h3>
      <p>
        Present participants with a word list under two encoding conditions: one group
        answers shallow questions about each word (is it in capital letters?), the
        other answers deep questions (does it fit in the sentence "I saw a ___ in the
        park"?). Measure free recall after a distractor task. Between-subjects design;
        Mann-Whitney U test. This directly tests the levels of processing effect.
      </p>

      <h2>The Statistical Test: Mann-Whitney U vs Wilcoxon</h2>
      <p>
        IB Psychology requires one of two non-parametric tests. Choosing correctly
        is assessed under Analysis:
      </p>
      <ul>
        <li><strong>Mann-Whitney U test:</strong> Use when you have two separate groups of participants (between-subjects / independent measures design). Your two groups are independent — no participant appears in both conditions.</li>
        <li><strong>Wilcoxon signed-rank test:</strong> Use when the same participants take part in both conditions (within-subjects / repeated measures design). Each participant's two scores are paired.</li>
      </ul>
      <p>
        Calculate the test statistic by hand (the IB requires this) and compare to
        the critical value table at p ≤ 0.05. State whether you reject or retain the
        null hypothesis. Do not interpret a non-significant result as "the study
        failed" — a non-significant result still has things to say about the original
        study, your methodology, and the population you sampled.
      </p>

      <h2>Ethical Considerations: More Than a Checkbox</h2>
      <p>
        The Psychology IA requires explicit ethical planning — informed consent, right
        to withdraw, confidentiality, and debriefing. These are not formalities:
        examiners check whether your ethical procedures were actually appropriate for
        the study you ran. Common problems:
      </p>
      <ul>
        <li>Informed consent forms that describe the study so specifically that they prime participants — defeating the purpose of any deception. Solution: describe the general topic (a study about memory) without revealing the specific hypothesis.</li>
        <li>Studies run on friends or classmates without a genuine right to withdraw — social pressure makes "you can leave at any time" meaningless. Note this in Evaluation as a limitation.</li>
        <li>No debriefing documented. Debriefing must explain what the study was actually testing and why any deception (if used) was necessary.</li>
      </ul>

      <h2>Evaluation: The Most Commonly Under-Scored Section</h2>
      <p>
        Psychology IA Evaluation requires you to do three things, and most students
        only do one:
      </p>
      <ol>
        <li><strong>Compare your results to the original study:</strong> Did you replicate the finding? If not, why might the results differ? Consider participant demographics, cultural context, the specific stimuli used.</li>
        <li><strong>Identify and explain specific limitations of your design:</strong> Convenience sampling (you used your classmates — how might this affect generalisability?), demand characteristics, social desirability, order effects if within-subjects.</li>
        <li><strong>Propose concrete improvements:</strong> Not "use more participants" without justification — specify how many, why that number, and what statistical power that would give you. A specific suggested modification to reduce a named confound is much stronger than a general statement.</li>
      </ol>

      <h2>Before Your Supervisor Reads Your Final Draft</h2>
      <p>
        Psychology IA marks are largely determined before the moderator sees the
        work — your supervisor's assessment is moderated but is usually close to
        the final mark. Getting criterion-by-criterion feedback before your
        supervisor finalises their mark is the highest-leverage intervention
        available to you.
      </p>
      <p>
        IBLens analyses your Psychology IA report against the official IB marking
        criteria and tells you exactly what each criterion needs to reach the next
        mark band — before it is too late to change anything.
      </p>
      <p>
        <a href="/essay">Upload your Psychology IA draft to IBLens for rubric-based feedback →</a>
      </p>
</main>`,

  "/resources/ib-university-admissions-strategy": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB University Admissions Strategy</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB University Admissions Strategy</h1>
  <p>
        Getting into a great university as an IB student is not just about hitting a
        number. Admissions offices in the UK, US, Canada, the Netherlands, Australia,
        and Singapore each read your IB Diploma differently — and the decisions you made
        in Grade 11 about Higher Level subjects, your Extended Essay topic, and even your
        TOK essay already shape which doors are open to you now. This guide walks through
        every stage of IB university admissions strategy, from building a realistic school
        list to submitting a polished application.
      </p>

      <h2>Step 1 — Build a Balanced University List</h2>
      <p>
        The single most common mistake IB students make is applying to too many
        reaches and too few realistic options. A well-structured list has three tiers.
      </p>

      <h3>Reach Schools (20–30% admission probability)</h3>
      <p>
        These are universities where your predicted grades and profile sit at or slightly
        below the typical admitted student. For IB applicants that usually means 40+ total
        points for places like Imperial College London, ETH Zurich, or MIT. Apply to
        reaches, but never rely on them. Limit yourself to two or three — every application
        costs time that should go into the essays for realistic targets.
      </p>

      <h3>Target Schools (50–70% admission probability)</h3>
      <p>
        Your predicted score comfortably meets the published IB requirements and your
        subject choices align with the program. For most IB students this is the bulk of
        the list — four to six universities. Research the median admitted IB score, not
        just the minimum. A university that "accepts 30 points" may in practice offer
        places almost exclusively to students with 36+.
      </p>

      <h3>Safety Schools (80%+ admission probability)</h3>
      <p>
        A safety school you would genuinely attend if every target rejected you. It should
        meet your needs academically and financially. Include at least two. International
        students often skip this step and end up with no offers — do not do this.
      </p>

      <h2>Step 2 — How IB Scores Translate by Country</h2>
      <p>
        IB diploma university requirements vary significantly across systems. Knowing the
        actual conversion prevents both over-confidence and unnecessary pessimism.
      </p>

      <h3>United Kingdom</h3>
      <p>
        UK universities publish IB offers in total points and HL grade combinations
        simultaneously. A typical Russell Group offer might read "38 points including 6,6,6
        at HL." You must meet both the total and the subject conditions — a 39 with 5,6,6
        at HL will usually not satisfy a 38/6,6,6 offer. Medicine, law, and Oxbridge
        regularly require 38–42 points. Many mid-tier universities accept 30–32. Apply via
        UCAS; the deadline for Oxford and Cambridge is 15 October, all other courses
        31 January.
      </p>

      <h3>United States</h3>
      <p>
        US universities do not publish IB cutoffs because admissions is holistic. However,
        a 38+ diploma with strong HL results significantly strengthens any application. Many
        universities grant credit for HL scores of 5, 6, or 7 — at some schools a 7 in HL
        Calculus can exempt you from a first-year math requirement. Submit IB predicted grades
        with your Common App; official scores follow in July. Early Decision/Early Action
        deadlines are typically 1 November, Regular Decision 1 January.
      </p>

      <h3>Canada</h3>
      <p>
        Canadian universities convert IB scores to their internal percentage scales. UBC
        and University of Toronto are the most IB-literate. A 36-point diploma typically
        converts to an 88–92% average at most schools, which is competitive for most
        programs. Engineering and computer science at top schools expect scores in the
        37–40 range. Apply through the provincial portal (OUAC for Ontario, direct for
        UBC/SFU) with deadlines between November and February depending on province.
      </p>

      <h3>Netherlands</h3>
      <p>
        Dutch universities accept the IB diploma directly. Most bachelor's programs
        (numerus fixus aside) admit students who hold a full diploma with at least 24
        points. Competitive numerus fixus programs like medicine and psychology use a
        weighted lottery or GPA threshold — check each university's specific decentrale
        selectie criteria. Amsterdam, Delft, and Groningen all have strong IB communities
        and publish specific subject requirements online.
      </p>

      <h3>Australia</h3>
      <p>
        Australian institutions convert IB scores to an ATAR equivalent. A 45-point
        diploma converts to an ATAR of 99.95; 40 points maps to roughly 96–97. The Group
        of Eight universities (Melbourne, Sydney, ANU, etc.) require ATARs of 85–99+
        depending on the program. Apply through UAC (NSW/ACT), VTAC (Victoria), or TISC
        (WA) with deadlines in September–October for the following year intake.
      </p>

      <h3>Singapore</h3>
      <p>
        NUS and NTU accept the IB diploma and publish minimum grade requirements per
        faculty. NUS Medicine requires a near-perfect score; business and engineering
        programs typically start from 37–38 points. Singapore Management University also
        accepts IB. All three use their own application portals; the typical deadline for
        Singapore universities is February for August intake.
      </p>

      <h2>Step 3 — Subject Choices That Lock In or Lock Out Programs</h2>
      <p>
        HL subject selection is the most consequential academic decision IB students make,
        and it directly affects IB university admissions strategy.
      </p>

      <h3>STEM programs</h3>
      <p>
        Engineering, computer science, and physics programs at competitive universities
        almost universally require HL Mathematics (Analysis and Approaches, not
        Applications and Interpretation) and at least one HL science. If you took
        Mathematics: Applications and Interpretation at HL, some UK and Dutch engineering
        programs will reject your application regardless of your total score. Verify this
        requirement before your subject choices are finalised in Year 1.
      </p>

      <h3>Medicine and life sciences</h3>
      <p>
        HL Biology and HL Chemistry are typically required for medicine in the UK and
        Australia. Some schools additionally require or strongly prefer HL Physics. A 6
        in HL Chemistry with a 7 in SL Biology is usually not acceptable as a substitute
        for HL Biology — the requirement is specifically at Higher Level.
      </p>

      <h3>Business, economics, and social sciences</h3>
      <p>
        These programs rarely impose strict HL requirements but reward strong performance
        in HL Economics, HL Mathematics, or HL History. For LSE and Warwick Economics, HL
        Mathematics AA with a 6 or 7 is a genuine differentiator. If you intend to apply to
        top business programs, take Math AA HL rather than Math AI HL.
      </p>

      <h3>Humanities and law</h3>
      <p>
        Law programs at Oxbridge, LSE, and top Canadian universities have no mandatory
        subject requirements but look closely at HL English and HL History or Philosophy.
        Strong extended reading and clear writing — which the Extended Essay develops — are
        explicit evaluation criteria.
      </p>

      <h2>Step 4 — Application Timelines: UCAS, Common App, and Direct</h2>
      <p>
        Running multiple application systems in parallel is manageable but requires
        deliberate planning starting in April of your Year 2.
      </p>

      <h3>April–June (Year 2)</h3>
      <p>
        Research and finalise your school list. Request predicted grades from your IB
        coordinator and teachers — these are typically locked in September and are
        difficult to revise upward. Discuss your list with your coordinator: they know
        what grade predictions your school is likely to issue and whether a 40-point
        prediction is realistic given your Year 1 performance.
      </p>

      <h3>July–August</h3>
      <p>
        Draft all personal statement and supplemental essay content. Common App opens
        1 August. For UCAS, use the summer to write your personal statement (maximum
        4,000 characters — shorter than most US essays). Have multiple people review it
        before September.
      </p>

      <h3>September–October</h3>
      <p>
        Confirm predicted grades with your school. Submit Oxbridge and medicine
        applications by 15 October via UCAS. Begin submitting US Early Decision/Early
        Action applications. Sit any required admissions tests: LNAT, MAT, BMAT, SAT.
      </p>

      <h3>November–January</h3>
      <p>
        Regular Decision US applications due (1 January for most). Remaining UCAS
        applications due 31 January. Canadian university deadlines fall in this window.
        Australian and Singapore applications are typically already submitted by now.
      </p>

      <h2>Step 5 — The Extended Essay and TOK: More Than Just Points</h2>
      <p>
        The IB awards up to 3 bonus points for the combined EE and TOK matrix. At the
        boundary between an offer and a rejection — which is where most competitive
        applications sit — those three points matter. But the Extended Essay and TOK
        also affect IB university admissions in two less obvious ways.
      </p>

      <h3>EE subject alignment</h3>
      <p>
        Writing your Extended Essay in the subject you intend to study at university is a
        genuine signal to admissions tutors. A strong EE in Economics signals intellectual
        initiative to LSE. A chemistry EE with a well-designed experiment shows a UK
        medical school that you can think independently. A weak EE in an unrelated subject
        says nothing useful. Choose your EE topic with your intended major in mind.
      </p>

      <h3>TOK as writing evidence</h3>
      <p>
        For US applications, the TOK essay is rarely submitted directly — but the skills
        it builds (structuring an argument, acknowledging counterarguments, citing
        evidence) are exactly what strong Common App supplemental essays require. Students
        who engage seriously with TOK write better personal statements. Do not treat TOK
        as a box-ticking exercise.
      </p>

      <h3>EE grade and the UCAS personal statement</h3>
      <p>
        UK universities receive your predicted grades but not your EE grade at application
        time. Mention your EE topic in your UCAS personal statement if it is relevant to
        your course — admissions tutors value research experience, and a well-described
        EE can distinguish a 38-point application from another 38-point application.
      </p>

      <h2>Step 6 — Red Flags to Avoid in IB University Applications</h2>

      <h3>Predicted grades that contradict subject grades</h3>
      <p>
        If your Year 1 average in Chemistry is a 4 but your predicted grade is a 7, an
        experienced admissions tutor will notice. Predicted grades that are implausibly
        high relative to your track record damage credibility. Work to earn honest high
        predictions rather than asking teachers to inflate them.
      </p>

      <h3>Mismatched subject choices and stated interests</h3>
      <p>
        Applying to study Economics at a top university while your HL subjects are
        Art, Theatre, and Language B raises questions. If your choices do not align, your
        personal statement must explain why — a genuine passion for self-directed learning
        in economics, demonstrable outside school, can bridge the gap. A vague explanation
        cannot.
      </p>

      <h3>Generic personal statements and supplemental essays</h3>
      <p>
        "I have always been fascinated by medicine" is the opening of thousands of UCAS
        personal statements. Admissions tutors read hundreds of applications per day.
        Concrete, specific, and analytical writing — the same skills your Internal
        Assessments and Extended Essay demand — separates strong applications from
        forgettable ones.
      </p>

      <h3>Submitting early with weak essays</h3>
      <p>
        Early Decision at a US university is binding. Submitting a weak application
        early because of deadline pressure is worse than submitting a strong one regular
        decision. If your essays are not ready by 1 November, use Regular Decision for
        those schools.
      </p>

      <h3>Ignoring country-specific requirements</h3>
      <p>
        Many international students discover too late that a specific HL subject was
        required — or that they needed to sit a university admissions test they were
        unaware of. Research requirements two years before applying, not two weeks before
        the deadline.
      </p>

      <h2>How Your IB Essay Scores Affect Predicted Grades — and Your Offers</h2>
      <p>
        IB predicted grades are issued by your teachers, but they are informed by your
        performance across all assessments — including Internal Assessments and the
        Extended Essay. Strong essay work signals to teachers that you can perform under
        exam conditions, which directly influences the grade they are willing to predict.
        A student whose essays are consistently well-structured, well-argued, and
        well-evidenced gets higher predictions than an equally capable student whose essays
        are disorganised.
      </p>
      <p>
        At IBLens, we analyse your IB essays against the official IB rubrics and identify
        exactly where marks are being lost — whether in criterion A (knowledge and
        understanding), criterion B (analysis and evaluation), or criterion C (use of
        examples). Our feedback is specific, rubric-aligned, and actionable. Students who
        improve their essay scores before the final assessment window improve their
        predicted grades. Improved predicted grades unlock stronger conditional offers.
      </p>
      <p>
        The chain is straightforward: better essays → higher predicted grades → better
        university offers.
      </p>

      <p>
        <a href="/essay">
          Upload your IB essay to IBLens and get detailed rubric-based feedback →
        </a>
      </p>

      <h2>Putting It Together: A Practical Checklist</h2>
      <ul>
        <li>
          <strong>Year 1, Term 2:</strong> Confirm your HL subjects align with intended
          programs. Check HL requirements for your top target universities now, not later.
        </li>
        <li>
          <strong>Year 1, Term 3:</strong> Choose an EE topic that supports your
          application narrative. Start reading for your TOK essay — do not leave both to
          Year 2.
        </li>
        <li>
          <strong>Year 2, April–May:</strong> Build your university list across reach,
          target, and safety tiers. Verify score requirements, subject requirements, and
          required admissions tests for each school.
        </li>
        <li>
          <strong>Year 2, June–August:</strong> Write and revise personal statements and
          supplemental essays. Use every IB essay submission as an opportunity to
          strengthen your writing — the same skills transfer directly.
        </li>
        <li>
          <strong>Year 2, September–October:</strong> Lock in predicted grades, submit
          Oxbridge and medicine applications, and begin US Early applications.
        </li>
        <li>
          <strong>Year 2, November–January:</strong> Complete remaining applications.
          Prepare for IB exams — your final scores determine whether conditional offers
          are confirmed.
        </li>
      </ul>

      <p>
        IB university admissions strategy is not a single decision — it is a sequence of
        decisions across two years, each one narrowing or expanding your options. The
        students who get into their target schools are not always the ones with the highest
        raw scores; they are the ones who understood the system early, made aligned
        choices, and executed their applications with precision.
      </p>
      <p>
        If you want to understand exactly where your IB essays stand against the rubric
        before your predicted grades are set,
        <a href="/essay">try IBLens now</a>.
      </p>
</main>`,

  "/resources/ib-ia-score-predictor": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB IA Score Predictor</nav>
  <h1>IB IA Score Predictor: How to Estimate Your Internal Assessment Grade</h1>
      <p>Every IB student reaches the same anxious moment: you've submitted your Internal Assessment, your teacher has awarded a mark, and now you're left wondering — <em>is that grade going to stick?</em> Understanding how IA grading actually works — and how to apply a systematic self-assessment — can get you surprisingly close to the real number before results day.</p>

      <h2>How IB Internal Assessment Grading Actually Works</h2>
      <h3>Stage 1: Teacher Marking</h3>
      <p>Your subject teacher marks your IA against an official mark scheme published by the IBO. Every criterion has a maximum score and a set of level descriptors. Raw marks vary by subject: Biology IAs are marked out of 24, Economics commentaries out of 45 (across three), Mathematics AIs out of 20, History IAs out of 25, Psychology IAs out of 22, and Chemistry IAs out of 24.</p>

      <h3>Stage 2: IBO Moderation</h3>
      <p>After teachers submit their marks, the IBO samples student work from each school — typically five students — and a trained moderator re-marks those samples independently. If the moderator consistently scores higher or lower than the teacher, the IBO applies a statistical adjustment to <em>all</em> marks from that school for that subject.</p>
      <p>This means your final moderated mark is not simply what your teacher gave you. If your school's teacher was systematically generous, your whole cohort might be scaled down. This is the most important thing to understand about IB IA grade prediction: your teacher's mark is an estimate, not a final score.</p>

      <h2>What Affects Your IA Score: Criteria by Subject</h2>

      <h3>Biology and Chemistry IA</h3>
      <p>Science IAs are assessed on five criteria: Personal Engagement (2 marks), Exploration (6), Analysis (6), Evaluation (6), and Communication (4). Exploration is where most students lose points — a weak research question cascades into problems in every subsequent criterion. Evaluation is the other common weak point: students frequently describe limitations without quantifying their impact or suggesting realistic improvements.</p>

      <h3>Economics IA</h3>
      <p>Students submit three commentaries assessed on Diagrams, Terminology, Application, Analysis, and Evaluation. Many students draw supply-and-demand diagrams and never explicitly explain what the shifts represent in terms of the article — this costs marks in both Diagrams and Analysis. Genuine evaluation requires considering different perspectives and stakeholder impacts, not simply restating analysis with "however" in front of it.</p>

      <h3>History IA</h3>
      <p>The Historical Investigation uses three sections. OPCVL analysis in Section A must go beyond surface observations. A source's limitation being "it might be biased" scores at the lower levels; explaining precisely how the author's position shaped what they omit scores at the top.</p>

      <h3>Psychology IA</h3>
      <p>Psychology IAs replicate a cognitive psychology study. The Introduction must include a clearly operationalised hypothesis. Discussion is where marks are most frequently dropped: students either fail to relate findings back to the original study or write conclusions that go far beyond what their small sample can support.</p>

      <h3>Mathematics IA</h3>
      <p>Assessed on Presentation, Mathematical Communication, Personal Engagement, Reflection, and Use of Mathematics. The Use of Mathematics criterion differentiates grades most sharply — the mathematics must be "precise, elegant, and demonstrates sophistication," meaning a genuinely non-trivial approach for your level.</p>

      <h2>How to Self-Assess Your IA: A Practical Method</h2>

      <h3>Step 1: Get the Official Mark Scheme</h3>
      <p>Download the Subject Guide and the Internal Assessment section for your subject from the IBO resources page via your school's MyIB login. Third-party rubrics are often paraphrased and imprecise.</p>

      <h3>Step 2: Mark Each Criterion Independently</h3>
      <p>Read your IA once for each criterion, ignoring all the others. If a descriptor uses the word "clearly," ask whether a moderator reading your work cold would find it clear.</p>

      <h3>Step 3: Apply the "Fit" Test</h3>
      <p>IBO level descriptors describe the <em>best fit</em> for a band, not a perfect match. This is the judgment call where self-assessment is hardest — most students are either over-generous or over-harsh.</p>

      <h3>Step 4: Sum Your Marks and Convert</h3>
      <p>Add up your criterion marks to get a raw total. Then use the most recent grade boundary table for your subject. Remember that grade boundaries shift each session — using boundaries from two or three years ago can mislead you by one grade.</p>

      <h3>Step 5: Factor in Moderation Uncertainty</h3>
      <p>If your raw mark sits near a grade boundary, you are in the highest-risk zone. A moderation adjustment of ±2 marks is common; adjustments of ±4 or more are possible. Students near boundaries should treat their estimated grade as a range: the grade they calculate, plus or minus one.</p>

      <h2>Why Predicted IA Grades Change After Moderation</h2>
      <p>In most sessions, a majority of schools receive some adjustment. The variance is higher in subjects with more subjective criteria — History and Psychology IAs tend to see wider adjustment ranges than Chemistry or Maths IAs. Two factors drive large adjustments: teacher inexperience with IB marking standards, and grade inflation pressure from knowing students personally.</p>

      <h2>Get Your IA Analyzed by AI</h2>
      <p>Self-assessment has a fundamental limitation: you can't read your own work the way a stranger would. You know what you meant to say, which makes it hard to see where you failed to say it clearly enough to earn a mark.</p>
      <p><a href="/essay">IBLens analyses your Internal Assessment against the official mark scheme criteria</a> — giving you a criterion-by-criterion breakdown that identifies where your work is strong and where it's losing marks, with a predicted score range explained in detail. It's the closest thing to having an experienced IB examiner read your draft before you submit.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Can I predict my IB IA score before my teacher marks it?</h3>
      <p>Yes — by self-assessing against the official mark scheme descriptors, criterion by criterion. The challenge is objectivity: you know your work too well to read it the way a moderator would.</p>

      <h3>How much can moderation change my IA grade?</h3>
      <p>An adjustment of ±2–3 marks is common; adjustments of ±4–6 marks occur in some schools each session. Whether it changes your final grade depends on where you sit relative to the grade boundaries for that session.</p>

      <h3>Are IB IA grade boundaries the same every year?</h3>
      <p>No. Grade boundaries are set fresh each session based on the difficulty of the work submitted. Using boundaries from a previous year gives you an approximation only.</p>

      <h3>Which IB subjects have the most variable IA moderation?</h3>
      <p>History, Psychology, and Group 1 language and literature IAs tend to see wider variation. Sciences and Mathematics IAs are more stable because criteria are more explicitly defined.</p>
</main>`,

  "/resources/ib-ee-examples-by-subject": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB EE Examples by Subject</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB EE Examples by Subject</h1>
  <p>
        The IB Extended Essay is a 4000-word independent research project that every
        Diploma candidate must complete. It is one of the most significant pieces of
        academic writing most students have produced — and one of the most variable
        in quality. The difference between a grade A and a grade C EE is not usually
        the quality of the research. It is how clearly the research question is
        focused, how rigorously the evidence is analysed, and how honestly the
        limitations are discussed. This guide provides concrete extended essay
        examples across major subject areas and explains what each high-scoring
        version does that lower-scoring versions don't.
      </p>

      <h2>IB EE Marking Overview</h2>
      <p>
        The Extended Essay is marked on five criteria (A–E), totalling 34 marks.
        Combined with the TOK essay, this contributes up to 3 bonus points toward
        your IB Diploma total. A grade A corresponds to roughly 28+/34; B is around
        22–27; C is 16–21; D is 9–15; E (failing) is below 9.
      </p>
      <ul>
        <li><strong>Criterion A — Focus and Method (6 marks):</strong> Is the research question clear, focused, and appropriate for the subject? Is the methodology explicit and justified?</li>
        <li><strong>Criterion B — Knowledge and Understanding (6 marks):</strong> Does the student demonstrate subject-specific knowledge and understanding, including appropriate use of subject terminology?</li>
        <li><strong>Criterion C — Critical Thinking (12 marks):</strong> Is the analysis original, developed, and consistently connected to the research question? Are conclusions justified by the evidence?</li>
        <li><strong>Criterion D — Presentation (4 marks):</strong> Is the essay well-structured, properly formatted, and within the word limit?</li>
        <li><strong>Criterion E — Engagement (6 marks):</strong> Assessed via the RPPF — does the student demonstrate genuine intellectual curiosity and reflection throughout the process?</li>
      </ul>

      <h2>IB Extended Essay Examples by Subject</h2>

      <h3>Economics Extended Essay</h3>
      <p>
        <strong>Strong research question:</strong> "To what extent has the introduction
        of London's Ultra Low Emission Zone increased consumer surplus for residents
        while reducing it for commuters?"
      </p>
      <p>
        What makes this work: it is specific (one policy, one city, a defined time
        period), it uses Economics concepts precisely (consumer surplus, externalities,
        cost-benefit analysis), and it has a debatable answer — the effects on
        different groups pull in opposite directions. The student can use Transport for
        London data, academic studies of ULEZ impacts, and newspaper reports as sources.
      </p>
      <p>
        What a 7-scoring version does: defines the market clearly, draws and explains
        supply and demand diagrams with welfare triangles, uses real data to quantify
        the effects on at least two stakeholder groups, and evaluates limitations
        (data quality, counterfactual problem, distributional assumptions).
      </p>
      <p>
        What a 5-scoring version does: describes the policy and its effects without
        applying diagrams or welfare analysis, uses broad claims without data, and
        concludes vaguely that "the ULEZ had both positive and negative effects."
      </p>

      <h3>History Extended Essay</h3>
      <p>
        <strong>Strong research question:</strong> "To what extent was Stalin's
        collectivisation policy the primary cause of the 1932–33 famine in Ukraine?"
      </p>
      <p>
        What makes this work: it asks a causal question with a debatable answer
        (historians disagree), it is narrow enough to answer in 4000 words (one
        policy, one famine, one country, one time period), and it requires evaluating
        multiple sources including Soviet archives, demographic data, and historiographical
        debate.
      </p>
      <p>
        A 7-scoring History EE weighs competing causes (collectivisation policy,
        grain quotas, kulak deportations, deliberate targeting by Soviet authorities)
        against the evidence for each, uses primary sources critically, and reaches
        a justified but qualified conclusion — not a simplistic "yes" or "no."
      </p>

      <h3>Biology Extended Essay</h3>
      <p>
        <strong>Strong research question:</strong> "How does the concentration of
        anthocyanin in red cabbage vary with soil pH, and what does this suggest about
        its role as a stress indicator in plants?"
      </p>
      <p>
        What makes this work: it is experimentally testable (the student can grow
        red cabbage in soils of different pH and measure anthocyanin spectrophotometrically),
        it connects to plant biology theory, and the second part of the question
        ("what does this suggest about its role") ensures the analysis goes beyond
        description.
      </p>
      <p>
        For Biology, the methodology section must be detailed enough to replicate;
        the analysis must include statistical processing (means, standard deviations,
        significance testing); and the evaluation must discuss whether the observed
        effect is physiologically plausible given the literature on anthocyanin biosynthesis.
      </p>

      <h3>English A: Literature Extended Essay</h3>
      <p>
        <strong>Strong research question:</strong> "How does Kazuo Ishiguro use
        unreliable narration in 'Never Let Me Go' to critique institutional complicity
        in human rights violations?"
      </p>
      <p>
        What makes this work: it links a specific literary technique (unreliable
        narration) to a specific thematic claim (institutional complicity, human
        rights). The student can analyse close textual passages, compare critical
        interpretations, and develop an original argument that is not simply
        "Ishiguro uses symbolism to convey themes."
      </p>
      <p>
        English EEs score poorly when they substitute plot summary for analysis or
        when the argument is too broad ("Ishiguro explores memory and identity").
        A 7-scoring English EE makes a specific, arguable claim and defends it through
        close reading of selected passages, with engagement with secondary critical sources.
      </p>

      <h3>Mathematics Extended Essay</h3>
      <p>
        <strong>Strong research question:</strong> "How accurately does the logistic
        growth model predict the long-run population of a bounded ecosystem, and
        under what conditions does the model break down?"
      </p>
      <p>
        Maths EEs succeed when the mathematics is commensurate with the level (HL
        students should use calculus; SL students can use algebra and statistics),
        when the exploration is genuine (the student tests the model rather than
        just deriving it), and when the limitations of the model are mathematically
        analysed rather than vaguely noted.
      </p>
      <p>
        Common failure: a Maths EE that merely solves textbook problems and presents
        correct answers without any analysis or exploration of where the mathematics
        comes from or where it breaks down. The exploration must feel like investigation,
        not a worked-solutions exercise.
      </p>

      <h3>Psychology Extended Essay</h3>
      <p>
        <strong>Strong research question:</strong> "To what extent does social media
        use predict depressive symptoms in adolescents, and does this relationship
        differ by platform type?"
      </p>
      <p>
        Psychology EEs are best approached as literature reviews with a critical
        analytical argument, rather than primary research (running an original study
        in 4000 words is usually not feasible). A high-scoring version reviews
        3–5 studies systematically, evaluates their methodology (sample size,
        operationalisation of variables, cultural context), and reaches a qualified
        conclusion about what the evidence does and does not establish.
      </p>

      <h3>Physics Extended Essay</h3>
      <p>
        <strong>Strong research question:</strong> "How does the drag coefficient of
        a cycling helmet change with wind speed, and what are the implications for
        optimal aerodynamic position in time trials?"
      </p>
      <p>
        A Physics EE that involves original experimental data scores well on
        Criterion C (Critical Thinking) because the analysis can compare experimental
        results to theoretical predictions. If original experiments are not feasible,
        a strong Physics EE analyses published datasets critically and applies
        theoretical models — but must go beyond simply describing the physics.
      </p>

      <h2>What All High-Scoring Extended Essays Have in Common</h2>
      <p>
        Across every subject, the IB Extended Essays that score grade A share three
        characteristics that lower-scoring essays lack:
      </p>
      <ol>
        <li><strong>A research question specific enough to answer.</strong> Not "the impact of X on Y" but "to what extent did X influence Y under conditions Z during period P?"</li>
        <li><strong>Analysis that argues, not describes.</strong> Every section that presents evidence should also evaluate it — what does this evidence tell us? How reliable is it? What does it not tell us? What competing explanation could account for the same evidence?</li>
        <li><strong>A conclusion that directly answers the question.</strong> Not "in summary, there are many complex factors" but a qualified, evidenced position that the student has earned through the investigation.</li>
      </ol>

      <h2>Getting Your Extended Essay Assessed Before Submission</h2>
      <p>
        Reading strong IB extended essay examples helps calibrate what good looks like.
        But the gap between knowing what good looks like and knowing whether your own
        essay meets that standard is where most students lose marks.
      </p>
      <p>
        IBLens analyses your Extended Essay draft against the official IB rubric —
        the same criteria your examiner uses — and provides criterion-by-criterion
        feedback so you know exactly where marks are being lost before you submit.
      </p>
      <p>
        <a href="/essay">Upload your Extended Essay draft to IBLens for rubric-based feedback →</a>
      </p>
</main>`,

  "/resources/ib-biology-ia-examples": `<main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Biology IA Examples</nav>\n      <h1 style="font-size:28px;font-weight:700;line-height:1.3;margin:0 0 16px">IB Biology IA Examples</h1>
  <p>
        The IB Biology Internal Assessment is a scientific investigation worth 20% of
        your final grade. Unlike a lab practical in class, the IA asks you to design,
        conduct, and evaluate your own experiment — and the marks go to students who
        demonstrate genuine scientific thinking, not just correct data collection.
        This guide covers what high-scoring IB Biology IA examples look like, which
        topics reliably earn strong marks, and the specific mistakes that drag
        competent students from a 6 to a 4.
      </p>

      <h2>How the IB Biology IA Is Marked</h2>
      <p>
        The IA is marked out of 24 across five criteria:
      </p>
      <ul>
        <li><strong>Personal Engagement (2 marks):</strong> Evidence that the student chose and shaped the investigation themselves. Examiners look for a genuine question, not a reformatted class lab.</li>
        <li><strong>Exploration (6 marks):</strong> Clear research question, appropriate methodology, identified variables (independent, dependent, controlled), and sufficient background theory.</li>
        <li><strong>Analysis (6 marks):</strong> Correctly processed data, appropriate statistical tests, graphs with error bars, and a conclusion drawn from the data.</li>
        <li><strong>Evaluation (6 marks):</strong> Honest assessment of the methodology: what are the weaknesses? What systematic errors exist? How could the investigation be improved?</li>
        <li><strong>Communication (4 marks):</strong> Structure, clarity, appropriate use of scientific terminology, and correct citation format.</li>
      </ul>
      <p>
        A score of 20/24 or above typically corresponds to a 7. The most common reason
        for dropping from a 7 to a 6 is weak Evaluation — students describe what
        happened without critically analysing why the method may have introduced error.
      </p>

      <h2>IB Biology IA Examples That Score Well</h2>

      <h3>1. Effect of substrate concentration on enzyme activity</h3>
      <p>
        Enzyme kinetics is a syllabus topic and a reliable IA subject when done well.
        A high-scoring version does not simply measure how fast hydrogen peroxide
        decomposes in the presence of catalase at five concentrations. It also:
        estimates the Michaelis constant (Km) by plotting 1/velocity against
        1/concentration (Lineweaver-Burk), discusses why the curve deviates from
        the Michaelis-Menten model at very high substrate concentrations, and
        reflects on whether enzyme concentration was truly controlled across trials.
        The Personal Engagement mark typically comes from choosing an enzyme or
        substrate with a personal connection — a student who works in a kitchen
        and investigates pineapple juice (bromelain) inhibiting gelatin setting
        scores Personal Engagement almost automatically.
      </p>

      <h3>2. Osmosis in plant tissue across a concentration gradient</h3>
      <p>
        Osmosis is another core syllabus topic. The mark differentiator at the top
        end is statistical analysis. A student who simply calculates percentage mass
        change and draws a graph will score Analysis = 4. A student who runs a
        minimum of five replicates at each concentration, calculates standard
        deviation, adds error bars to the graph, and uses a t-test or ANOVA to
        determine whether differences between groups are statistically significant
        will score Analysis = 6. Using two different plant tissues (e.g., potato
        and beetroot) and comparing the solute potential of each adds originality
        for Personal Engagement.
      </p>

      <h3>3. Effect of light intensity on the rate of photosynthesis</h3>
      <p>
        A classic topic that is frequently done poorly. The difference between a
        5 and a 7 on this IA comes down to three things:
      </p>
      <ul>
        <li>Controlling temperature precisely — failure to do so is the most common Evaluation point that students miss or understate.</li>
        <li>Using a colorimetric or dissolved oxygen method rather than just counting bubbles, which is qualitative and unreliable.</li>
        <li>Investigating a non-obvious variable — instead of light intensity (which every student uses), investigating the effect of light wavelength using coloured filters introduces more sophisticated Analysis and a stronger Exploration structure.</li>
      </ul>

      <h3>4. Microbial growth and antibiotic inhibition zones</h3>
      <p>
        Disc diffusion assays (Kirby-Bauer method) are appropriate for IA when the
        school has a suitable microbiology facility. A student who investigates
        whether natural antimicrobial compounds (garlic extract, tea tree oil,
        honey) produce inhibition zones comparable to a standard antibiotic
        earns strong Personal Engagement marks. The Analysis requires measuring
        inhibition zone diameters accurately, calculating means and standard
        deviations, and using a statistical test. The Evaluation should discuss
        why disc diffusion underestimates minimum inhibitory concentration and
        what a broth dilution assay would add.
      </p>

      <h3>5. Effect of temperature on membrane permeability in beetroot</h3>
      <p>
        Measuring absorbance of leaked anthocyanin pigment from beetroot cells
        across a temperature range is a clean, quantitative method that produces
        reliable data. The mark differentiator is using a colorimeter to measure
        absorbance at 550nm rather than estimating colour visually, and including
        enough replicates for error bars to be meaningful. A strong Evaluation
        discusses whether the protein denaturation responsible for membrane
        disruption is reversible, and compares the observed temperature threshold
        to published Tm values for phospholipid bilayers.
      </p>

      <h2>Topics to Avoid (or Handle Carefully)</h2>

      <h3>Survey-based IAs on human behaviour</h3>
      <p>
        "Does sleep affect memory performance?" or "Does music improve concentration?"
        are popular topics that almost never score well. The problem is experimental
        control: you cannot isolate the independent variable in a human population
        without randomisation, blinding, and washout periods that are not feasible
        in a school setting. Examiners mark down Exploration for poor methodology
        and Evaluation for failing to identify the resulting confounds. If you want
        to study human biology, choose a variable you can measure physiologically
        (heart rate, reaction time with a standard protocol) rather than survey-based
        self-reporting.
      </p>

      <h3>Germination rate experiments</h3>
      <p>
        Germination is fine as a topic but the timeline is a problem — seed germination
        can take days or weeks, leaving little time for replication and data collection.
        If you choose germination, use a fast-germinating species (radish, cress,
        mung beans) and design the protocol so you can complete at least 30 seeds per
        condition within your available lab time.
      </p>

      <h2>The Most Important Thing About IB Biology IA Evaluation</h2>
      <p>
        Criterion D (Evaluation) is where the most marks are lost among students who
        scored 5 or 6. The common failure is writing: "My experiment had some errors.
        I could improve it by being more careful." This is not evaluation — it is
        apology.
      </p>
      <p>
        Strong Evaluation identifies <em>specific</em> methodological weaknesses,
        explains the <em>direction</em> of the error they introduced (does this make
        your result an overestimate or underestimate?), and proposes a concrete
        improvement with a reason why it would reduce that specific error.
      </p>
      <p>
        Example of weak evaluation: "Temperature was not perfectly controlled,
        which may have affected results."
      </p>
      <p>
        Example of strong evaluation: "Water bath temperature fluctuated by ±2°C
        during the 10-minute reaction period. Since enzyme activity increases
        with temperature in the range used, this likely caused an overestimate
        of reaction rate at the lower concentration points, flattening the
        observed Km. A thermostatically controlled water bath or a temperature
        logger would allow me to quantify this variation and correct for it."
      </p>

      <h2>Getting Criterion-Level Feedback Before Submission</h2>
      <p>
        When you read IB Biology IA examples online, it is tempting to compare
        your work broadly — "mine looks similar in length and has graphs, so
        it should be fine." The problem is that marks are lost in specific places:
        a missing error bar here, an unacknowledged confounding variable there,
        a conclusion that does not reference the data. These are not things you
        can see by general comparison.
      </p>
      <p>
        IBLens analyses your IA draft against the official IB rubric criteria and
        shows you exactly where marks are being lost before your teacher submits
        your moderated grade.
      </p>
      <p>
        <a href="/essay">Upload your Biology IA draft to IBLens for rubric-based feedback →</a>
      </p>
</main>`,


  "/resources/ib-grade-boundaries": `  <main style="max-width:860px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;color:#111">
  <nav style="font-size:13px;color:#6b7280;margin-bottom:20px"><a href="/">Home</a> › <a href="/resources">Resources</a> › IB Grade Boundaries</nav>
  <h1>IB Grade Boundaries Explained</h1>

      <p>
        One of the most confusing aspects of the IB Diploma Programme for students and parents is the scoring system. Unlike national curricula that use percentages or letter grades, the IB uses a 7-point scale for each subject, bonus points from core components, and grade boundaries that shift between examination sessions. This guide explains how the entire system works — from individual subject grades to the final diploma score — so you can understand where your marks come from and what you need to achieve your goals.
      </p>

      <h2>How the 7-Point Scale Works</h2>

      <p>
        Each IB subject is graded on a scale of 1 (lowest) to 7 (highest). These grades are not percentages — a 7 does not mean you scored 70% or above. Instead, grade boundaries are set after each examination session based on the difficulty of the papers and the performance of the global cohort.
      </p>

      <p>
        The grade boundaries represent the minimum raw mark (out of the total available marks for all components) needed to achieve each grade. For example, in a subject where the total available marks across all papers and IA is 100:
      </p>

      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Typical Boundary Range</th>
            <th>Approximate Percentage</th>
            <th>Descriptor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>7</strong></td>
            <td>73–85+</td>
            <td>~73–85%</td>
            <td>Excellent</td>
          </tr>
          <tr>
            <td><strong>6</strong></td>
            <td>60–72</td>
            <td>~60–72%</td>
            <td>Very Good</td>
          </tr>
          <tr>
            <td><strong>5</strong></td>
            <td>48–59</td>
            <td>~48–59%</td>
            <td>Good</td>
          </tr>
          <tr>
            <td><strong>4</strong></td>
            <td>36–47</td>
            <td>~36–47%</td>
            <td>Satisfactory</td>
          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td>25–35</td>
            <td>~25–35%</td>
            <td>Mediocre</td>
          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td>14–24</td>
            <td>~14–24%</td>
            <td>Poor</td>
          </tr>
          <tr>
            <td><strong>1</strong></td>
            <td>0–13</td>
            <td>~0–13%</td>
            <td>Very Poor</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Important:</strong> These ranges are approximate and vary significantly between subjects and sessions. Mathematics Analysis & Approaches HL might have a grade 7 boundary at 74%, while History HL might set it at 70% in the same session. The IBO adjusts boundaries to maintain consistent standards across years — if a paper was unusually difficult, boundaries are lowered so that a similar proportion of students achieve each grade.
      </p>

      <p>
        This is why it is impossible to know your exact grade during the course. You can estimate based on historical boundaries, but the actual boundaries are only finalized after all papers are marked for that session.
      </p>

      <h2>How Subject Scores Combine to Total Points</h2>

      <p>
        The IB Diploma score is calculated by adding together your grades from all six subjects plus bonus points from the core (TOK + EE). The maximum possible score is:
      </p>

      <ul>
        <li>6 subjects × 7 points maximum = <strong>42 points</strong></li>
        <li>Core bonus points (EE + TOK) = <strong>3 points maximum</strong></li>
        <li><strong>Total maximum: 45 points</strong></li>
      </ul>

      <p>
        To be awarded the IB Diploma (as opposed to individual subject certificates), you must meet all of the following conditions:
      </p>

      <ul>
        <li>Score at least <strong>24 points</strong> in total</li>
        <li>Complete CAS requirements</li>
        <li>No grade 1 in any subject</li>
        <li>No more than two grade 2s</li>
        <li>No more than three grade 3s (or below) across all subjects</li>
        <li>At least 12 points from Higher Level subjects</li>
        <li>At least 9 points from Standard Level subjects</li>
        <li>No "N" (not graded) in any subject, TOK, or EE</li>
      </ul>

      <p>
        Failing to meet any of these conditions results in not being awarded the Diploma, even if your total points are above 24. The most common reason for Diploma failure (beyond not reaching 24 points) is receiving a grade 2 or below in a subject where the student did not submit the IA or missed an exam.
      </p>

      <h2>Grade Boundaries by Subject: General Patterns</h2>

      <p>
        While exact boundaries vary by session, certain patterns are consistent across years:
      </p>

      <h3>Sciences (Physics, Chemistry, Biology)</h3>
      <p>
        Science subjects tend to have relatively high grade 7 boundaries (often 75–80%) because the papers include structured questions with clear right/wrong answers. However, the IA component (20%) provides an opportunity to secure marks through careful preparation. Students who score highly on the IA effectively lower the exam performance needed for a 7.
      </p>

      <h3>Mathematics</h3>
      <p>
        Mathematics Analysis & Approaches HL is known for having some of the lowest grade 7 boundaries in the IB (sometimes as low as 70–74%) because the papers are designed to be challenging. Mathematics Applications & Interpretation tends to have slightly higher boundaries. The key insight: in mathematics, you do not need to answer every question correctly to achieve a 7.
      </p>

      <h3>Humanities (History, Economics, Psychology)</h3>
      <p>
        Humanities subjects typically have grade 7 boundaries in the 70–76% range. The challenge in these subjects is not the boundary itself but the difficulty of achieving high marks on essay-based papers where examiners apply holistic marking criteria. A "perfect" essay is rare in humanities marking.
      </p>

      <h3>Languages (Group 1 and Group 2)</h3>
      <p>
        Language subjects often have the highest grade 7 boundaries (sometimes 85%+) because the marking is more generous on individual components. However, the Individual Oral (IO) can be unpredictable, and many students find it harder to achieve consistent marks across all four skills (reading, writing, speaking, listening).
      </p>

      <h2>Bonus Points from the EE/TOK Matrix</h2>

      <p>
        The Extended Essay and Theory of Knowledge are each graded A–E. These two grades are combined using a matrix to determine how many bonus points (0–3) are added to your diploma score:
      </p>

      <table>
        <thead>
          <tr>
            <th>TOK ↓ / EE →</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A</strong></td>
            <td>3</td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>B</strong></td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>C</strong></td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>D</strong></td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>E</strong></td>
            <td>Fail</td>
            <td>Fail</td>
            <td>Fail</td>
            <td>Fail</td>
            <td>Fail</td>
          </tr>
        </tbody>
      </table>

      <p>
        Key observations from this matrix:
      </p>

      <ul>
        <li>An E grade in either TOK or EE results in automatic Diploma failure regardless of your total points</li>
        <li>To get the maximum 3 bonus points, you need at least an A in one component and a B in the other</li>
        <li>The most common outcome (B/B or B/C) gives 2 or 1 bonus points</li>
        <li>These bonus points can be the difference between a 42 and a 45, or between meeting and missing a university offer</li>
      </ul>

      <p>
        This is why investing time in your <a href="/resources/ib-extended-essay-guide">Extended Essay</a> and <a href="/resources/tok-essay-guide">TOK essay</a> is strategically important — they offer "free" points that require effort but no exam-day performance pressure.
      </p>

      <h2>What Different Total Scores Mean for University Admissions</h2>

      <p>
        IB scores are recognized by universities worldwide, but requirements vary significantly by institution and program:
      </p>

      <table>
        <thead>
          <tr>
            <th>Score Range</th>
            <th>Competitiveness</th>
            <th>Typical University Targets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>40–45</strong></td>
            <td>Highly competitive</td>
            <td>Oxbridge, Ivy League, top medical schools, ETH Zurich</td>
          </tr>
          <tr>
            <td><strong>36–39</strong></td>
            <td>Very strong</td>
            <td>Russell Group (UK), top US liberal arts, University of Toronto, NUS</td>
          </tr>
          <tr>
            <td><strong>32–35</strong></td>
            <td>Strong</td>
            <td>Most competitive programs at good universities worldwide</td>
          </tr>
          <tr>
            <td><strong>28–31</strong></td>
            <td>Solid</td>
            <td>Many university programs, some competitive programs with strong HL scores</td>
          </tr>
          <tr>
            <td><strong>24–27</strong></td>
            <td>Passing</td>
            <td>Diploma awarded; limited competitive options but many pathways available</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Important nuance:</strong> Many universities care more about your HL subject grades than your total score. A student with 38 points but 7,7,6 at HL in relevant subjects may be more competitive than a student with 40 points but 6,6,5 at HL. UK universities in particular often make offers based on specific HL grades (e.g., "766 at HL including 7 in Chemistry").
      </p>

      <p>
        For personalized guidance on which universities match your predicted scores and subject combination, <a href="/university">IBLens's University Strategy tool</a> can help you identify realistic targets and reach schools based on historical admissions data.
      </p>

      <h2>How to Maximize Your Total Score</h2>

      <p>
        Based on the scoring structure, here are strategic approaches to maximizing your IB Diploma score:
      </p>

      <p>
        <strong>Prioritize IAs:</strong> Internal Assessments are the most controllable component of your grade. You have weeks to refine them, can get teacher feedback, and can use tools like <a href="/essay">IBLens</a> to identify areas for improvement. A strong IA can compensate for a weaker exam performance.
      </p>

      <p>
        <strong>Invest in EE and TOK:</strong> The 3 bonus points from the EE/TOK matrix are achievable with focused effort. An A in your EE and a B in TOK gives you the maximum 3 points — equivalent to raising one subject grade by half a point across all six subjects.
      </p>

      <p>
        <strong>Know your boundaries:</strong> If you are on the borderline between two grades in a subject, even 1–2 extra marks on the IA or one paper can push you up. Understanding approximately where boundaries fall helps you allocate revision time strategically.
      </p>

      <p>
        <strong>Balance effort across subjects:</strong> Going from a 6 to a 7 in one subject requires significantly more effort than going from a 4 to a 5 in another. If your goal is to maximize total points, focus on subjects where you are closest to the next grade boundary.
      </p>

      <p>
        For more on how to achieve top marks on your essays and IAs, see our guides on <a href="/resources/ib-essay-criteria-explained">IB Essay Criteria Explained</a> and <a href="/resources/ib-internal-assessment-guide">Internal Assessment Guide</a>. Understanding the <a href="/pricing">pricing</a> of essay analysis tools can help you decide how to invest in your preparation.
      </p>
</main>`,
};