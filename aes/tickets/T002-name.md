---
ticket: T002
title: Component audit and hardening
sprint: sprint-01
priority: high
status: done
created: 2026-07-01
---

# T002 — Component audit and hardening

## Context

Before the first public release, all 14 components need a quality review:
correct dark mode, accessible markup, proper TypeScript types, and no dead code.

## Acceptance Criteria

- [ ] Every component renders correctly in light and dark mode
- [ ] Every component passes basic keyboard navigation
- [ ] All props are correctly typed and documented
- [ ] No console errors in Storybook
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes

## Scope

**In scope:** Visual + accessibility review of all 14 components
**Out of scope:** Writing unit tests, adding new components, refactoring internals.

## Dependencies

- T001 (rename) should be done first to avoid name conflicts during testing

## Rollback

N/A — no code changes unless fixes are needed.

## Known Risks

- Some components may have untested edge cases in dark mode
- ESLint configuration may need tuning for TSX patterns

## Notes

Components to audit: Button, Badge, Card, ConfirmDialog, Input, Select,
Pagination, Sidebar, SlideInPanel, Table, Tabs, Toggle, Modal, and tokens
(colors, typography, spacing).
