#!/usr/bin/env node
/**
 * Applies SQL to Supabase Postgres via the session pooler.
 *   node scripts/db-apply.mjs <file.sql>
 * or pipe inline SQL:
 *   node scripts/db-apply.mjs -c "select 1"
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const here = dirname(fileURLToPath(import.meta.url));
const REF = "xjbqpipqxzcowwdwwoyq";
const PASSWORD = process.env.PGPASSWORD || "be@49er.com.br";

const HOSTS = [
  "aws-0-sa-east-1.pooler.supabase.com",
  "aws-1-sa-east-1.pooler.supabase.com",
  "aws-0-us-east-1.pooler.supabase.com",
  "aws-0-us-east-2.pooler.supabase.com",
];

async function connect() {
  let lastErr;
  for (const host of HOSTS) {
    const client = new pg.Client({
      host,
      port: 5432,
      user: `postgres.${REF}`,
      password: PASSWORD,
      database: "postgres",
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
    });
    try {
      await client.connect();
      console.log("• conectado via", host);
      return client;
    } catch (e) {
      lastErr = e;
      console.log("  ✗", host, "→", e.message);
      try { await client.end(); } catch {}
    }
  }
  throw lastErr;
}

const arg = process.argv[2];
const sql = arg === "-c"
  ? process.argv[3]
  : await readFile(arg.startsWith("/") ? arg : join(here, "..", arg), "utf8");

const client = await connect();
try {
  const res = await client.query(sql);
  const rows = Array.isArray(res) ? res.flatMap((r) => r.rows || []) : res.rows;
  if (rows && rows.length) console.log(JSON.stringify(rows, null, 2));
  console.log("✓ SQL aplicado.");
} catch (e) {
  console.error("✗ Erro SQL:", e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
