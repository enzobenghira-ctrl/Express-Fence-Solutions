import { Plus } from "lucide-react";
import FactText from "@/components/funnel/FactText";
import { isTodo, type Fact } from "@/lib/facts";

export interface FAQItem {
  question: string;
  answer: Fact;
}

interface Props {
  id?: string;
  eyebrow?: string;
  title?: string;
  items: FAQItem[];
}

/**
 * Accordion built on <details> (works without JS) plus FAQPage JSON-LD.
 * Unconfirmed {{TODO}} answers are shown on the page but left out of the schema.
 */
export default function FAQ({ id, eyebrow, title = "Frequently asked questions", items }: Props) {
  const answered = items.filter((i) => !isTodo(i.answer));
  const schema =
    answered.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: answered.map((i) => ({
            "@type": "Question",
            name: i.question,
            acceptedAnswer: { "@type": "Answer", text: i.answer as string },
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
          {items.map((item) => (
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
                <FactText value={item.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>

      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </section>
  );
}
