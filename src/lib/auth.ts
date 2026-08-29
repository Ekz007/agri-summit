import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

/**
 * Returns the current auth user + profile, or null.
 * Wrapped in React cache(): layout + page share one lookup per request
 * instead of hitting Supabase twice on every navigation.
 */
export const getSessionProfile = cache(async function getSessionProfile(): Promise<{
  userId: string;
  email: string;
  profile: Profile | null;
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

  return { userId: user.id, email: user.email ?? "", profile: profile ?? null };
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
