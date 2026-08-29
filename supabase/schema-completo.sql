-- ============================================================
-- AGRI SUMMIT BRAZIL 2027 — schema inicial
-- Portal + Rodadas de Negócio (matching startup × investidor)
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- enums ----------
do $$ begin
  create type user_role as enum ('startup', 'investidor', 'admin', 'staff');
exception when duplicate_object then null; end $$;

do $$ begin
  create type startup_status as enum ('inscrita', 'em_analise', 'aprovada', 'confirmada', 'recusada');
exception when duplicate_object then null; end $$;

do $$ begin
  create type agenda_status as enum ('agendado', 'realizado', 'no_show', 'cancelado');
exception when duplicate_object then null; end $$;

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role user_role not null default 'startup',
  telefone text,
  created_at timestamptz not null default now()
);

-- ---------- startups ----------
create table if not exists public.startups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  nome text not null,
  logo_url text,
  descricao text,
  setor text,                         -- vertical agtech principal
  setores text[] default '{}',        -- verticais adicionais
  estagio text,                       -- ideacao | mvp | tracao | scale
  ticket_min numeric,                 -- captação buscada (R$)
  ticket_max numeric,
  tecnologia text[] default '{}',     -- IA, IoT, biotech, ...
  regiao text,                        -- UF / região
  ods text[] default '{}',            -- Objetivos de Desenvolvimento Sustentável
  website text,
  pitch_deck_url text,
  status startup_status not null default 'inscrita',
  created_at timestamptz not null default now()
);

-- ---------- investidores ----------
create table if not exists public.investidores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  nome text not null,                 -- nome do fundo / investidor
  representante text,                 -- pessoa presente na mesa
  tipo text,                          -- fundo | anjo | cvc | family_office
  logo_url text,
  tese text,
  setores_interesse text[] default '{}',
  estagios_interesse text[] default '{}',
  ticket_min numeric,
  ticket_max numeric,
  regioes text[] default '{}',
  mesa_numero int,                    -- mesa fixa do investidor
  created_at timestamptz not null default now()
);

-- ---------- rodadas (janelas de tempo) ----------
create table if not exists public.rodadas (
  id uuid primary key default gen_random_uuid(),
  dia int not null,                   -- 1 | 2
  ordem int not null,                 -- nº da rodada no dia
  inicio time not null,
  fim time not null,
  duracao_conversa int not null default 15,
  intervalo int not null default 5,
  unique (dia, ordem)
);

-- ---------- matches (score do algoritmo, produto cartesiano) ----------
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid not null references public.startups(id) on delete cascade,
  investidor_id uuid not null references public.investidores(id) on delete cascade,
  score numeric not null default 0,
  breakdown jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique (startup_id, investidor_id)
);
create index if not exists matches_startup_idx on public.matches(startup_id);
create index if not exists matches_investidor_idx on public.matches(investidor_id);

-- ---------- agenda (encontros agendados = saída do scheduler) ----------
create table if not exists public.agenda (
  id uuid primary key default gen_random_uuid(),
  rodada_id uuid not null references public.rodadas(id) on delete cascade,
  dia int not null,
  mesa_numero int not null,
  investidor_id uuid not null references public.investidores(id) on delete cascade,
  startup_id uuid not null references public.startups(id) on delete cascade,
  score numeric not null default 0,
  status agenda_status not null default 'agendado',
  created_at timestamptz not null default now(),
  unique (rodada_id, mesa_numero),          -- 1 startup por mesa por rodada
  unique (rodada_id, startup_id),           -- 1 mesa por startup por rodada
  unique (investidor_id, startup_id)        -- sem pares repetidos no evento
);
create index if not exists agenda_startup_idx on public.agenda(startup_id);
create index if not exists agenda_investidor_idx on public.agenda(investidor_id);
create index if not exists agenda_dia_idx on public.agenda(dia);

-- ---------- avaliações (formulário do intervalo de 5 min) ----------
create table if not exists public.avaliacoes (
  id uuid primary key default gen_random_uuid(),
  agenda_id uuid not null references public.agenda(id) on delete cascade,
  autor_role user_role not null,            -- quem avaliou (investidor/startup)
  autor_id uuid references public.profiles(id) on delete set null,
  interesse int check (interesse between 1 and 5),
  fit int check (fit between 1 and 5),
  proximos_passos text,                     -- follow_up | avaliar | sem_fit
  notas text,
  created_at timestamptz not null default now(),
  unique (agenda_id, autor_role)
);

-- ---------- arquivos (aba Arquivos do portal) ----------
create table if not exists public.arquivos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  categoria text default 'geral',
  url text not null,
  tipo text,                                -- pdf | doc | video | link
  tamanho text,
  visivel_para user_role[] default '{startup,investidor,admin,staff}',
  destaque boolean default false,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- config do evento (singleton) ----------
create table if not exists public.evento_config (
  id int primary key default 1,
  matching_gerado_em timestamptz,
  agenda_publicada boolean default false,
  pesos jsonb not null default
    '{"setor":40,"estagio":25,"ticket":20,"regiao":10,"tese":5}',
  constraint config_singleton check (id = 1)
);
insert into public.evento_config (id) values (1) on conflict (id) do nothing;

-- ============================================================
-- Auto-provision de profile no signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'startup')
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- helper: is admin/staff
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','staff')
  );
$$;

-- ============================================================
-- RLS
-- ============================================================
alter table public.profiles     enable row level security;
alter table public.startups     enable row level security;
alter table public.investidores enable row level security;
alter table public.rodadas      enable row level security;
alter table public.matches      enable row level security;
alter table public.agenda       enable row level security;
alter table public.avaliacoes   enable row level security;
alter table public.arquivos     enable row level security;
alter table public.evento_config enable row level security;

-- profiles
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select
  using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update
  using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

-- startups: dono gerencia; investidores/staff leem
drop policy if exists "startups read" on public.startups;
create policy "startups read" on public.startups for select
  using (true);   -- perfis autenticados podem ver o catálogo de startups
drop policy if exists "startups owner write" on public.startups;
create policy "startups owner write" on public.startups for all
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

-- investidores
drop policy if exists "investidores read" on public.investidores;
create policy "investidores read" on public.investidores for select
  using (true);
drop policy if exists "investidores owner write" on public.investidores;
create policy "investidores owner write" on public.investidores for all
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

-- rodadas: leitura para todos autenticados; escrita admin
drop policy if exists "rodadas read" on public.rodadas;
create policy "rodadas read" on public.rodadas for select using (true);
drop policy if exists "rodadas admin write" on public.rodadas;
create policy "rodadas admin write" on public.rodadas for all
  using (public.is_admin()) with check (public.is_admin());

-- matches: participante lê os seus; admin tudo
drop policy if exists "matches read own" on public.matches;
create policy "matches read own" on public.matches for select using (
  public.is_admin()
  or exists (select 1 from public.startups s where s.id = startup_id and s.owner_id = auth.uid())
  or exists (select 1 from public.investidores i where i.id = investidor_id and i.owner_id = auth.uid())
);
drop policy if exists "matches admin write" on public.matches;
create policy "matches admin write" on public.matches for all
  using (public.is_admin()) with check (public.is_admin());

-- agenda: participante lê os seus; admin tudo
drop policy if exists "agenda read own" on public.agenda;
create policy "agenda read own" on public.agenda for select using (
  public.is_admin()
  or exists (select 1 from public.startups s where s.id = startup_id and s.owner_id = auth.uid())
  or exists (select 1 from public.investidores i where i.id = investidor_id and i.owner_id = auth.uid())
);
drop policy if exists "agenda admin write" on public.agenda;
create policy "agenda admin write" on public.agenda for all
  using (public.is_admin()) with check (public.is_admin());

-- avaliações: autor gerencia as suas; participantes/admin leem as do próprio encontro
drop policy if exists "avaliacoes read" on public.avaliacoes;
create policy "avaliacoes read" on public.avaliacoes for select using (
  public.is_admin()
  or exists (
    select 1 from public.agenda a
    left join public.startups s on s.id = a.startup_id
    left join public.investidores i on i.id = a.investidor_id
    where a.id = agenda_id and (s.owner_id = auth.uid() or i.owner_id = auth.uid())
  )
);
drop policy if exists "avaliacoes author write" on public.avaliacoes;
create policy "avaliacoes author write" on public.avaliacoes for all
  using (autor_id = auth.uid() or public.is_admin())
  with check (autor_id = auth.uid() or public.is_admin());

-- arquivos: visível conforme role; escrita admin
drop policy if exists "arquivos read" on public.arquivos;
create policy "arquivos read" on public.arquivos for select using (
  public.is_admin()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = any(visivel_para)
  )
);
drop policy if exists "arquivos admin write" on public.arquivos;
create policy "arquivos admin write" on public.arquivos for all
  using (public.is_admin()) with check (public.is_admin());

-- config
drop policy if exists "config read" on public.evento_config;
create policy "config read" on public.evento_config for select using (true);
drop policy if exists "config admin write" on public.evento_config;
create policy "config admin write" on public.evento_config for all
  using (public.is_admin()) with check (public.is_admin());
-- ============================================================
-- Seed das rodadas (janelas de 15min + 5min de intervalo)
-- Dia 1 e Dia 2 — 8 rodadas cada, início às 14:00.
-- ============================================================
insert into public.rodadas (dia, ordem, inicio, fim, duracao_conversa, intervalo)
select d.dia, g.ordem,
       (time '14:00' + ((g.ordem - 1) * interval '20 minutes')),
       (time '14:00' + ((g.ordem - 1) * interval '20 minutes') + interval '15 minutes'),
       15, 5
from (select 1 as dia union all select 2) d
cross join generate_series(1, 8) as g(ordem)
on conflict (dia, ordem) do nothing;
