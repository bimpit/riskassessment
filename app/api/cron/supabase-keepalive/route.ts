import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET(request: NextRequest) {
  // Vercel crons send CRON_SECRET as Authorization: Bearer <secret>
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Keepalive: missing required env vars')
    return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 })
  }

  try {
    const supabase = await createServiceRoleClient()

    // Use real SELECT (not HEAD) so Supabase registers genuine database activity.
    // HEAD requests may not count toward the inactivity threshold.
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    if (profileError) {
      throw new Error(`profiles query failed: ${profileError.message}`)
    }

    // Query a second table to generate additional activity signals.
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('id')
      .limit(1)

    if (teamError) {
      throw new Error(`teams query failed: ${teamError.message}`)
    }

    console.log('Supabase keepalive OK', {
      profiles: profileData?.length ?? 0,
      teams: teamData?.length ?? 0,
    })

    return NextResponse.json({
      success: true,
      message: 'Supabase keepalive executed',
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    console.error('Keepalive error:', error)
    return NextResponse.json(
      { error: 'Failed to execute keepalive', details: String(error) },
      { status: 500 }
    )
  }
}
