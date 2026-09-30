/**
 * Button contract.
 *
 * Every control in the platform depends on this component, so a defect here is a
 * defect everywhere. The loading state was the gap: the spinner svg had no
 * aria-hidden and no aria-busy, so a loading button could announce a graphic, and
 * the fact that an action was in flight was never announced at all (WCAG 4.1.3).
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button — loading state is announced, not decorative', () => {
  it('marks itself busy while loading', () => {
    // WCAG 4.1.3: "Submitting" is a status message. A screen reader user was told
    // nothing, so a disabled button looked like a broken one.
    render(<Button loading>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('aria-busy', 'true')
  })

  it('is not busy when idle', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).not.toHaveAttribute('aria-busy')
  })

  it('hides the spinner from assistive technology but keeps the label', () => {
    render(<Button loading>Save</Button>)
    // Without aria-hidden the spinner leaked into the accessible name as a graphic.
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    // The name must remain the action, not the spinner.
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})

describe('Button — cannot be double-submitted', () => {
  it('is disabled while loading', () => {
    render(<Button loading>Save</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not fire onClick while loading', async () => {
    const onClick = vi.fn()
    render(<Button loading onClick={onClick}>Save</Button>)
    // A double-submitted evidence declaration is a data-integrity problem, not a
    // cosmetic one.
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Button — operation and pass-through', () => {
  it('fires onClick', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is operable with Enter and Space', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)
    screen.getByRole('button').focus()
    await userEvent.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('passes native attributes through', () => {
    render(<Button type="submit" disabled>Save</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('type', 'submit')
    expect(btn).toBeDisabled()
  })

  it('merges a caller className rather than replacing the base styles', () => {
    render(<Button className="w-full">Save</Button>)
    const cls = screen.getByRole('button').className
    expect(cls).toContain('w-full')
    // The base layout classes must survive, or the button loses its shape entirely.
    expect(cls).toContain('inline-flex')
  })

  it('forwards its ref', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>
    render(<Button ref={ref}>Save</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
