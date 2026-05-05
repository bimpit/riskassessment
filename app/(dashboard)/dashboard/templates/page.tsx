'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'

interface Template {
  id: string
  name: string
  domain: string
  is_system_template: boolean
  created_at: string
  template_data: { description?: string } | null
}

const domainLabels: Record<string, string> = { whs: 'WHS', aml: 'AML', privacy: 'Privacy', fairwork: 'Fair Work', operational: 'Operational' }

const domainOptions = [
  { value: 'whs', label: 'Work Health & Safety (WHS)' },
  { value: 'aml', label: 'Anti-Money Laundering (AML)' },
  { value: 'privacy', label: 'Privacy' },
  { value: 'fairwork', label: 'Fair Work' },
  { value: 'operational', label: 'Operational' },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [showCreate, setShowCreate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [createForm, setCreateForm] = useState({ name: '', domain: 'operational', description: '' })

  const [useTemplate, setUseTemplate] = useState<Template | null>(null)
  const [isUsing, setIsUsing] = useState(false)
  const [useError, setUseError] = useState('')
  const [useForm, setUseForm] = useState({ title: '', assessment_date: new Date().toISOString().split('T')[0] })

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setTemplates(data) })
      .finally(() => setIsLoading(false))
  }, [])

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    setCreateError('')
    setIsCreating(true)
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      })
      const data = await res.json()
      if (!res.ok) { setCreateError(data.error || 'Failed to create template'); return }
      setTemplates((prev) => [data, ...prev])
      setShowCreate(false)
      setCreateForm({ name: '', domain: 'operational', description: '' })
    } catch {
      setCreateError('Failed to create template')
    } finally {
      setIsCreating(false)
    }
  }

  const closeCreate = () => {
    setShowCreate(false)
    setCreateError('')
    setCreateForm({ name: '', domain: 'operational', description: '' })
  }

  const openUseTemplate = (template: Template) => {
    setUseTemplate(template)
    setUseError('')
    setUseForm({ title: '', assessment_date: new Date().toISOString().split('T')[0] })
  }

  const handleUseTemplate = async (e: FormEvent) => {
    e.preventDefault()
    if (!useTemplate) return
    setUseError('')
    setIsUsing(true)
    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: useForm.title,
          description: useTemplate.template_data?.description || '',
          domain: useTemplate.domain,
          assessment_date: useForm.assessment_date,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setUseError(data.error || 'Failed to create assessment'); return }
      router.push(`/dashboard/assessments/${data.id}/risks`)
    } catch {
      setUseError('Failed to create assessment')
    } finally {
      setIsUsing(false)
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  return (
    <div className="p-8">
      <div className="flex justify-end mb-6">
        <Button variant="primary" onClick={() => setShowCreate(true)}>New Template</Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {templates.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates</h3>
            <p className="text-gray-600 mb-4">Create a template to reuse common risk assessment structures.</p>
            <Button variant="primary" onClick={() => setShowCreate(true)}>Create First Template</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {templates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Domain: {domainLabels[template.domain] || template.domain}</p>
                {template.template_data?.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{template.template_data.description}</p>
                )}
                {template.is_system_template && <p className="text-xs text-blue-600 mb-3">System Template</p>}
                <Button variant="outline" size="sm" className="w-full" onClick={() => openUseTemplate(template)}>
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create template modal */}
      <Modal isOpen={showCreate} onClose={closeCreate} title="Create Template" size="md">
        <form onSubmit={handleCreate} className="space-y-4">
          {createError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{createError}</div>
          )}
          <Input
            label="Template Name"
            placeholder="e.g., WHS Incident Review Template"
            value={createForm.name}
            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
            required
            disabled={isCreating}
          />
          <Select
            label="Domain"
            value={createForm.domain}
            onChange={(e) => setCreateForm({ ...createForm, domain: e.target.value })}
            options={domainOptions}
            disabled={isCreating}
          />
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Optional: Describe what this template is used for"
              value={createForm.description}
              onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
              disabled={isCreating}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={closeCreate} disabled={isCreating}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={isCreating}>Create Template</Button>
          </div>
        </form>
      </Modal>

      {/* Use template modal */}
      <Modal isOpen={!!useTemplate} onClose={() => setUseTemplate(null)} title={`New Assessment from "${useTemplate?.name}"`} size="md">
        <form onSubmit={handleUseTemplate} className="space-y-4">
          {useError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{useError}</div>
          )}
          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            Domain: <span className="font-medium text-gray-900">{domainLabels[useTemplate?.domain ?? ''] || useTemplate?.domain}</span>
          </div>
          <Input
            label="Assessment Title"
            placeholder="e.g., Q2 2025 WHS Review"
            value={useForm.title}
            onChange={(e) => setUseForm({ ...useForm, title: e.target.value })}
            required
            disabled={isUsing}
          />
          <Input
            label="Assessment Date"
            type="date"
            value={useForm.assessment_date}
            onChange={(e) => setUseForm({ ...useForm, assessment_date: e.target.value })}
            required
            disabled={isUsing}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setUseTemplate(null)} disabled={isUsing}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={isUsing}>Create Assessment</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
