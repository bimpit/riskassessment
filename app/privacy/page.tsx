import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Risk Assessment Tool",
  description: "Privacy Policy for Risk Assessment Tool. Learn how we collect, use, and protect your personal information in compliance with the Australian Privacy Act 1988 and the Australian Privacy Principles.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors">
          ← Risk Assessment Tool
        </Link>
      </nav>

      <main className="flex-1 mx-auto max-w-3xl px-6 py-16 w-full">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">
          Applies to all Compliai suite products. Last updated: April 2026.
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-900 mb-8">
          <strong>Who we are:</strong> Risk Assessment Tool is operated by Pingzhou Tu (ABN 56 591 469 534), an Australian
          sole trader. We comply with the <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles (APPs).
        </div>

        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">What we collect</h2>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Account details: name, email address, organisation name</li>
              <li>Usage data: features used, login activity</li>
              <li>Content you create: records, reports, and forms you generate inside the app</li>
              <li>Payment data: handled by Stripe — we never store card numbers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">How we use it</h2>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>To provide and improve the service</li>
              <li>To send transactional emails (receipts, password resets)</li>
              <li>To respond to support requests</li>
            </ul>
            <p className="mt-3 font-medium text-[#0F172A]">We do not sell your data. We do not use your data for advertising.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">Third-party services</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-6 font-semibold text-[#0F172A]">Service</th>
                    <th className="text-left py-2 font-semibold text-[#0F172A]">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-2 pr-6">Supabase</td><td className="py-2">Database &amp; authentication</td></tr>
                  <tr><td className="py-2 pr-6">Stripe</td><td className="py-2">Payment processing</td></tr>
                  <tr><td className="py-2 pr-6">Resend</td><td className="py-2">Transactional email</td></tr>
                  <tr><td className="py-2 pr-6">Vercel</td><td className="py-2">Hosting &amp; delivery</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">All providers are contractually required to protect your data.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">Data storage and security</h2>
            <p>Your data is stored on servers located in Australia (AWS ap-southeast-2 region). We use TLS 1.3
            for all data in transit and AES-256 encryption for data at rest. We apply row-level security to
            ensure each organisation can only access its own records. Internal access to user data is restricted
            on a least-privilege basis.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">Data retention</h2>
            <p>Data is retained while your account is active. After cancellation, account data is held for 90
            days to allow for reactivation or export, then permanently deleted. You may request earlier deletion
            at any time by contacting us. Backups are retained for up to 30 days and overwritten on a rolling
            basis.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">Your rights (APPs)</h2>
            <p className="mb-3">Under the <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles,
            you have the right to:</p>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate, incomplete, or out-of-date information</li>
              <li>Request deletion of your personal information (subject to legal retention obligations)</li>
              <li>Complain about a breach of the APPs — we will respond within 30 days</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at the address below. We will respond
            within 30 days.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">Cookies</h2>
            <p>We use essential session cookies only, required for authentication and core functionality. We do
            not use advertising cookies, tracking pixels, or third-party analytics cookies. Our analytics (Google
            Analytics, if enabled) uses anonymised data only and respects browser Do Not Track settings.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. Material changes will be notified to active
            account holders by email at least 14 days before they take effect. Continued use of the service after
            that date constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">Contact</h2>
            <p className="mb-2">For privacy-related enquiries or to exercise your rights:</p>
            <a href="mailto:privacy@getcompliai.com.au" className="text-[#2563EB] hover:underline">
              privacy@getcompliai.com.au
            </a>
            <p className="mt-3 text-xs text-gray-400">
              If you are unsatisfied with our response, you may lodge a complaint with the{" "}
              <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">
                Office of the Australian Information Commissioner (OAIC)
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
