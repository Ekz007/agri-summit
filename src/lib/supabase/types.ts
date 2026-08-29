// Hand-authored types for the Agri Summit schema.
export type UserRole = "startup" | "investidor" | "admin" | "staff";
export type StartupStatus =
  | "inscrita"
  | "em_analise"
  | "aprovada"
  | "confirmada"
  | "recusada";
export type AgendaStatus = "agendado" | "realizado" | "no_show" | "cancelado";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  telefone: string | null;
  created_at: string;
}

export interface Startup {
  id: string;
  owner_id: string | null;
  nome: string;
  logo_url: string | null;
  descricao: string | null;
  setor: string | null;
  setores: string[];
  estagio: string | null;
  ticket_min: number | null;
  ticket_max: number | null;
  tecnologia: string[];
  regiao: string | null;
  ods: string[];
  website: string | null;
  pitch_deck_url: string | null;
  status: StartupStatus;
  created_at: string;
}

export interface Investidor {
  id: string;
  owner_id: string | null;
  nome: string;
  representante: string | null;
  tipo: string | null;
  logo_url: string | null;
  tese: string | null;
  setores_interesse: string[];
  estagios_interesse: string[];
  ticket_min: number | null;
  ticket_max: number | null;
  regioes: string[];
  mesa_numero: number | null;
  created_at: string;
}

export interface Rodada {
  id: string;
  dia: number;
  ordem: number;
  inicio: string;
  fim: string;
  duracao_conversa: number;
  intervalo: number;
}

export interface Match {
  id: string;
  startup_id: string;
  investidor_id: string;
  score: number;
  breakdown: Record<string, number>;
  created_at: string;
}

export interface AgendaItem {
  id: string;
  rodada_id: string;
  dia: number;
  mesa_numero: number;
  investidor_id: string;
  startup_id: string;
  score: number;
  status: AgendaStatus;
  created_at: string;
}

export interface Avaliacao {
  id: string;
  agenda_id: string;
  autor_role: UserRole;
  autor_id: string | null;
  interesse: number | null;
  fit: number | null;
  proximos_passos: string | null;
  notas: string | null;
  created_at: string;
}

export interface Arquivo {
  id: string;
  titulo: string;
  descricao: string | null;
  categoria: string;
  url: string;
  tipo: string | null;
  tamanho: string | null;
  visivel_para: UserRole[];
  destaque: boolean;
  uploaded_by: string | null;
  created_at: string;
}

export interface EventoConfig {
  id: number;
  matching_gerado_em: string | null;
  agenda_publicada: boolean;
  pesos: Record<string, number>;
}

type Table<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      profiles: Table<Profile>;
      startups: Table<Startup>;
      investidores: Table<Investidor>;
      rodadas: Table<Rodada>;
      matches: Table<Match>;
      agenda: Table<AgendaItem>;
      avaliacoes: Table<Avaliacao>;
      arquivos: Table<Arquivo>;
      evento_config: Table<EventoConfig>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      startup_status: StartupStatus;
      agenda_status: AgendaStatus;
    };
  };
}
