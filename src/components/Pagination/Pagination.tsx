import { cn } from '../../cn'

interface PaginationProps {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            'px-3 py-1 text-sm border rounded-lg transition-colors',
            'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100',
            'disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          &larr; Prev
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={cn(
            'px-3 py-1 text-sm border rounded-lg transition-colors',
            'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100',
            'disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}
