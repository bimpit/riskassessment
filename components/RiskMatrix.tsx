import { calculateRiskScore, getRiskLevel } from '@/lib/risk-scoring'

interface MatrixRisk {
  likelihood: number
  consequence: number
}

interface RiskMatrixProps {
  risks: MatrixRisk[]
}

const likelihoodLabels: Record<number, string> = {
  5: 'Almost Certain',
  4: 'Likely',
  3: 'Possible',
  2: 'Unlikely',
  1: 'Rare',
}

const consequenceLabels: Record<number, string> = {
  1: 'Negligible',
  2: 'Minor',
  3: 'Moderate',
  4: 'Major',
  5: 'Catastrophic',
}

function cellClass(level: string): string {
  switch (level) {
    case 'critical': return 'bg-red-200 text-red-900 border-red-300'
    case 'high': return 'bg-orange-200 text-orange-900 border-orange-300'
    case 'medium': return 'bg-yellow-200 text-yellow-900 border-yellow-300'
    case 'low': return 'bg-green-200 text-green-900 border-green-300'
    default: return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const counts: Record<string, number> = {}
  for (const r of risks) {
    const l = Math.max(1, Math.min(5, Math.round(r.likelihood)))
    const c = Math.max(1, Math.min(5, Math.round(r.consequence)))
    const key = `${l}-${c}`
    counts[key] = (counts[key] ?? 0) + 1
  }

  const likelihoodRows = [5, 4, 3, 2, 1]
  const consequenceCols = [1, 2, 3, 4, 5]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Risk Matrix</h2>
        <p className="text-xs text-gray-500">Likelihood × Consequence</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2"></th>
              <th className="p-2"></th>
              <th colSpan={5} className="p-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Consequence
              </th>
            </tr>
            <tr>
              <th className="p-2"></th>
              <th className="p-2"></th>
              {consequenceCols.map((c) => (
                <th key={c} className="p-2 text-xs font-medium text-gray-700 text-center min-w-[80px]">
                  {c}<br /><span className="font-normal text-gray-500">{consequenceLabels[c]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {likelihoodRows.map((l, idx) => (
              <tr key={l}>
                {idx === 0 && (
                  <th rowSpan={5} className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wider align-middle">
                    <span className="block -rotate-90 whitespace-nowrap">Likelihood</span>
                  </th>
                )}
                <th className="p-2 text-xs font-medium text-gray-700 text-right whitespace-nowrap">
                  {l}<br /><span className="font-normal text-gray-500">{likelihoodLabels[l]}</span>
                </th>
                {consequenceCols.map((c) => {
                  const score = calculateRiskScore(l, c)
                  const level = getRiskLevel(score)
                  const count = counts[`${l}-${c}`] ?? 0
                  return (
                    <td
                      key={c}
                      className={`p-3 text-center border ${cellClass(level)} h-20`}
                    >
                      <p className="text-xs uppercase font-semibold opacity-70">{level}</p>
                      <p className="text-2xl font-bold leading-none mt-1">{count > 0 ? count : '·'}</p>
                      <p className="text-xs opacity-70 mt-1">Score {score}</p>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-600">
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('low')}`}></span> Low (1–5)</span>
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('medium')}`}></span> Medium (6–11)</span>
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('high')}`}></span> High (12–19)</span>
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('critical')}`}></span> Critical (20–25)</span>
      </div>
    </div>
  )
}
