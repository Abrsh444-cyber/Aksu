create or replace function public.has_active_pro(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions
    where user_id = _user_id and status = 'active'
      and tier in ('pro_monthly','pro_yearly','pro_lifetime','pro_campus')
      and (current_period_end is null or current_period_end > now())
  )
$$;