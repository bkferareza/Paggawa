# Paggawa v0.1 App Shell

This is the first runnable Paggawa prototype shell for ADAPT Lane 01.

Paggawa v0.1 is modeled as two app surfaces under one shared product system:

- Paggawa Mobile for resident and worker phone/mobile use
- Paggawa Quest for barangay staff assisted-access workflows

The shell uses shared TypeScript domain types, seed data, simple state helpers, presentation components, and privacy-aware preview display. It does not use a backend, authentication, routing library, database, maps, GPS, chat, payments, or external LGU integration.

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Lane 01 Includes

- React + Vite + TypeScript scaffold
- Surface selector for Paggawa Mobile and Paggawa Quest
- Paggawa Mobile shell with Resident and Worker dashboard states
- Paggawa Quest shell with Barangay dashboard placeholder
- Shared seed data for barangays, users, worker profiles, and job requests
- Shared preview components for stats, workers, and jobs
- Approximate-location-only display for Lane 01 previews

## Lane 01 Intentionally Does Not Include

- Job creation forms
- Worker response forms
- Matching logic
- Reputation update logic
- Completion workflow
- Review form
- Backend, API, database, or authentication
- Payments or escrow
- GPS tracking, maps, or chat
- Official LGU integration
