'use client'

import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function getPageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard'
  if (pathname === '/dashboard/assessments') return 'Assessments'
  if (pathname === '/dashboard/assessments/new') return 'New Assessment'
  if (pathname === '/dashboard/risk-register') return 'Risk Register'
  if (pathname === '/dashboard/templates') return 'Templates'
  if (pathname === '/dashboard/settings') return 'Profile'
  if (pathname === '/dashboard/billing') return 'Billing'
  if (pathname === '/dashboard/activity') return 'Activity'
  if (/^\/dashboard\/assessments\/.+\/report/.test(pathname)) return 'Assessment Report'
  if (/^\/dashboard\/assessments\/.+\/risks/.test(pathname)) return 'Risks'
  if (/^\/dashboard\/assessments\/.+/.test(pathname)) return 'Assessment Details'
  if (/^\/dashboard\/risk-register\/.+/.test(pathname)) return 'Risk Details'
  return 'Dashboard'
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.assign('/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 w-8 h-8 animate-spin border-4 border-gray-300 border-t-blue-600 rounded-full mx-auto" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden print:block print:h-auto print:overflow-visible print:bg-white">
      <div className="print:hidden contents">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 print:overflow-visible">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900">{getPageTitle(pathname)}</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
