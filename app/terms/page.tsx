import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Terms of Service | Risk Assessment Tool",
  description: "Terms of Service for Risk Assessment Tool. Understand your rights and obligations when using our risk assessment platform for Australian businesses.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors">
          ← Risk Assessment Tool
        </Link>
      </nav>

      <main className="flex-1 mx-auto max-w-3xl px-6 py-16 w-full">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">
          Applies to all Compliai suite products. Last updated: April 2026.
        </p>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 mb-8">
          <strong>Important:</strong> Risk Assessment Tool provides general compliance assistance only. It is{" "}
          <strong>not legal advice</strong>. Consult a qualified professional for obligations specific to your situation.
        </div>

        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">1. Acceptance</h2>
            <p>By creating an account you agree to these Terms. Signing up on behalf of a business confirms you
            have authority to bind that organisation.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">2. The service</h2>
            <p>This tool provides general compliance assistance only. It does not constitute legal, regulatory, or
            professional advice. You are responsible for verifying outputs before use.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">3. Accounts</h2>
            <p>Provide accurate information at signup. You are responsible for keeping login credentials secure.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">4. Subscription &amp; billing</h2>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Subscriptions are billed monthly or annually in advance</li>
              <li>Cancel anytime — cancellation takes effect at the end of the current billing period</li>
              <li>No refunds for partial periods, except as required under Australian Consumer Law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">5. Acceptable use</h2>
            <p>You must not misuse the service, attempt unauthorised access, or interfere with its operation.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">6. Data ownership</h2>
            <p>You own the data you create. We process it only to provide the service. See our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">7. Liability</h2>
            <p>The service is provided &ldquo;as is.&rdquo; To the extent permitted by law, our liability is limited
            to subscription fees paid in the 3 months prior to any claim. We are not liable for indirect or
            consequential losses.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">8. Governing law</h2>
            <p>These Terms are governed by the laws of New South Wales, Australia.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-3">9. Contact</h2>
            <a href="mailto:riskassessment@getcompliai.com.au" className="text-[#2563EB] hover:underline">
              riskassessment@getcompliai.com.au
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
