import type { RiskAssessmentData } from './types'

export function generateRisksPrompt(
  domain: string,
  context: string,
  industryInfo?: string
): string {
  const domainGuides: Record<string, string> = {
    whs: 'Work Health & Safety risks including hazards, injuries, compliance',
    aml: 'Anti-Money Laundering and Counter-Terrorism Financing risks',
    privacy: 'Privacy Act and data protection risks',
    fairwork: 'Fair Work Act and employment law risks',
    operational: 'General operational and business continuity risks',
  }

  const guide = domainGuides[domain] || domainGuides.operational

  return `You are a risk assessment expert. Generate realistic, specific risks for the following domain and context.

Domain: ${domain} (${guide})
Context: ${context}
${industryInfo ? `Industry: ${industryInfo}` : ''}

Generate 5-8 specific, actionable risks relevant to this context. For each risk:
- Title: Concise, clear risk description
- Likelihood: 1-5 (1=rare, 5=almost certain)
- Consequence: 1-5 (1=negligible, 5=catastrophic)
- Category: Risk category (e.g., compliance, operational, financial, reputational)
- Notes: Brief description of the risk and why it matters

Return as JSON array with this structure:
[
  {
    "title": "string",
    "likelihood": number,
    "consequence": number,
    "category": "string",
    "notes": "string"
  }
]`
}

export function generateRiskRecommendationsPrompt(
  riskTitle: string,
  riskDescription: string,
  domain: string
): string {
  return `You are a risk management consultant. Generate practical treatment recommendations for this risk.

Risk: ${riskTitle}
Description: ${riskDescription}
Domain: ${domain}

Provide 3-5 specific, actionable treatment recommendations that could be implemented as controls or mitigations.

Return as JSON array:
[
  {
    "treatment": "string (action to take)",
    "type": "detective|preventive|corrective",
    "priority": "high|medium|low",
    "estimatedEffectiveness": number (0-100)
  }
]`
}

export function validateRiskData(data: any): data is RiskAssessmentData {
  return (
    typeof data === 'object' &&
    typeof data.title === 'string' &&
    typeof data.likelihood === 'number' &&
    typeof data.consequence === 'number' &&
    data.likelihood >= 1 &&
    data.likelihood <= 5 &&
    data.consequence >= 1 &&
    data.consequence <= 5
  )
}
