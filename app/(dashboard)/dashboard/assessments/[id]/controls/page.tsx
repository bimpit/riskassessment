'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Spinner } from '@/components/ui/Spinner'

export default function ControlsPage() {
  const params = useParams()
  const assessmentId = params.id as string
  const [controls, setControls] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/controls?assessmentId=${assessmentId}`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setControls(data) })
      .finally(() => setIsLoading(false))
  }, [assessmentId])

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Controls</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {controls.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No controls</h3>
            <p className="text-gray-600">Controls are added from within each risk.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {controls.map((control) => (
              <div key={control.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{control.title}</h3>
                    {control.description && <p className="text-sm text-gray-600 mt-1">{control.description}</p>}
                    <p className="text-sm text-gray-500 mt-1">Type: {control.type} · Status: {control.status}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    Effectiveness: {control.effectiveness}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
