import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const sr = await createServiceRoleClient()
    const { data, error } = await (sr as any).from('profiles').select('*').eq('id', user.id).single()

    if (error || !data) {
      // Return from auth metadata if profile doesn't exist yet
      return NextResponse.json({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
        organization: user.user_metadata?.organization ?? null,
      })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const sr = await createServiceRoleClient()
    const { data, error } = await (sr as any)
      .from('profiles')
      .upsert({ id: user.id, email: user.email, ...body }, { onConflict: 'id' })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
