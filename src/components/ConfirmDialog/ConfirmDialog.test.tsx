/**
 * ConfirmDialog contract.
 *
 * ConfirmDialog wraps Modal, so a regression here is a regression in the dialog fix.
 * The important defect is behavioural, not semantic: confirming fired onConfirm and
 * then onCancel, so any parent doing state work in onCancel would undo the
 * confirmation. Every exit path -- Escape, backdrop, close button -- routed to
 * onCancel, so a caller could not distinguish confirmation from abandonment.
 *
 * In the maturity platform this dialog confirms remediation closure and evidence
 * deletion, so "confirm does something and then undoes itself" is a data-loss path.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfirmDialog } from './ConfirmDialog'

const setup = (over = {}) => {
  const onConfirm = vi.fn()
  const onCancel = vi.fn()
  render(
    <ConfirmDialog
      isOpen
      title="Delete evidence"
      message="This cannot be undone."
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...over}
    />,
  )
  return { onConfirm, onCancel }
}

describe('ConfirmDialog — it is a dialog', () => {
  it('exposes dialog semantics and is named by its title', async () => {
    setup()
    await waitFor(() => screen.getByRole('dialog'))
    expect(screen.getByRole('dialog', { name: 'Delete evidence' })).toHaveAttribute(
      'aria-modal',
      'true',
    )
  })

  it('describes the consequence via the message', async () => {
    setup()
    await waitFor(() => screen.getByRole('dialog'))
    // A screen reader user heard the title and not what the action would do.
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAccessibleDescription(/cannot be undone/i)
  })

  it('focuses the safe action, not the destructive one', async () => {
    setup()
    const cancel = await screen.findByRole('button', { name: /cancel/i })
    await waitFor(() => expect(document.activeElement).toBe(cancel))
    // Initial focus must not rest on "Delete". A reflexive Enter must not destroy data.
  })
})

describe('ConfirmDialog — confirming must not also cancel', () => {
  it('fires onConfirm and NOT onCancel', async () => {
    const { onConfirm, onCancel } = setup()
    await waitFor(() => screen.getByRole('button', { name: /confirm/i }))
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }))
    expect(onConfirm).toHaveBeenCalledOnce()
    // The original fired onCancel immediately after onConfirm, so a parent doing
    // state work in onCancel undid the confirmation.
    expect(onCancel).not.toHaveBeenCalled()
  })

  it('distinguishes cancellation from confirmation on every exit path', async () => {
    const { onConfirm, onCancel } = setup()
    await waitFor(() => screen.getByRole('dialog'))
    screen.getByRole('button', { name: /cancel/i }).focus()
    await userEvent.keyboard('{Escape}')
    expect(onCancel).toHaveBeenCalledOnce()
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('closes on the close button without confirming', async () => {
    const { onConfirm, onCancel } = setup()
    await waitFor(() => screen.getByRole('button', { name: /close/i }))
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onCancel).toHaveBeenCalled()
    expect(onConfirm).not.toHaveBeenCalled()
  })
})

describe('ConfirmDialog — labels', () => {
  it('uses custom labels for both actions', async () => {
    setup({ confirmLabel: 'Delete permanently', cancelLabel: 'Keep evidence' })
    await waitFor(() => screen.getByRole('dialog'))
    expect(screen.getByRole('button', { name: 'Delete permanently' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keep evidence' })).toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={false}
        title="Delete evidence"
        message="x"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    )
    expect(container).toBeEmptyDOMElement()
  })
})
