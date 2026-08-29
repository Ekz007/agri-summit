"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Star,
  MapPin,
  ChevronDown,
  Plus,
  Trash2,
  Loader2,
  Mic2,
} from "lucide-react";
import { Badge, Card } from "@/components/portal/ui";
import {
  createPalestrante,
  createProgramacaoItem,
  deletePalestrante,
  deleteProgramacaoItem,
} from "@/app/portal/admin/actions";
import { cn } from "@/lib/utils";

export type PalestranteVM = {
  id: string;
  nome: string;
  cargo: string | null;
  empresa: string | null;
  bio: string | null;
  destaque: boolean;
  foto: string | null;
};

function Avatar({ p, size = 12 }: { p: PalestranteVM; size?: 10 | 12 | 14 }) {
  const cls = { 10: "h-10 w-10", 12: "h-12 w-12", 14: "h-14 w-14" }[size];
  return p.foto ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.foto}
      alt={p.nome}
      className={cn(cls, "shrink-0 rounded-full border border-gold-400/40 object-cover")}
    />
  ) : (
    <div
      className={cn(
        cls,
        "flex shrink-0 items-center justify-center rounded-full bg-gold-500/15 font-display text-lg text-gold-400"
      )}
    >
      {p.nome.charAt(0)}
    </div>
  );
}

export type ItemVM = {
  id: string;
  dia: string; // 2027-06-15
  inicio: string;
  fim: string | null;
  titulo: string;
  local: string | null;
  trilha: string | null;
  destaque: boolean;
  palestrante: PalestranteVM | null;
};

const DIAS = [
  { key: "2027-06-15", label: "15 jun", nome: "Dia 1" },
  { key: "2027-06-16", label: "16 jun", nome: "Dia 2" },
  { key: "2027-06-17", label: "17 jun", nome: "Dia 3" },
];

export function AgendaView({
  items,
  palestrantes,
  isAdmin,
}: {
  items: ItemVM[];
  palestrantes: PalestranteVM[];
  isAdmin: boolean;
}) {
  const [dia, setDia] = useState(DIAS[1].key);
  const [bioOpen, setBioOpen] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const doDia = useMemo(() => items.filter((i) => i.dia === dia), [items, dia]);

  const remover = (kind: "item" | "pal", id: string) =>
    start(async () => {
      if (kind === "item") await deleteProgramacaoItem(id);
      else await deletePalestrante(id);
    });

  return (
    <div className="space-y-14">
      {/* ---------- Cronograma ---------- */}
      <section>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {DIAS.map((d) => (
            <button
              key={d.key}
              onClick={() => setDia(d.key)}
              className={cn(
                "rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors",
                dia === d.key
                  ? "border-gold-400/60 bg-gold-500/15 text-gold-300"
                  : "border-white/12 text-cream/70 hover:border-white/30"
              )}
            >
              {d.nome} <span className="mono text-xs opacity-70">· {d.label}</span>
            </button>
          ))}
        </div>

        <div className="surface overflow-hidden rounded-2xl">
          {doDia.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-cream/55">
              Nenhum item cadastrado para este dia.
            </p>
          )}
          <ul className="divide-y divide-white/8">
            {doDia.map((i) => (
              <li key={i.id} className={cn("px-5 py-4", i.destaque && "bg-gold-500/[0.05]")}>
                <div className="flex items-start gap-4">
                  <div className="w-16 shrink-0 pt-0.5">
                    <div className="mono text-sm font-500 text-sky-400">{i.inicio}</div>
                    {i.fim && <div className="mono text-xs text-cream/45">{i.fim}</div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {i.destaque && (
                        <Star className="h-4 w-4 shrink-0 fill-gold-400 text-gold-400" />
                      )}
                      <h3 className="font-display font-700 text-cream">{i.titulo}</h3>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream/60">
                      {i.local && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-sky-400" /> {i.local}
                        </span>
                      )}
                      {i.trilha && <Badge tone="ocean">{i.trilha}</Badge>}
                    </div>

                    {i.palestrante && (
                      <button
                        onClick={() =>
                          setBioOpen(bioOpen === i.id ? null : i.id)
                        }
                        className="mt-2 flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200"
                      >
                        <Mic2 className="h-3.5 w-3.5" />
                        {i.palestrante.nome}
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            bioOpen === i.id && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                    {i.palestrante && bioOpen === i.id && (
                      <div className="mt-2 flex gap-4 rounded-xl border border-white/10 bg-forest-950/50 p-4 text-sm">
                        <Avatar p={i.palestrante} size={14} />
                        <div>
                          <p className="font-semibold text-cream">
                            {i.palestrante.nome}
                            <span className="ml-2 font-normal text-cream/60">
                              {[i.palestrante.cargo, i.palestrante.empresa]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </p>
                          {i.palestrante.bio && (
                            <p className="mt-1.5 leading-relaxed text-cream/75">
                              {i.palestrante.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => remover("item", i.id)}
                      disabled={pending}
                      title="Remover item"
                      className="rounded-md border border-red-500/25 p-1.5 text-red-300/80 hover:bg-red-500/10 disabled:opacity-40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {isAdmin && <NovoItemForm palestrantes={palestrantes} />}
      </section>

      {/* ---------- Palestrantes ---------- */}
      <section>
        <h2 className="mb-5 font-display font-800 text-xl text-cream">Palestrantes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {palestrantes.map((p) => (
            <Card key={p.id} className={cn("relative h-full", p.destaque && "border border-gold-400/30")}>
              {isAdmin && (
                <button
                  onClick={() => remover("pal", p.id)}
                  disabled={pending}
                  title="Remover palestrante"
                  className="absolute right-3 top-3 rounded-md border border-red-500/25 p-1.5 text-red-300/80 hover:bg-red-500/10 disabled:opacity-40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
              <div className="flex items-center gap-3">
                <Avatar p={p} />
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-display font-700 text-cream">
                    {p.nome}
                    {p.destaque && <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />}
                  </p>
                  <p className="truncate text-xs text-cream/60">
                    {[p.cargo, p.empresa].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
              {p.bio && (
                <p className="mt-3 text-sm leading-relaxed text-cream/75">{p.bio}</p>
              )}
            </Card>
          ))}
        </div>

        {isAdmin && <NovoPalestranteForm />}
      </section>
    </div>
  );
}

/* ---------- Admin forms ---------- */
function FormShell({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-2.5 text-sm font-medium text-cream/75 hover:border-gold-400/50 hover:text-cream"
      >
        <Plus className="h-4 w-4 text-gold-400" /> {title}
      </button>
      {open && <div className="surface mt-3 rounded-2xl p-5">{children}</div>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-forest-950/60 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-gold-400/60";

function SubmitBtn({ label }: { label: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="submit"
      className="neon-green rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
    >
      {label}
    </button>
  );
}

function NovoItemForm({ palestrantes }: { palestrantes: PalestranteVM[] }) {
  return (
    <FormShell title="Cadastrar item no cronograma">
      <form action={async (fd: FormData) => { await createProgramacaoItem(fd); }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <select name="dia" className={inputCls} defaultValue="2027-06-15">
          {DIAS.map((d) => (
            <option key={d.key} value={d.key} className="bg-forest-950">
              {d.nome} · {d.label}
            </option>
          ))}
        </select>
        <input name="inicio" type="time" required defaultValue="09:00" className={inputCls} />
        <input name="fim" type="time" className={inputCls} />
        <input name="titulo" required placeholder="Título da atividade" className={cn(inputCls, "sm:col-span-2")} />
        <input name="local" placeholder="Local (ex.: Palco Principal)" className={inputCls} />
        <input name="trilha" placeholder="Trilha (ex.: Inteligência que Produz)" className={inputCls} />
        <select name="palestrante_id" className={inputCls} defaultValue="">
          <option value="" className="bg-forest-950">Sem palestrante</option>
          {palestrantes.map((p) => (
            <option key={p.id} value={p.id} className="bg-forest-950">{p.nome}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-cream/75">
          <input type="checkbox" name="destaque" className="h-4 w-4 accent-[#d9b15a]" /> Destaque
        </label>
        <div className="sm:col-span-2 lg:col-span-3">
          <SubmitBtn label="Adicionar ao cronograma" />
        </div>
      </form>
    </FormShell>
  );
}

function NovoPalestranteForm() {
  return (
    <FormShell title="Cadastrar palestrante">
      <form action={async (fd: FormData) => { await createPalestrante(fd); }} className="grid gap-3 sm:grid-cols-2">
        <input name="nome" required placeholder="Nome" className={inputCls} />
        <input name="cargo" placeholder="Cargo (ex.: Diretor Global de Inovação)" className={inputCls} />
        <input name="empresa" placeholder="Empresa / instituição" className={inputCls} />
        <label className="flex items-center gap-2 text-sm text-cream/75">
          <input type="checkbox" name="destaque" className="h-4 w-4 accent-[#d9b15a]" /> Destaque
        </label>
        <textarea
          name="bio"
          rows={3}
          placeholder="Descrição / biografia do palestrante"
          className={cn(inputCls, "sm:col-span-2 resize-none")}
        />
        <div className="sm:col-span-2">
          <SubmitBtn label="Cadastrar palestrante" />
        </div>
      </form>
    </FormShell>
  );
}
