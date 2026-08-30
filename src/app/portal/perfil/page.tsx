import { getSessionProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/portal/ui";
import { StartupForm } from "@/components/portal/StartupForm";
import { InvestidorForm } from "@/components/portal/InvestidorForm";
import { PessoaisForm } from "@/components/portal/PessoaisForm";
import type { Startup, Investidor } from "@/lib/supabase/types";

export const metadata = { title: "Meu perfil · Agri Summit Brazil 2027" };

export default async function PerfilPage() {
  const session = await getSessionProfile();
  const supabase = await createClient();
  const role = session?.profile?.role ?? "startup";

  if (role === "admin" || role === "staff") {
    return (
      <div className="max-w-3xl">
        <PageHeader title="Meu perfil" subtitle="Sua conta e dados pessoais." />
        <PessoaisForm profile={session!.profile!} email={session!.email} />
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
      <div className="mb-6">
        <PessoaisForm profile={session!.profile!} email={session!.email} />
      </div>
      {isInvestidor ? (
        <InvestidorForm investidor={entity as Investidor | null} />
      ) : (
        <StartupForm startup={entity as Startup | null} />
      )}
    </div>
  );
}
