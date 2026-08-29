import { cn } from "@/lib/utils";

/** Stylized "realização" lockups for CNA/SENAR, Sebrae and Juntos Pelo Agro. */
export function Realizadores({
  className,
  label = "Realização",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {label && (
        <span className="text-[0.7rem] uppercase tracking-[0.35em] text-cream/50">
          {label}
        </span>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-5 text-cream">
        {/* CNA / SENAR */}
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
            <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.95">
              <path d="M20 34 V16" />
              <path d="M20 22 C12 18 11 11 12 6 C18 7 20 12 20 18" />
              <path d="M20 22 C28 18 29 11 28 6 C22 7 20 12 20 18" />
              <path d="M20 27 C14 25 12 21 12 17" />
              <path d="M20 27 C26 25 28 21 28 17" />
            </g>
          </svg>
          <div className="leading-none">
            <div className="font-display font-800 text-base tracking-tight">CNA</div>
            <div className="font-display font-700 text-sm tracking-[0.12em] text-cream/80">
              SENAR
            </div>
          </div>
        </div>

        <Divider />

        {/* SEBRAE */}
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 28" className="h-6 w-9" fill="none" aria-hidden>
            <g fill="currentColor">
              <rect x="4" y="4" width="32" height="3.4" rx="1.7" />
              <rect x="9" y="12.3" width="27" height="3.4" rx="1.7" />
              <rect x="4" y="20.6" width="32" height="3.4" rx="1.7" />
            </g>
          </svg>
          <span className="font-display font-800 text-lg tracking-[0.06em]">SEBRAE</span>
        </div>

        <Divider />

        {/* Juntos Pelo Agro */}
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden>
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" opacity="0.6" />
            <path
              d="M16 24 C10 20 12 12 16 8 C20 12 22 20 16 24 Z"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
          <div className="leading-tight font-display font-700 text-xs uppercase tracking-[0.16em]">
            Juntos
            <br />
            pelo Agro
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="hidden h-8 w-px bg-cream/15 sm:block" />;
}
