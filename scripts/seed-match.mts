/**
 * Seeds demo startups/investidores and runs the REAL matching engine,
 * persisting matches + agenda straight to Postgres. Run with tsx.
 *   node --import tsx scripts/seed-match.mts
 */
import pg from "pg";
import { runMatching, DEFAULT_PESOS } from "../src/lib/matching/engine.ts";

const REF = "xjbqpipqxzcowwdwwoyq";
const client = new pg.Client({
  host: "aws-0-sa-east-1.pooler.supabase.com",
  port: 5432,
  user: `postgres.${REF}`,
  password: process.env.PGPASSWORD || "be@49er.com.br",
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

const SETORES = ["AgTech / Digital","Bioinsumos","Biotecnologia","Máquinas & Robótica","IoT & Conectividade","Dados & IA","Crédito & Fintech Agro","Logística & Supply","Rastreabilidade","Sustentabilidade & Carbono","Pecuária de Precisão","Irrigação & Água","Insumos & Nutrição","Mercado & Trading"];
const ESTAGIOS = ["ideacao","mvp","tracao","scale"];
const REGIOES = ["Norte","Nordeste","Centro-Oeste","Sudeste","Sul","Nacional"];
const TEC = ["Inteligência Artificial","IoT","Sensores","Drones","Blockchain","Biotecnologia","Genômica","Robótica","Visão Computacional","SaaS","Marketplace"];
const ODS = ["ODS 2 · Fome Zero","ODS 6 · Água Limpa","ODS 9 · Inovação","ODS 12 · Consumo Responsável","ODS 13 · Ação Climática","ODS 15 · Vida Terrestre"];
const NOMES = ["Verde Bio","AgroSense","TerraData","BioNutre","CampoIA","RaizTech","SoloVivo","PecuárIA","AquaFarm","GrãoZero","CarbonoAgro","Sementec","IrrigaSmart","FrutaLog","BovControl","AgroFin","NutriCow","DroneAgro","ClimaCampo","RastreiaAgro"];
const FUNDOS = ["AgroVentures Capital","Terra Fund","SP Ventures","Raízen Ventures","Barn Invest","GreenSeed Capital","Agri Angels","Bravery Agro","Latitud Agro","Solum Partners"];

const pick = (a: string[], s: number) => a[s % a.length];
const pickN = (a: string[], n: number, s: number) => Array.from(new Set(Array.from({ length: n }, (_, i) => a[(s + i * 3) % a.length])));

await client.connect();
console.log("• conectado");

// limpa demo anterior
await client.query("delete from agenda; delete from matches; delete from startups where owner_id is null; delete from investidores where owner_id is null;");

const N_STARTUPS = 100, N_INVEST = 50;

for (let i = 0; i < N_STARTUPS; i++) {
  await client.query(
    `insert into startups (nome, descricao, setor, setores, estagio, regiao, tecnologia, ods, ticket_min, ticket_max, status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'confirmada')`,
    [
      `${pick(NOMES, i)} ${Math.floor(i / NOMES.length) + 1}`,
      "Startup de inovação para o agronegócio.",
      pick(SETORES, i), pickN(SETORES, 2, i + 1), pick(ESTAGIOS, i), pick(REGIOES, i),
      pickN(TEC, 2, i), pickN(ODS, 2, i), 500000 + (i % 5) * 250000, 2000000 + (i % 5) * 1000000,
    ]
  );
}
for (let i = 0; i < N_INVEST; i++) {
  await client.query(
    `insert into investidores (nome, representante, tipo, tese, setores_interesse, estagios_interesse, regioes, ticket_min, ticket_max)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      `${pick(FUNDOS, i)}${i >= FUNDOS.length ? " " + (Math.floor(i / FUNDOS.length) + 1) : ""}`,
      "Sócio(a) responsável", pick(["fundo","cvc","anjo","family_office"], i),
      "Investimos em tecnologia e sustentabilidade para o campo.",
      pickN(SETORES, 4, i), pickN(ESTAGIOS, 2, i), i % 3 === 0 ? [] : pickN(REGIOES, 2, i),
      500000, 5000000 + (i % 4) * 1000000,
    ]
  );
}
console.log(`• seed: ${N_STARTUPS} startups, ${N_INVEST} investidores`);

// atribui mesas
const { rows: invs } = await client.query("select * from investidores order by created_at");
for (let i = 0; i < invs.length; i++) {
  await client.query("update investidores set mesa_numero=$1 where id=$2", [i + 1, invs[i].id]);
  invs[i].mesa_numero = i + 1;
}

const { rows: startups } = await client.query("select * from startups");
const { rows: rodadas } = await client.query("select * from rodadas");

const result = runMatching(startups as any, invs as any, rodadas as any, DEFAULT_PESOS);
console.log("• matching:", JSON.stringify(result.stats));

// grava matches
for (let i = 0; i < result.matches.length; i += 200) {
  const chunk = result.matches.slice(i, i + 200);
  const vals: any[] = [];
  const ph = chunk.map((m, j) => {
    const b = j * 4;
    vals.push(m.startup_id, m.investidor_id, m.score, JSON.stringify(m.breakdown));
    return `($${b + 1},$${b + 2},$${b + 3},$${b + 4})`;
  });
  await client.query(`insert into matches (startup_id,investidor_id,score,breakdown) values ${ph.join(",")}`, vals);
}
// grava agenda
for (let i = 0; i < result.plan.length; i += 200) {
  const chunk = result.plan.slice(i, i + 200);
  const vals: any[] = [];
  const ph = chunk.map((p, j) => {
    const b = j * 6;
    vals.push(p.rodada_id, p.dia, p.mesa_numero, p.investidor_id, p.startup_id, p.score);
    return `($${b + 1},$${b + 2},$${b + 3},$${b + 4},$${b + 5},$${b + 6},'agendado')`;
  });
  await client.query(`insert into agenda (rodada_id,dia,mesa_numero,investidor_id,startup_id,score,status) values ${ph.join(",")}`, vals);
}
await client.query("update evento_config set matching_gerado_em=now(), agenda_publicada=true where id=1");
console.log(`✓ ${result.matches.length} matches e ${result.plan.length} encontros gravados. Agenda publicada.`);
await client.end();
