import Image, { type ImageProps } from "next/image";
import { isConceptImage } from "@/lib/images";

type Props = ImageProps & { src: string };

/**
 * next/image that stamps a "Concept" badge on AI images and renders (see lib/images.ts).
 * The parent must be position: relative, as it already is for `fill` images.
 */
export default function FunnelImage({ alt, ...props }: Props) {
  const concept = isConceptImage(props.src);
  return (
    <>
      <Image alt={concept ? `${alt} (concept image)` : alt} {...props} />
      {concept && <span className="efs-concept-badge">Concept</span>}
    </>
  );
}
