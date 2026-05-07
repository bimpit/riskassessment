import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

async function getTeamId(userId: string): Promise<string | null> {
  const sr = await createServiceRoleClient()
  const { data } = await (sr as any).from('team_members').select('team_id').eq('user_id', userId).limit(1).single()
  return data?.team_id ?? null
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const teamId = await getTeamId(user.id)
    if (!teamId) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const sr = await createServiceRoleClient()
    const srAny = sr as any

    const riskId = request.nextUrl.searchParams.get('riskId')
    const assessmentId = request.nextUrl.searchParams.get('assessmentId')

    let query = srAny.from('controls').select('*').eq('team_id', teamId)

    if (riskId) {
      query = query.eq('risk_id', riskId)
    } else if (assessmentId) {
      // Get all risk IDs for this assessment first
      const { data: risks } = await srAny.from('risks').select('id').eq('assessment_id', assessmentId).eq('team_id', teamId)
      if (!risks || risks.length === 0) return NextResponse.json([])
      const riskIds = risks.map((r: { id: string }) => r.id)
      query = query.in('risk_id', riskIds)
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(data ?? [])
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const teamId = await getTeamId(user.id)
    if (!teamId) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const body = await request.json()
    const sr = await createServiceRoleClient()
    const srAny = sr as any
    const { data, error } = await srAny.from('controls').insert({ ...body, team_id: teamId }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    await srAny.from('audit_log').insert({
      team_id: teamId,
      user_id: user.id,
      action: 'CREATE',
      entity_type: 'controls',
      entity_id: data.id,
      changes: data,
    })

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
