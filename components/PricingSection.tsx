import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$59',
    period: '/mo',
    features: ['1 organisation', '1 admin', 'Unlimited risk assessments'],
    popular: false,
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/mo',
    features: ['Everything in Starter', 'Multi-admin', 'Templates', 'Reporting'],
    popular: true,
  },
  {
    name: 'Advisory',
    price: '$199',
    period: '/mo',
    features: ['Multi-client', 'White-label', 'Priority support'],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-16 px-4 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple, transparent pricing</h2>
        <p className="text-gray-600 mb-10">
          Choose the plan that suits your organisation. All plans include a free trial.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-50 border rounded-xl p-6 flex flex-col ${
                plan.popular ? 'border-blue-700 ring-2 ring-blue-700' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`inline-flex items-center justify-center font-semibold px-5 py-3 rounded-xl text-sm transition-colors ${
                  plan.popular
                    ? 'bg-blue-700 text-white hover:bg-blue-600'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-700'
                }`}
              >
                Start Free Trial →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
