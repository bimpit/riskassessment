import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Risk Assessment Template | Why It's Not Enough | Risk Assessment",
  description:
    'A risk assessment template is not sufficient for WHS compliance. Learn what makes a risk assessment defensible, and why advisor-guided documentation protects Australian PCBUs.',
  alternates: {
    canonical: '/risk-assessment-template',
  },
}

export default function RiskAssessmentTemplate() {
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
            Risk Assessment Template — Why It Is Not Enough
          </h1>
          <p className="text-xl text-gray-600">
            Templates are available everywhere. But a completed template is not the same as a compliant
            risk assessment — and for Australian PCBUs, the distinction matters.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What WHS legislation requires</h2>
          <p className="text-gray-600 mb-4">
            The Work Health and Safety Act 2011 and WHS Regulations require PCBUs to manage risks to
            health and safety as far as reasonably practicable. This includes identifying hazards,
            assessing risks, and implementing controls — with documentation that demonstrates the process
            was genuine.
          </p>
          <p className="text-gray-600">
            The standard is not whether you have a document that looks like a risk assessment. The
            standard is whether a person with appropriate knowledge of the work conducted a genuine
            assessment of the specific hazards in your workplace.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What a template does — and does not do
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                What templates provide
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  'A structured format for recording risks',
                  'Common hazard categories for a given industry',
                  'A starting point for a risk identification process',
                  'Basic likelihood and consequence matrix',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                What templates do not provide
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  'Site-specific hazard identification',
                  'Evidence that a competent person conducted the assessment',
                  'Application of the hierarchy of controls to your operations',
                  'Documentation defensible under regulatory scrutiny',
                  'Protection for officers facing due diligence obligations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold flex-shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When the difference matters most</h2>
          <p className="text-gray-600 mb-4">
            Template-based risk assessments are most likely to fail under three circumstances:
          </p>
          <div className="space-y-4">
            {[
              {
                scenario: 'After an incident',
                detail:
                  'When a worker is injured, regulator investigators examine whether the relevant risk was identified and adequately controlled. A pre-filled template that lists the hazard but applies generic controls is unlikely to demonstrate adequate management.',
              },
              {
                scenario: 'During an audit',
                detail:
                  'SafeWork and state equivalents can audit your WHS arrangements at any time. A template-based register may identify this as a risk management gap, triggering improvement notices or further investigation.',
              },
              {
                scenario: 'In an insurance claim',
                detail:
                  'Some business insurance policies require the insured to have maintained adequate WHS risk management. A template may not satisfy underwriters that genuine risk management was in place.',
              },
            ].map((item) => (
              <div key={item.scenario} className="border-l-4 border-blue-700 pl-4">
                <p className="font-semibold text-gray-900 mb-1">{item.scenario}</p>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What makes a risk assessment defensible
          </h2>
          <ul className="space-y-3">
            {[
              'Conducted by a person with knowledge of your specific operations and relevant WHS obligations.',
              'Identifies hazards specific to your workplace — not generic categories.',
              'Applies the hierarchy of controls with documented rationale for control selection.',
              'Scores risks using a methodology consistent with Safe Work Australia guidance.',
              'Produces a documented record that shows how the assessment was conducted, not just what was found.',
              'Includes a review schedule and trigger conditions for reassessment.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Get inspection-ready documentation</h2>
          <p className="text-blue-200 mb-6">
            Speak with a risk advisor about replacing template-based compliance with an advisor-guided
            assessment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Speak with a Risk Advisor
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
