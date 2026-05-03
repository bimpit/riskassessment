-- Create assessment_templates table
create table if not exists assessment_templates (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references teams(id) on delete cascade,
  name text not null,
  domain text not null check (domain in ('whs', 'aml', 'privacy', 'fairwork', 'operational')),
  template_data jsonb not null,
  is_system_template boolean default false,
  created_at timestamp with time zone default now()
);

alter table assessment_templates enable row level security;

create index idx_templates_team_id on assessment_templates(team_id);
create index idx_templates_domain on assessment_templates(domain);

-- RLS Policies for templates
create policy "Team members can view team templates"
  on assessment_templates for select
  using (
    team_id is null or
    exists (
      select 1 from team_members
      where team_members.team_id = assessment_templates.team_id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team managers can create templates"
  on assessment_templates for insert
  with check (
    team_id is null or
    exists (
      select 1 from team_members
      where team_members.team_id = assessment_templates.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team managers can update templates"
  on assessment_templates for update
  using (
    team_id is not null and
    exists (
      select 1 from team_members
      where team_members.team_id = assessment_templates.team_id
      and team_members.user_id = auth.uid()
      and role in ('admin', 'manager')
    )
  );

create policy "Team admins can delete templates"
  on assessment_templates for delete
  using (
    team_id is not null and
    exists (
      select 1 from team_members
      where team_members.team_id = assessment_templates.team_id
      and team_members.user_id = auth.uid()
      and role = 'admin'
    )
  );
