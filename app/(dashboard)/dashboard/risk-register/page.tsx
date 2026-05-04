'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import Link from 'next/link'
import { Spinner } from '@/components/ui/Spinner'

interface Risk {
  id: string
  title: string
  risk_level: string
  risk_score: number
  owner: string | null
  status: string
  due_date: string | null
}

const riskStatusLabels: Record<string, string> = {
  open: 'Open',
  mitigating: 'Mitigating',
  closed: 'Closed',
}

export default function RiskRegisterPage() {
  const [risks, setRisks] = useState<Risk[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterLevel, setFilterLevel] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    fetch('/api/risks')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRisks(data) })
      .finally(() => setIsLoading(false))
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    setDeleteError('')
    try {
      const res = await fetch(`/api/risks/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setDeleteError(data.error || 'Failed to delete')
        return
      }
      setRisks((prev) => prev.filter((r) => r.id !== deleteId))
      setDeleteId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredRisks = filterLevel ? risks.filter((r) => r.risk_level === filterLevel) : risks

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  const deleteTarget = risks.find((r) => r.id === deleteId)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Risk Register</h1>
      </div>
      <div className="mb-6 flex gap-2 flex-wrap">
        <Button variant={filterLevel === null ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterLevel(null)}>
          All ({risks.length})
        </Button>
        {['critical', 'high', 'medium', 'low'].map((level) => (
          <Button
            key={level}
            variant={filterLevel === level ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilterLevel(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)} ({risks.filter((r) => r.risk_level === level).length})
          </Button>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredRisks.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No risks</h3>
            <p className="text-gray-600">Create an assessment to identify risks.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Risk</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Owner</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRisks.map((risk) => (
                  <tr key={risk.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{risk.title}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">{risk.risk_score}</td>
                    <td className="px-6 py-4">
                      <Badge variant={risk.risk_level as any}>
                        {risk.risk_level.charAt(0).toUpperCase() + risk.risk_level.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{risk.owner || '-'}</td>
                    <td className="px-6 py-4">
                      <Badge variant={risk.status === 'closed' ? 'success' : 'warning'}>
                        {riskStatusLabels[risk.status] || risk.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {risk.due_date ? new Date(risk.due_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/risk-register/${risk.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => { setDeleteId(risk.id); setDeleteError('') }}
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
        title="Delete Risk"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteTarget?.title}</span>?
            This cannot be undone.
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
