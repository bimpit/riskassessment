import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.risk-assessment.com.au'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Risk Assessment',
  url: 'https://www.risk-assessment.com.au',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'enquiries@risk-assessment.com.au',
    contactType: 'customer service',
    areaServed: 'AU',
    availableLanguage: 'English',
  },
  areaServed: 'AU',
}

export const metadata: Metadata = {
  title: 'Risk Assessment Software for Australian Businesses | WHS & Risk Management',
  description:
    'Risk assessment software and tool for Australian businesses. Create risk assessments, build a risk register, and generate AI-assisted WHS documentation. Inspection-ready, ISO 31000 aligned.',
  keywords: [
    'risk assessment software',
    'risk assessment software Australia',
    'risk management software',
    'risk management software Australia',
    'risk register software',
    'risk assessment tool',
    'risk assessment tool Australia',
    'WHS risk assessment',
    'workplace risk assessment',
    'risk assessment Australia',
    'PCBU risk assessment',
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
    title: 'Risk Assessment Software for Australian Businesses | WHS & Risk Management',
    description:
      'Risk assessment software and tool for Australian businesses. Create risk assessments, build a risk register, and generate AI-assisted WHS documentation.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Risk Assessment Software for Australian Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risk Assessment Software for Australian Businesses',
    description:
      'Risk assessment software and tool for Australian businesses. WHS-aligned, inspection-ready documentation.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://api.anthropic.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`}</Script>
          </>
        )}
      </body>
    </html>
  )
}
