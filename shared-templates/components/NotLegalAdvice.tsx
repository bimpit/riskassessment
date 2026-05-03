// Drop anywhere near legal, compliance, or risk content
export function NotLegalAdvice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 ${className}`}
      role="note"
      aria-label="Legal disclaimer"
    >
      <strong className="font-semibold">Not legal advice.</strong>{" "}
      This software provides templates and tools to assist with compliance and risk management.
      It does not constitute legal, regulatory, or professional advice. Always consult a qualified
      professional for advice specific to your situation.
    </div>
  );
}
