import { cn } from "@/lib/utils";

/**
 * Layers-style animated aurora — softly drifting colour fields in the
 * Agri Summit palette. Pure CSS, GPU-friendly, respects reduced-motion.
 * Sits behind the organic line-work.
 */
export function AuroraBg({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="aurora aurora-a"
        style={{
          top: "-10%",
          left: "-5%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle at 30% 30%, rgba(26,150,152,0.9), rgba(11,95,96,0) 70%)",
        }}
      />
      <div
        className="aurora aurora-b"
        style={{
          top: "10%",
          right: "-10%",
          width: "48vw",
          height: "48vw",
          background:
            "radial-gradient(circle at 60% 40%, rgba(217,177,90,0.55), rgba(217,177,90,0) 70%)",
        }}
      />
      <div
        className="aurora aurora-c"
        style={{
          bottom: "-20%",
          left: "20%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle at 50% 50%, rgba(127,181,57,0.5), rgba(127,181,57,0) 70%)",
        }}
      />
    </div>
  );
}
