import { getSessionProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/portal/ui";
import { AgendaView, type ItemVM, type PalestranteVM } from "@/components/portal/AgendaView";

export const metadata = { title: "Agenda · Agri Summit Brazil 2027" };

export default async function AgendaPage() {
  const session = await getSessionProfile();
  const isAdmin = ["admin", "staff"].includes(session?.profile?.role ?? "");
  const supabase = await createClient();

  const [{ data: itens }, { data: palestrantes }] = await Promise.all([
    supabase
      .from("programacao")
      .select("*, palestrantes(id,nome,cargo,empresa,bio,destaque)")
      .order("dia")
      .order("inicio"),
    supabase.from("palestrantes").select("*").order("ordem").order("nome"),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: ItemVM[] = (itens ?? []).map((i: any) => ({
    id: i.id,
    dia: i.dia,
    inicio: (i.inicio ?? "").slice(0, 5),
    fim: i.fim ? i.fim.slice(0, 5) : null,
    titulo: i.titulo,
    local: i.local,
    trilha: i.trilha,
    destaque: i.destaque,
    palestrante: i.palestrantes
      ? {
          id: i.palestrantes.id,
          nome: i.palestrantes.nome,
          cargo: i.palestrantes.cargo,
          empresa: i.palestrantes.empresa,
          bio: i.palestrantes.bio,
          destaque: i.palestrantes.destaque,
        }
      : null,
  }));

  const pal: PalestranteVM[] = (palestrantes ?? []).map((p) => ({
    id: p.id,
    nome: p.nome,
    cargo: p.cargo,
    empresa: p.empresa,
    bio: p.bio,
    destaque: p.destaque,
  }));

  return (
    <div>
      <PageHeader
        title="Agenda"
        subtitle="Cronograma dos três dias e palestrantes confirmados do Agri Summit Brazil 2027."
      />
      <AgendaView items={items} palestrantes={pal} isAdmin={isAdmin} />
    </div>
  );
}
