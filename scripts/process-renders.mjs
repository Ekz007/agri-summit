/** Crops the XR header off the deck renders and exports optimized webp section images. */
import sharp from "sharp";
import { join } from "node:path";

const S = "/private/tmp/claude-501/-Users-MAC/c9d83c27-6750-47c8-9545-cffb59041f39/scratchpad";
const OUT = "public/brand";

// [srcFile, outName, cropTopFrac, cropBottomFrac]
const jobs = [
  ["hi_41-041.png", "exp-credenciamento", 0.16, 0],
  ["hi_57-057.png", "exp-portal", 0.14, 0],
  ["hi_61-061.png", "exp-plenaria", 0.14, 0],
  ["hi_85-085.png", "exp-investidores", 0.14, 0],
  ["hi_93-093.png", "exp-palco", 0.14, 0],
  ["hi_127-127.png", "exp-bar360", 0, 0],
];

for (const [src, out, topF, botF] of jobs) {
  const img = sharp(join(S, src));
  const { width, height } = await img.metadata();
  const top = Math.round(height * topF);
  const bottom = Math.round(height * botF);
  await img
    .extract({ left: 0, top, width, height: height - top - bottom })
    .resize(1600)
    .webp({ quality: 80 })
    .toFile(join(OUT, `${out}.webp`));
  console.log("✓", out);
}
