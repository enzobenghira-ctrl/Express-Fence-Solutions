// /get-a-quote page copy. Server-side only: unconfirmed facts are todo(...) and must not
// reach the browser bundle, so pages pass finished strings to client components.

import { todo, type Fact } from "@/lib/facts";
import type { FAQItem } from "@/components/funnel/FAQ";
import { HOME_FAQS } from "@/lib/home-content";
import { SITE } from "@/lib/site-config";

/** Shown under the hero call button. Unconfirmed until the owner sends the real hours. */
export const CALL_HOURS: Fact = todo("call hours, e.g. Mon–Sat, 8am–6pm");

/** "We'll call you {CALLBACK_WINDOW} to confirm your appointment." */
export const CALLBACK_WINDOW = "the same day";

export const WHY_IN_PERSON = [
  {
    title: "Exact measurements",
    text: "Grade, existing structures and access all change the job. We measure it ourselves so your price is real.",
  },
  {
    title: "See it before you choose",
    text: "We bring real samples so you can see and feel the colors and finishes at your own home.",
  },
  {
    title: "One accurate quote",
    text: "You get a detailed proposal you can count on, not a ballpark that changes later.",
  },
];

// This page's FAQ: the homeowner FAQ with two answers rewritten for booking. /homeowners
// keeps the shared HOME_FAQS unchanged.
const ANSWERS: Record<string, string> = {
  "Do you serve my area?": `We install across ${SITE.serviceArea}. Outside that area? Give us a call at ${SITE.phone.display} and we'll let you know if we can help.`,
  "How much will my project cost?":
    "Every project is quoted after a free in-home visit, based on its size, the products you choose and your site. That's why we don't give prices online — we'd rather give you one accurate number.",
};

export const QUOTE_FAQS: FAQItem[] = HOME_FAQS.map((f) => (ANSWERS[f.question] ? { ...f, answer: ANSWERS[f.question] } : f));
