/**
 * The JSON object a grading prompt asks for, read out of the model's reply.
 *
 * A model now and then breaks a long comment into paragraphs with a raw line break
 * inside a JSON string, which JSON.parse rejects (Claude Sonnet 5 did on one of its
 * test runs, 16 September 2026), and the student saw "did not finish". Control
 * characters inside strings are escaped here; a trailing comma before a closing
 * bracket is dropped, as the call sites did before.
 */
export function parseModelJson(content: string): any {
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("Failed to parse AI response");
  const raw = content.slice(start, end + 1);
  let out = "";
  let inString = false;
  let escaped = false;
  for (const ch of raw) {
    if (!inString) {
      if (ch === '"') inString = true;
      out += ch;
    } else if (escaped) {
      escaped = false;
      out += ch;
    } else if (ch === "\\") {
      escaped = true;
      out += ch;
    } else if (ch === '"') {
      inString = false;
      out += ch;
    } else if (ch.charCodeAt(0) < 0x20) {
      out += ch === "\n" ? "\\n" : ch === "\r" ? "\\r" : ch === "\t" ? "\\t" : "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0");
    } else {
      out += ch;
    }
  }
  return JSON.parse(out.replace(/,\s*([\]\}])/g, "$1"));
}
