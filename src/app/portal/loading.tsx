export default function PortalLoading() {
  return (
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
  );
}
