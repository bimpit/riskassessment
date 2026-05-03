import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a WHS risk assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A WHS risk assessment is a structured evaluation of workplace hazards and risks required under the Work Health and Safety Act 2011. As a PCBU, you must identify hazards, assess the risks they pose, implement controls, and document that process to demonstrate compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is required to conduct a risk assessment in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Persons Conducting a Business or Undertaking (PCBUs) under the WHS Act have a primary duty of care to ensure the health and safety of workers. This includes conducting and documenting risk assessments for activities that may harm workers or others affected by the work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a risk assessment template sufficient for WHS compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Generic templates identify common hazards but cannot account for your specific workplace context, operations, or control hierarchy. Regulators and insurers expect evidence that risks were assessed by someone with relevant knowledge of your operations — not a filled-in form.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a risk assessment inspection-ready?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An inspection-ready risk assessment shows regulators that hazards were identified systematically, risks were scored using a recognised methodology, controls were selected using the hierarchy of controls, and that the assessment was conducted by a person with knowledge of the specific work.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an independent risk assessment service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An independent risk assessment service provides structured, standards-aligned risk assessments without ties to proprietary software, vendors, or implementation partners. The output is evidence-based documentation suitable for regulatory, audit, and insurance review.',
      },
    },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-blue-700" />
            <span className="text-xl font-bold text-blue-700">Risk Assessment</span>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Independent Risk Assessments for Australian Businesses &amp; Projects
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Clear, standards-aligned risk assessments to support compliance, insurance, and operational decision-making.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Request a Risk Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-blue-700 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Why organisations choose us */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Why organisations choose us</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Independent & Unbiased',
                desc: 'We provide independent risk assessments and are not tied to proprietary software, vendors, or implementation partners. Our advice is based on evidence and accepted risk methodologies.',
              },
              {
                title: 'Standards-Aligned',
                desc: 'Our assessments are aligned with relevant Australian and international standards, ensuring outputs are defensible and suitable for regulatory, audit, and insurance review.',
              },
              {
                title: 'Practical & Audit-Ready',
                desc: 'We focus on clear documentation and practical recommendations that can be understood by stakeholders, auditors, and decision-makers.',
              },
            ].map((block) => (
              <div key={block.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{block.title}</h3>
                <p className="text-gray-600 text-sm">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">How it works</h2>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Initial Scoping',
                desc: 'A short, no-obligation discussion to understand your activity, context, and risk concerns.',
              },
              {
                step: '2',
                title: 'Risk Identification & Assessment',
                desc: 'Systematic identification of hazards, threats, and risk scenarios relevant to your operation or project.',
              },
              {
                step: '3',
                title: 'Review Against Standards',
                desc: 'Risks are assessed and documented in line with recognised frameworks and standards.',
              },
              {
                step: '4',
                title: 'Final Report & Recommendations',
                desc: 'You receive a clear, structured report outlining risks, controls, and recommended actions.',
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
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Risk assessment services</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Workplace Risk Assessments',
                desc: 'Risk assessments to support workplace safety, compliance obligations, and internal governance.',
              },
              {
                title: 'Project & Construction Risk',
                desc: 'Identification and assessment of project-specific risks across planning, delivery, and operational phases.',
              },
              {
                title: 'Operational & Compliance Risk',
                desc: 'Assessment of operational, procedural, and compliance risks affecting ongoing business activities.',
              },
            ].map((service) => (
              <div key={service.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach & Standards */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our approach and standards</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our risk assessments follow established risk management principles, including:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'ISO 31000 – Risk Management (principles and guidelines)',
              'Relevant Australian Standards where applicable',
              'Structured risk identification, analysis, and evaluation techniques',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-gray-600">
            The focus is on transparency, repeatability, and defensibility of outcomes.
          </p>
        </div>
      </section>

      {/* Supporting pages */}
      <section className="py-16 px-4 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Risk assessment guidance for Australian businesses
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                href: '/risk-assessment-whs',
                title: 'WHS Risk Assessment',
                desc: 'What PCBUs must do under WHS legislation and how to meet the standard.',
              },
              {
                href: '/whs-risk-assessment',
                title: 'WHS Risk Assessment Service',
                desc: 'What our WHS risk assessment service covers and how it works.',
              },
              {
                href: '/risk-assessment-template',
                title: 'Risk Assessment Template',
                desc: 'Why templates are insufficient and what a defensible assessment looks like.',
              },
              {
                href: '/risk-assessment-process',
                title: 'Our Risk Assessment Process',
                desc: 'Step-by-step: how we conduct and document a risk assessment.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                <span className="text-blue-700 text-sm font-medium mt-2 inline-block">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Request a risk assessment</h2>
          <p className="text-blue-200 text-lg mb-8">
            If you require a risk assessment or would like to discuss your requirements, get in touch using the form below.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Request a Risk Assessment
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="text-blue-300 text-sm mt-4">Initial discussions are obligation-free.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
