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
