import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

/**
 * Returns the current auth user + profile, or null.
 * Wrapped in React cache(): layout + page share one lookup per request.
 * Admins can flip the "asb_view" cookie to browse the portal as a
 * participant — `profile.role` then reads "startup" while `realRole`
 * keeps the true role for the shell toggle.
 */
export const getSessionProfile = cache(async function getSessionProfile(): Promise<{
  userId: string;
  email: string;
  profile: Profile | null;
  realRole: Profile["role"] | null;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const realRole = (profile?.role ?? null) as Profile["role"] | null;
  let effective = (profile ?? null) as Profile | null;

  // admin browsing as participant
  if (effective && ["admin", "staff"].includes(effective.role)) {
    const { cookies } = await import("next/headers");
    const view = (await cookies()).get("asb_view")?.value;
    if (view === "participante") {
      effective = { ...effective, role: "startup" };
    }
  }

  return { userId: user.id, email: user.email ?? "", profile: effective, realRole };
});

export async function requireProfile() {
  const session = await getSessionProfile();
  if (!session) redirect("/login");
  return session;
}

export async function requireAdmin() {
  const session = await requireProfile();
  if (!session.profile || !["admin", "staff"].includes(session.profile.role)) {
    redirect("/portal");
  }
  return session;
}
