import FunnelButton from "@/components/funnel/FunnelButton";
import { FUNNEL_ENTRY } from "@/lib/site-config";

/** Bottom of every product page: both funnels, with the trade-pricing line from the blueprint. */
export default function ProductFunnelCTA({ productName, quoteType }: { productName: string; quoteType?: string }) {
  return (
    <section className="efs-section" style={{ background: "var(--dark)", textAlign: "center" }}>
      <div className="efs-container" style={{ maxWidth: 720 }}>
        <h2 className="efs-h2" style={{ color: "var(--white)", marginBottom: 14 }}>
          Ready for {productName}?
        </h2>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "rgba(250,250,247,0.8)", marginBottom: 28 }}>
          Homeowners: get a free quote. Contractors: trade pricing available — open an account.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <FunnelButton href={quoteType ? `${FUNNEL_ENTRY.homeQuote}?type=${quoteType}` : FUNNEL_ENTRY.homeQuote} funnel="home" variant="light">
            Get a Home Quote
          </FunnelButton>
          <FunnelButton href={FUNNEL_ENTRY.tradeHub} funnel="trade" variant="outline-light">
            Open a Trade Account
          </FunnelButton>
        </div>
      </div>
    </section>
  );
}
