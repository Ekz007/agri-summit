import { Card } from "@/components/portal/ui";
import {
  TextField,
  TextArea,
  ChipMulti,
  ChipSingle,
  SaveButton,
} from "@/components/portal/FormKit";
import { saveInvestidor } from "@/app/portal/actions";
import { SETORES, ESTAGIOS, REGIOES, TIPOS_INVESTIDOR } from "@/lib/options";
import type { Investidor } from "@/lib/supabase/types";

export function InvestidorForm({ investidor }: { investidor: Investidor | null }) {
  return (
    <form action={saveInvestidor} className="space-y-6">
      <Card className="space-y-5">
        <h2 className="font-display font-700 text-lg">Sobre o investidor</h2>
        <TextField
          label="Nome / fundo"
          name="nome"
          defaultValue={investidor?.nome}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Representante na mesa"
            name="representante"
            defaultValue={investidor?.representante}
            placeholder="Quem estará presente"
          />
          <div>
            <ChipSingle
              label="Tipo"
              name="tipo"
              options={TIPOS_INVESTIDOR}
              defaultValue={investidor?.tipo ?? ""}
            />
          </div>
        </div>
        <TextArea
          label="Tese de investimento"
          name="tese"
          defaultValue={investidor?.tese}
          placeholder="O que você procura: teses, teses de impacto, palavras-chave…"
        />
      </Card>

      <Card className="space-y-6">
        <h2 className="font-display font-700 text-lg">Preferências para o matching</h2>
        <ChipMulti
          label="Setores de interesse"
          name="setores_interesse"
          options={SETORES}
          defaultValue={investidor?.setores_interesse ?? []}
          hint="O algoritmo prioriza startups nesses setores."
        />
        <ChipMulti
          label="Estágios de interesse"
          name="estagios_interesse"
          options={ESTAGIOS}
          defaultValue={investidor?.estagios_interesse ?? []}
        />
        <ChipMulti
          label="Regiões de interesse"
          name="regioes"
          options={REGIOES}
          defaultValue={investidor?.regioes ?? []}
          hint="Deixe vazio se investe em qualquer região."
        />
      </Card>

      <Card className="space-y-5">
        <h2 className="font-display font-700 text-lg">Ticket de investimento</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Ticket mínimo (R$)"
            name="ticket_min"
            type="number"
            defaultValue={investidor?.ticket_min}
            placeholder="500000"
          />
          <TextField
            label="Ticket máximo (R$)"
            name="ticket_max"
            type="number"
            defaultValue={investidor?.ticket_max}
            placeholder="5000000"
          />
        </div>
        <p className="text-xs text-cream/45">
          A mesa fixa é atribuída pela organização quando o matching é gerado.
        </p>
      </Card>

      <SaveButton />
    </form>
  );
}
