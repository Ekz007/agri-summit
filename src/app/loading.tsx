import { LogoMark } from "@/components/brand/Logo";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-forest-900">
      <LogoMark className="h-14 w-14 animate-pulse-ring rounded-full" />
      <div className="h-1 w-52 overflow-hidden rounded-full bg-white/10">
        <div className="shimmer h-full w-full" />
      </div>
      <p className="text-sm tracking-[0.25em] uppercase text-cream/60">
        Agri Summit Brazil
      </p>
    </div>
  );
}
