"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Clock,
  Table2,
  ChevronDown,
  Star,
  CheckCircle2,
  Loader2,
  Timer,
} from "lucide-react";
import { Badge, ScoreRing } from "@/components/portal/ui";
import { submitAvaliacao } from "@/app/portal/actions";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/supabase/types";

export type MeetingVM = {
  id: string;
  dia: number;
  ordem: number;
  inicio: string;
  fim: string;
  intervalo: number;
  mesa_numero: number;
  score: number;
  status: string;
  counterpartName: string;
  counterpartMeta: string;
  avaliado: boolean;
};

const fmt = (t: string) => (t ? t.slice(0, 5) : "--:--");

export function MeetingCard({
  meeting: m,
  viewerRole,
}: {
  meeting: MeetingVM;
  viewerRole: UserRole;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(m.avaliado);
  const isInvestidor = viewerRole === "investidor";

  return (
    <div className="surface overflow-hidden rounded-2xl">
      <div className="flex items-stretch">
        {/* time rail */}
        <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-1 border-r border-white/8 bg-white/[0.02] p-4">
          <Clock className="h-4 w-4 text-green-400" />
          <div className="font-display font-800 text-lg tabular-nums text-cream">
            {fmt(m.inicio)}
          </div>
          <div className="text-[0.7rem] text-cream/45">— {fmt(m.fim)}</div>
        </div>

        {/* body */}
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-cream/50">
                <Table2 className="h-3.5 w-3.5" /> Mesa {m.mesa_numero} · Rodada {m.ordem}
              </div>
              <h3 className="mt-1 truncate font-display font-700 text-lg text-cream">
                {m.counterpartName}
              </h3>
              <p className="truncate text-sm text-cream/55">{m.counterpartMeta}</p>
            </div>
            <ScoreRing value={m.score} />
          </div>

          <div className="mt-3 flex items-center justify-between">
            {done ? (
              <Badge tone="green">
                <CheckCircle2 className="h-3.5 w-3.5" /> Avaliado
              </Badge>
            ) : (
              <Badge tone="gold">Avaliação pendente</Badge>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-sm font-medium text-green-300 hover:text-green-200"
            >
              {done ? "Editar avaliação" : "Avaliar"}
              <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-forest-950/40 p-5">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-gold-500/10 px-3 py-2 text-sm text-gold-300">
            <Timer className="h-4 w-4" /> Intervalo de {m.intervalo} min — registre agora, antes da
            próxima rodada.
          </div>
          <FeedbackForm
            agendaId={m.id}
            isInvestidor={isInvestidor}
            onDone={() => {
              setDone(true);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

function FeedbackForm({
  agendaId,
  isInvestidor,
  onDone,
}: {
  agendaId: string;
  isInvestidor: boolean;
  onDone: () => void;
}) {
  const [interesse, setInteresse] = useState(0);
  const [fit, setFit] = useState(0);
  const [passos, setPassos] = useState("");

  const passosOpts = isInvestidor
    ? [
        { v: "follow_up", l: "Quero follow-up" },
        { v: "avaliar", l: "Vou avaliar" },
        { v: "sem_fit", l: "Sem fit agora" },
      ]
    : [
        { v: "follow_up", l: "Tenho interesse" },
        { v: "avaliar", l: "Preciso pensar" },
        { v: "sem_fit", l: "Sem fit agora" },
      ];

  async function action(formData: FormData) {
    formData.set("interesse", String(interesse));
    formData.set("fit", String(fit));
    formData.set("proximos_passos", passos);
    await submitAvaliacao(formData);
    onDone();
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="agenda_id" value={agendaId} />

      <Stars
        label={isInvestidor ? "Interesse na startup" : "Interesse do investidor (percebido)"}
        value={interesse}
        onChange={setInteresse}
      />
      <Stars
        label="Fit com sua tese / necessidade"
        value={fit}
        onChange={setFit}
      />

      <div>
        <span className="mb-2 block text-sm font-medium text-cream/80">Próximos passos</span>
        <div className="flex flex-wrap gap-2">
          {passosOpts.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setPassos(o.v)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                passos === o.v
                  ? "border-green-400 bg-green-500/15 text-cream"
                  : "border-white/12 text-cream/65 hover:border-white/30"
              )}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-cream/80">Anotações</span>
        <textarea
          name="notas"
          rows={2}
          placeholder="Pontos-chave, contatos, próximos passos…"
          className="w-full resize-none rounded-xl border border-white/10 bg-forest-950/60 px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-green-400/60"
        />
      </label>

      <SubmitButton />
    </form>
  );
}

function Stars({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-cream/80">{label}</span>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} de 5`}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                "h-7 w-7",
                n <= value ? "fill-gold-400 text-gold-400" : "text-cream/25"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-green-400 disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
      Salvar avaliação
    </button>
  );
}
