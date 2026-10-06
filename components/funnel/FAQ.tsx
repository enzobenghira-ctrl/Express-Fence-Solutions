import { Plus } from "lucide-react";
import FactText from "@/components/funnel/FactText";
import { isPageReady } from "@/lib/content-readiness";
import { isTodo, isVisible, type Fact } from "@/lib/facts";

export interface FAQItem {
  question: string;
  /** One fact, or several shown as one paragraph (lets confirmed text sit next to a {{TODO}}). */
  answer: Fact | Fact[];
  /** Optional link after the answer, e.g. "Get directions". */
  link?: { label: string; href: string; external?: boolean };
}

interface Props {
  id?: string;
  eyebrow?: string;
  title?: string;
  items: FAQItem[];
}

const parts = (answer: FAQItem["answer"]): Fact[] => (Array.isArray(answer) ? answer : [answer]);

/**
 * Accordion built on <details> (works without JS) plus FAQPage JSON-LD.
 * Unconfirmed {{TODO}} answers show on previews only; in production a question with
 * no confirmed answer is dropped, and the section disappears if none are left.
 * Schema only ever includes fully confirmed answers.
 */
export default function FAQ({ id, eyebrow, title = "Frequently asked questions", items }: Props) {
  const shown = items.filter((i) => parts(i.answer).some(isVisible));
  if (shown.length === 0) return null;

  const answered = shown.filter((i) => !parts(i.answer).some(isTodo));
  const schema =
    answered.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: answered.map((i) => ({
            "@type": "Question",
            name: i.question,
            acceptedAnswer: { "@type": "Answer", text: (parts(i.answer) as string[]).join(" ") },
          })),
        }
      : null;

  return (
    <section id={id} className="efs-section" style={{ background: "var(--background)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          {eyebrow && <span className="efs-eyebrow">{eyebrow}</span>}
          <h2 className="efs-h2">{title}</h2>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {shown.map((item) => (
            <details key={item.question} className="efs-faq-item" style={{ borderBottom: "1px solid var(--border)" }}>
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "22px 4px",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "var(--dark)",
                }}
              >
                {item.question}
                <Plus className="efs-faq-icon" size={20} strokeWidth={2} style={{ color: "var(--accent-text)" }} aria-hidden />
              </summary>
              <div
                style={{
                  padding: "0 4px 24px",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                }}
              >
                {parts(item.answer).filter(isVisible).map((p, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    <FactText value={p} />
                  </span>
                ))}
                {item.link && (item.link.external || isPageReady(item.link.href)) && (
                  <>
                    {" "}
                    <a
                      href={item.link.href}
                      className="efs-link"
                      style={{ fontWeight: 600, color: "var(--accent-text)" }}
                      {...(item.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.link.label} →
                    </a>
                  </>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>

      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </section>
  );
}
