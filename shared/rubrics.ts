/**
 * IB Rubric Registry
 *
 * Each entry is keyed by `${essayType}::${subject}` (case-insensitive lookup).
 * For EE and TOK the key is just `EE::*` or `TOK::*` because the rubric
 * is the same regardless of subject.
 *
 * Sources: IB Subject Guides (first assessment 2024/2025 cycle).
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
}

// ─── Business Management IA (25 marks) ───────────────────────────────────────
const BM_IA: Rubric = {
  label: "Business Management IA",
  totalMarks: 25,
  criteria: [
    { name: "Criterion A: Research question", max: 3, descriptor: "Suitability and development of the research question" },
    { name: "Criterion B: Methodology", max: 4, descriptor: "Appropriateness and application of research methods" },
    { name: "Criterion C: Analysis and discussion of findings", max: 10, descriptor: "Depth and quality of analysis and discussion" },
    { name: "Criterion D: Conclusions", max: 3, descriptor: "Validity and appropriateness of conclusions" },
    { name: "Criterion E: Evaluation", max: 3, descriptor: "Evaluation of research and its limitations" },
    { name: "Criterion F: Structure and presentation", max: 2, descriptor: "Structure, layout, and presentation quality" },
  ],
};

// ─── Economics IA (per commentary, 3 commentaries × 14 marks = 45 total, but single commentary is 14) ──
// The IB Economics IA is assessed per commentary. Each commentary is marked /14.
// For a single-commentary analysis we use the per-commentary rubric.
const ECONOMICS_IA: Rubric = {
  label: "Economics IA (per commentary)",
  totalMarks: 14,
  criteria: [
    { name: "Criterion A: Diagrams", max: 3, descriptor: "Relevant, accurate, and correctly labelled diagrams" },
    { name: "Criterion B: Terminology", max: 2, descriptor: "Appropriate use of economic terminology" },
    { name: "Criterion C: Application", max: 2, descriptor: "Application of economic concepts to real-world examples" },
    { name: "Criterion D: Analysis", max: 3, descriptor: "Depth of economic analysis using theory and models" },
    { name: "Criterion E: Evaluation", max: 4, descriptor: "Balanced evaluation with synthesis and judgement" },
  ],
};

// ─── History IA (25 marks) ───────────────────────────────────────────────────
const HISTORY_IA: Rubric = {
  label: "History IA",
  totalMarks: 25,
  criteria: [
    { name: "Section 1: Identification and evaluation of sources", max: 6, descriptor: "Analysis of two sources with explicit reference to origin, purpose, value, and limitations" },
    { name: "Section 2: Investigation", max: 15, descriptor: "Critical analysis using evidence, different perspectives, and evaluation of interpretations" },
    { name: "Section 3: Reflection", max: 4, descriptor: "Reflection on methods used and their effect on the investigation" },
  ],
};

// ─── Sciences IA — Biology / Chemistry / Physics (24 marks) ──────────────────
const SCIENCES_IA: Rubric = {
  label: "Sciences IA (Biology / Chemistry / Physics)",
  totalMarks: 24,
  criteria: [
    { name: "Personal engagement", max: 2, descriptor: "Evidence of personal engagement with the exploration" },
    { name: "Exploration", max: 6, descriptor: "Topic, research question, background information, and methodology" },
    { name: "Analysis", max: 6, descriptor: "Recording, processing, and interpreting data" },
    { name: "Evaluation", max: 6, descriptor: "Evaluation of procedures, results, and impact of uncertainties" },
    { name: "Communication", max: 4, descriptor: "Presentation, structure, and academic honesty" },
  ],
};

// ─── Mathematics IA (20 marks) ───────────────────────────────────────────────
const MATH_IA: Rubric = {
  label: "Mathematics IA",
  totalMarks: 20,
  criteria: [
    { name: "Criterion A: Presentation", max: 4, descriptor: "Organization, coherence, and conciseness of the exploration" },
    { name: "Criterion B: Mathematical communication", max: 4, descriptor: "Appropriate use of mathematical language, notation, and representations" },
    { name: "Criterion C: Personal engagement", max: 3, descriptor: "Evidence of independent thinking, creativity, and personal interest" },
    { name: "Criterion D: Reflection", max: 3, descriptor: "Meaningful reflection on results and the exploration process" },
    { name: "Criterion E: Use of mathematics", max: 6, descriptor: "Relevant, sophisticated, and correct mathematics commensurate with the level" },
  ],
};

// ─── Psychology IA (22 marks) ────────────────────────────────────────────────
const PSYCHOLOGY_IA: Rubric = {
  label: "Psychology IA",
  totalMarks: 22,
  criteria: [
    { name: "Introduction", max: 6, descriptor: "Identification of the study, aim, and relevance of the replication" },
    { name: "Exploration", max: 4, descriptor: "Description and justification of the methodology" },
    { name: "Analysis", max: 6, descriptor: "Application of appropriate descriptive and inferential statistics" },
    { name: "Evaluation", max: 6, descriptor: "Discussion of results, limitations, and suggestions for modification" },
  ],
};

// ─── Computer Science IA (34 marks) ──────────────────────────────────────────
const CS_IA: Rubric = {
  label: "Computer Science IA",
  totalMarks: 34,
  criteria: [
    { name: "Criterion A: Planning", max: 6, descriptor: "Definition of the problem, rationale, and success criteria" },
    { name: "Criterion B: Solution overview", max: 6, descriptor: "Record of tasks, design, and structure of the solution" },
    { name: "Criterion C: Development", max: 12, descriptor: "Techniques, existing tools, and structure of the product" },
    { name: "Criterion D: Functionality and extensibility", max: 4, descriptor: "Product functionality, impact, and extensibility" },
    { name: "Criterion E: Evaluation", max: 6, descriptor: "Evaluation against success criteria and recommendations" },
  ],
};

// ─── Extended Essay (34 marks) ───────────────────────────────────────────────
const EXTENDED_ESSAY: Rubric = {
  label: "Extended Essay",
  totalMarks: 34,
  criteria: [
    { name: "Criterion A: Focus and method", max: 6, descriptor: "Topic, research question, and methodology" },
    { name: "Criterion B: Knowledge and understanding", max: 6, descriptor: "Context, subject-specific terminology, and concepts" },
    { name: "Criterion C: Critical thinking", max: 12, descriptor: "Research, analysis, discussion, and evaluation" },
    { name: "Criterion D: Presentation", max: 4, descriptor: "Structure, layout, and formal presentation elements" },
    { name: "Criterion E: Engagement", max: 6, descriptor: "Intellectual initiative and reflective process (RPPF)" },
  ],
};

// ─── TOK Essay (10 marks) ────────────────────────────────────────────────────
const TOK_ESSAY: Rubric = {
  label: "TOK Essay",
  totalMarks: 10,
  criteria: [
    { name: "Understanding knowledge questions", max: 3, descriptor: "Identification and exploration of knowledge questions connected to the prescribed title" },
    { name: "Quality of analysis of knowledge questions", max: 3, descriptor: "Arguments and counter-arguments with effective use of examples" },
    { name: "Quality of overall essay", max: 4, descriptor: "Structure, clarity, factual accuracy, and insightfulness" },
  ],
};

// ─── TOK Exhibition (10 marks) ───────────────────────────────────────────────
const TOK_EXHIBITION: Rubric = {
  label: "TOK Exhibition",
  totalMarks: 10,
  criteria: [
    { name: "Links between objects and the selected IA prompt", max: 4, descriptor: "Specific, real-world objects clearly connected to the chosen IA prompt" },
    { name: "Links between objects and TOK", max: 3, descriptor: "Effective connections to TOK concepts and knowledge questions" },
    { name: "Quality of justification", max: 3, descriptor: "Coherent, convincing justification of each object's significance" },
  ],
};

// ─── Registry ─────────────────────────────────────────────────────────────────

const RUBRIC_REGISTRY: Record<string, Rubric> = {
  // Business Management IA
  "IA::Business Management": BM_IA,

  // Economics IA
  "IA::Economics": ECONOMICS_IA,

  // History IA
  "IA::History": HISTORY_IA,

  // Sciences IA (shared rubric)
  "IA::Biology": SCIENCES_IA,
  "IA::Chemistry": SCIENCES_IA,
  "IA::Physics": SCIENCES_IA,

  // Mathematics IA
  "IA::Mathematics": MATH_IA,

  // Psychology IA
  "IA::Psychology": PSYCHOLOGY_IA,

  // Computer Science IA
  "IA::Computer Science": CS_IA,

  // Extended Essay — same rubric regardless of subject
  "EE::*": EXTENDED_ESSAY,

  // TOK Essay — same rubric regardless of subject
  "TOK::*": TOK_ESSAY,
};

/**
 * Look up the IB rubric for a given (essayType, subject) combination.
 *
 * Returns `undefined` if no rubric is registered for the combination.
 *
 * Lookup order:
 * 1. Exact match: `${type}::${subject}`
 * 2. Wildcard match: `${type}::*` (for EE and TOK which are subject-agnostic)
 */
export function getRubric(essayType: string, subject: string): Rubric | undefined {
  const exactKey = `${essayType}::${subject}`;
  if (RUBRIC_REGISTRY[exactKey]) return RUBRIC_REGISTRY[exactKey];

  const wildcardKey = `${essayType}::*`;
  if (RUBRIC_REGISTRY[wildcardKey]) return RUBRIC_REGISTRY[wildcardKey];

  return undefined;
}

/**
 * Build a prompt fragment describing the rubric for the AI to use.
 * Returns empty string if no rubric is available.
 */
export function buildRubricPromptFragment(essayType: string, subject: string): string {
  const rubric = getRubric(essayType, subject);
  if (!rubric) return "";

  const criteriaLines = rubric.criteria
    .map((c, i) => `  ${i + 1}. ${c.name} (max ${c.max} marks): ${c.descriptor}`)
    .join("\n");

  return `
OFFICIAL IB RUBRIC for ${rubric.label} (total: ${rubric.totalMarks} marks):
${criteriaLines}

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
export { RUBRIC_REGISTRY };
