"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Rocket, Landmark, Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/supabase/types";

type Tab = "login" | "inscricao";

export function AuthPanel() {
  const router = useRouter();
  const params = useSearchParams();
  const nextUrl = params.get("next") || "/portal";
  const [tab, setTab] = useState<Tab>(
    params.get("tab") === "inscricao" ? "inscricao" : "login"
  );
  const [role, setRole] = useState<UserRole>("startup");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "err" | "ok"; text: string } | null>(null);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      if (tab === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        router.push(nextUrl);
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { data: { full_name: nome, role } },
        });
        if (error) throw error;
        if (data.session) {
          router.push("/portal");
          router.refresh();
        } else {
          setMsg({
            type: "ok",
            text: "Inscrição criada! Verifique seu e-mail para confirmar o acesso.",
          });
          setTab("login");
        }
      }
    } catch (err: unknown) {
      setMsg({ type: "err", text: friendly(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 grid grid-cols-2 gap-1 rounded-full bg-white/5 p-1">
        {(["login", "inscricao"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setMsg(null);
            }}
            className={cn(
              "rounded-full py-2.5 text-sm font-semibold transition-all",
              tab === t ? "bg-green-500 text-ink" : "text-cream/70 hover:text-cream"
            )}
          >
            {t === "login" ? "Entrar" : "Inscreva-se"}
          </button>
        ))}
      </div>

      <h1 className="font-display font-800 text-2xl tracking-tight text-cream">
        {tab === "login" ? "Acesse o portal" : "Crie sua inscrição"}
      </h1>
      <p className="mt-1.5 text-sm text-cream/60">
        {tab === "login"
          ? "Entre para ver sua agenda de rodadas e materiais."
          : "Startup ou investidor? Escolha seu perfil para começar."}
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        {tab === "inscricao" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <RoleCard
                active={role === "startup"}
                onClick={() => setRole("startup")}
                icon={Rocket}
                label="Startup"
                sub="Busco investimento"
              />
              <RoleCard
                active={role === "investidor"}
                onClick={() => setRole("investidor")}
                icon={Landmark}
                label="Investidor"
                sub="Busco startups"
              />
            </div>
            <Field
              label={role === "startup" ? "Nome da startup" : "Nome / fundo"}
              value={nome}
              onChange={setNome}
              placeholder={role === "startup" ? "Ex.: Verde Bio" : "Ex.: AgroVentures Capital"}
              required
            />
          </>
        )}

        <Field
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="voce@empresa.com"
          required
        />
        <Field
          label="Senha"
          type="password"
          value={senha}
          onChange={setSenha}
          placeholder="••••••••"
          required
          minLength={6}
        />

        {msg && (
          <div
            className={cn(
              "rounded-xl px-4 py-3 text-sm",
              msg.type === "err"
                ? "bg-red-500/10 text-red-300 border border-red-500/20"
                : "bg-green-500/10 text-green-300 border border-green-500/20"
            )}
          >
            {msg.text}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {tab === "login" ? "Entrar" : "Criar inscrição"}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-cream/45">
        Ao continuar você concorda com os termos do Agri Summit Brazil 2027.
      </p>
    </div>
  );
}

function RoleCard({
  active,
  onClick,
  icon: Icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-green-400 bg-green-500/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/25"
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-green-400" : "text-cream/60")} />
      <div className="mt-2 font-display font-700 text-cream">{label}</div>
      <div className="text-xs text-cream/55">{sub}</div>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-cream/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="w-full rounded-xl border border-white/10 bg-forest-950/60 px-4 py-3 text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-green-400/60"
      />
    </label>
  );
}

function friendly(err: unknown): string {
  const m = err instanceof Error ? err.message : String(err);
  if (/invalid login credentials/i.test(m)) return "E-mail ou senha incorretos.";
  if (/already registered|already been registered/i.test(m))
    return "Este e-mail já tem cadastro. Faça login.";
  if (/password should be at least/i.test(m)) return "A senha precisa ter ao menos 6 caracteres.";
  return m;
}
