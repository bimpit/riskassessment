import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#0F172A]">Risk Assessment</span>
            <p className="text-xs text-gray-400">
              Risk assessment software and services for Australian organisations.
            </p>
            <p className="text-xs text-gray-400">Australia</p>
            <a href="mailto:enquiries@risk-assessment.com.au" className="text-xs text-gray-500 hover:text-[#2563EB] transition-colors">
              enquiries@risk-assessment.com.au
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
              <Link href="/risk-assessment-software" className="hover:text-[#2563EB] transition-colors">Risk Assessment Software</Link>
              <span className="text-gray-300">·</span>
              <Link href="/risk-management-software" className="hover:text-[#2563EB] transition-colors">Risk Management Software</Link>
              <span className="text-gray-300">·</span>
              <Link href="/risk-register-software" className="hover:text-[#2563EB] transition-colors">Risk Register Software</Link>
            </nav>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
              <Link href="/risk-assessment-whs" className="hover:text-[#2563EB] transition-colors">WHS Risk Assessment</Link>
              <span className="text-gray-300">·</span>
              <Link href="/whs-risk-assessment" className="hover:text-[#2563EB] transition-colors">WHS Risk Assessment Service</Link>
              <span className="text-gray-300">·</span>
              <Link href="/risk-assessment-template" className="hover:text-[#2563EB] transition-colors">Risk Assessment Template</Link>
              <span className="text-gray-300">·</span>
              <Link href="/risk-assessment-process" className="hover:text-[#2563EB] transition-colors">Our Process</Link>
            </nav>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link>
              <span className="text-gray-300">·</span>
              <Link href="/terms" className="hover:text-[#2563EB] transition-colors">Terms of Service</Link>
              <span className="text-gray-300">·</span>
              <Link href="/security" className="hover:text-[#2563EB] transition-colors">Security</Link>
              <span className="text-gray-300">·</span>
              <Link href="/contact" className="hover:text-[#2563EB] transition-colors">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6 text-xs text-gray-400">
          <span>© 2026 Risk Assessment. All rights reserved. ABN 56 591 469 534.</span>
        </div>
      </div>
    </footer>
  )
}
