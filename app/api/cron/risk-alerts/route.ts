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

    // Get assessment owners and send alerts
    let sent = 0
    for (const risk of risks as any[]) {
      const { data: assessment } = await supabaseAny
        .from('assessments')
        .select('created_by')
        .eq('id', risk.assessment_id)
        .single()

      if (assessment?.created_by) {
        const { data: user } = await supabaseAny
          .from('profiles')
          .select('email')
          .eq('id', assessment.created_by)
          .single()

        if (user?.email) {
          await sendRiskAlert(user.email, risk.title, risk.risk_level)
          sent++
        }
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
