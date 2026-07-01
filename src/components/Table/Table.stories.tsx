import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'

interface SampleData {
  id: string
  name: string
  status: string
  role: string
}

const data: SampleData[] = [
  { id: '1', name: 'Alice', status: 'online', role: 'admin' },
  { id: '2', name: 'Bob', status: 'offline', role: 'user' },
  { id: '3', name: 'Charlie', status: 'online', role: 'user' },
]

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status' },
  { key: 'role', header: 'Role' },
]

const meta: Meta<typeof Table<SampleData>> = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table<SampleData>>

export const Default: Story = {
  args: { data, columns },
}

export const Empty: Story = {
  args: { data: [], columns, emptyMessage: 'No users found' },
}
