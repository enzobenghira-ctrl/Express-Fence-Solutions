import { Download } from "lucide-react";
import { SPEC_KIT_FILES } from "@/lib/downloads";

/** Spec kit PDFs. Files without an href yet render as {{TODO}} placeholders. */
export default function DownloadList() {
  return (
    <ul style={{ listStyle: "none", display: "grid", gap: 10 }}>
      {SPEC_KIT_FILES.map((f) => (
        <li key={f.label}>
          {f.href ? (
            <a
              href={f.href}
              download
              className="efs-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "14px 16px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              <Download size={16} style={{ color: "var(--accent-text)" }} aria-hidden />
              {f.label} <span style={{ fontWeight: 400, color: "var(--text-secondary)" }}>(PDF)</span>
            </a>
          ) : (
            <div style={{ padding: "10px 0", fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)" }}>
              {f.label} — <span className="efs-todo">{`{{TODO: upload PDF to public/downloads}}`}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
