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

            {/* ramo esquerdo superior */}
            <path d="M430 180 C 358 248, 288 312, 214 376" strokeWidth="5" />
            <path d="M214 376 C 162 422, 132 488, 112 552" strokeWidth="2.4" />
            <path d="M288 312 C 240 350, 202 396, 162 438" strokeWidth="1.5" opacity="0.85" />

            {/* ramo direito */}
            <path d="M390 300 C 422 398, 442 488, 452 578" strokeWidth="4.5" />
            <path d="M452 578 C 460 648, 464 718, 467 788" strokeWidth="2.2" />
            <path d="M438 478 C 462 514, 478 546, 494 580" strokeWidth="1.5" opacity="0.85" />

            {/* ramo esquerdo inferior */}
            <path d="M338 560 C 298 630, 268 700, 242 770" strokeWidth="3.5" />
            <path d="M242 770 C 226 820, 218 866, 210 912" strokeWidth="1.8" />

            {/* ramo direito curto */}
            <path d="M312 720 C 342 780, 356 836, 366 892" strokeWidth="2.6" />
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
            {/* tronco */}
            <path d="M-10 920 C 45 830, 72 715, 112 595" strokeWidth="12" />
            <path d="M112 595 C 150 480, 148 360, 178 250" strokeWidth="8" />
            <path d="M178 250 C 200 160, 190 55, 208 -50" strokeWidth="5" />

            {/* ramos */}
            <path d="M70 720 C 142 652, 212 588, 286 524" strokeWidth="5" />
            <path d="M286 524 C 338 478, 368 412, 388 348" strokeWidth="2.4" />
            <path d="M212 588 C 260 550, 298 504, 338 462" strokeWidth="1.5" opacity="0.85" />

            <path d="M110 600 C 78 502, 58 412, 48 322" strokeWidth="4.5" />
            <path d="M48 322 C 40 252, 36 182, 33 112" strokeWidth="2.2" />
            <path d="M62 422 C 38 386, 22 354, 6 320" strokeWidth="1.5" opacity="0.85" />

            <path d="M162 340 C 202 270, 232 200, 258 130" strokeWidth="3.5" />
            <path d="M258 130 C 274 80, 282 34, 290 -12" strokeWidth="1.8" />

            <path d="M188 180 C 158 120, 144 64, 134 8" strokeWidth="2.6" />
          </g>
        </svg>
      )}
    </div>
  );
}
