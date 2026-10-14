// Real projects only. Each project is tagged Residential or Trade so its card ends with the
// matching funnel button; untagged (null) projects show both until the owner tags them.

import { todo, type Fact } from "@/lib/facts";
import { REAL_INSTALL_PHOTOS } from "@/lib/images";

export interface Project {
  photo: { src: string; alt: string };
  title: Fact;
  location: Fact;
  product: string;
  tag: "Residential" | "Trade" | null;
}

const PRODUCT_BY_PHOTO: Record<string, string> = {
  "/images/fence-black-pool-patio.jpg": "WPC fencing",
  "/images/fence-light-grey-white-frame-turf.jpg": "WPC fencing",
  "/images/fence-light-grey-decorative-patio.webp": "WPC fencing & decking",
  "/images/gate-black-sliding-driveway.jpg": "WPC gate",
  "/images/fence-dark-brown-garden-path.jpg": "WPC fencing",
  "/images/gate-wood-look-black-frame-path.jpg": "WPC gate",
  "/images/pergola-wood-look-waterfront.jpg": "WPC pergola",
  "/images/pergola-brown-covered-patio.jpg": "WPC pergola",
  "/images/gate-black-slat-double-turf.jpg": "WPC gate",
  "/images/fence-waterway-turf.jpg": "WPC fencing",
  "/images/fence-black-modern-home.jpg": "WPC fencing",
  "/images/fence-charcoal-white-frame.jpg": "WPC fencing",
  "/images/gate-charcoal-single.jpg": "WPC gate",
  "/images/gate-wood-black-miami.jpg": "WPC gate",
};

export const PROJECTS: Project[] = REAL_INSTALL_PHOTOS.map((photo) => ({
  photo,
  title: todo("project name"),
  location: todo("city"),
  product: PRODUCT_BY_PHOTO[photo.src] ?? "WPC",
  tag: null,
}));
