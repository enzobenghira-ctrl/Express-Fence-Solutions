// Owner-supplied facts that aren't confirmed yet are stored as `todo("...")` instead of
// invented copy. Components render them as visible {{TODO: ...}} placeholders, and
// schema markup skips them, so nothing unverified ever reads as a real claim.

export interface TodoFact {
  todo: string;
}

export type Fact = string | TodoFact;

export function todo(label: string): TodoFact {
  return { todo: label };
}

export function isTodo(value: Fact | null | undefined): value is TodoFact {
  return typeof value === "object" && value !== null && "todo" in value;
}
