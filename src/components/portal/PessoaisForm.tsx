"use client";

import { useRef, useState, useTransition } from "react";
import { Camera, Loader2, Check } from "lucide-react";
import { Card } from "@/components/portal/ui";
import { savePessoais } from "@/app/portal/actions";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/supabase/types";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-forest-950/60 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-gold-400/60";

export function PessoaisForm({ profile, email }: { profile: Profile; email: string }) {
  const [preview, setPreview] = useState<string | null>(profile.avatar_url);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ t: "ok" | "err"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const action = (fd: FormData) =>
    start(async () => {
      setMsg(null);
      const r = await savePessoais(fd);
      if (r?.ok === false) setMsg({ t: "err", text: r.error || "Erro ao salvar." });
      else setMsg({ t: "ok", text: "Dados salvos." });
    });

  return (
    <Card className="space-y-5">
      <h2 className="font-display font-700 text-lg">Dados pessoais</h2>

      <form action={action} className="space-y-5">
        {/* foto */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gold-400/50"
            title="Trocar foto"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Sua foto" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-gold-500/15 font-display text-3xl text-gold-400">
                {(profile.full_name || email).charAt(0).toUpperCase()}
              </span>
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-6 w-6 text-white" />
            </span>
          </button>
          <div>
            <p className="font-semibold text-cream">Foto do participante</p>
            <p className="text-xs text-cream/55">
              Aparece no seu crachá digital e nas rodadas. JPG/PNG até 3,5MB.
            </p>
            <input
              ref={fileRef}
              type="file"
              name="foto"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-cream/80">Nome completo</span>
            <input name="full_name" defaultValue={profile.full_name ?? ""} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-cream/80">Cargo</span>
            <input name="cargo" defaultValue={profile.cargo ?? ""} placeholder="Ex.: CEO, Sócia, Analista" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-cream/80">Empresa / organização</span>
            <input name="empresa" defaultValue={profile.empresa ?? ""} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-cream/80">Cidade / UF</span>
            <input name="cidade" defaultValue={profile.cidade ?? ""} placeholder="Ex.: Campinas, SP" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-cream/80">Telefone / WhatsApp</span>
            <input name="telefone" defaultValue={profile.telefone ?? ""} placeholder="(19) 9…" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-cream/80">LinkedIn</span>
            <input name="linkedin" defaultValue={profile.linkedin ?? ""} placeholder="linkedin.com/in/…" className={inputCls} />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-cream/80">Mini-bio</span>
          <textarea
            name="bio"
            rows={2}
            defaultValue={profile.bio ?? ""}
            placeholder="Quem é você no ecossistema do agro, em 1–2 frases."
            className={cn(inputCls, "resize-none")}
          />
        </label>

        {msg && (
          <p
            className={cn(
              "rounded-lg border px-3 py-2 text-sm",
              msg.t === "ok"
                ? "border-green-500/25 bg-green-500/10 text-green-300"
                : "border-red-500/25 bg-red-500/10 text-red-300"
            )}
          >
            {msg.text}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="neon-gold inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Salvar dados pessoais
        </button>
      </form>
    </Card>
  );
}
