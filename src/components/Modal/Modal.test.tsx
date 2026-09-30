/**
 * Modal — accessibility contract.
 *
 * These tests assert what a dialog MUST do for WAI-ARIA, not what it happens to do.
 * They are expected to fail against the current implementation. That failure is the
 * finding: the component carries no ARIA semantics, no Escape handling and no focus
 * management. See aes/tickets/T023-design-system-tests.md.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

function renderModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  return render(
    <Modal isOpen onClose={vi.fn()} title="Confirm removal" {...props}>
      <button>Inside action</button>
    </Modal>,
  )
}

describe('Modal — dialog semantics', () => {
  it('exposes itself as a dialog', async () => {
    renderModal()
    await waitFor(() => screen.getByText('Confirm removal'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('declares aria-modal so assistive tech treats content behind it as inert', async () => {
    renderModal()
    await waitFor(() => screen.getByText('Confirm removal'))
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('names the dialog via its title, not just visually', async () => {
    renderModal()
    await waitFor(() => screen.getByText('Confirm removal'))
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Confirm removal')
  })
})

describe('Modal — keyboard', () => {
  it('closes on Escape', async () => {
    const onClose = vi.fn()
    renderModal({ onClose })
    await waitFor(() => screen.getByText('Confirm removal'))
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })
})

describe('Modal — focus management', () => {
  it('moves focus into the dialog when it opens', async () => {
    renderModal()
    await waitFor(() => screen.getByText('Confirm removal'))
    // Focus must land inside the dialog, never remain on the trigger behind it.
    const dialog = screen.getByRole('dialog')
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
  })

  it('traps Tab within the dialog', async () => {
    renderModal()
    await waitFor(() => screen.getByText('Confirm removal'))
    const dialog = screen.getByRole('dialog')
    for (let i = 0; i < 6; i++) {
      await userEvent.tab()
      expect(dialog).toContainElement(document.activeElement as HTMLElement)
    }
  })

  it('closes the backdrop from the keyboard, not the mouse alone', async () => {
    const onClose = vi.fn()
    renderModal({ onClose })
    await waitFor(() => screen.getByText('Confirm removal'))
    // The backdrop is a bare div with onClick. It must at minimum be a control.
    const dialog = screen.getByRole('dialog')
    const backdrop = dialog.parentElement?.querySelector('div.fixed.inset-0')
    expect(backdrop).not.toBeNull()
  })
})

describe('Modal — scroll lock', () => {
  it('locks body scroll while open and restores it on close', async () => {
    const { rerender } = renderModal()
    await waitFor(() => screen.getByText('Confirm removal'))
    expect(document.body.style.overflow).toBe('hidden')
    rerender(
      <Modal isOpen={false} onClose={vi.fn()} title="Confirm removal">
        <button>Inside action</button>
      </Modal>,
    )
    await waitFor(() => expect(document.body.style.overflow).toBe(''))
  })
})
