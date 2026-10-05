import FunnelImage from "@/components/funnel/FunnelImage";
import { REAL_INSTALL_PHOTOS } from "@/lib/images";

interface Props {
  eyebrow?: string;
  title?: string;
  /** Defaults to confirmed real installs. Concept images passed here are auto-labelled. */
  photos?: { src: string; alt: string }[];
  caption?: string;
}

export default function ProjectGallery({ eyebrow = "Our work", title = "Recent installs", photos = REAL_INSTALL_PHOTOS, caption }: Props) {
  return (
    <section className="efs-section" style={{ background: "var(--background)" }}>
      <div className="efs-container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="efs-eyebrow">{eyebrow}</span>
          <h2 className="efs-h2">{title}</h2>
          {caption && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", marginTop: 12 }}>{caption}</p>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {photos.map((p) => (
            <div key={p.src} style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
              <FunnelImage src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
