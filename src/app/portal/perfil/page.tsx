import { getSessionProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/portal/ui";
import { StartupForm } from "@/components/portal/StartupForm";
import { InvestidorForm } from "@/components/portal/InvestidorForm";
import type { Startup, Investidor } from "@/lib/supabase/types";

export const metadata = { title: "Meu perfil · Agri Summit Brazil 2027" };

export default async function PerfilPage() {
  const session = await getSessionProfile();
  const supabase = await createClient();
  const role = session?.profile?.role ?? "startup";

  if (role === "admin" || role === "staff") {
    return (
      <div>
        <PageHeader title="Meu perfil" subtitle="Conta administrativa." />
        <Card>
          <p className="text-cream/70">
            Você está logado como <strong>{session?.profile?.role}</strong> ({session?.email}).
            Perfis de startup e investidor são preenchidos pelos participantes.
          </p>
        </Card>
      </div>
    );
  }

  const isInvestidor = role === "investidor";
  const table = isInvestidor ? "investidores" : "startups";
  const { data: entity } = await supabase
    .from(table)
    .select("*")
    .eq("owner_id", session!.userId)
    .maybeSingle();

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Meu perfil"
        subtitle={
          isInvestidor
            ? "Sua tese e preferências alimentam o algoritmo que monta as rodadas."
            : "Quanto mais completo o perfil da sua startup, melhores as conexões geradas pelo matching."
        }
      />
      {isInvestidor ? (
        <InvestidorForm investidor={entity as Investidor | null} />
      ) : (
        <StartupForm startup={entity as Startup | null} />
      )}
    </div>
  );
}
