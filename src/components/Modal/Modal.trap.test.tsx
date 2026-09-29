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
  it('does not trap when the dialog contains nothing focusable', async () => {
    // No buttons, no links, no inputs. A naive trap would capture Tab forever and the
    // user could not reach Escape either.
    render(
      <Modal isOpen onClose={vi.fn()} title="Notice">
        <p>Nothing interactive here.</p>
      </Modal>,
    )
    await waitFor(() => screen.getByText('Notice'))
    await userEvent.tab()
    // Focus stays on the panel rather than being exiled to the document, and the user
    // is not trapped on some unreachable element.
    expect(document.activeElement).toBe(screen.getByRole('dialog'))
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

    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab() // past the last item, should wrap
    expect(dialog).toContainElement(document.activeElement as HTMLElement)

    await userEvent.tab({ shift: true }) // before the first, should wrap back
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
  })

  it('ignores disabled controls when trapping', async () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Remove record">
        <button disabled>Disabled</button>
        <button>Enabled</button>
      </Modal>,
    )
    await waitFor(() => screen.getByRole('dialog'))
    // The first item focused must be the enabled button, not the disabled one.
    const enabled = screen.getByRole('button', { name: 'Enabled' })
    expect(document.activeElement).toBe(enabled)
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
