import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import FunnelButton from "@/components/funnel/FunnelButton";
import PhoneLink from "@/components/funnel/PhoneLink";
import { DIRECTIONS_URL, FUNNEL_ENTRY, SITE, formatAddress } from "@/lib/site-config";

const row = { display: "flex", alignItems: "flex-start", gap: 12, fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--dark)" } as const;
const icon = { color: "var(--accent-text)", flexShrink: 0, marginTop: 3 } as const;

/** Homepage contact block: every way to reach us, then both funnels. No form — each funnel has its own. */
export default function HomeContact() {
  return (
    <section id="contact" className="efs-section" style={{ background: "var(--surface)" }}>
      <div className="efs-container" style={{ maxWidth: 900 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="efs-eyebrow">Contact</span>
          <h2 className="efs-h2">Call, message or visit the showroom</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 40 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={row}>
              <Phone size={18} style={icon} aria-hidden />
              <PhoneLink className="efs-link" style={{ fontWeight: 700 }} />
            </div>
            <div style={row}>
              <MessageCircle size={18} style={icon} aria-hidden />
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="efs-link">
                Message us on WhatsApp
              </a>
            </div>
            <div style={row}>
              <Mail size={18} style={icon} aria-hidden />
              <a href={`mailto:${SITE.email}`} className="efs-link">
                {SITE.email}
              </a>
            </div>
          </div>
          <div style={row}>
            <MapPin size={18} style={icon} aria-hidden />
            <div style={{ lineHeight: 1.6 }}>
              <strong>Showroom</strong>
              <br />
              {formatAddress()}
              <br />
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="efs-link" style={{ fontWeight: 600, color: "var(--accent-text)" }}>
                Get directions →
              </a>
              <br />
              <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>Serving {SITE.serviceArea}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <FunnelButton href={FUNNEL_ENTRY.tradeHub} funnel="trade">
            Open a Trade Account
          </FunnelButton>
          <FunnelButton href={FUNNEL_ENTRY.homeQuote} funnel="home" variant="secondary">
            Get a Home Quote
          </FunnelButton>
        </div>
      </div>
    </section>
  );
}
