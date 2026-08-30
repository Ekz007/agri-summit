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
  variant?: "hero" | "hero-left" | "soft" | "panel" | "deck" | "brasil";
}) {
  const hasRoot = variant === "hero" || variant === "hero-left" || variant === "deck";
  const deckOnly = variant === "deck"; // só a raiz, fundo chapado (estilo do deck)
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio={deckOnly ? "xMaxYMid slice" : "xMidYMid slice"}
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
          <linearGradient id="og-verde" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9acb4e" stopOpacity="0.75" />
            <stop offset="1" stopColor="#7fb539" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="og-azul" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#56b7c7" stopOpacity="0.65" />
            <stop offset="1" stopColor="#2f9aa8" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="og-glow" cx="0.8" cy="0.1" r="0.9">
            <stop offset="0" stopColor="#1a9698" stopOpacity="0.45" />
            <stop offset="1" stopColor="#1a9698" stopOpacity="0" />
          </radialGradient>
        </defs>

        {!deckOnly && (
          <>
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
          </>
        )}

        {hasRoot && (
          /* golden root — conceito original do deck; "hero-left" espelha
             pro lado esquerdo (pra não cruzar a imagem do hero) */
          <g
            transform={
              variant === "hero-left"
                ? "translate(1440,0) scale(-1,1)"
                : deckOnly
                  ? "translate(175,0)"
                  : undefined
            }
          >
            <path
              d="M1240 -40 C 1180 240, 1360 420, 1240 700 C 1180 840, 1320 900, 1400 940"
              stroke="url(#og-gold)"
              strokeWidth="70"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={
                variant === "hero-left"
                  ? // braço por fora, acompanhando a borda (não cruza o conteúdo)
                    "M1240 380 C 1330 460, 1362 560, 1382 670"
                  : "M1240 380 C 1120 420, 1060 560, 940 600"
              }
              stroke="url(#og-gold)"
              strokeWidth="34"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </g>
        )}
        {variant === "brasil" && (
          <>
            {/* raiz DOURADA — direita (original do conceito) */}
            <g>
              <path
                d="M1240 -40 C 1180 240, 1360 420, 1240 700 C 1180 840, 1320 900, 1400 940"
                stroke="url(#og-gold)"
                strokeWidth="70"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M1240 380 C 1120 420, 1060 560, 940 600"
                stroke="url(#og-gold)"
                strokeWidth="34"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </g>
            {/* raiz VERDE — esquerda (espelhada, braço por fora) */}
            <g transform="translate(1440,0) scale(-1,1)" opacity="0.8">
              <path
                d="M1240 -40 C 1180 240, 1360 420, 1240 700 C 1180 840, 1320 900, 1400 940"
                stroke="url(#og-verde)"
                strokeWidth="58"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M1240 380 C 1330 460, 1362 560, 1382 670"
                stroke="url(#og-verde)"
                strokeWidth="28"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </g>
            {/* raiz AZUL — atravessa o topo, sutil */}
            <g opacity="0.6">
              <path
                d="M-60 40 C 260 160, 560 60, 860 130 C 1080 180, 1260 120, 1500 180"
                stroke="url(#og-azul)"
                strokeWidth="44"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M560 78 C 620 190, 600 300, 660 400"
                stroke="url(#og-azul)"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
