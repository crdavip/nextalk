-- Enable RLS
alter table public.users enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Create tables
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null unique,
  name text,
  avatar_url text,
  constraint users_pkey primary key (id)
);

create table public.conversations (
  id uuid default gen_random_uuid() not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  user_id uuid references public.users(id) on delete cascade not null,
  last_message text,
  last_message_at timestamp with time zone,
  constraint conversations_pkey primary key (id)
);

create table public.messages (
  id uuid default gen_random_uuid() not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  content text not null,
  role text not null check (role in ('user', 'assistant')),
  constraint messages_pkey primary key (id)
);

-- Create RLS policies
create policy "Users can view their own user data"
  on public.users
  for select
  using (auth.uid() = id);

create policy "Users can update their own user data"
  on public.users
  for update
  using (auth.uid() = id);

create policy "Users can view their own conversations"
  on public.conversations
  for select
  using (auth.uid() = user_id);

create policy "Users can create conversations"
  on public.conversations
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own conversations"
  on public.conversations
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own conversations"
  on public.conversations
  for delete
  using (auth.uid() = user_id);

create policy "Users can view messages in their conversations"
  on public.messages
  for select
  using (
    auth.uid() in (
      select user_id
      from public.conversations
      where id = conversation_id
    )
  );

create policy "Users can create messages in their conversations"
  on public.messages
  for insert
  with check (
    auth.uid() in (
      select user_id
      from public.conversations
      where id = conversation_id
    )
  );

-- Enable Realtime
alter publication supabase_realtime add table conversations;
alter publication supabase_realtime add table messages;