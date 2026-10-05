import FactText from "@/components/funnel/FactText";
import type { Fact } from "@/lib/facts";

export interface SpecRow {
  label: string;
  value: Fact;
}

interface Props {
  title?: string;
  /** Read by screen readers as the table's name, e.g. "WPC fencing specifications". */
  caption: string;
  rows: SpecRow[];
}

export default function SpecTable({ title, caption, rows }: Props) {
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
          {rows.map((r, i) => (
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
