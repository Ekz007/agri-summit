import { cn } from "@/lib/utils";

/**
 * Signature flowing-line motif from the Agri Summit concept —
 * roots / rivers / neural network in petrol, green and gold.
 * Purely decorative, sits behind content.
 */
export function OrganicBg({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "soft" | "panel";
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="og-petrol" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#147d92" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0c4453" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="og-ocean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2f9aa8" stopOpacity="0.5" />
            <stop offset="1" stopColor="#0e5a6b" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="og-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e6c574" stopOpacity="0.9" />
            <stop offset="1" stopColor="#d9b15a" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="og-glow" cx="0.8" cy="0.1" r="0.9">
            <stop offset="0" stopColor="#1a9698" stopOpacity="0.45" />
            <stop offset="1" stopColor="#1a9698" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#og-glow)" />

        {/* broad petrol ribbons */}
        <path
          d="M-100 260 C 260 120, 520 420, 820 300 S 1360 120, 1600 320"
          stroke="url(#og-petrol)"
          strokeWidth="120"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M-120 620 C 300 520, 560 760, 900 640 S 1400 560, 1620 700"
          stroke="url(#og-ocean)"
          strokeWidth="90"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

      </svg>

      {variant === "hero" && (
        /* Raiz dourada em SVG próprio, ancorado à direita: sempre aparece
           inteira, em qualquer largura de container. Tronco que afila,
           ramos tangentes fluindo para baixo. */
        <svg
          className="absolute right-0 top-0 h-full opacity-70"
          viewBox="0 0 500 900"
          preserveAspectRatio="xMaxYMid meet"
          fill="none"
        >
          <defs>
            <linearGradient id="root-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e6c574" stopOpacity="0.85" />
              <stop offset="1" stopColor="#d9b15a" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <g stroke="url(#root-gold)" strokeLinecap="round" strokeLinejoin="round">
            {/* tronco — nasce no canto superior direito e desce em diagonal */}
            <path d="M510 -20 C 455 70, 428 185, 388 305" strokeWidth="12" />
            <path d="M388 305 C 350 420, 352 540, 322 650" strokeWidth="8" />
            <path d="M322 650 C 300 740, 310 845, 292 950" strokeWidth="5" />

            {/* ramo A — sai do tronco em (443,131), flui contínuo p/ esquerda-baixo */}
            <path d="M443 131 C 380 200, 310 265, 240 330" strokeWidth="4.5" />
            <path d="M240 330 C 185 382, 150 445, 128 510" strokeWidth="2.6" />
            <path d="M128 510 C 114 552, 106 596, 100 640" strokeWidth="1.4" />
            <path d="M240 330 C 205 350, 175 380, 148 412" strokeWidth="1.4" opacity="0.8" />

            {/* ramo B — sai da junção (388,305), direita-baixo */}
            <path d="M388 305 C 424 395, 446 485, 456 575" strokeWidth="4" />
            <path d="M456 575 C 463 645, 466 715, 468 785" strokeWidth="2.2" />
            <path d="M468 785 C 469 825, 470 862, 470 900" strokeWidth="1.2" />
            <path d="M456 575 C 470 615, 480 655, 488 695" strokeWidth="1.3" opacity="0.8" />

            {/* ramo C — sai do tronco em (352,479), esquerda-baixo */}
            <path d="M352 479 C 312 550, 282 620, 256 690" strokeWidth="3.2" />
            <path d="M256 690 C 238 742, 226 792, 216 842" strokeWidth="1.8" />
            <path d="M216 842 C 210 872, 206 895, 202 915" strokeWidth="1" />

            {/* ramo D — sai da junção (322,650), direita-baixo */}
            <path d="M322 650 C 350 712, 366 768, 376 828" strokeWidth="2.4" />
            <path d="M376 828 C 381 862, 384 890, 386 915" strokeWidth="1.2" />
          </g>
        </svg>
      )}

      {variant === "hero" && (
        /* segunda raiz — nasce do canto inferior esquerdo e sobe em diagonal */
        <svg
          className="absolute left-0 bottom-0 h-full opacity-60"
          viewBox="0 0 500 900"
          preserveAspectRatio="xMinYMid meet"
          fill="none"
        >
          <defs>
            <linearGradient id="root-gold-b" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#e6c574" stopOpacity="0.85" />
              <stop offset="1" stopColor="#d9b15a" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <g stroke="url(#root-gold-b)" strokeLinecap="round" strokeLinejoin="round">
            {/* tronco — nasce no canto inferior esquerdo e sobe em diagonal */}
            <path d="M-10 920 C 45 830, 72 715, 112 595" strokeWidth="12" />
            <path d="M112 595 C 150 480, 148 360, 178 250" strokeWidth="8" />
            <path d="M178 250 C 200 160, 190 55, 208 -50" strokeWidth="5" />

            {/* ramo A — sai do tronco em (57,769), flui p/ direita-cima */}
            <path d="M57 769 C 120 700, 190 635, 260 570" strokeWidth="4.5" />
            <path d="M260 570 C 315 518, 350 455, 372 390" strokeWidth="2.6" />
            <path d="M372 390 C 386 348, 394 304, 400 260" strokeWidth="1.4" />
            <path d="M260 570 C 295 550, 325 520, 352 488" strokeWidth="1.4" opacity="0.8" />

            {/* ramo B — sai da junção (112,595), esquerda-cima */}
            <path d="M112 595 C 76 505, 54 415, 44 325" strokeWidth="4" />
            <path d="M44 325 C 37 255, 34 185, 32 115" strokeWidth="2.2" />
            <path d="M32 115 C 31 75, 30 38, 30 0" strokeWidth="1.2" />
            <path d="M44 325 C 30 285, 20 245, 12 205" strokeWidth="1.3" opacity="0.8" />

            {/* ramo C — sai do tronco em (148,421), direita-cima */}
            <path d="M148 421 C 188 350, 218 280, 244 210" strokeWidth="3.2" />
            <path d="M244 210 C 262 158, 274 108, 284 58" strokeWidth="1.8" />
            <path d="M284 58 C 290 28, 294 5, 298 -15" strokeWidth="1" />

            {/* ramo D — sai da junção (178,250), esquerda-cima */}
            <path d="M178 250 C 206 188, 222 132, 232 72" strokeWidth="2.4" />
            <path d="M232 72 C 237 38, 240 10, 242 -15" strokeWidth="1.2" />
          </g>
        </svg>
      )}
    </div>
  );
}
