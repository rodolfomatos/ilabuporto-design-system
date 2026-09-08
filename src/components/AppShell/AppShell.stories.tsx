import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AppShell } from './AppShell'
import { Card } from '../Card'
import { StatCard } from '../StatCard'

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppShell>

const items = [
  { key: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { key: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { key: 'audit', label: 'Audit', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', badge: 3 },
  { key: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

export const Default: Story = {
  args: {
    items,
    activeKey: 'dashboard',
    title: 'Admin',
    subtitle: 'Dashboard',
    sidebarHeader: <a href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">&larr; Back</a>,
  },
  render: (args) => {
    return <AppShellStory {...(args as Story['args'])} />
  },
}

function AppShellStory(props: Story['args']) {
  const [active, setActive] = useState('dashboard')
  return (
    <AppShell {...props} activeKey={active} onSelect={setActive}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total usage" value="1,204" />
        <StatCard label="Success rate" value="98%" variant="success" />
        <StatCard label="Errors" value="12" variant="error" />
        <StatCard label="Pending review" value="3" variant="warning" />
      </div>
      <Card className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Content</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Active tab: {active}. This shell mirrors the iLab admin dashboard layout.
        </p>
      </Card>
    </AppShell>
  )
}
