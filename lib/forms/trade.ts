import type { FormOption, FormStep } from "@/lib/forms/schema";

export const TRADE_TYPES: FormOption[] = [
  { value: "fence-installer", label: "Fence installer" },
  { value: "pool-builder", label: "Pool builder" },
  { value: "general-contractor", label: "General contractor" },
  { value: "landscaper", label: "Landscaper" },
  { value: "developer", label: "Developer" },
  { value: "architect-designer", label: "Architect / designer" },
];

export const TRADE_PRODUCTS: FormOption[] = [
  { value: "wpc-fencing", label: "WPC fencing" },
  { value: "wpc-decking", label: "WPC decking" },
  { value: "wpc-cladding", label: "WPC wall cladding" },
  { value: "wpc-pergolas", label: "WPC pergolas" },
  { value: "gates", label: "Gates" },
  { value: "aluminum-fences", label: "Aluminum fences" },
  { value: "aluminum-pergolas", label: "Louvered aluminum pergolas" },
  { value: "container-pools", label: "Container pools" },
];

export const MONTHLY_VOLUMES: FormOption[] = [
  { value: "under-5k", label: "Under $5k" },
  { value: "5k-15k", label: "$5k–$15k" },
  { value: "15k-30k", label: "$15k–$30k" },
  { value: "30k-plus", label: "$30k+" },
];

export const TRADE_APPLICATION_STEPS: FormStep[] = [
  {
    label: "Your trade",
    title: "What kind of work do you do?",
    fields: [{ name: "tradeType", label: "Trade type", type: "choice", required: true, options: TRADE_TYPES }],
  },
  {
    label: "Products",
    title: "What would you buy from us?",
    fields: [
      { name: "products", label: "Products of interest", type: "multichoice", required: true, options: TRADE_PRODUCTS },
      { name: "monthlyVolume", label: "Estimated monthly volume", type: "choice", required: true, options: MONTHLY_VOLUMES },
    ],
  },
  {
    label: "Your details",
    title: "Where can we reach you?",
    fields: [
      { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
      { name: "contactName", label: "Contact name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(305) 555-0123" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "license", label: "Contractor license number", type: "text", hint: "If you hold one." },
    ],
  },
];

export const SPEC_KIT_STEPS: FormStep[] = [
  {
    label: "Spec kit",
    title: "Where should we send the spec kit?",
    fields: [
      { name: "contactName", label: "Name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", autoComplete: "organization" },
    ],
  },
];

export const SAMPLE_REQUEST_STEPS: FormStep[] = [
  {
    label: "Samples",
    title: "Request samples",
    fields: [
      { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
      { name: "contactName", label: "Contact name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(305) 555-0123" },
      { name: "address", label: "Delivery address", type: "text", required: true, autoComplete: "street-address" },
      { name: "products", label: "Which samples?", type: "multichoice", required: true, options: TRADE_PRODUCTS },
    ],
  },
];

export const PALLET_RESERVATION_STEPS: FormStep[] = [
  {
    label: "Reservation",
    title: "Reserve pallets on the next container",
    fields: [
      { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
      { name: "contactName", label: "Contact name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(305) 555-0123" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "products", label: "Products", type: "multichoice", required: true, options: TRADE_PRODUCTS },
      {
        name: "pallets",
        label: "Pallets needed",
        type: "textarea",
        required: true,
        placeholder: "e.g. 4 pallets charcoal fencing, 2 pallets teak decking",
      },
    ],
  },
];
