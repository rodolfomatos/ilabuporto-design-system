import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Data/StatCard',
  component: StatCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total usage" value="1,204" />
      <StatCard label="Success rate" value="98%" variant="success" />
      <StatCard label="Errors" value="12" variant="error" />
      <StatCard label="Pending review" value="3" variant="warning" />
    </div>
  ),
}

export const Default: Story = {
  args: { label: 'Total services', value: '46' },
}
