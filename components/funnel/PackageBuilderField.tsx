import { TodoNote } from "@/components/funnel/FactText";
import {
  describeSelection,
  parseSelection,
  serializeSelection,
  type BuilderComponent,
  type PackageSelection,
} from "@/lib/forms/package-selection";

interface BuilderProps {
  /** Field id: the group itself (validation focuses it); each part's checkbox is `${id}-${part id}`. */
  id: string;
  components: BuilderComponent[];
  /** JSON PackageSelection, or "" for nothing chosen. */
  value: string;
  onChange: (value: string) => void;
  describedBy?: string;
}

/** Step 2 of the package builder: toggle parts on and off, and pick options for each one that's on. */
export default function PackageBuilderField({ id, components, value, onChange, describedBy }: BuilderProps) {
  const selection = parseSelection(value) ?? {};
  const update = (next: PackageSelection) => onChange(serializeSelection(next, components));

  function toggle(partId: string) {
    const next = { ...selection };
    if (next[partId]) delete next[partId];
    else next[partId] = {};
    update(next);
  }

  function pick(partId: string, group: string, option: string) {
    update({ ...selection, [partId]: { ...selection[partId], [group]: option } });
  }

  return (
    <div id={id} role="group" aria-label="Parts of your package" aria-describedby={describedBy} tabIndex={-1} className="efs-pkg-parts">
      {components.map((c) => {
        const on = Boolean(selection[c.id]);
        const partId = `${id}-${c.id}`;
        return (
          <div key={c.id} className="efs-pkg-part" data-on={on || undefined}>
            <label className="efs-pkg-toggle" htmlFor={partId}>
              <input id={partId} type="checkbox" checked={on} onChange={() => toggle(c.id)} />
              <span>{c.label}</span>
              {c.pending && <TodoNote>{`confirm ${c.label.toLowerCase()} is available`}</TodoNote>}
            </label>
            {on && c.groups.length > 0 && (
              <div className="efs-pkg-options">
                {c.groups.map((g) => {
                  const labelId = `${partId}-${g.name}-label`;
                  return (
                    <div key={g.name}>
                      <p id={labelId} className="efs-form-label">
                        {g.label}
                      </p>
                      {g.todo ? (
                        <TodoNote>{g.todo}</TodoNote>
                      ) : (
                        <div role="radiogroup" aria-labelledby={labelId} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {g.options.map((o) => (
                            <label key={o.value} className="efs-choice efs-choice--sm">
                              <input
                                type="radio"
                                name={`${partId}-${g.name}`}
                                value={o.value}
                                checked={selection[c.id]?.[g.name] === o.value}
                                onChange={() => pick(c.id, g.name, o.value)}
                              />
                              <span>{o.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface ReviewProps {
  components: BuilderComponent[];
  value: string;
  /** Edit one part (by id), or the whole builder when called with nothing. */
  onEdit: (componentId?: string) => void;
}

/** Step 3: every selection, with an edit link back to each part. No prices. */
export function PackageReview({ components, value, onEdit }: ReviewProps) {
  const parts = describeSelection(parseSelection(value) ?? {}, components);

  if (parts.length === 0) {
    return (
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)" }}>
        No parts chosen yet.{" "}
        <button type="button" className="efs-link efs-pkg-edit" onClick={() => onEdit()}>
          Choose parts
        </button>
      </p>
    );
  }

  return (
    <ul className="efs-pkg-review">
      {parts.map((p) => (
        <li key={p.id}>
          <div>
            <p className="efs-pkg-review-name">{p.label}</p>
            <p className="efs-pkg-review-detail">
              {p.options.length
                ? p.options.map((o) => `${o.label}: ${o.valueLabel}`).join(" · ")
                : "Details to go over at your consultation"}
            </p>
          </div>
          <button type="button" className="efs-link efs-pkg-edit" onClick={() => onEdit(p.id)} aria-label={`Edit ${p.label}`}>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}
