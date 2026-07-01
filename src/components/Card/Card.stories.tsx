import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'error', 'warning'] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: { children: <p className="text-sm">This is a card with some content.</p> },
}

export const Success: Story = {
  args: { variant: 'success', children: <p className="text-sm text-green-800 dark:text-green-400">Operation completed successfully.</p> },
}

export const Error: Story = {
  args: { variant: 'error', children: <p className="text-sm text-red-800 dark:text-red-400">An error occurred.</p> },
}

export const Warning: Story = {
  args: { variant: 'warning', children: <p className="text-sm text-yellow-800 dark:text-yellow-400">This action requires attention.</p> },
}

export const KPI: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Card><p className="text-sm text-gray-500">Total Usage</p><p className="text-2xl font-bold mt-1">1,234</p></Card>
      <Card variant="success"><p className="text-sm text-green-600 dark:text-green-400">Success Rate</p><p className="text-2xl font-bold text-green-600 mt-1">98.5%</p></Card>
      <Card><p className="text-sm text-gray-500">Active Users</p><p className="text-2xl font-bold mt-1">456</p></Card>
      <Card><p className="text-sm text-gray-500">Avg Time</p><p className="text-2xl font-bold mt-1">342ms</p></Card>
    </div>
  ),
}
