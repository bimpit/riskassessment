'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Spinner } from '@/components/ui/Spinner'
import { Modal } from '@/components/ui/Modal'
import { RichTextEditor } from '@/components/ui/RichTextEditor'
import { calculateRiskScore, getRiskLevel, getLikelihoodLabel, getConsequenceLabel } from '@/lib/risk-scoring'
import Link from 'next/link'

interface RiskNotes {
  residual_likelihood?: number
  residual_consequence?: number
  [key: string]: unknown
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
  notes: RiskNotes | null
}

interface Control {
  id: string
  risk_id: string
  title: string
  description: string | null
  type: string
  effectiveness: number
  status: string
  implementation_date: string | null
}

const controlTypeOptions = [
  { value: 'preventive', label: 'Preventive' },
  { value: 'detective', label: 'Detective' },
  { value: 'corrective', label: 'Corrective' },
]

const controlStatusOptions = [
  { value: 'planned', label: 'Planned' },
  { value: 'implemented', label: 'Implemented' },
  { value: 'ineffective', label: 'Ineffective' },
]

function levelColor(level: string): string {
  switch (level) {
    case 'critical': return 'text-red-600'
    case 'high': return 'text-orange-600'
    case 'medium': return 'text-yellow-600'
    case 'low': return 'text-green-600'
    default: return 'text-gray-600'
  }
}

export default function RiskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const riskId = params.id as string
  const [risk, setRisk] = useState<Risk | null>(null)
  const [controls, setControls] = useState<Control[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Control modal state
  const [showControlModal, setShowControlModal] = useState(false)
  const [editingControl, setEditingControl] = useState<Control | null>(null)
  const [controlForm, setControlForm] = useState({
    title: '',
    description: '',
    type: 'preventive',
    effectiveness: 50,
    status: 'planned',
  })
  const [isSavingControl, setIsSavingControl] = useState(false)
  const [controlError, setControlError] = useState('')

  // Delete control modal
  const [deleteControlId, setDeleteControlId] = useState<string | null>(null)
  const [isDeletingControl, setIsDeletingControl] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const [r, c] = await Promise.all([
          fetch(`/api/risks/${riskId}`),
          fetch(`/api/controls?riskId=${riskId}`),
        ])
        if (r.ok) {
          const data = await r.json()
          if (!data.error) setRisk(data)
        }
        if (c.ok) {
          const data = await c.json()
          if (Array.isArray(data)) setControls(data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [riskId])

  const handleSave = async () => {
    if (!risk) return
    setIsSaving(true)
    setError('')
    setSavedSuccess(false)
    try {
      const res = await fetch(`/api/risks/${riskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: risk.title,
          description: risk.description,
          category: risk.category,
          likelihood: risk.likelihood,
          consequence: risk.consequence,
          owner: risk.owner,
          due_date: risk.due_date,
          status: risk.status,
          notes: risk.notes,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Save failed'); return }
      setRisk(data)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const openAddControl = () => {
    setEditingControl(null)
    setControlForm({ title: '', description: '', type: 'preventive', effectiveness: 50, status: 'planned' })
    setControlError('')
    setShowControlModal(true)
  }

  const openEditControl = (control: Control) => {
    setEditingControl(control)
    setControlForm({
      title: control.title,
      description: control.description || '',
      type: control.type,
      effectiveness: control.effectiveness,
      status: control.status,
    })
    setControlError('')
    setShowControlModal(true)
  }

  const closeControlModal = () => {
    setShowControlModal(false)
    setControlError('')
  }

  const handleControlSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!controlForm.title.trim()) {
      setControlError('Title is required')
      return
    }
    setIsSavingControl(true)
    setControlError('')
    try {
      if (editingControl) {
        const res = await fetch(`/api/controls/${editingControl.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(controlForm),
        })
        const data = await res.json()
        if (!res.ok) { setControlError(data.error || 'Failed to update control'); return }
        setControls((prev) => prev.map((c) => (c.id === data.id ? data : c)))
      } else {
        const res = await fetch('/api/controls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...controlForm, risk_id: riskId }),
        })
        const data = await res.json()
        if (!res.ok) { setControlError(data.error || 'Failed to add control'); return }
        setControls((prev) => [...prev, data])
      }
      setShowControlModal(false)
    } finally {
      setIsSavingControl(false)
    }
  }

  const handleDeleteControl = async () => {
    if (!deleteControlId) return
    setIsDeletingControl(true)
    try {
      const res = await fetch(`/api/controls/${deleteControlId}`, { method: 'DELETE' })
      if (res.ok) {
        setControls((prev) => prev.filter((c) => c.id !== deleteControlId))
      }
      setDeleteControlId(null)
    } finally {
      setIsDeletingControl(false)
    }
  }

  const setResidual = (key: 'residual_likelihood' | 'residual_consequence', value: number) => {
    if (!risk) return
    const newNotes: RiskNotes = { ...(risk.notes || {}), [key]: value }
    setRisk({ ...risk, notes: newNotes })
  }

  const clearResidual = () => {
    if (!risk) return
    const newNotes: RiskNotes = { ...(risk.notes || {}) }
    delete newNotes.residual_likelihood
    delete newNotes.residual_consequence
    setRisk({ ...risk, notes: newNotes })
  }

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>
  if (!risk) return <div className="flex items-center justify-center h-full"><p className="text-gray-600">Risk not found</p></div>

  const rL = risk.notes?.residual_likelihood
  const rC = risk.notes?.residual_consequence
  const hasResidual = typeof rL === 'number' && typeof rC === 'number'
  const residualScore = hasResidual ? calculateRiskScore(rL!, rC!) : null
  const residualLevel = residualScore !== null ? getRiskLevel(residualScore) : null
  const deleteTarget = controls.find((c) => c.id === deleteControlId)

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/dashboard/risk-register" className="text-sm text-blue-600 hover:text-blue-700">
          ← Back to Risk Register
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Risk Details</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>}
        {savedSuccess && <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">Risk saved successfully.</div>}

        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Inherent Risk</p>
            <p className={`text-2xl font-bold ${levelColor(risk.risk_level)} capitalize`}>{risk.risk_level}</p>
            <p className="text-sm text-gray-600 mt-1">Score: {risk.risk_score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Residual Risk</p>
            {residualLevel ? (
              <>
                <p className={`text-2xl font-bold ${levelColor(residualLevel)} capitalize`}>{residualLevel}</p>
                <p className="text-sm text-gray-600 mt-1">Score: {residualScore}</p>
              </>
            ) : (
              <p className="text-sm text-gray-400 italic mt-2">Not assessed</p>
            )}
          </div>
        </div>

        <Input label="Title" value={risk.title} onChange={(e) => setRisk({ ...risk, title: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
          <RichTextEditor
            value={risk.description || ''}
            onChange={(html) => setRisk({ ...risk, description: html })}
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Inherent Risk (before controls)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Likelihood ({getLikelihoodLabel(risk.likelihood)})</label>
              <input type="range" min="1" max="5" step="0.5" value={risk.likelihood} onChange={(e) => setRisk({ ...risk, likelihood: parseFloat(e.target.value) })} className="w-full" />
              <p className="text-sm text-gray-600 mt-1">{risk.likelihood}/5</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Consequence ({getConsequenceLabel(risk.consequence)})</label>
              <input type="range" min="1" max="5" step="0.5" value={risk.consequence} onChange={(e) => setRisk({ ...risk, consequence: parseFloat(e.target.value) })} className="w-full" />
              <p className="text-sm text-gray-600 mt-1">{risk.consequence}/5</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Residual Risk (after controls)</h3>
            {hasResidual && (
              <button type="button" onClick={clearResidual} className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
            )}
          </div>
          {!hasResidual && (
            <p className="text-sm text-gray-600">
              Estimate the risk after the controls below are applied. Leave unset if controls are not yet implemented.
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Residual Likelihood {hasResidual ? `(${getLikelihoodLabel(rL!)})` : ''}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={rL ?? risk.likelihood}
                onChange={(e) => setResidual('residual_likelihood', parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-600 mt-1">{hasResidual ? `${rL}/5` : 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Residual Consequence {hasResidual ? `(${getConsequenceLabel(rC!)})` : ''}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={rC ?? risk.consequence}
                onChange={(e) => setResidual('residual_consequence', parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-600 mt-1">{hasResidual ? `${rC}/5` : 'Not set'}</p>
            </div>
          </div>
        </div>

        <Input label="Category" value={risk.category || ''} onChange={(e) => setRisk({ ...risk, category: e.target.value })} placeholder="e.g., Operational, Compliance, Financial" />
        <Input label="Owner" value={risk.owner || ''} onChange={(e) => setRisk({ ...risk, owner: e.target.value || null })} placeholder="Name or email of risk owner" />
        <Input label="Due Date" type="date" value={risk.due_date || ''} onChange={(e) => setRisk({ ...risk, due_date: e.target.value || null })} />
        <Select label="Status" value={risk.status} onChange={(e) => setRisk({ ...risk, status: e.target.value })} options={[{ value: 'open', label: 'Open' }, { value: 'mitigating', label: 'Mitigating' }, { value: 'closed', label: 'Closed' }]} />

        <div className="flex gap-4 pt-4">
          <Button onClick={handleSave} variant="primary" isLoading={isSaving}>Save Changes</Button>
          <Button onClick={() => router.push('/dashboard/risk-register')} variant="secondary">Cancel</Button>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Controls ({controls.length})</h2>
          <Button variant="primary" size="sm" onClick={openAddControl}>Add Control</Button>
        </div>

        {controls.length === 0 ? (
          <p className="text-sm text-gray-600">No controls yet. Add controls to mitigate this risk and reduce residual exposure.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {controls.map((control) => (
              <li key={control.id} className="py-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{control.title}</p>
                  {control.description && (
                    <div className="text-sm text-gray-600 mt-0.5 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: control.description }} />
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="capitalize">{control.type}</span> · Effectiveness: {control.effectiveness}% · <span className="capitalize">{control.status}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openEditControl(control)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => setDeleteControlId(control.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal isOpen={showControlModal} onClose={closeControlModal} title={editingControl ? 'Edit Control' : 'Add Control'} size="md">
        <form onSubmit={handleControlSubmit} className="space-y-4">
          {controlError && <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">{controlError}</div>}
          <Input
            label="Title"
            value={controlForm.title}
            onChange={(e) => setControlForm({ ...controlForm, title: e.target.value })}
            required
            disabled={isSavingControl}
            placeholder="e.g., Quarterly safety inspections"
          />
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <RichTextEditor
              value={controlForm.description}
              onChange={(html) => setControlForm({ ...controlForm, description: html })}
              disabled={isSavingControl}
            />
          </div>
          <Select
            label="Type"
            value={controlForm.type}
            onChange={(e) => setControlForm({ ...controlForm, type: e.target.value })}
            options={controlTypeOptions}
            disabled={isSavingControl}
          />
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Effectiveness ({controlForm.effectiveness}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={controlForm.effectiveness}
              onChange={(e) => setControlForm({ ...controlForm, effectiveness: parseInt(e.target.value) })}
              className="w-full"
              disabled={isSavingControl}
            />
          </div>
          <Select
            label="Status"
            value={controlForm.status}
            onChange={(e) => setControlForm({ ...controlForm, status: e.target.value })}
            options={controlStatusOptions}
            disabled={isSavingControl}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={closeControlModal} disabled={isSavingControl}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={isSavingControl}>{editingControl ? 'Save Changes' : 'Add Control'}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteControlId} onClose={() => setDeleteControlId(null)} title="Delete Control" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteTarget?.title}</span>? This cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteControlId(null)} disabled={isDeletingControl}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteControl} isLoading={isDeletingControl}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
