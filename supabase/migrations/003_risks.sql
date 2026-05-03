-- Create risks table
create table if not exists risks (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references assessments(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  title text not null,
  description text,
  category text,
  likelihood numeric(2,1) not null check (likelihood >= 1 and likelihood <= 5),
  consequence numeric(2,1) not null check (consequence >= 1 and consequence <= 5),
  risk_score integer generated always as (
    case
      when likelihood >= 4.5 and consequence >= 4.5 then 25
      when likelihood >= 4.5 and consequence >= 3.5 then 20
      when likelihood >= 3.5 and consequence >= 4.5 then 20
      when likelihood >= 4 and consequence >= 3 then 16
      when likelihood >= 3 and consequence >= 4 then 12
      when likelihood >= 3.5 and consequence >= 3.5 then 15
      when likelihood >= 3 and consequence >= 3 then 9
      when likelihood >= 2 and consequence >= 3 then 8
      when likelihood >= 3 and consequence >= 2 then 6
      else round(likelihood * consequence)::integer
    end
  ) stored,
  risk_level text generated always as (
    case
      when (case when likelihood >= 4.5 and consequence >= 4.5 then 25 when likelihood >= 4.5 and consequence >= 3.5 then 20 when likelihood >= 3.5 and consequence >= 4.5 then 20 when likelihood >= 4 and consequence >= 3 then 16 when likelihood >= 3 and consequence >= 4 then 12 when likelihood >= 3.5 and consequence >= 3.5 then 15 when likelihood >= 3 and consequence >= 3 then 9 when likelihood >= 2 and consequence >= 3 then 8 when likelihood >= 3 and consequence >= 2 then 6 else round(likelihood * consequence)::integer end) >= 20 then 'critical'
      when (case when likelihood >= 4.5 and consequence >= 4.5 then 25 when likelihood >= 4.5 and consequence >= 3.5 then 20 when likelihood >= 3.5 and consequence >= 4.5 then 20 when likelihood >= 4 and consequence >= 3 then 16 when likelihood >= 3 and consequence >= 4 then 12 when likelihood >= 3.5 and consequence >= 3.5 then 15 when likelihood >= 3 and consequence >= 3 then 9 when likelihood >= 2 and consequence >= 3 then 8 when likelihood >= 3 and consequence >= 2 then 6 else round(likelihood * consequence)::integer end) >= 12 then 'high'
      when (case when likelihood >= 4.5 and consequence >= 4.5 then 25 when likelihood >= 4.5 and consequence >= 3.5 then 20 when likelihood >= 3.5 and consequence >= 4.5 then 20 when likelihood >= 4 and consequence >= 3 then 16 when likelihood >= 3 and consequence >= 4 then 12 when likelihood >= 3.5 and consequence >= 3.5 then 15 when likelihood >= 3 and consequence >= 3 then 9 when likelihood >= 2 and consequence >= 3 then 8 when likelihood >= 3 and consequence >= 2 then 6 else round(likelihood * consequence)::integer end) >= 6 then 'medium'
      else 'low'
    end
  ) stored,
  owner uuid references auth.users(id) on delete set null,
  due_date date,
  status text default 'open' check (status in ('open', 'mitigating', 'closed')),
  ai_generated boolean default false,
  notes jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table risks enable row level security;

create index idx_risks_assessment_id on risks(assessment_id);
create index idx_risks_team_id on risks(team_id);
create index idx_risks_risk_level on risks(risk_level);
create index idx_risks_status on risks(status);

-- RLS Policies for risks
create policy "Team members can view risks"
  on risks for select
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = risks.team_id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team members can create risks"
  on risks for insert
  with check (
    exists (
      select 1 from team_members
      where team_members.team_id = risks.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team members can update risks"
  on risks for update
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = risks.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team admins can delete risks"
  on risks for delete
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = risks.team_id
      and team_members.user_id = auth.uid()
      and role = 'admin'
    )
  );
