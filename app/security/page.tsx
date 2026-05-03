import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Security | Risk Assessment Tool",
  description: "How Risk Assessment Tool protects your data. TLS 1.3 encryption, Australian data hosting, Supabase and Vercel infrastructure.",
  alternates: { canonical: "/security" },
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors">
          ← Risk Assessment Tool
        </Link>
      </nav>

      <main className="flex-1 mx-auto max-w-3xl px-6 py-16 w-full">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Security</h1>
        <p className="text-gray-500 text-sm mb-10">
          Every product in the Compliai suite follows the same security standards.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Encryption</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              All data is transmitted over HTTPS using TLS 1.3. Data at rest is encrypted using AES-256.
              This applies to all user-created content, records, and account information stored in our
              database. Encryption keys are managed by our infrastructure providers and are rotated on a
              regular schedule.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Australian data hosting</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your data is stored exclusively on servers located in Australia (AWS ap-southeast-2, Sydney
              region). We do not transfer personal data outside Australia without your explicit consent. Our
              infrastructure providers are contractually bound to maintain this data residency requirement.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Infrastructure and availability</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              The application is hosted on Supabase (database and authentication) and Vercel (application
              layer) — enterprise-grade platforms with automatic security patching, uptime monitoring, and
              daily automated backups. Database backups are retained for 30 days. Vercel provides edge-level
              DDoS protection and automatic SSL certificate management.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Authentication</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              User authentication is handled by Supabase Auth. Passwords are hashed using bcrypt and never
              stored in plain text. Sessions use short-lived JWT tokens with secure, HTTP-only cookie storage.
              We enforce a minimum password length and rate-limit login attempts to prevent brute force attacks.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Payments</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              All payment processing is handled by Stripe, a PCI DSS Level 1 certified payment processor. We
              never store credit card numbers, CVVs, or full card data on our servers. Payment data is
              tokenised by Stripe before it reaches our application.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Access control</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Row-level security (RLS) in PostgreSQL ensures each organisation can only read and write their
              own data — even within the shared database. Internal team access to production data is
              restricted on a least-privilege basis and requires multi-factor authentication. Access logs are
              retained and auditable.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Vulnerability management</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dependencies are monitored for known vulnerabilities using automated tooling. Security patches
              are applied promptly. Application code is reviewed for common vulnerability classes including
              injection, broken authentication, and insecure direct object references (OWASP Top 10).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#0F172A] mb-2">Responsible disclosure</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you discover a security vulnerability, we ask that you disclose it responsibly. Email{" "}
              <a href="mailto:security@getcompliai.com.au" className="text-[#2563EB] hover:underline">
                security@getcompliai.com.au
              </a>{" "}
              with a description of the issue. We acknowledge reports within 48 hours and aim to resolve
              confirmed vulnerabilities within 30 days. We do not pursue legal action against researchers who
              follow responsible disclosure guidelines.
            </p>
          </section>
        </div>

        <p className="mt-12 text-xs text-gray-400">Last updated: April 2026</p>
      </main>

      <Footer />
    </div>
  )
}
