import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageHeader, StatTile } from "@/components/portal/ui";
import { InscricoesTable } from "@/components/portal/InscricoesTable";
import { Rocket, CheckCircle2, Hourglass, XCircle } from "lucide-react";
import type { Startup, Investidor } from "@/lib/supabase/types";

export const metadata = { title: "Inscrições · Agri Summit Brazil 2027" };

export default async function InscricoesPage() {
  await requireAdmin();
  const db = createAdminClient();

  const [{ data: startups }, { data: investidores }] = await Promise.all([
    db.from("startups").select("*").order("created_at", { ascending: false }),
    db.from("investidores").select("*").order("created_at", { ascending: false }),
  ]);

  const list = (startups ?? []) as Startup[];
  const funil = {
    total: list.length,
    aprovadas: list.filter((s) => ["aprovada", "confirmada"].includes(s.status)).length,
    pendentes: list.filter((s) => ["inscrita", "em_analise"].includes(s.status)).length,
    recusadas: list.filter((s) => s.status === "recusada").length,
  };

  return (
    <div>
      <PageHeader
        title="Inscrições"
        subtitle="Triagem das startups e visão dos investidores cadastrados."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Startups inscritas" value={funil.total} icon={Rocket} />
        <StatTile label="Aprovadas" value={funil.aprovadas} icon={CheckCircle2} />
        <StatTile label="Em análise" value={funil.pendentes} icon={Hourglass} tone="gold" />
        <StatTile label="Recusadas" value={funil.recusadas} icon={XCircle} tone="petrol" />
      </div>

      <InscricoesTable
        startups={list}
        investidores={(investidores ?? []) as Investidor[]}
      />
    </div>
  );
}
