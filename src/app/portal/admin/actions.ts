"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { runMatching, DEFAULT_PESOS, type Pesos } from "@/lib/matching/engine";
import type { Startup, Investidor, Rodada } from "@/lib/supabase/types";
import { SETORES, ESTAGIOS, REGIOES, TECNOLOGIAS, ODS } from "@/lib/options";

/**
 * Runs the full pre-event matching:
 *  1. assigns a fixed table to every investor (in load order) if not set
 *  2. scores every startup × investor pair
 *  3. schedules meetings across the rounds
 *  4. persists matches + agenda; stamps config
 */
export async function gerarMatching() {
  await requireAdmin();
  const db = createAdminClient();

  const [{ data: startups }, { data: investidores }, { data: rodadas }, { data: config }] =
    await Promise.all([
      db.from("startups").select("*").in("status", ["aprovada", "confirmada", "inscrita", "em_analise"]),
      db.from("investidores").select("*"),
      db.from("rodadas").select("*"),
      db.from("evento_config").select("pesos").eq("id", 1).maybeSingle(),
    ]);

  const invs = (investidores ?? []) as Investidor[];
  if (!invs.length || !(startups ?? []).length) {
    return { ok: false, error: "Cadastre startups e investidores antes de gerar o matching." };
  }

  // 1. assign fixed tables (mesa) — stable order
  const seated = [...invs].sort((a, b) => a.created_at.localeCompare(b.created_at));
  for (let i = 0; i < seated.length; i++) {
    const mesa = i + 1;
    if (seated[i].mesa_numero !== mesa) {
      seated[i].mesa_numero = mesa;
      await db.from("investidores").update({ mesa_numero: mesa }).eq("id", seated[i].id);
    }
  }

  const pesos = (config?.pesos as Pesos) ?? DEFAULT_PESOS;

  const result = runMatching(
    startups as Startup[],
    seated,
    (rodadas ?? []) as Rodada[],
    pesos
  );

  // 2. persist matches (replace)
  await db.from("matches").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const matchRows = result.matches.map((m) => ({
    startup_id: m.startup_id,
    investidor_id: m.investidor_id,
    score: m.score,
    breakdown: m.breakdown,
  }));
  for (let i = 0; i < matchRows.length; i += 500) {
    await db.from("matches").insert(matchRows.slice(i, i + 500));
  }

  // 3. persist agenda (replace)
  await db.from("agenda").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const agendaRows = result.plan.map((p) => ({
    rodada_id: p.rodada_id,
    dia: p.dia,
    mesa_numero: p.mesa_numero,
    investidor_id: p.investidor_id,
    startup_id: p.startup_id,
    score: p.score,
    status: "agendado" as const,
  }));
  for (let i = 0; i < agendaRows.length; i += 500) {
    await db.from("agenda").insert(agendaRows.slice(i, i + 500));
  }

  await db
    .from("evento_config")
    .update({ matching_gerado_em: new Date().toISOString() })
    .eq("id", 1);

  revalidatePath("/portal/admin");
  revalidatePath("/portal");
  return { ok: true, stats: result.stats };
}

export async function publicarAgenda(publicar: boolean) {
  await requireAdmin();
  const db = createAdminClient();
  await db.from("evento_config").update({ agenda_publicada: publicar }).eq("id", 1);
  revalidatePath("/portal/admin");
  revalidatePath("/portal/rodadas");
  return { ok: true };
}

// ---- Demo seed (para testar o motor de rodadas) ----
const NOMES_STARTUP = [
  "Verde Bio", "AgroSense", "TerraData", "BioNutre", "CampoIA", "RaizTech", "SoloVivo",
  "PecuárIA", "AquaFarm", "GrãoZero", "CarbonoAgro", "Sementec", "IrrigaSmart", "FrutaLog",
  "BovControl+", "AgroFin", "NutriCow", "DroneAgro", "ClimaCampo", "RastreiaAgro",
];
const NOMES_INVEST = [
  "AgroVentures Capital", "Terra Fund", "SP Ventures", "Raízen Ventures", "Barn Invest",
  "GreenSeed Capital", "Agri Angels", "Bravery Agro", "Latitud Agro", "Solum Partners",
];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}
function pickN<T>(arr: readonly T[], n: number, seed: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[(seed + i * 3) % arr.length]);
  return Array.from(new Set(out));
}

export async function seedDemo(qtdStartups = 40, qtdInvest = 10) {
  await requireAdmin();
  const db = createAdminClient();

  const startups = Array.from({ length: qtdStartups }, (_, i) => ({
    nome: `${pick(NOMES_STARTUP, i)} ${Math.floor(i / NOMES_STARTUP.length) + 1}`,
    descricao: "Startup de inovação para o agronegócio brasileiro.",
    setor: pick(SETORES, i),
    setores: pickN(SETORES, 2, i + 1),
    estagio: pick(ESTAGIOS.map((e) => e.v), i),
    regiao: pick(REGIOES, i),
    tecnologia: pickN(TECNOLOGIAS, 2, i),
    ods: pickN(ODS, 2, i),
    ticket_min: 500000 + (i % 5) * 250000,
    ticket_max: 2000000 + (i % 5) * 1000000,
    status: "confirmada" as const,
  }));

  const investidores = Array.from({ length: qtdInvest }, (_, i) => ({
    nome: pick(NOMES_INVEST, i) + (i >= NOMES_INVEST.length ? ` ${Math.floor(i / NOMES_INVEST.length) + 1}` : ""),
    representante: "Sócio(a) responsável",
    tipo: pick(["fundo", "cvc", "anjo", "family_office"], i),
    tese: "Investimos em tecnologia e sustentabilidade para o campo.",
    setores_interesse: pickN(SETORES, 4, i),
    estagios_interesse: pickN(ESTAGIOS.map((e) => e.v), 2, i),
    regioes: i % 3 === 0 ? [] : pickN(REGIOES, 2, i),
    ticket_min: 500000,
    ticket_max: 5000000 + (i % 4) * 1000000,
  }));

  await db.from("startups").insert(startups);
  await db.from("investidores").insert(investidores);

  revalidatePath("/portal/admin");
  return { ok: true, startups: startups.length, investidores: investidores.length };
}

export async function limparDemo() {
  await requireAdmin();
  const db = createAdminClient();
  // remove apenas registros sem owner (dados de demonstração)
  await db.from("agenda").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("matches").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await db.from("startups").delete().is("owner_id", null);
  await db.from("investidores").delete().is("owner_id", null);
  await db
    .from("evento_config")
    .update({ matching_gerado_em: null, agenda_publicada: false })
    .eq("id", 1);
  revalidatePath("/portal/admin");
  return { ok: true };
}
