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
