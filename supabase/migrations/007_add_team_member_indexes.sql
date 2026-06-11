-- Fix: full table scan on every API call via getTeamId()/getOrCreateTeamId()
-- Run these in Supabase SQL Editor
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_user ON team_members(team_id, user_id);
