import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const sr = await createServiceRoleClient()
    const srAny = sr as any

    const { data: teamMember } = await srAny
      .from('team_members')
      .select('team_id, role')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!teamMember) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const url = request.nextUrl
    const entityType = url.searchParams.get('entity_type')
    const limit = Math.min(200, parseInt(url.searchParams.get('limit') || '100', 10))

    let query = srAny
      .from('audit_log')
      .select('id, action, entity_type, entity_id, created_at, user_id, changes')
      .eq('team_id', teamMember.team_id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (entityType) query = query.eq('entity_type', entityType)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const userIds = Array.from(new Set((data ?? []).map((row: any) => row.user_id).filter(Boolean)))
    let userMap: Record<string, { full_name: string | null; email: string }> = {}
    if (userIds.length > 0) {
      const { data: profiles } = await srAny
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds)
      userMap = (profiles ?? []).reduce((acc: any, p: any) => {
        acc[p.id] = { full_name: p.full_name, email: p.email }
        return acc
      }, {})
    }

    const enriched = (data ?? []).map((row: any) => ({
      ...row,
      user: row.user_id ? userMap[row.user_id] ?? null : null,
    }))

    return NextResponse.json(enriched)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
