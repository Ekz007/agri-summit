import { Card } from "@/components/portal/ui";
import {
  TextField,
  TextArea,
  ChipMulti,
  ChipSingle,
  SaveButton,
} from "@/components/portal/FormKit";
import { saveStartup } from "@/app/portal/actions";
import { SETORES, ESTAGIOS, REGIOES, TECNOLOGIAS, ODS } from "@/lib/options";
import type { Startup } from "@/lib/supabase/types";

export function StartupForm({ startup }: { startup: Startup | null }) {
  return (
    <form action={saveStartup} className="space-y-6">
      <Card className="space-y-5">
        <h2 className="font-display font-700 text-lg">Sobre a startup</h2>
        <TextField label="Nome da startup" name="nome" defaultValue={startup?.nome} required />
        <TextArea
          label="Descrição / pitch curto"
          name="descricao"
          defaultValue={startup?.descricao}
          placeholder="O que sua startup resolve no agro, em 2–3 frases."
        />
        <TextField
          label="Website"
          name="website"
          defaultValue={startup?.website}
          placeholder="https://"
          type="url"
        />
      </Card>

      <Card className="space-y-6">
        <h2 className="font-display font-700 text-lg">Perfil para o matching</h2>
        <ChipSingle
          label="Setor principal"
          name="setor"
          options={SETORES}
          defaultValue={startup?.setor ?? ""}
        />
        <ChipMulti
          label="Setores adicionais"
          name="setores"
          options={SETORES}
          defaultValue={startup?.setores ?? []}
        />
        <ChipSingle
          label="Estágio"
          name="estagio"
          options={ESTAGIOS}
          defaultValue={startup?.estagio ?? ""}
        />
        <ChipSingle
          label="Região"
          name="regiao"
          options={REGIOES}
          defaultValue={startup?.regiao ?? ""}
        />
        <ChipMulti
          label="Tecnologias"
          name="tecnologia"
          options={TECNOLOGIAS}
          defaultValue={startup?.tecnologia ?? []}
        />
        <ChipMulti
          label="ODS / impacto"
          name="ods"
          options={ODS}
          defaultValue={startup?.ods ?? []}
        />
      </Card>

      <Card className="space-y-5">
        <h2 className="font-display font-700 text-lg">Captação buscada</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Ticket mínimo (R$)"
            name="ticket_min"
            type="number"
            defaultValue={startup?.ticket_min}
            placeholder="500000"
          />
          <TextField
            label="Ticket máximo (R$)"
            name="ticket_max"
            type="number"
            defaultValue={startup?.ticket_max}
            placeholder="3000000"
          />
        </div>
      </Card>

      <SaveButton />
    </form>
  );
}
