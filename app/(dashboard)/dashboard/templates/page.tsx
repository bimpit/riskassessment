'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'

interface Template {
  id: string
  name: string
  domain: string
  is_system_template: boolean
  created_at: string
}

const domainLabels: Record<string, string> = { whs: 'WHS', aml: 'AML', privacy: 'Privacy', fairwork: 'Fair Work', operational: 'Operational' }

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setTemplates(data) })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {templates.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates</h3>
            <p className="text-gray-600">No templates available yet.</p>
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
    </div>
  )
}
