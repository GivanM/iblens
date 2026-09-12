/**
 * UCAS personal statement, 2026 entry onwards.
 *
 * Source: ucas.com, "How to write your personal statement: 2026 entry onwards" (checked 2026-09-12).
 * The statement is no longer one free-form essay: it is three questions sharing one 4,000-character
 * budget, each answer needing at least 350 characters. UCAS publishes no mark scheme for it, so this
 * module deliberately carries no scores, everything here is either quoted from UCAS or measurable.
 */

export const UCAS_TOTAL_CHAR_LIMIT = 4000;
export const UCAS_MIN_CHARS_PER_ANSWER = 350;

export interface UcasQuestion {
  id: "q1" | "q2" | "q3";
  /** Verbatim question text as it appears in the UCAS application. */
  question: string;
  /** What admissions tutors are looking for in this answer, in plain language. */
  looksFor: string;
}

export const UCAS_QUESTIONS: UcasQuestion[] = [
  {
    id: "q1",
    question: "Why do you want to study this course or subject?",
    looksFor:
      "A specific, evidenced motivation for this subject: what drew you in, and what you have followed up on since, and why this course rather than an adjacent one. Generic enthusiasm and childhood anecdotes carry no weight.",
  },
  {
    id: "q2",
    question: "How have your qualifications and studies helped you to prepare for this course or subject?",
    looksFor:
      "Concrete links between what you have studied and what the course demands: specific topics, skills and methods, not a restatement of your subjects. For IB applicants this is where the Extended Essay, HL subjects and TOK can do real work.",
  },
  {
    id: "q3",
    question: "What else have you done to prepare outside of education, and why are these experiences useful?",
    looksFor:
      "Experience beyond the classroom with the reflection attached: what you did, and what it taught you that is relevant to the course. The reflection matters more than the list.",
  },
];

/** UCAS: "admissions tutors are looking for evidence that you're passionate and knowledgeable about
 * the subject area you're looking to study further and have the relevant skills, experiences, and
 * potential to be a great student." */
export const UCAS_WHAT_TUTORS_LOOK_FOR =
  "Evidence that you are passionate and knowledgeable about the subject, and that you have the relevant skills, experiences and potential to be a great student.";

/** Rules stated by UCAS that a draft can be checked against mechanically or by reading. */
export const UCAS_RULES = [
  "The three answers are reviewed as one statement, do not repeat the same evidence across them.",
  "Evidence should be relevant and specific to the subject you are applying to.",
  "The 4,000 characters can be split across the three answers however you like, subject to a 350-character minimum each.",
  "Do not exaggerate: you may be asked to elaborate at interview.",
  "Do not use quotations from other people, or cliches.",
  "Do not post your statement online, UCAS runs submitted statements through similarity detection.",
];

export interface UcasAnswers {
  q1: string;
  q2: string;
  q3: string;
}

export interface UcasMechanicalCheck {
  perAnswer: Array<{
    id: "q1" | "q2" | "q3";
    chars: number;
    meetsMinimum: boolean;
    shareOfTotal: number;
  }>;
  totalChars: number;
  withinTotalLimit: boolean;
  charsRemaining: number;
  /** Answers under the minimum, or a split so lopsided that one question is effectively unanswered. */
  problems: string[];
}

/**
 * Character arithmetic is done here rather than by the model: limits are the one part of this
 * format that is exact, and a language model counting characters is the fastest way to lose trust.
 */
export function checkUcasMechanics(answers: UcasAnswers): UcasMechanicalCheck {
  const entries = UCAS_QUESTIONS.map((q) => {
    const chars = (answers[q.id] || "").length;
    return { id: q.id, chars };
  });
  const totalChars = entries.reduce((sum, e) => sum + e.chars, 0);
  const problems: string[] = [];

  const perAnswer = entries.map((e) => {
    const meetsMinimum = e.chars >= UCAS_MIN_CHARS_PER_ANSWER;
    if (!meetsMinimum) {
      problems.push(
        `Answer ${e.id.toUpperCase()} is ${e.chars} characters, UCAS will not accept it below ${UCAS_MIN_CHARS_PER_ANSWER}.`,
      );
    }
    return {
      id: e.id,
      chars: e.chars,
      meetsMinimum,
      shareOfTotal: totalChars > 0 ? Math.round((e.chars / totalChars) * 100) : 0,
    };
  });

  const withinTotalLimit = totalChars <= UCAS_TOTAL_CHAR_LIMIT;
  if (!withinTotalLimit) {
    problems.push(
      `Your three answers total ${totalChars} characters, ${totalChars - UCAS_TOTAL_CHAR_LIMIT} over the ${UCAS_TOTAL_CHAR_LIMIT} limit.`,
    );
  }

  const unused = UCAS_TOTAL_CHAR_LIMIT - totalChars;
  if (withinTotalLimit && unused > 600) {
    problems.push(
      `You have left ${unused} characters unused out of ${UCAS_TOTAL_CHAR_LIMIT}. That is space competitors are using for evidence.`,
    );
  }

  return {
    perAnswer,
    totalChars,
    withinTotalLimit,
    charsRemaining: unused,
    problems,
  };
}

/** System prompt for reviewing a statement. No scores: UCAS publishes no mark scheme. */
export function buildUcasSystemPrompt(course: string, universityType: string): string {
  return `You are an experienced UK university admissions tutor who has read thousands of UCAS personal statements for ${course}. You are reviewing a draft written in the format used from 2026 entry onwards: three separate questions sharing one 4,000-character budget.

WHAT THE STATEMENT IS JUDGED ON (UCAS guidance to applicants):
${UCAS_WHAT_TUTORS_LOOK_FOR}

THE THREE QUESTIONS, VERBATIM:
1. ${UCAS_QUESTIONS[0].question}
2. ${UCAS_QUESTIONS[1].question}
3. ${UCAS_QUESTIONS[2].question}

RULES STATED BY UCAS:
${UCAS_RULES.map((r) => `- ${r}`).join("\n")}

CRITICAL HONESTY RULES:
- UCAS publishes NO mark scheme and NO score for the personal statement. Never invent a score, a percentage, a band or an admission probability. Do not estimate chances of an offer.
- Judge the draft on evidence, specificity and relevance to ${course}, not on how pleasant it sounds.
- Be concrete: quote the applicant's own phrases when you criticise them, and say what is missing rather than only that something is weak.
- ${universityType === "competitive" ? `This applicant is targeting highly competitive courses, where most applicants have strong grades. Say plainly where the draft would not stand out against that field.` : `Judge against a typical applicant pool for this course.`}
- Character counts are computed separately and given to you. Do not count characters yourself.

IMPORTANT FORMATTING RULES:
- Respond with a single valid JSON object. No markdown, no text before or after the JSON.
- Write ALL text in plain text only. NEVER use HTML entities like &amp; &lt; &gt; &quot;, write the actual characters: & < > " instead.`;
}

export function buildUcasUserPrompt(
  course: string,
  answers: UcasAnswers,
  mechanics: UcasMechanicalCheck,
): string {
  const mech = mechanics.perAnswer
    .map((a) => `${a.id.toUpperCase()}: ${a.chars} characters (${a.shareOfTotal}% of the statement)`)
    .join("; ");

  return `Course applied for: ${course}

MEASURED ALREADY (do not recount): ${mech}. Total ${mechanics.totalChars} of ${UCAS_TOTAL_CHAR_LIMIT} characters.

QUESTION 1, ${UCAS_QUESTIONS[0].question}
${answers.q1 || "(left blank)"}

QUESTION 2, ${UCAS_QUESTIONS[1].question}
${answers.q2 || "(left blank)"}

QUESTION 3, ${UCAS_QUESTIONS[2].question}
${answers.q3 || "(left blank)"}

Respond with this exact JSON structure:
{
  "verdict": "One of: ready to submit | needs work | not competitive yet",
  "verdict_reason": "Two or three sentences explaining the verdict against what tutors look for",
  "answers": [
    {
      "id": "q1",
      "status": "One of: strong | adequate | weak",
      "working": "What this answer genuinely does well, quoting the applicant's own words",
      "missing": "What a tutor would expect here and cannot find",
      "fix": "The single most valuable change to this answer"
    },
    {
      "id": "q2",
      "status": "strong | adequate | weak",
      "working": "...",
      "missing": "...",
      "fix": "..."
    },
    {
      "id": "q3",
      "status": "strong | adequate | weak",
      "working": "...",
      "missing": "...",
      "fix": "..."
    }
  ],
  "statement_level": [
    {"title": "Issue across the statement as a whole", "description": "For example repeated evidence between answers, or a claim that is asserted but never evidenced"}
  ],
  "subject_fit": "How convincingly this reads as an application for ${course} specifically rather than a neighbouring subject",
  "next_steps": ["Most valuable revision first", "Then this", "Then this"]
}`;
}
