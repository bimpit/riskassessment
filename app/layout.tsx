import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.riskassessment.app'

export const metadata: Metadata = {
  title: 'Risk Assessments for Australian Businesses | WHS & Workplace Risk Assessment',
  description: 'Advisor-guided risk assessments for Australian PCBUs, directors, and SME owners. WHS-aligned, inspection-ready documentation for regulators and insurers.',
  keywords: [
    'risk assessment Australia',
    'whs risk assessment',
    'workplace risk assessment',
    'PCBU risk assessment',
    'managed risk assessment',
    'WHS compliance Australia',
    'risk assessment for business',
    'inspection ready risk assessment',
    'risk assessment service',
    'Australian workplace safety',
  ],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'Risk Assessments for Australian Businesses | WHS & Workplace Risk Assessment',
    description: 'Advisor-guided risk assessments for Australian PCBUs, directors, and SME owners. WHS-aligned, inspection-ready documentation for regulators and insurers.',
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
