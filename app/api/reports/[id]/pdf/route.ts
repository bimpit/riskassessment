import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import jsPDF from 'jspdf'
import { calculateRiskScore, getRiskLevel } from '@/lib/risk-scoring'

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

const domainLabels: Record<string, string> = {
  whs: 'Work Health & Safety',
  aml: 'Anti-Money Laundering',
  privacy: 'Privacy',
  fairwork: 'Fair Work',
  operational: 'Operational',
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  in_progress: 'In Progress',
  completed: 'Completed',
  archived: 'Archived',
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

    const [assessmentRes, risksRes, controlsRes, profileRes] = await Promise.all([
      srAny.from('assessments').select('*').eq('id', id).eq('team_id', teamId).single(),
      srAny.from('risks').select('*').eq('assessment_id', id).eq('team_id', teamId).order('risk_score', { ascending: false }),
      srAny.from('controls').select('*').eq('assessment_id', id).order('created_at', { ascending: true }),
      srAny.from('profiles').select('full_name, email, organization').eq('id', user.id).single(),
    ])

    if (assessmentRes.error || !assessmentRes.data) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 })
    }

    const assessment = assessmentRes.data
    const risks = risksRes.data ?? []
    const controls = controlsRes.data ?? []
    const profile = profileRes.data

    // Build controls lookup
    const controlsByRisk: Record<string, typeof controls> = {}
    for (const c of controls) {
      if (!controlsByRisk[c.risk_id]) controlsByRisk[c.risk_id] = []
      controlsByRisk[c.risk_id].push(c)
    }

    // Generate PDF
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageW = doc.internal.pageSize.getWidth()
    const margin = 20
    const contentW = pageW - margin * 2
    let y = margin

    const addPage = () => {
      doc.addPage()
      y = margin
    }

    const checkPageBreak = (needed: number) => {
      if (y + needed > doc.internal.pageSize.getHeight() - margin) {
        addPage()
      }
    }

    // Header
    doc.setFontSize(9)
    doc.setTextColor(120, 120, 120)
    doc.text('Risk Assessment Report', margin, y)
    y += 8

    doc.setFontSize(20)
    doc.setTextColor(20, 20, 20)
    const titleLines = doc.splitTextToSize(assessment.title, contentW)
    doc.text(titleLines, margin, y)
    y += titleLines.length * 9 + 2

    if (assessment.description) {
      const desc = stripHtml(assessment.description)
      doc.setFontSize(10)
      doc.setTextColor(80, 80, 80)
      const descLines = doc.splitTextToSize(desc, contentW)
      doc.text(descLines, margin, y)
      y += descLines.length * 5 + 4
    }

    // Meta grid
    y += 2
    doc.setFontSize(9)
    const col = contentW / 4
    const metaItems = [
      ['Domain', domainLabels[assessment.domain] || assessment.domain],
      ['Status', statusLabels[assessment.status] || assessment.status],
      ['Assessment Date', new Date(assessment.assessment_date).toLocaleDateString()],
      ['Review Date', assessment.review_date ? new Date(assessment.review_date).toLocaleDateString() : '—'],
      ['Prepared By', profile?.full_name || profile?.email || '—'],
      ['Organisation', profile?.organization || '—'],
      ['Report Generated', new Date().toLocaleDateString()],
      ['', ''],
    ]
    for (let i = 0; i < metaItems.length; i += 4) {
      const row = metaItems.slice(i, i + 4)
      row.forEach(([label, val], j) => {
        if (!label) return
        doc.setTextColor(120, 120, 120)
        doc.text(label, margin + j * col, y)
        doc.setTextColor(20, 20, 20)
        doc.setFontSize(10)
        doc.text(val, margin + j * col, y + 5)
        doc.setFontSize(9)
      })
      y += 12
    }

    // Divider
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, pageW - margin, y)
    y += 8

    // Risk Summary
    checkPageBreak(20)
    doc.setFontSize(14)
    doc.setTextColor(20, 20, 20)
    doc.text('Risk Summary', margin, y)
    y += 7

    const critical = risks.filter((r: any) => r.risk_level === 'critical').length
    const high = risks.filter((r: any) => r.risk_level === 'high').length
    const medium = risks.filter((r: any) => r.risk_level === 'medium').length
    const low = risks.filter((r: any) => r.risk_level === 'low').length
    const levelColors: Record<string, [number, number, number]> = {
      critical: [220, 38, 38],
      high: [234, 88, 12],
      medium: [202, 138, 4],
      low: [22, 163, 74],
    }
    const summaryItems = [
      { label: 'Critical', count: critical, level: 'critical' },
      { label: 'High', count: high, level: 'high' },
      { label: 'Medium', count: medium, level: 'medium' },
      { label: 'Low', count: low, level: 'low' },
    ]
    const cellW = contentW / 4
    summaryItems.forEach(({ label, count, level }, i) => {
      const x = margin + i * cellW
      const [r, g, b] = levelColors[level]
      doc.setFillColor(r, g, b)
      doc.setDrawColor(r, g, b)
      doc.roundedRect(x, y, cellW - 3, 16, 2, 2, 'S')
      doc.setTextColor(r, g, b)
      doc.setFontSize(8)
      doc.text(label.toUpperCase(), x + 4, y + 5)
      doc.setFontSize(18)
      doc.text(String(count), x + 4, y + 13)
    })
    y += 22

    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, pageW - margin, y)
    y += 8

    // Risk Register
    checkPageBreak(16)
    doc.setFontSize(14)
    doc.setTextColor(20, 20, 20)
    doc.text('Risk Register', margin, y)
    y += 8

    if (risks.length === 0) {
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text('No risks recorded.', margin, y)
      y += 8
    }

    risks.forEach((risk: any, idx: number) => {
      checkPageBreak(30)

      // Risk title row
      const [r, g, b] = levelColors[risk.risk_level] ?? [100, 100, 100]
      doc.setFillColor(248, 249, 250)
      doc.rect(margin, y, contentW, 8, 'F')
      doc.setFontSize(8)
      doc.setTextColor(120, 120, 120)
      doc.text(`Risk #${idx + 1}${risk.category ? ` · ${risk.category}` : ''}`, margin + 2, y + 5.5)

      // Level badge
      doc.setFillColor(r, g, b)
      const levelText = `${risk.risk_level.toUpperCase()} · ${risk.risk_score}`
      const badgeW = doc.getTextWidth(levelText) + 6
      doc.roundedRect(pageW - margin - badgeW, y + 1.5, badgeW, 5, 1, 1, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7)
      doc.text(levelText, pageW - margin - badgeW + 3, y + 5.5)
      y += 9

      // Title
      doc.setFontSize(11)
      doc.setTextColor(20, 20, 20)
      const titleLines2 = doc.splitTextToSize(risk.title, contentW - 2)
      checkPageBreak(titleLines2.length * 6 + 4)
      doc.text(titleLines2, margin + 2, y)
      y += titleLines2.length * 6

      // Description
      if (risk.description) {
        const plain = stripHtml(risk.description)
        if (plain) {
          doc.setFontSize(9)
          doc.setTextColor(80, 80, 80)
          const dLines = doc.splitTextToSize(plain, contentW - 2)
          checkPageBreak(dLines.length * 5 + 3)
          doc.text(dLines, margin + 2, y)
          y += dLines.length * 5 + 2
        }
      }

      // Metrics
      checkPageBreak(12)
      doc.setFontSize(8)
      doc.setTextColor(120, 120, 120)
      const rL = risk.notes?.residual_likelihood
      const rC = risk.notes?.residual_consequence
      const hasResidual = typeof rL === 'number' && typeof rC === 'number'
      const residualScore = hasResidual ? calculateRiskScore(rL, rC) : null
      const residualLevel = residualScore !== null ? getRiskLevel(residualScore) : null

      const metrics = [
        `Likelihood: ${risk.likelihood}/5`,
        `Consequence: ${risk.consequence}/5`,
        hasResidual ? `Residual Score: ${residualScore} (${residualLevel})` : 'Residual: Not assessed',
        `Owner: ${risk.owner || '—'}`,
        `Due: ${risk.due_date ? new Date(risk.due_date).toLocaleDateString() : '—'}`,
        `Status: ${risk.status}`,
      ]
      doc.setTextColor(80, 80, 80)
      doc.text(metrics.join('   ·   '), margin + 2, y)
      y += 6

      // Controls
      const riskControls = controlsByRisk[risk.id] ?? []
      if (riskControls.length > 0) {
        checkPageBreak(8)
        doc.setFontSize(8)
        doc.setTextColor(120, 120, 120)
        doc.text(`Controls (${riskControls.length}):`, margin + 2, y)
        y += 5
        riskControls.forEach((ctrl: any) => {
          checkPageBreak(10)
          doc.setFontSize(8)
          doc.setTextColor(40, 40, 40)
          const ctrlLines = doc.splitTextToSize(`• ${ctrl.title}`, contentW - 6)
          doc.text(ctrlLines, margin + 4, y)
          y += ctrlLines.length * 4.5
          doc.setFontSize(7)
          doc.setTextColor(100, 100, 100)
          doc.text(`  ${ctrl.type} · ${ctrl.effectiveness}% · ${ctrl.status}`, margin + 4, y)
          y += 4.5
        })
      }

      y += 4
      doc.setDrawColor(220, 220, 220)
      doc.line(margin, y, pageW - margin, y)
      y += 5
    })

    // Footer
    const totalPages = (doc as any).internal.getNumberOfPages()
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p)
      doc.setFontSize(7)
      doc.setTextColor(150, 150, 150)
      doc.text(
        'This report was generated by risk-assessment.com.au. It does not constitute legal advice.',
        margin,
        doc.internal.pageSize.getHeight() - 8
      )
      doc.text(
        `Page ${p} of ${totalPages}`,
        pageW - margin,
        doc.internal.pageSize.getHeight() - 8,
        { align: 'right' }
      )
    }

    const pdfBytes = doc.output('arraybuffer')
    const safeTitle = assessment.title.replace(/[^a-zA-Z0-9-_ ]/g, '').slice(0, 50).trim() || 'assessment'

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="assessment-report.pdf"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('PDF generation error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
