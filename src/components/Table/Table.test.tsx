/**
 * Table accessibility contract.
 *
 * Table and Pagination are the components that RENDER THE EVIDENCE. A keyboard or
 * sorting regression here is not cosmetic — it means a requirement's status is
 * unreadable, which is the failure mode the whole platform exists to prevent.
 * See aes/tickets/T029-design-system-a11y-defects.md
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table, type Column } from './Table'

interface Row {
  id: string
  unit: string
  score: number
}

const columns: Column<Row>[] = [
  { key: 'unit', header: 'Unit', sortable: true },
  { key: 'score', header: 'Score', sortable: true },
  { key: 'id', header: 'ID' },
]

const data: Row[] = [
  { id: 'a', unit: 'FEUP', score: 82 },
  { id: 'b', unit: 'ISUP', score: 91 },
]

describe('Table — sorting is a real control', () => {
  it('exposes sortable headers as buttons, so they are reachable by keyboard', () => {
    render(<Table columns={columns} data={data} onSort={vi.fn()} />)
    // A <th onClick> is not focusable and has no key handler: WCAG 2.1.1 (Level A).
    expect(screen.getByRole('button', { name: /unit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /score/i })).toBeInTheDocument()
  })

  it('does NOT make a non-sortable header a button', () => {
    render(<Table columns={columns} data={data} onSort={vi.fn()} />)
    // Only sortable columns get the control. A button on every header would be a lie.
    expect(screen.queryByRole('button', { name: /^id$/i })).not.toBeInTheDocument()
  })

  it('sorts on click AND on Enter', async () => {
    const onSort = vi.fn()
    render(<Table columns={columns} data={data} onSort={onSort} />)
    const btn = screen.getByRole('button', { name: /unit/i })
    await userEvent.click(btn)
    expect(onSort).toHaveBeenCalledWith('unit')
    onSort.mockClear()
    btn.focus()
    await userEvent.keyboard('{Enter}')
    expect(onSort).toHaveBeenCalledWith('unit')
  })
})

describe('Table — sort state is programmatically exposed', () => {
  it('marks the sorted column with aria-sort=ascending', () => {
    render(
      <Table columns={columns} data={data} sortField="score" sortOrder="ASC" onSort={vi.fn()} />,
    )
    // A bare ↑ character is invisible to a screen reader: WCAG 1.3.1.
    expect(screen.getByRole('columnheader', { name: /score/i })).toHaveAttribute(
      'aria-sort',
      'ascending',
    )
    expect(screen.getByRole('columnheader', { name: /unit/i })).toHaveAttribute(
      'aria-sort',
      'none',
    )
  })

  it('marks descending distinctly from ascending', () => {
    render(
      <Table columns={columns} data={data} sortField="score" sortOrder="DESC" onSort={vi.fn()} />,
    )
    expect(screen.getByRole('columnheader', { name: /score/i })).toHaveAttribute(
      'aria-sort',
      'descending',
    )
  })

  it('hides the decorative arrow glyph from assistive technology', () => {
    render(
      <Table columns={columns} data={data} sortField="score" sortOrder="ASC" onSort={vi.fn()} />,
    )
    const header = screen.getByRole('columnheader', { name: /score/i })
    // The arrow would otherwise be announced as "upwards arrow" on top of aria-sort.
    const arrow = header.querySelector('[aria-hidden="true"]')
    expect(arrow).toBeInTheDocument()
  })
})

describe('Table — clickable rows are keyboard operable', () => {
  it('exposes a row action as a button inside the row', async () => {
    const onRowClick = vi.fn()
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />)
    const firstRow = screen.getAllByRole('row')[1]
    const action = within(firstRow).getByRole('button')
    await userEvent.click(action)
    // Clicking anywhere on a <tr> is unreachable by keyboard: WCAG 2.1.1 (Level A).
    expect(onRowClick).toHaveBeenCalledWith(data[0])
  })

  it('activates the row action with Enter and Space', async () => {
    const onRowClick = vi.fn()
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />)
    const action = within(screen.getAllByRole('row')[1]).getByRole('button')
    action.focus()
    await userEvent.keyboard('{Enter}')
    expect(onRowClick).toHaveBeenCalledWith(data[0])
  })

  it('keeps rows inert when no row action is supplied', () => {
    render(<Table columns={columns} data={data} />)
    const firstRow = screen.getAllByRole('row')[1]
    // No button, so no phantom tab stop.
    expect(within(firstRow).queryByRole('button')).not.toBeInTheDocument()
  })
})

describe('Table — naming and empty state', () => {
  it('is a table with an accessible name', () => {
    render(<Table columns={columns} data={data} caption="Maturity by unit" />)
    // Evidence with no name is ambiguous on a page with several tables.
    expect(screen.getByRole('table', { name: 'Maturity by unit' })).toBeInTheDocument()
  })

  it('renders the empty message and no rows', () => {
    render(<Table columns={columns} data={[]} emptyMessage="No units assessed" />)
    expect(screen.getByText('No units assessed')).toBeInTheDocument()
    // Header row only. The empty message lives in a cell, not a second row.
    // Header row plus the message row. The empty state IS a row (td[colspan]), which
    // is why this is 2 and not 1 -- my first assertion said 1 and was simply wrong.
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })

  it('renders a dash for a missing value rather than "undefined"', () => {
    render(<Table columns={[{ key: 'missing', header: 'Owner' }]} data={[{ id: '1' } as Row]} />)
    expect(screen.getByText('-')).toBeInTheDocument()
  })
})
