import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageHeader, StatTile, Card, Badge } from "@/components/portal/ui";
import { AdminPanel } from "@/components/portal/AdminPanel";
import {
  Rocket,
  Landmark,
  CalendarRange,
  Table2,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Administração · Agri Summit Brazil 2027" };

export default async function AdminPage() {
  await requireAdmin();
  const db = createAdminClient();

  const [
    { data: startups },
    { count: investidores },
    { data: agenda },
    { count: rodadas },
    { data: config },
    { count: avaliacoes },
  ] = await Promise.all([
    db.from("startups").select("status"),
    db.from("investidores").select("*", { count: "exact", head: true }),
    db.from("agenda").select("dia,status"),
    db.from("rodadas").select("*", { count: "exact", head: true }),
    db.from("evento_config").select("*").eq("id", 1).maybeSingle(),
    db.from("avaliacoes").select("*", { count: "exact", head: true }),
  ]);

  const sList = startups ?? [];
  const funil = [
    { label: "Inscritas", n: sList.filter((s) => s.status === "inscrita").length, cls: "bg-sky-400" },
    { label: "Em análise", n: sList.filter((s) => s.status === "em_analise").length, cls: "bg-gold-400" },
    { label: "Aprovadas", n: sList.filter((s) => s.status === "aprovada").length, cls: "bg-green-400" },
    { label: "Confirmadas", n: sList.filter((s) => s.status === "confirmada").length, cls: "bg-green-500" },
    { label: "Recusadas", n: sList.filter((s) => s.status === "recusada").length, cls: "bg-red-400" },
  ];
  const totalS = sList.length || 1;

  const ag = agenda ?? [];
  const dia1 = ag.filter((a) => a.dia === 1).length;
  const dia2 = ag.filter((a) => a.dia === 2).length;
  const realizados = ag.filter((a) => a.status === "realizado").length;

  return (
    <div>
      <PageHeader
        title="Administração"
        subtitle="Visão geral do evento, funil de inscrições e motor de rodadas."
        action={
          <Link
            href="/portal/admin/inscricoes"
            className="inline-flex items-center gap-2 rounded-full border border-ocean-500/40 bg-ocean-600/15 px-5 py-2.5 text-sm font-semibold text-sky-400 transition-colors hover:bg-ocean-600/25"
          >
            Abrir triagem <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Startups" value={sList.length} icon={Rocket} tone="ocean" />
        <StatTile label="Investidores" value={investidores ?? 0} icon={Landmark} tone="gold" />
        <StatTile
          label="Encontros gerados"
          value={ag.length}
          hint={`${realizados} realizados`}
          icon={CalendarRange}
        />
        <StatTile
          label="Avaliações registradas"
          value={avaliacoes ?? 0}
          icon={ClipboardCheck}
          tone="petrol"
        />
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {/* Funil de inscrições */}
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display font-700 text-lg">Funil de inscrições</h2>
            <Badge tone="ocean">{sList.length} startups</Badge>
          </div>
          <div className="space-y-4">
            {funil.map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-cream/70">{f.label}</span>
                  <span className="font-display font-700 tabular-nums text-cream">{f.n}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className={`h-full rounded-full ${f.cls}`}
                    style={{ width: `${Math.max(2, (f.n / totalS) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Rodadas overview */}
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display font-700 text-lg">Rodadas de negócio</h2>
            <Badge tone={config?.agenda_publicada ? "green" : "gold"}>
              {config?.agenda_publicada ? "Agenda publicada" : "Rascunho"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-ocean-500/25 bg-ocean-600/10 p-4">
              <p className="text-xs uppercase tracking-wider text-cream/50">Dia 1 · 15 jun</p>
              <p className="mt-1 font-display font-800 text-3xl text-sky-400">{dia1}</p>
              <p className="text-xs text-cream/55">encontros agendados</p>
            </div>
            <div className="rounded-xl border border-ocean-500/25 bg-ocean-600/10 p-4">
              <p className="text-xs uppercase tracking-wider text-cream/50">Dia 2 · 16 jun</p>
              <p className="mt-1 font-display font-800 text-3xl text-sky-400">{dia2}</p>
              <p className="text-xs text-cream/55">encontros agendados</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-sm">
            <span className="flex items-center gap-2 text-cream/70">
              <Table2 className="h-4 w-4 text-sky-400" /> {rodadas ?? 0} slots de rodada · 15 + 5 min
            </span>
            <Link href="/portal/rodadas" className="font-medium text-sky-400 hover:text-sky-400/80">
              Ver mapa
            </Link>
          </div>
          <p className="mt-3 text-xs text-cream/45">
            {config?.matching_gerado_em
              ? `Último matching: ${new Date(config.matching_gerado_em).toLocaleString("pt-BR")}`
              : "Matching ainda não gerado."}
          </p>
        </Card>
      </div>

      <AdminPanel
        startups={sList.length}
        investidores={investidores ?? 0}
        encontros={ag.length}
        avaliacoes={avaliacoes ?? 0}
        matchingGeradoEm={config?.matching_gerado_em ?? null}
        agendaPublicada={config?.agenda_publicada ?? false}
      />
    </div>
  );
}
