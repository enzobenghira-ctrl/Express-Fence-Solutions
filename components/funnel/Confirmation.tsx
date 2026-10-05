import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

/** Success panel shown in place of a form after it's submitted. */
export default function Confirmation({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div
      role="status"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "clamp(24px, 4vw, 36px)",
        textAlign: "center",
      }}
    >
      <CheckCircle2 size={36} style={{ color: "var(--green)", margin: "0 auto 12px" }} aria-hidden />
      <h2 className="efs-h2" style={{ fontSize: 32, marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" }}>{children}</div>
    </div>
  );
}
