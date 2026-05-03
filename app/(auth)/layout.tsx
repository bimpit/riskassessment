import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">
            Risk Assessment
          </h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Identify, assess, and manage risks across your organization
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}
