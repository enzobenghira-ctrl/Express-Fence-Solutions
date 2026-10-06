// The package builder's value, shared by the browser (MultiStepForm) and /api/lead.
// Pure functions over a catalog passed in, so nothing here pulls content/packages.ts
// (and its unconfirmed parts) into the browser bundle.

export interface BuilderOptionGroup {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  /** Set when the choices aren't confirmed yet: previews show this {{TODO}} instead. */
  todo?: string;
}

export interface BuilderComponent {
  id: string;
  label: string;
  groups: BuilderOptionGroup[];
  /** Not confirmed as available (only ever present on previews). */
  pending?: boolean;
}

/** Selected parts and their picked options, e.g. { "wpc-fence": { height: "6ft" } }. */
export type PackageSelection = Record<string, Record<string, string>>;

export interface DescribedComponent {
  id: string;
  label: string;
  options: { name: string; label: string; value: string; valueLabel: string }[];
}

const MAX_SELECTION_CHARS = 4000;

export function parseSelection(raw: unknown): PackageSelection | null {
  if (typeof raw !== "string" || !raw || raw.length > MAX_SELECTION_CHARS) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const out: PackageSelection = {};
    for (const [id, opts] of Object.entries(parsed)) {
      if (!opts || typeof opts !== "object" || Array.isArray(opts)) return null;
      const clean: Record<string, string> = {};
      for (const [k, v] of Object.entries(opts)) {
        if (typeof v !== "string") return null;
        clean[k] = v;
      }
      out[id] = clean;
    }
    return out;
  } catch {
    return null;
  }
}

/** Catalog order, so the value, summary and email always list parts the same way. */
export function serializeSelection(selection: PackageSelection, catalog: BuilderComponent[]): string {
  const ordered: PackageSelection = {};
  for (const c of catalog) {
    if (!selection[c.id]) continue;
    const opts: Record<string, string> = {};
    for (const g of c.groups) if (selection[c.id][g.name]) opts[g.name] = selection[c.id][g.name];
    ordered[c.id] = opts;
  }
  return Object.keys(ordered).length ? JSON.stringify(ordered) : "";
}

/** Null when every part and option is one the catalog offers. Options themselves are optional. */
export function selectionError(selection: PackageSelection, catalog: BuilderComponent[]): string | null {
  for (const [id, opts] of Object.entries(selection)) {
    const component = catalog.find((c) => c.id === id);
    if (!component) return "Please choose from the options shown.";
    for (const [name, value] of Object.entries(opts)) {
      const group = component.groups.find((g) => g.name === name);
      if (!group || !group.options.some((o) => o.value === value)) return "Please choose from the options shown.";
    }
  }
  return null;
}

export function describeSelection(selection: PackageSelection, catalog: BuilderComponent[]): DescribedComponent[] {
  return catalog
    .filter((c) => selection[c.id])
    .map((c) => ({
      id: c.id,
      label: c.label,
      options: c.groups
        .filter((g) => selection[c.id][g.name])
        .map((g) => {
          const value = selection[c.id][g.name];
          return { name: g.name, label: g.label, value, valueLabel: g.options.find((o) => o.value === value)?.label ?? value };
        }),
    }));
}

/** One line per part, e.g. "WPC fence — Height: 6 ft · Style: Horizontal". */
export function selectionToText(selection: PackageSelection, catalog: BuilderComponent[]): string {
  return describeSelection(selection, catalog)
    .map((c) => (c.options.length ? `${c.label} — ${c.options.map((o) => `${o.label}: ${o.valueLabel}`).join(" · ")}` : c.label))
    .join("\n");
}
