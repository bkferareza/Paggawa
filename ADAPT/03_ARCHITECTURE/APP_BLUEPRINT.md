# App Blueprint

STATUS: APP_BLUEPRINT_READY

## 1. Recommended App Type

Paggawa v0.1 should be modeled as two web/PWA app surfaces under one shared product system.

### Paggawa Mobile

Paggawa Mobile is intended for phone/mobile use.

It serves:

- Resident experience
- Worker experience

### Paggawa Quest

Paggawa Quest is intended for barangay hall use.

It serves:

- Barangay Staff assisted-access workflows

Paggawa Quest may be tablet-friendly, kiosk-friendly, laptop-friendly, or desktop-friendly.

The two surfaces must remain part of one maintainable prototype:

- one workspace
- one shared domain model
- one shared mock/local data layer
- one shared validation model
- one ADAPT delivery system

Do not create separate repositories, independent systems, duplicated business logic, or separate data models for v0.1.

Recommended prototype direction:

- React
- Vite
- TypeScript
- Tailwind or simple CSS
- Mock data and LocalStorage first

This is a prototype stack decision, not a production platform decision.

## 2. Architecture Summary

The first architecture should be a small client-side product system organized around two UI/application surfaces and shared product logic.

The surface boundary is conceptual and structural:

- `Paggawa Mobile` owns resident and worker mobile screens.
- `Paggawa Quest` owns barangay staff assisted-access screens.
- Shared modules own domain types, seed data, validation helpers, privacy rules, mock persistence, and derived view data.

The prototype should demonstrate the local work loop:

1. A job request is created by a resident in Paggawa Mobile or by barangay staff in Paggawa Quest.
2. Workers discover nearby open jobs in Paggawa Mobile.
3. Residents discover nearby workers in Paggawa Mobile.
4. Workers respond to jobs in Paggawa Mobile.
5. Residents accept a response and create a match in Paggawa Mobile.
6. Contact/address details unlock only after the confirmed match.
7. Completed jobs update basic worker reputation.
8. Barangay staff can support offline users through Paggawa Quest.

All v0.1 behavior should run locally with seed data and local persistence. No backend, production authentication, API, database, payments, escrow, GPS tracking, full chat, official LGU integration, or native mobile build should be introduced yet.

## 3. Surface Experiences

### Paggawa Mobile - Resident

Residents should be able to:

- create a job request
- view their own job requests
- browse nearby workers
- view worker profiles
- review worker responses
- accept one worker response
- mark matched work as completed
- leave a simple rating/review

### Paggawa Mobile - Worker

Workers should be able to:

- view nearby open jobs
- inspect job details with private fields hidden before match
- respond to a job
- view their own worker profile
- see reputation signals such as completed jobs and rating

### Paggawa Quest - Barangay Staff

Barangay staff should be able to:

- create assisted job requests for residents
- register or view workers
- view a local quest board of open jobs
- update basic job status
- record simple feedback or complaint notes as placeholders

Barangay staff act as an access bridge and local trust anchor, not a guarantor of work quality.

## 4. Core Screens

### Shared Product Shell

- Surface Selector / Demo Entry
- Shared seed data status
- Shared privacy/trust guardrail indicators where useful

### Paggawa Mobile

- Mobile Home / Mode Selector
- Resident Dashboard
- Create Job Request
- Resident Job Requests
- Nearby Workers
- Worker Profile
- Worker Dashboard
- Nearby Jobs
- Job Detail
- Worker Response Form
- Match / Accepted Worker View
- Completion and Review

### Paggawa Quest

- Quest Workspace
- Assisted Job Request Form
- Worker Registry
- Worker Registration Form
- Barangay Quest Board
- Basic Status / Notes View

These screens may start as simple in-app views. Full routing can be added only as needed for clarity.

## 5. Routing Model

Use a simple surface-based routing model inside one application workspace.

Suggested screen paths or route keys:

- `/` - surface selector or demo entry
- `/mobile` - Paggawa Mobile home or default mobile dashboard
- `/mobile/resident` - resident dashboard
- `/mobile/resident/jobs` - resident job requests
- `/mobile/resident/jobs/new` - create resident job request
- `/mobile/resident/workers` - nearby workers
- `/mobile/resident/workers/:workerId` - worker profile
- `/mobile/worker` - worker dashboard
- `/mobile/worker/jobs` - nearby jobs
- `/mobile/worker/jobs/:jobId` - job detail and response
- `/mobile/worker/profile` - worker profile/reputation
- `/quest` - Paggawa Quest workspace
- `/quest/quests` - barangay quest board
- `/quest/jobs/new` - assisted job request
- `/quest/workers` - worker registry
- `/quest/workers/new` - worker registration
- `/quest/notes` - basic status and notes view

For the first lane, these can be represented by view state before adding a routing library.

## 6. Core Domain Entities

Use the lightweight domain model already defined for ADAPT:

- User: a person using the app with a role such as resident, worker, or barangay_staff.
- WorkerProfile: public/service profile for skills, service area, trust signals, and reputation.
- JobRequest: a request for skilled work created by a resident or by barangay staff on behalf of a resident.
- JobResponse: a worker response with availability, note, and optional estimated price.
- Match: the accepted connection between a job request and one worker.
- Barangay: the local community unit used for assisted access and quest board grouping.
- Review: post-completion rating and feedback.
- ComplaintNote: basic concern record, not a full dispute-resolution system.

## 7. Data Strategy

Start with seed data and local persistence shared by both app surfaces.

Recommended v0.1 data approach:

- Seed a small barangay-scale dataset for residents, workers, jobs, responses, matches, and reviews.
- Store created or changed records in LocalStorage.
- Use stable IDs for mock records so flows are easy to validate.
- Keep all data client-side until the product loop is proven.
- Avoid backend schemas, API contracts, production databases, and authentication infrastructure in v0.1.

The data model should still be shaped cleanly enough that a backend can replace LocalStorage later.

## 8. State Management Strategy

Use simple client-side state for the first prototype.

Recommended approach:

- Keep selected surface, selected mobile mode, active screen, filters, and form drafts in local UI state.
- Keep jobs, workers, responses, matches, reviews, and notes in one small app-level store.
- Persist meaningful prototype data to LocalStorage.
- Derive dashboard counts, nearby lists, quest board items, and reputation summaries from the stored records.
- Keep business rules and validation shared rather than duplicated inside surface-specific screens.

Do not introduce a complex state library until the app becomes large enough to need it.

## 9. Location / Radius Strategy

Use approximate, mock location for v0.1.

The prototype should represent location with simple fields such as:

- barangay
- area label or zone
- approximate distance in kilometers
- service radius

Discovery should be radius-based but not GPS-based. A seed demo radius such as 3 km can be used for the prototype, but the final default radius remains a product decision.

Exact resident address must be stored separately from discovery fields and must not appear in public job browsing or quest board views before match.

## 10. Privacy Strategy

Privacy must be designed into the display rules.

Before confirmed match:

- show approximate location only
- hide exact address
- hide phone number and direct contact details
- show enough job detail for workers to decide whether to respond

After confirmed match:

- unlock coordination details only for the matched resident and worker
- keep non-matched workers restricted to approximate information
- keep quest board views focused on status, category, and approximate area

Barangay staff may record assisted details when helping residents, but public discovery views must still hide exact address and contact details before match.

## 11. Trust Signal Strategy

Trust signals must help users without overclaiming quality.

Allowed labels:

- Barangay-registered
- Identity checked
- Community-referred
- Completed jobs
- Rating
- Reviews
- Referral count
- No unresolved complaints

Avoid labels or copy that imply guaranteed skill or official quality certification.

Barangay-registered means locally registered or identity-checked only. It does not mean the barangay guarantees work quality.

## 12. Validation Strategy

Validation should follow the ADAPT build lanes.

Each lane must prove only its own behavior:

- App Shell: app loads, surface switching works, Paggawa Mobile resident and worker dashboards are visible, Paggawa Quest workspace is visible, and mock data displays.
- Job Requests: residents in Paggawa Mobile and barangay staff in Paggawa Quest can create jobs, and created jobs appear in relevant views.
- Worker Discovery: residents in Paggawa Mobile can browse workers and view trust/reputation details.
- Barangay Quest Board: barangay staff in Paggawa Quest can view open jobs, assisted requests, and worker registry.
- Matching: workers can respond, residents can accept, status changes to matched, and privacy before match is preserved.
- Reputation: matched work can be completed and worker reputation updates.

Smoke testing should verify the full MVP loop only after the relevant lanes exist.

## 13. Future Expansion Path

After v0.1 proves the core loop, future expansion can consider:

- real backend and database
- production authentication
- better location services
- richer notifications
- safer messaging or structured coordination
- moderation and dispute workflows
- worker onboarding improvements
- barangay reporting tools
- native mobile applications
- payment or escrow exploration
- official LGU integration

These are future items and should not be built into the first prototype.
# ADAPT Correction: Two App Surfaces

Paggawa v0.1 has two app surfaces under one shared product system:

1. Paggawa Mobile
   - Resident experience
   - Worker experience
   - Optimized for phone/mobile usage

2. Paggawa Quest
   - Barangay Staff experience
   - Optimized for barangay hall assisted-access workflows
   - Tablet/kiosk/desktop-friendly

Both app surfaces share the same domain model, mock data, local persistence strategy, privacy rules, trust signal rules, and validation model.

Barangay Staff belongs to Paggawa Quest. It should not be treated as a third equal mobile role in Paggawa Mobile.

This correction supersedes any earlier single-surface or three-equal-role language in this document.
