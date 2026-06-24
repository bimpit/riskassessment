import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, Database, Calendar, Users, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Risk Register Software for Australian Businesses | ISO 31000 & WHS Act 2011",
  description:
    "Maintain a centralised, audit‑ready WHS risk register aligned to ISO 31000 and the WHS Act 2011. Track risks, controls, owners, review dates, and residual risk across your organisation. Free to start.",
  keywords: [
    "risk register software",
    "WHS risk register",
    "ISO 31000 risk management",
    "WHS Act 2011",
    "risk management software Australia",
    "residual risk tracking",
    "risk review schedules",
    "Safe Work Australia",
    "PCBU obligations",
  ],
  alternates: {
    canonical: "/risk-register-software",
  },
  openGraph: {
    title: "Risk Register Software for Australian Businesses",
    description:
      "Centralised WHS risk register aligned to ISO 31000 and the WHS Act 2011. Track risks, controls, owners, review dates, and audit history.",
    url: "https://www.risk-assessment.com.au/risk-register-software",
    siteName: "Risk Assessment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Risk Register Software",
    description:
      "Audit‑ready WHS risk register software aligned to ISO 31000 and the WHS Act 2011.",
  },
};


export default function RiskRegisterSoftware() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-blue-700" />
            <span className="text-xl font-bold text-blue-700">Risk Assessment</span>
          </Link>

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Risk Register Software",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: "https://www.risk-assessment.com.au/risk-register-software",
            description:
              "WHS risk register software aligned to ISO 31000 and the WHS Act 2011. Maintain a centralised, audit‑ready risk register with review schedules, control ownership, and residual risk tracking.",
            screenshot: "https://www.risk-assessment.com.au/opengraph-image",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "AUD",
              description:
                "Free tier available. Pro plan includes full risk register functionality, review schedules, and audit‑ready export.",
            },
            featureList: [
              "Centralised WHS risk register",
              "Review schedules and overdue alerts",
              "Control ownership and accountability",
              "Residual risk tracking",
              "ISO 31000‑aligned risk scoring",
              "Audit‑ready export",
              "Linked to WHS risk assessments",
            ],
            audience: {
              "@type": "BusinessAudience",
              audienceType:
                "Australian businesses, PCBUs, SMEs, WHS managers, project teams",
            },
            provider: {
              "@type": "Organization",
              name: "CompliAI",
              url: "https://www.getcompliai.com.au",
            },
          }),
        }}
      />


      <main className="max-w-4xl mx-auto px-4 py-16">

        {/* HERO */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Risk Register Software for Australian Businesses
          </h1>

          <p className="text-xl text-gray-600">
            Maintain a centralised, audit‑ready WHS risk register for your organisation. Track every
            identified risk, its controls, responsible owners, and scheduled review dates — all in one
            place and always up to date.
          </p>
        </div>

        {/* WHAT IS A RISK REGISTER */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a risk register?</h2>

          <p className="text-gray-600 mb-4">
            A risk register is the primary record of all risks identified by an organisation — what they
            are, how severe they are, what controls are in place, and when they were last reviewed. It is
            the central document in any risk management system and is a standard expectation from
            regulators, auditors, and insurers.
          </p>

          <p className="text-gray-600 mb-4">
            Under the <strong>WHS Act 2011</strong>, PCBUs must manage risks and maintain records
            demonstrating that this obligation is being met. A risk register provides that evidence.
            Without one, a business cannot demonstrate ongoing risk management — only point‑in‑time
            assessments that may already be out of date.
          </p>

          <p className="text-gray-600">
            Risk register software automates the creation and maintenance of this record, linking each
            entry to the underlying risk assessment, selected controls, and review history.
          </p>
        </section>

        {/* WHY SPREADSHEETS FAIL */}
        <section className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why a spreadsheet is not enough
          </h2>

          <p className="text-gray-600 mb-4">
            Many Australian businesses maintain risk registers in Excel or Google Sheets. This is better
            than no register — but it quickly breaks down as the organisation grows or regulatory scrutiny
            increases.
          </p>

          <ul className="space-y-3">
            {[
              'Spreadsheets are not connected to your risk assessments. Changes in one place are not reflected in the other.',
              'Version control is manual. There is no audit trail showing who changed what and when — which a regulator may require.',
              'Review schedules are not enforced. Overdue reviews are easy to miss in a static document.',
              'Reporting is manual. Summaries of outstanding risks, overdue reviews, or high‑risk items require manual effort.',
              'There is no methodology built in. A spreadsheet does not guide the user through a compliant risk assessment process.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* FEATURES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk register software features</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <Database className="w-5 h-5 text-blue-700" />,
                title: 'Centralised Risk Register',
                desc: 'All risks from all assessments in one register. View by risk level, status, assessment, or responsible person.',
              },
              {
                icon: <Calendar className="w-5 h-5 text-blue-700" />,
                title: 'Review Schedules',
                desc: 'Set review dates for each risk entry. The register highlights overdue and upcoming reviews automatically.',
              },
              {
                icon: <Users className="w-5 h-5 text-blue-700" />,
                title: 'Control Ownership',
                desc: 'Assign each control measure to a responsible owner. Track implementation status and completion dates.',
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-blue-700" />,
                title: 'Residual Risk Tracking',
                desc: 'Record inherent and residual risk. Track whether controls are reducing risk to the target level over time.',
              },
              {
                icon: <Shield className="w-5 h-5 text-blue-700" />,
                title: 'Linked to Assessments',
                desc: 'Every register entry links back to the underlying risk assessment, hazard details, and control rationale.',
              },
              {
                icon: <Database className="w-5 h-5 text-blue-700" />,
                title: 'Audit‑Ready Export',
                desc: 'Export your risk register in a format suitable for regulator review, board reporting, or insurer assessment.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How the risk register works</h2>

          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Risks populate automatically',
                desc: 'When you complete a risk assessment, identified risks are automatically added to your register. No double entry.',
              },
              {
                step: '2',
                title: 'Assign owners and review dates',
                desc: 'Assign a control owner and set a review date for each entry. The software surfaces overdue items automatically.',
              },
              {
                step: '3',
                title: 'Monitor and update controls',
                desc: 'Update control status as measures are implemented. Reassess residual risk. The register maintains a full change history.',
              },
              {
                step: '4',
                title: 'Export for compliance',
                desc: 'Generate a formatted risk register report for regulatory review, audit, board reporting, or insurance purposes.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AUSTRALIAN REQUIREMENTS */}
        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Risk register requirements in Australia
          </h2>

          <p className="text-gray-600 mb-4">
            While the WHS Act does not mandate a specific format for risk documentation, it requires PCBUs
            to maintain records of risk management activities. A risk register is the standard way to
            satisfy this requirement.
          </p>

          <p className="text-gray-600 mb-4">
            Safe Work Australia guidance, ISO 31000, and industry‑specific standards (AS/NZS, construction
            codes, healthcare accreditation) all reference maintaining a risk register as part of an
            effective risk management system.
          </p>

          <p className="text-gray-600">
            When an incident occurs, a WorkSafe inspector or legal representative may request your risk
            register as part of their investigation. Businesses with a current, well‑maintained register
            are in a significantly stronger position than those relying on outdated documents or
            spreadsheets.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Build your risk register today</h2>

          <p className="text-blue-200 mb-6">
            Free to start. Create a risk assessment and your risk register populates automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Start Free
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              Talk to a Risk Advisor
            </Link>
          </div>

          <p className="text-blue-300 text-sm mt-4">No credit card required.</p>
        </section>

        {/* RELATED LINKS */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm font-medium text-gray-500 mb-4">Related resources</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/risk-assessment-software" className="text-blue-700 hover:underline text-sm">
              Risk Assessment Software →
            </Link>
            <Link href="/risk-management-software" className="text-blue-700 hover:underline text-sm">
              Risk Management Software →
            </Link>
            <Link href="/risk-assessment-whs" className="text-blue-700 hover:underline text-sm">
              WHS Risk Assessment →
            </Link>
            <Link href="/whs-compliance-checklist" className="text-blue-700 hover:underline text-sm">
              WHS Compliance Checklist →
            </Link>
          </div>
        </div>

      </main>


      <Footer />
    </div>
  )
}
