import { cn } from '../../cn'
import { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
  className?: string
  sortable?: boolean
  /** Accessible name for the row action button. Defaults to the row's first cell text. */
  rowActionLabel?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
  sortField?: string
  sortOrder?: 'ASC' | 'DESC'
  onSort?: (field: string) => void
  /** Accessible name for the table. Evidence without a name is ambiguous. */
  caption?: string
}

export function Table<T>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No results',
  sortField,
  sortOrder,
  onSort,
  caption,
}: TableProps<T>) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <table className="w-full" aria-label={caption}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {columns.map((col) => {
              const isSorted = col.sortable && sortField === col.key
              return (
                <th
                  key={col.key}
                  scope="col"
                  // WCAG 1.3.1: the sort state was a bare arrow glyph, so a screen
                  // reader could not tell which column was sorted or in which direction.
                  aria-sort={
                    col.sortable
                      ? isSorted
                        ? sortOrder === 'DESC'
                          ? 'descending'
                          : 'ascending'
                        : 'none'
                      : undefined
                  }
                  className={cn(
                    'text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                    col.className
                  )}
                >
                  {col.sortable ? (
                    // A <th onClick> is not focusable and has no key handler, so sorting
                    // was unreachable by keyboard: WCAG 2.1.1 (Level A). A real button
                    // is focusable, activatable, and announced as a control.
                    <button
                      type="button"
                      onClick={() => onSort?.(col.key)}
                      className="inline-flex items-center gap-1 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      {col.header}
                      {isSorted && (
                        <span aria-hidden="true" className="ml-1">
                          {sortOrder === 'ASC' ? '\u2191' : '\u2193'}
                        </span>
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:border-gray-800">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => {
              const row = item as Record<string, unknown>
              const firstText = columns.length > 0 ? String(row[columns[0].key] ?? '-') : ''
              return (
                <tr
                  key={(row.id as string) || idx}
                  className={cn(
                    'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                    onRowClick && 'cursor-pointer relative'
                  )}
                >
                  {columns.map((col, colIdx) => (
                    <td key={col.key} className={cn('px-4 py-3 text-sm', col.className)}>
                      {col.render ? (
                        col.render(item)
                      ) : (
                        <span>{String(row[col.key] ?? '-')}</span>
                      )}
                      {/* The row click target is a real button in the first cell, so the
                          row is operable by keyboard. Clicking the row body still works
                          via the button, which spans the first cell. */}
                      {onRowClick && colIdx === 0 && (
                        <button
                          type="button"
                          onClick={() => onRowClick(item)}
                          aria-label={
                            col.rowActionLabel ??
                            `View details for ${firstText}`
                          }
                          className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          style={{ background: 'transparent' }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
