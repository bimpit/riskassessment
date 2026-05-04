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
  description: string | null
  domain: string
  status: string
  assessment_date: string
  created_at: string
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

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const res = await fetch('/api/assessments')
        if (res.ok) {
          const data = await res.json()
          setAssessments(data)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadAssessments()
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
    <div className="p-8">
      <div className="flex justify-end mb-6">
        <Link href="/dashboard/assessments/new">
          <Button variant="primary">New Assessment</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {assessments.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments</h3>
            <p className="text-gray-600 mb-4">
              Create your first assessment to get started with risk management.
            </p>
            <Link href="/dashboard/assessments/new">
              <Button variant="primary">Create First Assessment</Button>
            </Link>
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
              <tbody className="divide-y divide-gray-200">
                {assessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{assessment.title}</p>
                        {assessment.description && (
                          <p className="text-sm text-gray-600">{assessment.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="default">
                        {domainLabels[assessment.domain] || assessment.domain}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          assessment.status === 'completed'
                            ? 'success'
                            : assessment.status === 'draft'
                            ? 'default'
                            : 'warning'
                        }
                      >
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
                        <Link href={`/dashboard/assessments/${assessment.id}/risks`}>
                          <Button variant="secondary" size="sm">Risks</Button>
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
