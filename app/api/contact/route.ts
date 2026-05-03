import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, organisation, industry, description } = await request.json()

    if (!name || !email || !description) {
      return NextResponse.json({ error: 'Name, email, and description are required' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (description.length > 2000) {
      return NextResponse.json({ error: 'Description too long' }, { status: 400 })
    }

    await sendEmail({
      to: 'enquiries@risk-assessment.com.au',
      replyTo: email,
      subject: `Risk assessment request from ${name}`,
      html: `
        <h2>New risk assessment request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${organisation ? `<p><strong>Organisation:</strong> ${organisation}</p>` : ''}
        ${industry ? `<p><strong>Industry:</strong> ${industry}</p>` : ''}
        <p><strong>Description:</strong></p>
        <p style="white-space:pre-wrap">${description}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
