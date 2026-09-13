/**
 * IB Rubric Registry, VERIFIED against official IB subject guides (July 2026).
 *
 * Each entry is keyed by `${essayType}::${subject}` (case-insensitive lookup).
 * For EE and TOK the key is just `EE::*` or `TOK::*` because the rubric
 * is subject-agnostic.
 *
 * Sources: official IB guides (verbatim assessment instruments). Every mark
 * allocation below was cross-checked against the guide for the syllabus in
 * force for the 2026 exam sessions. Where a new syllabus takes over at
 * first assessment May 2027, it is flagged in `notes`, Session-aware dual rubrics for EE,
 * Psychology and Computer Science are implemented: see the EE27 and IA27 keys.
 */

export interface RubricCriterion {
  /** Official IB criterion label, e.g. "Criterion A: Research question" */
  name: string;
  /** Maximum marks for this criterion */
  max: number;
  /** Short descriptor of what this criterion assesses */
  descriptor: string;
}

export interface Rubric {
  /** Display label, e.g. "Business Management IA" */
  label: string;
  /** Total marks across all criteria */
  totalMarks: number;
  /** Ordered list of criteria */
  criteria: RubricCriterion[];
  /** True when the official instrument is a single holistic (global impression) scale */
  holistic?: boolean;
  /** Extra official rules the grader must know (word limits, band labels, caps) */
  notes?: string;
  /**
   * The official word limit, as the guide states it. Counted on the pasted text by
   * the server and reported next to the mark; `excludes` is what the official count
   * leaves out, in the guide's own terms, so the report can say what explains a gap.
   */
  wordLimit?: {
    max: number;
    min?: number;
    unit?: string;
    excludes: string;
    /** The guide or the assessment procedures say marking stops at the limit. */
    stopsAt?: boolean;
  };
}

// ─── Business Management IA, "Business research project" (first assessment May 2024) ──
// SL and HL identical. Max 1,800 words; 3-5 supporting documents (≤3 years old);
// key concept must be one of: change, creativity, ethics, sustainability.
const BM_IA: Rubric = {
  label: "Business Management IA (Business research project, 2024 syllabus)",
  totalMarks: 25,
  criteria: [
    { name: "Criterion A: Integration of a key concept", max: 5, descriptor: "How effectively the analysis of the connection between the one chosen key concept (change, creativity, ethics or sustainability) and the organization is integrated throughout the project: describing the connection is 2 marks, analysing it 3, partially integrating that analysis 4, integrating it throughout 5" },
    { name: "Criterion B: Supporting documents", max: 4, descriptor: "Three to five relevant supporting documents that address the research question in sufficient depth; the top mark needs a range of ideas and views (documents all from one company do not give balance). One or two, or more than five, documents limit this criterion to 1 mark" },
    { name: "Criterion C: Selection and application of tools and theories", max: 4, descriptor: "Appropriate selection and accurate application of business management tools and theories to the research question" },
    { name: "Criterion D: Analysis and evaluation", max: 5, descriptor: "Selection and use of data from the supporting documents in the analysis and evaluation of the research question; the top mark needs sustained integration of ideas and consideration of the assumptions underpinning the arguments and their implications" },
    { name: "Criterion E: Conclusions", max: 3, descriptor: "Conclusions consistent with the evidence presented that explicitly answer the research question" },
    { name: "Criterion F: Structure", max: 2, descriptor: "Logical structure of the project" },
    { name: "Criterion G: Presentation", max: 2, descriptor: "All required presentation elements: a title page, an accurate table of contents, appropriate headings and sub-headings, and numbered pages" },
  ],
  notes: "Word limit 1,800 (moderators do not read beyond it). Requires 3-5 supporting documents no older than 3 years. The key concept must be one of: change, creativity, ethics, sustainability.",
  wordLimit: { max: 1800, excludes: "acknowledgments, the contents page, tables of statistical data, diagrams or figures, equations and calculations, the supporting documents, citations, references and the bibliography", stopsAt: true },
};

// ─── Economics IA (2022 syllabus), per commentary ───────────────────────────
// Portfolio = 3 commentaries × 14 marks + Criterion F: Rubric requirements (3) = 45.
// Each commentary max 800 words; each uses a DIFFERENT unit and a DIFFERENT key concept.
const ECONOMICS_IA: Rubric = {
  label: "Economics IA (per commentary, 2022 syllabus)",
  totalMarks: 14,
  criteria: [
    { name: "Criterion A: Diagrams", max: 3, descriptor: "Relevant, accurate and correctly labelled diagrams with full explanation" },
    { name: "Criterion B: Terminology", max: 2, descriptor: "Relevant economic terminology used appropriately throughout" },
    { name: "Criterion C: Application and analysis", max: 3, descriptor: "Relevant economic theory applied to the article with an effective economic analysis" },
    { name: "Criterion D: Key concept", max: 3, descriptor: "Identification and effective linkage of ONE key concept (e.g. scarcity, efficiency, intervention, equity) to the article" },
    { name: "Criterion E: Evaluation", max: 3, descriptor: "Judgments supported by effective and balanced reasoning (for example weighing short run against long run, different stakeholders, and the assumptions behind the prediction)" },
  ],
  notes: "Word limit 800 per commentary, moderators will not read beyond 800 words. The full portfolio is marked out of 45: three commentaries (14 each) + Criterion F: Rubric requirements (3): different units, different sources, articles no older than one year. Each commentary must use a different key concept.",
  wordLimit: { max: 800, unit: "per commentary", excludes: "acknowledgments, the contents page, diagrams with their short labels and headings, tables of statistical data, equations and calculations, citations and references", stopsAt: true },
};

// ─── History IA (current guide, first assessment 2017/2020 print) ────────────
const HISTORY_IA: Rubric = {
  label: "History IA",
  totalMarks: 25,
  criteria: [
    { name: "Criterion A: Identification and evaluation of sources", max: 6, descriptor: "The question for investigation clearly stated as a question; appropriate, relevant sources with their relevance to the investigation explained; detailed analysis and evaluation of two sources, with explicit discussion of their value and limitations for the investigation by reference to origins, purpose and content" },
    { name: "Criterion B: Investigation", max: 15, descriptor: "A clear, coherent, well-organized investigation with well-developed critical analysis focused on the question, evidence from a range of sources used effectively, evaluation of different perspectives (awareness without evaluation stays in the 7-9 band), and a reasoned conclusion consistent with the evidence" },
    { name: "Criterion C: Reflection", max: 4, descriptor: "Reflection on what the investigation highlighted about the methods used by historians and the challenges they face, with a clear and explicit connection to the rest of the investigation" },
  ],
  notes: "Word limit 2,200 (bibliography and references not counted). SL and HL identical. Section 1 = Criterion A, Section 2 = Criterion B, Section 3 = Criterion C. The topic cannot be about events in the last 10 years. Sources may be primary, secondary or both.",
  wordLimit: { max: 2200, excludes: "the bibliography and the references" },
};

// ─── Sciences IA, "Scientific investigation" (first assessment May 2025) ────
// Applies to ALL current candidates (M25 onward). SL and HL identical; report max 3,000 words.
const SCIENCES_IA: Rubric = {
  label: "Sciences IA, Scientific investigation (Biology / Chemistry / Physics, 2025 syllabus)",
  totalMarks: 24,
  criteria: [
    { name: "Research design", max: 6, descriptor: "Research question described within a specific and appropriate context (a broad context is the 3-4 band); methodological considerations explained (measurement of variables, choice of database or model and sampling, range and repetition of data, control variables, safety, ethical and environmental issues); methodology described well enough for the investigation to be reproduced" },
    { name: "Data analysis", max: 6, descriptor: "Recording, processing and presentation of data, including consideration of uncertainties, in ways relevant to the research question" },
    { name: "Conclusion", max: 6, descriptor: "Conclusion justified by the analysis, answering the research question and compared with the accepted scientific context" },
    { name: "Evaluation", max: 6, descriptor: "The relative impact of specific methodological weaknesses or limitations explained, with realistic improvements relevant to them explained (generic weaknesses are the 1-2 band)" },
  ],
  notes: "Report maximum 3,000 words. SL and HL use the same criteria. (The pre-2025 rubric, Personal engagement / Exploration / Analysis / Evaluation / Communication, no longer applies to any current candidate.)",
  wordLimit: { max: 3000, excludes: "charts and diagrams, data tables, equations and calculations, citations and references, the bibliography and headers" },
};

// ─── Mathematics AA & AI IA, "Exploration" (first assessment 2021) ──────────
const MATH_IA: Rubric = {
  label: "Mathematics IA, Exploration (AA & AI)",
  totalMarks: 20,
  criteria: [
    { name: "Criterion A: Presentation", max: 4, descriptor: "Organization and coherence of the exploration" },
    { name: "Criterion B: Mathematical communication", max: 4, descriptor: "Relevant, appropriate and consistent mathematical communication: notation, symbols and terminology; key terms and variables defined where required; multiple forms of representation where appropriate; deductive method and proofs set out logically where appropriate (calculator or computer notation is acceptable only in software output)" },
    { name: "Criterion C: Personal engagement", max: 3, descriptor: "Evidence that the student makes the mathematics their own: thinking independently or creatively, presenting ideas in their own way, exploring the topic from different perspectives, making and testing predictions (not a measure of effort; textbook-style reproduction rarely reaches the higher levels)" },
    { name: "Criterion D: Reflection", max: 3, descriptor: "Critical reflection on the exploration linked to the aim, and on the significance of results" },
    { name: "Criterion E: Use of mathematics", max: 6, descriptor: "Relevant mathematics commensurate with the level of the course, correct, with understanding demonstrated; at HL level 5 also requires sophistication or rigour, and level 6 precise mathematics with sophistication and rigour" },
  ],
  notes: "Criterion E has separate SL and HL level descriptors (same maximum): HL level 5 requires sophistication or rigour and level 6 both; SL requires correct mathematics commensurate with the course level, demonstrating thorough understanding. The analyzer does not ask for the course or level. If the text states them (AA or AI, SL or HL), apply that level; if it does not, say in the Criterion E comment which level you assumed and why.",
};

// ─── Psychology IA (guide first assessment 2019, LAST assessment Nov 2026) ──
// TODO(M27): new research-proposal IA from May 2027: A Introduction 6 / B Research
// methodology 6 / C Data collection 6 / D Discussion 6 = 24, max 2,200 words.
const PSYCHOLOGY_IA: Rubric = {
  label: "Psychology IA (experimental report, through Nov 2026)",
  totalMarks: 22,
  criteria: [
    { name: "I. Introduction", max: 6, descriptor: "Aim, link to the background theory or model, and operationalized variables" },
    { name: "II. Exploration", max: 4, descriptor: "Research design, sampling technique, choice of participants, controlled variables and choice of materials explained (described only is the 1-2 band)" },
    { name: "III. Analysis", max: 6, descriptor: "Correct descriptive and inferential statistics, appropriately graphed, with statistical significance addressed" },
    { name: "IV. Evaluation", max: 6, descriptor: "Findings discussed in the context of the background theory; strengths, limitations and improvements" },
  ],
  notes: "Report 1,800-2,200 words. This rubric applies through November 2026; the May 2027 syllabus replaces it with a research proposal (24 marks).",
  wordLimit: { min: 1800, max: 2200, excludes: "the appendices" },
};

// ─── Computer Science IA (2014 syllabus, LAST assessment Nov 2026) ──────────
// TODO(M27): new "computational solution" from May 2027: A Problem specification 4 /
// B Planning 4 / C System overview 6 / D Development 12 / E Evaluation 4 = 30.
const CS_IA: Rubric = {
  label: "Computer Science IA (solution, through Nov 2026)",
  totalMarks: 34,
  criteria: [
    { name: "Criterion A: Planning", max: 6, descriptor: "Problem definition, rationale for the proposed solution, and success criteria" },
    { name: "Criterion B: Solution overview", max: 6, descriptor: "Record of tasks and design overview including test plan" },
    { name: "Criterion C: Development", max: 12, descriptor: "Use of appropriate techniques demonstrating complexity and ingenuity, with sources acknowledged" },
    { name: "Criterion D: Functionality and extensibility of product", max: 4, descriptor: "A functional product with evidence (video) and maintainable design" },
    { name: "Criterion E: Evaluation", max: 6, descriptor: "Evaluation against success criteria, client/adviser feedback, and recommendations for further development" },
  ],
  notes: "This 34-mark rubric applies through November 2026; the May 2027 syllabus replaces it with a 30-mark computational solution. The product and the video are not part of the pasted documentation: mark Development and Functionality on what the documentation shows, and say in those comments that the product and video were not seen.",
};

// ─── Extended Essay (guide first assessment 2018, applies through Nov 2026) ─
// TODO(M27): students who began the DP in Aug/Sep 2025 (May 2027 session) use the NEW
// 30-mark EE: A Framework for the essay 6 / B Knowledge and understanding 6 /
// C Analysis and line of argument 6 / D Discussion and evaluation 8 / E Reflection 4.
const EXTENDED_ESSAY: Rubric = {
  label: "Extended Essay (through Nov 2026)",
  totalMarks: 34,
  criteria: [
    { name: "Criterion A: Focus and method", max: 6, descriptor: "Topic, research question and methodology: clear, focused and appropriate" },
    { name: "Criterion B: Knowledge and understanding", max: 6, descriptor: "Context, subject-specific terminology and concepts used accurately" },
    { name: "Criterion C: Critical thinking", max: 12, descriptor: "Research, analysis, discussion and evaluation building a reasoned argument" },
    { name: "Criterion D: Presentation", max: 4, descriptor: "Structure and layout following expected conventions" },
    { name: "Criterion E: Engagement", max: 6, descriptor: "Intellectual engagement and reflection on the process and its focus (assessed with the RPPF)" },
  ],
  notes: "Word limit 4,000: examiners do not read or assess beyond it (no separate deduction). There is NO minimum word count. Citations/references, bibliography, contents page, tables, equations, maps/charts/diagrams and the RPPF are excluded from the count; quotations and substantive (non-reference) footnotes are included. An abstract is no longer required (dropped in 2018).",
  wordLimit: { max: 4000, excludes: "citations and references, the bibliography, contents page, tables, equations, charts and diagrams", stopsAt: true },
};

// ─── TOK Essay (first assessment May 2022), HOLISTIC, single instrument /10 ─
const TOK_ESSAY: Rubric = {
  label: "TOK Essay (2022 assessment instrument)",
  totalMarks: 10,
  holistic: true,
  criteria: [
    { name: "Holistic assessment, global impression", max: 10, descriptor: "Does the student provide a clear, coherent and critical exploration of the essay title?" },
  ],
  notes: "Marked holistically against ONE instrument (no sub-criteria), guided by: \"Does the student provide a clear, coherent and critical exploration of the essay title?\" Bands: Excellent 9-10 (sustained focus on the title, effectively linked to areas of knowledge; clear, coherent arguments effectively supported by specific examples; implications considered; different points of view evaluated). Good 7-8 (focused on the title, linked to AOKs; clear coherent arguments supported by examples; awareness and some evaluation of points of view). Satisfactory 5-6 (focused with some AOK links; arguments offered with examples; some awareness of points of view). Basic 3-4 (connected to the title but largely descriptive; limited or unclear arguments without effective examples). Rudimentary 1-2 (weakly connected; descriptive or unsupported assertions). 0 = below standard or not a response to a prescribed title. Word limit 1,600. Rules for justifying the mark: evaluation of points of view is described from the Good band upward (Satisfactory needs only some awareness of them); the 2022 course has no ways of knowing, so never refer to them; do not require a personal perspective or any other feature the band descriptors do not name.",
  wordLimit: { max: 1600, excludes: "acknowledgments, references (in footnotes, endnotes or in the text), the bibliography, and maps, charts, diagrams, illustrations or tables", stopsAt: true },
};

// ─── TOK Exhibition (first assessment May 2022), HOLISTIC, single instrument /10 ─
const TOK_EXHIBITION: Rubric = {
  label: "TOK Exhibition (2022 assessment instrument)",
  totalMarks: 10,
  holistic: true,
  criteria: [
    { name: "Holistic assessment, global impression", max: 10, descriptor: "Does the exhibition successfully show how TOK manifests in the world around us?" },
  ],
  notes: "Marked holistically against ONE instrument (no sub-criteria), guided by: \"Does the exhibition successfully show how TOK manifests in the world around us?\" Bands: Excellent 9-10 (three objects with specific real-world contexts; links to the ONE selected IA prompt clearly made and well explained; strong justification of each object\u2019s contribution; points supported by evidence and explicit references to the prompt). Good 7-8 (three objects and their real-world contexts identified; links to the selected IA prompt explained, though the explanation may lack precision and clarity in parts; a justification of each object's contribution; many points supported by appropriate evidence and references to the prompt). Satisfactory 5-6 (three objects, but their real-world contexts may be vaguely or imprecisely stated; some explanation of the links to the prompt; some justification for including each object; some points supported by evidence and references to the prompt). Basic 3-4 (three objects, but contexts may be implied rather than stated; basic links to the prompt whose explanation is unconvincing and/or unfocused; superficial justification for each object, not supported by appropriate evidence and/or lacking relevance to the prompt; there may be significant repetition across the justifications). Rudimentary 1-2 (three objects, but contexts not stated, or images that are highly generic images of types of object rather than specific real-world objects; links minimal, tenuous or unclear; very little justification; highly descriptive or unsupported assertions). 0 = does not reach these levels or does not use one of the IA prompts. Commentary max 950 words total. Rules: with images and commentaries for only two objects the maximum is 6 marks; with only one object the maximum is 3 marks.",
  wordLimit: { max: 950, excludes: "text on the objects themselves, acknowledgments, references and the bibliography", stopsAt: true },
};

// ─── English A: Individual Oral (IA, both Language A courses, FA 2021) ───────
const ENGLISH_LANG_LIT_IA: Rubric = {
  label: "English A: Language and Literature, Individual Oral",
  totalMarks: 40,
  criteria: [
    { name: "Criterion A: Knowledge, understanding and interpretation", max: 10, descriptor: "Knowledge and understanding of the extracts and works/texts, and interpretation of their implications in relation to the global issue" },
    { name: "Criterion B: Analysis and evaluation", max: 10, descriptor: "Analysis and evaluation of how authorial/textual choices present the global issue" },
    { name: "Criterion C: Focus and organization", max: 10, descriptor: "Structured, balanced and focused delivery with connected ideas" },
    { name: "Criterion D: Language", max: 10, descriptor: "Clear, accurate and effective language appropriate to the task" },
  ],
};

const ENGLISH_LIT_IA: Rubric = {
  label: "English A: Literature, Individual Oral",
  totalMarks: 40,
  criteria: [
    { name: "Criterion A: Knowledge, understanding and interpretation", max: 10, descriptor: "Knowledge and understanding of the extracts and works, and interpretation of their implications in relation to the global issue" },
    { name: "Criterion B: Analysis and evaluation", max: 10, descriptor: "Analysis and evaluation of how authorial choices present the global issue" },
    { name: "Criterion C: Focus and organization", max: 10, descriptor: "Structured, balanced and focused delivery with connected ideas" },
    { name: "Criterion D: Language", max: 10, descriptor: "Clear, accurate and effective language appropriate to the task" },
  ],
};

// ─── Visual Arts, Comparative Study (external; LAST assessment Nov 2026) ────
// SL instrument (30). HL adds Criterion F: Making connections to own art-making practice (12) = 42.
// TODO(M27): component ABOLISHED in the new VA syllabus (first assessment 2027).
const VISUAL_ARTS_IA: Rubric = {
  label: "Visual Arts, Comparative Study (externally assessed, SL instrument, through Nov 2026)",
  totalMarks: 30,
  criteria: [
    { name: "Criterion A: Analysis of formal qualities", max: 6, descriptor: "Analysis of the formal qualities of the selected artworks" },
    { name: "Criterion B: Interpretation of function and purpose", max: 6, descriptor: "Interpretation of function and purpose within the cultural context" },
    { name: "Criterion C: Evaluation of cultural significance", max: 6, descriptor: "Evaluation of the cultural significance of the selected pieces" },
    { name: "Criterion D: Making comparisons and connections", max: 6, descriptor: "Critical comparison and connections between the selected pieces" },
    { name: "Criterion E: Presentation and subject-specific language", max: 6, descriptor: "Structured presentation using appropriate subject-specific language" },
  ],
  notes: "This is the comparative study, externally assessed coursework, not the Visual Arts internal assessment (the exhibition). This is the SL instrument (30). HL is additionally assessed on Criterion F: Making connections to own art-making practice (12), total 42, state which level the work is for. The comparative study is abolished in the 2027 syllabus.",
};

// ─── Music, Exploring music in context (portfolio, FA 2022) ─────────────────
const MUSIC_IA: Rubric = {
  label: "Music, Exploring music in context (externally assessed portfolio)",
  totalMarks: 24,
  criteria: [
    { name: "Criterion A: Selection of evidence", max: 6, descriptor: "Diversity, breadth and balance of the musical material chosen as evidence (contrasting material from personal, local and global contexts in at least two areas of inquiry), with evidence well chosen to support the findings" },
    { name: "Criterion B1: Conducting musical research", max: 9, descriptor: "How well the student extracts, communicates and locates musical and extra-musical findings, and how effective those findings are, using accurate terminology" },
    { name: "Criterion B2: Implications", max: 3, descriptor: "Explanation of the implications of the research for creating and performing in the selected styles" },
    { name: "Criterion C1: Understanding creating conventions", max: 3, descriptor: "Understanding of creating conventions demonstrated in the practical exercises" },
    { name: "Criterion C2: Understanding performing practices", max: 3, descriptor: "Understanding of performing practices demonstrated in the practical exercises" },
  ],
  notes: "This is Exploring music in context, externally assessed coursework, not the Music internal assessment (Experimenting with music). Portfolio maximum 2,400 words.",
  wordLimit: { max: 2400, excludes: "track lists in an appendix, citations and the bibliography" },
};

// ─── Film, Textual Analysis (external, FA 2019 / 2nd edition FA 2023) ───────
const FILM_IA: Rubric = {
  label: "Film, Textual Analysis (externally assessed)",
  totalMarks: 28,
  criteria: [
    { name: "Criterion A: Cultural context", max: 8, descriptor: "Understanding of the cultural context of the film text, supported by research from appropriate and relevant sources" },
    { name: "Criterion B: Film elements", max: 12, descriptor: "Analysis of how film elements construct meaning in the extract" },
    { name: "Criterion C: Relationships within the film text", max: 8, descriptor: "How the cultural context and the identified film elements in the extract relate to each other and to the film text as a whole (and, where appropriate, to other films)" },
  ],
  notes: "This is the textual analysis, externally assessed coursework, not the Film internal assessment (the film portfolio). 1,750 words plus a list of sources.",
  wordLimit: { max: 1750, excludes: "the list of sources and the labels on illustrations", stopsAt: true },
};


// ─── Extended Essay, NEW syllabus (first assessment May 2027) ───────────────
// For students who began the DP in Aug/Sep 2025. RPPF replaced by RPF with a
// single 500-word reflective statement.
const EXTENDED_ESSAY_2027: Rubric = {
  label: "Extended Essay (May 2027 syllabus)",
  totalMarks: 30,
  criteria: [
    { name: "Criterion A: Framework for the essay", max: 6, descriptor: "Research question, method and structure appropriate to the essay (absorbs the former Presentation criterion)" },
    { name: "Criterion B: Knowledge and understanding", max: 6, descriptor: "Knowledge and understanding of the topic and effective use of subject-specific terminology and concepts" },
    { name: "Criterion C: Analysis and line of argument", max: 6, descriptor: "Effective analysis of the research, with findings consistently relevant to the research question, and a coherent line of argument" },
    { name: "Criterion D: Discussion and evaluation", max: 8, descriptor: "A balanced discussion of the significance of the findings, supported by appropriate evidence, and an evaluation of the effectiveness of the essay with its relevant strengths and limitations explained. This is the highest-weighted criterion" },
    { name: "Criterion E: Reflection", max: 4, descriptor: "Evaluative reflection, with specific examples, on the effect of the extended essay learning experience on the student as a learner, showing growth and transfer of learning (reflection that only describes the process is the lowest level); assessed on the 500-word reflective statement (RPF)" },
  ],
  notes: "New EE for the May 2027 session onward: 30 marks. Word limit 4,000. The RPPF is replaced by the RPF, a single reflective statement of up to 500 words.",
  wordLimit: { max: 4000, excludes: "citations and references, the bibliography, contents page, tables, equations, charts and diagrams", stopsAt: true },
};

// ─── Psychology IA, research proposal (first assessment May 2027) ───────────
const PSYCHOLOGY_IA_2027: Rubric = {
  label: "Psychology IA, Research proposal (May 2027 syllabus)",
  totalMarks: 24,
  criteria: [
    { name: "Criterion A: Introduction", max: 6, descriptor: "A clearly stated, focused aim or research question; a real-life problem described with its impact on the population of interest explained; the findings and conclusions of two pieces of relevant research explained and linked to the investigation" },
    { name: "Criterion B: Research methodology", max: 6, descriptor: "The choice of research method (experiment, interview, observation or survey/questionnaire) explained; the procedure explained (sampling technique, sample characteristics, design if experimental, setting, process); relevant ethical considerations described and explicitly linked to the investigation" },
    { name: "Criterion C: Data collection", max: 6, descriptor: "One appropriate and effective data collection tool created by the student to measure behaviour (at least five items, copy in the appendix); the decisions made when creating it explained; potential challenges when collecting data explained and relevant to the investigation" },
    { name: "Criterion D: Discussion", max: 6, descriptor: "Potential findings described in detail with implications for policy or practice explained; relevant examples of how researcher bias may affect the investigation discussed; the usefulness of one additional research method discussed with reference to increasing understanding of the topic" },
  ],
  notes: "Research PROPOSAL: the study is designed but not carried out, so there are no results; do not ask for data or statistics. Ethical considerations belong to Criterion B. Max 2,200 words, examiners stop reading beyond the limit. SL and HL identical.",
  wordLimit: { max: 2200, excludes: "the references and appendices", stopsAt: true },
};

// ─── Computer Science IA, computational solution (first assessment May 2027) ─
const CS_IA_2027: Rubric = {
  label: "Computer Science IA, Computational solution (May 2027 syllabus)",
  totalMarks: 30,
  criteria: [
    { name: "Criterion A: Problem specification", max: 4, descriptor: "The problem scenario described in terms of measurable solution requirements; appropriate success criteria; the choice of computational context explained" },
    { name: "Criterion B: Planning", max: 4, descriptor: "A reasonable decomposition of the problem scenario and a plan that addresses the success criteria" },
    { name: "Criterion C: System overview", max: 6, descriptor: "A complete system model; algorithms for its components that enable the product to perform; a testing strategy aligned with the success criteria" },
    { name: "Criterion D: Development", max: 12, descriptor: "A fully functional product constructed with appropriate techniques to implement the algorithms; the choices made to implement the algorithms evaluated; the effectiveness of the testing strategy justified" },
    { name: "Criterion E: Evaluation", max: 4, descriptor: "Evaluation of the extent to which the success criteria were met, and justified improvements to the product" },
  ],
  notes: "Documentation capped at 2,000 words (excluding code excerpts, comments and diagrams) plus a video of up to 5 minutes. The former client requirement is removed. The product and the video are not part of the pasted documentation: mark Development on what the documentation shows, and say in that comment that the product and video were not seen.",
  wordLimit: { max: 2000, excludes: "code excerpts, comments and diagrams" },
};

const RUBRIC_REGISTRY: Record<string, Rubric> = {
  // Business Management IA
  "IA::Business Management": BM_IA,

  // Economics IA (per commentary)
  "IA::Economics": ECONOMICS_IA,

  // History IA
  "IA::History": HISTORY_IA,

  // Sciences IA, common 2025 instrument
  "IA::Biology": SCIENCES_IA,
  "IA::Chemistry": SCIENCES_IA,
  "IA::Physics": SCIENCES_IA,

  // Mathematics IA (AA & AI)
  "IA::Mathematics": MATH_IA,

  // Psychology IA (through Nov 2026)
  "IA::Psychology": PSYCHOLOGY_IA,

  // Computer Science IA (through Nov 2026)
  "IA::Computer Science": CS_IA,

  // English A Individual Oral
  "IA::English A: Language and Literature": ENGLISH_LANG_LIT_IA,
  "IA::English A: Lang & Lit": ENGLISH_LANG_LIT_IA,

  "IA::English A: Literature": ENGLISH_LIT_IA,

  // Visual Arts comparative study (SL instrument)
  "IA::Visual Arts": VISUAL_ARTS_IA,

  // Music portfolio
  "IA::Music": MUSIC_IA,

  // Film textual analysis
  "IA::Film": FILM_IA,

  // Extended Essay, same rubric regardless of subject (through Nov 2026)
  "EE::*": EXTENDED_ESSAY,

  // TOK Essay, holistic instrument
  "TOK::*": TOK_ESSAY,

  // TOK Exhibition, holistic instrument
  "TOK::Exhibition": TOK_EXHIBITION,

  // ── May 2027 syllabus track (selected via examSession="may2027") ──
  "EE27::*": EXTENDED_ESSAY_2027,
  "IA27::Psychology": PSYCHOLOGY_IA_2027,
  "IA27::Computer Science": CS_IA_2027,
};

/**
 * Look up a rubric:
 * 1. Exact match: `${type}::${subject}`
 * 2. Wildcard match: `${type}::*` (for EE and TOK which are subject-agnostic)
 */
export function getRubric(essayType: string, subject: string, examSession?: string): Rubric | undefined {
  // May 2027 track: try the "27"-suffixed registry first, then fall back to the
  // current-syllabus rubric (most subjects are unchanged in 2027).
  if (examSession === "may2027") {
    const key27 = `${essayType}27::${subject}`;
    const exact27 = Object.entries(RUBRIC_REGISTRY).find(([k]) => k.toLowerCase() === key27.toLowerCase());
    if (exact27) return exact27[1];
    const wild27 = Object.entries(RUBRIC_REGISTRY).find(([k]) => k.toLowerCase() === `${essayType}27::*`.toLowerCase());
    if (wild27) return wild27[1];
  }
  const exactKey = `${essayType}::${subject}`;
  const exact = Object.entries(RUBRIC_REGISTRY).find(([k]) => k.toLowerCase() === exactKey.toLowerCase());
  if (exact) return exact[1];

  const wildcardKey = `${essayType}::*`;
  const wildcard = Object.entries(RUBRIC_REGISTRY).find(([k]) => k.toLowerCase() === wildcardKey.toLowerCase());
  return wildcard ? wildcard[1] : undefined;
}

/**
 * Work that cannot be marked for a session because the component the criteria
 * belong to is not set in that session's syllabus. From May 2027 the Visual Arts
 * comparative study is replaced by the connections study (SL) and the artist
 * project (HL); marking a May 2027 draft on the comparative study criteria would
 * grade a student on a task they were never given.
 */
export function unmarkableReason(essayType: string, subject: string, examSession?: string): string | null {
  if (examSession === "may2027" && essayType === "IA" && subject.trim().toLowerCase() === "visual arts") {
    return "From May 2027 the Visual Arts comparative study is replaced by the connections study (SL) and the artist project (HL). IBLens does not have criteria for those yet, so it cannot mark Visual Arts work for the May 2027 session. If you sit your exams in 2026, choose the current syllabus.";
  }
  return null;
}

/**
 * Build a prompt fragment describing the rubric for the AI to use.
 * Returns empty string if no rubric is available.
 */
export function buildRubricPromptFragment(essayType: string, subject: string, examSession?: string): string {
  const rubric = getRubric(essayType, subject, examSession);
  if (!rubric) return "";

  if (rubric.holistic) {
    const c = rubric.criteria[0];
    return `
OFFICIAL IB ASSESSMENT INSTRUMENT for ${rubric.label} (holistic, total: ${rubric.totalMarks} marks):
This component is marked by GLOBAL IMPRESSION against a single holistic instrument, there are NO sub-criteria.
Guiding question: ${c.descriptor}
${rubric.notes ?? ""}

CRITICAL INSTRUCTIONS:
- Award ONE holistic mark from 0 to ${c.max} according to the band descriptors above.
- The "criteria" array in your JSON response must contain EXACTLY 1 object with name "${c.name}", your holistic score, max ${c.max}, and a comment justifying the band placement using the band language.
- Do NOT invent sub-criteria. Set band_range to the official band you placed the work in (e.g. "7-8").
`;
  }

  const criteriaLines = rubric.criteria
    .map((c, i) => `  ${i + 1}. ${c.name} (max ${c.max} marks): ${c.descriptor}`)
    .join("\n");

  return `
OFFICIAL IB RUBRIC for ${rubric.label} (total: ${rubric.totalMarks} marks):
${criteriaLines}
${rubric.notes ? "\nOFFICIAL RULES: " + rubric.notes : ""}

CRITICAL INSTRUCTIONS:
- You MUST score the work against EXACTLY these criteria, using the EXACT criterion names and mark allocations shown above.
- Each criterion score must be an integer from 0 to the stated maximum.
- The "criteria" array in your JSON response must contain exactly ${rubric.criteria.length} objects, one per criterion above, in the same order.
- Use the exact "name" strings shown above (e.g. "${rubric.criteria[0].name}").
- Do NOT invent additional criteria or omit any.
`;
}

/**
 * Get the TOK Exhibition rubric specifically.
 * This is a separate work type not covered by the standard essay types.
 */
export function getTokExhibitionRubric(): Rubric {
  return TOK_EXHIBITION;
}

// Re-export for testing
/**
 * IA subjects we can mark against published criteria. This is the list the UI
 * offers and the number the marketing copy is allowed to quote. Geography,
 * Environmental Systems and Societies and Philosophy are deliberately absent:
 * no rubric is loaded for them, so the grader would fall back to generic
 * feedback while the site promises the published criteria.
 */
export const IA_RUBRIC_SUBJECTS = [
  "Business Management",
  "Economics",
  "History",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "English A: Language and Literature",
  "English A: Literature",
  "Psychology",
  "Computer Science",
  "Visual Arts",
  "Music",
  "Film",
] as const;

/** Every subject above has to resolve, or the claim on the page stops being true. */
const MISSING_IA_RUBRICS = IA_RUBRIC_SUBJECTS.filter((s) => !getRubric("IA", s));
if (MISSING_IA_RUBRICS.length > 0) {
  console.warn(`[rubrics] IA subjects offered without a rubric: ${MISSING_IA_RUBRICS.join(", ")}`);
}

export { RUBRIC_REGISTRY };
