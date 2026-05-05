'use client'

import { useEffect, useState, FormEvent } from 'react'
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
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createError, setCreateError] = useState('')
  const [formData, setFormData] = useState({ name: '', domain: 'operational', description: '' })

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setTemplates(data) })
      .finally(() => setIsLoading(false))
  }, [])

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    setCreateError('')
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setCreateError(data.error || 'Failed to create template')
        return
      }
      setTemplates((prev) => [data, ...prev])
      setShowCreate(false)
      setFormData({ name: '', domain: 'operational', description: '' })
    } catch {
      setCreateError('Failed to create template')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowCreate(false)
    setCreateError('')
    setFormData({ name: '', domain: 'operational', description: '' })
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
                <p className="text-sm text-gray-600 mb-4">Domain: {domainLabels[template.domain] || template.domain}</p>
                {template.is_system_template && <p className="text-xs text-blue-600 mb-3">System Template</p>}
                <Button variant="outline" size="sm" className="w-full">Use Template</Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showCreate} onClose={closeModal} title="Create Template" size="md">
        <form onSubmit={handleCreate} className="space-y-4">
          {createError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{createError}</div>
          )}
          <Input
            label="Template Name"
            placeholder="e.g., WHS Incident Review Template"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <Select
            label="Domain"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            options={domainOptions}
            disabled={isSubmitting}
          />
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Optional: Describe what this template is used for"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={closeModal} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>Create Template</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
