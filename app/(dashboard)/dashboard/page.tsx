'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import Link from 'next/link'
import { Spinner } from '@/components/ui/Spinner'

interface Assessment {
  id: string
  title: string
  domain: string
  status: string
  assessment_date: string
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

export default function DashboardPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
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
          const risksData: { risk_level: string }[] = await risksRes.json()
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
                        <Link href={`/dashboard/assessments/${assessment.id}`}>
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
