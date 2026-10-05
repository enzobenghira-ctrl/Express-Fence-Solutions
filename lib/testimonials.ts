// REAL testimonials only — each entry must be traceable to its source (a Google
// review, a signed customer statement, etc.). TestimonialBlock renders nothing
// for an audience with no entries, so leaving a list empty is always safe.

export interface Testimonial {
  quote: string;
  name: string;
  detail?: string;
  /** Where this came from, e.g. "Google review, March 2026". Required on purpose. */
  source: string;
}

export const HOMEOWNER_TESTIMONIALS: Testimonial[] = [];

export const CONTRACTOR_TESTIMONIALS: Testimonial[] = [];
