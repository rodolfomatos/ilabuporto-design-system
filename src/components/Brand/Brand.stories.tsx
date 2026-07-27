import type { Meta, StoryObj } from '@storybook/react'
import { Brand } from './Brand'

const meta: Meta<typeof Brand> = {
  title: 'Primitives/Brand',
  component: Brand,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Brand>

export const Navbar: Story = {
  args: { name: 'PDF Tools' },
  decorators: [(Story) => (
    <nav className="p-4 text-white" style={{ backgroundColor: '#009FDF' }}>
      <Story />
    </nav>
  )],
}

export const NavbarNoSeparator: Story = {
  args: { name: 'PDF Tools', hideSeparator: true },
  decorators: [(Story) => (
    <nav className="p-4 text-white" style={{ backgroundColor: '#009FDF' }}>
      <Story />
    </nav>
  )],
}

export const Footer: Story = {
  args: { name: 'UPdigital — Universidade do Porto Digital © 2026.', footer: true },
  decorators: [(Story) => (
    <footer className="p-4 bg-black text-white">
      <Story />
    </footer>
  )],
}

export const LogoOnly: Story = {
  args: {},
  decorators: [(Story) => (
    <nav className="p-4 text-white" style={{ backgroundColor: '#009FDF' }}>
      <Story />
    </nav>
  )],
}
