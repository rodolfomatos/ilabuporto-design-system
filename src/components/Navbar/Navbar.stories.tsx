import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Navbar, LanguageToggle, ThemeToggle, NavbarMenu } from './Navbar'
import type { NavbarLink } from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Navbar>

const links: NavbarLink[] = [
  { key: 'profile', label: 'Profile', href: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { key: 'procedure', label: 'Procedure', href: '/procedure', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key: 'developer', label: 'Developer', href: '/developer', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { key: 'admin', label: 'Admin', href: '/admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

export const Default: Story = {
  args: { title: 'PDF Tools' },
}

export const WithControls: Story = {
  args: { title: 'PDF Tools' },
  render: (args) => <NavbarControls {...(args as Story['args'])} />,
}

function NavbarControls(props: Story['args']) {
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <Navbar {...props}>
      <LanguageToggle
        current={lang}
        onChange={(c) => setLang(c as 'pt' | 'en')}
        options={[
          { code: 'pt', label: 'PT' },
          { code: 'en', label: 'EN' },
        ]}
      />
      <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} title="Toggle theme" />
      <NavbarMenu items={links} isOpen={open} onToggle={() => setOpen(!open)} />
    </Navbar>
  )
}
