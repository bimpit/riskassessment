import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

async function getOrCreateTeamId(userId: string, userEmail: string, userMeta: Record<string, string>): Promise<string | null> {
  const serviceRole = await createServiceRoleClient()
  const serviceRoleAny = serviceRole as any

  const { data: existing } = await serviceRoleAny
    .from('team_members')
    .select('team_id')
    .eq('user_id', userId)
    .limit(1)
    .single()

  if (existing) return existing.team_id

  // Auto-provision team for this user
  const fullName = userMeta?.full_name
  const organization = userMeta?.organization
  const teamName = organization || (fullName ? `${fullName}'s Team` : `${userEmail}'s Team`)

  // Ensure profile exists
  await serviceRoleAny.from('profiles').upsert(
    { id: userId, email: userEmail, full_name: fullName || null, organization: organization || null, role: 'user' },
    { onConflict: 'id' }
  )

  const { data: teamData, error: teamError } = await serviceRoleAny
    .from('teams')
    .insert({ name: teamName, owner_id: userId, subscription_tier: 'free' })
    .select()
    .single()

  if (teamError || !teamData) return null

  await serviceRoleAny.from('team_members').insert({
    team_id: teamData.id,
    user_id: userId,
    role: 'admin',
    joined_at: new Date().toISOString(),
  })

  return teamData.id
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teamId = await getOrCreateTeamId(user.id, user.email!, user.user_metadata as Record<string, string>)
    if (!teamId) {
      return NextResponse.json({ error: 'Failed to resolve team' }, { status: 500 })
    }

    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    const { data, error } = await serviceRoleAny
      .from('assessments')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teamId = await getOrCreateTeamId(user.id, user.email!, user.user_metadata as Record<string, string>)
    if (!teamId) {
      return NextResponse.json({ error: 'Failed to resolve team' }, { status: 500 })
    }

    const body = await request.json()

    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    const { data, error } = await serviceRoleAny
      .from('assessments')
      .insert({
        team_id: teamId,
        created_by: user.id,
        ...body,
        status: 'draft',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
