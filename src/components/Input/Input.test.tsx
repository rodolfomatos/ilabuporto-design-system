/**
 * Input — accessibility contract.
 *
 * Input is the one component where the baseline is expected to hold: it generates an
 * id from the label and wires htmlFor. These tests lock that behaviour in so a later
 * refactor cannot silently break label association.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input — label association', () => {
  it('associates the label with the control', () => {
    render(<Input label="Email address" />)
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
  })

  it('derives a stable id from the label when none is given', () => {
    render(<Input label="Email address" />)
    expect(screen.getByLabelText('Email address')).toHaveAttribute('id', 'email-address')
  })

  it('honours an explicit id over the derived one', () => {
    render(<Input id="custom" label="Email address" />)
    expect(screen.getByLabelText('Email address')).toHaveAttribute('id', 'custom')
  })
})

describe('Input — error state', () => {
  it('renders the error message', () => {
    render(<Input label="Email address" error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  /**
   * A visible error that is not programmatically associated is invisible to a
   * screen-reader user. This is a known gap in the current implementation.
   */
  it('associates the error with the control programmatically', () => {
    render(<Input label="Email address" error="Required" />)
    const input = screen.getByLabelText('Email address')
    const described = input.getAttribute('aria-describedby')
    expect(described).toBeTruthy()
    expect(described && document.getElementById(described)?.textContent).toBe('Required')
  })
})

describe('Input — interaction', () => {
  it('forwards a ref to the underlying control', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Input ref={ref} label="Name" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('accepts typed input', async () => {
    const onChange = vi.fn()
    render(<Input label="Name" onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('Name'), 'ab')
    expect(onChange).toHaveBeenCalled()
    expect(screen.getByLabelText('Name')).toHaveValue('ab')
  })
})
