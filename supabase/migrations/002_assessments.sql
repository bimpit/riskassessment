-- Create assessments table
create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete set null,
  title text not null,
  description text,
  domain text not null check (domain in ('whs', 'aml', 'privacy', 'fairwork', 'operational')),
  status text default 'draft' check (status in ('draft', 'in_progress', 'completed', 'archived')),
  assessment_date date not null,
  review_date date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table assessments enable row level security;

create index idx_assessments_team_id on assessments(team_id);
create index idx_assessments_status on assessments(status);
create index idx_assessments_domain on assessments(domain);

-- RLS Policies for assessments
create policy "Team members can view assessments"
  on assessments for select
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = assessments.team_id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team members can create assessments"
  on assessments for insert
  with check (
    exists (
      select 1 from team_members
      where team_members.team_id = assessments.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team members can update assessments"
  on assessments for update
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = assessments.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team admins can delete assessments"
  on assessments for delete
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = assessments.team_id
      and team_members.user_id = auth.uid()
      and role = 'admin'
    )
  );
