import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const REPORTS = [
  {
    "tier": "weak",
    "bandLabel": "Band 1–3",
    "heading": "What a weak essay looks like",
    "designNote": "Opinion-based claims (“in my opinion”, “my teacher says”), anecdotes instead of examples, no genuine counterclaims, key terms never defined.",
    "score": 3,
    "max": 10,
    "band": "1-3",
    "comment": "This essay demonstrates a basic understanding of the prescribed title topic but falls significantly short of IB TOK standards. The student identifies a surface-level distinction between mathematics and natural sciences regarding certainty, but fails to engage with genuine knowledge questions at the epistemological level required. The essay reads more like a personal opinion piece than a TOK essay — it lacks the vocabulary of TOK (ways of knowing, areas of knowledge, knowledge claims vs. knowledge questions), uses anecdotal authority ('my math teacher says'), and employs examples that are historically inaccurate or oversimplified. There is no substantive engagement with counter-arguments, no real exploration of what 'certainty' means as an epistemological concept, and no reference to relevant thinkers, perspectives, or real-world situations beyond common knowledge. The structure is recognizable but mechanical, and the conclusion simply restates the opening thesis without synthesis or insight.",
    "criteria": [
      {
        "name": "Understanding knowledge questions",
        "score": 1,
        "max": 3,
        "comment": "The student identifies the central knowledge question implied by the title — whether certainty is achievable in mathematics and natural sciences — but does not articulate it as a genuine knowledge question (e.g., 'What does it mean to claim certainty in a domain of knowledge?'). The essay treats the question as a debate about facts rather than an epistemological inquiry. There is no unpacking of the concept of 'certainty' itself: no distinction is made between deductive certainty, empirical confidence, intersubjective agreement, or psychological certainty. The student does not connect to subsidiary knowledge questions such as the role of axioms in mathematics, the nature of falsifiability in science, or the difference between formal and empirical systems. The mark of 1 is awarded because a rudimentary recognition of the knowledge question is present, but exploration is absent."
      },
      {
        "name": "Quality of analysis of knowledge questions",
        "score": 1,
        "max": 3,
        "comment": "The analysis is superficial throughout. Arguments are asserted rather than developed — for example, '2+2=4 is always true' is stated without engaging with the foundational question of why mathematical truths hold (axioms, logical deduction, Godel's incompleteness theorems are entirely absent). The counter-argument about imaginary numbers is immediately dismissed without genuine engagement. The science examples (flat earth, Pluto, smoking) are historically inaccurate or oversimplified: the flat earth claim was not widely held by educated people in the medieval period, and the Pluto reclassification reflects definitional refinement rather than empirical falsification. The essay does not use any TOK-specific analytical tools: no ways of knowing are named, no distinction between 'truth' and 'certainty' is drawn, and no perspectives (e.g., Popper's falsifiability, Kuhn's paradigm shifts) are referenced. The single mark reflects that the student makes an attempt at argument and counter-argument, but neither is developed with intellectual rigor."
      },
      {
        "name": "Quality of overall essay",
        "score": 1,
        "max": 4,
        "comment": "The essay has a recognizable five-paragraph structure (introduction, two body paragraphs, concession, conclusion), which is a basic strength. However, quality is undermined across multiple dimensions. Factual accuracy is compromised: the flat earth example is a common historical myth; the Pluto example misrepresents scientific revision. The language is informal and colloquial ('which is crazy to think about now,' 'people will probably keep debating about it forever'), inappropriate for a formal academic essay. There is no use of TOK terminology, no engagement with scholars or theorists, and no real-world situations developed with nuance. The conclusion adds no new insight and simply restates the thesis. The essay lacks the coherence and depth expected at IB level and does not demonstrate independent critical thinking. One mark is awarded for the presence of a basic organizational structure and for addressing both areas of knowledge named in the title."
      }
    ],
    "excerpt": "Can we ever be certain about anything in science and math? This is a really interesting question that many people have thought about. In my opinion, certainty is possible in math but not really in science, and I will explain why I think this. First of all, math is certain because it is based on…",
    "wordCount": 399
  },
  {
    "tier": "mid",
    "bandLabel": "Band 4–6",
    "heading": "What a developing essay looks like",
    "designNote": "Clear structure, terms defined, standard examples — but the analysis stays descriptive, counterclaims are thin, and examples don’t do real argumentative work.",
    "score": 4,
    "max": 10,
    "band": "4-6",
    "comment": "This essay addresses the prescribed title in a recognizable way and shows a basic understanding of the distinction between mathematics and the natural sciences as areas of knowledge. The student correctly identifies key epistemological ideas such as Popper's falsifiability and the role of axioms in non-Euclidean geometry. However, the essay remains largely descriptive and surface-level. Knowledge questions are not clearly articulated as questions — they are embedded in statements rather than foregrounded as genuine epistemological problems. Analysis is underdeveloped: examples are used illustratively rather than analytically, and there is little exploration of competing perspectives or genuine conceptual tension. The essay reads more like a well-structured comparison exercise than a TOK essay that grapples with the nature and limits of knowledge. The conclusion is reasonable but adds no new insight beyond summarizing what was already said. To improve significantly, the student needs to explicitly frame and interrogate knowledge questions, develop real arguments rather than assertions, and engage more deeply with at least one or two examples.",
    "criteria": [
      {
        "name": "Understanding knowledge questions",
        "score": 1,
        "max": 3,
        "comment": "The student implicitly engages with the knowledge question embedded in the title — namely, whether certainty is attainable — but never explicitly articulates this as a knowledge question (KQ) in TOK terms. The essay does not ask or explore second-order questions such as 'What do we mean by certainty as a type of knowledge?' or 'How does the method of justification in an AOK determine its epistemic status?' The definition of certainty offered ('knowledge that cannot be doubted') is not interrogated or problematized; it is simply stated and applied. The mention of non-Euclidean geometry and Popper hints at deeper KQs but these are not developed. To reach the higher descriptors, the student must show that they understand what a knowledge question is, explicitly formulate KQs connected to the title, and explore them rather than answer them directly."
      },
      {
        "name": "Quality of analysis of knowledge questions",
        "score": 1,
        "max": 3,
        "comment": "The analysis is minimal and largely descriptive. The Popper example is correctly identified but not analyzed — the student states that theories can be falsified without exploring what this means epistemologically (e.g., the problem of induction, the distinction between empirical and analytic knowledge). The Newton-Einstein example is appropriate but handled superficially: it is used only to say 'science can be wrong,' not to explore what provisional knowledge implies for the concept of certainty. Counter-arguments are present in structure (the 'on the other hand' and 'some people argue' paragraphs) but they are underdeveloped and dismissed quickly rather than genuinely engaged. There are no real perspectives from distinct knowers or communities. The essay lacks the genuine back-and-forth of analytical reasoning that the higher descriptors require. Examples serve as illustrations rather than analytical tools."
      },
      {
        "name": "Quality of overall essay",
        "score": 2,
        "max": 4,
        "comment": "The essay has a clear and logical structure — introduction, body paragraphs organized by AOK, a counter-consideration section, and a conclusion. The writing is clear, grammatically correct, and easy to follow. These are genuine strengths. However, the essay is factually accurate but not insightful: it says things that are true (e.g., proofs are permanent within an axiomatic system, Newtonian mechanics was revised by Einstein) but does not push beyond the obvious or generate any genuine intellectual surprise. The conclusion simply restates the argument rather than offering a nuanced or conditional answer to the title. There is no engagement with the complexity of the word 'extent' in the title — the student reaches a conclusion without genuinely weighing degrees of certainty against each other in a sophisticated way. The prescribed title is addressed, but the essay reads more like a competent student summary than a TOK essay characterized by independent thought."
      }
    ],
    "excerpt": "To what extent is certainty attainable in the natural sciences and mathematics? In this essay I will define certainty as knowledge that cannot be doubted, and I will look at mathematics first and then the natural sciences. In mathematics, knowledge comes from proofs. Once something is proven, it stays proven. For example, Euclid proved that…",
    "wordCount": 396
  },
  {
    "tier": "strong",
    "bandLabel": "Band 7–8",
    "heading": "What a strong essay looks like",
    "designNote": "Precise conditional claims, examples that carry the argument (Gödel, the four-colour theorem), a genuine counterclaim taken seriously, and synthesis — not summary — in the conclusion.",
    "score": 7,
    "max": 10,
    "band": "7-8",
    "comment": "This is a competent and well-structured TOK essay that demonstrates genuine philosophical engagement with the prescribed title. The student correctly identifies the core knowledge question — the nature and limits of certainty across two AOKs — and pursues it with intellectual seriousness. The use of Gödel's incompleteness theorems, Popper's falsificationism, and the Newtonian mechanics example are all appropriate and reasonably well deployed. The concluding distinction between 'internal and conditional' certainty in mathematics and 'asymptotic' certainty in the natural sciences is genuinely insightful and shows original thinking. However, the essay is notably short and reads more like a strong outline than a fully developed essay. Analysis frequently stops just before it becomes truly rigorous: claims are asserted with confidence but not always substantiated through careful reasoning. The counterclaim about human cognition is underdeveloped and the four-color theorem example, while interesting, is dropped without being connected back to the central argument. Real-world applications and personal perspectives are largely absent, which limits the essay's ability to score in the upper bands. To reach the 8-10 range, the student would need to deepen their analysis, integrate more perspectives, and develop their examples more fully.",
    "criteria": [
      {
        "name": "Understanding knowledge questions",
        "score": 2,
        "max": 3,
        "comment": "The student clearly identifies the central knowledge question — to what extent certainty is attainable in mathematics and the natural sciences — and maintains focus on it throughout. The distinction between conditional/internal certainty and asymptotic certainty is an authentic TOK-level insight rather than a surface-level description. The essay correctly situates certainty as an epistemic concept tied to method (deduction vs. induction), which shows understanding of how AOKs generate knowledge differently. However, the essay does not sufficiently explore subsidiary knowledge questions that would enrich the inquiry — for example, 'What do we mean by certainty?' is never explicitly unpacked, nor is the question of whether certainty is a property of knowledge claims or of knowers' attitudes. The essay would benefit from distinguishing between logical certainty, psychological certainty, and practical certainty more rigorously. A score of 3 requires nuanced exploration of multiple connected KQs; here the single central KQ is handled well but not richly branched."
      },
      {
        "name": "Quality of analysis of knowledge questions",
        "score": 2,
        "max": 3,
        "comment": "The analysis is clear and makes good use of relevant examples: the Pythagorean theorem illustrates conditional mathematical certainty, Newtonian mechanics illustrates the revisability of scientific knowledge, and Gödel's theorems are invoked correctly (though their implications deserve more careful unpacking — the incompleteness theorems concern provability within a system, not truth per se, and this distinction matters). Popper's falsificationism is applied appropriately. A counterclaim is offered (human cognitive fallibility affects both AOKs), which shows awareness of the need for dialectical structure. However, the counterclaim is underexplored and its implications are not fully integrated into the essay's conclusion. The four-color theorem example raises the interesting question of machine-verifiable vs. human-verifiable proof, but this thread is dropped. Arguments would benefit from deeper development: why does predictive success confer 'practical certainty'? What are its limits? The analysis is competent and relevant but rarely reaches beyond the immediately obvious, stopping short of the evaluative depth needed for a 3."
      },
      {
        "name": "Quality of overall essay",
        "score": 3,
        "max": 4,
        "comment": "The essay is well-organized, clearly written, and logically sequenced. The thesis is stated early and the conclusion follows coherently from the argument, which is a genuine strength. The closing formulation — 'the knower's task is not to demand absolute certainty but to calibrate confidence to the strength of the method' — is articulate and shows philosophical maturity. Factual claims are accurate: Gödel, Popper, and the examples used are all correctly represented. However, the essay is very brief for a TOK essay, which means the quality of overall development is limited. There is no personal voice or first-person perspective meaningfully integrated (the 'I argue' near the end is minimal). Real-life situations beyond textbook examples are absent. The essay does not acknowledge the perspectives of different communities of knowers or consider how cultural, historical, or personal factors shape judgments about certainty. To reach a 4, the essay would need to demonstrate a more consistently insightful, personal, and wide-ranging engagement with the question, with fuller development of each move in the argument."
      }
    ],
    "excerpt": "To what extent is certainty attainable in the natural sciences and mathematics? This essay argues that certainty operates differently across these two areas of knowledge. In mathematics, certainty appears attainable through deductive proof. Once the Pythagorean theorem is proven within Euclidean axioms, it holds with complete certainty inside that system. However, this certainty is conditional:…",
    "wordCount": 249
  }
] as const;

export default function SampleReports() {
  return (
    <ResourceArticle
      title="Sample IBLens Reports — Three Essays, Three Honest Grades | IBLens"
      description="See real, unedited IBLens output: the same TOK title answered at three quality levels, graded 3/10, 4/10 and 7/10. A grader that gives everything 6.5 is useless — this is what calibrated strictness looks like."
      canonical="/resources/sample-reports"
      datePublished="2026-07-03"
      dateModified="2026-07-03"
    >
      <h1>Three essays. Three honest grades.</h1>

      <p>
        Most AI graders have one failure mode: everything gets a comfortable 6.5. To show you how
        IBLens actually behaves, we wrote three demo essays on the same TOK-style title —
        <em> “To what extent is certainty attainable in the natural sciences and mathematics?”</em> —
        at deliberately different quality levels, and ran each through the grader.
      </p>
      <p>
        <strong>The three analyses below are real, unedited IBLens output.</strong> The essays are ours
        (written for this demonstration, not student work); the grades and every word of feedback came
        straight from the grader.
      </p>

      {REPORTS.map((r) => (
        <div key={r.tier} style={{border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, margin: "28px 0"}}>
          <p style={{fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7B1D2E", marginBottom: 6}}>{r.bandLabel}</p>
          <h2 style={{...SERIF, fontSize: "1.5rem", fontWeight: 700, marginTop: 0}}>{r.heading}</h2>
          <p style={{fontSize: "0.9rem", color: "#6b7280", marginBottom: 16}}><strong>How we wrote it:</strong> {r.designNote}</p>

          <div style={{background: "#faf7f5", borderRadius: 8, padding: 16, fontSize: "0.9rem", fontStyle: "italic", color: "#4b5563", marginBottom: 20}}>
            “{r.excerpt}”
            <span style={{display: "block", fontStyle: "normal", fontSize: "0.75rem", color: "#9ca3af", marginTop: 8}}>Essay excerpt · {r.wordCount} words total</span>
          </div>

          <div style={{display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16}}>
            <span style={{...SERIF, fontSize: "2.5rem", fontWeight: 700, color: "#7B1D2E"}}>{r.score}<span style={{fontSize: "1.2rem", color: "#9ca3af"}}> / {r.max}</span></span>
            <span style={{fontSize: "0.9rem", color: "#6b7280"}}>predicted · band {r.band}</span>
          </div>

          <div style={{marginBottom: 20}}>
            {r.criteria.map((c) => (
              <div key={c.name} style={{marginBottom: 14}}>
                <div style={{display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: 4}}>
                  <span>{c.name}</span><span>{c.score}/{c.max}</span>
                </div>
                <div style={{height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden", marginBottom: 6}}>
                  <div style={{height: "100%", width: ((c.score / c.max) * 100) + "%", background: "#7B1D2E", borderRadius: 3}} />
                </div>
                <p style={{fontSize: "0.85rem", color: "#4b5563", margin: 0, lineHeight: 1.6}}>{c.comment}</p>
              </div>
            ))}
          </div>

          <details>
            <summary style={{fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", color: "#7B1D2E"}}>Examiner-style overall comment</summary>
            <p style={{fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.7, marginTop: 8}}>{r.comment}</p>
          </details>
        </div>
      ))}

      <h2>Why the spread matters</h2>
      <p>
        The weak essay scored 3, the developing one 4, the strong one 7. That spread is the whole
        point: feedback is only useful if the grade moves when the quality moves. IBLens is calibrated
        to read like a strict examiner — if it says 7, we mean it, and if it says 3, you found out
        before an examiner did.
      </p>

      <p>
        <Link href="/essay">Get this exact report for your own essay — first analysis free →</Link>
      </p>
    </ResourceArticle>
  );
}
