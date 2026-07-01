import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: { page: 1, total: 50, limit: 20, onPageChange: () => {} },
}

export const Middle: Story = {
  args: { page: 3, total: 100, limit: 20, onPageChange: () => {} },
}

export const LastPage: Story = {
  args: { page: 5, total: 100, limit: 20, onPageChange: () => {} },
}
