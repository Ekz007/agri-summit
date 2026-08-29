/**
 * Neon blue traces — glowing animated dashed curves that run through
 * the platform background, following the organic root shapes.
 */
export function NeonTraces({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          className="neon-trace"
          stroke="#56b7c7"
          strokeWidth="2"
          d="M-60 240 C 260 140, 520 400, 820 290 S 1360 140, 1560 300"
        />
        <path
          className="neon-trace"
          style={{ animationDelay: "-12s" }}
          stroke="#56b7c7"
          strokeWidth="1.6"
          d="M1250 -40 C 1190 240, 1350 430, 1230 700 C 1170 840, 1300 900, 1400 950"
        />
      </svg>
    </div>
  );
}
