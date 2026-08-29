"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/brand/Logo";
import { OrganicBg } from "@/components/brand/OrganicBg";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);
    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-900 px-5">
      <OrganicBg variant="soft" className="opacity-40" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-10 inline-block">
          <Logo />
        </Link>

        {sent ? (
          <div className="surface rounded-2xl p-8 text-center">
            <MailCheck className="mx-auto h-10 w-10 text-green-400" />
            <h1 className="mt-4 font-display font-800 text-xl text-cream">Verifique seu e-mail</h1>
            <p className="mt-2 text-sm text-cream/65">
              Se existir uma conta para <strong className="text-cream">{email}</strong>, você
              receberá um link para redefinir a senha.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-green-300 hover:text-green-200"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar ao login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="surface rounded-2xl p-8">
            <h1 className="font-display font-800 text-2xl tracking-tight text-cream">
              Esqueci minha senha
            </h1>
            <p className="mt-1.5 text-sm text-cream/60">
              Informe seu e-mail e enviaremos um link de redefinição.
            </p>
            <label className="mt-6 block">
              <span className="mb-1.5 block text-sm font-medium text-cream/80">E-mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com"
                className="w-full rounded-xl border border-white/10 bg-forest-950/60 px-4 py-3 text-cream placeholder:text-cream/35 outline-none focus:border-green-400/60"
              />
            </label>
            {err && (
              <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full neon-gold px-6 py-3 text-sm font-semibold disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Enviar link
            </button>
            <Link
              href="/login"
              className="mt-5 inline-flex items-center gap-2 text-sm text-cream/60 hover:text-cream"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar ao login
            </Link>
          </form>
        )}
      </div>
    </main>
  );
}
