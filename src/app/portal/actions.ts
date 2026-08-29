"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/auth";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/** Admin alterna entre visão admin e visão de participante. */
export async function toggleView() {
  const { cookies } = await import("next/headers");
  const store = await cookies();
  const atual = store.get("asb_view")?.value;
  store.set("asb_view", atual === "participante" ? "admin" : "participante", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  revalidatePath("/portal");
  redirect("/portal");
}

function arr(v: FormDataEntryValue | null): string[] {
  if (!v) return [];
  return String(v)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
function num(v: FormDataEntryValue | null): number | null {
  if (v == null || String(v).trim() === "") return null;
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export async function saveStartup(formData: FormData) {
  const session = await getSessionProfile();
  if (!session) redirect("/login");
  const supabase = await createClient();

  const payload = {
    owner_id: session.userId,
    nome: String(formData.get("nome") || "").trim(),
    descricao: String(formData.get("descricao") || "") || null,
    setor: String(formData.get("setor") || "") || null,
    setores: arr(formData.get("setores")),
    estagio: String(formData.get("estagio") || "") || null,
    ticket_min: num(formData.get("ticket_min")),
    ticket_max: num(formData.get("ticket_max")),
    tecnologia: arr(formData.get("tecnologia")),
    regiao: String(formData.get("regiao") || "") || null,
    ods: arr(formData.get("ods")),
    website: String(formData.get("website") || "") || null,
  };

  const { data: existing } = await supabase
    .from("startups")
    .select("id")
    .eq("owner_id", session.userId)
    .maybeSingle();

  if (existing) {
    await supabase.from("startups").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("startups").insert(payload);
  }
  revalidatePath("/portal/perfil");
  revalidatePath("/portal");
}

export async function saveInvestidor(formData: FormData) {
  const session = await getSessionProfile();
  if (!session) redirect("/login");
  const supabase = await createClient();

  const payload = {
    owner_id: session.userId,
    nome: String(formData.get("nome") || "").trim(),
    representante: String(formData.get("representante") || "") || null,
    tipo: String(formData.get("tipo") || "") || null,
    tese: String(formData.get("tese") || "") || null,
    setores_interesse: arr(formData.get("setores_interesse")),
    estagios_interesse: arr(formData.get("estagios_interesse")),
    ticket_min: num(formData.get("ticket_min")),
    ticket_max: num(formData.get("ticket_max")),
    regioes: arr(formData.get("regioes")),
  };

  const { data: existing } = await supabase
    .from("investidores")
    .select("id")
    .eq("owner_id", session.userId)
    .maybeSingle();

  if (existing) {
    await supabase.from("investidores").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("investidores").insert(payload);
  }
  revalidatePath("/portal/perfil");
  revalidatePath("/portal");
}

export async function submitAvaliacao(formData: FormData) {
  const session = await getSessionProfile();
  if (!session || !session.profile) redirect("/login");
  const supabase = await createClient();

  const agenda_id = String(formData.get("agenda_id") || "");
  if (!agenda_id) return;

  const payload = {
    agenda_id,
    autor_role: session.profile.role,
    autor_id: session.userId,
    interesse: Number(formData.get("interesse")) || null,
    fit: Number(formData.get("fit")) || null,
    proximos_passos: String(formData.get("proximos_passos") || "") || null,
    notas: String(formData.get("notas") || "") || null,
  };

  await supabase
    .from("avaliacoes")
    .upsert(payload, { onConflict: "agenda_id,autor_role" });

  // mark the meeting as realizado
  await supabase.from("agenda").update({ status: "realizado" }).eq("id", agenda_id);

  revalidatePath("/portal/rodadas");
}
