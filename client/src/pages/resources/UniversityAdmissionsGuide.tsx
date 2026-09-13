import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function UniversityAdmissionsGuide() {
  return (
    <ResourceArticle
      title="IB University Admissions: UK, US and Europe Requirements | IBLens"
      description="How UK, US and other systems read the IB Diploma, and where each university publishes its requirements."
      canonical="/resources/ib-university-admissions"
      datePublished="2026-05-01"
      dateModified="2026-09-13"
    >
      <h1>IB to university: how scores translate to admissions</h1>

      <p>
        Universities around the world accept the IB Diploma, but they read it in very different ways. Some make offers on the total points, some on grades in particular Higher Level subjects, some convert your grades into a local scale, and some treat the Diploma as one part of a much wider application. This guide explains those approaches, so you know what to look for on the course pages that matter to you.
      </p>

      <p>
        One thing it deliberately does not do is list score thresholds for groups of universities. Requirements are set course by course and change from year to year, and we withdrew our university guidance rather than publish numbers we cannot keep current. Where a figure appears below, it is one the university itself publishes.
      </p>

      <h2>United Kingdom: conditional offers on HL grades</h2>

      <p>
        UK universities make conditional offers, usually stated as a total and a set of Higher Level grades, for example "38 points including 766 at HL". Three things follow from that:
      </p>

      <p>
        <strong>HL grades carry a lot of weight.</strong> Offers usually name the HL grades you need, and often a grade in a particular HL subject. A student on 38 points who meets the required HL grades can hold an offer that a student on 40 points without them does not.
      </p>

      <p>
        <strong>Subject requirements are specific.</strong> Many courses require particular subjects at HL, such as Chemistry for medicine or Mathematics for engineering, sometimes with a minimum grade. Check the course page before you settle your HL choices.
      </p>

      <p>
        <strong>The most selective universities publish their ranges.</strong> When we checked in September 2026, Cambridge published minimum offers of 41 to 42 points with 776 at HL, and Oxford 38 to 40 points depending on the course, with 6s and 7s at HL. The <Link href="/resources/ib-score-calculator" className="text-primary hover:underline">IB score calculator</Link> page gives the details as those universities state them.
      </p>

      <p>
        <strong>UCAS Tariff points:</strong> since 2017 the UCAS Tariff gives points for each IB grade at HL and SL, and for the core, rather than for the overall total, so the old "45 = 720 points" scale no longer applies. Most selective universities make offers in IB points; when a Tariff figure is needed, use the UCAS calculator.
      </p>

      <h2>United States: holistic admissions</h2>

      <p>
        US universities read the IB as part of a holistic application, alongside essays, activities, recommendations and, at some universities, standardised tests. They do not usually publish IB point thresholds.
      </p>

      <p>
        <strong>Predicted grades carry the application.</strong> US applications go in before final IB results, so universities see your predicted grades and your school record.
      </p>

      <p>
        <strong>HL subjects show depth.</strong> HL Mathematics or Physics shows preparation for a STEM major; HL English or History shows preparation in the humanities.
      </p>

      <p>
        <strong>Credit and placement:</strong> some US universities give credit or advanced standing for strong HL results. Policies differ between universities, so check each one's own policy.
      </p>

      <h2>Canada, Australia and Asia</h2>

      <p>
        Many universities outside the UK and US convert IB grades into their own scale: a provincial percentage in parts of Canada, a selection rank in Australia, or a points requirement in Singapore and Hong Kong. The conversions and requirements are set by each university or admissions centre and change over time, so use the university's own admissions pages for the figure that applies to you.
      </p>

      <h2>Europe</h2>

      <p>
        <strong>Switzerland:</strong> ETH Zurich publishes a requirement of 38 out of 42 points, without bonus points, with Mathematics, one of Physics, Chemistry or Biology, and one Language A at Higher Level. EPFL publishes its own subject and grade requirements, including Mathematics and Physics at HL.
      </p>

      <p>
        <strong>Germany:</strong> the IB Diploma can give access to German universities when conditions on subject combinations and grades are met, and the IB score is converted to a German grade for admission.
      </p>

      <p>
        <strong>Other countries:</strong> universities in the Netherlands, Scandinavia and elsewhere recognise the IB, often with subject requirements for particular programmes. The national recognition rules and each university's programme pages are the sources to check.
      </p>

      <h2>Decisions that matter early</h2>

      <p>
        <strong>Match your HL subjects to the courses you are considering.</strong> HL choices are hard to change after the first year of the Diploma, and many UK courses in particular require specific HL subjects. Look up requirements before you commit.
      </p>

      <p>
        <strong>Know whether a system looks at the total or the HL grades.</strong> A strong total with weaker HL grades can be less useful for UK offers than a slightly lower total with the right HL grades.
      </p>

      <p>
        <strong>Apply with a range.</strong> Include courses where your predicted grades sit comfortably above the published requirement, not only courses where they just reach it.
      </p>

      <p>
        <strong>Look at credit policies where they apply.</strong> Where a university gives credit for HL results, it can shorten or lighten a degree.
      </p>

      <h2>How IBLens helps with applications</h2>

      <p>
        IBLens no longer offers university recommendations. If you are applying through UCAS, the part we help with is the writing: our <Link href="/ucas-personal-statement" className="text-primary hover:underline">personal statement checker</Link> reviews each of the three answers against what UCAS says admissions tutors look for. For entry requirements and deadlines, use the university's own course pages and UCAS.
      </p>

      <p>
        Your IA and EE marks feed straight into your subject grades and bonus points, so they matter for offers too. <Link href="/essay" className="text-primary hover:underline">IBLens essay analysis</Link> shows which criterion is costing you the most. For how the scoring system works, see our <Link href="/resources/ib-grade-boundaries" className="text-primary hover:underline">Grade boundaries guide</Link> and the <Link href="/resources/ib-internal-assessment-guide" className="text-primary hover:underline">Internal Assessment guide</Link>.
      </p>
      <h2>Applying through UCAS</h2>

      <ul>
        <li><Link href="/ucas-personal-statement">UCAS personal statement checker</Link></li>
        <li><Link href="/resources/academic-integrity">AI feedback and academic integrity</Link></li>
      </ul>

    </ResourceArticle>
  );
}
