# LANE-01 - App Shell

STATUS: BUILT_PENDING_VALIDATION

## Purpose

Create the initial shared application shell for Paggawa Mobile and Paggawa Quest.

## Required Inputs

- Product Brief
- App Blueprint
- Tech Stack Decision

## Intended Output

A working app shell with:

- basic navigation
- surface switching between Paggawa Mobile and Paggawa Quest
- Paggawa Mobile resident experience entry/dashboard
- Paggawa Mobile worker experience entry/dashboard
- Paggawa Quest workspace/dashboard for barangay staff
- mock data display from the shared mock/local data layer

## In Scope

- app scaffold/layout
- shared product shell/navigation
- surface selector or demo entry
- Paggawa Mobile shell with resident and worker dashboard states
- Paggawa Quest shell/workspace dashboard
- seed data display

## Out of Scope

- real job creation
- real matching
- backend
- authentication
- payments
- native mobile
- separate repositories
- duplicated business logic

## Validation Criteria

- App loads successfully.
- User can switch between Paggawa Mobile and Paggawa Quest.
- In Paggawa Mobile, user can switch between resident and worker experiences.
- Paggawa Mobile Resident dashboard is visible.
- Paggawa Mobile Worker dashboard is visible.
- Paggawa Quest workspace/dashboard is visible.
- Mock data can be displayed from the shared mock/local data layer.
# ADAPT Correction: Lane 01 Two-Surface App Shell

Lane 01 must create only the initial shell for the two Paggawa app surfaces. It must not implement later workflow behavior.

## Lane 01 Scope

Lane 01 may create:

- Initial app scaffold.
- Surface selector or landing shell.
- Paggawa Mobile shell.
- Resident dashboard placeholder.
- Worker dashboard placeholder.
- Paggawa Quest shell.
- Barangay dashboard placeholder.
- Shared navigation/shell components.
- Seed data display.

Lane 01 must not create:

- Job creation forms.
- Worker response forms.
- Matching logic.
- Reputation logic.
- Backend.
- Auth.
- Payments.
- GPS.
- Chat.

## Validation Criteria

- App loads successfully.
- User can enter Paggawa Mobile.
- User can switch between Resident and Worker mobile views.
- User can enter Paggawa Quest.
- Barangay dashboard placeholder is visible.
- Shared seed data can be displayed across both surfaces.
- No job creation, matching, reputation, backend, auth, payments, GPS, or chat exists.

This correction supersedes any earlier Lane 01 scope that treats Resident, Worker, and Barangay Staff as three equal mobile role experiences.
