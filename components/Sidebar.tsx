'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: '📊',
  },
  {
    href: '/dashboard/assessments',
    label: 'Assessments',
    icon: '📋',
  },
  {
    href: '/dashboard/risk-register',
    label: 'Risk Register',
    icon: '⚠️',
  },
  {
    href: '/dashboard/templates',
    label: 'Templates',
    icon: '📑',
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: '⚙️',
  },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

function NavLinks({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="px-4 py-4 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className={cn(
            'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
            item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          )}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar — static, always visible on lg+ */}
      <aside className="sidebar-desktop bg-gray-900 text-white h-screen overflow-y-auto">
        <div className="p-6">
          <h1 className="text-xl font-bold">Risk Assessment</h1>
        </div>
        <NavLinks />
      </aside>

      {/* Mobile sidebar — fixed overlay, only rendered when open */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-gray-900 text-white overflow-y-auto">
            <div className="p-6 flex items-center justify-between">
              <h1 className="text-xl font-bold">Risk Assessment</h1>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <NavLinks onClose={onClose} />
          </aside>
        </>
      )}
    </>
  )
}
