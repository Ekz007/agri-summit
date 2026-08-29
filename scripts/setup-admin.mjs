#!/usr/bin/env node
/**
 * Creates (or promotes) the admin account using the service_role key.
 * Run AFTER the schema is applied.
 *
 * Usage:
 *   node scripts/setup-admin.mjs [email] [senha]
 *   (defaults: be@49er.com.br / agri-summit-2027)
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// load .env.local
const env = {};
try {
  const raw = await readFile(join(here, "..", ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2];
  }
} catch {}

const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2] || "be@49er.com.br";
const senha = process.argv[3] || "agri-summit-2027";

if (!URL || !SERVICE) {
  console.error("✗ .env.local sem NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const headers = {
  apikey: SERVICE,
  Authorization: `Bearer ${SERVICE}`,
  "Content-Type": "application/json",
};

// 1. create the auth user (idempotent-ish)
let userId = null;
const createRes = await fetch(`${URL}/auth/v1/admin/users`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: { full_name: "Administrador Agri Summit", role: "admin" },
  }),
});
if (createRes.ok) {
  const u = await createRes.json();
  userId = u.id;
  console.log("✓ Usuário admin criado:", email);
} else {
  const t = await createRes.text();
  if (/already|registered|exists/i.test(t)) {
    console.log("• Usuário já existe, buscando id…");
    const list = await fetch(`${URL}/auth/v1/admin/users?per_page=200`, { headers });
    const data = await list.json();
    const found = (data.users || data).find?.((x) => x.email === email);
    userId = found?.id;
  } else {
    console.error("✗ Erro ao criar usuário:", t);
    process.exit(1);
  }
}

// 2. upsert profile with admin role
const prof = await fetch(`${URL}/rest/v1/profiles?on_conflict=id`, {
  method: "POST",
  headers: { ...headers, Prefer: "resolution=merge-duplicates" },
  body: JSON.stringify({
    id: userId,
    email,
    full_name: "Administrador Agri Summit",
    role: "admin",
  }),
});
if (prof.ok) {
  console.log("✓ Perfil admin garantido.");
} else {
  console.error("✗ Erro no profile:", await prof.text());
}

console.log(`\nLogin admin → ${email} / ${senha}`);
