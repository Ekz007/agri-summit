import type { Startup, Investidor, Rodada } from "@/lib/supabase/types";

export type Pesos = {
  setor: number;
  estagio: number;
  ticket: number;
  regiao: number;
  tese: number;
};

export const DEFAULT_PESOS: Pesos = {
  setor: 40,
  estagio: 25,
  ticket: 20,
  regiao: 10,
  tese: 5,
};

export type ScoreBreakdown = {
  setor: number;
  estagio: number;
  ticket: number;
  regiao: number;
  tese: number;
  total: number;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

function rangesOverlap(
  aMin: number | null,
  aMax: number | null,
  bMin: number | null,
  bMax: number | null
): boolean {
  const lo1 = aMin ?? 0;
  const hi1 = aMax ?? Number.MAX_SAFE_INTEGER;
  const lo2 = bMin ?? 0;
  const hi2 = bMax ?? Number.MAX_SAFE_INTEGER;
  return lo1 <= hi2 && lo2 <= hi1;
}

/**
 * Score a startup × investidor pair from 0–100 using weighted criteria.
 * Each dimension contributes a fraction of its weight based on fit quality.
 */
export function scorePair(
  s: Startup,
  i: Investidor,
  pesos: Pesos = DEFAULT_PESOS
): ScoreBreakdown {
  const startupSetores = [s.setor, ...(s.setores ?? [])]
    .filter(Boolean)
    .map((x) => norm(x as string));
  const invSetores = (i.setores_interesse ?? []).map(norm);

  // --- setor: proporção de setores da startup cobertos pela tese do investidor
  let setor = 0;
  if (invSetores.length && startupSetores.length) {
    const hits = startupSetores.filter((x) => invSetores.includes(x)).length;
    setor = (hits > 0 ? Math.min(1, hits / 1) : 0) * pesos.setor;
    // full weight if at least one strong match, half if only secondary overlaps
    if (hits === 0) setor = 0;
  }

  // --- estágio
  let estagio = 0;
  const invEstagios = (i.estagios_interesse ?? []).map(norm);
  if (s.estagio && invEstagios.length) {
    estagio = invEstagios.includes(norm(s.estagio)) ? pesos.estagio : 0;
  } else if (!invEstagios.length) {
    estagio = pesos.estagio * 0.5; // investidor sem preferência declarada
  }

  // --- ticket
  let ticket = 0;
  if (rangesOverlap(s.ticket_min, s.ticket_max, i.ticket_min, i.ticket_max)) {
    ticket = pesos.ticket;
  } else if (
    s.ticket_min == null &&
    s.ticket_max == null &&
    i.ticket_min == null &&
    i.ticket_max == null
  ) {
    ticket = pesos.ticket * 0.5;
  }

  // --- região
  let regiao = 0;
  const invRegioes = (i.regioes ?? []).map(norm);
  if (s.regiao && invRegioes.length) {
    regiao = invRegioes.includes(norm(s.regiao)) ? pesos.regiao : 0;
  } else if (!invRegioes.length) {
    regiao = pesos.regiao * 0.5; // investidor investe em qualquer região
  }

  // --- tese (keyword overlap entre ODS/descrição e tese)
  let tese = 0;
  if (i.tese) {
    const teseTokens = new Set(norm(i.tese).split(/\W+/).filter((t) => t.length > 3));
    const bag = [
      ...(s.ods ?? []),
      ...(s.tecnologia ?? []),
      s.descricao ?? "",
    ]
      .join(" ");
    const startupTokens = norm(bag).split(/\W+/).filter((t) => t.length > 3);
    const hit = startupTokens.some((t) => teseTokens.has(t));
    tese = hit ? pesos.tese : 0;
  }

  const total = Math.round(setor + estagio + ticket + regiao + tese);
  return {
    setor: Math.round(setor),
    estagio: Math.round(estagio),
    ticket: Math.round(ticket),
    regiao: Math.round(regiao),
    tese: Math.round(tese),
    total,
  };
}

export type MatchScore = {
  startup_id: string;
  investidor_id: string;
  score: number;
  breakdown: ScoreBreakdown;
};

export function computeAllMatches(
  startups: Startup[],
  investidores: Investidor[],
  pesos: Pesos = DEFAULT_PESOS
): MatchScore[] {
  const out: MatchScore[] = [];
  for (const s of startups) {
    for (const i of investidores) {
      const breakdown = scorePair(s, i, pesos);
      out.push({
        startup_id: s.id,
        investidor_id: i.id,
        score: breakdown.total,
        breakdown,
      });
    }
  }
  return out;
}

export type PlannedMeeting = {
  rodada_id: string;
  dia: number;
  ordem: number;
  mesa_numero: number;
  investidor_id: string;
  startup_id: string;
  score: number;
};

/**
 * Greedy scheduler.
 *
 * Constraints honoured:
 *  - one startup per table (mesa) per round
 *  - one table per startup per round
 *  - a startup never meets the same investor twice
 *
 * Strategy: sort all candidate pairs by score desc; walk the rounds and, for
 * each round, place the highest-scoring still-valid pairs until every table is
 * filled or no valid pair remains. This maximises total match quality while
 * spreading each startup's meetings across the available rounds.
 */
export function schedule(
  matches: MatchScore[],
  investidores: Investidor[],
  rodadas: Rodada[]
): PlannedMeeting[] {
  const invById = new Map(investidores.map((i) => [i.id, i]));
  // only investors that have a fixed table participate in the rounds
  const seated = investidores.filter((i) => i.mesa_numero != null);
  const seatedIds = new Set(seated.map((i) => i.id));

  // candidate pairs, best first
  const candidates = matches
    .filter((m) => seatedIds.has(m.investidor_id) && m.score > 0)
    .sort((a, b) => b.score - a.score);

  const rounds = [...rodadas].sort((a, b) =>
    a.dia === b.dia ? a.ordem - b.ordem : a.dia - b.dia
  );

  const usedPairs = new Set<string>(); // `${startup}:${investidor}`
  // per round: which investors already have a startup, which startups are busy
  const roundInvBusy = new Map<string, Set<string>>();
  const roundStartupBusy = new Map<string, Set<string>>();
  for (const r of rounds) {
    roundInvBusy.set(r.id, new Set());
    roundStartupBusy.set(r.id, new Set());
  }

  const plan: PlannedMeeting[] = [];

  for (const r of rounds) {
    const invBusy = roundInvBusy.get(r.id)!;
    const startupBusy = roundStartupBusy.get(r.id)!;
    for (const c of candidates) {
      if (invBusy.size >= seated.length) break; // all tables filled this round
      const pairKey = `${c.startup_id}:${c.investidor_id}`;
      if (usedPairs.has(pairKey)) continue;
      if (invBusy.has(c.investidor_id)) continue;
      if (startupBusy.has(c.startup_id)) continue;

      const inv = invById.get(c.investidor_id)!;
      plan.push({
        rodada_id: r.id,
        dia: r.dia,
        ordem: r.ordem,
        mesa_numero: inv.mesa_numero!,
        investidor_id: c.investidor_id,
        startup_id: c.startup_id,
        score: c.score,
      });
      invBusy.add(c.investidor_id);
      startupBusy.add(c.startup_id);
      usedPairs.add(pairKey);
    }
  }

  return plan;
}

export type MatchingResult = {
  matches: MatchScore[];
  plan: PlannedMeeting[];
  stats: {
    startups: number;
    investidores: number;
    investidoresComMesa: number;
    rodadas: number;
    encontros: number;
    startupsSemAgenda: number;
    mediaEncontrosPorStartup: number;
  };
};

export function runMatching(
  startups: Startup[],
  investidores: Investidor[],
  rodadas: Rodada[],
  pesos: Pesos = DEFAULT_PESOS
): MatchingResult {
  const matches = computeAllMatches(startups, investidores, pesos);
  const plan = schedule(matches, investidores, rodadas);

  const byStartup = new Map<string, number>();
  for (const p of plan) byStartup.set(p.startup_id, (byStartup.get(p.startup_id) ?? 0) + 1);
  const startupsComAgenda = byStartup.size;

  return {
    matches,
    plan,
    stats: {
      startups: startups.length,
      investidores: investidores.length,
      investidoresComMesa: investidores.filter((i) => i.mesa_numero != null).length,
      rodadas: rodadas.length,
      encontros: plan.length,
      startupsSemAgenda: startups.length - startupsComAgenda,
      mediaEncontrosPorStartup:
        startupsComAgenda > 0
          ? Math.round((plan.length / startupsComAgenda) * 10) / 10
          : 0,
    },
  };
}
