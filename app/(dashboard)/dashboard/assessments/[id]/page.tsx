'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Spinner } from '@/components/ui/Spinner'
import Link from 'next/link'

interface Assessment {
  id: string
  title: string
  description: string | null
  domain: string
  status: string
  assessment_date: string
  review_date: string | null
}

export default function AssessmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.id as string
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    fetch(`/api/assessments/${assessmentId}`)
      .then((r) => r.json())
      .then((data) => { if (!data.error) setAssessment(data) })
      .finally(() => setIsLoading(false))
  }, [assessmentId])

  const handleSave = async () => {
    if (!assessment) return
    setIsSaving(true)
    setError('')
    setSavedSuccess(false)
    try {
      const res = await fetch(`/api/assessments/${assessmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: assessment.title,
          description: assessment.description,
          domain: assessment.domain,
          status: assessment.status,
          assessment_date: assessment.assessment_date,
          review_date: assessment.review_date,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Save failed'); return }
      setAssessment(data)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>
  if (!assessment) return <div className="flex items-center justify-center h-full"><p className="text-gray-600">Assessment not found</p></div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/dashboard/assessments" className="text-sm text-blue-600 hover:text-blue-700">
          ← Back to Assessments
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Assessment Details</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>}
        {savedSuccess && <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">Assessment saved successfully.</div>}
        <Input label="Title" value={assessment.title} onChange={(e) => setAssessment({ ...assessment, title: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
          <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={assessment.description || ''} onChange={(e) => setAssessment({ ...assessment, description: e.target.value })} />
        </div>
        <Select label="Domain" value={assessment.domain} onChange={(e) => setAssessment({ ...assessment, domain: e.target.value })} options={[{ value: 'whs', label: 'WHS' }, { value: 'aml', label: 'AML' }, { value: 'privacy', label: 'Privacy' }, { value: 'fairwork', label: 'Fair Work' }, { value: 'operational', label: 'Operational' }]} />
        <Select label="Status" value={assessment.status} onChange={(e) => setAssessment({ ...assessment, status: e.target.value })} options={[{ value: 'draft', label: 'Draft' }, { value: 'in_progress', label: 'In Progress' }, { value: 'completed', label: 'Completed' }, { value: 'archived', label: 'Archived' }]} />
        <Input label="Assessment Date" type="date" value={assessment.assessment_date} onChange={(e) => setAssessment({ ...assessment, assessment_date: e.target.value })} />
        <Input label="Review Date" type="date" value={assessment.review_date || ''} onChange={(e) => setAssessment({ ...assessment, review_date: e.target.value || null })} />
        <div className="flex gap-4 pt-4">
          <Button onClick={handleSave} variant="primary" isLoading={isSaving}>Save Changes</Button>
          <Button onClick={() => router.push('/dashboard/assessments')} variant="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  )
}
