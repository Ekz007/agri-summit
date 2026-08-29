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

        {variant === "hero" && (
          /* raiz dourada: tronco fino que afina + ramificações e radículas */
          <g stroke="url(#og-gold)" fill="none" strokeLinecap="round">
            {/* raiz principal (afinando ao descer) */}
            <path d="M1245 -40 C 1215 160, 1290 330, 1235 540" strokeWidth="9" />
            <path d="M1235 540 C 1200 680, 1275 810, 1250 950" strokeWidth="5.5" />

            {/* ramificações primárias */}
            <path d="M1232 170 C 1140 215, 1075 295, 1000 330" strokeWidth="3.5" />
            <path d="M1262 300 C 1330 355, 1375 425, 1425 465" strokeWidth="3.5" />
            <path d="M1240 470 C 1155 530, 1110 610, 1050 650" strokeWidth="3" />
            <path d="M1255 650 C 1320 705, 1355 770, 1395 815" strokeWidth="2.5" />

            {/* ramificações secundárias */}
            <path d="M1000 330 C 950 352, 918 402, 872 424" strokeWidth="2" />
            <path d="M1050 650 C 1010 678, 990 726, 952 750" strokeWidth="1.8" />
            <path d="M1425 465 C 1452 488, 1462 528, 1482 550" strokeWidth="1.8" />
            <path d="M1075 295 C 1040 275, 1020 240, 985 225" strokeWidth="1.6" />

            {/* radículas */}
            <path d="M872 424 C 845 435, 828 462, 800 472" strokeWidth="1.2" opacity="0.8" />
            <path d="M952 750 C 928 762, 915 786, 892 796" strokeWidth="1.2" opacity="0.8" />
            <path d="M1330 355 C 1352 335, 1380 328, 1400 310" strokeWidth="1.4" opacity="0.8" />
            <path d="M1155 530 C 1130 518, 1112 492, 1085 482" strokeWidth="1.3" opacity="0.8" />
            <path d="M1215 160 C 1190 130, 1188 95, 1168 68" strokeWidth="1.5" opacity="0.8" />
          </g>
        )}

      </svg>
    </div>
  );
}
