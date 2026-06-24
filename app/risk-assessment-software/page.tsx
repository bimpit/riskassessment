import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import {
  Shield,
  CheckCircle,
  ArrowRight,
  FileText,
  Database,
  Zap,
  ClipboardList,
  BarChart2,
  Lock,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "WHS Risk Assessment Software | ISO 31000 Risk Register for Australian Businesses",
  description:
    "Create compliant WHS risk assessments and maintain a centralised ISO 31000‑aligned risk register. Built for Australian PCBUs, SMEs, and project teams under the WHS Act 2011 and Safe Work Australia guidance.",
  keywords: [
    "WHS risk assessment software",
    "ISO 31000 risk register",
    "WHS Act 2011",
    "risk management software Australia",
    "hazard identification",
    "hierarchy of controls",
    "Safe Work Australia",
    "PCBU obligations",
  ],
  alternates: {
    canonical: "/risk-assessment-software",
  },
  openGraph: {
    title: "WHS Risk Assessment Software for Australian Businesses",
    description:
      "Create WHS risk assessments, maintain a defensible risk register, and generate inspection‑ready documentation aligned to the WHS Act 2011 and ISO 31000.",
    url: "https://www.risk-assessment.com.au/risk-assessment-software",
    siteName: "Risk Assessment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WHS Risk Assessment Software",
    description:
      "ISO 31000‑aligned WHS risk assessment software for Australian organisations.",
  },
};


const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Risk Assessment",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.risk-assessment.com.au/risk-assessment-software",
  description:
    "WHS risk assessment software aligned to the WHS Act 2011 and ISO 31000. Create compliant assessments, maintain a risk register, and export inspection‑ready documentation.",
  screenshot: "https://www.risk-assessment.com.au/opengraph-image",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AUD",
    description:
      "Free tier available. Pro plan includes unlimited AI‑assisted WHS risk assessments and full risk register functionality.",
  },
  featureList: [
    "Create WHS risk assessments aligned to the WHS Act 2011",
    "AI‑assisted hazard identification and control suggestions",
    "Centralised WHS risk register with status tracking",
    "ISO 31000‑aligned risk matrix and scoring",
    "Inspection‑ready WHS documentation export",
    "Industry‑specific templates for Australian workplaces",
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Australian businesses, PCBUs, SMEs, WHS managers, project teams",
  },
};



export default function RiskAssessmentSoftware() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

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


      <main className="max-w-4xl mx-auto px-4 py-16">

        {/* HERO */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            WHS Risk Assessment Software for Australian Businesses
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            A WHS risk assessment and risk management platform built for Australian PCBUs, SMEs, and
            project teams. Create compliant WHS risk assessments, maintain a centralised risk register,
            and generate inspection‑ready documentation aligned to the <strong>WHS Act 2011</strong>,
            <strong> ISO 31000</strong>, and <strong>Safe Work Australia</strong> guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Start Free
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-blue-700 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Talk to a Risk Advisor
            </Link>
          </div>
        </div>

        {/* WHAT SOFTWARE DOES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What risk assessment software does
          </h2>

          <p className="text-gray-600 mb-4">
            Risk assessment software replaces spreadsheets and generic templates with a structured,
            guided process for identifying hazards, assessing risks, and documenting controls. Instead of
            starting from a blank form, you follow a methodology aligned to the <strong>WHS Act 2011</strong>
            and <strong>ISO 31000</strong> — with prompts at each step to ensure nothing is missed.
          </p>

          <p className="text-gray-600 mb-4">
            The result is documentation tailored to your workplace, operations, and control measures —
            not a generic template. This distinction matters to regulators, auditors, and insurers.
          </p>

          <p className="text-gray-600">
            For Australian businesses with WHS obligations, risk assessment software provides the structure,
            methodology, and records management needed to demonstrate ongoing compliance and respond quickly
            when a regulator or insurer requests evidence.
          </p>
        </section>

        {/* FEATURES */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key features</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <FileText className="w-5 h-5 text-blue-700" />,
                title: 'Risk Assessment Creation',
                desc: 'Create structured WHS risk assessments for any workplace, project, or activity. Step‑by‑step guidance aligned to WHS Act requirements and the hierarchy of controls.',
              },
              {
                icon: <Database className="w-5 h-5 text-blue-700" />,
                title: 'Risk Register',
                desc: 'All assessed risks automatically populate your centralised risk register. Track status, assign control owners, and set review dates across your organisation.',
              },
              {
                icon: <Zap className="w-5 h-5 text-blue-700" />,
                title: 'AI Risk Generation',
                desc: 'Use AI to generate hazard scenarios and suggested controls based on your workplace type and activities. Trained on WHS requirements and Australian industry risk patterns.',
              },
              {
                icon: <ClipboardList className="w-5 h-5 text-blue-700" />,
                title: 'Industry Templates',
                desc: 'Start from templates matched to your industry — construction, healthcare, hospitality, logistics, and more. Customise to your specific operations.',
              },
              {
                icon: <BarChart2 className="w-5 h-5 text-blue-700" />,
                title: 'Risk Matrix and Scoring',
                desc: 'Built‑in risk matrix aligned to Safe Work Australia guidance. Likelihood and consequence ratings generate a risk score for prioritisation.',
              },
              {
                icon: <Lock className="w-5 h-5 text-blue-700" />,
                title: 'Inspection‑Ready Export',
                desc: 'Export WHS risk assessment reports suitable for regulator review, incident investigation, insurer assessment, and management reporting.',
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

        {/* WHO USES IT */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Who uses this risk assessment tool
          </h2>

          <div className="space-y-4">
            {[
              {
                title: 'PCBUs and company directors',
                desc: 'Meet WHS Act duty of care and officer due diligence obligations. Produce documentation that demonstrates hazards were identified and risks were genuinely managed.',
              },
              {
                title: 'SMEs and small business owners',
                desc: 'A practical, affordable WHS risk assessment tool that guides you through the process without needing a dedicated safety team.',
              },
              {
                title: 'Project managers and site supervisors',
                desc: 'Create project‑specific risk assessments, track control implementation, and maintain a risk register across multiple sites.',
              },
              {
                title: 'WHS and safety managers',
                desc: 'Centralise WHS risk documentation across your organisation. Review, update, and report on assessments from a single dashboard.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">{item.title}: </span>
                  <span className="text-gray-600">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHS + ISO ALIGNMENT */}
        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            WHS Act and ISO 31000 alignment
          </h2>

          <p className="text-gray-600 mb-4">
            The software is built on ISO 31000 risk management principles and the methodological requirements
            of the WHS Act 2011. Every assessment follows a structured process:
          </p>

          <ul className="space-y-3">
            {[
              'Hazard identification specific to your workplace and operations',
              'Risk assessment using likelihood and consequence ratings (Safe Work Australia aligned)',
              'Control selection using the hierarchy of controls — from elimination to PPE',
              'Residual risk assessment after controls are applied',
              'Documentation in a format that meets regulator expectations',
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
          <h2 className="text-2xl font-bold mb-3">Start your first risk assessment</h2>

          <p className="text-blue-200 mb-6">
            Free to start. Create a WHS risk assessment in minutes and see your risk register populate
            automatically.
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
            <Link href="/risk-management-software" className="text-blue-700 hover:underline text-sm">
              Risk Management Software →
            </Link>
            <Link href="/risk-register-software" className="text-blue-700 hover:underline text-sm">
              Risk Register Software →
            </Link>
            <Link href="/risk-assessment-whs" className="text-blue-700 hover:underline text-sm">
              WHS Risk Assessment Obligations →
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
