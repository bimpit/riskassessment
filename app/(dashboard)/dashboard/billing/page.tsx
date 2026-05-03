'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

interface Subscription {
  plan: string | null
  status: string
  current_period_end: string | null
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/billing')
      .then((r) => r.json())
      .then((data) => { if (data && !data.error) setSubscription(data) })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing & Subscription</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {subscription ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">{subscription.plan || 'Free'}</p>
                </div>
                <Badge variant={subscription.status === 'active' ? 'success' : 'warning'}>{subscription.status}</Badge>
              </div>
            </div>
            {subscription.current_period_end && (
              <div><p className="text-sm text-gray-600 mb-2">Renewal Date</p><p className="text-gray-900">{new Date(subscription.current_period_end).toLocaleDateString()}</p></div>
            )}
            <div className="border-t border-gray-200 pt-6"><Button variant="primary">Upgrade Plan</Button></div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Free Plan</h3>
            <p className="text-gray-600 mb-4">You're currently on the free plan. Upgrade to unlock more features.</p>
            <Button variant="primary">Upgrade to Starter</Button>
          </div>
        )}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ name: 'Free', price: '$0', features: ['5 Assessments', '3 Team Members', 'Basic Reporting'] },
            { name: 'Starter', price: '$99', features: ['50 Assessments', '10 Team Members', 'Advanced Reporting'], popular: true },
            { name: 'Professional', price: '$299', features: ['Unlimited Assessments', 'Unlimited Team Members', 'Custom Reports', 'API Access'] }
          ].map((plan) => (
            <div key={plan.name} className={`border-2 rounded-lg p-6 ${(plan as any).popular ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">{plan.features.map((f) => <li key={f} className="text-sm text-gray-700">✓ {f}</li>)}</ul>
              <Button variant={(plan as any).popular ? 'primary' : 'outline'} className="w-full">Choose {plan.name}</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
