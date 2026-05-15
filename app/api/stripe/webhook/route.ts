import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    const stripe = getStripeClient()
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )

    const supabase = await createServiceRoleClient()
    const supabaseAny = supabase as any

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any

        const { data: existingSubscription } = await supabaseAny
          .from('subscriptions')
          .select('id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        const teamId = subscription.metadata?.team_id || null
        const planName = subscription.items?.data[0]?.price?.nickname
          || subscription.items?.data[0]?.plan?.nickname
          || null

        if (existingSubscription) {
          await supabaseAny
            .from('subscriptions')
            .update({
              status: subscription.status,
              plan: planName,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('id', existingSubscription.id)
        } else {
          await supabaseAny.from('subscriptions').insert({
            team_id: teamId,
            stripe_customer_id: subscription.customer,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            plan: planName,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any
        await supabaseAny
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook failed' },
      { status: 400 }
    )
  }
}
