import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#0F172A]">Risk Assessment</span>
            <p className="text-xs text-gray-500">
              WHS risk assessment software for Australian organisations.
            </p>
            <p className="text-xs text-gray-500">
              Hosted in Australia · No lock‑in contracts · Cancel anytime
            </p>
            <a
              href="mailto:riskassessment@getcompliai.com.au"
              className="text-xs text-gray-600 hover:text-blue-700 transition-colors"
            >
              riskassessment@getcompliai.com.au
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link href="/#how-it-works" className="hover:text-blue-700">How it works</Link></li>
              <li><Link href="/#pricing" className="hover:text-blue-700">Pricing</Link></li>
              <li><Link href="/signup" className="hover:text-blue-700">Start Free</Link></li>
              <li><Link href="/login" className="hover:text-blue-700">Login</Link></li>

              {/* Watch Demo */}
              <li>
                <a
                  href="https://youtu.be/UNuX1KEDV0M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700"
                >
                  ▶ Watch Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-3">Resources</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/risk-assessment-software" className="hover:text-blue-700">
                  Risk Assessment Software
                </Link>
              </li>
              <li>
                <Link href="/risk-register-software" className="hover:text-blue-700">
                  Risk Register
                </Link>
              </li>
              <li>
                <Link href="/risk-assessment-template" className="hover:text-blue-700">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-700">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link href="/privacy" className="hover:text-blue-700">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-700">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-blue-700">Security</Link></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-gray-500">
          <p className="mb-3">
            Risk Assessment provides structured WHS documentation and general information only.
            It does not provide legal advice.
          </p>
          <p className="text-gray-500">
            © 2026 Risk Assessment · Part of the CompliAI Suite
          </p>
        </div>

      </div>
    </footer>
  )
}