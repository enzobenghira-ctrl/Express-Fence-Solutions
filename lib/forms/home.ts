import type { FormOption, FormStep } from "@/lib/forms/schema";

// Values double as the ?type= query param that pre-selects the project on /get-a-quote.
export const HOME_PROJECT_TYPES: FormOption[] = [
  { value: "fence", label: "Fence" },
  { value: "gate", label: "Gate" },
  { value: "decking", label: "Decking" },
  { value: "cladding", label: "Wall cladding" },
  { value: "pergola", label: "Pergola" },
  { value: "outdoor-living-package", label: "Outdoor living package" },
  { value: "container-pool", label: "Container pool" },
];

export const HOME_BUDGETS: FormOption[] = [
  { value: "under-8k", label: "Under $8k" },
  { value: "8k-25k", label: "$8k–$25k" },
  { value: "25k-50k", label: "$25k–$50k" },
  { value: "50k-plus", label: "$50k+" },
];

export const HOME_TIMELINES: FormOption[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "planning", label: "Just planning" },
];

export const HOME_QUOTE_STEPS: FormStep[] = [
  {
    label: "Project",
    title: "What would you like to build?",
    fields: [{ name: "projectType", label: "Project type", type: "choice", required: true, options: HOME_PROJECT_TYPES }],
  },
  {
    label: "Scope",
    title: "Tell us about the project",
    fields: [
      {
        name: "size",
        label: "Approximate size",
        type: "text",
        required: true,
        placeholder: "e.g. 150 ft of fence, 400 sq ft deck",
      },
      { name: "budget", label: "Budget", type: "choice", required: true, options: HOME_BUDGETS },
      { name: "timeline", label: "Timeline", type: "choice", required: true, options: HOME_TIMELINES },
    ],
  },
  {
    label: "Your details",
    title: "Where should we send your quote?",
    fields: [
      { name: "zip", label: "Project ZIP code", type: "zip", required: true },
      { name: "contactName", label: "Name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(305) 555-0123" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "photo", label: "Photo of the space", type: "photo", hint: "Helps us quote faster." },
    ],
  },
];
