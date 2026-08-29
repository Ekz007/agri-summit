import {
  Handshake,
  CalendarRange,
  FileBarChart,
  Megaphone,
  Ticket,
  Users,
  Presentation,
  Radar,
  LineChart,
  Coffee,
  Radio,
  Award,
} from "lucide-react";
import { getSessionProfile } from "@/lib/auth";
import { PageHeader, Card, Badge } from "@/components/portal/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Benefícios · Agri Summit Brazil 2027" };

const startupBeneficios = [
  {
    icon: Handshake,
    t: "Rodadas com investidores",
    d: "Até 16 encontros de 15 minutos com fundos e investidores selecionados por algoritmo a partir do seu perfil.",
    destaque: true,
  },
  {
    icon: FileBarChart,
    t: "Relatório de conexões",
    d: "Ao final do evento, um relatório com as avaliações, interesses e próximos passos de cada conversa.",
    destaque: true,
  },
  {
    icon: Presentation,
    t: "Demo Day",
    d: "Startups destaque apresentam no palco para toda a plenária no segundo dia.",
  },
  {
    icon: Megaphone,
    t: "Visibilidade na plataforma",
    d: "Perfil da startup exposto para investidores, indústria e imprensa durante e depois do evento.",
  },
  {
    icon: Ticket,
    t: "Credenciamento completo",
    d: "Acesso aos três dias: plenária 360°, palcos temáticos, arenas de conteúdo e expo.",
  },
  {
    icon: Users,
    t: "Comunidade contínua",
    d: "A conexão não termina no evento: a plataforma segue ativa com a agenda do pós-evento.",
  },
];

const investidorBeneficios = [
  {
    icon: Radar,
    t: "Dealflow qualificado",
    d: "100 startups selecionadas e cruzadas com a sua tese antes do evento. Você só conversa com quem faz sentido.",
    destaque: true,
  },
  {
    icon: CalendarRange,
    t: "Agenda milimétrica",
    d: "Mesa fixa e agenda gerada por dados: 15 minutos por pitch, sem tempo perdido.",
    destaque: true,
  },
  {
    icon: LineChart,
    t: "Avaliação estruturada",
    d: "Formulário de interesse e fit a cada rodada. Seu funil de análise sai pronto do evento.",
  },
  {
    icon: Coffee,
    t: "VIP Lounge & hospitality",
    d: "Espaços reservados para networking de alto nível com lideranças do agro e do capital.",
  },
  {
    icon: Radio,
    t: "Conteúdo e palcos",
    d: "Acesso às keynotes, painéis e cabine de podcast com os principais nomes do setor.",
  },
  {
    icon: Award,
    t: "Posicionamento de marca",
    d: "Presença institucional diante de 8.000+ participantes do ecossistema agro.",
  },
];

export default async function BeneficiosPage() {
  const session = await getSessionProfile();
  const role = session?.profile?.role ?? "startup";
  const isInvestidor = role === "investidor";

  // participante vê o próprio bloco primeiro
  const blocos = isInvestidor
    ? [
        { titulo: "Para investidores", lista: investidorBeneficios, meu: true },
        { titulo: "Para startups", lista: startupBeneficios, meu: false },
      ]
    : [
        { titulo: "Para startups", lista: startupBeneficios, meu: true },
        { titulo: "Para investidores", lista: investidorBeneficios, meu: false },
      ];

  return (
    <div>
      <PageHeader
        title="Benefícios"
        subtitle="O que você leva do Agri Summit Brazil 2027, antes, durante e depois dos três dias."
      />

      <div className="space-y-12">
        {blocos.map((b) => (
          <section key={b.titulo}>
            <div className="mb-5 flex items-center gap-3">
              <h2 className="font-display font-800 text-xl text-cream">{b.titulo}</h2>
              {b.meu && role !== "admin" && role !== "staff" && (
                <Badge tone="gold">Seu perfil</Badge>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {b.lista.map((item) => (
                <Card
                  key={item.t}
                  className={cn(
                    "flex h-full flex-col",
                    item.destaque && "border border-gold-400/30 bg-gold-500/[0.05]"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      item.destaque ? "bg-gold-500/15" : "bg-ocean-600/25"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        item.destaque ? "text-gold-400" : "text-sky-400"
                      )}
                    />
                  </div>
                  <h3 className="mt-4 font-display font-700 text-lg text-cream">{item.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/75">{item.d}</p>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
