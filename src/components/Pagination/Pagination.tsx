import { cn } from '../../cn'

interface PaginationProps {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
  // Fail closed on a non-positive limit. Math.ceil(10/0) === Infinity, so the previous
  // version rendered "Page 1 of ∞" and never disabled Next: the operator could page
  // forward forever with no upper bound. Guard before deriving, not after.
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 1

  if (!Number.isFinite(totalPages) || totalPages <= 1 || total <= 0) return null

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between"
    >
      {/* WCAG 4.1.3 Status Messages: changing page produced no announcement, so a
          screen reader user clicked Next and was told nothing had happened. */}
      <p role="status" className="text-sm text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label={`Go to page ${page - 1}`}
          className={cn(
            'px-3 py-1 text-sm border rounded-lg transition-colors',
            'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100',
            'disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          <span aria-hidden="true">&larr;</span> Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label={`Go to page ${page + 1}`}
          className={cn(
            'px-3 py-1 text-sm border rounded-lg transition-colors',
            'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100',
            'disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          Next <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </nav>
  )
}
