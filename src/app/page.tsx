import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  CalendarDays,
  Handshake,
  Cpu,
  Timer,
  Table2,
  ClipboardCheck,
  Repeat,
  Mic2,
  Music4,
  Coffee,
  Radio,
  Gamepad2,
  Megaphone,
  Package,
  MonitorPlay,
} from "lucide-react";
import { SiteNav } from "@/components/landing/SiteNav";
import { OrganicBg } from "@/components/brand/OrganicBg";
import { AuroraBg } from "@/components/brand/AuroraBg";
import { Hills } from "@/components/brand/Hills";
import { Logo } from "@/components/brand/Logo";
import { Realizadores } from "@/components/brand/Realizadores";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-forest-900 text-cream">
      <SiteNav />
      <Hero />
      <ContinuumStrip />
      <Manifesto />
      <Rodadas />
      <Experiencia />
      <Programacao />
      <Palestrantes />
      <Numeros />
      <Patrocinio />
      <PortalCta />
      <Footer />
    </main>
  );
}

function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="kicker text-cream/60">
      <span className="text-gold-400">{n}</span>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="grain relative overflow-hidden vignette min-h-[100svh] flex items-center">
      <AuroraBg />
      <OrganicBg variant="hero" className="opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/50 via-transparent to-forest-900" />

      <div className="relative z-[2] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-32 pb-44 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-40">
        <div>
          <div className="animate-rise inline-flex items-center gap-2 border-l-2 border-gold-400 bg-white/[0.03] px-4 py-2 text-sm tracking-wide text-cream/90">
            O agro que move o futuro
          </div>

          <h1 className="animate-rise mt-6 font-display font-800 leading-[0.9] tracking-tight text-cream text-[clamp(2.6rem,6.5vw,4.8rem)]">
            AGRI SUMMIT
            <br />
            <span className="text-gold-gradient">BRAZIL 2027</span>
          </h1>

          <p className="animate-rise mt-5 max-w-lg text-lg text-cream/80">
            O Brasil no centro da transformação global do agro. A plataforma que conecta{" "}
            <strong className="text-cream">startups, investidores, produtores e indústria</strong>{" "}
            em três dias de negócios, conteúdo e tecnologia.
          </p>

          <div className="animate-rise mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/login?tab=inscricao" variant="gold" size="lg">
              Faça sua inscrição <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/login" variant="outline" size="lg">
              Acessar o portal
            </ButtonLink>
          </div>

          <dl className="animate-rise mt-10 flex flex-wrap gap-x-10 gap-y-4 text-cream/85">
            <div className="flex items-center gap-2.5">
              <CalendarDays className="h-5 w-5 text-sky-400" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/50">Quando</dt>
                <dd className="font-semibold">15 a 17 de junho de 2027</dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-5 w-5 text-sky-400" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/50">Onde</dt>
                <dd className="font-semibold">Royal Palm Hall · Campinas, SP</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="animate-rise relative">
          <div className="pointer-events-none absolute -inset-6 bg-gradient-to-br from-ocean-500/25 via-transparent to-gold-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-ocean-900/50">
            <Image
              src="/brand/hero-people.webp"
              alt="Produtor, cientista e investidor do agronegócio brasileiro · Agri Summit Brazil 2027"
              width={1400}
              height={1408}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-[2] w-full -translate-x-1/2">
        <Realizadores size="sm" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function ContinuumStrip() {
  return (
    <div className="border-y border-white/10 bg-forest-950/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-5 text-center">
        <span className="text-sm text-cream/60">
          Não apenas um evento, uma plataforma contínua de negócios
        </span>
        <div className="flex items-center gap-3">
          {["ANTES", "DURANTE", "DEPOIS"].map((i, idx) => (
            <span key={i} className="flex items-center gap-3">
              <span className="font-display font-700 tracking-[0.2em] text-gold-400 text-sm">{i}</span>
              {idx < 2 && <span className="text-cream/25">·</span>}
            </span>
          ))}
        </div>
        <span className="text-sm text-cream/60">dos 3 dias de evento</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden py-28">
      <OrganicBg variant="soft" className="opacity-50" />
      <div className="relative mx-auto max-w-5xl px-5">
        <Reveal>
          <Kicker n="01">O Manifesto</Kicker>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-display font-800 leading-[0.98] tracking-tight text-[clamp(2rem,5vw,3.6rem)]">
            O futuro do agro não será construído{" "}
            <span className="text-gold-gradient">apenas pela produção.</span>
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 text-lg text-cream/80 md:grid-cols-2">
          <Reveal delay={120}>
            <p>
              O agronegócio brasileiro deixou de ser apenas produção. Hoje ele representa
              inteligência, inovação, tecnologia, bioeconomia, conectividade e transformação
              econômica em escala global.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              O agro moderno é sofisticado demais para caber em feiras convencionais. Ele precisa
              de uma plataforma capaz de conectar ideias a investimentos e tecnologia a
              oportunidades. O <strong className="text-cream">Agri Summit Brazil</strong> nasce
              exatamente nesse território.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Rodadas() {
  const steps = [
    {
      icon: Cpu,
      title: "Matching por algoritmo",
      body: "Antes do evento, cruzamos os dados de cada startup com a tese de cada investidor. O algoritmo gera as agendas e o mapa de mesas. Todo mundo chega sabendo com quem vai conversar.",
    },
    {
      icon: Table2,
      title: "Investidor na mesa, startup em rotação",
      body: "Cada investidor tem uma mesa fixa e conhece sua agenda. As startups giram entre as mesas conforme o horário definido pelo match.",
    },
    {
      icon: Timer,
      title: "15 min de conversa + 5 min de troca",
      body: "Cada rodada tem 15 minutos de pitch. Nos 5 minutos de intervalo as startups trocam de mesa, e o investidor preenche o formulário de avaliação daquela conversa.",
    },
    {
      icon: ClipboardCheck,
      title: "Feedback estruturado",
      body: "Interesse, fit e próximos passos são registrados na hora. Ao final, cada lado sai com um relatório do que aconteceu. O follow-up começa ainda no evento.",
    },
  ];

  return (
    <section id="rodadas" className="grain relative overflow-hidden bg-forest-950 py-28">
      <OrganicBg variant="panel" className="opacity-40" />
      <div className="relative z-[2] mx-auto max-w-7xl px-5">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <Kicker n="02">Conexão com Investidores</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display font-800 leading-[0.98] tracking-tight text-[clamp(2rem,5vw,3.4rem)]">
                Rodadas de <span className="text-gold-gradient">Negócio</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-lg text-lg text-cream/80">
                Na sala Conexão com Investidores, 100 startups encontram 50 investidores em dois
                dias de rodadas com agenda gerada por dados, e uma orquestração milimétrica.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <div className="surface h-full rounded-xl p-5">
                    <s.icon className="h-6 w-6 text-green-400" />
                    <h3 className="mt-3 font-display font-700 text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/brand/exp-investidores.webp"
                  alt="Sala Conexão com Investidores do Agri Summit Brazil"
                  width={1600}
                  height={780}
                  className="h-44 w-full object-cover sm:h-52"
                />
              </div>
              <RoundClockCard />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RoundClockCard() {
  const slots = [
    { h: "14:00", inv: "AgroVentures Capital", mesa: "Mesa 07", live: true },
    { h: "14:20", inv: "Terra Fund", mesa: "Mesa 14" },
    { h: "14:40", inv: "SP Ventures", mesa: "Mesa 21" },
  ];
  return (
    <div className="surface-solid relative overflow-hidden rounded-2xl p-6 shadow-2xl">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cream/50">Sua agenda · Dia 1</p>
          <p className="font-display font-700 text-lg">Verde Bio · Startup</p>
        </div>
        <span className="rounded-md bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">
          Match 92%
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        {slots.map((s) => (
          <div
            key={s.h}
            className={
              "flex items-center gap-3 rounded-lg border px-4 py-3 " +
              (s.live ? "border-green-400/50 bg-green-500/10" : "border-white/10 bg-white/[0.03]")
            }
          >
            <span className="font-display font-700 text-sm tabular-nums text-cream/90">{s.h}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-cream">{s.inv}</p>
              <p className="text-xs text-cream/55">{s.mesa}</p>
            </div>
            {s.live ? (
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
            ) : (
              <Repeat className="h-4 w-4 text-cream/30" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-gold-500/10 px-4 py-3 text-sm">
        <span className="flex items-center gap-2 text-gold-300">
          <Timer className="h-4 w-4" /> Intervalo · troca de mesa
        </span>
        <span className="font-display font-700 tabular-nums text-gold-300">05:00</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* A EXPERIÊNCIA — real renders from the deck                          */
/* ------------------------------------------------------------------ */
function Experiencia() {
  return (
    <section id="experiencia" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <Kicker n="03">A Experiência</Kicker>
        </Reveal>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={60}>
            <h2 className="max-w-xl font-display font-800 leading-tight tracking-tight text-[clamp(2rem,5vw,3.2rem)]">
              Um ecossistema construído para conectar.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-cream/70">
              Plenária imersiva 360°, palcos temáticos, arenas de conteúdo, expo de tecnologia e
              espaços de networking desenhados para gerar negócio.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Figure
              src="/brand/exp-plenaria.webp"
              title="Plenária imersiva 360°"
              sub="Palco central com projeção envolvente para as keynotes"
              tall
            />
          </Reveal>
          <Reveal delay={80} className="md:col-span-5">
            <Figure
              src="/brand/exp-palco.webp"
              title="Palcos temáticos"
              sub="Trilhas simultâneas de conteúdo por vertical"
              tall
            />
          </Reveal>
          <Reveal delay={40} className="md:col-span-4">
            <Figure
              src="/brand/exp-credenciamento.webp"
              title="Credenciamento imersivo"
              sub="Check-in fluido com pulseira ativada"
            />
          </Reveal>
          <Reveal delay={100} className="md:col-span-4">
            <Figure
              src="/brand/exp-portal.webp"
              title="Arenas de conteúdo"
              sub="Growth, tecnologia e bioeconomia"
            />
          </Reveal>
          <Reveal delay={160} className="md:col-span-4">
            <Figure
              src="/brand/exp-bar360.webp"
              title="Bar Agri Summit 360°"
              sub="Ponto de encontro e networking"
            />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Mic2, t: "Mestre de cerimônias" },
            { icon: Music4, t: "Atrações musicais" },
            { icon: Radio, t: "Cabine de podcast" },
            { icon: Coffee, t: "Hospitality & VIP lounge" },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 60}>
              <div className="flex items-center gap-3 border-l-2 border-petrol-500/60 bg-white/[0.03] px-4 py-3.5">
                <x.icon className="h-5 w-5 text-sky-400" />
                <span className="text-sm font-medium text-cream/85">{x.t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Figure({
  src,
  title,
  sub,
  tall = false,
}: {
  src: string;
  title: string;
  sub: string;
  tall?: boolean;
}) {
  return (
    <figure className="group relative h-full overflow-hidden rounded-2xl border border-white/10">
      <Image
        src={src}
        alt={title}
        width={1600}
        height={900}
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
          tall ? "h-72 sm:h-96" : "h-56 sm:h-64"
        }`}
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/95 via-forest-950/60 to-transparent px-5 pb-4 pt-14">
        <p className="font-display font-700 text-cream">{title}</p>
        <p className="text-sm text-cream/65">{sub}</p>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* PROGRAMAÇÃO                                                         */
/* ------------------------------------------------------------------ */
function Programacao() {
  const dias = [
    {
      dia: "Dia 1",
      data: "15 de junho",
      title: "Abertura & Rodadas · Bloco A",
      items: [
        "Credenciamento e boas-vindas",
        "Keynote de abertura na plenária 360°",
        "Rodadas de negócio · 100 startups × 50 investidores",
        "Trilhas de conteúdo nos palcos temáticos",
      ],
    },
    {
      dia: "Dia 2",
      data: "16 de junho",
      title: "Rodadas · Bloco B & Demo Day",
      items: [
        "Segundo bloco de rodadas de negócio",
        "Demo day de startups selecionadas",
        "Painéis de tecnologia, bioeconomia e capital",
        "Ativações de marca e experiências patrocinadas",
      ],
    },
    {
      dia: "Dia 3",
      data: "17 de junho",
      title: "Deals, Legado & Encerramento",
      items: [
        "Mesas de fechamento e follow-up de deals",
        "Relatórios de conexão para cada participante",
        "Keynote de encerramento e atração musical",
        "Lançamento da agenda contínua da plataforma",
      ],
    },
  ];

  return (
    <section id="programacao" className="grain relative overflow-hidden bg-forest-950 py-28">
      <div className="relative z-[2] mx-auto max-w-7xl px-5">
        <Reveal>
          <Kicker n="04">Programação</Kicker>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-2xl font-display font-800 leading-tight tracking-tight text-[clamp(2rem,5vw,3.2rem)]">
            Três dias. Um ponto de virada para o agro brasileiro.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {dias.map((d, i) => (
            <Reveal key={d.dia} delay={i * 110}>
              <article className="flex h-full flex-col bg-forest-950 p-7">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <span className="font-display font-800 text-2xl text-gold-400">{d.dia}</span>
                  <span className="text-sm text-cream/50">{d.data} · 2027</span>
                </div>
                <h3 className="mt-5 font-display font-700 text-xl">{d.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-cream/70">
                  {d.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-green-400" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PALESTRANTES                                                        */
/* ------------------------------------------------------------------ */
function Palestrantes() {
  const nomes = [
    { nome: "Luiza Trajano", bio: "Uma das empresárias mais admiradas do Brasil. Referência em inovação, varejo e liderança." },
    { nome: "Bernardinho", bio: "Um dos maiores campeões da história do voleibol, com mais de trinta títulos em vinte anos de carreira." },
  ];
  return (
    <section id="palestrantes" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <Kicker n="05">Palestrantes</Kicker>
        </Reveal>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={60}>
            <h2 className="max-w-xl font-display font-800 leading-tight tracking-tight text-[clamp(2rem,5vw,3.2rem)]">
              Vozes que movem o país.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-cream/70">
              Mais de 200 palestrantes entre lideranças do agro, tecnologia, capital e cultura.
              Line-up em anúncio.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nomes.map((p, i) => (
            <Reveal key={p.nome} delay={i * 90}>
              <div className="surface flex h-full flex-col justify-end rounded-2xl p-6 min-h-56">
                <span className="font-display font-800 text-2xl leading-tight text-cream">
                  {p.nome}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{p.bio}</p>
              </div>
            </Reveal>
          ))}
          {[0, 1].map((i) => (
            <Reveal key={i} delay={200 + i * 90}>
              <div className="flex h-full min-h-56 flex-col items-start justify-end rounded-2xl border border-dashed border-white/15 p-6">
                <span className="font-display font-800 text-2xl leading-tight text-cream/30">
                  Em breve
                </span>
                <p className="mt-2 text-sm text-cream/40">Novos nomes anunciados a cada semana.</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Numeros() {
  const stats = [
    { n: "8.000+", l: "participantes", d: "produtores, startups, indústria" },
    { n: "200+", l: "palestrantes", d: "agro, tecnologia e capital" },
    { n: "100", l: "startups nas rodadas", d: "selecionadas por dados" },
    { n: "50", l: "investidores em mesa", d: "teses cruzadas por algoritmo" },
  ];
  return (
    <section id="numeros" className="relative overflow-hidden bg-forest-950 py-24">
      <OrganicBg variant="soft" className="opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 90}>
              <div className="border-l border-white/15 pl-5">
                <div className="font-display font-800 text-gold-gradient text-[clamp(2.2rem,5.5vw,3.6rem)] leading-none">
                  {s.n}
                </div>
                <div className="mt-3 font-semibold text-cream">{s.l}</div>
                <div className="text-sm text-cream/55">{s.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PATROCÍNIO                                                          */
/* ------------------------------------------------------------------ */
function Patrocinio() {
  const ativacoes = [
    { icon: Gamepad2, t: "Gamificação e interações digitais" },
    { icon: Package, t: "Sampling e gifts sustentáveis" },
    { icon: MonitorPlay, t: "Conteúdo patrocinado e cabine de podcast" },
    { icon: Megaphone, t: "Ambientes proprietários e branding experience" },
  ];
  return (
    <section id="patrocinio" className="relative overflow-hidden py-28">
      <Hills />
      <div className="relative z-[2] mx-auto max-w-7xl px-5">
        <Reveal>
          <Kicker n="06">Patrocínio</Kicker>
        </Reveal>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <Reveal delay={60}>
              <h2 className="max-w-xl font-display font-800 leading-tight tracking-tight text-[clamp(2rem,5vw,3.2rem)]">
                Coloque sua marca no centro da transformação do agro.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-lg text-lg text-cream/75">
                Cotas com ativações de marca, experiências patrocinadas e presença nos três dias
                de evento, além da plataforma contínua que segue gerando conexões o ano inteiro.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8">
                <ButtonLink href="/login?tab=inscricao" variant="gold" size="lg">
                  Quero patrocinar <ArrowRight className="h-5 w-5" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-3">
            {ativacoes.map((a, i) => (
              <Reveal key={a.t} delay={i * 80}>
                <div className="flex items-center gap-4 border-l-2 border-gold-400/60 bg-white/[0.03] px-5 py-4">
                  <a.icon className="h-5 w-5 shrink-0 text-gold-400" />
                  <span className="font-medium text-cream/90">{a.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function PortalCta() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="surface-solid grain relative overflow-hidden rounded-2xl p-10 text-center md:p-16">
          <AuroraBg className="opacity-70" />
          <OrganicBg variant="hero" className="opacity-50" />
          <div className="relative z-[2]">
            <Handshake className="mx-auto h-10 w-10 text-green-400" />
            <h2 className="mx-auto mt-5 max-w-2xl font-display font-800 leading-tight tracking-tight text-[clamp(1.8rem,4.5vw,3rem)]">
              Startup ou investidor? Seu lugar nas rodadas começa aqui.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/75">
              Acesse o portal para gerenciar sua inscrição, baixar materiais e ver sua agenda de
              rodadas assim que o matching for gerado.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/login?tab=inscricao" variant="gold" size="lg">
                Quero participar <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/login" variant="outline" size="lg">
                Já tenho acesso
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forest-950 py-14">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-center gap-10 text-center">
          <Logo />
          <Realizadores label="Uma realização" />
          <p className="max-w-md text-sm text-cream/50">
            Agri Summit Brazil 2027 · 15 a 17 de junho · Royal Palm Hall, Campinas, SP ·
            O agro que move o futuro.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-cream/60">
            <a href="/login" className="hover:text-cream">Portal</a>
            <a href="#rodadas" className="hover:text-cream">Rodadas de Negócio</a>
            <a href="#programacao" className="hover:text-cream">Programação</a>
            <a href="#patrocinio" className="hover:text-cream">Patrocínio</a>
          </div>
          <p className="text-xs text-cream/35">
            © 2027 Agri Summit Brazil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
