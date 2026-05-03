import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, ClipboardCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'WHS Risk Assessment Service | Managed for Australian Businesses',
  description:
    'Managed WHS risk assessment service for Australian PCBUs and SMEs. Advisor-guided, WHS Act aligned, inspection-ready documentation for regulators and insurers.',
  alternates: {
    canonical: '/whs-risk-assessment',
  },
}

export default function WHSRiskAssessment() {
  return (
    <div className="min-h-screen bg-white">
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

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            WHS Risk Assessment — Meeting Your Legal Obligations
          </h1>
          <p className="text-xl text-gray-600">
            A managed WHS risk assessment service for Australian PCBUs and SMEs. Advisor-guided, aligned
            to the WHS Act, and designed to produce documentation that satisfies regulators and insurers.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The obligation every PCBU carries</h2>
          <p className="text-gray-600 mb-4">
            The Work Health and Safety Act 2011 requires PCBUs to ensure the health and safety of
            workers and others as far as reasonably practicable. This obligation is not limited to
            preventing incidents — it includes demonstrating that risks were identified and managed
            through a documented process.
          </p>
          <p className="text-gray-600 mb-4">
            Safe Work Australia and state regulators can audit your risk management arrangements at any
            time — not only following an incident. Businesses that cannot produce adequate documentation
            face improvement notices, fines, and personal liability for officers.
          </p>
          <p className="text-gray-600">
            A WHS risk assessment is the foundational piece of that documentation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What a WHS risk assessment covers</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Hazard identification',
                desc: 'Identifying all hazards relevant to your workplace, plant, equipment, systems of work, and worker activities.',
              },
              {
                title: 'Risk evaluation',
                desc: 'Assessing the likelihood and consequence of each hazard causing harm, using a recognised risk matrix.',
              },
              {
                title: 'Control selection',
                desc: 'Identifying controls from the hierarchy — from elimination through to PPE — and documenting the rationale for each.',
              },
              {
                title: 'Residual risk assessment',
                desc: 'Assessing the risk that remains after controls are implemented, and confirming it is as low as reasonably practicable.',
              },
              {
                title: 'Review schedule',
                desc: 'Setting a schedule for reassessment — including triggers such as incidents, near misses, or changes to operations.',
              },
              {
                title: 'Documentation',
                desc: 'Producing a document that records the full assessment in a format suitable for regulatory review and insurer assessment.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why self-managed assessment creates exposure
          </h2>
          <p className="text-gray-600 mb-4">
            Many businesses conduct their own risk assessments using templates or guidance from industry
            associations. This approach is common — and commonly inadequate.
          </p>
          <p className="text-gray-600 mb-4">
            The WHS Regulations require that the person conducting the assessment has the knowledge to
            identify hazards and apply controls appropriate to the specific work. A business owner or
            manager completing a template rarely meets this standard, even with good intentions.
          </p>
          <p className="text-gray-600">
            When an incident occurs, the adequacy of the risk assessment is one of the first things
            investigated. Self-assessed documentation that cannot demonstrate site-specific, competent
            assessment is a significant liability — for the business and for individual officers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What advisor-guided assessment provides
          </h2>
          <ul className="space-y-4">
            {[
              {
                title: 'Competent assessment',
                desc: 'Conducted by a risk advisor with knowledge of WHS obligations and your industry, not by a template.',
              },
              {
                title: 'Regulatory alignment',
                desc: 'Methodology aligned to Safe Work Australia guidance and applicable state WHS regulations.',
              },
              {
                title: 'Defensible documentation',
                desc: 'A documented record of how hazards were identified, risks were scored, and controls were selected — suitable for regulators, insurers, and incident investigation.',
              },
              {
                title: 'Officer-level evidence',
                desc: 'Documentation that supports officer due diligence obligations — demonstrating that the PCBU has appropriate systems and that they were followed.',
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

        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Speak with a Risk Advisor</h2>
          <p className="text-blue-200 mb-6">
            Talk to a risk advisor about your WHS obligations and what a managed risk assessment would
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

        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm font-medium text-gray-500 mb-4">Related guidance</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/risk-assessment-whs" className="text-blue-700 hover:underline text-sm">
              WHS Risk Assessment Obligations →
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
