# Technical Roadmap

STATUS: PLANNING_ARTIFACT

This roadmap is a planning artifact for the Paggawa application. It does not authorize backend work, dependency changes, future-lane behavior, or application source-code changes.

## Current Stack

- React
- Vite
- TypeScript
- Simple CSS
- LocalStorage
- Mock/seed data
- No backend
- No auth
- No native mobile

## Near-Term Technical Priorities

- Finish Lane 05 validation.
- Build Lane 06.
- Complete full MVP smoke test.
- Keep Mobile and Quest surfaces separate.
- Keep shared domain/state/data centralized.
- Prevent scope creep.

## Engineering Discipline

- Use TypeScript domain models for core entities and workflow state.
- Keep components small and focused on one surface or shared responsibility.
- Preserve shared domain/state/data separation.
- Continue build validation per lane.
- Continue browser validation per lane.
- Do not introduce future-lane behavior early.
- Avoid unnecessary dependencies.
- Do not add a backend until explicitly approved.

## Testing Roadmap

For v0.1, keep build validation and browser validation as the primary validation method.

After v0.1, add unit tests for:

- Job creation.
- Privacy display rules.
- Response/match logic.
- Reputation calculation.
- LocalStorage persistence helpers.

Do not add tests yet unless explicitly approved.

## Backend Readiness

Before adding a backend, Paggawa needs:

- Stable domain model.
- Stable workflows.
- Clarified privacy model.
- Clarified exact address/contact unlock rules.
- Clarified auth roles.
- Clarified storage model.

Backend work should replace the local persistence layer only after the core prototype loop is stable and validated.

## Dependency Hygiene

- Track npm audit findings, but do not automatically fix them during active lane execution.
- Avoid dependency changes unless required for approved lane scope or validation.
- Treat dependency upgrades as their own deliberate change when possible.
