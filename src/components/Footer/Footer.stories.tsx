import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {
    columns: [
      {
        key: 'contact',
        title: 'Contact',
        content: (
          <address className="not-italic text-sm space-y-1.5 text-white/70 dark:text-gray-400 leading-relaxed">
            <p>Praça Gomes Teixeira</p>
            <p>4099-002 Porto, Portugal</p>
            <p className="pt-2">
              Email:{' '}
              <a href="mailto:helpdesk@uporto.pt" className="hover:underline underline-offset-2">
                helpdesk@uporto.pt
              </a>
            </p>
          </address>
        ),
      },
      {
        key: 'policies',
        title: 'Policies',
        links: [
          { label: 'Data Protection', href: 'https://www.up.pt/protecao-dados' },
          { label: 'Privacy', href: 'https://www.up.pt/privacidade' },
          { label: 'Whistleblowing', href: 'https://www.up.pt/denuncia' },
        ],
      },
      {
        key: 'about',
        title: 'About',
        links: [
          { label: 'U.Porto', href: 'https://www.up.pt' },
          { label: 'UPdigital', href: 'https://up.pt/updigital' },
          { label: 'Reitoria', href: 'https://reit.up.pt' },
        ],
      },
    ],
  },
  decorators: [(Story) => <div className="min-h-[200px]"><Story /></div>],
}
