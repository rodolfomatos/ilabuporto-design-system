/**
 * SegmentedControl contract.
 *
 * role="group" with aria-pressed is a defensible pattern and was already correct.
 * The gap was naming: ariaLabel was optional, so a control with no label was an
 * unnamed group of buttons, and option labels are ReactNode, so an icon-only option
 * has no accessible name.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SegmentedControl } from './SegmentedControl'

const options = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
]

describe('SegmentedControl — naming and state', () => {
  it('exposes a named group', () => {
    render(<SegmentedControl options={options} value="grid" onChange={vi.fn()} ariaLabel="View" />)
    expect(screen.getByRole('group', { name: 'View' })).toBeInTheDocument()
  })

  it('reports which option is pressed', () => {
    render(<SegmentedControl options={options} value="list" onChange={vi.fn()} ariaLabel="View" />)
    // The state was carried only by a background colour class.
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Grid' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('exposes every option as a named button', () => {
    render(<SegmentedControl options={options} value="grid" onChange={vi.fn()} ariaLabel="View" />)
    // An icon-only option has no text, so the button would be unnamed without a
    // caller-supplied label.
    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Grid' })).toBeInTheDocument()
  })
})

describe('SegmentedControl — operation', () => {
  it('selects an option', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl options={options} value="grid" onChange={onChange} ariaLabel="View" />)
    await userEvent.click(screen.getByRole('button', { name: 'List' }))
    expect(onChange).toHaveBeenCalledWith('list')
  })

  it('is operable by keyboard', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl options={options} value="grid" onChange={onChange} ariaLabel="View" />)
    screen.getByRole('button', { name: 'List' }).focus()
    await userEvent.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('list')
  })
})
