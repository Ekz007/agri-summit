"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Clock, Search } from "lucide-react";
import { Badge } from "@/components/portal/ui";
import { cn } from "@/lib/utils";

export type AdminMeetingRow = {
  id: string;
  dia: number;
  ordem: number;
  inicio: string;
  mesa: number;
  investidor: string;
  startup: string;
  score: number;
  status: string;
};

export function AdminRodadasMap({ rows }: { rows: AdminMeetingRow[] }) {
  const [dia, setDia] = useState(1);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(1);

  const doDia = useMemo(() => {
    const term = q.toLowerCase();
    return rows
      .filter((r) => r.dia === dia)
      .filter(
        (r) =>
          !term ||
          r.investidor.toLowerCase().includes(term) ||
          r.startup.toLowerCase().includes(term)
      );
  }, [rows, dia, q]);

  const rodadas = useMemo(() => {
    const map = new Map<number, AdminMeetingRow[]>();
    for (const r of doDia) {
      if (!map.has(r.ordem)) map.set(r.ordem, []);
      map.get(r.ordem)!.push(r);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([ordem, list]) => ({
        ordem,
        inicio: list[0]?.inicio?.slice(0, 5) ?? "",
        list: list.sort((a, b) => a.mesa - b.mesa),
      }));
  }, [doDia]);

  return (
    <div className="surface overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {[1, 2].map((d) => (
            <button
              key={d}
              onClick={() => setDia(d)}
              className={cn(
                "rounded-md px-5 py-2 text-sm font-semibold transition-colors",
                dia === d ? "bg-ocean-600 text-cream" : "text-cream/70 hover:text-cream"
              )}
            >
              Dia {d} · {d === 1 ? "15 jun" : "16 jun"}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar startup ou investidor"
            className="w-full rounded-lg border border-white/10 bg-forest-950/60 py-2.5 pl-9 pr-3 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-sky-400/60"
          />
        </label>
      </div>

      {rodadas.length === 0 && (
        <p className="px-5 py-10 text-center text-sm text-cream/50">
          Nenhum encontro para este dia. Gere o matching na Administração.
        </p>
      )}

      <ul className="divide-y divide-white/8">
        {rodadas.map((r) => (
          <li key={r.ordem}>
            <button
              onClick={() => setOpen(open === r.ordem ? null : r.ordem)}
              className="flex w-full items-center gap-4 px-5 py-3.5 text-left"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-cream/40 transition-transform",
                  open === r.ordem && "rotate-180"
                )}
              />
              <span className="font-display font-700 text-cream">Rodada {r.ordem}</span>
              <span className="flex items-center gap-1.5 text-sm text-cream/55">
                <Clock className="h-3.5 w-3.5 text-sky-400" /> {r.inicio}
              </span>
              <span className="ml-auto">
                <Badge tone="ocean">{r.list.length} mesas</Badge>
              </span>
            </button>
            {open === r.ordem && (
              <div className="overflow-x-auto border-t border-white/8 bg-forest-950/40 scroll-slim">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-cream/45">
                      <th className="px-5 py-2.5 font-medium">Mesa</th>
                      <th className="px-3 py-2.5 font-medium">Investidor</th>
                      <th className="px-3 py-2.5 font-medium">Startup</th>
                      <th className="px-3 py-2.5 font-medium">Match</th>
                      <th className="px-5 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {r.list.map((m) => (
                      <tr key={m.id}>
                        <td className="px-5 py-2.5 font-display font-700 tabular-nums text-sky-400">
                          {m.mesa}
                        </td>
                        <td className="px-3 py-2.5 text-cream/85">{m.investidor}</td>
                        <td className="px-3 py-2.5 text-cream/85">{m.startup}</td>
                        <td className="px-3 py-2.5 tabular-nums text-cream/70">{m.score}%</td>
                        <td className="px-5 py-2.5">
                          <Badge
                            tone={
                              m.status === "realizado"
                                ? "green"
                                : m.status === "agendado"
                                  ? "neutral"
                                  : "red"
                            }
                          >
                            {m.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
