// Copy and facts for the contractor funnel. Anything not yet confirmed by the owner is
// a todo(...) so it renders as a visible {{TODO}} instead of an invented claim.

import type { FAQItem } from "@/components/funnel/FAQ";
import { todo, type Fact } from "@/lib/facts";
import { DIRECTIONS_URL, formatAddress } from "@/lib/site-config";

export const TRADE_REASONS = [
  {
    title: "Margin",
    text: "Tiered trade pricing that improves as your monthly volume grows. Exact prices are shared once your account is approved.",
  },
  {
    title: "Reliable supply",
    text: "In-stock items ship now, and partners reserve their share of each incoming container — so you know what's coming and when.",
  },
  {
    title: "Support",
    text: "Samples, spec sheets and install guides for your bids, plus a showroom where your clients can see the product in person.",
  },
];

export const TRADE_STEPS = [
  { title: "Apply", text: "A short three-step application." },
  { title: "Samples", text: "We bring samples to your qualification call, or visit the showroom." },
  { title: "Trial order", text: "Place a first order and put the product to work on a real job." },
  { title: "Monthly allocation", text: "Reserve your share of every container at your tier's pricing." },
];

export interface TradeTier {
  name: string;
  volume: string;
  discount: Fact;
  benefits: Fact[];
  featured?: boolean;
}

// Volume bands mirror the application's monthly-volume question and the lead routing rules.
export const TRADE_TIERS: TradeTier[] = [
  {
    name: "Standard",
    volume: "Under $5k / month",
    discount: todo("Standard discount %"),
    benefits: ["Trade pricing on every order", "Container arrival updates by email", todo("other Standard benefits")],
  },
  {
    name: "Partner",
    volume: "$5k–$30k / month",
    discount: todo("Partner discount %"),
    benefits: ["A reserved share of every container", "Monthly reorder check-ins", todo("other Partner benefits")],
    featured: true,
  },
  {
    name: "Anchor",
    volume: "$30k+ / month",
    discount: todo("Anchor discount %"),
    benefits: ["Account managed directly by the owner", todo("other Anchor benefits")],
  },
];

export interface TradeProductLine {
  name: string;
  text: string;
  href: string;
  highlights: Fact;
}

export const TRADE_PRODUCT_LINES: TradeProductLine[] = [
  { name: "WPC fencing", text: "Privacy and decorative fencing.", href: "/products/wpc-fencing", highlights: todo("fencing spec highlights") },
  { name: "WPC decking", text: "Decks, pool surrounds and walkways.", href: "/products/wpc-decking", highlights: todo("decking spec highlights") },
  { name: "WPC wall cladding", text: "Exterior and interior wall finishes.", href: "/products/wpc-cladding", highlights: todo("cladding spec highlights") },
  { name: "WPC pergolas", text: "Shade structures for outdoor living.", href: "/products/wpc-pergolas", highlights: todo("pergola spec highlights") },
  { name: "Gates", text: "Pedestrian and driveway gates to match.", href: "/products/gates", highlights: todo("gate spec highlights") },
  { name: "Aluminum fences & gates", text: "Modern fencing with matching gates.", href: "/products/aluminum-fences", highlights: todo("aluminum fence and gate spec highlights") },
  { name: "Aluminum pergolas", text: "Louvered pergolas for adjustable shade.", href: "/products/aluminum-pergolas", highlights: todo("aluminum pergola spec highlights") },
  { name: "Container pools", text: "Complete pools, finished in WPC.", href: "/products/container-pools", highlights: todo("container pool spec highlights") },
];

export const TRADE_FAQS: FAQItem[] = [
  { question: "Is there a minimum order?", answer: todo("minimum order") },
  {
    question: "Can I pick up, or do you deliver?",
    answer: [`Pick up from our showroom at ${formatAddress()}.`, todo("delivery options, area and fees")],
    link: { label: "Get directions", href: DIRECTIONS_URL, external: true },
  },
  {
    question: "What are your lead times?",
    answer:
      "In-stock items ship now. Larger orders ship on the next container — partners reserve pallets ahead of arrival.",
    link: { label: "See the container schedule", href: "/trade/container-schedule" },
  },
  { question: "What are the payment terms?", answer: todo("payment terms") },
  { question: "When do I see trade prices?", answer: "Exact prices are shared once your trade account is approved." },
  {
    question: "Do you offer samples?",
    answer: "Yes. We bring samples to your qualification call, or you can request samples on their own.",
    link: { label: "Request samples", href: "/trade/samples" },
  },
];

export const INSTALLER_FAQS: FAQItem[] = [
  { question: "Who can join the network?", answer: todo("installer requirements (license, insurance, experience)") },
  { question: "How are jobs assigned?", answer: todo("how referrals are assigned") },
  {
    question: "What kind of jobs are referred?",
    answer: "Homeowner projects we don't install ourselves — typically smaller jobs, or jobs outside our installation area.",
  },
  { question: "How is the material priced?", answer: todo("installer material pricing") },
];
