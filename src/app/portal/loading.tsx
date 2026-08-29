import { LogoMark } from "@/components/brand/Logo";

export default function PortalLoading() {
  return (
    <div>
      {/* branded loader */}
      <div className="mb-10 flex items-center gap-4">
        <LogoMark className="h-10 w-10 animate-pulse-ring rounded-full" />
        <div>
          <p className="font-display font-700 text-cream">Carregando…</p>
          <div className="mt-2 h-1 w-44 overflow-hidden rounded-full bg-white/10">
            <div className="shimmer h-full w-full" />
          </div>
        </div>
      </div>

      {/* skeleton */}
      <div className="animate-pulse">
        <div className="mb-3 h-9 w-64 rounded-lg bg-white/10" />
        <div className="mb-10 h-4 w-96 max-w-full rounded bg-white/5" />
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-72 rounded-2xl bg-white/5" />
          <div className="h-72 rounded-2xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}
