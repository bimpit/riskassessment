import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { sendAssessmentReminder } from '@/lib/resend'

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

    // Get assessments due for review within the next 7 days
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

    const { data: assessments } = await supabaseAny
      .from('assessments')
      .select('id, title, review_date, created_by')
      .eq('status', 'in_progress')
      .lte('review_date', sevenDaysFromNow.toISOString().split('T')[0])
      .gt('review_date', new Date().toISOString().split('T')[0])

    if (!assessments) {
      return NextResponse.json({ message: 'No assessments to review' })
    }

    // Send reminders
    let sent = 0
    for (const assessment of assessments as any[]) {
      const { data: user } = await supabaseAny
        .from('profiles')
        .select('email')
        .eq('id', assessment.created_by)
        .single()

      if (user?.email) {
        await sendAssessmentReminder(
          user.email,
          assessment.title,
          assessment.review_date
        )
        sent++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sent ${sent} review reminder emails`,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Review reminders error:', error)
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    )
  }
}
