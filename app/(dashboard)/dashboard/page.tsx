'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import Link from 'next/link'
import { Spinner } from '@/components/ui/Spinner'
import { RiskMatrix } from '@/components/RiskMatrix'

interface Assessment {
  id: string
  title: string
  domain: string
  status: string
  assessment_date: string
}

interface Risk {
  id: string
  title: string
  likelihood: number
  consequence: number
  risk_level: string
  owner: string | null
  due_date: string | null
  status: string
}

interface RiskSummary {
  critical: number
  high: number
  medium: number
  low: number
  total: number
}

const domainLabels: Record<string, string> = {
  whs: 'WHS',
  aml: 'AML',
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

function daysFromNow(dateStr: string): number {
  const due = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  return Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export default function DashboardPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [risks, setRisks] = useState<Risk[]>([])
  const [riskSummary, setRiskSummary] = useState<RiskSummary>({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [assessmentsRes, risksRes] = await Promise.all([
          fetch('/api/assessments'),
          fetch('/api/risks'),
        ])

        if (assessmentsRes.ok) {
          const data: Assessment[] = await assessmentsRes.json()
          setAssessments(data.slice(0, 5))
        }

        if (risksRes.ok) {
          const risksData: Risk[] = await risksRes.json()
          setRisks(risksData)
          setRiskSummary({
            critical: risksData.filter((r) => r.risk_level === 'critical').length,
            high: risksData.filter((r) => r.risk_level === 'high').length,
            medium: risksData.filter((r) => r.risk_level === 'medium').length,
            low: risksData.filter((r) => r.risk_level === 'low').length,
            total: risksData.length,
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    setDeleteError('')
    try {
      const res = await fetch(`/api/assessments/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setDeleteError(data.error || 'Failed to delete')
        return
      }
      setAssessments((prev) => prev.filter((a) => a.id !== deleteId))
      setDeleteId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  const deleteTarget = assessments.find((a) => a.id === deleteId)

  const overdue = risks
    .filter((r) => r.status !== 'closed' && r.due_date && daysFromNow(r.due_date) < 0)
    .sort((a, b) => daysFromNow(a.due_date!) - daysFromNow(b.due_date!))
  const dueSoon = risks
    .filter((r) => {
      if (r.status === 'closed' || !r.due_date) return false
      const d = daysFromNow(r.due_date)
      return d >= 0 && d <= 7
    })
    .sort((a, b) => daysFromNow(a.due_date!) - daysFromNow(b.due_date!))

  return (
    <div className="p-8 space-y-8">
      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Risks</h3>
          <p className="text-3xl font-bold text-gray-900">{riskSummary.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <h3 className="text-sm font-medium text-red-600 mb-2">Critical</h3>
          <p className="text-3xl font-bold text-red-700">{riskSummary.critical}</p>
        </div>
        <div className="bg-white rounded-lg border border-orange-200 p-6">
          <h3 className="text-sm font-medium text-orange-600 mb-2">High</h3>
          <p className="text-3xl font-bold text-orange-700">{riskSummary.high}</p>
        </div>
        <div className="bg-white rounded-lg border border-yellow-200 p-6">
          <h3 className="text-sm font-medium text-yellow-600 mb-2">Medium</h3>
          <p className="text-3xl font-bold text-yellow-700">{riskSummary.medium}</p>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-6">
          <h3 className="text-sm font-medium text-green-600 mb-2">Low</h3>
          <p className="text-3xl font-bold text-green-700">{riskSummary.low}</p>
        </div>
      </div>

      <RiskMatrix risks={risks} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-red-200">
          <div className="p-4 border-b border-red-100 flex items-center justify-between">
            <h3 className="font-semibold text-red-700">Overdue Actions</h3>
            <span className="text-sm text-red-700 font-medium">{overdue.length}</span>
          </div>
          {overdue.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No overdue risks. Nice work.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {overdue.slice(0, 5).map((r) => (
                <li key={r.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/dashboard/risk-register/${r.id}`} className="font-medium text-gray-900 hover:text-blue-600 block truncate">{r.title}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Due {new Date(r.due_date!).toLocaleDateString()} · {Math.abs(daysFromNow(r.due_date!))} days overdue{r.owner ? ` · ${r.owner}` : ''}
                    </p>
                  </div>
                  <Badge variant={r.risk_level as any}>{r.risk_level}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-lg border border-yellow-200">
          <div className="p-4 border-b border-yellow-100 flex items-center justify-between">
            <h3 className="font-semibold text-yellow-700">Due This Week</h3>
            <span className="text-sm text-yellow-700 font-medium">{dueSoon.length}</span>
          </div>
          {dueSoon.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">Nothing due in the next 7 days.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {dueSoon.slice(0, 5).map((r) => (
                <li key={r.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/dashboard/risk-register/${r.id}`} className="font-medium text-gray-900 hover:text-blue-600 block truncate">{r.title}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Due {new Date(r.due_date!).toLocaleDateString()} · in {daysFromNow(r.due_date!)} days{r.owner ? ` · ${r.owner}` : ''}
                    </p>
                  </div>
                  <Badge variant={r.risk_level as any}>{r.risk_level}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Assessments</h2>
          <Link href="/dashboard/assessments/new">
            <Button variant="primary" size="sm">
              New Assessment
            </Button>
          </Link>
        </div>

        {assessments.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            <p>No assessments yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Domain</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment) => (
                  <tr key={assessment.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{assessment.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="default">{domainLabels[assessment.domain] || assessment.domain}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={assessment.status === 'completed' ? 'success' : assessment.status === 'draft' ? 'default' : 'warning'}>
                        {statusLabels[assessment.status] || assessment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(assessment.assessment_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/assessments/${assessment.id}/risks`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => { setDeleteId(assessment.id); setDeleteError('') }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!deleteId}
        onClose={() => { setDeleteId(null); setDeleteError('') }}
        title="Delete Assessment"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteTarget?.title}</span>?
            This will also delete all associated risks and cannot be undone.
          </p>
          {deleteError && (
            <p className="text-sm text-red-600">{deleteError}</p>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => { setDeleteId(null); setDeleteError('') }} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
