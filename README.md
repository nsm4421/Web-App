# Create Project

`bunx -bun create-next-app@latest next-app --typescript --tailwind --eslint`

# Supabase Auth Function

-- Create User Table
create table public.users(
id uuid primary key references auth.users(id),
email text unique not null,
name text,
role text default 'user' check(
    role in ('user', 'manager', 'admin')
),
avatar_url text not null,
created_at timestamp default current_timestamp,
phone text,
country text
);

-- Enable Row Level Security
alter table users enable row level security;

-- Create Policy On User Table
create policy "enable user table for select own data" 
on public.users for
select using (auth.uid() = id);

create policy "enable user table for update own data" 
on public.users for
update using (auth.uid() = id);

-- Create Function
create or replace function public.insert_new_user()
returns trigger as 
$$
  begin
    if new.raw_user_meta_data->>'avatar_url' is null or 
    new.raw_user_meta_data->>'avatar_url' = '' then
      new.raw_user_meta_data = jsonb_set(
        new.raw_user_meta_data, 
        '{avatar_url}',
        'https://picsum.photos/200/300'::jsonb
      );
    end if;
    insert into public.users(
      id, 
      name,
      role, 
      email, 
      avatar_url
    ) 
    values (
      new.id, 
      new.raw_user_meta_data->>'full_name', 
      'user',
      new.email,
      new.raw_user_meta_data->>'avatar_url'
    );
    return new;
  end;
$$ language plpgsql security definer;

-- Create Trigger
create or replace trigger on_auth_user_inserted
after insert on auth.users
for each row
execute procedure public.insert_new_user();

# Docs

> Supabase

https://supabase.com/docs/guides/auth/server-side/creating-a-client

`bun install @supabase/ssr @supabase/supabase-js`

https://supabase.com/docs/guides/api/rest/generating-types

`bun i supabase@">=1.8.1" --save-dev`

`bunx supabse login`

`bunx supabase gen types --lang=typescript --project-id "qdzzkstwzbhzunjstpvk" --schema public > src/lib/supabase/supabase.types.ts`