/**
 * Pagination contract.
 *
 * Pagination is how the platform pages through evidence. Two classes of defect matter:
 * a page control that cannot be operated or understood by keyboard/screen reader, and
 * a page control that can put the operator into a state with no way back.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

describe('Pagination — operation', () => {
  it('disables Prev on the first page', () => {
    render(<Pagination page={1} total={50} limit={10} onPageChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: /go to page 0/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /go to page 2/i })).toBeEnabled()
  })

  it('disables Next on the last page', () => {
    render(<Pagination page={5} total={50} limit={10} onPageChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: /go to page 6/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /go to page 4/i })).toBeEnabled()
  })

  it('moves to the next and previous page', async () => {
    const onPageChange = vi.fn()
    render(<Pagination page={2} total={50} limit={10} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: /go to page 3/i }))
    expect(onPageChange).toHaveBeenCalledWith(3)
    await userEvent.click(screen.getByRole('button', { name: /go to page 1/i }))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('is operable by keyboard', async () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} total={50} limit={10} onPageChange={onPageChange} />)
    screen.getByRole('button', { name: /go to page 2/i }).focus()
    await userEvent.keyboard('{Enter}')
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})

describe('Pagination — state is announced', () => {
  it('exposes position in a live region so a page change is announced', () => {
    render(<Pagination page={2} total={50} limit={10} onPageChange={vi.fn()} />)
    // Changing page silently is a WCAG 4.1.3 (Status Messages) failure: a screen
    // reader user clicks Next and is told nothing happened.
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent(/page\s*2\s*of\s*5/i)
  })

  it('labels the navigation region', () => {
    render(<Pagination page={1} total={50} limit={10} onPageChange={vi.fn()} />)
    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument()
  })

  it('names each button with its destination, not just "Next"', () => {
    render(<Pagination page={2} total={50} limit={10} onPageChange={vi.fn()} />)
    // "Next" alone is ambiguous when the operator needs to state the target.
    expect(screen.getByRole('button', { name: /go to page 3/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go to page 1/i })).toBeInTheDocument()
  })
})

describe('Pagination — degenerate inputs', () => {
  it('renders nothing when there is only one page', () => {
    const { container } = render(
      <Pagination page={1} total={5} limit={10} onPageChange={vi.fn()} />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when total is zero', () => {
    const { container } = render(<Pagination page={1} total={0} limit={10} onPageChange={vi.fn()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('does not loop forever when limit is zero', () => {
    // Math.ceil(10/0) === Infinity, so totalPages > 1, so it renders, and
    // page >= Infinity is never true, so Next is never disabled. The operator can
    // click Next forever with no upper bound. Fail closed instead.
    const onPageChange = vi.fn()
    render(<Pagination page={1} total={10} limit={0} onPageChange={onPageChange} />)
    expect(screen.queryByRole('button', { name: /go to page/i })).not.toBeInTheDocument()
  })

  it('does not produce a negative page when limit is negative', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} total={10} limit={-5} onPageChange={onPageChange} />)
    const prev = screen.queryByRole('button', { name: /go to page/i })
    // Math.ceil(10/-5) === -2, which is <= 1, so nothing renders at all.
    expect(prev).not.toBeInTheDocument()
  })
})
