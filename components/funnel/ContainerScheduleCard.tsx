import schedule from "@/content/container-schedule.json";
import FactText from "@/components/funnel/FactText";
import FunnelButton, { type FunnelCTA } from "@/components/funnel/FunnelButton";
import { SCHEDULE_READY, isPageReady } from "@/lib/content-readiness";
import { SHOW_TODOS, todo } from "@/lib/facts";

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

/** True when the card renders in this build — callers drop the surrounding section otherwise. */
export const SCHEDULE_CARD_VISIBLE = SCHEDULE_READY || SHOW_TODOS;

/**
 * Next container arrival + how much is already allocated (content/container-schedule.json).
 * In production it renders nothing until the next arrival month is set.
 */
export default function ContainerScheduleCard({ title = "Next container", primary, secondary }: Props) {
  if (!SCHEDULE_CARD_VISIBLE) return null;

  const data = schedule as ContainerSchedule;
  const pct =
    typeof data.allocatedPercent === "number" ? Math.min(100, Math.max(0, Math.round(data.allocatedPercent))) : null;
  const buttons = [primary, secondary].filter((b): b is FunnelCTA => Boolean(b) && isPageReady(b!.href));

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

      {(pct !== null || SHOW_TODOS) && (
        <>
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
        </>
      )}

      {data.updatedAt && (
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "rgba(250,250,247,0.7)", marginTop: 10 }}>
          Updated {data.updatedAt}
        </p>
      )}

      {buttons.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          {buttons.map((b, i) => (
            <FunnelButton key={b.href} href={b.href} funnel={b.funnel} variant={i === 0 && b === primary ? "light" : "outline-light"}>
              {b.label}
            </FunnelButton>
          ))}
        </div>
      )}
    </div>
  );
}
