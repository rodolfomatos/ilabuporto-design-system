---
project: "ilabuporto-design-system"
created: 2026-07-01
current_sprint: sprint-01
current_ticket: "T003"
---

# Kanban — ilabuporto-design-system

## Active Sprint — sprint-01

| ID | Title | Status |
|----|-------|--------|
| T001 | Rename package scope and publish to npm | done |
| T002 | Component audit and hardening | done |
| T003 | Layout & branding components (Navbar, Footer, AppShell, Brand, StatCard) | done |
| T005 | Toast / Notification component (Toast, ToastProvider, useToast) | done |

## Backlog

| ID | Title | Priority | Notes |
|----|-------|----------|-------|
| T004 | Unit tests (Vitest/RTL) | high | Coverage >= 80% per VISION. **T005 Toast ships before T004 and is therefore untested** — verified only by `tsc --noEmit`, `npm run build`, runtime export check and CSS emission check. Needs RTL coverage for the auto-dismiss timer and the no-provider fallback. |
| — | CI/CD pipeline (GitHub Actions) | medium | After tests |
| — | Storybook deploy (GitHub Pages) | low | After CI |
| — | Contribution guidelines | low | After publish |