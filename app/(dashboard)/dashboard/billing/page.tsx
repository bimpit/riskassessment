'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

interface Subscription {
  plan: string | null
  status: string
  current_period_end: string | null
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$59',
    period: '/mo',
    features: ['1 organisation', '1 admin', 'Unlimited risk assessments'],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$99',
    period: '/mo',
    features: ['Everything in Starter', 'Multi-admin', 'Templates', 'Reporting'],
    popular: true,
  },
  {
    id: 'advisory',
    name: 'Advisory',
    price: '$199',
    period: '/mo',
    features: ['Multi-client', 'White-label', 'Priority support'],
  },
]

export default function BillingPage() {
  const searchParams = useSearchParams()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [error, setError] = useState('')
  const success = searchParams.get('success') === 'true'

  useEffect(() => {
    fetch('/api/billing')
      .then((r) => r.json())
      .then((data) => { if (data && !data.error) setSubscription(data) })
      .finally(() => setIsLoading(false))
  }, [])

  const handleCheckout = async (planId: string) => {
    setActionLoading(planId)
    setError('')
    try {
      const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'checkout', plan: planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Failed to start checkout. Please try again.')
      }
    } catch {
      setError('Failed to start checkout. Please try again.')
    } finally {
      setActionLoading('')
    }
  }

  const handlePortal = async () => {
    setActionLoading('portal')
    setError('')
    try {
      const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'portal' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Failed to open billing portal. Please try again.')
      }
    } catch {
      setError('Failed to open billing portal. Please try again.')
    } finally {
      setActionLoading('')
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>

  return (
    <div className="p-8 max-w-3xl">
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          Subscription activated successfully. Welcome aboard!
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {subscription ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">{subscription.plan || 'Paid'}</p>
                </div>
                <Badge variant={subscription.status === 'active' ? 'success' : 'warning'}>
                  {subscription.status}
                </Badge>
              </div>
            </div>
            {subscription.current_period_end && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Renewal Date</p>
                <p className="text-gray-900">{new Date(subscription.current_period_end).toLocaleDateString()}</p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-6">
              <Button
                variant="primary"
                onClick={handlePortal}
                isLoading={actionLoading === 'portal'}
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Free Plan</h3>
            <p className="text-gray-600 mb-6">
              You&apos;re currently on the free plan. Upgrade to unlock more features.
            </p>
            <Button
              variant="primary"
              onClick={() => handleCheckout('professional')}
              isLoading={actionLoading === 'professional'}
            >
              Upgrade to Professional
            </Button>
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border-2 rounded-lg p-6 ${plan.popular ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded mb-3">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-4">
                {plan.price}<span className="text-base font-normal text-gray-500">{plan.period}</span>
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-gray-700">✓ {f}</li>
                ))}
              </ul>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => handleCheckout(plan.id)}
                isLoading={actionLoading === plan.id}
              >
                {`Choose ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
