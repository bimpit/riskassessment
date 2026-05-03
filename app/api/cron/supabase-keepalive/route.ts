import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET(request: NextRequest) {
  // Verify cron secret
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Connect to Supabase and run a simple query to keep connection alive
    const supabase = await createServiceRoleClient()
    const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      message: 'Supabase connection kept alive',
      timestamp: new Date().toISOString(),
      profiles_count: count,
    })
  } catch (error: any) {
    console.error('Keepalive error:', error)
    return NextResponse.json(
      { error: 'Failed to keep alive' },
      { status: 500 }
    )
  }
}
