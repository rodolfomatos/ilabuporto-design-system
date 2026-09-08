---
ticket: T003
phase: build
status: done
---

# T003 — Build Output (diffstory)

## What changed

| File | Change |
|------|--------|
| `src/assets/logo_updigital_h_black.png` | UPdigital logo copied from pdftools project |
| `src/assets/index.ts` | Generated base64 data URI export `LOGO_UP_DIGITAL` (~9.7KB) |
| `src/components/Brand/Brand.tsx` | Adopted remote `Brand` component; replaced asset-path `src` with bundled data URI (asset path breaks npm consumers) |
| `src/components/Navbar/{Navbar.tsx,index.ts,stories}` | Sticky brand navbar + `LanguageToggle`, `ThemeToggle`, `NavbarMenu` helpers |
| `src/components/Footer/{Footer.tsx,index.ts,stories}` | U.Porto footer with configurable columns |
| `src/components/Sidebar/Sidebar.tsx` | Added `badge` per item; **fixed overlay bug** (`!isOpen && onClose` → `isOpen && onClose`) |
| `src/components/AppShell/{AppShell.tsx,index.ts,stories}` | Admin dashboard layout (sidebar + content + mobile hamburger) |
| `src/components/StatCard/{StatCard.tsx,index.ts,stories}` | KPI card with variants |
| `src/index.ts` | Exports all new components + `LOGO_UP_DIGITAL` + Sidebar types |
| `src/components/Sidebar/index.ts` | Export `SidebarProps`/`SidebarItem` types |
| `package.json` | Build now generates `dist/styles.css` via tailwindcss |
| `.storybook/preview.ts → .tsx` | Fixed pre-existing JSX-in-.ts build failure |
| `README.md` / `DESIGN.md` | New components documented; Tailwind content path corrected to `dist/` |

## Why these files

The user asked the design system to replicate the pdftools project's design
system (navbar/footer with logo, admin CRUD, sidebar, navigation). The audit
showed the DS had only primitives; the branding/layout layer and the logo asset
were absent, and the npm packaging had three showstopper bugs.

## What was intentionally untouched

- Existing 14 primitive components (except Sidebar fixes) — no refactors
- Token system (colors/typography/spacing), cn util, vite/tsc configs
- pdftools repo itself — this work is scoped to the design-system repo only

## Remaining risks

- Brand logo data URI: +9.7KB base64 in the bundle (acceptable; guarantees "works at
  first use" in any bundler). Alternative if needed later: emit PNG + asset
  resolution, at the cost of consumer-side config.
- Framework-agnostic Navbar uses plain `<a href>` and raw `<img>`; consumers in
  Next.js may prefer `next/link` — they can pass custom `logo`/children or use
  the `onClick` handlers on `NavbarLink`.
- T002/T001 were marked done as they were effectively complete (T001 renamed +
  published; T002 hardening = build/lint/typecheck pass).

## Verification

- `npm run build` — passes (JS + d.ts + styles.css)
- `npm run lint` — passes (0 errors)
- `npm run typecheck` — passes (0 errors)
- `npm run build-storybook` — 65 stories built successfully
- All 9 new exports verified present in `dist/index.js`