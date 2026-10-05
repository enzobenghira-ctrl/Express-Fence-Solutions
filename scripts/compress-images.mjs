// Compresses every image in public/images to <= 500 KB (owner requirement).
//   npm run images:compress
// - JPEG stays JPEG; photographic PNGs become WebP (PNG can't get photos under 500 KB).
// - Long edge capped at 2000px; quality steps down until the file fits.
// - Files already under the limit (logos, icons) are left untouched.
// - References in app/, components/ and lib/ are rewritten for any renamed file.

import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public", "images");
const LIMIT = 500 * 1024;
const MAX_EDGE = 2000;
const QUALITIES = [80, 72, 64, 56, 48];

async function encode(input, format, quality) {
  const img = sharp(input).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
  return format === "jpeg" ? img.jpeg({ quality, mozjpeg: true }).toBuffer() : img.webp({ quality }).toBuffer();
}

async function codeFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await codeFiles(p)));
    else if (/\.(tsx?|css|json)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const renames = [];
let before = 0;
let after = 0;

for (const name of (await readdir(IMAGES)).sort()) {
  const file = path.join(IMAGES, name);
  const ext = path.extname(name).toLowerCase();
  const size = (await stat(file)).size;
  before += size;
  if (size <= LIMIT || ![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    after += size;
    continue;
  }

  const format = ext === ".jpg" || ext === ".jpeg" ? "jpeg" : "webp";
  const input = await readFile(file);
  let buf;
  for (const q of QUALITIES) {
    buf = await encode(input, format, q);
    if (buf.length <= LIMIT) break;
  }
  const outName = format === "webp" && ext !== ".webp" ? name.replace(/\.png$/i, ".webp") : name;
  await writeFile(path.join(IMAGES, outName), buf);
  if (outName !== name) {
    await rm(file);
    renames.push([name, outName]);
  }
  after += buf.length;
  console.log(`${name.padEnd(46)} ${(size / 1024).toFixed(0).padStart(6)} KB -> ${outName.padEnd(46)} ${(buf.length / 1024).toFixed(0).padStart(4)} KB${buf.length > LIMIT ? "  (STILL OVER LIMIT)" : ""}`);
}

if (renames.length) {
  for (const f of [...(await codeFiles(path.join(ROOT, "app"))), ...(await codeFiles(path.join(ROOT, "components"))), ...(await codeFiles(path.join(ROOT, "lib")))]) {
    let src = await readFile(f, "utf8");
    let changed = false;
    for (const [from, to] of renames) {
      if (src.includes(`/images/${from}`)) {
        src = src.split(`/images/${from}`).join(`/images/${to}`);
        changed = true;
      }
    }
    if (changed) {
      await writeFile(f, src);
      console.log(`updated references in ${path.relative(ROOT, f)}`);
    }
  }
}

console.log(`\nTotal: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
