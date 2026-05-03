import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    // Check if the user already has a team_member record
    const { data: existing } = await serviceRoleAny
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (existing) {
      return NextResponse.json({ team_id: existing.team_id })
    }

    // Fetch profile for naming the team
    const { data: profile } = await serviceRoleAny
      .from('profiles')
      .select('full_name, email, organization')
      .eq('id', user.id)
      .single()

    const teamName = profile?.organization
      || (profile?.full_name ? `${profile.full_name}'s Team` : null)
      || `${user.email}'s Team`

    // Ensure profile exists
    if (!profile) {
      await serviceRoleAny.from('profiles').upsert(
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || null,
          organization: user.user_metadata?.organization || null,
          role: 'user',
        },
        { onConflict: 'id' }
      )
    }

    // Create default team
    const { data: teamData, error: teamError } = await serviceRoleAny
      .from('teams')
      .insert({
        name: teamName,
        owner_id: user.id,
        subscription_tier: 'free',
      })
      .select()
      .single()

    if (teamError) {
      return NextResponse.json(
        { error: `Failed to create team: ${teamError.message}` },
        { status: 500 }
      )
    }

    // Add user as team admin
    const { error: memberError } = await serviceRoleAny
      .from('team_members')
      .insert({
        team_id: teamData.id,
        user_id: user.id,
        role: 'admin',
        joined_at: new Date().toISOString(),
      })

    if (memberError) {
      return NextResponse.json(
        { error: `Failed to add team member: ${memberError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ team_id: teamData.id })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 })
  }
}
