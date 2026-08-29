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
          className="absolute right-0 top-0 h-full opacity-55"
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
            {/* tronco */}
            <path d="M510 -20 C 455 70, 428 185, 388 305" strokeWidth="10" />
            <path d="M388 305 C 352 410, 350 510, 330 600" strokeWidth="6" />
            {/* ramo esquerdo */}
            <path d="M443 131 C 380 200, 310 265, 240 330" strokeWidth="3.5" />
            <path d="M240 330 C 195 375, 165 425, 145 480" strokeWidth="1.8" />
            {/* ramo direito */}
            <path d="M388 305 C 420 390, 438 470, 446 550" strokeWidth="2.8" />
            <path d="M446 550 C 452 610, 455 665, 457 720" strokeWidth="1.4" />
          </g>
        </svg>
      )}

      {variant === "hero" && (
        /* segunda raiz — nasce do canto inferior esquerdo e sobe em diagonal */
        <svg
          className="absolute left-0 bottom-0 h-full opacity-45"
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
            <path d="M-10 920 C 45 830, 72 715, 112 595" strokeWidth="10" />
            <path d="M112 595 C 148 490, 150 390, 170 300" strokeWidth="6" />
            {/* ramo direito */}
            <path d="M57 769 C 120 700, 190 635, 260 570" strokeWidth="3.5" />
            <path d="M260 570 C 305 525, 335 475, 355 420" strokeWidth="1.8" />
            {/* ramo esquerdo */}
            <path d="M112 595 C 80 510, 62 430, 54 350" strokeWidth="2.8" />
            <path d="M54 350 C 48 290, 45 235, 43 180" strokeWidth="1.4" />
          </g>
        </svg>
      )}
    </div>
  );
}
