import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { sendRiskAlert } from '@/lib/resend'

export const maxDuration = 60

export async function GET(request: NextRequest) {
  // Verify cron secret
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = await createServiceRoleClient()
    const supabaseAny = supabase as any

    // Get high and critical risks that haven't been alerted
    const { data: risks } = await supabaseAny
      .from('risks')
      .select('id, title, risk_level, assessment_id')
      .in('risk_level', ['critical', 'high'])
      .eq('status', 'open')

    if (!risks || risks.length === 0) {
      return NextResponse.json({ message: 'No critical risks' })
    }

    // Batch fetch assessments and profiles (avoids N+1 — 3 queries total)
    const assessmentIds = [...new Set((risks as any[]).map((r) => r.assessment_id))]
    const { data: assessments } = await supabaseAny
      .from('assessments')
      .select('id, created_by')
      .in('id', assessmentIds)

    const userIds = [...new Set((assessments ?? []).map((a: any) => a.created_by).filter(Boolean))]
    const { data: profiles } = userIds.length
      ? await supabaseAny.from('profiles').select('id, email').in('id', userIds)
      : { data: [] }

    const assessmentMap: Record<string, string> = {}
    for (const a of assessments ?? []) {
      assessmentMap[a.id] = a.created_by
    }
    const profileMap: Record<string, string> = {}
    for (const p of profiles ?? []) {
      profileMap[p.id] = p.email
    }

    let sent = 0
    for (const risk of risks as any[]) {
      const createdBy = assessmentMap[risk.assessment_id]
      const email = createdBy ? profileMap[createdBy] : undefined
      if (email) {
        await sendRiskAlert(email, risk.title, risk.risk_level)
        sent++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sent ${sent} risk alert emails`,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Risk alerts error:', error)
    return NextResponse.json(
      { error: 'Failed to send alerts' },
      { status: 500 }
    )
  }
}
