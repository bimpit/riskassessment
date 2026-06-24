import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import {
  Shield,
  CheckCircle,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react'

/* -------------------------------------------------------
   UPDATED METADATA — AI‑SEARCH OPTIMISED
------------------------------------------------------- */
export const metadata: Metadata = {
  title:
    'WHS Risk Assessment Service for Australian PCBUs | WHS Act 2011 Compliant',
  description:
    'Advisor‑guided WHS risk assessment service for Australian PCBUs and SMEs. Aligned to the WHS Act 2011, Safe Work Australia guidance, and insurer expectations. Produces defensible, inspection‑ready documentation.',
  keywords: [
    'WHS risk assessment',
    'WHS Act 2011',
    'PCBU obligations',
    'WHS due diligence',
    'risk assessment service',
    'Safe Work Australia',
    'hierarchy of controls',
    'WHS compliance',
    'risk management Australia',
  ],
  alternates: {
    canonical: '/whs-risk-assessment',
  },
  openGraph: {
    title: 'WHS Risk Assessment Service for Australian Businesses',
    description:
      'Advisor‑guided WHS risk assessment service aligned to the WHS Act 2011. Produces defensible documentation for regulators, insurers, and incident investigations.',
    url: 'https://www.risk-assessment.com.au/whs-risk-assessment',
    siteName: 'Risk Assessment',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WHS Risk Assessment Service for Australian Businesses',
    description:
      'Managed WHS risk assessment service aligned to the WHS Act 2011 and Safe Work Australia guidance.',
  },
}

export default function WHSRiskAssessment() {
  return (
    <div className="min-h-screen bg-white">

      {/* -------------------------------------------------------
         UPDATED HEADER — BRAND CONSISTENT
      ------------------------------------------------------- */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-blue-700" />
            <span className="text-xl font-bold text-blue-700">Risk Assessment</span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      {/* -------------------------------------------------------
         JSON‑LD — ARTICLE SCHEMA
      ------------------------------------------------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'WHS Risk Assessment Service for Australian Businesses',
            description:
              'Advisor‑guided WHS risk assessment service aligned to the WHS Act 2011 and Safe Work Australia guidance.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.risk-assessment.com.au/whs-risk-assessment',
            },
            author: {
              '@type': 'Organization',
              name: 'Risk Assessment',
              url: 'https://www.risk-assessment.com.au',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Risk Assessment',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.risk-assessment.com.au/opengraph-image',
              },
            },
            articleSection: [
              'PCBU obligations',
              'WHS Act 2011 requirements',
              'What a WHS risk assessment covers',
              'Why self‑managed assessments fail',
              'Advisor‑guided WHS assessment',
            ],
            keywords: [
              'WHS risk assessment',
              'WHS Act 2011',
              'PCBU obligations',
              'WHS due diligence',
              'Safe Work Australia',
              'risk assessment service',
              'hierarchy of controls',
            ],
          }),
        }}
      />

      {/* -------------------------------------------------------
         MAIN CONTENT — REWRITTEN + STRUCTURALLY IMPROVED
      ------------------------------------------------------- */}
      <main className="max-w-4xl mx-auto px-4 py-16">

        {/* HERO */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            WHS Risk Assessment — Meeting Your Legal Obligations
          </h1>
          <p className="text-xl text-gray-600">
            A managed WHS risk assessment service for Australian PCBUs and SMEs. Advisor‑guided,
            aligned to the WHS Act 2011, and designed to produce documentation that satisfies
            regulators, insurers, and incident investigators.
          </p>
        </div>

        {/* PCBU OBLIGATIONS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The obligation every PCBU carries
          </h2>

          <p className="text-gray-600 mb-4">
            The Work Health and Safety Act 2011 requires PCBUs to ensure the health and safety of
            workers and others so far as reasonably practicable. This includes identifying hazards,
            assessing risks, and implementing controls — with documentation that demonstrates the
            process was genuine.
          </p>

          <p className="text-gray-600 mb-4">
            Safe Work Australia and state regulators can audit your WHS arrangements at any time.
            Businesses unable to produce adequate documentation face improvement notices, fines, and
            personal liability for officers under section 27.
          </p>

          <p className="text-gray-600">
            A WHS risk assessment is the foundational record regulators expect to see.
          </p>
        </section>

        {/* WHAT A WHS RISK ASSESSMENT COVERS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What a WHS risk assessment covers
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Hazard identification',
                desc:
                  'Identifying hazards relevant to your workplace, plant, equipment, systems of work, and worker activities.',
              },
              {
                title: 'Risk evaluation',
                desc:
                  'Assessing likelihood and consequence using a recognised risk matrix.',
              },
              {
                title: 'Control selection',
                desc:
                  'Selecting controls using the hierarchy — elimination through to PPE — with documented rationale.',
              },
              {
                title: 'Residual risk assessment',
                desc:
                  'Confirming remaining risk is as low as reasonably practicable (ALARP).',
              },
              {
                title: 'Review schedule',
                desc:
                  'Setting reassessment triggers — incidents, near misses, or operational changes.',
              },
              {
                title: 'Documentation',
                desc:
                  'Producing a regulator‑ready record of the full assessment process.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY SELF‑MANAGED ASSESSMENTS FAIL */}
        <section className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why self‑managed assessment creates exposure
          </h2>

          <p className="text-gray-600 mb-4">
            Many businesses complete their own assessments using templates or industry guidance.
            This is common — and commonly inadequate.
          </p>

          <p className="text-gray-600 mb-4">
            The WHS Regulations require that the person conducting the assessment has the knowledge
            to identify hazards and apply controls appropriate to the specific work. A business
            owner or manager completing a template rarely meets this standard.
          </p>

          <p className="text-gray-600">
            When an incident occurs, investigators examine whether the assessment was competent and
            site‑specific. Self‑assessed documentation that cannot demonstrate this is a liability
            for the business and for individual officers.
          </p>
        </section>

        {/* ADVISOR‑GUIDED ASSESSMENT */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What advisor‑guided assessment provides
          </h2>

          <ul className="space-y-4">
            {[
              {
                title: 'Competent assessment',
                desc:
                  'Conducted by a risk advisor with WHS knowledge and industry experience — not by a template.',
              },
              {
                title: 'Regulatory alignment',
                desc:
                  'Methodology aligned to Safe Work Australia guidance and state WHS regulations.',
              },
              {
                title: 'Defensible documentation',
                desc:
                  'A documented record of hazard identification, risk scoring, and control selection — suitable for regulators, insurers, and investigations.',
              },
              {
                title: 'Officer‑level evidence',
                desc:
                  'Documentation that supports officer due diligence obligations by demonstrating appropriate WHS systems.',
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3 list-none">
                <ClipboardCheck className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">{item.title}: </span>
                  <span className="text-gray-600">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Speak with a Risk Advisor</h2>
          <p className="text-blue-200 mb-6">
            Talk to a risk advisor about your WHS obligations and what a managed assessment would
            involve for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Contact a Risk Advisor
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        {/* RELATED LINKS */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm font-medium text-gray-500 mb-4">
            Related guidance
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/risk-assessment-whs"
              className="text-blue-700 hover:underline text-sm"
            >
              WHS Risk Assessment Obligations →
            </Link>
            <Link
              href="/risk-assessment-template"
              className="text-blue-700 hover:underline text-sm"
            >
              Why Templates Are Not Enough →
            </Link>
            <Link
              href="/risk-assessment-process"
              className="text-blue-700 hover:underline text-sm"
            >
              Our Assessment Process →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}