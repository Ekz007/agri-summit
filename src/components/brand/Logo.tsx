import { cn } from "@/lib/utils";

/**
 * Agri Summit Brazil lockup — reproduces the deck wordmark:
 * "AGRI / SUMMIT" (cream) + "BRAZIL" (gold) + "2027" (green),
 * with a stylized wheat-node mark.
 */
export function Logo({
  className,
  showYear = true,
  compact = false,
}: {
  className?: string;
  showYear?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark className={compact ? "h-8 w-8" : "h-11 w-11"} />
      <div className="leading-[0.86]">
        <div
          className={cn(
            "font-display font-800 tracking-tight text-cream",
            compact ? "text-lg" : "text-xl"
          )}
        >
          AGRI
        </div>
        <div
          className={cn(
            "font-display font-800 tracking-tight text-cream",
            compact ? "text-lg" : "text-xl"
          )}
        >
          SUMMIT
        </div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display font-800 tracking-tight text-gold-400",
              compact ? "text-lg" : "text-xl"
            )}
          >
            BRAZIL
          </span>
          {showYear && (
            <span className="font-display font-700 text-green-400 text-sm">
              2027
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9acb4e" />
          <stop offset="1" stopColor="#7fb539" />
        </linearGradient>
        <linearGradient id="lm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d79a" />
          <stop offset="1" stopColor="#d9b15a" />
        </linearGradient>
      </defs>
      {/* wheat stalk — three arcing grains, a nod to the CNA mark */}
      <g stroke="url(#lm-g)" strokeWidth="3.2" strokeLinecap="round">
        <path d="M24 44 V20" />
        <path d="M24 26 C16 22 14 15 15 9 C21 10 24 15 24 22" />
        <path d="M24 26 C32 22 34 15 33 9 C27 10 24 15 24 22" />
      </g>
      {/* central node — the "digital" pixel */}
      <rect x="20" y="10" width="8" height="8" rx="2" fill="url(#lm-gold)" />
      <circle cx="24" cy="14" r="1.6" fill="#06231b" />
    </svg>
  );
}
