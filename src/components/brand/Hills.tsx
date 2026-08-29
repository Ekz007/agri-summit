/**
 * Living-field background: layered rolling hills with slow drift,
 * inspired by soft-3D "material hills" backgrounds. Pure SVG/CSS.
 */
export function Hills({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="block h-[240px] w-full sm:h-[320px]">
        <defs>
          <linearGradient id="h-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#147d92" stopOpacity="0.5" />
            <stop offset="1" stopColor="#0c4453" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="h-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7fb539" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0a4d3a" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="h-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9b15a" stopOpacity="0.5" />
            <stop offset="1" stopColor="#073a2c" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path className="hill-a" fill="url(#h-far)"
          d="M0 260 C 220 180, 420 240, 640 200 C 880 158, 1080 230, 1440 180 L 1440 420 L 0 420 Z" />
        <path className="hill-b" fill="url(#h-mid)"
          d="M0 320 C 260 250, 520 310, 760 270 C 1000 232, 1220 300, 1440 250 L 1440 420 L 0 420 Z" />
        <path className="hill-c" fill="url(#h-near)"
          d="M0 380 C 320 320, 640 380, 920 350 C 1160 326, 1320 370, 1440 340 L 1440 420 L 0 420 Z" />
      </svg>
    </div>
  );
}
