/** Gera os ícones do PWA a partir do símbolo da marca (trigo + pixel). */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public/icons", { recursive: true });

const mark = (pad, bg) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9acb4e"/><stop offset="1" stop-color="#7fb539"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0d79a"/><stop offset="1" stop-color="#d9b15a"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="${bg}"/>
  <g transform="translate(${pad},${pad}) scale(${(512 - pad * 2) / 48})">
    <g stroke="url(#g)" stroke-width="3.2" stroke-linecap="round" fill="none">
      <path d="M24 44 V20"/>
      <path d="M24 26 C16 22 14 15 15 9 C21 10 24 15 24 22"/>
      <path d="M24 26 C32 22 34 15 33 9 C27 10 24 15 24 22"/>
    </g>
    <rect x="20" y="10" width="8" height="8" rx="2" fill="url(#gold)"/>
    <circle cx="24" cy="14" r="1.6" fill="#06231b"/>
  </g>
</svg>`;

const jobs = [
  ["public/icons/icon-192.png", 192, 70, "#073a2c"],
  ["public/icons/icon-512.png", 512, 70, "#073a2c"],
  ["public/icons/maskable-512.png", 512, 130, "#073a2c"], // safe zone maior
  ["src/app/apple-icon.png", 180, 70, "#073a2c"],
  ["src/app/icon.png", 64, 60, "#073a2c"],
];

for (const [out, size, pad, bg] of jobs) {
  await sharp(Buffer.from(mark(pad, bg))).resize(size, size).png().toFile(out);
  console.log("✓", out);
}
