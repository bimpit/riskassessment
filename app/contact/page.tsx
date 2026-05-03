'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Footer } from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', organisation: '', industry: '', description: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', organisation: '', industry: '', description: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors">
          ← Risk Assessment
        </Link>
      </nav>

      <main className="flex-1 mx-auto max-w-xl px-6 py-16 w-full">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Request a risk assessment</h1>
        <p className="text-gray-500 text-sm mb-10">
          If you require a risk assessment or would like to discuss your requirements, get in touch using the form below.
        </p>

        {status === 'sent' ? (
          <div className="rounded-lg border border-green-200 bg-green-50 px-5 py-6 text-sm text-green-900">
            <strong>Message sent.</strong> We&apos;ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {status === 'error' && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                Something went wrong. Please try again or email us directly at{' '}
                <span className="font-medium">enquiries@risk-assessment.com.au</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="organisation" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Organisation
              </label>
              <input
                id="organisation"
                type="text"
                value={form.organisation}
                onChange={e => setForm(f => ({ ...f, organisation: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Your organisation"
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Industry
              </label>
              <input
                id="industry"
                type="text"
                value={form.industry}
                onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="e.g. Construction, Healthcare, Logistics"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Brief description of the activity or project
              </label>
              <textarea
                id="description"
                required
                rows={5}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-gray-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 resize-none"
                placeholder="Briefly describe the activity, project, or risk area you need assessed."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60 transition-colors"
            >
              {status === 'sending' ? 'Sending…' : 'Send request'}
            </button>

            <p className="text-xs text-gray-500 text-center">Initial discussions are obligation-free.</p>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
