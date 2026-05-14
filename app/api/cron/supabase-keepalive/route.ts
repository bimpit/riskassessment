import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET(request: NextRequest) {
  // Vercel crons send CRON_SECRET as Authorization: Bearer <secret>
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Query a real table so Supabase registers database activity and doesn't pause the project.
    // Service role key bypasses RLS so this always succeeds regardless of data.
    const supabase = await createServiceRoleClient()
    const { count, error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })

    if (error) {
      throw new Error(`Database query failed: ${error.message}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase keepalive executed',
      timestamp: new Date().toISOString(),
      profiles_count: count,
    })
  } catch (error: unknown) {
    console.error('Keepalive error:', error)
    return NextResponse.json(
      { error: 'Failed to execute keepalive', details: String(error) },
      { status: 500 }
    )
  }
}
