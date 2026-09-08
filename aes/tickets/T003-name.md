---
ticket: T003
title: Layout & branding components (Navbar, Footer, AppShell, Brand, StatCard)
sprint: sprint-01
priority: high
status: done
created: 2026-09-08
---

# T003 — Layout & branding components

## Context

The design system shipped only 14 primitive components. Consumers replicating
the iLab/UPdigital look (navbar with logo, footer, admin dashboard layout) had
to reimplement them from scratch, and the branding logo itself was missing —
breaking "at first use" for every project (broken `styles.css` export, missing
logo asset, Tailwind content path pointing to unpublished `src/`).

## Acceptance Criteria

- [x] Logo component with bundled UPdigital PNG (base64 data URI)
- [x] Framework-agnostic Navbar (logo, title, LanguageToggle, ThemeToggle, NavbarMenu)
- [x] Framework-agnostic Footer (logo + configurable columns)
- [x] AppShell admin layout (responsive sidebar + content + mobile hamburger)
- [x] Sidebar upgraded: badge support + overlay bug fixed
- [x] StatCard (KPI) with variants
- [x] `dist/styles.css` generated in build (export was pointing to a missing file)
- [x] Tailwind content docs point to `dist/` (not unpublished `src/`)
- [x] Storybook preview.ts JSX-in-.ts bug fixed (rename to .tsx)
- [x] README.md and DESIGN.md updated
- [x] `npm run build`, `npm run lint`, `npm run typecheck`, `build-storybook` pass

## Scope

**In scope:** New layout/branding components, Sidebar fixes, packaging fixes, docs.
**Out of scope:** Unit tests (see roadmap), CI/CD, publishing to npm.

## Dependencies

- React 18, Tailwind 3 peer deps (unchanged)

## Rollback

Revert commit + `npm run build`; the previous dist had no new components.

## Known Risks

- Components are framework-agnostic by design; consumers needing next/link or
  next-i18next wire them via props/children (see Navbar stories).

## Notes

Replicates the design system patterns from the PDVTools project
(https://github.com/rodolfomatos/pdftools) — logo, navbar, footer, admin CRUD
shell, KPI cards. Three pre-existing defects in the repo were fixed in this
ticket: missing `dist/styles.css`, Tailwind content path to unpublished `src/`,
and JSX in `.storybook/preview.ts` (renamed to `.tsx`).