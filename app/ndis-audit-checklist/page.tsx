import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, ClipboardCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NDIS Audit Checklist | Risk Assessment Tool',
  description:
    'A practical NDIS audit checklist for registered providers in Australia. Understand what the NDIS Quality and Safeguards Commission audits, how to prepare, and how to maintain compliance.',
  alternates: {
    canonical: '/ndis-audit-checklist',
  },
}

const checklistItems = [
  {
    area: 'Governance and operational management',
    items: [
      'Governing body roles, responsibilities, and meeting records documented',
      'Organisational policies reviewed and approved within the last 12 months',
      'Risk management framework in place and current',
      'Complaint management system operational with records maintained',
      'Incident management and reporting procedures documented and followed',
    ],
  },
  {
    area: 'Rights and responsibilities',
    items: [
      'Participant rights communicated at intake and documented in service agreements',
      'Access to independent advocacy information provided to participants',
      'Participant feedback and complaints process clearly explained',
      'Privacy and confidentiality policy in place and communicated',
    ],
  },
  {
    area: 'Provision of supports',
    items: [
      'Support plans developed with participant input and reviewed regularly',
      'Support workers have required qualifications and current NDIS Worker Screening clearances',
      'Medication management procedures in place where supports include medication assistance',
      'Records of service delivery maintained and accessible',
    ],
  },
  {
    area: 'Support provision environment (if applicable)',
    items: [
      'Safety of premises assessed and documented',
      'Emergency evacuation procedures in place and practiced',
      'WHS risk assessments completed for the support environment',
      'Equipment and aids checked and maintained',
    ],
  },
  {
    area: 'Human resources',
    items: [
      'Staff recruitment processes include reference and background checks',
      'Induction program covers NDIS Code of Conduct, rights, safeguarding',
      'Ongoing training records maintained for all support workers',
      'Supervision arrangements documented and occurring regularly',
    ],
  },
]

export default function NDISAuditChecklist() {
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
            NDIS Audit Checklist for Registered Providers
          </h1>
          <p className="text-xl text-gray-600">
            A practical checklist covering the key areas assessed by the NDIS Quality and Safeguards
            Commission during certification and verification audits of registered NDIS providers.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What NDIS audits assess</h2>
          <p className="text-gray-600 mb-4">
            Registered NDIS providers are required to undergo audits conducted by approved quality
            auditors on behalf of the NDIS Quality and Safeguards Commission. These audits assess
            whether a provider meets the NDIS Practice Standards — a set of quality and safety
            requirements that apply to all registered support providers.
          </p>
          <p className="text-gray-600 mb-4">
            The type of audit (certification or verification) depends on the registration group and
            risk level of the supports delivered. Certification audits are more comprehensive and
            include both document review and on-site assessment. Verification audits are generally
            conducted through document review only.
          </p>
          <p className="text-gray-600">
            Both audit types assess compliance against the Core Module of the NDIS Practice Standards,
            with additional modules applied depending on the supports registered.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">NDIS audit checklist by area</h2>
          <div className="space-y-8">
            {checklistItems.map((section) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common gaps identified in NDIS audits</h2>
          <p className="text-gray-600 mb-4">
            The most frequently cited non-conformances in NDIS audits include: outdated or unsigned
            policies, incomplete incident records, missing or expired NDIS Worker Screening clearances,
            and support plans that were developed without adequate participant involvement.
          </p>
          <p className="text-gray-600">
            Risk management documentation is another area where providers often fall short. The NDIS
            Practice Standards require a documented risk management system, and auditors will check
            whether it is current, whether risks have been assessed, and whether controls are
            implemented and monitored. A standalone risk assessment for each support environment or
            high-risk activity is increasingly expected.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparing for your NDIS audit</h2>
          <ul className="space-y-4">
            {[
              {
                title: 'Review your policy suite',
                desc: 'Ensure all policies are current, approved by your governing body, and reflect actual practice. Outdated policies that do not match what staff do in practice are a common finding.',
              },
              {
                title: 'Check Worker Screening clearances',
                desc: 'Every worker who delivers NDIS supports or has more than incidental contact with participants must have a current NDIS Worker Screening clearance. Verify records are complete before the audit.',
              },
              {
                title: 'Audit your incident records',
                desc: 'Auditors will check that reportable incidents were identified, reported to the Commission within required timeframes, and that appropriate follow-up occurred.',
              },
              {
                title: 'Document your risk assessments',
                desc: 'If you deliver supports that involve physical risk to participants — including support for daily activities, community participation, or in a shared living setting — documented risk assessments should be on file.',
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3 list-none">
                <ClipboardCheck className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">{item.title}: </span>
                  <span className="text-gray-600 text-sm">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-700 text-white rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Need a risk assessment for NDIS compliance?</h2>
          <p className="text-blue-200 mb-6">
            If your NDIS audit preparation has identified gaps in your risk documentation, speak with
            a risk advisor about how a structured risk assessment can support your compliance.
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
            <Link href="/whs-compliance-checklist" className="text-blue-700 hover:underline text-sm">
              WHS Compliance Checklist →
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
