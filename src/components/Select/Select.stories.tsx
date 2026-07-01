import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Theme',
    children: (
      <>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </>
    ),
  },
}
