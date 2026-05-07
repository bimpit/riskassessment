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
  title: 'Risk Assessment Software for Australian Businesses | Risk Assessment Tool',
  description:
    'Online risk assessment software and tool for Australian businesses. Create WHS risk assessments, manage your risk register, and generate AI-assisted documentation. Free to start.',
  alternates: {
    canonical: '/risk-assessment-software',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Risk Assessment Software',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
    description: 'Free tier available. Pro plan for unlimited AI-assisted assessments.',
  },
  description:
    'Risk assessment software for Australian businesses. Create and manage risk assessments, maintain a risk register, and generate AI-assisted WHS documentation aligned to ISO 31000 and the WHS Act.',
  url: 'https://www.risk-assessment.com.au/risk-assessment-software',
}

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
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Risk Assessment Software for Australian Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            An online risk assessment tool and risk management platform designed for Australian PCBUs,
            SMEs, and project teams. Create WHS-compliant risk assessments, maintain a centralised risk
            register, and produce inspection-ready documentation — all in one place.
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

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What risk assessment software does
          </h2>
          <p className="text-gray-600 mb-4">
            Risk assessment software replaces manual spreadsheets and generic templates with a structured,
            guided process for identifying hazards, assessing risk, and documenting controls. Instead of
            starting from a blank form, you work through a methodology aligned to the WHS Act and ISO
            31000 — with the software prompting you at each step.
          </p>
          <p className="text-gray-600 mb-4">
            The result is documentation that reflects your specific workplace, operations, and controls —
            not a filled-in template. That distinction matters to regulators, auditors, and insurers.
          </p>
          <p className="text-gray-600">
            For Australian businesses with WHS obligations, risk assessment software provides the
            structure, methodology, and records management needed to demonstrate ongoing compliance — and
            to respond quickly when a regulator or insurer asks for evidence.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key features</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <FileText className="w-5 h-5 text-blue-700" />,
                title: 'Risk Assessment Creation',
                desc: 'Create structured risk assessments for any workplace, project, or activity. Step-by-step guidance aligned to WHS Act requirements and the hierarchy of controls.',
              },
              {
                icon: <Database className="w-5 h-5 text-blue-700" />,
                title: 'Risk Register',
                desc: 'All assessed risks automatically populate your centralised risk register. Track status, assign control owners, and set review dates across your organisation.',
              },
              {
                icon: <Zap className="w-5 h-5 text-blue-700" />,
                title: 'AI Risk Generation',
                desc: 'Use AI to generate risk scenarios and suggested controls based on your workplace type and activities. Trained on WHS requirements and Australian industry risk patterns.',
              },
              {
                icon: <ClipboardList className="w-5 h-5 text-blue-700" />,
                title: 'Industry Templates',
                desc: 'Start from a template matched to your industry — construction, healthcare, hospitality, logistics, and more. Customise to your specific operations.',
              },
              {
                icon: <BarChart2 className="w-5 h-5 text-blue-700" />,
                title: 'Risk Matrix and Scoring',
                desc: 'Built-in risk matrix aligned to Safe Work Australia guidance. Likelihood and consequence ratings produce a risk score that drives prioritisation.',
              },
              {
                icon: <Lock className="w-5 h-5 text-blue-700" />,
                title: 'Inspection-Ready Export',
                desc: 'Export risk assessment reports in a format suitable for regulator review, incident investigation, insurer assessment, and management reporting.',
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

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Who uses this risk assessment tool
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'PCBUs and company directors',
                desc: 'Meet your WHS Act duty of care and officer due diligence obligations. The software produces documentation that demonstrates risks were genuinely identified and managed — not just filled in.',
              },
              {
                title: 'SMEs and small business owners',
                desc: 'A practical, affordable risk assessment tool that guides you through the process without needing a dedicated WHS team. Produces the same quality of documentation that larger organisations use.',
              },
              {
                title: 'Project managers and site supervisors',
                desc: 'Create project-specific risk assessments, track control implementation, and maintain a risk register across multiple sites or projects.',
              },
              {
                title: 'WHS and safety managers',
                desc: 'Centralise risk documentation across your organisation. Review, update, and report on risk assessments from a single dashboard.',
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

        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            WHS Act and ISO 31000 alignment
          </h2>
          <p className="text-gray-600 mb-4">
            The risk assessment software is built on the risk management principles in ISO 31000 and the
            methodological requirements of the WHS Act 2011. Every assessment follows a structured process:
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

        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Start your first risk assessment</h2>
          <p className="text-blue-200 mb-6">
            Free to start. Create a risk assessment in minutes and see your risk register populate
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
