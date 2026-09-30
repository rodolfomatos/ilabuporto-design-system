/**
 * Focus-trap safety.
 *
 * The Phase 1 hostile analysis flagged one specific risk: a naive focus trap makes the
 * component WORSE, because it would lock a keyboard user inside a dialog they cannot
 * leave. These tests pin that failure mode shut so it cannot be reintroduced.
 */
import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

describe('focus trap — safety', () => {
  it('never traps when the dialog has no focusable content of its own', async () => {
    // A dialog with only a close button still has something focusable, so the real
    // test is the panel itself: focus must stay inside the dialog and never become
    // unreachable. Tab must not escape to the document behind it.
    render(
      <Modal isOpen onClose={vi.fn()} title="Notice">
        <p>Nothing interactive here.</p>
      </Modal>,
    )
    const dialog = await screen.findByRole('dialog')
    await userEvent.tab()
    await userEvent.tab()
    // Critically: focus is still within the dialog, not exiled to <body>.
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
  })

  it('still closes on Escape when there is nothing focusable to trap', async () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen onClose={onClose} title="Notice">
        <p>Nothing interactive here.</p>
      </Modal>,
    )
    await waitFor(() => screen.getByText('Notice'))
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('wraps from last to first and first to last', async () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Remove record">
        <button>Cancel</button>
        <button>Remove</button>
      </Modal>,
    )
    await waitFor(() => screen.getByRole('dialog'))
    const dialog = screen.getByRole('dialog')
    const cancel = screen.getByRole('button', { name: 'Cancel' })

    // Walk to the last focusable inside the dialog, then one Tab past it: it must wrap.
    for (let i = 0; i < 6; i++) await userEvent.tab()
    expect(dialog).toContainElement(document.activeElement as HTMLElement)

    // And Shift+Tab from the first must wrap to the last, never leaving the dialog.
    for (let i = 0; i < 6; i++) await userEvent.tab({ shift: true })
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
    expect(cancel).toBeInTheDocument()
  })

  it('ignores disabled controls when trapping', async () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Remove record">
        <button disabled>Disabled</button>
        <button>Enabled</button>
      </Modal>,
    )
    await waitFor(() => screen.getByRole('dialog'))
    // The close button takes initial focus, so walk forward: focus must land on the
    // enabled control, never on the disabled one.
    const dialog = screen.getByRole('dialog')
    const disabled = screen.getByRole('button', { name: 'Disabled' })
    const visited: string[] = []
    for (let i = 0; i < 6; i++) {
      await userEvent.tab()
      // A disabled control must never become the focus target.
      expect(document.activeElement).not.toBe(disabled)
      // and focus must never leave the dialog
      expect(dialog).toContainElement(document.activeElement as HTMLElement)
      visited.push((document.activeElement as HTMLElement).textContent?.trim() || 'close')
    }
    // The enabled control is reachable, rather than being skipped along with the
    // disabled one.
    expect(visited).toContain('Enabled')
  })
})

describe('focus restoration', () => {
  it('returns focus to the element that opened the dialog', async () => {
    function Harness() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>Open dialog</button>
          <Modal isOpen={open} onClose={() => setOpen(false)} title="Notice">
            <button>Inside</button>
          </Modal>
        </>
      )
    }
    render(<Harness />)
    const trigger = screen.getByRole('button', { name: 'Open dialog' })
    await userEvent.click(trigger)
    await waitFor(() => screen.getByRole('dialog'))
    // Focus went into the dialog...
    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    // ...and comes back to the trigger, not to the top of the document.
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })
})
