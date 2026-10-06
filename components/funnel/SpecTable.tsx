import FactText from "@/components/funnel/FactText";
import { isVisible, type Fact } from "@/lib/facts";

export interface SpecRow {
  label: string;
  value: Fact;
}

/** The rows that render anything in this build (production drops unconfirmed ones). */
export function visibleRows(rows: SpecRow[]): SpecRow[] {
  return rows.filter((r) => isVisible(r.value));
}

interface Props {
  title?: string;
  /** Read by screen readers as the table's name, e.g. "WPC fencing specifications". */
  caption: string;
  rows: SpecRow[];
}

/** Renders nothing when no row has a confirmed value (production) — callers drop the section too. */
export default function SpecTable({ title, caption, rows }: Props) {
  const shown = visibleRows(rows);
  if (shown.length === 0) return null;

  return (
    <div>
      {title && (
        <h2 className="efs-h2" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 24 }}>
          {title}
        </h2>
      )}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 15,
          background: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {shown.map((r, i) => (
            <tr key={r.label} style={{ background: i % 2 ? "var(--background)" : "var(--white)" }}>
              <th
                scope="row"
                style={{
                  textAlign: "left",
                  verticalAlign: "top",
                  fontWeight: 600,
                  color: "var(--dark)",
                  padding: "14px 20px",
                  width: "38%",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {r.label}
              </th>
              <td
                style={{
                  color: "var(--text-secondary)",
                  padding: "14px 20px",
                  lineHeight: 1.6,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <FactText value={r.value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
