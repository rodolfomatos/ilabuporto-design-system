import type { Meta, StoryObj } from '@storybook/react'
import { ConfirmDialog } from './ConfirmDialog'
import { useState } from 'react'
import { Button } from '../Button'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Primitives/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

function DangerStory() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete</Button>
      <ConfirmDialog
        isOpen={open}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        variant="danger"
      />
    </>
  )
}

export const Danger: Story = {
  render: () => <DangerStory />,
}

function WarningStory() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Revoke Key</Button>
      <ConfirmDialog
        isOpen={open}
        title="Revoke API Key"
        message="This will permanently revoke this API key. Any services using this key will stop working."
        confirmLabel="Revoke"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        variant="warning"
      />
    </>
  )
}

export const Warning: Story = {
  render: () => <WarningStory />,
}
