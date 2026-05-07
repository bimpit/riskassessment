import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, RefreshCw, TrendingUp, Users, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Risk Management Software for Australian Businesses | ISO 31000 Aligned',
  description:
    'Online risk management software for Australian organisations. ISO 31000 aligned risk identification, assessment, treatment, and monitoring. WHS compliant. Free to start.',
  alternates: {
    canonical: '/risk-management-software',
  },
}

export default function RiskManagementSoftware() {
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

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Risk Management Software for Australian Businesses
          </h1>
          <p className="text-xl text-gray-600">
            An online risk management tool aligned to ISO 31000 and Australian WHS requirements. Identify,
            assess, treat, and monitor risks across your organisation — with documentation that satisfies
            regulators, auditors, and insurers.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is risk management software?
          </h2>
          <p className="text-gray-600 mb-4">
            Risk management software supports the full risk management lifecycle — from identifying and
            assessing risks through to implementing controls, monitoring outcomes, and reviewing
            documentation over time. It provides the structure, methodology, and records management that
            effective risk management requires.
          </p>
          <p className="text-gray-600 mb-4">
            For Australian businesses, risk management is not discretionary. The WHS Act 2011 requires
            PCBUs to manage risks to health and safety, and to demonstrate that the obligation has been
            genuinely met. State and territory legislation imposes equivalent obligations. Directors and
            officers carry personal duty of care under section 27 of the WHS Act.
          </p>
          <p className="text-gray-600">
            Risk management software replaces spreadsheets, templates, and manual registers with a single
            system that guides assessment, tracks controls, and produces audit-ready documentation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk management capabilities</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <FileText className="w-5 h-5 text-blue-700" />,
                title: 'Risk Identification and Assessment',
                desc: 'Structured risk assessment process aligned to ISO 31000 and WHS Act requirements. Identify hazards, assess likelihood and consequence, and document the rationale for control decisions.',
              },
              {
                icon: <RefreshCw className="w-5 h-5 text-blue-700" />,
                title: 'Risk Treatment and Controls',
                desc: 'Document control measures using the hierarchy of controls. Assign control owners, set implementation timelines, and track control effectiveness over time.',
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-blue-700" />,
                title: 'Risk Monitoring and Review',
                desc: 'Centralised risk register with review schedules, status tracking, and residual risk assessment. Set triggers for reassessment when operations or hazards change.',
              },
              {
                icon: <Users className="w-5 h-5 text-blue-700" />,
                title: 'Organisational Risk Register',
                desc: 'One view of all risks across your organisation — by location, project, activity type, or risk category. Supports management reporting and board-level oversight.',
              },
              {
                icon: <Shield className="w-5 h-5 text-blue-700" />,
                title: 'WHS and Compliance Alignment',
                desc: 'Methodology aligned to Safe Work Australia guidance and state WHS regulations. Documentation produced is designed to withstand regulator and insurer scrutiny.',
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-blue-700" />,
                title: 'AI-Assisted Risk Generation',
                desc: 'Generate risk scenarios and suggested controls using AI, based on your industry and activities. Accelerates the assessment process without compromising quality.',
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

        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ISO 31000 aligned methodology</h2>
          <p className="text-gray-600 mb-4">
            ISO 31000 is the international standard for risk management. The software implements its core
            process: establishing context, identifying risks, analysing and evaluating them, treating them,
            and monitoring and reviewing outcomes.
          </p>
          <p className="text-gray-600 mb-4">
            For Australian organisations, ISO 31000 alignment is significant because regulators and
            auditors recognise it as a credible framework. When your documentation references a
            recognised methodology, it carries more weight than an undifferentiated template.
          </p>
          <ul className="space-y-3">
            {[
              'Establish context — your organisation, objectives, and risk appetite',
              'Risk identification — systematic identification of hazards and risk scenarios',
              'Risk analysis — likelihood and consequence assessment using a calibrated risk matrix',
              'Risk evaluation — prioritise risks requiring treatment',
              'Risk treatment — select and document controls, assign owners, track implementation',
              'Monitoring and review — scheduled reassessment and continuous improvement',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Australian businesses choose this risk management tool
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Built for Australian compliance',
                desc: "Methodology references the WHS Act 2011, Safe Work Australia guidance, and applicable state legislation — not a generic international framework that doesn't map to your obligations.",
              },
              {
                title: 'Practical for SMEs',
                desc: 'Enterprise risk management software is typically designed for large organisations with dedicated risk teams. This tool is sized for SMEs and PCBUs — usable without specialist knowledge.',
              },
              {
                title: 'Documentation that holds up',
                desc: 'Output is designed to withstand regulator review, incident investigation, and insurer assessment. Not a template — a structured record of a genuine risk management process.',
              },
              {
                title: 'Free to start',
                desc: 'Create your first risk assessment at no cost. The free tier is sufficient for many small businesses. Upgrade to Pro for unlimited AI-assisted assessments and advanced features.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">{item.title}: </span>
                  <span className="text-gray-600">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Start managing risk today</h2>
          <p className="text-blue-200 mb-6">
            Free to start. Full ISO 31000 aligned risk management from day one.
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
            <Link href="/risk-assessment-software" className="text-blue-700 hover:underline text-sm">
              Risk Assessment Software →
            </Link>
            <Link href="/risk-register-software" className="text-blue-700 hover:underline text-sm">
              Risk Register Software →
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
