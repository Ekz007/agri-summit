#!/usr/bin/env node
/**
 * Applies the SQL migrations to Supabase via the Management API.
 *
 * Usage:
 *   SUPABASE_PAT=sbp_xxx node scripts/apply-schema.mjs
 *
 * The PAT comes from https://supabase.com/dashboard/account/tokens
 * (Account → Access Tokens). It is NOT the anon/service_role key.
 */
import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_REF = "xjbqpipqxzcowwdwwoyq";
const PAT = process.env.SUPABASE_PAT;

if (!PAT) {
  console.error("✗ Defina SUPABASE_PAT (token sbp_… da conta Supabase).");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const migDir = join(here, "..", "supabase", "migrations");

async function runQuery(sql) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json().catch(() => ({}));
}

const files = (await readdir(migDir)).filter((f) => f.endsWith(".sql")).sort();
for (const f of files) {
  const sql = await readFile(join(migDir, f), "utf8");
  process.stdout.write(`→ aplicando ${f} … `);
  await runQuery(sql);
  console.log("ok");
}
console.log("\n✓ Schema aplicado com sucesso no projeto", PROJECT_REF);
