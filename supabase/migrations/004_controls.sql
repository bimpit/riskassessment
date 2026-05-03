-- Create controls table
create table if not exists controls (
  id uuid primary key default gen_random_uuid(),
  risk_id uuid not null references risks(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  title text not null,
  description text,
  type text not null check (type in ('detective', 'preventive', 'corrective')),
  effectiveness numeric(3,0) default 50 check (effectiveness >= 0 and effectiveness <= 100),
  owner uuid references auth.users(id) on delete set null,
  implementation_date date,
  status text default 'planned' check (status in ('planned', 'implemented', 'ineffective')),
  created_at timestamp with time zone default now()
);

alter table controls enable row level security;

create index idx_controls_risk_id on controls(risk_id);
create index idx_controls_team_id on controls(team_id);
create index idx_controls_status on controls(status);

-- RLS Policies for controls
create policy "Team members can view controls"
  on controls for select
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = controls.team_id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team members can create controls"
  on controls for insert
  with check (
    exists (
      select 1 from team_members
      where team_members.team_id = controls.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team members can update controls"
  on controls for update
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = controls.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team admins can delete controls"
  on controls for delete
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = controls.team_id
      and team_members.user_id = auth.uid()
      and role = 'admin'
    )
  );
