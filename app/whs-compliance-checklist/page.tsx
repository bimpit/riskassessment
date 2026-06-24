import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, ClipboardCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'WHS Compliance Checklist for Australian Businesses | Risk Assessment Tool',
  description:
    'A WHS compliance checklist for Australian PCBUs. Covers hazard identification, risk assessment, incident reporting, training, and documentation requirements under the WHS Act 2011.',
  alternates: {
    canonical: '/whs-compliance-checklist',
  },
}

const checklistSections = [
  {
    area: 'Management commitment and governance',
    items: [
      'WHS policy approved by senior management and communicated to all workers',
      'WHS roles and responsibilities assigned and documented',
      'WHS is a standing item on leadership meeting agendas',
      'Budget allocated for WHS activities, training, and equipment',
      'Officer due diligence obligations understood and being met',
    ],
  },
  {
    area: 'Hazard identification and risk assessment',
    items: [
      'Formal hazard identification process in place for all work areas and activities',
      'Risk assessments conducted for identified hazards using a recognised methodology',
      'Risk register maintained and reviewed at least annually or after any significant change',
      'Controls implemented according to the hierarchy of controls',
      'Residual risk assessed after controls are applied',
    ],
  },
  {
    area: 'Incident reporting and investigation',
    items: [
      'Incident reporting system in place and communicated to all workers',
      'Notifiable incidents reported to the relevant WHS regulator within required timeframes',
      'All incidents and near misses investigated to identify root causes',
      'Corrective actions assigned, implemented, and followed up',
      'Incident records maintained and accessible for at least five years',
    ],
  },
  {
    area: 'Training and competency',
    items: [
      'WHS induction completed for all new workers before starting work',
      'Training needs identified and training records maintained for each worker',
      'Workers with specific licences or tickets are verified and records kept current',
      'Refresher training scheduled for high-risk activities and hazardous tasks',
    ],
  },
  {
    area: 'Consultation and communication',
    items: [
      'Mechanism for worker consultation on WHS matters in place (e.g., HSR, WHS committee)',
      'Workers consulted when changes are made that may affect health and safety',
      'WHS information accessible to all workers, including contractors',
      'Health and safety representatives (HSRs) trained if elected',
    ],
  },
  {
    area: 'Emergency preparedness',
    items: [
      'Emergency response plan documented and communicated',
      'Emergency evacuation procedures posted and practiced at least annually',
      'First aid equipment and trained first aiders available and appropriate to risk',
      'Emergency contact list current and accessible',
    ],
  },
  {
    area: 'Contractor and visitor management',
    items: [
      'Contractor WHS prequalification process in place',
      'Contractors provided with site-specific WHS induction',
      'WHS obligations included in contracts and service agreements',
      'Visitor sign-in process and emergency briefing in place',
    ],
  },
]

export default function WHSComplianceChecklist() {
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
            WHS Compliance Checklist for Australian Businesses
          </h1>
          <p className="text-xl text-gray-600">
            A practical Work Health and Safety compliance checklist for PCBUs operating under the
            WHS Act 2011. Use this checklist to identify gaps in your WHS management system before
            a regulator inspection or internal audit.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">WHS obligations under Australian law</h2>
          <p className="text-gray-600 mb-4">
            The <em>Work Health and Safety Act 2011</em> (WHS Act) imposes a primary duty of care on
            Persons Conducting a Business or Undertaking (PCBUs) to ensure the health and safety of
            workers and others so far as is reasonably practicable. This duty is not passive — it
            requires active identification of hazards, assessment of risks, and implementation of
            appropriate controls.
          </p>
          <p className="text-gray-600 mb-4">
            Officers of a PCBU have a separate due diligence obligation under the WHS Act. Officers must
            take reasonable steps to acquire and maintain knowledge of WHS matters and ensure the PCBU
            has appropriate resources and processes to meet its obligations. Failure to exercise due
            diligence can result in personal liability, regardless of whether the officer was directly
            involved in a safety incident.
          </p>
          <p className="text-gray-600">
            State and territory WHS regulators (SafeWork NSW, WorkSafe Victoria, SafeWork SA, and
            others) can conduct proactive inspections at any time and do not need to be triggered by
            an incident. The checklist below covers the key areas regulators assess.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">WHS compliance checklist by area</h2>
          <div className="space-y-8">
            {checklistSections.map((section) => (
              <div key={section.area} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-blue-700 flex-shrink-0" />
                  {section.area}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Using this checklist alongside a formal risk assessment
          </h2>
          <p className="text-gray-600 mb-4">
            A compliance checklist identifies whether required systems are in place — but it does not
            replace a formal risk assessment. The WHS Act and regulations require that specific hazards
            be assessed by a person with relevant knowledge, using a documented methodology, and that
            controls be selected from the hierarchy of controls.
          </p>
          <p className="text-gray-600">
            Businesses that rely solely on checklists can satisfy the administrative requirements of
            WHS compliance while still carrying unassessed operational risk. A formal risk assessment
            addresses the substance of the obligation, not just the process.
          </p>
        </section>

        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Request a WHS Risk Assessment</h2>
          <p className="text-blue-200 mb-6">
            If this checklist has identified gaps in your WHS risk documentation, a managed risk
            assessment can address them and produce inspection-ready evidence of compliance.
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
            <Link href="/ndis-audit-checklist" className="text-blue-700 hover:underline text-sm">
              NDIS Audit Checklist →
            </Link>
            <Link href="/risk-assessment-whs" className="text-blue-700 hover:underline text-sm">
              WHS Risk Assessment Obligations →
            </Link>
            <Link href="/whs-risk-assessment" className="text-blue-700 hover:underline text-sm">
              WHS Risk Assessment Service →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}