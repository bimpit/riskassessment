'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Spinner } from '@/components/ui/Spinner'
import { getLikelihoodLabel, getConsequenceLabel } from '@/lib/risk-scoring'
import Link from 'next/link'

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
  notes: any
}

export default function RiskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const riskId = params.id as string
  const [risk, setRisk] = useState<Risk | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    fetch(`/api/risks/${riskId}`)
      .then((r) => r.json())
      .then((data) => { if (!data.error) setRisk(data) })
      .finally(() => setIsLoading(false))
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

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>
  if (!risk) return <div className="flex items-center justify-center h-full"><p className="text-gray-600">Risk not found</p></div>

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
          <div><p className="text-sm text-gray-600">Risk Score</p><p className="text-2xl font-bold text-gray-900">{risk.risk_score}</p></div>
          <div><p className="text-sm text-gray-600">Risk Level</p>
            <p className={`text-2xl font-bold capitalize ${risk.risk_level === 'critical' ? 'text-red-600' : risk.risk_level === 'high' ? 'text-orange-600' : risk.risk_level === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
              {risk.risk_level}
            </p>
          </div>
        </div>
        <Input label="Title" value={risk.title} onChange={(e) => setRisk({ ...risk, title: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
          <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} value={risk.description || ''} onChange={(e) => setRisk({ ...risk, description: e.target.value })} />
        </div>
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
        <Input label="Category" value={risk.category || ''} onChange={(e) => setRisk({ ...risk, category: e.target.value })} placeholder="e.g., Operational, Compliance, Financial" />
        <Input label="Owner" value={risk.owner || ''} onChange={(e) => setRisk({ ...risk, owner: e.target.value || null })} placeholder="Name or email of risk owner" />
        <Input label="Due Date" type="date" value={risk.due_date || ''} onChange={(e) => setRisk({ ...risk, due_date: e.target.value || null })} />
        <Select label="Status" value={risk.status} onChange={(e) => setRisk({ ...risk, status: e.target.value })} options={[{ value: 'open', label: 'Open' }, { value: 'mitigating', label: 'Mitigating' }, { value: 'closed', label: 'Closed' }]} />
        <div className="flex gap-4 pt-4">
          <Button onClick={handleSave} variant="primary" isLoading={isSaving}>Save Changes</Button>
          <Button onClick={() => router.push('/dashboard/risk-register')} variant="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  )
}
