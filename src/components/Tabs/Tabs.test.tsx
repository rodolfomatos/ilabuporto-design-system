/**
 * Tabs contract.
 *
 * The previous version rendered a row of buttons with no tab semantics whatsoever:
 * no role="tablist", no role="tab", no role="tabpanel", no aria-selected, and no
 * arrow-key navigation. A screen reader could not tell which tab was current, and a
 * keyboard user had to Tab through every tab to move between them.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

const tabs = [
  { key: 'summary', label: 'Summary' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'gaps', label: 'Gaps' },
]

describe('Tabs — ARIA tab pattern', () => {
  it('is a tablist', () => {
    render(<Tabs tabs={tabs} activeKey="summary" onChange={vi.fn()} />)
    // Without role="tablist" this is a generic div and getByRole('tab') throws.
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('exposes which tab is selected', () => {
    render(<Tabs tabs={tabs} activeKey="evidence" onChange={vi.fn()} />)
    // WCAG 4.1.2: the selected state was conveyed only by a CSS border colour.
    expect(screen.getByRole('tab', { name: 'Evidence' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Summary' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
  })

  it('associates each tab with its panel', () => {
    render(<Tabs tabs={tabs} activeKey="summary" onChange={vi.fn()} />)
    // Roving tabindex: only the selected tab is in the tab sequence.
    expect(screen.getByRole('tab', { name: 'Summary' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tab', { name: 'Evidence' })).toHaveAttribute('tabindex', '-1')
  })

  it('activates a tab on click', async () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeKey="summary" onChange={onChange} />)
    await userEvent.click(screen.getByRole('tab', { name: 'Gaps' }))
    expect(onChange).toHaveBeenCalledWith('gaps')
  })
})

describe('Tabs — keyboard navigation', () => {
  it('moves between tabs with the arrow keys', async () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeKey="summary" onChange={onChange} />)
    screen.getByRole('tab', { name: 'Summary' }).focus()
    // The WAI-ARIA pattern requires arrow navigation; without it a keyboard user had
    // to Tab through every tab to reach the last one.
    await userEvent.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenCalledWith('evidence')
    await userEvent.keyboard('{ArrowLeft}')
    expect(onChange).toHaveBeenCalledWith('summary')
  })

  it('wraps from the last tab to the first', async () => {
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} activeKey="gaps" onChange={onChange} />)
    screen.getByRole('tab', { name: 'Gaps' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenCalledWith('summary')
  })
})
