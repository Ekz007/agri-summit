import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageHeader, StatTile } from "@/components/portal/ui";
import { AdminPanel } from "@/components/portal/AdminPanel";
import { Rocket, Landmark, CalendarRange, Table2 } from "lucide-react";

export const metadata = { title: "Administração · Agri Summit Brazil 2027" };

export default async function AdminPage() {
  await requireAdmin();
  const db = createAdminClient();

  const [
    { count: startups },
    { count: investidores },
    { count: encontros },
    { count: rodadas },
    { data: config },
    { count: avaliacoes },
  ] = await Promise.all([
    db.from("startups").select("*", { count: "exact", head: true }),
    db.from("investidores").select("*", { count: "exact", head: true }),
    db.from("agenda").select("*", { count: "exact", head: true }),
    db.from("rodadas").select("*", { count: "exact", head: true }),
    db.from("evento_config").select("*").eq("id", 1).maybeSingle(),
    db.from("avaliacoes").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <PageHeader
        title="Administração"
        subtitle="Motor de matching, agenda de rodadas e status do evento."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Startups" value={startups ?? 0} icon={Rocket} />
        <StatTile label="Investidores" value={investidores ?? 0} icon={Landmark} tone="gold" />
        <StatTile label="Rodadas (slots)" value={rodadas ?? 0} icon={Table2} tone="petrol" />
        <StatTile label="Encontros gerados" value={encontros ?? 0} icon={CalendarRange} />
      </div>

      <AdminPanel
        startups={startups ?? 0}
        investidores={investidores ?? 0}
        encontros={encontros ?? 0}
        avaliacoes={avaliacoes ?? 0}
        matchingGeradoEm={config?.matching_gerado_em ?? null}
        agendaPublicada={config?.agenda_publicada ?? false}
      />
    </div>
  );
}
