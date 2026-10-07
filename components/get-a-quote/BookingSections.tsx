import { CallButton, WhatsAppButton } from "@/components/get-a-quote/ContactButtons";

/** "Why we only quote in person" — three cards. */
export function WhyInPerson({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="efs-section" style={{ background: "var(--background)" }}>
      <div className="efs-container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
          <h2 className="efs-h2" style={{ marginBottom: 14 }}>
            Why we only quote in person
          </h2>
          <p className="efs-booking-lead">Every outdoor space is different — so every quote is built on site, not guessed online.</p>
        </div>
        <div className="efs-booking-why">
          {items.map((i) => (
            <div key={i.title}>
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing block: call, WhatsApp, or back up to the request form. */
export function ClosingCta({ projectType }: { projectType?: string }) {
  return (
    <section className="efs-section" style={{ background: "var(--dark)", textAlign: "center" }}>
      <div className="efs-container" style={{ maxWidth: 720 }}>
        <h2 className="efs-h2" style={{ color: "var(--white)", marginBottom: 28 }}>
          Ready to see what your space could be?
        </h2>
        <div className="efs-booking-closing-ctas">
          <CallButton placement="closing" className="efs-btn efs-btn--light efs-btn--xl" />
          <WhatsAppButton placement="closing" projectType={projectType} className="efs-btn efs-btn--outline-light" />
        </div>
        <a href="#book" className="efs-booking-hero-link" style={{ display: "inline-block", marginTop: 24 }}>
          Request a visit online →
        </a>
      </div>
    </section>
  );
}
