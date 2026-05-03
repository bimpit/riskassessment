import Stripe from 'stripe'

export function getStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2026-03-25.dahlia',
  })
}

export const STRIPE_PLANS = {
  starter: {
    name: 'Starter',
    assessments: 5,
    users: 3,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  professional: {
    name: 'Professional',
    assessments: 100,
    users: 20,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
  },
}
