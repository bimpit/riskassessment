import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.risk-assessment.com.au'

  return [
    {
      url: baseUrl,
      lastModified: '2025-05-01',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/risk-assessment-software`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/risk-management-software`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/risk-register-software`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/risk-assessment-whs`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/whs-risk-assessment`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/risk-assessment-template`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/risk-assessment-process`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ndis-audit-checklist`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/whs-compliance-checklist`,
      lastModified: '2025-05-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2025-05-01',
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2025-05-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: '2025-05-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: '2025-05-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
