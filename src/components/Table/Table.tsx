import { cn } from '../../cn'
import { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
  className?: string
  sortable?: boolean
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
  sortField?: string
  sortOrder?: 'ASC' | 'DESC'
  onSort?: (field: string) => void
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No results',
  sortField,
  sortOrder,
  onSort,
}: TableProps<T>) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  'text-left px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                  col.sortable && 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200',
                  col.className
                )}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                {col.header}
                {col.sortable && sortField === col.key && (
                  <span className="ml-1">{sortOrder === 'ASC' ? '\u2191' : '\u2193'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={(item.id as string) || idx}
                className={cn('hover:bg-gray-50 dark:hover:bg-gray-800/50', onRowClick && 'cursor-pointer')}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 text-sm', col.className)}>
                    {col.render ? col.render(item) : String(item[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
