import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    // Get the user's team
    const { data: membership } = await serviceRoleAny
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json(null)
    }

    // Get the subscription for this team
    const { data: subscription } = await serviceRoleAny
      .from('subscriptions')
      .select('plan, status, current_period_end')
      .eq('team_id', membership.team_id)
      .single()

    if (!subscription) {
      return NextResponse.json(null)
    }

    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
