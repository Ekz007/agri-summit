/** Creates demo startup + investidor logins linked to seeded entities with agenda. */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const here = dirname(fileURLToPath(import.meta.url));
const env = {};
for (const line of (await readFile(join(here, "..", ".env.local"), "utf8")).split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/); if (m) env[m[1]] = m[2];
}
const URL = env.NEXT_PUBLIC_SUPABASE_URL, SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, "Content-Type": "application/json" };

const client = new pg.Client({
  host: "aws-0-sa-east-1.pooler.supabase.com", port: 5432,
  user: "postgres.xjbqpipqxzcowwdwwoyq", password: "be@49er.com.br",
  database: "postgres", ssl: { rejectUnauthorized: false },
});
await client.connect();

async function createUser(email, senha, full_name, role) {
  const res = await fetch(`${URL}/auth/v1/admin/users`, {
    method: "POST", headers: H,
    body: JSON.stringify({ email, password: senha, email_confirm: true, user_metadata: { full_name, role } }),
  });
  if (res.ok) return (await res.json()).id;
  const list = await (await fetch(`${URL}/auth/v1/admin/users?per_page=200`, { headers: H })).json();
  return (list.users || list).find((u) => u.email === email)?.id;
}

// startup demo — pega uma startup com mais encontros
const sUser = await createUser("startup@demo.com", "Demo2027", "Startup Demo", "startup");
const { rows: [topS] } = await client.query(
  "select s.id from startups s join agenda a on a.startup_id=s.id where s.owner_id is null group by s.id order by count(*) desc limit 1"
);
await client.query("update profiles set role='startup', full_name='Startup Demo' where id=$1", [sUser]);
await client.query("update startups set owner_id=$1 where id=$2", [sUser, topS.id]);

// investidor demo
const iUser = await createUser("investidor@demo.com", "Demo2027", "Investidor Demo", "investidor");
const { rows: [topI] } = await client.query(
  "select i.id, i.mesa_numero from investidores i join agenda a on a.investidor_id=i.id where i.owner_id is null group by i.id order by count(*) desc limit 1"
);
await client.query("update profiles set role='investidor', full_name='Investidor Demo' where id=$1", [iUser]);
await client.query("update investidores set owner_id=$1 where id=$2", [iUser, topI.id]);

const sc = (await client.query("select count(*) from agenda where startup_id=$1", [topS.id])).rows[0].count;
const ic = (await client.query("select count(*) from agenda where investidor_id=$1", [topI.id])).rows[0].count;
console.log(`✓ startup@demo.com / Demo2027 → ${sc} encontros`);
console.log(`✓ investidor@demo.com / Demo2027 → mesa ${topI.mesa_numero}, ${ic} encontros`);
await client.end();
