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
            {/* tronco */}
            <path d="M330 -20 C 315 90, 345 200, 325 320" strokeWidth="12" />
            <path d="M325 320 C 308 430, 342 540, 324 650" strokeWidth="8" />
            <path d="M324 650 C 310 740, 338 840, 328 950" strokeWidth="5" />

            {/* ramo esquerdo superior */}
            <path d="M327 150 C 296 245, 252 330, 202 418" strokeWidth="5" />
            <path d="M202 418 C 174 476, 158 546, 142 612" strokeWidth="2.4" />
            <path d="M232 365 C 200 420, 172 468, 134 520" strokeWidth="1.5" opacity="0.85" />

            {/* ramo direito */}
            <path d="M324 335 C 368 422, 408 500, 434 586" strokeWidth="4.5" />
            <path d="M434 586 C 450 648, 459 720, 466 790" strokeWidth="2.2" />
            <path d="M410 505 C 438 543, 466 570, 492 600" strokeWidth="1.5" opacity="0.85" />

            {/* ramo esquerdo inferior */}
            <path d="M326 520 C 294 598, 268 672, 242 748" strokeWidth="3.5" />
            <path d="M242 748 C 228 800, 220 856, 212 910" strokeWidth="1.8" />

            {/* ramo direito curto */}
            <path d="M329 720 C 362 778, 384 832, 398 890" strokeWidth="2.6" />
          </g>
        </svg>
      )}
    </div>
  );
}
