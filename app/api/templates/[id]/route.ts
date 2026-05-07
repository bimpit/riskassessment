import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

async function getTeamId(userId: string) {
  const sr = await createServiceRoleClient()
  const srAny = sr as any
  const { data } = await srAny
    .from('team_members')
    .select('team_id')
    .eq('user_id', userId)
    .limit(1)
    .single()
  return { teamId: data?.team_id as string | undefined, srAny }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const { teamId, srAny } = await getTeamId(user.id)
    if (!teamId) return NextResponse.json({ error: 'No team found' }, { status: 400 })

    const { data: existing } = await srAny
      .from('assessment_templates')
      .select('team_id, is_system_template')
      .eq('id', id)
      .single()

    if (!existing) return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    if (existing.is_system_template) {
      return NextResponse.json({ error: 'System templates cannot be edited' }, { status: 403 })
    }
    if (existing.team_id !== teamId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, domain, description } = body
    if (!name || !domain) {
      return NextResponse.json({ error: 'Name and domain are required' }, { status: 400 })
    }

    const { data, error } = await srAny
      .from('assessment_templates')
      .update({
        name,
        domain,
        template_data: { description: description || '' },
      })
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const { teamId, srAny } = await getTeamId(user.id)
    if (!teamId) return NextResponse.json({ error: 'No team found' }, { status: 400 })

    const { data: existing } = await srAny
      .from('assessment_templates')
      .select('team_id, is_system_template')
      .eq('id', id)
      .single()

    if (!existing) return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    if (existing.is_system_template) {
      return NextResponse.json({ error: 'System templates cannot be deleted' }, { status: 403 })
    }
    if (existing.team_id !== teamId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { error } = await srAny.from('assessment_templates').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
