import { CalendarRange, Table2, Info, MapPin, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/auth";
import { PageHeader, EmptyState, Card, Badge } from "@/components/portal/ui";
import { MeetingCard, type MeetingVM } from "@/components/portal/MeetingCard";

export const metadata = { title: "Rodadas · Agri Summit Brazil 2027" };

export default async function RodadasPage() {
  const session = await getSessionProfile();
  const supabase = await createClient();
  const role = session?.profile?.role ?? "startup";

  if (role === "admin" || role === "staff") {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const { AdminRodadasMap } = await import("@/components/portal/AdminRodadasMap");
    const db = createAdminClient();
    const { data: rows } = await db
      .from("agenda")
      .select("id,dia,mesa_numero,score,status,rodadas(ordem,inicio),investidores(nome),startups(nome)")
      .order("dia");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped = (rows ?? []).map((r: any) => ({
      id: r.id,
      dia: r.dia,
      ordem: r.rodadas?.ordem ?? 0,
      inicio: r.rodadas?.inicio ?? "",
      mesa: r.mesa_numero,
      investidor: r.investidores?.nome ?? "?",
      startup: r.startups?.nome ?? "?",
      score: r.score,
      status: r.status,
    }));

    return (
      <div>
        <PageHeader
          title="Rodadas de Negócio"
          subtitle="Mapa completo da organização: mesas, encontros e status por rodada."
        />
        <AdminRodadasMap rows={mapped} />
      </div>
    );
  }

  const isInvestidor = role === "investidor";
  const entityTable = isInvestidor ? "investidores" : "startups";
  const { data: entity } = await supabase
    .from(entityTable)
    .select("*")
    .eq("owner_id", session!.userId)
    .maybeSingle();

  const { data: config } = await supabase
    .from("evento_config")
    .select("agenda_publicada")
    .eq("id", 1)
    .maybeSingle();

  const idCol = isInvestidor ? "investidor_id" : "startup_id";
  const { data: rows } = entity
    ? await supabase
        .from("agenda")
        .select(
          "*, rodadas(dia,ordem,inicio,fim,duracao_conversa,intervalo), startups(nome,setor,logo_url,website), investidores(nome,tipo,representante,logo_url)"
        )
        .eq(idCol, entity.id)
    : { data: [] };

  // my existing evaluations
  const agendaIds = (rows ?? []).map((r) => r.id);
  const { data: minhasAval } = agendaIds.length
    ? await supabase
        .from("avaliacoes")
        .select("agenda_id")
        .eq("autor_id", session!.userId)
        .in("agenda_id", agendaIds)
    : { data: [] };
  const avaliados = new Set((minhasAval ?? []).map((a) => a.agenda_id));

  const meetings: MeetingVM[] = (rows ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((r: any) => {
      const rodada = r.rodadas;
      const counterpart = isInvestidor ? r.startups : r.investidores;
      return {
        id: r.id,
        dia: r.dia,
        ordem: rodada?.ordem ?? 0,
        inicio: rodada?.inicio ?? "",
        fim: rodada?.fim ?? "",
        intervalo: rodada?.intervalo ?? 5,
        mesa_numero: r.mesa_numero,
        score: r.score,
        status: r.status,
        counterpartName: counterpart?.nome ?? "A definir",
        counterpartMeta: isInvestidor
          ? counterpart?.setor ?? "Startup"
          : counterpart?.tipo ?? "Investidor",
        avaliado: avaliados.has(r.id),
      };
    })
    .sort((a, b) => (a.dia === b.dia ? a.ordem - b.ordem : a.dia - b.dia));

  const dias = Array.from(new Set(meetings.map((m) => m.dia))).sort();

  return (
    <div>
      <PageHeader
        title="Rodadas de Negócio"
        subtitle={
          isInvestidor
            ? "Sua mesa é fixa, as startups giram até você. Registre a avaliação de cada conversa no intervalo."
            : "Você gira entre as mesas. Confira horários e mesas e avalie cada conversa no intervalo."
        }
      />

      {/* orientation strip */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <InfoTile
          icon={isInvestidor ? Table2 : MapPin}
          title={isInvestidor ? `Mesa ${entity?.mesa_numero ?? "a definir"}` : "Você em rotação"}
          body={isInvestidor ? "seu ponto fixo nas rodadas" : "siga a mesa de cada horário"}
        />
        <InfoTile icon={Clock} title="15 + 5 min" body="conversa + intervalo de troca" />
        <InfoTile
          icon={CalendarRange}
          title={`${meetings.length} encontros`}
          body={dias.length ? `distribuídos em ${dias.length} dia(s)` : "aguardando publicação"}
        />
      </div>

      {!entity ? (
        <EmptyState
          icon={Info}
          title="Complete seu perfil primeiro"
          body="Precisamos dos seus dados para incluir você no matching e montar sua agenda de rodadas."
          action={
            <a
              href="/portal/perfil"
              className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-green-400"
            >
              Completar perfil
            </a>
          }
        />
      ) : meetings.length === 0 ? (
        <EmptyState
          icon={CalendarRange}
          title={config?.agenda_publicada ? "Nenhum encontro para você ainda" : "Agenda ainda não publicada"}
          body={
            config?.agenda_publicada
              ? "Não encontramos encontros compatíveis nesta edição. Fale com a organização."
              : "O algoritmo de matching ainda vai rodar. Assim que a agenda for publicada, seus horários e mesas aparecem aqui."
          }
        />
      ) : (
        <div className="space-y-10">
          {dias.map((dia) => (
            <section key={dia}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="font-display font-800 text-xl text-cream">Dia {dia}</h2>
                <Badge tone="green">
                  {meetings.filter((m) => m.dia === dia).length} encontros
                </Badge>
                <span className="text-sm text-cream/45">
                  {dia === 1 ? "15 de junho" : "16 de junho"} · 2027
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {meetings
                  .filter((m) => m.dia === dia)
                  .map((m) => (
                    <MeetingCard key={m.id} meeting={m} viewerRole={role} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoTile({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="surface flex items-center gap-3 rounded-2xl p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15">
        <Icon className="h-5 w-5 text-green-400" />
      </span>
      <div>
        <div className="font-display font-700 text-cream">{title}</div>
        <div className="text-xs text-cream/55">{body}</div>
      </div>
    </div>
  );
}
