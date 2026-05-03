import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  try {
    // Skip middleware if Supabase credentials are not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.next({
        request,
      })
    }

    let supabaseResponse = NextResponse.next({
      request,
    })

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

    // Refresh session if needed
    await supabase.auth.getSession()

    // Protect dashboard routes
    const { pathname } = request.nextUrl
    if (pathname.startsWith('/dashboard')) {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    // Redirect logged-in users away from auth pages
    const authPages = ['/login', '/signup']
    if (authPages.some(page => pathname === page)) {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // Also handle /auth/callback for Supabase auth redirect
    if (pathname === '/auth/callback') {
      // Allow callback to process
    }

    return supabaseResponse
  } catch (error) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
