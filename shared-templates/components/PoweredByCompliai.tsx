// Small trust badge — place in footer, login pages, or pricing pages
export function PoweredByCompliai({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.compliai.com.au"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 ${className}`}
    >
      {/* Shield icon */}
      <svg
        className="h-3.5 w-3.5 text-blue-500"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 1.5a.75.75 0 0 1 .694.464l2.036 4.874 5.23.479a.75.75 0 0 1 .424 1.315l-3.957 3.44 1.18 5.15a.75.75 0 0 1-1.12.812L12 15.086l-4.487 2.448a.75.75 0 0 1-1.12-.813l1.18-5.15-3.957-3.44a.75.75 0 0 1 .424-1.315l5.23-.48 2.036-4.873A.75.75 0 0 1 12 1.5Z"
          clipRule="evenodd"
        />
      </svg>
      Powered by <span className="font-semibold text-blue-600">Compliai</span>
    </a>
  );
}
