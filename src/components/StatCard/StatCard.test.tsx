/**
 * StatCard contract.
 *
 * A StatCard renders a score and signals status with colour alone: variant="error"
 * produced red text and nothing else. WCAG 1.4.1 Use of Colour. For a maturity
 * platform this is material -- a red value means a failed requirement, and for a
 * colour-blind operator or anyone in forced-colours mode the signal is gone entirely.
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from './StatCard'

describe('StatCard — status is not conveyed by colour alone', () => {
  it('exposes success status textually', () => {
    render(<StatCard label="Conformant units" value="12" variant="success" />)
    // The only difference between success and error was a colour class.
    expect(screen.getByText(/success/i)).toBeInTheDocument()
  })

  it('exposes error status textually', () => {
    render(<StatCard label="Open items" value="3" variant="error" />)
    expect(screen.getByText(/error|failed/i)).toBeInTheDocument()
  })

  it('exposes warning status textually', () => {
    render(<StatCard label="Partial" value="1" variant="warning" />)
    expect(screen.getByText(/warning|attention/i)).toBeInTheDocument()
  })

  it('hides the status text visually while keeping it available to a screen reader', () => {
    render(<StatCard label="Score" value="82" variant="error" />)
    // It must not appear twice on screen: once as a badge, once as the value.
    const sr = screen.getByText(/error/i)
    expect(sr.className).toMatch(/sr-only/)
  })

  it('adds no status text for the default variant', () => {
    render(<StatCard label="Hosts" value="1054" />)
    // "default" is not a status; inventing one would be noise.
    expect(screen.queryByText(/success|error|warning|failed/i)).not.toBeInTheDocument()
  })

  it('still presents the label and value', () => {
    render(<StatCard label="Hosts" value="1054" />)
    expect(screen.getByText('Hosts')).toBeInTheDocument()
    expect(screen.getByText('1054')).toBeInTheDocument()
  })
})
