/**
 * SlideInPanel contract.
 *
 * A panel is a dialog in all but name. The previous version had no role, no
 * aria-modal, no accessible name, no Escape, no focus management and no trap, and
 * its close button -- an unlabelled <button> wrapping an <svg> -- was invisible to
 * any name-based query. Worse, the close button was rendered only when a title was
 * supplied, so a panel without a title could not be closed at all.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SlideInPanel } from './SlideInPanel'

describe('SlideInPanel — it is a dialog', () => {
  it('exposes dialog semantics and an accessible name', () => {
    render(
      <SlideInPanel isOpen onClose={vi.fn()} title="Evidence detail">
        <p>Body</p>
      </SlideInPanel>,
    )
    // A panel with no role is a div: getByRole('dialog') throws.
    expect(screen.getByRole('dialog', { name: 'Evidence detail' })).toHaveAttribute(
      'aria-modal',
      'true',
    )
  })

  it('names the close button', async () => {
    render(
      <SlideInPanel isOpen onClose={vi.fn()} title="Evidence detail">
        <p>Body</p>
      </SlideInPanel>,
    )
    // The button wrapped an <svg> and had no accessible name at all.
    expect(await screen.findByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('always offers a way to close, even with no title', async () => {
    // Previously the close button lived inside the title block, so a panel without a
    // title rendered no close control whatsoever.
    render(
      <SlideInPanel isOpen onClose={vi.fn()}>
        <p>Body</p>
      </SlideInPanel>,
    )
    expect(await screen.findByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const onClose = vi.fn()
    render(
      <SlideInPanel isOpen onClose={onClose} title="Evidence detail">
        <p>Body</p>
      </SlideInPanel>,
    )
    await waitFor(() => screen.getByRole('dialog'))
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  it('closes from the named close button', async () => {
    const onClose = vi.fn()
    render(
      <SlideInPanel isOpen onClose={onClose} title="Evidence detail">
        <p>Body</p>
      </SlideInPanel>,
    )
    await userEvent.click(await screen.findByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('moves focus into the panel on open', async () => {
    render(
      <SlideInPanel isOpen onClose={vi.fn()} title="Evidence detail">
        <button>Inside</button>
      </SlideInPanel>,
    )
    await waitFor(() => screen.getByRole('dialog'))
    await waitFor(() => expect(document.activeElement).not.toBe(document.body))
  })

  it('renders nothing when closed', () => {
    const { container } = render(
      <SlideInPanel isOpen={false} onClose={vi.fn()} title="Evidence detail">
        <p>Body</p>
      </SlideInPanel>,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('does not close when content inside the panel is clicked', async () => {
    const onClose = vi.fn()
    render(
      <SlideInPanel isOpen onClose={onClose} title="Evidence detail">
        <button>Inside</button>
      </SlideInPanel>,
    )
    await userEvent.click(await screen.findByRole('button', { name: 'Inside' }))
    // The backdrop handler must not fire for clicks within the panel.
    expect(onClose).not.toHaveBeenCalled()
  })
})
