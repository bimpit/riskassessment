-- Only add the missing INSERT policies for signup

-- Add insert policy for profiles
drop policy if exists "Users can insert their own profile" on profiles;
create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Add insert policy for teams
drop policy if exists "Users can create teams" on teams;
create policy "Users can create teams"
  on teams for insert
  with check (auth.uid() = owner_id);

-- Add insert policy for team_members
drop policy if exists "Team owners can add members" on team_members;
create policy "Team owners can add members"
  on team_members for insert
  with check (
    exists (
      select 1 from teams
      where teams.id = team_members.team_id
      and teams.owner_id = auth.uid()
    )
  );
