import type { ReactNode } from "react";
import FunnelImage from "@/components/funnel/FunnelImage";
import { CallButton, WhatsAppButton } from "@/components/get-a-quote/ContactButtons";
import { SITE } from "@/lib/site-config";

interface Props {
  projectType?: string;
  /** Call hours under the call button (a {{TODO}} on previews until confirmed), or null to leave the line out. */
  callHours: ReactNode | null;
}

const TRUST = ["Free in-home consultation", `Showroom in ${SITE.address.city}, FL`, `Serving ${SITE.serviceAreaShort}`];

/** /get-a-quote hero: call first, WhatsApp second, online request third. */
export default function BookingHero({ projectType, callHours }: Props) {
  return (
    <section className="efs-booking-hero">
      <FunnelImage
        src="/images/fence-black-modern-home.jpg"
        alt="Black horizontal WPC fence at a modern South Florida home"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div aria-hidden className="efs-booking-hero-shade" />
      <div className="efs-booking-hero-inner">
        <span className="efs-booking-hero-eyebrow">Free in-home consultation</span>
        <h1>Your quote starts with a free in-home visit.</h1>
        <p className="efs-booking-hero-sub">
          We don&apos;t price projects from a form. We come to you with real WPC samples, measure your space, and build an exact quote around what you
          want.
        </p>

        <div className="efs-booking-hero-ctas">
          <div>
            <CallButton placement="hero" className="efs-btn efs-btn--light efs-btn--xl efs-btn--block" />
            {callHours && <div className="efs-booking-hero-hours">{callHours}</div>}
          </div>
          <WhatsAppButton placement="hero" projectType={projectType} className="efs-btn efs-btn--outline-light" />
          <a href="#book" className="efs-booking-hero-link">
            Prefer to pick a time online? Request an appointment →
          </a>
        </div>

        <ul className="efs-booking-hero-trust">
          {TRUST.map((t) => (
            <li key={t}>
              <span aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
