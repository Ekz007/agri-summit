-- ============================================================
-- Agenda do evento: palestrantes + cronograma (programação)
-- ============================================================

create table if not exists public.palestrantes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cargo text,
  empresa text,
  bio text,
  foto_url text,
  destaque boolean default false,
  ordem int default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.programacao (
  id uuid primary key default gen_random_uuid(),
  dia date not null,
  inicio time not null,
  fim time,
  titulo text not null,
  local text,
  trilha text,
  palestrante_id uuid references public.palestrantes(id) on delete set null,
  destaque boolean default false,
  created_at timestamptz not null default now()
);
create index if not exists programacao_dia_idx on public.programacao(dia, inicio);

alter table public.palestrantes enable row level security;
alter table public.programacao enable row level security;

drop policy if exists "palestrantes read" on public.palestrantes;
create policy "palestrantes read" on public.palestrantes for select using (true);
drop policy if exists "palestrantes admin write" on public.palestrantes;
create policy "palestrantes admin write" on public.palestrantes for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "programacao read" on public.programacao;
create policy "programacao read" on public.programacao for select using (true);
drop policy if exists "programacao admin write" on public.programacao;
create policy "programacao admin write" on public.programacao for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------- seed: palestrantes do deck ----------
insert into public.palestrantes (nome, cargo, empresa, bio, destaque, ordem)
select * from (values
  ('Roberto Rodrigues', 'Ex-Ministro da Agricultura e Embaixador da FAO', null,
   'Engenheiro agrônomo, foi Ministro da Agricultura do Brasil e atualmente é Embaixador da FAO para a Cooperação Sul-Sul. É uma das principais referências mundiais em segurança alimentar e desenvolvimento sustentável.', true, 1),
  ('Luiza Trajano', 'Presidente do Conselho', 'Magazine Luiza',
   'Uma das empresárias mais admiradas do Brasil e referência em inovação, varejo, transformação digital e liderança.', true, 2),
  ('Bernardinho', 'Técnico e palestrante', null,
   'Como treinador, é um dos maiores campeões da história do voleibol, acumulando mais de trinta títulos importantes em mais de vinte anos de carreira.', true, 3),
  ('Marcos Jank', 'Diretor', 'Insper Agro Global',
   'Professor e pesquisador, é uma das maiores autoridades brasileiras em comércio internacional e competitividade do agronegócio.', false, 4),
  ('Vanessa Adler', 'Líder Global de Sustentabilidade', 'Bayer',
   'Lidera a agenda global de sustentabilidade da Bayer, conectando ciência, produção agrícola e compromissos climáticos.', false, 5),
  ('Richard Ford', 'Diretor Global de Inovação', 'John Deere',
   'Conduz a estratégia global de inovação da John Deere, com foco em agricultura de precisão, automação e IA aplicada ao campo.', false, 6)
) as v(nome, cargo, empresa, bio, destaque, ordem)
where not exists (select 1 from public.palestrantes limit 1);

-- ---------- seed: cronograma dos 3 dias ----------
insert into public.programacao (dia, inicio, fim, titulo, local, trilha, destaque, palestrante_id)
select d.dia::date, d.inicio::time, d.fim::time, d.titulo, d.local, d.trilha, d.destaque,
       (select id from public.palestrantes p where p.nome = d.palestrante)
from (values
  -- Dia 1 · 15 jun
  ('2027-06-15','08:00','09:00','Credenciamento e boas-vindas','Hall de Entrada',null,false,null),
  ('2027-06-15','09:00','09:45','Abertura Oficial','Palco Principal',null,true,null),
  ('2027-06-15','10:00','11:00','Liderança que transforma','Palco Principal',null,true,'Luiza Trajano'),
  ('2027-06-15','11:00','11:30','Intervalo e Networking','Área de Convivência',null,false,null),
  ('2027-06-15','11:30','12:30','O agro brasileiro no mercado global','Arena 4','Conexões que Aceleram Negócios',false,'Marcos Jank'),
  ('2027-06-15','12:30','14:00','Almoço','Área de Networking',null,false,null),
  ('2027-06-15','14:00','17:00','Rodadas de Negócio · Bloco A','Sala Conexão com Investidores',null,true,null),
  ('2027-06-15','18:00','20:00','Happy hour de networking','Bar Agri Summit 360°',null,false,null),
  -- Dia 2 · 16 jun
  ('2027-06-16','08:30','09:15','Abertura Oficial do dia','Palco Principal',null,true,null),
  ('2027-06-16','09:30','10:45','O futuro da agricultura global e o papel do Brasil','Palco Principal',null,true,'Roberto Rodrigues'),
  ('2027-06-16','11:00','11:30','Intervalo e Networking','Área de Convivência',null,false,null),
  ('2027-06-16','11:30','12:30','Inteligência Artificial no Agro','Arena 1','Inteligência que Produz',false,'Richard Ford'),
  ('2027-06-16','12:30','14:00','Almoço','Área de Networking',null,false,null),
  ('2027-06-16','14:00','15:00','Sustentabilidade que gera valor','Arena 2','Sustentabilidade que Gera Valor',false,'Vanessa Adler'),
  ('2027-06-16','14:00','17:00','Rodadas de Negócio · Bloco B','Sala Conexão com Investidores',null,true,null),
  ('2027-06-16','17:00','18:30','Demo Day de startups','Palco Principal',null,true,null),
  -- Dia 3 · 17 jun
  ('2027-06-17','09:30','10:30','A mentalidade dos campeões','Palco Principal',null,true,'Bernardinho'),
  ('2027-06-17','11:00','12:30','Ciência que transforma produção','Arena 3','Ciência que Transforma Produção',false,null),
  ('2027-06-17','12:30','14:00','Almoço','Área de Networking',null,false,null),
  ('2027-06-17','14:00','16:00','Mesas de fechamento e follow-up de deals','Sala Conexão com Investidores',null,false,null),
  ('2027-06-17','16:30','17:30','Encerramento e legado','Palco Principal',null,true,null),
  ('2027-06-17','17:30','19:00','Atração musical','Palco Principal',null,false,null)
) as d(dia, inicio, fim, titulo, local, trilha, destaque, palestrante)
where not exists (select 1 from public.programacao limit 1);
