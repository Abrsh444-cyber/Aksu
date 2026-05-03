-- Update has_active_pro to recognize the lifetime tier
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
      and tier in ('pro_monthly','pro_yearly','pro_lifetime')
      and (current_period_end is null or current_period_end > now())
  )
$$;

-- Storage policies on the memhrus bucket: only Pro lifetime / monthly / yearly
-- subscribers (or admins) can read files. Nothing else.
drop policy if exists "memhrus pro can read" on storage.objects;
create policy "memhrus pro can read"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'memhrus' and (
    public.has_active_pro(auth.uid())
    or public.has_role(auth.uid(), 'admin'::public.app_role)
  )
);

-- Only admins can upload / move / delete
drop policy if exists "memhrus admin write" on storage.objects;
create policy "memhrus admin write"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'memhrus' and public.has_role(auth.uid(), 'admin'::public.app_role)
);

drop policy if exists "memhrus admin update" on storage.objects;
create policy "memhrus admin update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'memhrus' and public.has_role(auth.uid(), 'admin'::public.app_role)
);

drop policy if exists "memhrus admin delete" on storage.objects;
create policy "memhrus admin delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'memhrus' and public.has_role(auth.uid(), 'admin'::public.app_role)
);