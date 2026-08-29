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
            <stop offset="0" stopColor="#12787a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0b5f60" stopOpacity="0.15" />
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
          stroke="url(#og-petrol)"
          strokeWidth="90"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {variant === "hero" && (
          <>
            {/* golden root */}
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
          </>
        )}

        {/* thin green filaments + nodes */}
        <g stroke="#9acb4e" strokeOpacity="0.4" strokeWidth="2" fill="none">
          <path d="M120 80 C 380 200, 300 460, 560 520" />
          <path d="M980 120 C 760 260, 900 520, 700 640" />
        </g>
        <g fill="#9acb4e" fillOpacity="0.65">
          <circle cx="120" cy="80" r="4" />
          <circle cx="560" cy="520" r="4" />
          <circle cx="980" cy="120" r="4" />
          <circle cx="700" cy="640" r="4" />
        </g>
      </svg>
    </div>
  );
}
