import { Fragment } from 'react'
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Risk Matrix</h2>
        <p className="text-xs text-gray-500">Likelihood × Consequence</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex justify-center">
          <div className="flex gap-3">
            <div className="flex items-center justify-center px-1 pb-12">
              <span className="[writing-mode:vertical-rl] rotate-180 text-xs uppercase tracking-wider text-gray-500 font-semibold whitespace-nowrap">
                Likelihood
              </span>
            </div>

            <div
              className="grid gap-1.5"
              style={{ gridTemplateColumns: '7rem repeat(5, 84px)' }}
            >
              {likelihoodRows.map((l) => (
                <Fragment key={l}>
                  <div className="flex items-center justify-end pr-2 text-right">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{l}</p>
                      <p className="text-xs text-gray-500 leading-tight">{likelihoodLabels[l]}</p>
                    </div>
                  </div>
                  {consequenceCols.map((c) => {
                    const score = calculateRiskScore(l, c)
                    const level = getRiskLevel(score)
                    const count = counts[`${l}-${c}`] ?? 0
                    return (
                      <div
                        key={c}
                        title={`${level[0].toUpperCase() + level.slice(1)} (score ${score}) — ${count} risk${count !== 1 ? 's' : ''}`}
                        className={`h-16 flex items-center justify-center border rounded ${cellClass(level)}`}
                      >
                        {count > 0 ? (
                          <span className="text-2xl font-bold leading-none">{count}</span>
                        ) : (
                          <span className="text-sm font-medium opacity-50">{score}</span>
                        )}
                      </div>
                    )
                  })}
                </Fragment>
              ))}

              <div></div>
              {consequenceCols.map((c) => (
                <div key={c} className="text-center pt-2">
                  <p className="text-sm font-semibold text-gray-900">{c}</p>
                  <p className="text-xs text-gray-500 leading-tight">{consequenceLabels[c]}</p>
                </div>
              ))}

              <div></div>
              <div className="col-span-5 text-center pt-1">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Consequence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-gray-600">
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('low')}`}></span> Low (1–5)</span>
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('medium')}`}></span> Medium (6–11)</span>
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('high')}`}></span> High (12–19)</span>
        <span className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded ${cellClass('critical')}`}></span> Critical (20–25)</span>
      </div>
    </div>
  )
}
