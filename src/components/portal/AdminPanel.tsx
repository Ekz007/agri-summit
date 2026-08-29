"use client";

import { useState, useTransition } from "react";
import {
  Cpu,
  Rocket,
  Eye,
  EyeOff,
  Loader2,
  Database,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Card, Badge } from "@/components/portal/ui";
import {
  gerarMatching,
  publicarAgenda,
  seedDemo,
  limparDemo,
} from "@/app/portal/admin/actions";

type Stats = {
  startups: number;
  investidores: number;
  investidoresComMesa: number;
  rodadas: number;
  encontros: number;
  startupsSemAgenda: number;
  mediaEncontrosPorStartup: number;
};

export function AdminPanel({
  startups,
  investidores,
  encontros,
  avaliacoes,
  matchingGeradoEm,
  agendaPublicada,
}: {
  startups: number;
  investidores: number;
  encontros: number;
  avaliacoes: number;
  matchingGeradoEm: string | null;
  agendaPublicada: boolean;
}) {
  const [pending, start] = useTransition();
  const [action, setAction] = useState<string | null>(null);
  const [result, setResult] = useState<Stats | null>(null);
  const [msg, setMsg] = useState<{ t: "ok" | "err"; text: string } | null>(null);
  const [published, setPublished] = useState(agendaPublicada);

  const run = (name: string, fn: () => Promise<unknown>) => {
    setAction(name);
    setMsg(null);
    start(async () => {
      try {
        const r = (await fn()) as { ok: boolean; error?: string; stats?: Stats };
        if (r?.ok === false) {
          setMsg({ t: "err", text: r.error || "Falha na operação." });
        } else if (r?.stats) {
          setResult(r.stats);
          setMsg({ t: "ok", text: "Matching gerado com sucesso." });
        } else {
          setMsg({ t: "ok", text: "Operação concluída." });
        }
      } catch (e) {
        setMsg({ t: "err", text: e instanceof Error ? e.message : "Erro inesperado." });
      } finally {
        setAction(null);
      }
    });
  };

  const busy = (name: string) => pending && action === name;

  return (
    <div className="space-y-6">
      {msg && (
        <div
          className={
            "rounded-xl border px-4 py-3 text-sm " +
            (msg.t === "ok"
              ? "border-green-500/25 bg-green-500/10 text-green-300"
              : "border-red-500/25 bg-red-500/10 text-red-300")
          }
        >
          {msg.text}
        </div>
      )}

      {/* Matching engine */}
      <Card>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-green-400" />
              <h2 className="font-display font-700 text-lg">Motor de matching</h2>
            </div>
            <p className="mt-2 text-sm text-cream/65">
              Atribui uma mesa fixa a cada investidor, cruza o perfil de cada startup com a tese de
              cada investidor e distribui os encontros ao longo das rodadas (15 + 5 min). Rodar de
              novo regenera toda a agenda.
            </p>
            <p className="mt-2 text-xs text-cream/45">
              {matchingGeradoEm
                ? `Último matching: ${new Date(matchingGeradoEm).toLocaleString("pt-BR")}`
                : "Matching ainda não foi gerado."}
            </p>
          </div>
          <button
            onClick={() => run("match", gerarMatching)}
            disabled={pending}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full neon-gold px-6 py-3 text-sm font-semibold disabled:opacity-50"
          >
            {busy("match") ? <Loader2 className="h-4 w-4 animate-spin" /> : <Cpu className="h-4 w-4" />}
            Gerar matching & agenda
          </button>
        </div>

        {result && (
          <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-forest-950/40 p-4 sm:grid-cols-3 lg:grid-cols-6">
            <Metric label="Startups" value={result.startups} />
            <Metric label="Investidores" value={result.investidores} />
            <Metric label="Mesas" value={result.investidoresComMesa} />
            <Metric label="Encontros" value={result.encontros} />
            <Metric label="Média/startup" value={result.mediaEncontrosPorStartup} />
            <Metric label="Sem agenda" value={result.startupsSemAgenda} />
          </div>
        )}
      </Card>

      {/* Publish */}
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-700 text-lg">Publicação da agenda</h2>
              {published ? <Badge tone="green">Publicada</Badge> : <Badge tone="gold">Rascunho</Badge>}
            </div>
            <p className="mt-1 text-sm text-cream/65">
              Quando publicada, startups e investidores passam a ver seus horários e mesas.
            </p>
          </div>
          <button
            onClick={() =>
              run("publish", async () => {
                const r = await publicarAgenda(!published);
                setPublished(!published);
                return r;
              })
            }
            disabled={pending || encontros === 0}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5 disabled:opacity-50"
          >
            {busy("publish") ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : published ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {published ? "Despublicar" : "Publicar agenda"}
          </button>
        </div>
      </Card>

      {/* Demo tools */}
      <Card className="border-white/8">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-gold-400" />
          <h2 className="font-display font-700 text-lg">Dados de demonstração</h2>
        </div>
        <p className="mt-2 text-sm text-cream/65">
          Popular o banco com startups e investidores fictícios para testar o motor de rodadas.
          Não afeta contas reais (registros sem dono).
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => run("seed", () => seedDemo(40, 10))}
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-gold-500/90 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-400 disabled:opacity-50"
          >
            {busy("seed") ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
            Popular 40 startups + 10 investidores
          </button>
          <button
            onClick={() => run("clear", limparDemo)}
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-5 py-2.5 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
          >
            {busy("clear") ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Limpar dados de demo
          </button>
        </div>
        <div className="mt-4 flex items-start gap-2 text-xs text-cream/45">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Registros: {startups} startups · {investidores} investidores · {avaliacoes} avaliações.
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="font-display font-800 text-2xl text-cream">{value}</div>
      <div className="text-xs text-cream/50">{label}</div>
    </div>
  );
}
