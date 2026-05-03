import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const sr = await createServiceRoleClient()
    const srAny = sr as any

    const { data: teamMember } = await srAny.from('team_members').select('team_id').eq('user_id', user.id).limit(1).single()
    const teamId = teamMember?.team_id

    let query = srAny.from('assessment_templates').select('*').order('created_at', { ascending: false })
    if (teamId) {
      query = query.or(`team_id.eq.${teamId},is_system_template.eq.true`)
    } else {
      query = query.eq('is_system_template', true)
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(data ?? [])
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
