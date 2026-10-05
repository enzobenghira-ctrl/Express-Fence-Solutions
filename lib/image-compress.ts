// Shrinks a photo in the browser before upload: max 1600px on the long side, JPEG.
// Keeps uploads well under Vercel's 4.5 MB request limit and fast on mobile data.

import { MAX_PHOTO_CHARS } from "@/lib/forms/schema";

const MAX_EDGE = 1600;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("unreadable"));
    };
    img.src = url;
  });
}

/** Returns a JPEG data URL, or throws if the file isn't an image the browser can read. */
export async function compressPhoto(file: File): Promise<string> {
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);

  for (const quality of [0.82, 0.7, 0.55]) {
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    if (dataUrl.length <= MAX_PHOTO_CHARS) return dataUrl;
  }
  throw new Error("too large");
}
