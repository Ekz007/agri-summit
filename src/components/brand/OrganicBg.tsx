import { cn } from "@/lib/utils";

/**
 * Signature flowing-line motif from the Agri Summit concept —
 * teal ribbons + golden branching roots (deck style, thinner).
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
          {/* dourado que esverdeia na ponta, como no conceito do deck */}
          <linearGradient id="root-top" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#e0b95f" stopOpacity="0.9" />
            <stop offset="0.7" stopColor="#d9c470" stopOpacity="0.75" />
            <stop offset="1" stopColor="#adc379" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="root-bottom" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e0b95f" stopOpacity="0.8" />
            <stop offset="0.7" stopColor="#d9c470" stopOpacity="0.65" />
            <stop offset="1" stopColor="#adc379" stopOpacity="0.45" />
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

        {variant === "hero" && (
          <>
            {/* raiz dourada superior — entra pela direita e varre a tela,
                bifurcando em Y (estilo do deck, mais fina) */}
            <g stroke="url(#root-top)" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1470 110 C 1330 130, 1180 205, 990 250" strokeWidth="28" />
              <path d="M990 250 C 840 283, 680 295, 540 285" strokeWidth="19" />
              <path d="M540 285 C 440 278, 350 262, 260 240" strokeWidth="11" />
              {/* braço que desce pela direita */}
              <path d="M1240 172 C 1288 305, 1322 460, 1312 615" strokeWidth="20" />
              <path d="M1312 615 C 1306 735, 1330 845, 1358 950" strokeWidth="13" />
              {/* dedinho que desce no meio */}
              <path d="M990 250 C 978 345, 998 440, 968 530" strokeWidth="10" />
              <path d="M968 530 C 954 585, 958 640, 946 692" strokeWidth="6" />
            </g>

            {/* raiz dourada inferior — entra pela esquerda (espelho) */}
            <g stroke="url(#root-bottom)" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
              <path d="M-30 790 C 110 770, 260 695, 450 650" strokeWidth="24" />
              <path d="M450 650 C 600 617, 760 605, 900 615" strokeWidth="16" />
              <path d="M900 615 C 1000 622, 1090 638, 1180 660" strokeWidth="9" />
              {/* braço que sobe pela esquerda */}
              <path d="M200 728 C 152 595, 118 440, 128 285" strokeWidth="17" />
              <path d="M128 285 C 134 165, 110 55, 82 -50" strokeWidth="11" />
              {/* dedinho que sobe no meio */}
              <path d="M450 650 C 462 555, 442 460, 472 370" strokeWidth="8" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
