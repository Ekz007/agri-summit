#!/usr/bin/env node
/** Creates the Render web service for Agri Summit and triggers first deploy. */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const RENDER_KEY = process.env.RENDER_API_KEY;
const OWNER = "tea-d73u6o2dbo4c738jrtfg"; // team "49 Projects"
const REPO = "https://github.com/Ekz007/agri-summit";

if (!RENDER_KEY) { console.error("✗ RENDER_API_KEY ausente"); process.exit(1); }

const env = {};
const raw = await readFile(join(here, "..", ".env.local"), "utf8");
for (const line of raw.split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}

const envVars = [
  { key: "NODE_VERSION", value: "24.19.0" },
  { key: "NEXT_PUBLIC_SUPABASE_URL", value: env.NEXT_PUBLIC_SUPABASE_URL },
  { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
  { key: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", value: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY },
  { key: "SUPABASE_SERVICE_ROLE_KEY", value: env.SUPABASE_SERVICE_ROLE_KEY },
];

const api = (path, opts = {}) =>
  fetch(`https://api.render.com/v1${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${RENDER_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(opts.headers || {}),
    },
  });

// avoid duplicates
const existing = await (await api(`/services?name=agri-summit&limit=20`)).json();
const dup = Array.isArray(existing) ? existing.find((s) => s.service?.name === "agri-summit") : null;
if (dup) {
  console.log("• Serviço já existe:", dup.service.id, "→", dup.service.serviceDetails?.url);
  const dep = await (await api(`/services/${dup.service.id}/deploys`, { method: "POST", body: JSON.stringify({ clearCache: "do_not_clear" }) })).json();
  console.log("• Deploy disparado:", dep.id || JSON.stringify(dep).slice(0, 200));
  process.exit(0);
}

for (const plan of ["free", "starter"]) {
  const body = {
    type: "web_service",
    name: "agri-summit",
    ownerId: OWNER,
    repo: REPO,
    branch: "main",
    autoDeploy: "yes",
    serviceDetails: {
      env: "node",
      plan,
      region: "oregon",
      envSpecificDetails: {
        buildCommand: "npm install && npm run build",
        startCommand: "npm run start",
      },
    },
    envVars,
  };
  const res = await api("/services", { method: "POST", body: JSON.stringify(body) });
  const data = await res.json();
  if (res.ok) {
    const svc = data.service || data;
    console.log(`✓ Serviço criado (plano ${plan}):`, svc.id);
    console.log("  URL:", svc.serviceDetails?.url || `https://${svc.name}.onrender.com`);
    console.log("  Dashboard:", `https://dashboard.render.com/web/${svc.id}`);
    process.exit(0);
  }
  console.log(`✗ plano ${plan} falhou (${res.status}):`, JSON.stringify(data).slice(0, 300));
}
process.exit(1);
