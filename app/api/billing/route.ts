import { createClient, createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceRole = await createServiceRoleClient()
    const serviceRoleAny = serviceRole as any

    // Get the user's team
    const { data: membership } = await serviceRoleAny
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json(null)
    }

    // Get the subscription for this team
    const { data: subscription } = await serviceRoleAny
      .from('subscriptions')
      .select('plan, status, current_period_end')
      .eq('team_id', membership.team_id)
      .single()

    if (!subscription) {
      return NextResponse.json(null)
    }

    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const serviceRole = await createServiceRoleClient()
    const srAny = serviceRole as any

    const { data: membership } = await srAny
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) return NextResponse.json({ error: 'Team not found' }, { status: 404 })

    const body = await request.json()
    const { action, plan } = body
    const stripe = getStripeClient()
    const origin = request.nextUrl.origin
    const billingUrl = `${origin}/dashboard/billing`

    const { data: existingSub } = await srAny
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('team_id', membership.team_id)
      .single()

    if (action === 'checkout') {
      const priceId = plan === 'professional'
        ? process.env.STRIPE_PROFESSIONAL_PRICE_ID
        : process.env.STRIPE_STARTER_PRICE_ID

      if (!priceId) return NextResponse.json({ error: 'Plan not configured' }, { status: 500 })

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        ...(existingSub?.stripe_customer_id
          ? { customer: existingSub.stripe_customer_id }
          : { customer_email: user.email ?? undefined }),
        subscription_data: { metadata: { team_id: membership.team_id } },
        metadata: { team_id: membership.team_id },
        success_url: `${billingUrl}?success=true`,
        cancel_url: billingUrl,
      })

      return NextResponse.json({ url: session.url })
    }

    if (action === 'portal') {
      if (!existingSub?.stripe_customer_id) {
        return NextResponse.json({ error: 'No active subscription found' }, { status: 404 })
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: existingSub.stripe_customer_id,
        return_url: billingUrl,
      })

      return NextResponse.json({ url: session.url })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Billing error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
