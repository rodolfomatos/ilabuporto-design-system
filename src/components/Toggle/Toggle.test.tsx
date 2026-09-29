/**
 * Toggle contract.
 *
 * role="switch" and aria-checked were already correct, so the risk here was not the
 * role but the NAME. The label was a <span> sitting beside the button, unassociated,
 * so a screen reader announced an unnamed switch: "switch, off", with no indication
 * of what it controlled.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from './Toggle'

describe('Toggle — it is a named switch', () => {
  it('is a switch with an accessible name', () => {
    render(<Toggle enabled={false} onChange={vi.fn()} label="Include archived" />)
    // The label was a sibling <span>, so getByRole('switch', { name: ... }) threw.
    expect(screen.getByRole('switch', { name: 'Include archived' })).toBeInTheDocument()
  })

  it('reports its state', () => {
    const { rerender } = render(<Toggle enabled={false} onChange={vi.fn()} label="X" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
    rerender(<Toggle enabled onChange={vi.fn()} label="X" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('hides the decorative knob from assistive technology', () => {
    render(<Toggle enabled onChange={vi.fn()} label="X" />)
    // The knob is a styled <span>; without aria-hidden it can leak into the name.
    const knob = screen.getByRole('switch').querySelector('span')
    expect(knob).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Toggle — operation', () => {
  it('toggles on click', async () => {
    const onChange = vi.fn()
    render(<Toggle enabled={false} onChange={onChange} label="X" />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is operable with the keyboard (Space)', async () => {
    const onChange = vi.fn()
    render(<Toggle enabled={false} onChange={onChange} label="X" />)
    screen.getByRole('switch').focus()
    await userEvent.keyboard(' ')
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not fire when disabled', async () => {
    const onChange = vi.fn()
    render(<Toggle enabled={false} onChange={onChange} label="X" disabled />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
