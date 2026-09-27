import type { Meta, StoryObj } from '@storybook/react'
import { Toast, ToastProvider, useToast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Info: Story = {
  args: { variant: 'info', title: 'Profile saved', children: 'Your changes are live.' },
}

export const Success: Story = {
  args: { variant: 'success', title: 'Application submitted', children: 'We emailed you a confirmation.' },
}

export const Warning: Story = {
  args: { variant: 'warning', title: 'Incomplete profile', children: 'Add your faculty number to raise your score.' },
}

export const Error: Story = {
  args: { variant: 'error', title: 'Upload failed', children: 'The CSV must be UTF-8 encoded.' },
}

export const WithoutTitle: Story = {
  args: { variant: 'info', children: 'A message with no heading.' },
}

const Stack = () => {
  const toast = useToast()
  return (
    <div className="flex flex-col gap-2">
      <button type="button" onClick={() => toast.info('Profile saved', 'Your changes are live.')} className="rounded bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800">
        Info
      </button>
      <button type="button" onClick={() => toast.success('Application submitted', 'We emailed you a confirmation.')} className="rounded bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800">
        Success
      </button>
      <button type="button" onClick={() => toast.warning('Incomplete profile', 'Add your faculty number to raise your score.')} className="rounded bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800">
        Warning
      </button>
      <button type="button" onClick={() => toast.error('Upload failed', 'The CSV must be UTF-8 encoded.', 8000)} className="rounded bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800">
        Error (8s)
      </button>
    </div>
  )
}

export const ProviderStack: Story = {
  render: () => (
    <ToastProvider>
      <Stack />
    </ToastProvider>
  ),
}
