import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const REPORTS = [
  {
    "tier": "weak",
    "bandLabel": "Band 1–2 · Rudimentary",
    "heading": "What a weak essay looks like",
    "designNote": "Opinion-based claims (“in my opinion”, “my teacher says”), anecdotes instead of examples, no genuine counterclaims, key terms never defined.",
    "score": 2,
    "max": 10,
    "band": "1-2",
    "comment": "This essay represents a rudimentary attempt at a TOK essay. While the student has identified a genuine epistemological tension — the question of certainty in mathematics versus natural sciences — the treatment remains almost entirely at the level of everyday assertion and anecdote. There is no engagement with TOK terminology, no use of Areas of Knowledge (AOK) or Ways of Knowing (WOK) as analytical tools, no named real-world examples of genuine epistemic weight, and no meaningful evaluation of different perspectives. The essay reads as a personal opinion piece written in a conversational register rather than a philosophical inquiry. It falls squarely in the Rudimentary band (1-2): the claims are weakly connected to the essay title's underlying epistemological demands, rest almost entirely on unsupported assertions ('my math teacher says...'), and demonstrate no awareness of the complexity the prescribed title invites. The student has a workable intuition about the deductive vs. inductive distinction but never names or develops it. Structural coherence is present at a surface level, but coherence of argument — the hallmark of higher-band TOK writing — is absent.",
    "criteria": [
      {
        "name": "Holistic assessment — global impression",
        "score": 2,
        "max": 10,
        "comment": "Placed in the Rudimentary band (1-2). The essay is weakly connected to the epistemological demands of the prescribed title. Arguments are largely descriptive and rest on unsupported assertions rather than reasoned analysis. Examples cited (flat earth, Pluto, smoking) are superficially mentioned without epistemological unpacking — they are used as illustrations of 'scientists changing their minds' without any discussion of what this reveals about the nature of scientific knowledge, falsifiability, or induction. The claim that math is certain because '2+2=4 and everyone agrees' conflates consensus with logical necessity and ignores debates within the philosophy of mathematics (e.g., Gödel's incompleteness theorems, the foundations crisis, formalism vs. Platonism). There is no use of TOK concepts or vocabulary (e.g., deductive reasoning, empirical verification, falsifiability, paradigm shifts, axioms). No thinkers, scholars, or theorists are cited. The counterclaim about imaginary numbers is dismissed in one sentence without genuine engagement. There is no consideration of implications or of what it would mean — epistemologically — for certainty to be or not be attainable. The tone and register ('which is crazy to think about now', 'my math teacher always says') are inappropriate for a TOK essay. A score of 2 reflects that a response exists and has a loose connection to the title, but it does not rise to the Basic band because arguments are not developed and examples do not effectively support any analytical claim."
      }
    ],
    "excerpt": "Can we ever be certain about anything in science and math? This is a really interesting question that many people have thought about. In my opinion, certainty is possible in math but not really in science, and I will explain why I think this. First of all, math is certain because it is based on…",
    "wordCount": 399
  },
  {
    "tier": "mid",
    "bandLabel": "Band 3–4 · Basic",
    "heading": "What a developing essay looks like",
    "designNote": "Clear structure, terms defined, standard examples — but the analysis stays descriptive, counterclaims are thin, and examples don’t do real argumentative work.",
    "score": 4,
    "max": 10,
    "band": "3-4",
    "comment": "This essay addresses the prescribed title in a recognizable way and demonstrates basic understanding of the two areas of knowledge selected. However, it is largely descriptive and survey-like rather than genuinely analytical or argumentative. The response moves through familiar touchstones — Euclid's prime number proof, non-Euclidean geometry, Popper's falsifiability, and Newtonian physics — but treats them as illustrative facts rather than tools for genuine epistemological reasoning. There is little evidence of sustained critical exploration, evaluation of competing perspectives, or engagement with the nuances the title demands. The essay does not develop a clear knowledge question or demonstrate the kind of rigorous TOK thinking expected at the higher bands. It sits solidly in the Basic band (3–4), earning a 4 for connecting meaningfully to the title and offering some recognizable examples, but falling short of the Satisfactory band due to the absence of genuine argument development, limited awareness of points of view, and no real consideration of implications.",
    "criteria": [
      {
        "name": "Holistic assessment — global impression",
        "score": 4,
        "max": 10,
        "comment": "The essay falls within the Basic band (3–4). It is connected to the title and the two areas of knowledge (mathematics and natural sciences) are identifiable, but the treatment is largely descriptive. Arguments are stated rather than developed: for instance, the claim that mathematical knowledge is certain because 'proofs are permanent' is asserted but not interrogated — what makes a proof valid? What role does human cognition play? The mention of non-Euclidean geometry is a promising move but is quickly dismissed without genuine exploration of its epistemological implications. Popper's falsifiability is introduced correctly but used superficially, and there is no engagement with critiques of Popper or alternative philosophies of science (e.g., Kuhn, Lakatos). Examples such as Newtonian physics are textbook-standard and are not used to build a nuanced argument. There is minimal awareness of different points of view — the essay briefly acknowledges that 'some people argue' humans make mistakes, but this is not meaningfully evaluated. No real-world context, personal insight, or ethical/practical implication is explored with depth. The conclusion restates the introduction without adding new analytical weight. To move into the Satisfactory band (5–6), the essay would need to develop genuine arguments with examples that are analysed rather than merely listed, show awareness of multiple perspectives, and begin to consider the implications of its claims."
      }
    ],
    "excerpt": "To what extent is certainty attainable in the natural sciences and mathematics? In this essay I will define certainty as knowledge that cannot be doubted, and I will look at mathematics first and then the natural sciences. In mathematics, knowledge comes from proofs. Once something is proven, it stays proven. For example, Euclid proved that…",
    "wordCount": 396
  },
  {
    "tier": "strong",
    "bandLabel": "Band 5–6 · Satisfactory",
    "heading": "What a solid essay looks like",
    "designNote": "Precise conditional claims, examples that carry the argument (Gödel, the four-colour theorem), a genuine counterclaim — concise, but the reasoning holds together.",
    "score": 5,
    "max": 10,
    "band": "5-6",
    "comment": "This essay demonstrates a reasonably focused and coherent exploration of the prescribed title, engaging with both mathematics and the natural sciences as areas of knowledge. The student correctly identifies the central tension between deductive certainty in mathematics and the inductive, falsifiable nature of scientific knowledge. References to Gödel, Popper, Newtonian mechanics, the Pythagorean theorem, and the four-color theorem show some intellectual range. However, the essay reads more as a confident survey of well-known philosophical positions than as a genuinely critical, personal exploration. The arguments are competent but underexplored, the examples function as illustrations rather than as evidence that genuinely tests or complicates the claims, and the awareness of different perspectives — while present — is superficial. Crucially, the essay is extremely short (approximately 320 words) relative to the 1,600-word limit, which severely limits the depth and development that the higher bands require. The conclusion offers a neat but underdeveloped resolution ('asymptotic certainty') that is asserted rather than argued through. At the Satisfactory band (5–6), the essay is focused with some AOK links and arguments offered with examples, but lacks the sustained critical development, effective evaluation of perspectives, and consideration of implications characteristic of the Good or Excellent bands.",
    "criteria": [
      {
        "name": "Holistic assessment — global impression",
        "score": 5,
        "max": 10,
        "comment": "Placed in the Satisfactory band (5–6). The essay is focused on the title and makes recognizable links to mathematics and natural sciences as AOKs. Arguments are offered and examples are cited (Gödel's incompleteness theorems, Popper's falsificationism, Newtonian mechanics, the four-color theorem). There is some awareness of different points of view — the counterclaim about human cognitive fallibility is briefly raised. However, the essay falls short of the Good band (7–8) for several reasons: the examples are not developed with sufficient specificity or personal engagement; the evaluation of perspectives is thin rather than genuine; and the implications of the arguments (e.g., what it actually means for a knower that mathematical certainty is 'conditional' or that scientific certainty is 'asymptotic') are stated rather than explored. The word count is drastically below the 1,600-word limit, which is the single most significant structural problem — the essay cannot demonstrate sustained focus, coherent argument, or effective support when it is roughly one-fifth of the permitted length. A score of 5 reflects focused but underdeveloped work that sits at the lower end of the Satisfactory band."
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
        at deliberately different quality levels, and ran each through the grader, which marks TOK holistically against the official 2022 instrument — one global-impression score out of 10, exactly as IB examiners do.
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
        The weak essay scored 2, the developing one 4, the strong one 5 — each landing in a different official band (Rudimentary, Basic, Satisfactory). That spread is the whole
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
