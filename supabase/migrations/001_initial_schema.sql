-- Create profiles table
create table if not exists profiles (
  id uuid primary key,
  email text unique not null,
  full_name text,
  organization text,
  role text,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;

-- Create teams table
create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'starter', 'professional')),
  created_at timestamp with time zone default now()
);

alter table teams enable row level security;

-- Create team_members table
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text default 'viewer' check (role in ('admin', 'manager', 'viewer')),
  invited_at timestamp with time zone default now(),
  joined_at timestamp with time zone,
  unique(team_id, user_id)
);

alter table team_members enable row level security;

-- Create subscriptions table
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null unique references teams(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text check (status in ('active', 'past_due', 'canceled', 'unpaid')),
  plan text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table subscriptions enable row level security;

-- RLS Policies for profiles
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- RLS Policies for teams
create policy "Team members can view team"
  on teams for select
  using (
    auth.uid() = owner_id or
    exists (
      select 1 from team_members
      where team_members.team_id = teams.id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team owners can update team"
  on teams for update
  using (auth.uid() = owner_id);

-- RLS Policies for team_members
create policy "Team members can view team members"
  on team_members for select
  using (
    exists (
      select 1 from team_members tm
      where tm.team_id = team_members.team_id
      and tm.user_id = auth.uid()
    )
  );

create policy "Team admins can manage members"
  on team_members for all
  using (
    exists (
      select 1 from team_members tm
      where tm.team_id = team_members.team_id
      and tm.user_id = auth.uid()
      and tm.role = 'admin'
    )
  );

-- RLS Policies for subscriptions
create policy "Team members can view subscriptions"
  on subscriptions for select
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = subscriptions.team_id
      and team_members.user_id = auth.uid()
    )
  );
