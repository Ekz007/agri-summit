import {
  ArrowRight,
  MapPin,
  CalendarDays,
  Sparkles,
  Handshake,
  LineChart,
  Cpu,
  Leaf,
  Timer,
  Users,
  Table2,
  ClipboardCheck,
  Repeat,
} from "lucide-react";
import { SiteNav } from "@/components/landing/SiteNav";
import { OrganicBg } from "@/components/brand/OrganicBg";
import { AuroraBg } from "@/components/brand/AuroraBg";
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
      <Formato />
      <Numeros />
      <Pilares />
      <PortalCta />
      <Footer />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden vignette min-h-[100svh] flex items-center">
      <AuroraBg />
      <OrganicBg variant="hero" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-transparent to-forest-900" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-4 py-1.5 text-sm text-green-300">
            <Sparkles className="h-4 w-4" />
            A Revolução do Agronegócio Digital e Sustentável
          </div>

          <h1 className="animate-rise mt-6 font-display font-800 leading-[0.92] tracking-tight text-cream text-[clamp(2.75rem,8vw,5.5rem)]">
            AGRI SUMMIT
            <br />
            <span className="text-gold-gradient">BRAZIL 2027</span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-lg text-cream/80">
            Produzindo a inovação. Inovando a produção. A plataforma que conecta{" "}
            <strong className="text-cream">startups, investidores, indústria e ciência</strong> —
            onde a inovação encontra aplicação real.
          </p>

          <div className="animate-rise mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/login?tab=inscricao" variant="gold" size="lg">
              Faça sua inscrição <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/login" variant="outline" size="lg">
              Acessar o portal
            </ButtonLink>
          </div>

          <dl className="animate-rise mt-12 flex flex-wrap gap-x-10 gap-y-4 text-cream/85">
            <div className="flex items-center gap-2.5">
              <CalendarDays className="h-5 w-5 text-green-400" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/50">Quando</dt>
                <dd className="font-semibold">02 – 04 de março de 2027</dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-5 w-5 text-green-400" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/50">Onde</dt>
                <dd className="font-semibold">Anhembi · São Paulo</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Realizadores />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CONTINUUM STRIP — antes / durante / depois                          */
/* ------------------------------------------------------------------ */
function ContinuumStrip() {
  const items = ["ANTES", "DURANTE", "DEPOIS"];
  return (
    <div className="border-y border-white/10 bg-forest-950/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-5 text-center">
        <span className="text-sm text-cream/60">
          Não apenas um evento — uma plataforma contínua de negócios
        </span>
        <div className="flex items-center gap-3">
          {items.map((i, idx) => (
            <span key={i} className="flex items-center gap-3">
              <span className="font-display font-700 tracking-[0.2em] text-gold-400 text-sm">
                {i}
              </span>
              {idx < items.length - 1 && <span className="text-cream/25">·</span>}
            </span>
          ))}
        </div>
        <span className="text-sm text-cream/60">dos 3 dias de evento</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MANIFESTO                                                           */
/* ------------------------------------------------------------------ */
function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden py-28">
      <OrganicBg variant="soft" className="opacity-60" />
      <div className="relative mx-auto max-w-5xl px-5">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">O Manifesto</p>
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
              Toda grande transformação precisa de uma plataforma capaz de conectar ideias a
              investimentos, tecnologia a oportunidades. O{" "}
              <strong className="text-cream">Agri Summit Brazil</strong> nasce exatamente nesse
              território.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RODADAS DE NEGÓCIO — the matchmaking star feature                   */
/* ------------------------------------------------------------------ */
function Rodadas() {
  const steps = [
    {
      icon: Cpu,
      title: "Matching por algoritmo",
      body: "Antes do evento, cruzamos os dados de cada startup com a tese de cada investidor. O algoritmo gera as agendas e o mapa de mesas — todo mundo chega sabendo com quem vai conversar.",
    },
    {
      icon: Table2,
      title: "Investidor na mesa, startup em rotação",
      body: "Cada investidor tem uma mesa fixa e conhece sua agenda. As startups giram entre as mesas conforme o horário definido pelo match.",
    },
    {
      icon: Timer,
      title: "15 min de conversa + 5 min de troca",
      body: "Cada rodada tem 15 minutos de pitch. Nos 5 minutos de intervalo as startups trocam de mesa — e o investidor preenche o formulário de avaliação daquela conversa.",
    },
    {
      icon: ClipboardCheck,
      title: "Feedback estruturado",
      body: "Interesse, fit e próximos passos são registrados na hora. Ao final, cada lado sai com um relatório do que aconteceu — o follow-up começa ainda no evento.",
    },
  ];

  return (
    <section id="rodadas" className="relative overflow-hidden bg-forest-950 py-28">
      <OrganicBg variant="panel" className="opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-sm text-gold-300">
                <Handshake className="h-4 w-4" /> O coração da plataforma
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display font-800 leading-[0.98] tracking-tight text-[clamp(2rem,5vw,3.4rem)]">
                Rodadas de <span className="text-gold-gradient">Negócio</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-lg text-lg text-cream/80">
                Speed-dating de investimento com inteligência de dados. Um algoritmo conecta as{" "}
                startups certas aos investidores certos — e orquestra uma agenda milimétrica ao
                longo de dois dias de rodadas.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <div className="surface h-full rounded-2xl p-5">
                    <s.icon className="h-6 w-6 text-green-400" />
                    <h3 className="mt-3 font-display font-700 text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <RoundClockCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Illustrative "agenda card" showing the 15+5 cadence. */
function RoundClockCard() {
  const slots = [
    { h: "09:00", inv: "AgroVentures Capital", mesa: "Mesa 07", live: true },
    { h: "09:20", inv: "Terra Fund", mesa: "Mesa 14" },
    { h: "09:40", inv: "Raízen Ventures", mesa: "Mesa 02" },
    { h: "10:00", inv: "SP Ventures", mesa: "Mesa 21" },
  ];
  return (
    <div className="surface-solid relative overflow-hidden rounded-3xl p-6 shadow-2xl">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cream/50">Sua agenda · Dia 1</p>
          <p className="font-display font-700 text-lg">Verde Bio · Startup</p>
        </div>
        <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">
          Match 92%
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        {slots.map((s) => (
          <div
            key={s.h}
            className={
              "flex items-center gap-3 rounded-xl border px-4 py-3 " +
              (s.live
                ? "border-green-400/50 bg-green-500/10"
                : "border-white/10 bg-white/[0.03]")
            }
          >
            <span className="font-display font-700 text-sm tabular-nums text-cream/90">
              {s.h}
            </span>
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

      <div className="mt-5 flex items-center justify-between rounded-xl bg-gold-500/10 px-4 py-3 text-sm">
        <span className="flex items-center gap-2 text-gold-300">
          <Timer className="h-4 w-4" /> Intervalo — troca de mesa
        </span>
        <span className="font-display font-700 tabular-nums text-gold-300">05:00</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FORMATO — 3 dias                                                    */
/* ------------------------------------------------------------------ */
function Formato() {
  const dias = [
    {
      dia: "Dia 1",
      data: "02 mar",
      title: "Abertura & Rodadas — Bloco A",
      body: "100 startups e 50 investidores. Painéis de abertura pela manhã, rodadas de negócio à tarde com agenda gerada por algoritmo.",
      tags: ["100 startups", "50 investidores", "Rodadas"],
    },
    {
      dia: "Dia 2",
      data: "03 mar",
      title: "Rodadas — Bloco B & Conteúdo",
      body: "Segundo dia de rodadas, palcos de conteúdo, demo day e ativações de marca com indústria e ciência.",
      tags: ["Rodadas", "Demo Day", "Conteúdo"],
    },
    {
      dia: "Dia 3",
      data: "04 mar",
      title: "Deals, Networking & Legado",
      body: "Consolidação dos matches, mesas de fechamento, relatórios de conexão e a agenda contínua do pós-evento.",
      tags: ["Follow-up", "Deals", "Comunidade"],
    },
  ];

  return (
    <section id="formato" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">O Formato</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-2xl font-display font-800 leading-tight tracking-tight text-[clamp(2rem,5vw,3.2rem)]">
            Três dias que começam antes e continuam depois.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {dias.map((d, i) => (
            <Reveal key={d.dia} delay={i * 110}>
              <article className="surface group relative h-full overflow-hidden rounded-3xl p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold-500/10 blur-2xl transition-all group-hover:bg-gold-500/20" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-800 text-2xl text-gold-400">{d.dia}</span>
                  <span className="text-sm text-cream/50">{d.data}</span>
                </div>
                <h3 className="mt-4 font-display font-700 text-xl">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{d.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-cream/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* NÚMEROS                                                             */
/* ------------------------------------------------------------------ */
function Numeros() {
  const stats = [
    { n: "100", l: "startups selecionadas", d: "no primeiro dia" },
    { n: "50", l: "investidores em mesa", d: "tese cruzada por dados" },
    { n: "2", l: "dias de rodadas", d: "agenda milimétrica" },
    { n: "15+5", l: "min por rodada", d: "pitch + troca de mesa" },
  ];
  return (
    <section id="numeros" className="relative overflow-hidden bg-forest-950 py-24">
      <OrganicBg variant="soft" className="opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 90}>
              <div className="text-center lg:text-left">
                <div className="font-display font-800 text-gold-gradient text-[clamp(2.5rem,6vw,4rem)] leading-none">
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
/* PILARES                                                            */
/* ------------------------------------------------------------------ */
function Pilares() {
  const pilares = [
    { icon: Handshake, t: "Negócios", d: "Rodadas, deals e conexões qualificadas entre capital e inovação." },
    { icon: Cpu, t: "Tecnologia", d: "Agtechs, bioeconomia, dados e IA aplicados ao campo." },
    { icon: LineChart, t: "Investimento", d: "Investidores e fundos em busca do futuro do agro." },
    { icon: Leaf, t: "Sustentabilidade", d: "Produção que alimenta o mundo com responsabilidade." },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <h2 className="max-w-2xl font-display font-800 leading-tight tracking-tight text-[clamp(1.8rem,4.5vw,3rem)]">
            Um ecossistema vivo, onde o Brasil encontra o mundo.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div className="surface h-full rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/15">
                  <p.icon className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="mt-4 font-display font-700 text-xl">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PORTAL CTA                                                          */
/* ------------------------------------------------------------------ */
function PortalCta() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="surface-solid relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
          <AuroraBg className="opacity-70" />
          <OrganicBg variant="hero" className="opacity-50" />
          <div className="relative">
            <Users className="mx-auto h-10 w-10 text-green-400" />
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
/* FOOTER                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forest-950 py-14">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-center gap-10 text-center">
          <Logo />
          <Realizadores label="Uma realização" />
          <p className="max-w-md text-sm text-cream/50">
            Agri Summit Brazil 2027 · 02 a 04 de março · Centro de Eventos Anhembi, São Paulo ·
            A Revolução do Agronegócio Digital e Sustentável.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-cream/60">
            <a href="/login" className="hover:text-cream">Portal</a>
            <a href="#rodadas" className="hover:text-cream">Rodadas de Negócio</a>
            <a href="#formato" className="hover:text-cream">Formato</a>
          </div>
          <p className="text-xs text-cream/35">
            © 2027 Agri Summit Brazil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
