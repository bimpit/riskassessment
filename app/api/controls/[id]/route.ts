import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

async function getTeamId(userId: string): Promise<string | null> {
  const sr = await createServiceRoleClient()
  const { data } = await (sr as any).from('team_members').select('team_id').eq('user_id', userId).limit(1).single()
  return data?.team_id ?? null
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const teamId = await getTeamId(user.id)
    if (!teamId) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const body = await request.json()
    const { title, description, type, effectiveness, status, implementation_date } = body
    const updates: Record<string, unknown> = {}
    if (title !== undefined) updates.title = title
    if (description !== undefined) updates.description = description
    if (type !== undefined) updates.type = type
    if (effectiveness !== undefined) updates.effectiveness = effectiveness
    if (status !== undefined) updates.status = status
    if (implementation_date !== undefined) updates.implementation_date = implementation_date

    const sr = await createServiceRoleClient()
    const srAny = sr as any

    const { data: existing } = await srAny
      .from('controls')
      .select('*')
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    const { data, error } = await srAny
      .from('controls')
      .update(updates)
      .eq('id', id)
      .eq('team_id', teamId)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    await srAny.from('audit_log').insert({
      team_id: teamId,
      user_id: user.id,
      action: 'UPDATE',
      entity_type: 'controls',
      entity_id: id,
      changes: { old: existing, new: data },
    })

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const teamId = await getTeamId(user.id)
    if (!teamId) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const sr = await createServiceRoleClient()
    const srAny = sr as any

    const { data: existing } = await srAny
      .from('controls')
      .select('*')
      .eq('id', id)
      .eq('team_id', teamId)
      .single()

    const { error } = await srAny.from('controls').delete().eq('id', id).eq('team_id', teamId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    await srAny.from('audit_log').insert({
      team_id: teamId,
      user_id: user.id,
      action: 'DELETE',
      entity_type: 'controls',
      entity_id: id,
      changes: existing,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
