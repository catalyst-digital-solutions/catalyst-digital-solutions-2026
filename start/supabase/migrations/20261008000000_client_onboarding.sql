-- Catalyst client onboarding (start.catalyst-digital-solutions.com/{client}/onboarding)
--
-- All access goes through the Next.js server with the service-role key.
-- RLS is enabled with NO policies, and anon/authenticated are revoked, so the
-- public Supabase API cannot read or write any of these tables.

create extension if not exists pgcrypto;

create table if not exists public.onboarding_instances (
  id              uuid primary key default gen_random_uuid(),
  client_slug     text not null check (client_slug ~ '^[a-z0-9-]{2,60}$'),
  config_version  text not null,
  client_name     text not null,
  contact_name    text,
  contact_email   text not null,
  status          text not null default 'ready'
                  check (status in ('ready', 'in_progress', 'submitted', 'complete', 'archived')),
  current_view    text not null default 'intro'
                  check (current_view in ('intro', 'wizard', 'review', 'submitted')),
  current_step    integer not null default 0 check (current_step >= 0 and current_step < 100),
  visited         jsonb not null default '{}'::jsonb,
  opened_at       timestamptz,
  started_at      timestamptz,
  last_saved_at   timestamptz,
  submitted_at    timestamptz,
  completed_at    timestamptz,
  submission      jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists onboarding_instances_slug_idx on public.onboarding_instances (client_slug, created_at desc);
create index if not exists onboarding_instances_email_idx on public.onboarding_instances (client_slug, lower(contact_email));

create table if not exists public.onboarding_access_tokens (
  id            uuid primary key default gen_random_uuid(),
  instance_id   uuid not null references public.onboarding_instances (id) on delete cascade,
  token_hash    text not null unique check (char_length(token_hash) = 64), -- sha256 hex; raw token is never stored
  email         text not null,
  expires_at    timestamptz not null,
  created_at    timestamptz not null default now(),
  last_used_at  timestamptz,
  use_count     integer not null default 0,
  revoked_at    timestamptz
);
create index if not exists onboarding_access_tokens_instance_idx on public.onboarding_access_tokens (instance_id);

create table if not exists public.onboarding_field_responses (
  instance_id    uuid not null references public.onboarding_instances (id) on delete cascade,
  section_id     text not null,
  field_id       text not null,
  field_type     text not null,
  source_value   jsonb,           -- what Catalyst pre-filled (snapshot)
  client_value   jsonb,           -- what the client entered / confirmed
  status         text not null,   -- confirmed | modified | answered | unanswered
  review_status  text not null,   -- confirmed | updated | optional | needed
  confirmed_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  primary key (instance_id, field_id)
);

create table if not exists public.onboarding_files (
  id              uuid primary key default gen_random_uuid(),
  instance_id     uuid not null references public.onboarding_instances (id) on delete cascade,
  field_id        text not null,
  category        text,
  original_name   text not null,
  size_bytes      bigint not null check (size_bytes >= 0 and size_bytes <= 52428800),
  mime_type       text not null,
  storage_bucket  text not null default 'onboarding-uploads',
  storage_path    text not null unique,
  status          text not null default 'pending' check (status in ('pending', 'uploaded', 'removed', 'failed')),
  created_at      timestamptz not null default now(),
  uploaded_at     timestamptz,
  removed_at      timestamptz
);
create index if not exists onboarding_files_instance_idx on public.onboarding_files (instance_id, status);

create table if not exists public.onboarding_events (
  id           bigint generated always as identity primary key,
  instance_id  uuid references public.onboarding_instances (id) on delete cascade,
  type         text not null,
  section_id   text,
  meta         jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now()
);
create index if not exists onboarding_events_instance_idx on public.onboarding_events (instance_id, type, created_at);
create index if not exists onboarding_events_type_idx on public.onboarding_events (type, created_at);

-- updated_at maintenance
create or replace function public.onboarding_touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists onboarding_instances_touch on public.onboarding_instances;
create trigger onboarding_instances_touch before update on public.onboarding_instances
  for each row execute function public.onboarding_touch_updated_at();

drop trigger if exists onboarding_field_responses_touch on public.onboarding_field_responses;
create trigger onboarding_field_responses_touch before update on public.onboarding_field_responses
  for each row execute function public.onboarding_touch_updated_at();

-- Lock down: service role only.
alter table public.onboarding_instances       enable row level security;
alter table public.onboarding_access_tokens   enable row level security;
alter table public.onboarding_field_responses enable row level security;
alter table public.onboarding_files           enable row level security;
alter table public.onboarding_events          enable row level security;

do $$
declare r text;
begin
  foreach r in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      execute format('revoke all on public.onboarding_instances, public.onboarding_access_tokens, public.onboarding_field_responses, public.onboarding_files, public.onboarding_events from %I', r);
      execute format('revoke all on function public.onboarding_touch_updated_at() from %I', r);
    end if;
  end loop;
end $$;

-- Private storage bucket for uploads (signed URLs only; 50 MB cap).
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'storage' and table_name = 'buckets') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'onboarding-uploads', 'onboarding-uploads', false, 52428800,
      array[
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv', 'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain', 'application/rtf',
        'image/jpeg', 'image/png', 'image/heic', 'image/webp', 'image/gif',
        'application/zip', 'video/quicktime', 'video/mp4'
      ]
    )
    on conflict (id) do update
      set public = false,
          file_size_limit = excluded.file_size_limit,
          allowed_mime_types = excluded.allowed_mime_types;
  end if;
end $$;
