import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { PricingSection } from '@/components/PricingSection'
import { Shield, CheckCircle, ArrowRight, FileText, Database, Zap, ClipboardList } from 'lucide-react'

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
      name: 'What is risk assessment software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Risk assessment software is an online tool that helps businesses identify, assess, and document workplace hazards and risks. It guides users through structured risk assessment processes, maintains a risk register, and produces inspection-ready documentation aligned to WHS requirements and ISO 31000.',
      },
    },
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
      name: 'What is a risk register and why do I need one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A risk register is a centralised record of all identified risks, their likelihood and consequence ratings, assigned controls, and review dates. It is the primary tool for ongoing risk management and is expected by regulators, auditors, and insurers as evidence that risks are being actively managed.',
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
  ],
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
  url: 'https://www.risk-assessment.com.au',
  screenshot: 'https://www.risk-assessment.com.au/opengraph-image',
  featureList: [
    'Risk assessment creation and management',
    'AI-assisted risk identification and documentation',
    'Risk register with live status tracking',
    'WHS Act and ISO 31000 aligned methodology',
    'Inspection-ready documentation',
    'Templates for common Australian industries',
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Australian businesses, PCBUs, SMEs, project managers, safety officers',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-blue-700" />
            <span className="text-xl font-bold text-blue-700">Risk Assessment</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
            >
              Pricing
            </Link>
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

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Risk Assessment Software for Australian Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create and manage risk assessments, build your risk register, and generate AI-assisted
            WHS documentation — aligned to the WHS Act and ISO 31000.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </section>

      {/* Software features */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Everything you need to manage risk
          </h2>
          <p className="text-gray-600 mb-10">
            One risk management tool covering assessments, registers, and documentation — built for
            Australian WHS compliance.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <FileText className="w-5 h-5 text-blue-700" />,
                title: 'Risk Assessments',
                desc: 'Create structured risk assessments using a WHS Act and ISO 31000 aligned methodology. Document hazards, likelihood, consequence, and controls.',
              },
              {
                icon: <Database className="w-5 h-5 text-blue-700" />,
                title: 'Risk Register',
                desc: 'Maintain a centralised risk register with live status tracking, control owners, and review schedules. One view of your entire risk landscape.',
              },
              {
                icon: <Zap className="w-5 h-5 text-blue-700" />,
                title: 'AI-Assisted Documentation',
                desc: 'Generate risk scenarios and control suggestions using AI, trained on WHS requirements and industry risk patterns. Faster assessment, same standard.',
              },
              {
                icon: <ClipboardList className="w-5 h-5 text-blue-700" />,
                title: 'Industry Templates',
                desc: 'Start from a pre-built template matched to your industry and work type. Customise to your specific operations and workplace.',
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-blue-700" />,
                title: 'Inspection-Ready Reports',
                desc: 'Export documentation in a format suitable for regulator review, incident investigation, and insurer assessment.',
              },
              {
                icon: <Shield className="w-5 h-5 text-blue-700" />,
                title: 'WHS Act Aligned',
                desc: 'Methodology aligned to Safe Work Australia guidance, hierarchy of controls, and state WHS regulations. Built for Australian compliance.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">How it works</h2>
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Create an assessment',
                desc: 'Set up a new risk assessment for your workplace, project, or activity. Choose an industry template or start from scratch.',
              },
              {
                step: '2',
                title: 'Identify hazards and assess risks',
                desc: 'Use AI-assisted generation or manual entry to identify hazards, score likelihood and consequence, and select controls from the hierarchy.',
              },
              {
                step: '3',
                title: 'Build your risk register',
                desc: 'All assessed risks flow into your centralised risk register. Assign owners, set review dates, and track control implementation.',
              },
              {
                step: '4',
                title: 'Export and review',
                desc: 'Generate inspection-ready documentation for regulators, insurers, and management review. Share directly or download for your records.',
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

      {/* Who it's for */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Built for Australian organisations</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'PCBUs & Directors',
                desc: 'Meet your WHS Act duty of care obligations with documented, defensible risk assessments. Evidence for officer due diligence.',
              },
              {
                title: 'SMEs & Operators',
                desc: 'Practical risk management tool designed for small and medium businesses — without the complexity of enterprise software.',
              },
              {
                title: 'Project & Safety Managers',
                desc: 'Manage risk across multiple projects and sites. Centralised risk register with per-project assessments and control tracking.',
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

      {/* Approach & Standards */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Standards and compliance</h2>
          <p className="text-lg text-gray-600 mb-6">
            The risk assessment tool is built on established Australian and international risk management
            standards:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'ISO 31000 – Risk Management (principles, framework, and process)',
              'Work Health and Safety Act 2011 and WHS Regulations',
              'Safe Work Australia hierarchy of controls methodology',
              'Relevant Australian Standards applicable to your industry',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 text-sm mt-4">
            For broader WHS compliance management beyond risk assessments, see{' '}
            <a href="https://www.whsshield.com.au" className="text-blue-700 font-medium hover:underline">WHS Shield — work health and safety compliance software</a>.{' '}
            Employers with employment law obligations alongside safety duties can also use{' '}
            <a href="https://www.fairworkshield.com.au" className="text-blue-700 font-medium hover:underline">Fair Work Shield — Fair Work Act compliance software for employers</a>.
          </p>
        </div>
      </section>

      {/* Resource pages */}
      <section className="py-16 px-4 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Risk assessment resources for Australian businesses
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                href: '/risk-assessment-software',
                title: 'Risk Assessment Software',
                desc: 'Features and capabilities of the risk assessment tool.',
              },
              {
                href: '/risk-management-software',
                title: 'Risk Management Software',
                desc: 'ISO 31000 aligned risk management for Australian organisations.',
              },
              {
                href: '/risk-register-software',
                title: 'Risk Register Software',
                desc: 'Maintain a centralised, audit-ready risk register.',
              },
              {
                href: '/risk-assessment-whs',
                title: 'WHS Risk Assessment',
                desc: 'What PCBUs must do under WHS legislation.',
              },
              {
                href: '/whs-risk-assessment',
                title: 'WHS Risk Assessment Service',
                desc: 'Advisor-guided WHS risk assessments for Australian businesses.',
              },
              {
                href: '/risk-assessment-template',
                title: 'Risk Assessment Template',
                desc: 'Why templates are insufficient and what a defensible assessment looks like.',
              },
              {
                href: '/risk-assessment-process',
                title: 'Our Risk Assessment Process',
                desc: 'Step-by-step: how assessments are conducted and documented.',
              },
              {
                href: '/whs-compliance-checklist',
                title: 'WHS Compliance Checklist',
                desc: 'A practical checklist for WHS compliance in Australian workplaces.',
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

      {/* Related compliance tools */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Related compliance tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="https://www.getcompliai.com.au" className="bg-blue-50 border border-blue-100 rounded-xl p-5 hover:shadow-md transition-shadow group">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">CompliAI</h3>
              <p className="text-xs text-gray-500">AI compliance platform for Australian businesses</p>
            </a>
            <a href="https://www.whsshield.com.au" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">WHS Shield</h3>
              <p className="text-xs text-gray-500">Work health and safety compliance software</p>
            </a>
            <a href="https://www.fairworkshield.com.au" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">Fair Work Shield</h3>
              <p className="text-xs text-gray-500">Fair Work Act compliance software for employers</p>
            </a>
            <a href="https://www.policywriter.com.au" className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">Policy Writer</h3>
              <p className="text-xs text-gray-500">AI-powered compliance policy generator</p>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start managing risk today</h2>
          <p className="text-blue-200 text-lg mb-8">
            Free to start. Create your first risk assessment in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Start Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors"
            >
              Talk to a Risk Advisor
            </Link>
          </div>
          <p className="text-blue-300 text-sm mt-4">No credit card required to start.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
