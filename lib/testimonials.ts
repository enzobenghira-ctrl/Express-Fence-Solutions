// REAL Google reviews only, copied exactly as they appear on our Google Business Profile.
// Never edit, trim, translate or "fix" review text. Every section that shows reviews
// renders nothing while its list is empty, so an empty list is always safe.

export interface GoogleReview {
  /** Reviewer name exactly as shown on Google. */
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Full review text, verbatim. */
  text: string;
}

export const HOMEOWNER_REVIEWS: GoogleReview[] = [];

export const CONTRACTOR_REVIEWS: GoogleReview[] = [];
