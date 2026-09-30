/**
 * Select contract.
 *
 * The same WCAG 3.3.1 defect as Input: the error rendered but was never associated
 * with the control. Select additionally derives its id from the label, so two selects
 * with the same label silently share one id and the second label points at the first
 * control. Select is an evidence-filtering control, so that is a real defect.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'

describe('Select — error is announced', () => {
  it('associates the error with the control', () => {
    render(
      <Select label="Unit" error="Select a unit">
        <option>a</option>
      </Select>,
    )
    const select = screen.getByLabelText('Unit')
    // WCAG 3.3.1: the error looked correct on screen and was never announced.
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAccessibleDescription('Select a unit')
  })

  it('does not mark the control invalid when there is no error', () => {
    render(
      <Select label="Unit">
        <option>a</option>
      </Select>,
    )
    expect(screen.getByLabelText('Unit')).not.toHaveAttribute('aria-invalid')
  })

  it('announces the error as an alert when it appears', () => {
    render(
      <Select label="Unit" error="Required">
        <option>a</option>
      </Select>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })
})

describe('Select — id collisions', () => {
  it('gives two selects with the same label distinct ids', () => {
    // Both were id="sort-by" and the second <label for> pointed at the first control,
    // so the second select was unlabelled and the first had two labels.
    render(
      <>
        <Select label="Sort by">
          <option>a</option>
        </Select>
        <Select label="Sort by">
          <option>b</option>
        </Select>
      </>,
    )
    const selects = within(document.body).getAllByRole('combobox')
    expect(selects).toHaveLength(2)
    expect(selects[0].id).not.toBe(selects[1].id)
    expect(selects[0].id).toBeTruthy()
    expect(selects[1].id).toBeTruthy()
  })

  it('still honours an explicit id', () => {
    render(
      <Select id="unit-select" label="Unit">
        <option>a</option>
      </Select>,
    )
    expect(screen.getByLabelText('Unit')).toHaveAttribute('id', 'unit-select')
  })

  it('falls back to useId when there is no label and no id', () => {
    render(
      <Select>
        <option>a</option>
      </Select>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('id')
  })
})

describe('Select — operation', () => {
  it('is operable by keyboard and reports a change', async () => {
    const onChange = vi.fn()
    render(
      <Select label="Unit" onChange={onChange}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    )
    await userEvent.selectOptions(screen.getByLabelText('Unit'), 'b')
    expect(onChange).toHaveBeenCalled()
  })
})
