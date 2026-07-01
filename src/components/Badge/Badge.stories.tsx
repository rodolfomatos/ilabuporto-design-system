import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'warning', 'info', 'neutral'] },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = { args: { children: 'Online', variant: 'success' } }
export const Error: Story = { args: { children: 'Offline', variant: 'error' } }
export const Warning: Story = { args: { children: 'Pending', variant: 'warning' } }
export const Info: Story = { args: { children: 'Admin', variant: 'info' } }
export const Neutral: Story = { args: { children: 'User', variant: 'neutral' } }
