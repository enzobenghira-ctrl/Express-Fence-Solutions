// Copy and facts for the homeowner funnel. Unconfirmed facts are todo(...) placeholders.
// Homeowner landing pages never mention the trade program.

import type { FAQItem } from "@/components/funnel/FAQ";
import { todo, type Fact } from "@/lib/facts";
import { SITE } from "@/lib/site-config";

export const HOME_STEPS = [
  { title: "Consult", text: "We bring real WPC samples, measure your property and talk through what you want." },
  { title: "Design", text: "We lay out the project and send you a detailed proposal." },
  { title: "Install", text: "We build it — and you never paint, seal or stain it afterward." },
];

export const WHY_WPC_FLORIDA = [
  { title: "Sun & heat", text: "No peeling paint or graying stain to redo every few years." },
  { title: "Humidity & rain", text: "Won't rot, warp or splinter the way wood does in Florida's humidity." },
  { title: "Salt air", text: "A good fit for coastal homes, where salt air wears down wood and painted finishes." },
  { title: "No painting, ever", text: "No painting, sealing or staining — an occasional rinse keeps it clean." },
];

export const HOME_FAQS: FAQItem[] = [
  {
    question: "How much will my project cost?",
    answer: "Every project is quoted after a free consultation, based on its size, the products you choose and your site.",
  },
  {
    question: "Do you serve my area?",
    answer: `We install across ${SITE.serviceArea}. Outside that area? Request a quote anyway and we'll tell you how we can help.`,
  },
  {
    question: "What happens at the consultation?",
    answer: "We bring real WPC samples, measure your property and talk through design options, then send you a detailed proposal.",
  },
  { question: "How long does installation take?", answer: todo("typical installation times") },
  { question: "Is there a warranty?", answer: todo("warranty length and terms") },
  {
    question: "Is WPC really low maintenance?",
    answer: "Yes. It never needs painting, sealing or staining — an occasional rinse with a hose keeps it clean.",
  },
];

export const HOME_PROJECTS = [
  { type: "fence", name: "Fences", text: "Privacy and decorative fencing." },
  { type: "gate", name: "Gates", text: "Pedestrian and driveway gates to match your fence." },
  { type: "decking", name: "Decking", text: "Decks, pool surrounds and walkways." },
  { type: "pergola", name: "Pergolas", text: "Shade for year-round outdoor living." },
  { type: "cladding", name: "Wall cladding", text: "A wood look for exterior and interior walls." },
  { type: "outdoor-living-package", name: "Outdoor living packages", text: "Deck, pergola, cladding and fencing designed together." },
  { type: "container-pool", name: "Container pools", text: "A complete pool, finished to match your outdoor space." },
];

/** /thank-you-home owner video. Set to a URL (e.g. "/videos/owner-welcome.mp4") when recorded. */
export const OWNER_VIDEO_URL: string | null = null;

