import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Skip if Supabase credentials are not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/dashboard') && !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if ((pathname === '/login' || pathname === '/signup') && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Payment enforcement: if a subscription record exists and is not active, block dashboard access
    if (user && pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/billing')) {
      const { data: teamMember } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .maybeSingle()

      if (teamMember) {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('team_id', teamMember.team_id)
          .maybeSingle()

        // No subscription = free tier, allow through. Lapsed subscription = block.
        if (subscription && subscription.status !== 'active') {
          return NextResponse.redirect(new URL('/dashboard/billing', request.url))
        }
      }
    }
  } catch {
    return NextResponse.next({ request: { headers: request.headers } })
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/auth/:path*',
  ],
}
