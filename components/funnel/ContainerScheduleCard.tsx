import schedule from "@/content/container-schedule.json";
import FactText from "@/components/funnel/FactText";
import FunnelButton, { type FunnelCTA } from "@/components/funnel/FunnelButton";
import { todo } from "@/lib/facts";

interface ContainerSchedule {
  nextArrival: string | null;
  allocatedPercent: number | null;
  updatedAt: string | null;
}

interface Props {
  title?: string;
  primary?: FunnelCTA;
  secondary?: FunnelCTA;
}

/** Next container arrival + how much is already allocated. Data: content/container-schedule.json. */
export default function ContainerScheduleCard({ title = "Next container", primary, secondary }: Props) {
  const data = schedule as ContainerSchedule;
  const pct =
    typeof data.allocatedPercent === "number" ? Math.min(100, Math.max(0, Math.round(data.allocatedPercent))) : null;

  return (
    <div style={{ background: "var(--dark)", color: "var(--white)", borderRadius: 14, padding: "36px 32px" }}>
      <span className="efs-eyebrow efs-eyebrow--on-dark">{title}</span>

      <p
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(32px, 4vw, 44px)",
          lineHeight: 1.1,
          marginBottom: 28,
        }}
      >
        Arriving <FactText value={data.nextArrival ?? todo("next arrival month")} />
      </p>

      <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-dm-sans)", fontSize: 14 }}>
        <span style={{ color: "rgba(250,250,247,0.8)" }}>Already allocated</span>
        <strong>{pct === null ? <FactText value={todo("% allocated")} /> : `${pct}%`}</strong>
      </div>
      <div
        role="progressbar"
        aria-label="Container allocated"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct ?? undefined}
        style={{ height: 8, borderRadius: 4, background: "rgba(250,250,247,0.15)", overflow: "hidden" }}
      >
        <div style={{ width: `${pct ?? 0}%`, height: "100%", background: "var(--accent)" }} />
      </div>

      {data.updatedAt && (
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "rgba(250,250,247,0.7)", marginTop: 10 }}>
          Updated {data.updatedAt}
        </p>
      )}

      {(primary || secondary) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          {primary && (
            <FunnelButton href={primary.href} funnel={primary.funnel} variant="light">
              {primary.label}
            </FunnelButton>
          )}
          {secondary && (
            <FunnelButton href={secondary.href} funnel={secondary.funnel} variant="outline-light">
              {secondary.label}
            </FunnelButton>
          )}
        </div>
      )}
    </div>
  );
}
