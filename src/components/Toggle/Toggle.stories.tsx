import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'
import { useState } from 'react'

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toggle>

const ToggleWithState = (args: any) => {
  const [enabled, setEnabled] = useState(false)
  return <Toggle {...args} enabled={enabled} onChange={setEnabled} />
}

export const Default: Story = {
  render: (args) => <ToggleWithState {...args} />,
}

export const WithLabel: Story = {
  render: (args) => <ToggleWithState {...args} label="Enable dark mode" />,
}

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled toggle' },
  render: (args) => <ToggleWithState {...args} />,
}
