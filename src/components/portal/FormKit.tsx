"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function TextField({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  type = "text",
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-cream/80">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-forest-950/60 px-4 py-3 text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-green-400/60"
      />
      {hint && <span className="mt-1 block text-xs text-cream/45">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-cream/80">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-white/10 bg-forest-950/60 px-4 py-3 text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-green-400/60"
      />
    </label>
  );
}

/** Multi-select chips backed by a hidden comma-separated input. */
export function ChipMulti({
  label,
  name,
  options,
  defaultValue = [],
  hint,
}: {
  label: string;
  name: string;
  options: readonly string[] | readonly { v: string; l: string }[];
  defaultValue?: string[];
  hint?: string;
}) {
  const norm = options.map((o) => (typeof o === "string" ? { v: o, l: o } : o));
  const [sel, setSel] = useState<string[]>(defaultValue);
  const toggle = (v: string) =>
    setSel((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-cream/80">{label}</span>
      <input type="hidden" name={name} value={sel.join(",")} />
      <div className="flex flex-wrap gap-2">
        {norm.map((o) => {
          const active = sel.includes(o.v);
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => toggle(o.v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "border-green-400 bg-green-500/15 text-cream"
                  : "border-white/12 text-cream/65 hover:border-white/30"
              )}
            >
              {active && <Check className="h-3.5 w-3.5 text-green-400" />}
              {o.l}
            </button>
          );
        })}
      </div>
      {hint && <span className="mt-1.5 block text-xs text-cream/45">{hint}</span>}
    </div>
  );
}

/** Single-select chips backed by a hidden input. */
export function ChipSingle({
  label,
  name,
  options,
  defaultValue = "",
}: {
  label: string;
  name: string;
  options: readonly string[] | readonly { v: string; l: string }[];
  defaultValue?: string;
}) {
  const norm = options.map((o) => (typeof o === "string" ? { v: o, l: o } : o));
  const [sel, setSel] = useState<string>(defaultValue);
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-cream/80">{label}</span>
      <input type="hidden" name={name} value={sel} />
      <div className="flex flex-wrap gap-2">
        {norm.map((o) => {
          const active = sel === o.v;
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => setSel(o.v)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "border-green-400 bg-green-500/15 text-cream"
                  : "border-white/12 text-cream/65 hover:border-white/30"
              )}
            >
              {o.l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SaveButton({ label = "Salvar perfil" }: { label?: string }) {
  const { pending } = useFormStatus();
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() => {
        setSaved(false);
        setTimeout(() => setSaved(true), 900);
      }}
      className="inline-flex items-center justify-center gap-2 rounded-full neon-gold px-7 py-3 text-sm font-semibold disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : null}
      {pending ? "Salvando…" : label}
    </button>
  );
}
