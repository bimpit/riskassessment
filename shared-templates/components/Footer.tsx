// Unified footer — copy into each app, set SITE_NAME + SITE_URL via env or props
import Link from "next/link";
import { PoweredByCompliai } from "./PoweredByCompliai";
import { NotLegalAdvice } from "./NotLegalAdvice";

interface FooterProps {
  siteName: string;        // e.g. "Risk Assessment Pro"
  siteUrl: string;         // e.g. "https://www.risk-assessment.com.au"
  supportEmail: string;    // e.g. "support@risk-assessment.com.au"
  showLegalDisclaimer?: boolean;
}

const currentYear = new Date().getFullYear();

export function Footer({
  siteName,
  siteUrl,
  supportEmail,
  showLegalDisclaimer = true,
}: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Top row: brand + nav links */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-gray-900">{siteName}</span>
            <span className="text-sm text-gray-500">
              Australian-built compliance software.
            </span>
            <PoweredByCompliai />
          </div>

          {/* Navigation */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-900">Product</span>
              <Link href="/pricing" className="text-gray-500 hover:text-gray-900">Pricing</Link>
              <Link href="/features" className="text-gray-500 hover:text-gray-900">Features</Link>
              <Link href="/changelog" className="text-gray-500 hover:text-gray-900">Changelog</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-900">Legal</span>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-900">Terms of Service</Link>
              <Link href="/security" className="text-gray-500 hover:text-gray-900">Security</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-900">Support</span>
              <a href={`mailto:${supportEmail}`} className="text-gray-500 hover:text-gray-900">Contact Us</a>
              <Link href="/docs" className="text-gray-500 hover:text-gray-900">Documentation</Link>
              <Link href="/status" className="text-gray-500 hover:text-gray-900">Status</Link>
            </div>
          </nav>
        </div>

        {/* Legal disclaimer */}
        {showLegalDisclaimer && (
          <div className="mt-8">
            <NotLegalAdvice />
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-xs text-gray-400 sm:flex-row">
          <span>© {currentYear} {siteName}. All rights reserved. ABN registered in Australia.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms</Link>
            <Link href="/security" className="hover:text-gray-600">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
