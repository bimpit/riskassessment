import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateRiskRegisterDocx } from '@/lib/docx-utils'

async function getTeamId(userId: string): Promise<string | null> {
  const sr = await createServiceRoleClient()
  const { data } = await (sr as any).from('team_members').select('team_id').eq('user_id', userId).limit(1).single()
  return data?.team_id ?? null
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const teamId = await getTeamId(user.id)
    if (!teamId) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const sr = await createServiceRoleClient()
    const srAny = sr as any

    const [assessmentRes, risksRes] = await Promise.all([
      srAny.from('assessments').select('*').eq('id', id).eq('team_id', teamId).single(),
      srAny.from('risks').select('*').eq('assessment_id', id).eq('team_id', teamId).order('risk_score', { ascending: false }),
    ])

    if (assessmentRes.error || !assessmentRes.data) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 })
    }

    const assessment = assessmentRes.data
    const risks = (risksRes.data ?? []).map((r: any) => ({
      ...r,
      description: r.description ? stripHtml(r.description) : null,
    }))

    const buffer = await generateRiskRegisterDocx(assessment.title, risks)

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="risk-register.docx"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('DOCX generation error:', err)
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 })
  }
}
