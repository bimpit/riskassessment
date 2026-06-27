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
        text: 'Risk assessment software is a WHS risk management tool that helps Australian businesses identify hazards, assess risks, apply control measures, and maintain a compliant risk register. It follows structured methodologies aligned to ISO 31000, the WHS Act 2011, and Safe Work Australia guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a WHS risk assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A WHS risk assessment is a structured evaluation of workplace hazards and risks required under the Work Health and Safety Act 2011. PCBUs must identify hazards, assess likelihood and consequence, implement controls using the hierarchy of controls, and document the process to demonstrate compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is required to conduct a risk assessment in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the WHS Act 2011, Persons Conducting a Business or Undertaking (PCBUs) have a primary duty of care to manage risks to health and safety. This includes conducting and documenting WHS risk assessments for tasks, activities, and environments that may expose workers or others to harm.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a risk register and why do I need one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A risk register is a centralised WHS record of identified hazards, risk ratings, control measures, and review dates. Regulators, auditors, and insurers expect PCBUs to maintain an up‑to‑date risk register as evidence that WHS risks are being monitored and controlled in accordance with ISO 31000 and WHS legislation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a risk assessment template sufficient for WHS compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Generic templates cannot account for your specific workplace hazards, operational context, or control hierarchy. Regulators expect WHS risk assessments to reflect real‑world conditions and be completed by someone with knowledge of the work — not a generic form.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a risk assessment inspection-ready?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An inspection‑ready WHS risk assessment shows that hazards were identified systematically, risks were scored using a recognised methodology, controls were selected using the hierarchy of controls, and the assessment was completed by a competent person familiar with the work environment.',
      },
    },
  ],
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Risk Assessment Software',

  // ✅ REQUIRED FOR GOOGLE
  image: 'https://www.risk-assessment.com.au/opengraph-image',

  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
    description: 'Free tier available. Pro plan includes unlimited AI-assisted WHS risk assessments and full risk register functionality.',
  },
  description:
    'WHS risk assessment software for Australian organisations. Create and manage WHS risk assessments, maintain a compliant risk register, and generate AI-assisted documentation aligned to ISO 31000, the WHS Act 2011, and Safe Work Australia guidelines.',
  url: 'https://www.risk-assessment.com.au',
  screenshot: 'https://www.risk-assessment.com.au/opengraph-image',
  featureList: [
    'Create and manage WHS risk assessments',
    'AI-assisted hazard identification and control suggestions',
    'Centralised WHS risk register with live status tracking',
    'ISO 31000 and WHS Act aligned methodology',
    'Inspection-ready WHS documentation',
    'Industry-specific templates for Australian workplaces',
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Australian businesses, PCBUs, SMEs, project managers, safety officers, WHS advisors',
  },
}


export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is risk assessment software?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Risk assessment software is a WHS risk management tool that helps Australian businesses identify hazards, assess risks, apply control measures, and maintain a compliant risk register.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a WHS risk assessment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A WHS risk assessment is a structured evaluation of workplace hazards and risks required under the Work Health and Safety Act 2011.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who is required to conduct a risk assessment in Australia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the WHS Act 2011, PCBUs must identify hazards, assess risks, implement controls, and document WHS risk assessments.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a risk register and why do I need one?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A risk register is a centralised WHS record of hazards, risk ratings, control measures, and review dates.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is a risk assessment template sufficient for WHS compliance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Regulators expect WHS risk assessments to reflect real workplace conditions, not generic templates.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes a risk assessment inspection-ready?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An inspection-ready WHS risk assessment shows systematic hazard identification, risk scoring, and hierarchy-of-controls based decisions.',
            },
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Risk Assessment Software',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',

        image: 'https://www.risk-assessment.com.au/opengraph-image.png',
        screenshot: 'https://www.risk-assessment.com.au/opengraph-image.png',

        description:
          'WHS risk assessment software for Australian organisations. Create and manage WHS risk assessments, maintain a compliant risk register, and generate AI-assisted documentation aligned to ISO 31000 and WHS legislation.',
        url: 'https://www.risk-assessment.com.au',

        featureList: [
          'Create and manage WHS risk assessments',
          'AI-assisted hazard identification and control suggestions',
          'Centralised WHS risk register with live status tracking',
          'ISO 31000 and WHS Act aligned methodology',
          'Inspection-ready WHS documentation',
          'Industry-specific templates for Australian workplaces',
        ],

        audience: {
          '@type': 'Audience',
          audienceType:
            'Australian businesses, PCBUs, SMEs, project managers, safety officers, WHS advisors',
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "27",
          "reviewCount": "27"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Sarah M."
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "reviewBody": "The software made our WHS risk assessments faster and more consistent. The AI suggestions are surprisingly accurate."
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "James P."
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "reviewBody": "Simple, clean, and compliant with WHS requirements. Our auditors loved the structured risk register."
          }
        ],

        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.risk-assessment.com.au',

          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            returnPolicyCategory:
              'https://schema.org/MerchantReturnNotPermitted',
          },

          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'AUD',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'AU',
            },
          },
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            WHS Risk Assessment Software for Australian Workplaces
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create defensible WHS risk assessments, maintain a compliant risk register, and generate
            AI‑assisted documentation — aligned to the WHS Act 2011, ISO 31000, and Safe Work Australia guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Start Free — No Credit Card
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-blue-700 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Speak With a WHS Advisor
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Built for Australian WHS compliance. Suitable for SMEs, contractors, and multi‑site organisations.
          </p>

        </div>
      </section>

      {/* Software features */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            WHS Risk Assessment & Risk Register Software
          </h2>

          <p className="text-gray-600 mb-10">
            A complete WHS risk management tool aligned to the <strong>WHS Act 2011</strong>,
            <strong> ISO 31000</strong>, and <strong>Safe Work Australia</strong> guidance.
            Create defensible risk assessments, maintain a compliant risk register, and generate
            inspection‑ready WHS documentation.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">

            {/* Risk Assessments */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <FileText className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Risk Assessments</h3>
              <p className="text-gray-600 text-sm">
                Create structured WHS risk assessments using an ISO 31000‑aligned methodology.
                Document hazards, likelihood, consequence, and control measures based on the
                hierarchy of controls.
              </p>
            </div>

            {/* Risk Register */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <Database className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Risk Register</h3>
              <p className="text-gray-600 text-sm">
                Maintain a centralised, audit‑ready WHS risk register. Track risk ratings,
                control owners, review dates, and implementation status across your organisation.
              </p>
            </div>

            {/* AI-Assisted Documentation */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <Zap className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI‑Assisted Documentation</h3>
              <p className="text-gray-600 text-sm">
                Generate hazard descriptions, risk scenarios, and control suggestions using AI
                trained on Australian WHS requirements and industry‑specific risk patterns.
              </p>
            </div>

            {/* Industry Templates */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <ClipboardList className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Industry Templates</h3>
              <p className="text-gray-600 text-sm">
                Start from pre‑built WHS risk assessment templates for construction, manufacturing,
                healthcare, NDIS, logistics, trades, and more. Customise to your workplace.
              </p>
            </div>

            {/* Inspection-Ready Reports */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <CheckCircle className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Inspection‑Ready Reports</h3>
              <p className="text-gray-600 text-sm">
                Export WHS documentation suitable for regulator inspections, incident investigations,
                accreditation audits, and insurer reviews.
              </p>
            </div>

            {/* WHS Act Aligned */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <Shield className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">WHS Act Aligned</h3>
              <p className="text-gray-600 text-sm">
                Built on the WHS Act 2011, WHS Regulations, and Safe Work Australia guidance.
                Supports PCBU duties, officer due diligence, and defensible WHS record‑keeping.
              </p>
            </div>

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

          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            How WHS Risk Assessments Work
          </h2>

          <div className="space-y-8">

            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900 mb-1">Create an assessment</h3>
                <p className="text-gray-600 text-sm">
                  Start a new WHS risk assessment for a task, activity, project, or site.
                  Choose an industry‑specific template or begin from a blank assessment aligned
                  to ISO 31000 and Safe Work Australia guidance.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900 mb-1">Identify hazards and assess risks</h3>
                <p className="text-gray-600 text-sm">
                  Document hazards, score likelihood and consequence, and apply the hierarchy
                  of controls. Use AI‑assisted suggestions trained on Australian WHS risk patterns
                  to speed up hazard identification and control selection.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900 mb-1">Build your risk register</h3>
                <p className="text-gray-600 text-sm">
                  All assessed risks automatically populate your centralised WHS risk register.
                  Track risk ratings, assign control owners, set review dates, and maintain
                  defensible WHS records for audits and investigations.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-900 mb-1">Export and review</h3>
                <p className="text-gray-600 text-sm">
                  Generate inspection‑ready WHS documentation aligned to the WHS Act 2011.
                  Export reports for regulators, insurers, accreditation bodies, or internal
                  safety reviews.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* WHY CHOOSE US OVER TEMPLATES */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Why Risk Assessment Software Beats Templates & Spreadsheets
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Templates */}
          <div>
            <p className="font-semibold text-gray-900 mb-2">Templates are generic</p>
            <p className="text-sm text-gray-600">
              Word documents and Safe Work Australia templates do not adapt to your hazards,
              industry, or control measures. They lack consistent scoring and rarely meet
              the documentation expectations of the <strong>WHS Act 2011</strong> or
              <strong> ISO 31000</strong>. Risk Assessment produces structured, defensible
              assessments aligned to Australian WHS requirements.
            </p>
          </div>

          {/* Spreadsheets */}
          <div>
            <p className="font-semibold text-gray-900 mb-2">Spreadsheets break easily</p>
            <p className="text-sm text-gray-600">
              Excel risk registers become inconsistent, hard to audit, and difficult to maintain
              across teams. Version control, review dates, and control tracking are often missing.
              Our platform keeps your WHS risk register centralised, versioned, and inspection‑ready.
            </p>
          </div>

          {/* Consultants */}
          <div>
            <p className="font-semibold text-gray-900 mb-2">Consultants are expensive</p>
            <p className="text-sm text-gray-600">
              WHS consultants can cost thousands for a single assessment. With Risk Assessment,
              you can generate unlimited assessments, controls, and reports for a predictable
              monthly price — while still meeting WHS Act and ISO 31000 expectations.
            </p>
          </div>

        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Who Uses Risk Assessment Software in Australia
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">

            {/* PCBUs & Directors */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <CheckCircle className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">PCBUs & Directors</h3>
              <p className="text-gray-600 text-sm">
                Meet WHS Act 2011 duty‑of‑care obligations with documented, defensible risk
                assessments. Demonstrate officer due diligence and maintain compliant WHS records.
              </p>
            </div>

            {/* SMEs & Operators */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <CheckCircle className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">SMEs & Operators</h3>
              <p className="text-gray-600 text-sm">
                A practical WHS risk management tool for small and medium businesses. Create
                assessments without needing specialist WHS expertise or complex enterprise systems.
              </p>
            </div>

            {/* Project & Safety Managers */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="mb-3">
                <CheckCircle className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Project & Safety Managers</h3>
              <p className="text-gray-600 text-sm">
                Manage WHS risks across multiple sites and projects. Maintain a centralised risk
                register, track control implementation, and prepare inspection‑ready documentation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SUPPORT */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Industries That Use WHS Risk Assessment Software in Australia
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Australian organisations across high‑risk and low‑risk sectors use Risk Assessment to create
          defensible WHS documentation aligned to the <strong>WHS Act 2011</strong>,
          <strong> ISO 31000</strong>, and <strong>Safe Work Australia</strong> guidelines.
          Each industry faces unique hazards, and the platform adapts to your work environment.
        </p>

        <div className="grid md:grid-cols-4 gap-10 text-center">

          <div>
            <p className="font-semibold text-gray-900 mb-2">Construction</p>
            <p className="text-sm text-gray-600">
              High‑risk work, SWMS, site hazards, plant, equipment, and contractor management.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-2">Manufacturing</p>
            <p className="text-sm text-gray-600">
              Machinery, manual handling, hazardous chemicals, production lines, and guarding risks.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-2">Healthcare & NDIS</p>
            <p className="text-sm text-gray-600">
              Client safety, infection control, manual handling, clinical environments, and duty of care.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-2">Trades & Contractors</p>
            <p className="text-sm text-gray-600">
              Electrical, plumbing, HVAC, roofing, confined spaces, and field work hazards.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-2">Logistics & Warehousing</p>
            <p className="text-sm text-gray-600">
              Forklifts, traffic management, loading, unloading, and hazardous manual tasks.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-2">Education</p>
            <p className="text-sm text-gray-600">
              School activities, excursions, workshops, laboratories, and facility safety.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-2">Hospitality</p>
            <p className="text-sm text-gray-600">
              Kitchen safety, slips and trips, hazardous substances, and food preparation risks.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-2">Professional Services</p>
            <p className="text-sm text-gray-600">
              Office ergonomics, workstation setup, psychosocial hazards, and client interactions.
            </p>
          </div>

        </div>
      </section>

      {/* Approach & Standards */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            WHS Standards and Compliance Framework
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            Risk Assessment is built on established Australian and international WHS risk management
            standards. Every assessment follows a structured, defensible methodology aligned to
            <strong> ISO 31000</strong>, the <strong>WHS Act 2011</strong>, and
            <strong> Safe Work Australia</strong> guidance.
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
            The platform supports PCBU obligations, officer due diligence, and defensible WHS
            record‑keeping. For broader WHS compliance management beyond risk assessments, see{' '}
            <a href="https://www.whsshield.com.au" className="text-blue-700 font-medium hover:underline">
              WHS Shield — work health and safety compliance software
            </a>. Employers with employment law obligations can also use{' '}
            <a href="https://www.fairworkshield.com.au" className="text-blue-700 font-medium hover:underline">
              Fair Work Shield — Fair Work Act compliance software for employers
            </a>.
          </p>

        </div>
      </section>


      {/* Resource pages */}
      <section className="py-16 px-4 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            WHS Risk Assessment Resources for Australian Businesses
          </h2>

          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            A practical library of WHS risk assessment guides, templates, and compliance resources
            aligned to the <strong>WHS Act 2011</strong>, <strong>ISO 31000</strong>, and
            <strong>Safe Work Australia</strong> requirements. Built for PCBUs, SMEs, safety managers,
            and WHS advisors who need clear, defensible documentation.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                href: '/risk-assessment-software',
                title: 'Risk Assessment Software',
                desc: 'Features, benefits, and compliance outcomes of WHS risk assessment software.',
              },
              {
                href: '/risk-management-software',
                title: 'Risk Management Software',
                desc: 'ISO 31000 aligned risk management tools for Australian organisations.',
              },
              {
                href: '/risk-register-software',
                title: 'Risk Register Software',
                desc: 'How to maintain a centralised, audit‑ready WHS risk register.',
              },
              {
                href: '/risk-assessment-whs',
                title: 'WHS Risk Assessment',
                desc: 'What PCBUs must do under the WHS Act 2011 and WHS Regulations.',
              },
              {
                href: '/whs-risk-assessment',
                title: 'WHS Risk Assessment Service',
                desc: 'Advisor‑guided WHS risk assessments for Australian workplaces.',
              },
              {
                href: '/risk-assessment-template',
                title: 'Risk Assessment Template',
                desc: 'Why templates alone are insufficient and what a defensible WHS assessment requires.',
              },
              {
                href: '/risk-assessment-process',
                title: 'Our Risk Assessment Process',
                desc: 'Step‑by‑step: how WHS risk assessments are conducted and documented.',
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

          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Related WHS & Compliance Tools for Australian Businesses
          </h2>

          <p className="text-gray-600 text-sm mb-6">
            Risk Assessment is part of the CompliAI ecosystem — a suite of Australian compliance
            platforms covering WHS, Fair Work, privacy, and operational governance. Each tool supports
            specific legislative frameworks including the <strong>WHS Act 2011</strong>,
            <strong> Fair Work Act 2009</strong>, and the <strong>Australian Privacy Principles</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <a
              href="https://www.getcompliai.com.au"
              className="bg-blue-50 border border-blue-100 rounded-xl p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">
                CompliAI
              </h3>
              <p className="text-xs text-gray-500">
                AI‑powered compliance platform for Australian organisations.
              </p>
            </a>

            <a
              href="https://www.whsshield.com.au"
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">
                WHS Shield
              </h3>
              <p className="text-xs text-gray-500">
                Work Health and Safety compliance software aligned to the WHS Act 2011.
              </p>
            </a>

            <a
              href="https://www.fairworkshield.com.au"
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">
                Fair Work Shield
              </h3>
              <p className="text-xs text-gray-500">
                Fair Work Act compliance software for Australian employers.
              </p>
            </a>

            <a
              href="https://www.policywriter.com.au"
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">
                Policy Writer
              </h3>
              <p className="text-xs text-gray-500">
                AI‑powered workplace policy generator aligned to Australian legislation.
              </p>
            </a>

          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-4">
            Start Managing WHS Risk With Confidence
          </h2>

          <p className="text-blue-200 text-lg mb-8">
            Create your first WHS risk assessment in minutes. Aligned to the
            <strong> WHS Act 2011</strong>, <strong>ISO 31000</strong>, and
            <strong> Safe Work Australia</strong> requirements — no credit card needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Start Free — No Credit Card
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors"
            >
              Speak With a WHS Advisor
            </Link>
          </div>

          <p className="text-blue-300 text-sm mt-4">
            Free to start. Cancel anytime. Built for Australian WHS compliance.
          </p>

        </div>
      </section>


      {/* LONG‑FORM SEO BLOCK */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-gray-700">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          WHS Risk Assessment Software for Australian Organisations
        </h2>

        <p className="mb-4">
          Risk Assessment is a WHS risk management platform built for Australian organisations that
          require defensible, inspection‑ready documentation aligned to the
          <strong> WHS Act 2011</strong>, <strong>ISO 31000</strong>, and
          <strong> Safe Work Australia</strong> guidelines. The software helps PCBUs, officers,
          safety managers, and frontline workers identify hazards, assess risks, implement controls,
          and maintain a compliant WHS risk register without relying on spreadsheets or generic templates.
        </p>

        <p className="mb-4">
          The platform supports a wide range of industries including
          <strong> construction</strong>, <strong>manufacturing</strong>,
          <strong>healthcare</strong>, <strong>NDIS</strong>, <strong>logistics</strong>,
          <strong>education</strong>, and <strong>professional services</strong>.
          Each assessment follows a structured methodology based on likelihood, consequence, and the
          hierarchy of controls, ensuring your WHS documentation meets regulatory expectations and
          supports officer due diligence.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
          Why Australian Businesses Choose Risk Assessment
        </h3>

        <p className="mb-4">
          Traditional WHS risk assessments created in Word or Excel are difficult to maintain,
          inconsistent across teams, and often fail to meet audit or investigation requirements.
          Risk Assessment provides a centralised, structured, and version‑controlled platform that
          keeps your WHS risk register accurate, accessible, and aligned to Australian WHS legislation.
        </p>

        <p className="mb-4">
          Organisations use the platform to prepare for internal audits, external inspections,
          accreditation processes, and incident investigations. With clear hazard identification,
          control measures, and automated reporting, teams can demonstrate compliance quickly and
          maintain a defensible WHS management system.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
          Built for Compliance, Designed for Simplicity
        </h3>

        <p className="mb-4">
          Risk Assessment is designed for teams without dedicated WHS specialists. The platform guides
          users through each step of the WHS risk assessment process, ensuring hazards are identified,
          risks are evaluated, and controls are documented in a clear and compliant format. Reports can
          be exported instantly for audits, client requirements, or internal safety reviews.
        </p>

        <p className="mb-4">
          From hazard identification to risk registers, corrective actions, and WHS documentation,
          Risk Assessment provides a complete WHS risk management solution that scales with your
          organisation. Whether you manage a single site or multiple locations, the platform adapts to
          your operational needs.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Risk Assessment is part of the CompliAI Suite, supporting Australian organisations with WHS,
          Fair Work, Privacy, AML/CTF, and operational compliance.
        </p>

      </section>


    </div>
  )
}
