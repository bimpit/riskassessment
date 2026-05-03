import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Risk Assessment Process | Managed, Advisor-Guided | Risk Assessment',
  description:
    'How we conduct managed risk assessments for Australian PCBUs. Step-by-step: hazard identification, risk scoring, control selection, and inspection-ready documentation.',
  alternates: {
    canonical: '/risk-assessment-process',
  },
}

export default function RiskAssessmentProcess() {
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
            Our Risk Assessment Process
          </h1>
          <p className="text-xl text-gray-600">
            A step-by-step look at how we conduct managed risk assessments — from initial scope to final
            documentation ready for regulators and insurers.
          </p>
        </div>

        <section className="mb-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {[
              { step: 'Identify hazards', desc: 'Systematically find what in the work environment could cause harm to workers or others.' },
              { step: 'Assess risk', desc: 'Score each hazard against a likelihood and consequence matrix aligned to Safe Work Australia guidance.' },
              { step: 'Define controls', desc: 'Select and document controls using the hierarchy of controls — from elimination through to PPE.' },
              { step: 'Produce evidence', desc: 'Record the full process in documentation suitable for regulators, insurers, and incident review.' },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex sm:flex-col items-start sm:items-stretch gap-3 sm:gap-0 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-blue-400 flex-shrink-0 hidden sm:block" />
                  )}
                </div>
                <div className="sm:mt-3">
                  <div className="font-bold text-gray-900 text-sm mb-1">{item.step}</div>
                  <div className="text-gray-600 text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why the process matters</h2>
          <p className="text-gray-600 mb-4">
            Under the WHS Act, documentation of a risk assessment is not enough on its own — what
            matters is whether the process demonstrates genuine, competent management of the relevant
            risks. Regulators assess whether the assessment was real, not just whether a document exists.
          </p>
          <p className="text-gray-600">
            Our process is designed to produce evidence of a genuine, systematic assessment — not a
            filled-in form.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How the assessment works</h2>
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Scope and context',
                desc: 'We establish the scope of the assessment: the work activities, locations, plant and equipment, and worker population involved. We review any existing documentation and relevant legislation or codes of practice.',
              },
              {
                step: '02',
                title: 'Hazard identification',
                desc: 'We identify hazards specific to your operations — not a generic industry list. This includes physical hazards, psychological hazards, plant and equipment, systems of work, and environmental factors.',
              },
              {
                step: '03',
                title: 'Risk evaluation',
                desc: 'Each hazard is assessed against a likelihood and consequence matrix aligned to Safe Work Australia guidance. We document the rationale for each score — not just the number.',
              },
              {
                step: '04',
                title: 'Control selection',
                desc: 'Controls are selected using the hierarchy of controls: elimination, substitution, isolation, engineering controls, administrative controls, and PPE. We document why each control was selected and what it achieves.',
              },
              {
                step: '05',
                title: 'Residual risk assessment',
                desc: 'After controls are identified, we assess the residual risk — the risk that remains once controls are implemented. If residual risk is not as low as reasonably practicable, additional controls are identified.',
              },
              {
                step: '06',
                title: 'Documentation and review schedule',
                desc: 'The completed assessment is documented in a format designed for regulatory review, insurance purposes, and internal governance. A review schedule is set, including triggers for reassessment.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What you receive</h2>
          <p className="text-gray-600 mb-4">
            At the completion of the assessment, you receive documentation that records the full process
            — not just a list of risks and controls.
          </p>
          <ul className="space-y-3">
            {[
              'Scope and context record',
              'Hazard identification log with site-specific detail',
              'Risk register with scored entries and scoring rationale',
              'Control schedule with hierarchy notation and rationale',
              'Residual risk summary',
              'Review schedule and reassessment triggers',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <FileText className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why it produces defensible evidence
          </h2>
          <ul className="space-y-3">
            {[
              'The assessment is conducted by an advisor with knowledge of WHS obligations, not completed from a template.',
              'Each step of the process is documented so it can be demonstrated to regulators, insurers, or in court.',
              'Scoring and control selection follow a methodology consistent with Safe Work Australia guidance.',
              'The documentation records the reasons behind decisions — addressing the questions that regulators and insurers ask.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Speak with a Risk Advisor</h2>
          <p className="text-blue-200 mb-6">
            Find out what a managed risk assessment would cover for your business and how long it takes.
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
            <Link href="/whs-risk-assessment" className="text-blue-700 hover:underline text-sm">
              WHS Risk Assessment Service →
            </Link>
            <Link href="/risk-assessment-template" className="text-blue-700 hover:underline text-sm">
              Why Templates Are Not Enough →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
