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
    const { data, error } = await (sr as any)
      .from('controls')
      .update(updates)
      .eq('id', id)
      .eq('team_id', teamId)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
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
    const { error } = await (sr as any).from('controls').delete().eq('id', id).eq('team_id', teamId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
