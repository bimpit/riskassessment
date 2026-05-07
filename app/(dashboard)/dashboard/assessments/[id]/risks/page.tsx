'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
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
  status: string
}

interface Assessment {
  title: string
  domain: string
}

const domainLabels: Record<string, string> = {
  whs: 'WHS',
  aml: 'AML',
  privacy: 'Privacy',
  fairwork: 'Fair Work',
  operational: 'Operational',
}

export default function AssessmentRisksPage() {
  const params = useParams()
  const assessmentId = params.id as string
  const [risks, setRisks] = useState<Risk[]>([])
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [generateContext, setGenerateContext] = useState('')
  const [generateError, setGenerateError] = useState('')
  const [needsUpgrade, setNeedsUpgrade] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [assessmentRes, risksRes, eligibilityRes] = await Promise.all([
          fetch(`/api/assessments/${assessmentId}`),
          fetch(`/api/risks?assessmentId=${assessmentId}`),
          fetch(`/api/assessments/${assessmentId}/generate`),
        ])
        if (assessmentRes.ok) setAssessment(await assessmentRes.json())
        if (risksRes.ok) setRisks(await risksRes.json())
        if (eligibilityRes.ok) {
          const eligibility = await eligibilityRes.json()
          if (eligibility?.canGenerate === false) setNeedsUpgrade(true)
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [assessmentId])

  const handleOpenGenerate = () => {
    if (needsUpgrade) {
      setShowUpgradeModal(true)
    } else {
      setShowGenerateModal(true)
    }
  }

  const handleGenerate = async () => {
    if (!generateContext.trim()) {
      setGenerateError('Please describe your workplace or activity before generating.')
      return
    }
    setIsGenerating(true)
    setGenerateError('')
    try {
      const res = await fetch(`/api/assessments/${assessmentId}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: assessment?.domain, context: generateContext }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.upgrade) {
          setNeedsUpgrade(true)
          setShowGenerateModal(false)
          setShowUpgradeModal(true)
        } else {
          setGenerateError(data.error || 'Failed to generate risks')
        }
        return
      }
      setRisks((prev) => [...prev, ...data])
      setShowGenerateModal(false)
      setGenerateContext('')
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  const domainLabel = domainLabels[assessment?.domain ?? ''] || assessment?.domain

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risks for {assessment?.title}</h1>
          <p className="text-gray-600 mt-2">Domain: {domainLabel}</p>
        </div>
        <Button variant="primary" onClick={handleOpenGenerate}>Generate with AI</Button>
      </div>

      {/* Generate context modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => { setShowGenerateModal(false); setGenerateError('') }}
        title="Generate Risks with AI"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            AI will generate 5–8 scored risks tailored to your{' '}
            <span className="font-medium">{domainLabel}</span> assessment and add them directly to this list.
            Each risk will include a title, description, category, and likelihood and consequence scores.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Describe your workplace or activity
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              placeholder="E.g. 'Warehouse operations with heavy machinery and 50+ staff' or 'Aged-care facility providing in-home services across regional Victoria'"
              value={generateContext}
              onChange={(e) => setGenerateContext(e.target.value)}
            />
          </div>
          {generateError && <p className="text-sm text-red-600">{generateError}</p>}
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => { setShowGenerateModal(false); setGenerateError('') }}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleGenerate} isLoading={isGenerating}>
              Generate with AI
            </Button>
          </div>
        </div>
      </Modal>

      {/* Upgrade modal */}
      <Modal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Upgrade Required"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Your free plan includes one AI risk generation. Upgrade to Pro to generate unlimited
            risks across all your assessments.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowUpgradeModal(false)}>Cancel</Button>
            <Link href="/dashboard/billing">
              <Button variant="primary">View Plans</Button>
            </Link>
          </div>
        </div>
      </Modal>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {risks.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No risks yet</h3>
            <p className="text-gray-600 mb-4">
              Use AI to generate a set of risks based on your workplace context, or add risks
              manually from the Risk Register.
            </p>
            <Button variant="primary" onClick={handleOpenGenerate}>Generate with AI</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Risk</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Likelihood</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Consequence</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {risks.map((risk) => (
                  <tr key={risk.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{risk.title}</p>
                      {risk.description && <p className="text-sm text-gray-500">{risk.description}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{risk.likelihood}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{risk.consequence}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{risk.risk_score}</td>
                    <td className="px-6 py-4">
                      <Badge variant={risk.risk_level as any}>
                        {risk.risk_level.charAt(0).toUpperCase() + risk.risk_level.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={risk.status === 'closed' ? 'success' : 'warning'}>
                        {risk.status === 'open' ? 'Open' : risk.status === 'mitigating' ? 'Mitigating' : 'Closed'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/risk-register/${risk.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
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
