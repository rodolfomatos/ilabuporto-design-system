# Requirements — ilabuporto-design-system

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F1 | Package must be installable via npm | P0 |
| F2 | All components must support dark mode via CSS class | P0 |
| F3 | All components must be accessible (WCAG AA) | P0 |
| F4 | Components must accept standard HTML props | P1 |
| F5 | Components must be tree-shakeable | P1 |
| F6 | Package must ship TypeScript definitions | P1 |
| F7 | Package must ship CSS styles | P1 |

## Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| N1 | Bundle size (individual component) | < 5KB gzipped |
| N2 | Bundle size (full library) | < 30KB gzipped |
| N3 | Time to first paint (consumer app) | no overhead from DS |
| N4 | Test coverage | ≥ 80% |
| N5 | No runtime dependencies beyond React + Tailwind | peer deps only |

## Out of Scope

- Custom build tooling — uses Vite + tsc
- CSS-in-JS — uses Tailwind utility classes
- Server-side rendering utilities — basic React SSR compatible
