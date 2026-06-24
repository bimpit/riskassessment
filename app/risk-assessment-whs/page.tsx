import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: "WHS Risk Assessment Requirements for Australian PCBUs | WHS Act 2011 Obligations",
  description:
    "Under the WHS Act 2011, PCBUs must identify hazards, assess risks, and implement controls. Learn what a compliant WHS risk assessment requires, why templates fail, and how advisor‑guided assessments produce defensible, inspection‑ready documentation.",
  keywords: [
    "WHS risk assessment",
    "WHS Act 2011",
    "PCBU obligations",
    "WHS due diligence",
    "risk assessment Australia",
    "hierarchy of controls",
    "Safe Work Australia",
    "WHS compliance",
    "risk management obligations",
  ],
  alternates: {
    canonical: "/risk-assessment-whs",
  },
  openGraph: {
    title: "WHS Risk Assessment for Australian PCBUs",
    description:
      "Understand WHS Act 2011 requirements for risk assessment, why templates fail, and how advisor‑guided assessments produce defensible evidence for regulators, insurers, and incident investigations.",
    url: "https://www.risk-assessment.com.au/risk-assessment-whs",
    siteName: "Risk Assessment",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "WHS Risk Assessment for Australian PCBUs",
    description:
      "Learn what a compliant WHS risk assessment requires under the WHS Act 2011 and why advisor‑guided assessments produce defensible evidence.",
  },
};
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "WHS Risk Assessment for Australian PCBUs",
      description:
        "Under the WHS Act 2011, PCBUs must identify hazards, assess risks, and implement controls. Learn what a compliant WHS risk assessment requires, why templates fail, and how advisor‑guided assessments produce defensible, inspection‑ready documentation.",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.risk-assessment.com.au/risk-assessment-whs",
      },
      author: {
        "@type": "Organization",
        name: "Risk Assessment",
        url: "https://www.risk-assessment.com.au",
      },
      publisher: {
        "@type": "Organization",
        name: "Risk Assessment",
        logo: {
          "@type": "ImageObject",
          url: "https://www.risk-assessment.com.au/opengraph-image",
        },
      },
      articleSection: [
        "WHS Act 2011 requirements",
        "PCBU obligations",
        "Why templates fail",
        "Hierarchy of controls",
        "Advisor‑guided WHS risk assessment",
        "Regulator and insurer expectations",
      ],
      keywords: [
        "WHS risk assessment",
        "WHS Act 2011",
        "PCBU obligations",
        "WHS due diligence",
        "hierarchy of controls",
        "Safe Work Australia",
        "risk assessment Australia",
        "WHS compliance",
      ],
    }),
  }}
/>


export default function RiskAssessmentWHS() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
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

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-4 py-16">

        {/* HERO */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            WHS Risk Assessment for Australian PCBUs
          </h1>
          <p className="text-xl text-gray-600">
            Under the Work Health and Safety Act 2011, PCBUs must identify hazards, assess risks,
            and implement controls — with documentation that demonstrates the process was genuine,
            specific, and defensible.
          </p>
        </div>

        {/* WHAT THE WHS ACT REQUIRES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What the WHS Act requires</h2>

          <p className="text-gray-600 mb-4">
            The WHS Act (and equivalent state legislation) requires PCBUs to manage risks to health
            and safety so far as is reasonably practicable. Regulators may issue improvement notices,
            prohibition notices, or prosecute if workplace risk management is inadequate.
          </p>

          <p className="text-gray-600 mb-4">
            Officers — directors, executives, and senior managers — have a separate due diligence
            duty under section 27 of the WHS Act. They must ensure the PCBU has appropriate
            resources, processes, and verification systems in place to meet WHS obligations.
          </p>

          <p className="text-gray-600">
            A risk assessment that cannot withstand scrutiny is not a risk assessment — it is a
            liability.
          </p>
        </section>

        {/* WHY TEMPLATES FAIL */}
        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why DIY templates do not meet the standard
          </h2>

          <p className="text-gray-600 mb-4">
            A downloaded template may help you list hazards, but it does not demonstrate that a
            competent person conducted a genuine, site‑specific assessment. Regulators, insurers,
            and courts look for evidence — not forms.
          </p>

          <ul className="space-y-3">
            {[
              'Regulators expect evidence that hazards specific to your workplace and operations were identified — not a generic checklist.',
              'The WHS Regulations require controls to follow the hierarchy of controls. A template cannot apply this to your specific plant, equipment, and work practices.',
              'Incident investigations routinely expose the inadequacy of template-based compliance. Courts assess whether the assessment was genuine, not whether a form exists.',
              'Insurers may scrutinise your documentation when assessing claims. A template is less likely to satisfy underwriters than a documented, advisor-guided process.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* ADVISOR-GUIDED ASSESSMENT */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How advisor-guided assessment produces defensible evidence
          </h2>

          <p className="text-gray-600 mb-4">
            Advisor-guided WHS risk assessment replaces template-based assumptions with
            documentation that demonstrates genuine compliance and withstands regulatory scrutiny.
          </p>

          <ul className="space-y-3 mb-6">
            {[
              'Hazard identification conducted by someone with knowledge of your operations and WHS obligations.',
              'Risk scoring applied using a methodology aligned to Safe Work Australia guidance.',
              'Controls selected using the hierarchy — elimination, substitution, isolation, engineering, administrative, PPE — with documented rationale.',
              'Completed documentation reviewed for adequacy before delivery, suitable for regulator review, incident investigation, and insurer assessment.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Speak with a Risk Advisor</h2>
          <p className="text-blue-200 mb-6">
            Find out whether your current risk assessment documentation meets the WHS standard — and
            what a managed assessment would involve for your business.
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
          <p className="text-sm font-medium text-gray-500 mb-4">Related guidance</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/whs-risk-assessment" className="text-blue-700 hover:underline text-sm">
              WHS Risk Assessment Service →
            </Link>
            <Link href="/risk-assessment-template" className="text-blue-700 hover:underline text-sm">
              Why Templates Are Not Enough →
            </Link>
            <Link href="/risk-assessment-process" className="text-blue-700 hover:underline text-sm">
              Our Assessment Process →
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}