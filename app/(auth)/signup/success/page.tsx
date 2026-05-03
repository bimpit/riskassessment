'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard after 2 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold text-green-600">Account Created!</h1>

      <p className="text-lg text-gray-700">
        Your account has been successfully created.
      </p>

      <p className="text-sm text-gray-600">
        Redirecting to dashboard...
      </p>

      <div className="pt-4">
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
