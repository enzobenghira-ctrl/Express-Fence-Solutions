import { Download } from "lucide-react";
import { TodoNote } from "@/components/funnel/FactText";
import { SHOW_TODOS } from "@/lib/facts";
import { SPEC_KIT_FILES } from "@/lib/downloads";

/** True when at least one spec kit PDF has been uploaded. */
export const HAS_DOWNLOADS = SPEC_KIT_FILES.some((f) => f.href);

/**
 * Spec kit PDFs. Files without an href show as {{TODO}} on previews and are left out in
 * production; renders nothing if no file is available.
 */
export default function DownloadList() {
  const files = SPEC_KIT_FILES.filter((f) => f.href || SHOW_TODOS);
  if (files.length === 0) return null;

  return (
    <ul style={{ listStyle: "none", display: "grid", gap: 10 }}>
      {files.map((f) => (
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
              {f.label} — <TodoNote>upload PDF to public/downloads</TodoNote>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
