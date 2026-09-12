import { passageAt, type WordCheck } from "@shared/wordcount";

const n = (x: number) => x.toLocaleString("en-US");

/**
 * The length of the pasted text, measured on the server against the limit in the
 * subject guide. Shown in the free preview as well: it is a fact about the
 * student's own draft, not part of the marking they pay for.
 */
export function WordCheckNote({ check, text: essayText }: { check?: WordCheck | null; text?: string }) {
  if (!check || typeof check.words !== "number" || typeof check.max !== "number") return null;
  // The report does not keep essay text, so the passage at the limit comes from the form when it is there.
  const cutoff = check.cutoff || (essayText ? passageAt(essayText, check.max) : "");
  const limit = `${n(check.max)}-word limit${check.unit ? ` ${check.unit}` : ""}`;
  let warn = false;
  let text: string;
  switch (check.status) {
    case "over": {
      warn = true;
      const past = check.stopsAt
        ? ` Marking stops at word ${n(check.max)}${cutoff ? `, which in your text falls around "${cutoff}"` : ""}, and nothing after that point is assessed.`
        : " The subject guide sets this as a maximum.";
      text = `About ${n(check.words)} words pasted, over the ${limit}.${past} The official count leaves out ${check.excludes}. If that material comes to more than ${n(check.words - check.max)} words in what you pasted, you are within the limit.`;
      break;
    }
    case "under_min":
      warn = true;
      text = `About ${n(check.words)} words pasted. This report should be ${n(check.min ?? 0)} to ${n(check.max)} words.`;
      break;
    case "near":
      text = `About ${n(check.words)} words pasted, close to the ${limit}. The official count leaves out ${check.excludes}.`;
      break;
    case "short":
      text = `About ${n(check.words)} words pasted, well under the ${limit}. Length on its own costs no marks, but a draft this short usually leaves part of the task undeveloped.`;
      break;
    default:
      text = `About ${n(check.words)} words pasted, within the ${limit}.`;
  }
  return (
    <p
      className={`text-sm leading-relaxed rounded-md border px-3 py-2 ${
        warn ? "border-amber-300 bg-amber-50 text-amber-900" : "border-border bg-muted/40 text-muted-foreground"
      }`}
    >
      {text}
    </p>
  );
}
