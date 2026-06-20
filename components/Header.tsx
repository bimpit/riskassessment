import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand/logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Risk Assessment"
              className="h-14 w-auto"
            />
          </Link>
        </div>

        {/* Navigation / CTAs */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="text-sm font-medium bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Free
          </Link>
        </div>

      </div>
    </header>
  )
}