-- ENUMS
create type public.app_role as enum ('admin', 'student');
create type public.plan_tier as enum ('free', 'pro_monthly', 'pro_yearly');
create type public.subscription_status as enum ('active', 'pending', 'expired', 'cancelled');
create type public.payment_method as enum ('chapa', 'manual_bank');
create type public.payment_status as enum ('pending', 'verified', 'rejected');

-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text,
  full_name text,
  region text,
  grade text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Profiles are viewable by owner" on public.profiles for select using (auth.uid() = id);
create policy "Profiles are updatable by owner" on public.profiles for update using (auth.uid() = id);
create policy "Profiles are insertable by owner" on public.profiles for insert with check (auth.uid() = id);

-- USER ROLES
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Roles are viewable by owner" on public.user_roles for select using (auth.uid() = user_id);
create policy "Admins can manage roles" on public.user_roles for all using (public.has_role(auth.uid(), 'admin'));

-- SUBSCRIPTIONS
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier public.plan_tier not null default 'free',
  status public.subscription_status not null default 'active',
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index subscriptions_user_id_idx on public.subscriptions(user_id);
create index subscriptions_status_idx on public.subscriptions(status);
alter table public.subscriptions enable row level security;
create policy "Subscriptions readable by owner" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Admins can manage subscriptions" on public.subscriptions for all using (public.has_role(auth.uid(), 'admin'));

create or replace function public.has_active_pro(_user_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions
    where user_id = _user_id and status = 'active'
      and tier in ('pro_monthly', 'pro_yearly')
      and (current_period_end is null or current_period_end > now())
  )
$$;

-- PAYMENTS
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier public.plan_tier not null,
  amount_etb integer not null,
  method public.payment_method not null,
  status public.payment_status not null default 'pending',
  chapa_tx_ref text unique,
  chapa_reference text,
  bank_name text,
  bank_reference text,
  receipt_url text,
  notes text,
  verified_at timestamptz,
  verified_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index payments_user_id_idx on public.payments(user_id);
create index payments_status_idx on public.payments(status);
alter table public.payments enable row level security;
create policy "Payments readable by owner" on public.payments for select using (auth.uid() = user_id);
create policy "Payments insertable by owner" on public.payments for insert with check (auth.uid() = user_id);
create policy "Admins can manage payments" on public.payments for all using (public.has_role(auth.uid(), 'admin'));

-- TRIGGERS
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, phone, full_name)
  values (new.id, new.phone, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  insert into public.user_roles (user_id, role) values (new.id, 'student');
  insert into public.subscriptions (user_id, tier, status) values (new.id, 'free', 'active');
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();
create trigger payments_updated_at before update on public.payments
  for each row execute function public.set_updated_at();