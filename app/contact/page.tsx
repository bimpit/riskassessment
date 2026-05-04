import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Request a Risk Assessment | Risk Assessment Australia',
  description:
    'Request a WHS or workplace risk assessment for your Australian business. Get in touch with our team for advisor-guided, inspection-ready risk documentation.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return <ContactForm />
}
