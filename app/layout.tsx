import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { headers } from 'next/headers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'   // if you want global footer too

const baseUrl = 'https://www.risk-assessment.com.au'

export const metadata: Metadata = {
  title: 'WHS Risk Assessment Software | ISO 31000 Risk Register for Australian Businesses',
  description:
    'Create WHS risk assessments aligned to the WHS Act 2011 and ISO 31000. Maintain a defensible risk register, generate inspection‑ready reports, and manage hazards, controls, and documentation.',
  keywords: [
    'WHS risk assessment software',
    'ISO 31000 risk management',
    'risk register software Australia',
    'WHS Act 2011 compliance',
    'hazard identification software',
    'risk assessment tool',
    'WHS documentation',
    'risk management software',
    'safety management system',
    'WHS compliance Australia',
  ],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: 'Risk Assessment',
    title: 'WHS Risk Assessment Software | ISO 31000 Risk Register',
    description:
      'Create compliant WHS risk assessments and maintain a defensible risk register aligned to the WHS Act 2011 and ISO 31000.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'WHS Risk Assessment Software for Australian Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WHS Risk Assessment Software | ISO 31000 Risk Register',
    description:
      'WHS risk assessment and risk register software for Australian organisations.',
    images: ['/opengraph-image'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
  themeColor: '#ffffff',
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? '/'
  const APP_PATHS = ['/dashboard', '/login', '/signup', '/auth']
  const isAppPage = APP_PATHS.some(p => pathname.startsWith(p))

  return (
    <html lang="en" suppressHydrationWarning>

      {/* -----------------------------------------------------------
         Combined JSON‑LD Schema (Organization + Product + FAQ + Website + Breadcrumb)
      ------------------------------------------------------------ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Risk Assessment",
              "url": "https://www.risk-assessment.com.au",
              "logo": "https://www.risk-assessment.com.au/logo.png",
              "description":
                "WHS risk assessment and risk register software for Australian organisations. Aligned to the WHS Act 2011, ISO 31000, and Safe Work Australia guidelines.",
              "email": "riskassessment@getcompliai.com.au",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU"
              },
              "parentOrganization": {
                "@type": "Organization",
                "name": "Compliai Suite"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Risk Assessment",
              "brand": "Compliai Suite",
              "url": "https://www.risk-assessment.com.au",
              "description":
                "Create WHS risk assessments aligned to the WHS Act 2011 and ISO 31000. Maintain a defensible risk register, generate inspection‑ready reports, and manage hazards, controls, and documentation.",
              "category": "WHS Risk Assessment Software",
              "offers": {
                "@type": "Offer",
                "price": "49.00",
                "priceCurrency": "AUD",
                "availability": "https://schema.org/InStock",
                "url": "https://www.risk-assessment.com.au/signup"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Australian businesses"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is this software aligned to WHS Act 2011 and ISO 31000?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Yes. The platform is aligned to the WHS Act 2011, ISO 31000, Safe Work Australia guidance, and the hierarchy of controls."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who is this software designed for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Risk Assessment is built for PCBUs, SMEs, Safety Managers, Directors, and multi‑site organisations needing defensible WHS documentation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I generate inspection‑ready WHS reports?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Yes. You can export inspection‑ready WHS documentation suitable for regulators, insurers, clients, and internal audits."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does the software include a risk register?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Yes. All assessed risks flow into a centralised, defensible risk register with owners, controls, and review schedules."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Risk Assessment",
              "url": "https://www.risk-assessment.com.au",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.risk-assessment.com.au/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.risk-assessment.com.au"
                }
              ]
            }
          ])
        }}
      />

      <head>
        <link rel="dns-prefetch" href="https://api.anthropic.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>

      <body>
        {!isAppPage && <Header />}
        {children}
        {!isAppPage && <Footer />}

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}