/** Optimizes the hero key-art and keys the partner-logo strip to white-on-transparent. */
import sharp from "sharp";
import { join } from "node:path";

const SCRATCH = "/private/tmp/claude-501/-Users-MAC/c9d83c27-6750-47c8-9545-cffb59041f39/scratchpad";
const OUT = "public/brand";

// 1) Hero key art → optimized jpg + webp
await sharp(join(SCRATCH, "hero_hi-008.png"))
  .resize(2200)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(join(OUT, "hero-agri.jpg"));
await sharp(join(SCRATCH, "hero_hi-008.png"))
  .resize(2200)
  .webp({ quality: 82 })
  .toFile(join(OUT, "hero-agri.webp"));

// 1b) People-only crop (right side) for portal/section use
await sharp(join(SCRATCH, "hero_hi-008.png"))
  .extract({ left: 1320, top: 0, width: 1680, height: 1688 })
  .resize(1400)
  .webp({ quality: 82 })
  .toFile(join(OUT, "hero-people.webp"));

// 2) Logo strip → white-on-transparent
const region = { left: 688, top: 1398, width: 585, height: 132 };
const { data, info } = await sharp(join(SCRATCH, "logos_hi-007.png"))
  .extract(region)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  // teal background ~lum 55; white marks ~lum 240. Map to alpha.
  let a = Math.round(((lum - 70) / (210 - 70)) * 255);
  a = Math.max(0, Math.min(255, a));
  out[i] = 255; out[i + 1] = 255; out[i + 2] = 255; out[i + 3] = a;
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(join(OUT, "logos-brancos.png"));

console.log("✓ assets gerados em", OUT);
