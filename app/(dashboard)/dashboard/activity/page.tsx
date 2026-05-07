'use client'

import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface AuditEntry {
  id: string
  action: string
  entity_type: string
  entity_id: string | null
  created_at: string
  user_id: string | null
  changes: any
  user: { full_name: string | null; email: string } | null
}

const entityFilters = [
  { value: '', label: 'All' },
  { value: 'risks', label: 'Risks' },
  { value: 'controls', label: 'Controls' },
  { value: 'assessments', label: 'Assessments' },
]

function actionLabel(action: string): string {
  if (action === 'CREATE') return 'Created'
  if (action === 'UPDATE') return 'Updated'
  if (action === 'DELETE') return 'Deleted'
  if (action === 'ai_generated') return 'AI Generated'
  return action
}

function actionVariant(action: string): 'default' | 'success' | 'warning' | 'high' {
  if (action === 'CREATE' || action === 'ai_generated') return 'success'
  if (action === 'UPDATE') return 'warning'
  if (action === 'DELETE') return 'high'
  return 'default'
}

function entityLabel(entityType: string): string {
  if (entityType === 'risks') return 'Risk'
  if (entityType === 'controls') return 'Control'
  if (entityType === 'assessments') return 'Assessment'
  if (entityType === 'assessment') return 'Assessment'
  return entityType
}

function summariseChange(entry: AuditEntry): string {
  const c = entry.changes
  if (!c) return ''
  if (entry.action === 'CREATE' && c.title) return `"${c.title}"`
  if (entry.action === 'CREATE' && c.name) return `"${c.name}"`
  if (entry.action === 'UPDATE' && c.new?.title) return `"${c.new.title}"`
  if (entry.action === 'UPDATE' && c.new?.name) return `"${c.new.name}"`
  if (entry.action === 'DELETE' && c.title) return `"${c.title}"`
  if (entry.action === 'DELETE' && c.name) return `"${c.name}"`
  return ''
}

export default function ActivityPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('')

  const load = async (entityType: string) => {
    setIsLoading(true)
    setError('')
    try {
      const url = entityType ? `/api/audit?entity_type=${entityType}` : '/api/audit'
      const res = await fetch(url)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to load activity')
        setEntries([])
        return
      }
      const data = await res.json()
      setEntries(Array.isArray(data) ? data : [])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load(filter)
  }, [filter])

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        {entityFilters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16"><Spinner /></div>
      ) : error ? (
        <div className="p-12 text-center bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Activity unavailable</h3>
          <p className="text-gray-600 text-sm">{error}</p>
          <p className="text-gray-500 text-xs mt-3">Audit log access is restricted to team admins.</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
          <p className="text-gray-600 text-sm">Changes to risks, controls, and assessments will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {entries.map((entry) => (
              <li key={entry.id} className="p-4 flex items-start gap-4">
                <Badge variant={actionVariant(entry.action)}>{actionLabel(entry.action)}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{entityLabel(entry.entity_type)}</span>
                    {summariseChange(entry) && <span className="text-gray-700"> {summariseChange(entry)}</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {entry.user?.full_name || entry.user?.email || 'Unknown user'} · {new Date(entry.created_at).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
