// Owner-supplied facts that aren't confirmed yet are stored as `todo("...")` instead of
// invented copy. On previews they render as loud {{TODO: ...}} labels; in production
// they render nothing at all (and sections that would be left empty are dropped).
// Schema markup always skips them, so nothing unverified ever reads as a real claim.

export interface TodoFact {
  todo: string;
}

export type Fact = string | TodoFact;

/** True on preview deployments and local builds; false in production (see next.config.mjs). */
export const SHOW_TODOS = process.env.NEXT_PUBLIC_SHOW_TODOS !== "0";

export function todo(label: string): TodoFact {
  return { todo: label };
}

export function isTodo(value: Fact | null | undefined): value is TodoFact {
  return typeof value === "object" && value !== null && "todo" in value;
}

/** Whether a fact renders anything in this build. */
export function isVisible(value: Fact | null | undefined): boolean {
  if (value === null || value === undefined) return SHOW_TODOS;
  return !isTodo(value) || SHOW_TODOS;
}

/** The facts from a list that render anything in this build. */
export function visibleFacts<T extends Fact>(values: T[]): T[] {
  return values.filter((v) => isVisible(v));
}
