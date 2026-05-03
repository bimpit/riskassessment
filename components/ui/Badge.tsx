import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps {
  variant?: 'default' | 'critical' | 'high' | 'medium' | 'low' | 'success' | 'warning'
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-900',
    critical: 'bg-red-100 text-red-900 border border-red-300',
    high: 'bg-orange-100 text-orange-900 border border-orange-300',
    medium: 'bg-yellow-100 text-yellow-900 border border-yellow-300',
    low: 'bg-green-100 text-green-900 border border-green-300',
    success: 'bg-green-100 text-green-900',
    warning: 'bg-yellow-100 text-yellow-900',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
