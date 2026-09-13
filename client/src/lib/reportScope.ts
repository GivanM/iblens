export type CriterionScope = { name?: string; assessed?: boolean } | null | undefined;

/**
 * What a full report adds to its preview, as a phrase that fits after "adds" or at the
 * start of a sentence. A task marked as a whole has no per-criterion marks, and a
 * criterion the pasted text cannot show (Criterion E without the reflections, Music C1
 * and C2, the language of an oral from an outline) comes back unmarked, so neither may
 * be promised at the point of sale.
 */
export function fullReportAdds(criteria: CriterionScope[] | undefined | null): string {
  const list = (criteria || []).filter(Boolean) as { name?: string; assessed?: boolean }[];
  if (list.length === 1) return "your estimated mark within the band, the whole explanation and your ranked fix list";
  const unmarked = list
    .filter((c) => c.assessed === false && c.name)
    .map((c) => String(c.name).split(":")[0].trim());
  if (!unmarked.length) return "your estimated mark, comments on every criterion and your ranked fix list";
  const joined = unmarked.length === 1
    ? unmarked[0]
    : `${unmarked.slice(0, -1).join(", ")} and ${unmarked[unmarked.length - 1]}`;
  return `your estimated mark, comments on every criterion except ${joined} (not marked from what you pasted) and your ranked fix list`;
}

export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
