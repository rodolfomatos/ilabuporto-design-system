# ilabuporto-design-system

Design system component library for U.Porto digital services. Framework-agnostic
React components built with TypeScript and Tailwind CSS 3 — installable from npm
and consumable in any React app (Next.js, Vite, CRA).

## Quick Start

```bash
npm install @ilabuporto/design-system
```

```tsx
import { Button, Badge, Card, Navbar, Footer } from '@ilabuporto/design-system'
import '@ilabuporto/design-system/styles.css'
```

## Tailwind Integration

The library ships precompiled CSS. Add `styles.css` to your app entry point (see
above) — no Tailwind config changes required.

If you use Tailwind JIT with custom config, also add the package to your
`content` array so dynamic class names from the library are purged correctly:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ilabuporto/design-system/dist/**/*.{js,jsx}',
  ],
}
```

## Design Tokens

The full token reference lives in [DESIGN.md](./DESIGN.md). Colour tokens are
exported as `colors`:

```tsx
import { colors } from '@ilabuporto/design-system'
```

- `brand` (`#009FDF`) — the **U.Porto institutional blue**. Use it for
  institutional actions and primary emphasis.
- `accent` (`#22c55e`) — a **generic, optional** green. It is **not part of the
  U.Porto institutional palette** and is not consumed by any component in this
  library. Use it only where a neutral positive accent is genuinely needed; if
  you are styling an institutional action, use `brand`, not `accent`.
- `destructive` (`#ef4444`), `warning` (`#eab308`), `info` (`#3b82f6`) — semantic
  status colours.

## Components

| Component | Description |
|-----------|-------------|
| Button | 4 variants (primary, secondary, destructive, ghost), 3 sizes, loading |
| Badge | Status indicator (success, error, warning, info, neutral) |
| Card | Content container with variant border colors |
| ConfirmDialog | Confirmation modal (danger, warning, info) |
| Input | Form input with label and error state |
| Select | Form select with label and error state |
| Modal | Animated overlay dialog |
| Pagination | Page navigation for data tables |
| Sidebar | Responsive navigation sidebar with badge support and mobile overlay |
| SlideInPanel | Right-side slide-in panel |
| Table | Generic data table with sorting and row click |
| Tabs | Tab navigation with underline indicator |
| Toggle | Switch toggle with label |
| Brand | UPdigital brand (bundled logo data URI + name separator, navbar/footer) |
| Navbar | Sticky brand navbar (logo, title, language/theme toggles, user menu) |
| Footer | U.Porto footer (logo, contact, policies, about columns) |
| AppShell | Admin dashboard layout (sidebar + content + mobile hamburger) |
| StatCard | KPI card (label + value with variant colors) |

## Dark Mode

Dark mode is class-based. Toggle the `dark` class on the root element:

```tsx
document.documentElement.classList.toggle('dark', isDark)
```

## Documentation

- [Design Tokens](./DESIGN.md) — Colors, typography, spacing, and component API
- [Storybook](./.storybook) — Interactive component browser (run `npm run storybook`)

## License

MIT