-- Create audit_log table
create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  changes jsonb,
  created_at timestamp with time zone default now()
);

alter table audit_log enable row level security;

create index idx_audit_log_team_id on audit_log(team_id);
create index idx_audit_log_user_id on audit_log(user_id);
create index idx_audit_log_created_at on audit_log(created_at);
create index idx_audit_log_entity on audit_log(entity_type, entity_id);

-- RLS Policies for audit_log
create policy "Team admins can view audit log"
  on audit_log for select
  using (
    exists (
      select 1 from team_members
      where team_members.team_id = audit_log.team_id
      and team_members.user_id = auth.uid()
      and role = 'admin'
    )
  );

-- Function to automatically create audit log entries
create or replace function log_audit_action()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    insert into audit_log (team_id, user_id, action, entity_type, entity_id, changes)
    values (
      coalesce(new.team_id, (select team_id from teams where owner_id = auth.uid() limit 1)),
      auth.uid(),
      'CREATE',
      tg_table_name,
      new.id::text,
      row_to_json(new)
    );
  elsif tg_op = 'UPDATE' then
    insert into audit_log (team_id, user_id, action, entity_type, entity_id, changes)
    values (
      coalesce(new.team_id, (select team_id from teams where owner_id = auth.uid() limit 1)),
      auth.uid(),
      'UPDATE',
      tg_table_name,
      new.id::text,
      jsonb_build_object('old', row_to_json(old), 'new', row_to_json(new))
    );
  elsif tg_op = 'DELETE' then
    insert into audit_log (team_id, user_id, action, entity_type, entity_id, changes)
    values (
      coalesce(old.team_id, (select team_id from teams where owner_id = auth.uid() limit 1)),
      auth.uid(),
      'DELETE',
      tg_table_name,
      old.id::text,
      row_to_json(old)
    );
  end if;
  return null;
end;
$$ language plpgsql;

-- Create triggers for audit logging
create trigger audit_risks_trigger after insert or update or delete on risks
for each row execute function log_audit_action();

create trigger audit_controls_trigger after insert or update or delete on controls
for each row execute function log_audit_action();

create trigger audit_assessments_trigger after insert or update or delete on assessments
for each row execute function log_audit_action();
