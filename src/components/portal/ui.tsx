import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display font-800 tracking-tight text-[clamp(1.6rem,3vw,2.2rem)] text-cream">
          {title}
        </h1>
        {subtitle && <p className="mt-1.5 max-w-xl text-cream/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("surface rounded-2xl p-6", className)}>{children}</div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  tone = "green",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ElementType;
  tone?: "green" | "gold" | "petrol" | "ocean";
}) {
  const tones = {
    green: "text-green-400 bg-green-500/15",
    gold: "text-gold-400 bg-gold-500/15",
    petrol: "text-petrol-500 bg-petrol-500/15",
    ocean: "text-sky-400 bg-ocean-600/25",
  } as const;
  return (
    <div className="surface rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="mono text-xs uppercase tracking-wider text-cream/60">{label}</span>
        {Icon && (
          <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", tones[tone])}>
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="mt-2 font-display font-800 text-3xl text-cream">{value}</div>
      {hint && <div className="mt-1 text-xs text-cream/45">{hint}</div>}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="surface flex flex-col items-center rounded-2xl px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
        <Icon className="h-7 w-7 text-green-400" />
      </div>
      <h3 className="mt-4 font-display font-700 text-lg text-cream">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-cream/60">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "gold" | "red" | "ocean";
}) {
  const tones = {
    neutral: "bg-white/8 text-cream/75 border-white/10",
    green: "bg-green-500/12 text-green-300 border-green-500/25",
    gold: "bg-gold-500/12 text-gold-300 border-gold-500/25",
    red: "bg-red-500/12 text-red-300 border-red-500/25",
    ocean: "bg-ocean-600/20 text-sky-400 border-ocean-500/30",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function ScoreRing({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className="relative flex h-12 w-12 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--green-500) ${pct * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
      }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-xs font-display font-700 text-cream">
        {pct}
      </div>
    </div>
  );
}
