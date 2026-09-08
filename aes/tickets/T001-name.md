---
ticket: T001
title: Rename package scope and publish to npm
sprint: sprint-01
priority: high
status: pending
created: 2026-07-01
---

# T001 — Rename package scope and publish to npm

## Context

The package is currently named `@ilabuporto/design-system`, but the scope
`@ilabuporto` does not exist on npmjs.org. On npm, scopes correspond to
organizations — creating one requires an npm paid team plan.

To publish immediately (and avoid ongoing org fees), we will rename to an
unscoped package: `ilabuporto-design-system`. This is a standard convention
for org-scoped libraries that don't need a private scope.

## Acceptance Criteria

- [ ] Package.json `name` changed to `ilabuporto-design-system`
- [ ] All references to `@ilabuporto/design-system` updated across codebase
- [ ] `npm run build` succeeds
- [ ] `npm publish` succeeds at version `0.1.0`
- [ ] Package can be installed from npm in a test project
- [ ] Tailwind integration docs updated (content path changed)
- [ ] README updated

## Scope

**In scope:** Renaming the package, updating all references, publishing.
**Out of scope:** CI/CD, tests, component changes, Storybook deploy.

## Dependencies

- npm account must be logged in (`npm whoami`)
- User must be able to publish public packages

## Rollback

`npm unpublish ilabuporto-design-system@0.1.0` if something goes wrong
within 72h. This is the first publish so no consumers exist yet.

## Known Risks

- Existing projects already installing from local tarball will need to update
  their import path.
- The package name change may affect import examples in Storybook/docs.

## Notes

After renaming, the Tailwind content path in consumer projects changes from:
`'./node_modules/@ilabuporto/design-system/src/**/*.{ts,tsx}'`
to:
`'./node_modules/ilabuporto-design-system/src/**/*.{ts,tsx}'`
