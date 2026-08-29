"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, X, ChevronDown, Search, Loader2, Landmark, Rocket } from "lucide-react";
import { Badge } from "@/components/portal/ui";
import { setStartupStatus } from "@/app/portal/admin/actions";
import { cn } from "@/lib/utils";
import type { Startup, Investidor } from "@/lib/supabase/types";

const statusTone: Record<string, "neutral" | "green" | "gold" | "red"> = {
  inscrita: "neutral",
  em_analise: "gold",
  aprovada: "green",
  confirmada: "green",
  recusada: "red",
};

export function InscricoesTable({
  startups,
  investidores,
}: {
  startups: Startup[];
  investidores: Investidor[];
}) {
  const [tab, setTab] = useState<"startups" | "investidores">("startups");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [rows, setRows] = useState(startups);
  const [pending, start] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return tab === "startups"
      ? rows.filter((s) => s.nome.toLowerCase().includes(term))
      : investidores.filter((i) => i.nome.toLowerCase().includes(term));
  }, [tab, q, rows, investidores]);

  const mudar = (id: string, status: string) => {
    setBusyId(id);
    start(async () => {
      const r = await setStartupStatus(id, status);
      if (r.ok) {
        setRows((cur) =>
          cur.map((s) => (s.id === id ? { ...s, status: status as Startup["status"] } : s))
        );
      }
      setBusyId(null);
    });
  };

  return (
    <div className="surface overflow-hidden rounded-2xl">
      {/* toolbar */}
      <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">
          {(["startups", "investidores"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold capitalize transition-colors",
                tab === t ? "neon-green" : "text-cream/70 hover:text-cream"
              )}
            >
              {t === "startups" ? <Rocket className="h-4 w-4" /> : <Landmark className="h-4 w-4" />}
              {t}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome"
            className="w-full rounded-lg border border-white/10 bg-forest-950/60 py-2.5 pl-9 pr-3 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-green-400/60"
          />
        </label>
      </div>

      <ul className="divide-y divide-white/8">
        {filtered.length === 0 && (
          <li className="px-5 py-10 text-center text-sm text-cream/50">Nada encontrado.</li>
        )}

        {tab === "startups"
          ? (filtered as Startup[]).map((s) => (
              <li key={s.id}>
                <div className="flex items-center gap-4 px-5 py-3.5">
                  <button
                    onClick={() => setOpen(open === s.id ? null : s.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-cream/40 transition-transform",
                        open === s.id && "rotate-180"
                      )}
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-cream">{s.nome}</p>
                      <p className="truncate text-xs text-cream/50">
                        {[s.setor, s.estagio, s.regiao].filter(Boolean).join(" · ") || "Perfil incompleto"}
                      </p>
                    </div>
                  </button>
                  <Badge tone={statusTone[s.status] ?? "neutral"}>{s.status}</Badge>
                  <div className="flex gap-1.5">
                    <button
                      title="Aprovar"
                      disabled={pending && busyId === s.id}
                      onClick={() => mudar(s.id, "aprovada")}
                      className="rounded-md border border-green-500/30 p-2 text-green-300 hover:bg-green-500/10 disabled:opacity-40"
                    >
                      {busyId === s.id && pending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      title="Recusar"
                      disabled={pending && busyId === s.id}
                      onClick={() => mudar(s.id, "recusada")}
                      className="rounded-md border border-red-500/30 p-2 text-red-300 hover:bg-red-500/10 disabled:opacity-40"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {open === s.id && (
                  <div className="grid gap-4 border-t border-white/8 bg-forest-950/40 px-12 py-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    <Field k="Descrição" v={s.descricao} wide />
                    <Field k="Tecnologias" v={s.tecnologia?.join(", ")} />
                    <Field k="ODS" v={s.ods?.join(", ")} />
                    <Field
                      k="Ticket"
                      v={
                        s.ticket_min || s.ticket_max
                          ? `R$ ${fmt(s.ticket_min)} a R$ ${fmt(s.ticket_max)}`
                          : null
                      }
                    />
                    <Field k="Site" v={s.website} />
                    <Field k="Inscrita em" v={new Date(s.created_at).toLocaleDateString("pt-BR")} />
                  </div>
                )}
              </li>
            ))
          : (filtered as Investidor[]).map((i) => (
              <li key={i.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-cream">{i.nome}</p>
                  <p className="truncate text-xs text-cream/50">
                    {[i.tipo, i.representante].filter(Boolean).join(" · ") || "Perfil incompleto"}
                  </p>
                </div>
                <span className="hidden max-w-56 truncate text-xs text-cream/50 md:block">
                  {i.setores_interesse?.slice(0, 3).join(", ")}
                </span>
                <Badge tone={i.mesa_numero ? "green" : "neutral"}>
                  {i.mesa_numero ? `Mesa ${i.mesa_numero}` : "Sem mesa"}
                </Badge>
              </li>
            ))}
      </ul>
    </div>
  );
}

function Field({ k, v, wide = false }: { k: string; v?: string | null; wide?: boolean }) {
  if (!v) return null;
  return (
    <div className={wide ? "sm:col-span-2 lg:col-span-3" : undefined}>
      <p className="text-xs mono uppercase tracking-wide text-cream/40">{k}</p>
      <p className="mt-0.5 text-cream/80">{v}</p>
    </div>
  );
}

function fmt(n: number | null) {
  return n == null ? "?" : n.toLocaleString("pt-BR");
}
