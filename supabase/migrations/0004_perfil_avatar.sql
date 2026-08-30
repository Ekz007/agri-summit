-- Perfil rico do participante + storage de avatares
alter table public.profiles
  add column if not exists avatar_url text,
  add column if not exists cargo text,
  add column if not exists empresa text,
  add column if not exists cidade text,
  add column if not exists linkedin text,
  add column if not exists bio text;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;
