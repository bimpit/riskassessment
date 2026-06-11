'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { RichTextEditor } from '@/components/ui/RichTextEditor'

export default function NewAssessmentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: 'operational',
    assessment_date: new Date().toISOString().split('T')[0],
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create assessment')
        return
      }

      router.push(`/dashboard/assessments/${data.id}/report`)
    } catch (err) {
      setError('Failed to create assessment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Assessment</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <Input
          label="Assessment Title"
          placeholder="e.g., Q2 2024 Warehouse Safety Review"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isLoading}
        />

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
          <RichTextEditor
            value={formData.description}
            onChange={(html) => setFormData({ ...formData, description: html })}
            placeholder="Optional: Provide context for this assessment"
            disabled={isLoading}
          />
        </div>

        <Select
          label="Domain"
          value={formData.domain}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
          options={[
            { value: 'whs', label: 'Work Health & Safety (WHS)' },
            { value: 'aml', label: 'Anti-Money Laundering (AML)' },
            { value: 'privacy', label: 'Privacy' },
            { value: 'fairwork', label: 'Fair Work' },
            { value: 'operational', label: 'Operational' },
          ]}
          disabled={isLoading}
        />

        <Input
          label="Assessment Date"
          type="date"
          value={formData.assessment_date}
          onChange={(e) => setFormData({ ...formData, assessment_date: e.target.value })}
          required
          disabled={isLoading}
        />

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Create Assessment
          </Button>
        </div>
      </form>
    </div>
  )
}
