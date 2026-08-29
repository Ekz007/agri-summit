import Link from "next/link";
import {
  CalendarRange,
  Users,
  Table2,
  Rocket,
  Landmark,
  FolderOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/auth";
import { PageHeader, StatTile, Card, Badge } from "@/components/portal/ui";
import { ButtonLink } from "@/components/ui/Button";

export default async function PortalHome() {
  const session = await getSessionProfile();
  const supabase = await createClient();
  const role = session?.profile?.role ?? "startup";
  const name = session?.profile?.full_name || session?.email?.split("@")[0] || "";

  if (role === "admin" || role === "staff") {
    return <AdminHome supabase={supabase} name={name} />;
  }

  // ---- participant (startup / investidor) ----
  const entityTable = role === "investidor" ? "investidores" : "startups";
  const { data: entity } = await supabase
    .from(entityTable)
    .select("*")
    .eq("owner_id", session!.userId)
    .maybeSingle();

  const { data: agenda } = await supabase
    .from("agenda")
    .select("*")
    .eq(role === "investidor" ? "investidor_id" : "startup_id", entity?.id ?? "00000000-0000-0000-0000-000000000000")
    .order("dia")
    .order("mesa_numero");

  const { count: agendaCount } = { count: agenda?.length ?? 0 };
  const profileDone = !!entity?.nome;

  return (
    <div>
      <PageHeader
        title={`Olá, ${name} 👋`}
        subtitle="Este é o seu painel do Agri Summit Brazil 2027. Acompanhe sua agenda de rodadas e materiais aqui."
      />

      {!profileDone && (
        <Card className="mb-6 border-gold-500/30 bg-gold-500/[0.06]">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              <div>
                <p className="font-semibold text-cream">Complete seu perfil</p>
                <p className="text-sm text-cream/65">
                  O algoritmo de matching usa seus dados para montar sua agenda. Quanto mais
                  completo, melhores as conexões.
                </p>
              </div>
            </div>
            <ButtonLink href="/portal/perfil" variant="gold" size="sm">
              Completar agora <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatTile
          label="Encontros agendados"
          value={agendaCount}
          hint={agendaCount ? "veja sua agenda completa" : "aguardando matching"}
          icon={CalendarRange}
        />
        {role === "investidor" ? (
          <StatTile
            label="Sua mesa"
            value={entity?.mesa_numero ? `Mesa ${entity.mesa_numero}` : "—"}
            hint="ponto fixo durante as rodadas"
            icon={Table2}
            tone="gold"
          />
        ) : (
          <StatTile
            label="Perfil"
            value={profileDone ? "Completo" : "Pendente"}
            hint={entity?.setor || "defina seu setor"}
            icon={Rocket}
            tone="gold"
          />
        )}
        <StatTile
          label="Papel no evento"
          value={role === "investidor" ? "Investidor" : "Startup"}
          hint={role === "investidor" ? "você fica na mesa" : "você gira entre as mesas"}
          icon={role === "investidor" ? Landmark : Rocket}
          tone="petrol"
        />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-700 text-lg">Próximos encontros</h2>
            <Link href="/portal/rodadas" className="text-sm text-green-300 hover:text-green-200">
              Ver agenda
            </Link>
          </div>
          {agenda && agenda.length > 0 ? (
            <ul className="space-y-2.5">
              {agenda.slice(0, 4).map((a) => (
                <li
                  key={a.id}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
                >
                  <div className="text-center">
                    <div className="text-[0.65rem] uppercase text-cream/45">Dia {a.dia}</div>
                    <div className="font-display font-700 text-cream">R{a.mesa_numero}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-cream">
                      Mesa {a.mesa_numero}
                    </p>
                    <p className="text-xs text-cream/50">Match {a.score}%</p>
                  </div>
                  <Badge tone="green">{a.status}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-white/12 px-4 py-8 text-center text-sm text-cream/55">
              <Sparkles className="mx-auto mb-2 h-6 w-6 text-green-400/70" />
              Sua agenda aparece aqui assim que o matching for publicado.
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-700 text-lg">Como funcionam as rodadas</h2>
            <FolderOpen className="h-5 w-5 text-cream/40" />
          </div>
          <ol className="space-y-3 text-sm text-cream/70">
            {[
              "O algoritmo cruza seu perfil com o dos investidores e monta a agenda.",
              role === "investidor"
                ? "Você fica na sua mesa fixa; as startups giram até você."
                : "Você recebe horários e mesas; gire entre os investidores.",
              "Cada conversa dura 15 minutos.",
              "Nos 5 minutos de intervalo, registre a avaliação daquela conversa.",
            ].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-xs font-display font-700 text-green-300">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}

async function AdminHome({
  supabase,
  name,
}: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  name: string;
}) {
  const [{ count: startups }, { count: investidores }, { count: encontros }, { data: config }] =
    await Promise.all([
      supabase.from("startups").select("*", { count: "exact", head: true }),
      supabase.from("investidores").select("*", { count: "exact", head: true }),
      supabase.from("agenda").select("*", { count: "exact", head: true }),
      supabase.from("evento_config").select("*").eq("id", 1).maybeSingle(),
    ]);

  return (
    <div>
      <PageHeader
        title={`Administração`}
        subtitle={`Olá, ${name}. Visão geral do evento e do motor de matching.`}
        action={
          <ButtonLink href="/portal/admin" variant="primary" size="md">
            Abrir painel <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Startups" value={startups ?? 0} icon={Rocket} />
        <StatTile label="Investidores" value={investidores ?? 0} icon={Landmark} tone="gold" />
        <StatTile label="Encontros agendados" value={encontros ?? 0} icon={CalendarRange} tone="petrol" />
        <StatTile
          label="Matching"
          value={config?.matching_gerado_em ? "Gerado" : "Pendente"}
          hint={config?.agenda_publicada ? "agenda publicada" : "não publicada"}
          icon={config?.agenda_publicada ? CheckCircle2 : Users}
        />
      </div>
    </div>
  );
}
