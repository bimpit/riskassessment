type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

// Risk scoring matrix: likelihood × consequence
// Scale: 1-5 for both likelihood and consequence
const RISK_MATRIX: Record<number, Record<number, number>> = {
  5: { 1: 5, 2: 10, 3: 15, 4: 20, 5: 25 }, // Almost certain
  4: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20 },  // Likely
  3: { 1: 3, 2: 6, 3: 9, 4: 12, 5: 15 },   // Possible
  2: { 1: 2, 2: 4, 3: 6, 4: 8, 5: 10 },    // Unlikely
  1: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },     // Rare
}

export function calculateRiskScore(
  likelihood: number,
  consequence: number
): number {
  const l = Math.max(1, Math.min(5, Math.round(likelihood)))
  const c = Math.max(1, Math.min(5, Math.round(consequence)))
  return RISK_MATRIX[l]?.[c] ?? 0
}

export function getRiskLevel(riskScore: number): RiskLevel {
  if (riskScore >= 20) return 'critical'
  if (riskScore >= 12) return 'high'
  if (riskScore >= 6) return 'medium'
  return 'low'
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'critical':
      return 'bg-red-100 text-red-900 border-red-300'
    case 'high':
      return 'bg-orange-100 text-orange-900 border-orange-300'
    case 'medium':
      return 'bg-yellow-100 text-yellow-900 border-yellow-300'
    case 'low':
      return 'bg-green-100 text-green-900 border-green-300'
  }
}

export function getLikelihoodLabel(value: number): string {
  switch (Math.round(value)) {
    case 5:
      return 'Almost Certain'
    case 4:
      return 'Likely'
    case 3:
      return 'Possible'
    case 2:
      return 'Unlikely'
    case 1:
      return 'Rare'
    default:
      return 'Unknown'
  }
}

export function getConsequenceLabel(value: number): string {
  switch (Math.round(value)) {
    case 5:
      return 'Catastrophic'
    case 4:
      return 'Major'
    case 3:
      return 'Moderate'
    case 2:
      return 'Minor'
    case 1:
      return 'Negligible'
    default:
      return 'Unknown'
  }
}
