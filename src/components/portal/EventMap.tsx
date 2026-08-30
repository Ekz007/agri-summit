"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Area = {
  id: string;
  nome: string;
  cor: string;
  desc: string;
  shape: { x: number; y: number; w: number; h: number; r?: number } | { cx: number; cy: number; rr: number };
};

const AREAS: Area[] = [
  { id: "plenaria", nome: "Plenária 360°", cor: "#d9b15a", desc: "Palco central imersivo das keynotes", shape: { x: 340, y: 90, w: 320, h: 210, r: 100 } },
  { id: "palco1", nome: "Palco 1", cor: "#7fb539", desc: "Trilhas: Inteligência que Produz", shape: { x: 70, y: 90, w: 230, h: 130, r: 18 } },
  { id: "palco2", nome: "Palco 2", cor: "#2f9aa8", desc: "Trilhas: Sustentabilidade que Gera Valor", shape: { x: 700, y: 90, w: 230, h: 130, r: 18 } },
  { id: "expo", nome: "Expositores", cor: "#56b7c7", desc: "Startup District e expo de tecnologia", shape: { x: 70, y: 340, w: 400, h: 180, r: 18 } },
  { id: "investidores", nome: "Sala Conexão com Investidores", cor: "#9b7fd4", desc: "As Rodadas de Negócio acontecem aqui", shape: { x: 530, y: 340, w: 400, h: 180, r: 18 } },
  { id: "bar", nome: "Bar Agri Summit 360°", cor: "#e6c574", desc: "Ponto de encontro e networking", shape: { cx: 500, cy: 610, rr: 70 } },
  { id: "alimentacao", nome: "Alimentação", cor: "#e08b5a", desc: "Praça de alimentação e restaurantes", shape: { x: 70, y: 560, w: 280, h: 130, r: 18 } },
  { id: "vip", nome: "VIP Lounge", cor: "#c9a2c8", desc: "Hospitality para convidados e patrocinadores", shape: { x: 650, y: 560, w: 280, h: 130, r: 18 } },
  { id: "credenciamento", nome: "Credenciamento", cor: "#8fb5a3", desc: "Check-in com pulseira ativada", shape: { x: 340, y: 740, w: 320, h: 70, r: 14 } },
  { id: "sanitarios", nome: "Sanitários", cor: "#7d97a5", desc: "Distribuídos ao longo do hall", shape: { x: 70, y: 250, w: 90, h: 60, r: 12 } },
  { id: "saidas", nome: "Saídas de emergência", cor: "#d47f7f", desc: "Sinalizadas nos quatro cantos", shape: { x: 840, y: 250, w: 90, h: 60, r: 12 } },
];

export function EventMap() {
  const [ativo, setAtivo] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* planta */}
      <div className="surface overflow-hidden rounded-2xl p-4">
        <svg viewBox="0 0 1000 860" className="w-full">
          {/* contorno do hall */}
          <rect x="30" y="40" width="940" height="780" rx="36" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          <text x="500" y="30" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="20" className="mono">
            ROYAL PALM HALL
          </text>

          {AREAS.map((a) => {
            const on = ativo === null || ativo === a.id;
            const common = {
              fill: a.cor,
              opacity: on ? (ativo === a.id ? 0.95 : 0.55) : 0.15,
              stroke: ativo === a.id ? "#fff" : "transparent",
              strokeWidth: 3,
              style: { transition: "opacity .25s, stroke .25s", cursor: "pointer" },
              onClick: () => setAtivo(ativo === a.id ? null : a.id),
            } as const;
            if ("cx" in a.shape) {
              return (
                <g key={a.id}>
                  <circle cx={a.shape.cx} cy={a.shape.cy} r={a.shape.rr} {...common} />
                  <text x={a.shape.cx} y={a.shape.cy + 5} textAnchor="middle" fontSize="17" fill="#06231b" fontWeight="600" pointerEvents="none">
                    Bar 360°
                  </text>
                </g>
              );
            }
            const s = a.shape;
            return (
              <g key={a.id}>
                <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r ?? 16} {...common} />
                <text
                  x={s.x + s.w / 2}
                  y={s.y + s.h / 2 + 5}
                  textAnchor="middle"
                  fontSize={s.w > 250 ? 19 : 15}
                  fill="#06231b"
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {a.nome.length > 22 ? a.nome.split(" ")[0] + "…" : a.nome}
                </text>
              </g>
            );
          })}

          {/* entrada */}
          <text x="500" y="845" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="16" className="mono">
            ↑ ENTRADA PRINCIPAL
          </text>
        </svg>
      </div>

      {/* legenda */}
      <div className="space-y-2.5">
        {AREAS.map((a) => (
          <button
            key={a.id}
            onClick={() => setAtivo(ativo === a.id ? null : a.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
              ativo === a.id
                ? "border-gold-400/60 bg-gold-500/10"
                : "border-white/10 bg-white/[0.03] hover:border-white/25"
            )}
          >
            <span
              className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full"
              style={{ background: a.cor }}
            />
            <span>
              <span className="block text-sm font-semibold text-cream">{a.nome}</span>
              <span className="block text-xs text-cream/60">{a.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
