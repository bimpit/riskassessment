import { Resend } from 'resend'

export function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string
  subject: string
  html: string
  replyTo?: string
}) {
  const resend = getResendClient()
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'noreply@riskassessment.app',
    to,
    subject,
    html,
    ...(replyTo && { replyTo }),
  })
}

export async function sendAssessmentReminder(
  email: string,
  assessmentTitle: string,
  dueDate: string
) {
  return sendEmail({
    to: email,
    subject: `Reminder: Assessment Review Due – ${assessmentTitle}`,
    html: `
      <h2>Assessment Review Reminder</h2>
      <p>Your assessment "${assessmentTitle}" is due for review on ${dueDate}.</p>
      <p>Please log in to your account to review and update the assessment.</p>
    `,
  })
}

export async function sendRiskAlert(
  email: string,
  riskTitle: string,
  riskLevel: string
) {
  return sendEmail({
    to: email,
    subject: `⚠️ High Priority Risk Alert: ${riskTitle}`,
    html: `
      <h2>Risk Alert</h2>
      <p>A ${riskLevel} risk has been identified in your risk register:</p>
      <p><strong>${riskTitle}</strong></p>
      <p>Please log in to your account to review and take action.</p>
    `,
  })
}
