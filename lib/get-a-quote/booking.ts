// /get-a-quote booking request: settings and form fields, shared by the page's form
// (browser) and /api/lead (server). Nothing here is unconfirmed content, so it's safe
// in the browser bundle; page copy with {{TODO}}s lives in ./content.ts.

import { HOME_PROJECT_TYPES } from "@/lib/forms/home";
import type { FormStep, FormValues } from "@/lib/forms/schema";
import type { SlotConfig } from "@/lib/forms/slots";
import { SITE } from "@/lib/site-config";

/** Marks these submissions in /api/lead (validation, routing, ZIP check) and in tracking. */
export const BOOKING_SOURCE = "get-a-quote-booking";

/** When visitors can ask us to come out. Change days and windows here. */
export const BOOKING_SLOTS: SlotConfig = {
  minDaysAhead: 1, // tomorrow
  maxDaysAhead: 30,
  closedWeekdays: [0], // Sunday
  windows: [
    { value: "morning", label: "Morning (8–12)" },
    { value: "afternoon", label: "Afternoon (12–5)" },
  ],
  maxSlots: 3,
  timeZone: "America/New_York",
};

export const BOOKING_STEPS: FormStep[] = [
  {
    label: "Project",
    title: "What are you interested in?",
    fields: [
      {
        name: "projectTypes",
        label: "Project",
        type: "multichoice",
        required: true,
        options: HOME_PROJECT_TYPES,
        hint: "So we bring the right samples.",
      },
    ],
  },
  {
    label: "Property",
    title: "Where's the property?",
    fields: [
      { name: "address", label: "Street address", type: "text", autoComplete: "street-address", placeholder: "e.g. 123 Palm Ave" },
      { name: "zip", label: "ZIP code", type: "zip", required: true },
    ],
  },
  {
    label: "Times",
    title: "When works for you?",
    fields: [
      {
        name: "slots",
        label: "Preferred times",
        type: "slots",
        required: true,
        config: BOOKING_SLOTS,
        hint: "These are requests — we'll call to confirm the exact time.",
      },
    ],
  },
  {
    label: "Your details",
    title: "Your details",
    fields: [
      { name: "contactName", label: "Name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(305) 555-0123" },
      { name: "email", label: "Email", type: "email" },
      {
        name: "notes",
        label: "Anything we should know before we come out?",
        type: "textarea",
        placeholder: "Gate code, best way to reach you, etc.",
      },
    ],
  },
];

/** Projects that go to the owner first. Everything else in the area is standard. */
const PRIORITY_PROJECTS = ["container-pool", "outdoor-living-package"];

export function bookingRoute(values: FormValues): "priority" | "standard" {
  const types = Array.isArray(values.projectTypes) ? values.projectTypes : [];
  return types.some((t) => PRIORITY_PROJECTS.includes(t)) ? "priority" : "standard";
}

// WhatsApp pre-filled message, naming the project when the page was opened with ?type=.
const WHATSAPP_PROJECT: Record<string, string> = {
  fence: "a fence",
  gate: "a gate",
  decking: "decking",
  cladding: "wall cladding",
  pergola: "a pergola",
  "outdoor-living-package": "an outdoor living package",
  "container-pool": "a container pool",
};

export function whatsAppBookingUrl(projectType?: string): string {
  const project = projectType && WHATSAPP_PROJECT[projectType];
  const text = `Hi! I'd like to book a free in-home measurement for ${project ?? "my project"}.`;
  return `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
