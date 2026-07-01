import type { Meta, StoryObj } from '@storybook/react'
import { SlideInPanel } from './SlideInPanel'
import { useState } from 'react'
import { Button } from '../Button'

const meta: Meta<typeof SlideInPanel> = {
  title: 'Primitives/SlideInPanel',
  component: SlideInPanel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SlideInPanel>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Panel</Button>
        <SlideInPanel isOpen={open} onClose={() => setOpen(false)} title="User Profile">
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Email: user@example.com</p>
            <p className="text-sm text-gray-500">Role: Admin</p>
            <p className="text-sm text-gray-500">Joined: Jan 2024</p>
          </div>
        </SlideInPanel>
      </>
    )
  },
}
