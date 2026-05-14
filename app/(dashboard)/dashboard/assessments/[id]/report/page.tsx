'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { calculateRiskScore, getRiskLevel } from '@/lib/risk-scoring'

interface Assessment {
  id: string
  title: string
  description: string | null
  domain: string
  status: string
  assessment_date: string
  review_date: string | null
}

interface Risk {
  id: string
  title: string
  description: string | null
  category: string | null
  likelihood: number
  consequence: number
  risk_score: number
  risk_level: string
  owner: string | null
  due_date: string | null
  status: string
  notes: { residual_likelihood?: number; residual_consequence?: number } | null
}

interface Control {
  id: string
  risk_id: string
  title: string
  description: string | null
  type: string
  effectiveness: number
  status: string
}

interface Profile {
  full_name: string | null
  email: string
  organization: string | null
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

function levelClass(level: string): string {
  switch (level) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-300'
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-300'
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'low': return 'bg-green-100 text-green-800 border-green-300'
    default: return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

export default function AssessmentReportPage() {
  const params = useParams()
  const assessmentId = params.id as string
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [risks, setRisks] = useState<Risk[]>([])
  const [controls, setControls] = useState<Control[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [a, r, c, p] = await Promise.all([
          fetch(`/api/assessments/${assessmentId}`),
          fetch(`/api/risks?assessmentId=${assessmentId}`),
          fetch(`/api/controls?assessmentId=${assessmentId}`),
          fetch(`/api/profiles/me`),
        ])
        if (a.ok) setAssessment(await a.json())
        if (r.ok) setRisks(await r.json())
        if (c.ok) setControls(await c.json())
        if (p.ok) setProfile(await p.json())
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [assessmentId])

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>
  if (!assessment) return <div className="flex items-center justify-center h-full"><p className="text-gray-600">Assessment not found</p></div>

  const sortedRisks = [...risks].sort((a, b) => b.risk_score - a.risk_score)
  const counts = {
    critical: risks.filter(r => r.risk_level === 'critical').length,
    high: risks.filter(r => r.risk_level === 'high').length,
    medium: risks.filter(r => r.risk_level === 'medium').length,
    low: risks.filter(r => r.risk_level === 'low').length,
  }

  return (
    <div className="bg-gray-50 print:bg-white min-h-screen">
      <div className="print:hidden bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <Link href="/dashboard/assessments" className="text-sm text-blue-600 hover:text-blue-700">
          ← Back to Assessments
        </Link>
        <Button variant="primary" onClick={() => window.print()}>Print / Save as PDF</Button>
      </div>

      <div className="max-w-4xl mx-auto p-8 print:p-0 print:max-w-none">
        <div className="bg-white print:bg-transparent border border-gray-200 print:border-0 rounded-lg p-8 print:p-6 space-y-8">
          <header className="border-b border-gray-300 pb-6">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Risk Assessment Report</p>
            <h1 className="text-3xl font-bold text-gray-900">{assessment.title}</h1>
            {assessment.description && <p className="mt-2 text-gray-700">{assessment.description}</p>}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Domain</p>
                <p className="font-medium text-gray-900">{domainLabels[assessment.domain] || assessment.domain}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-gray-900">{statusLabels[assessment.status] || assessment.status}</p>
              </div>
              <div>
                <p className="text-gray-500">Assessment Date</p>
                <p className="font-medium text-gray-900">{new Date(assessment.assessment_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Review Date</p>
                <p className="font-medium text-gray-900">{assessment.review_date ? new Date(assessment.review_date).toLocaleDateString() : '—'}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Prepared By</p>
                <p className="font-medium text-gray-900">{profile?.full_name || profile?.email || '—'}</p>
              </div>
              <div>
                <p className="text-gray-500">Organisation</p>
                <p className="font-medium text-gray-900">{profile?.organization || '—'}</p>
              </div>
              <div>
                <p className="text-gray-500">Report Generated</p>
                <p className="font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </header>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Summary</h2>
            <div className="grid grid-cols-4 gap-3">
              <div className={`rounded border p-3 ${levelClass('critical')}`}>
                <p className="text-xs uppercase">Critical</p>
                <p className="text-2xl font-bold">{counts.critical}</p>
              </div>
              <div className={`rounded border p-3 ${levelClass('high')}`}>
                <p className="text-xs uppercase">High</p>
                <p className="text-2xl font-bold">{counts.high}</p>
              </div>
              <div className={`rounded border p-3 ${levelClass('medium')}`}>
                <p className="text-xs uppercase">Medium</p>
                <p className="text-2xl font-bold">{counts.medium}</p>
              </div>
              <div className={`rounded border p-3 ${levelClass('low')}`}>
                <p className="text-xs uppercase">Low</p>
                <p className="text-2xl font-bold">{counts.low}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Register</h2>
            {sortedRisks.length === 0 ? (
              <p className="text-sm text-gray-600">No risks recorded.</p>
            ) : (
              <div className="space-y-4">
                {sortedRisks.map((risk, idx) => {
                  const riskControls = controls.filter((c) => c.risk_id === risk.id)
                  const rL = risk.notes?.residual_likelihood
                  const rC = risk.notes?.residual_consequence
                  const hasResidual = typeof rL === 'number' && typeof rC === 'number'
                  const residualScore = hasResidual ? calculateRiskScore(rL!, rC!) : null
                  const residualLevel = residualScore !== null ? getRiskLevel(residualScore) : null
                  return (
                    <div key={risk.id} className="border border-gray-200 rounded-lg p-4 print:break-inside-avoid">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <p className="text-xs text-gray-500">Risk #{idx + 1}{risk.category ? ` · ${risk.category}` : ''}</p>
                          <h3 className="font-semibold text-gray-900">{risk.title}</h3>
                        </div>
                        <span className={`shrink-0 text-xs font-semibold uppercase border rounded px-2 py-0.5 ${levelClass(risk.risk_level)}`}>
                          {risk.risk_level} · {risk.risk_score}
                        </span>
                      </div>
                      {risk.description && <p className="text-sm text-gray-700 mb-3">{risk.description}</p>}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm border-t border-gray-100 pt-3">
                        <div>
                          <p className="text-gray-500 text-xs">Inherent Likelihood</p>
                          <p className="font-medium text-gray-900">{risk.likelihood} / 5</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Inherent Consequence</p>
                          <p className="font-medium text-gray-900">{risk.consequence} / 5</p>
                        </div>
                        {hasResidual ? (
                          <>
                            <div>
                              <p className="text-gray-500 text-xs">Residual Likelihood</p>
                              <p className="font-medium text-gray-900">{rL} / 5</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Residual Score / Level</p>
                              <p className="font-medium text-gray-900">
                                {residualScore} · <span className="capitalize">{residualLevel}</span>
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="col-span-2 text-xs text-gray-400">Residual risk not assessed</div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-3">
                        <div>
                          <p className="text-gray-500 text-xs">Owner</p>
                          <p className="font-medium text-gray-900">{risk.owner || '—'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Due Date</p>
                          <p className="font-medium text-gray-900">{risk.due_date ? new Date(risk.due_date).toLocaleDateString() : '—'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Status</p>
                          <p className="font-medium text-gray-900 capitalize">{risk.status}</p>
                        </div>
                      </div>

                      {riskControls.length > 0 && (
                        <div className="mt-4 border-t border-gray-100 pt-3">
                          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Controls ({riskControls.length})</p>
                          <ul className="space-y-2">
                            {riskControls.map((control) => (
                              <li key={control.id} className="text-sm">
                                <p className="font-medium text-gray-900">{control.title}</p>
                                {control.description && <p className="text-gray-600 text-xs">{control.description}</p>}
                                <p className="text-xs text-gray-500 mt-1">
                                  Type: <span className="capitalize">{control.type}</span> · Effectiveness: {control.effectiveness}% · Status: <span className="capitalize">{control.status}</span>
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          <footer className="border-t border-gray-300 pt-4 text-xs text-gray-500">
            <p>This report was generated by risk-assessment.com.au. It does not constitute legal advice.
              Risk assessments should be reviewed periodically and after any material change in operations or incidents.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
