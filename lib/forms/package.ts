// The "Design Your Package" form (/projects#design), built from content/packages.ts.
// Server-side only: pages pass the finished steps to MultiStepForm, so parts that aren't
// available yet and the unconfirmed color range never reach the browser in production.

import { PACKAGES, PACKAGE_COMPONENTS, WPC_COLORS, type OutdoorPackage } from "@/content/packages";
import { SHOW_TODOS } from "@/lib/facts";
import { HOME_BUDGETS, HOME_TIMELINES } from "@/lib/forms/home";
import {
  describeSelection,
  parseSelection,
  selectionError,
  serializeSelection,
  type BuilderComponent,
  type DescribedComponent,
  type PackageSelection,
} from "@/lib/forms/package-selection";
import type { FormStep, FormValues } from "@/lib/forms/schema";

export const SCRATCH = "scratch";

const AVAILABLE = new Set(PACKAGE_COMPONENTS.filter((c) => c.available).map((c) => c.id));

/** Builder parts for this build: unavailable ones (and unconfirmed colors) only on previews. */
export const BUILDER_COMPONENTS: BuilderComponent[] = PACKAGE_COMPONENTS.filter((c) => c.available || SHOW_TODOS).map((c) => ({
  id: c.id,
  label: c.label,
  ...(c.available ? {} : { pending: true }),
  groups: c.groups.flatMap((g) => {
    if (g.options !== "colors") return [{ name: g.name, label: g.label, options: g.options }];
    if (Array.isArray(WPC_COLORS)) return [{ name: g.name, label: g.label, options: WPC_COLORS }];
    return SHOW_TODOS ? [{ name: g.name, label: g.label, options: [], todo: WPC_COLORS.todo }] : [];
  }),
}));

export function packageIsAvailable(p: OutdoorPackage): boolean {
  return p.includes.every((i) => !i.component || AVAILABLE.has(i.component));
}

/** Packages for this build: any that include an unavailable part only show on previews. */
export const VISIBLE_PACKAGES = PACKAGES.filter((p) => packageIsAvailable(p) || SHOW_TODOS);

/** A package's parts as a builder value, with its pre-picked options. */
export function packagePreset(p: OutdoorPackage): string {
  const selection: PackageSelection = {};
  for (const i of p.includes) {
    if (i.component && BUILDER_COMPONENTS.some((c) => c.id === i.component)) selection[i.component] = { ...i.preset };
  }
  return serializeSelection(selection, BUILDER_COMPONENTS);
}

// Fail the build if a package pre-picks an option the builder doesn't offer.
for (const p of VISIBLE_PACKAGES) {
  const err = selectionError(parseSelection(packagePreset(p)) ?? {}, BUILDER_COMPONENTS);
  if (err) throw new Error(`content/packages.ts: "${p.name}" has a preset the builder doesn't offer`);
}

export const PACKAGE_STEPS: FormStep[] = [
  {
    label: "Start",
    title: "Where would you like to start?",
    fields: [
      {
        name: "startingPackage",
        label: "Starting point",
        type: "choice",
        required: true,
        options: [...VISIBLE_PACKAGES.map((p) => ({ value: p.slug, label: p.name })), { value: SCRATCH, label: "Start from scratch" }],
        presets: {
          ...Object.fromEntries(VISIBLE_PACKAGES.map((p) => [p.slug, { package: packagePreset(p) }])),
          [SCRATCH]: { package: "" },
        },
      },
    ],
  },
  {
    label: "Customize",
    title: "Choose what goes in your package",
    fields: [
      {
        name: "package",
        label: "Your package",
        type: "package",
        required: true,
        hint: "Turn parts on or off, then pick options if you know them — anything you skip, we'll go over at your consultation.",
        components: BUILDER_COMPONENTS,
      },
    ],
  },
  {
    label: "Review",
    title: "Your package",
    fields: [{ name: "packageReview", label: "Your package", type: "review", of: "package" }],
  },
  {
    label: "Your details",
    title: "Where should we send your design?",
    fields: [
      { name: "zip", label: "Project ZIP code", type: "zip", required: true },
      { name: "contactName", label: "Name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(305) 555-0123" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "budget", label: "Budget", type: "choice", required: true, options: HOME_BUDGETS },
      { name: "timeline", label: "Timeline", type: "choice", required: true, options: HOME_TIMELINES },
      { name: "photo", label: "Photo of the space", type: "photo", hint: "Helps us design faster." },
    ],
  },
];

export function packageNameFor(slug: unknown): string {
  return PACKAGES.find((p) => p.slug === slug)?.name ?? "Custom package";
}

/** The structured package that travels with the lead to the CRM. */
export function describePackageLead(values: FormValues): { name: string; startingPackage: string; components: DescribedComponent[] } {
  const selection = parseSelection(values.package) ?? {};
  return {
    name: packageNameFor(values.startingPackage),
    startingPackage: typeof values.startingPackage === "string" ? values.startingPackage : SCRATCH,
    components: describeSelection(selection, BUILDER_COMPONENTS),
  };
}
