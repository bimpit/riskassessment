'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const domainLabels: Record<string, string> = {
    whs: 'WHS',
    aml: 'AML',
    privacy: 'Privacy',
    fairwork: 'Fair Work',
    operational: 'Operational',
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
        <Link href="/dashboard/assessments/new">
          <Button variant="primary">
            New Assessment
          </Button>
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
                        {assessment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(assessment.assessment_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <Link href={`/dashboard/assessments/${assessment.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/assessments/${assessment.id}/risks`}>
                        <Button variant="secondary" size="sm">
                          Risks
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
