import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: 'Enter text...' },
}

export const WithLabel: Story = {
  args: { label: 'Email', placeholder: 'user@example.com', type: 'email' },
}

export const WithError: Story = {
  args: { label: 'Email', value: 'invalid', error: 'Please enter a valid email' },
}

export const Disabled: Story = {
  args: { label: 'Disabled', value: 'Cannot edit', disabled: true },
}
