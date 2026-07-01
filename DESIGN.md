---
colors:
  brand: '#009FDF'
  surface:
    light:
      background: '#ffffff'
      surface: '#f5f5f5'
      border: '#e5e5e5'
      text: '#171717'
      muted: '#737373'
    dark:
      background: '#0a0a0a'
      surface: '#171717'
      border: '#262626'
      text: '#fafafa'
      muted: '#737373'
  accent: '#22c55e'
  destructive: '#ef4444'
  warning: '#eab308'
  info: '#3b82f6'
  brandScale:
    50: '#e0f7ff'
    100: '#b3ecff'
    200: '#80dfff'
    300: '#4dd2ff'
    400: '#26c6ff'
    500: '#009FDF'
    600: '#0082b3'
    700: '#006688'
    800: '#004a5e'
    900: '#002e3b'
typography:
  fontFamily:
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
    mono: ['"SF Mono"', '"Fira Code"', 'monospace']
  fontSize:
    display: 32px
    h1: 24px
    h2: 20px
    body: 14px
    small: 12px
    mono: 13px
  fontWeight:
    display: 700
    h1: 600
    h2: 600
    body: 400
    small: 400
spacing:
  unit: 4
  scale: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64]
borderRadius:
  DEFAULT: 8px
darkMode: class
components:
  Button:
    description: Versatile action button with 4 variants and 3 sizes
    props:
      variant: [primary, secondary, destructive, ghost]
      size: [sm, md, lg]
      loading: boolean
  Badge:
    description: Status indicator label
    props:
      variant: [success, error, warning, info, neutral]
  Card:
    description: Content container with optional border color
    props:
      variant: [default, success, error, warning]
  Modal:
    description: Overlay dialog with fade animation
    props:
      isOpen: boolean
      onClose: function
      title: string
  ConfirmDialog:
    description: Confirmation modal with action variants
    props:
      variant: [danger, warning, info]
  Input:
    description: Form input with label and error state
    props:
      label: string
      error: string
  Select:
    description: Form select with label and error state
    props:
      label: string
      error: string
  Pagination:
    description: Page navigation for data tables
    props:
      page: number
      total: number
      limit: number
      onPageChange: function
  Sidebar:
    description: Navigation sidebar with responsive mobile overlay
    props:
      items: array
      activeKey: string
      onSelect: function
      header: node
  SlideInPanel:
    description: Right-side slide-in panel
    props:
      isOpen: boolean
      onClose: function
      title: string
  Table:
    description: Generic data table with sorting and row click
    props:
      columns: array
      data: array
      onRowClick: function
      sortable: boolean
    generic: true
  Tabs:
    description: Tab navigation with underline indicator
    props:
      tabs: array
      activeKey: string
      onChange: function
  Toggle:
    description: Switch toggle with label
    props:
      enabled: boolean
      onChange: function
      label: string
      disabled: boolean
do:
  - Use the defined colour palette consistently
  - Follow the 4px spacing system
  - Use Inter font for all text
  - Provide adequate touch targets (min 44x44px)
  - Ensure sufficient colour contrast (WCAG AA minimum)
  - Use semantic HTML elements
  - Use Tailwind `dark:` variants for all colour decisions
dont:
  - Use colours outside the defined palette
  - Use emojis in source code (use inline SVGs instead)
  - Create touch targets smaller than 44x44px
  - Ignore dark mode contrast requirements
  - Use non-semantic divs when semantic elements exist
breakingChanges:
  - none: first release
---

# @ilabuporto/design-system

Design system for U.Porto digital services. Built with React 18, TypeScript, and Tailwind CSS 3.

## Principles

1. **Accessibility first** — WCAG AA minimum for all components
2. **Dark mode by default** — `class`-based dark mode with light as alternative
3. **Consistent spacing** — 4px unit system across all components
4. **Minimal dependencies** — Only React, Tailwind CSS, and classname utility (`cn`)

## Usage

```bash
npm install @ilabuporto/design-system
```

```tsx
import { Button, colors } from '@ilabuporto/design-system'
import '@ilabuporto/design-system/styles.css'

function App() {
  return <Button variant="primary" size="md">Submit</Button>
}
```

## Tailwind Integration

Add this package's source to your Tailwind `content` array:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@ilabuporto/design-system/src/**/*.{ts,tsx}',
  ],
}
```

## Components

| Component | Variants | Status |
|-----------|----------|--------|
| Button | primary, secondary, destructive, ghost | stable |
| Badge | success, error, warning, info, neutral | stable |
| Card | default, success, error, warning | stable |
| ConfirmDialog | danger, warning, info | stable |
| Input | label, error states | stable |
| Select | label, error states | stable |
| Modal | animated overlay | stable |
| Pagination | controlled page/total/limit | stable |
| Sidebar | responsive, mobile overlay | stable |
| SlideInPanel | right-side panel | stable |
| Table | generic, sortable, row click | stable |
| Tabs | underline indicator | stable |
| Toggle | switch with label | stable |

## Development

```bash
npm install
npm run dev          # Build in watch mode
npm run storybook    # Component browser
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
```
