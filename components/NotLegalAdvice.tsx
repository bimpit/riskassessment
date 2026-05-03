interface NotLegalAdviceProps {
  variant?: "inline" | "page"
  className?: string
}

export function NotLegalAdvice({ variant = "inline", className = "" }: NotLegalAdviceProps) {
  if (variant === "page") {
    return (
      <div className={`rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 ${className}`}>
        <p className="font-semibold">Disclaimer — Not professional advice</p>
        <p className="mt-1">
          This software provides general compliance assistance only. It does not constitute legal, regulatory,
          WHS, or other professional advice. Laws and regulations vary by jurisdiction and change over time.
          Always consult a qualified professional before relying on any output from this tool.
        </p>
      </div>
    )
  }
  return (
    <p className={`text-xs text-amber-700 ${className}`}>
      ⚠️ <strong>Not legal advice.</strong> This tool assists with compliance tasks. Consult a qualified
      professional for advice specific to your situation.
    </p>
  )
}
