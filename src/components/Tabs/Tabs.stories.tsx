import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const tabs = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'users', label: 'Users' },
  { key: 'settings', label: 'Settings' },
]

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: { tabs, activeKey: 'dashboard', onChange: () => {} },
}
