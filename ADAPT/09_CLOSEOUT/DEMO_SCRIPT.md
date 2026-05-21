# Paggawa v0.1 Demo Script

STATUS: DEMO_SCRIPT_CREATED

Generated: 2026-05-19

## Demo Purpose

This script guides a local walkthrough of the validated Paggawa v0.1 MVP.

The demo should show the full barangay-scale loop:

1. A resident needs skilled work.
2. A job request is visible without exposing private coordination details.
3. A worker discovers and responds to the job.
4. The resident accepts one worker response.
5. Match status becomes visible across the shared product system.
6. Completed work creates a simple review and reputation update.
7. Barangay staff can assist offline users through Paggawa Quest.

This demo does not introduce new application behavior. It uses the validated local prototype and existing mock/local state.

## Demo Scope

Validated surfaces:

- Paggawa Mobile for Resident and Worker flows.
- Paggawa Quest for Barangay Staff assisted-access workflows.

Validated MVP capabilities:

- Resident job posting.
- Worker nearby job browsing.
- Resident nearby worker discovery.
- Barangay-assisted job request creation.
- Barangay quest board visibility.
- Worker registry visibility and assisted worker registration.
- Worker response and resident acceptance.
- Match status tracking.
- Privacy before match.
- Completion and simple reputation update.

## Pre-Demo Setup

From the repository root:

```powershell
cd paggawa-app
$env:Path = 'C:\Program Files\nodejs;' + $env:Path
& 'C:\Program Files\nodejs\npm.cmd' install
& 'C:\Program Files\nodejs\npm.cmd' run dev -- --host 127.0.0.1 --port 5173
```

Open:

```text
http://127.0.0.1:5173/
```

Optional clean-start step:

- Use a fresh browser profile, an incognito window, or clear LocalStorage for `127.0.0.1:5173` before presenting the demo.
- If data from a prior demo remains, explain that the prototype intentionally persists local records through LocalStorage.

## Presenter Framing

Use this short framing before the walkthrough:

```text
Paggawa is a local skills discovery and job-matching prototype.
It helps residents find nearby skilled workers, helps workers discover nearby jobs, and gives barangay staff an assisted-access surface for residents or workers who need offline help.

This v0.1 prototype is intentionally local and client-side. It proves the core workflow, privacy guardrails, and two-surface model before production backend, authentication, payments, GPS, or official LGU integration.
```

## Demo Walkthrough

### 1. Open Paggawa Mobile

Show:

- Paggawa Mobile as the phone/mobile surface.
- Resident and Worker modes under Paggawa Mobile.
- Shared seed data visible in the prototype.

Say:

```text
Paggawa Mobile is for residents and workers. Barangay staff are not treated as a third mobile role; they use a separate Paggawa Quest surface.
```

### 2. Resident Creates Or Reviews A Job Request

In Paggawa Mobile, use the Resident view.

Show:

- Resident dashboard.
- Job request creation.
- Resident job request list.
- Safe job preview fields such as category, approximate area, urgency, and status.

Suggested demo job:

```text
Title: Kitchen sink leak check
Category: Plumbing
Approximate area: Zone 3, San Isidro
Urgency: Soon
```

Say:

```text
The job is discoverable by nearby workers, but exact address and direct contact details are not exposed before a confirmed match.
```

### 3. Worker Finds Nearby Jobs

Switch to Worker mode in Paggawa Mobile.

Show:

- Nearby open jobs.
- The resident-created or seed job.
- Job details with private details hidden.

Say:

```text
Workers can decide whether a job is relevant from safe discovery information. The prototype avoids exact address, phone number, full chat, payment, and GPS behavior.
```

### 4. Worker Responds

Open the job detail and submit a response.

Suggested response:

```text
Message: I can check the leak and bring basic plumbing tools.
Availability: Tomorrow morning
Estimated price: 750
```

Show:

- Response status as sent.
- The job remains privacy-safe before resident acceptance.

Say:

```text
This is the basic matching step: a worker can express interest without turning the app into chat, payment, or negotiation software.
```

### 5. Resident Accepts One Worker

Switch back to Resident mode.

Show:

- Worker response visible for the resident's job.
- Resident accepts one worker response.
- Match status changes to matched.
- Accepted response is distinguished from other responses if present.

Say:

```text
Accepting a response creates the match. Coordination details are represented safely as prototype placeholder information rather than real phone numbers or exact addresses.
```

### 6. Confirm Match Visibility

Show:

- Resident matched job panel.
- Worker matched jobs panel.
- Paggawa Quest quest board matched status, after switching surfaces.

Say:

```text
The same shared state feeds both Paggawa Mobile and Paggawa Quest. Barangay staff can see status, but Quest does not force matches or replace resident choice.
```

### 7. Complete Work And Leave Review

Return to Paggawa Mobile Resident mode.

Show:

- Matched job completion form.
- Rating selection.
- Review comment.

Suggested review:

```text
Rating: 5
Comment: Arrived on time and fixed the leak neatly.
```

Show:

- Completed status.
- Review summary.
- Worker reputation display updated in worker profile or worker cards.

Say:

```text
Reputation stays intentionally simple: completed jobs, rating, reviews, referrals, and complaint indicators. It does not certify worker quality or guarantee outcomes.
```

### 8. Open Paggawa Quest

Switch to Paggawa Quest.

Show:

- Barangay dashboard.
- Quest board.
- Assisted requests.
- Worker registry.
- Basic notes or status controls.

Say:

```text
Paggawa Quest is the barangay hall surface. It helps staff assist residents and workers who may not use the mobile app directly, while still sharing the same local data model.
```

### 9. Barangay-Assisted Request

Create or inspect a barangay-assisted job request.

Show:

- Assisted job request creation.
- The request appears on the quest board.
- The request also becomes visible to workers as a nearby open job.

Say:

```text
This is the assisted-access value: offline or non-tech-literate users can still participate through the barangay surface.
```

### 10. Worker Registry

Show:

- Worker registry in Paggawa Quest.
- Safe worker profile fields.
- Approved trust wording.

Approved trust wording includes:

- Barangay-registered.
- Identity checked.
- Community-referred.
- Completed jobs.
- Rating.
- Reviews.
- Referral count.
- No unresolved complaints.

Say:

```text
Barangay registration means local registration or identity checking. It does not mean the barangay guarantees quality.
```

## Privacy And Scope Callouts

During the demo, explicitly point out:

- Exact resident address is not exposed before match.
- Direct contact details are not exposed before match.
- Discovery uses approximate location, not real GPS tracking.
- Paggawa Quest can assist but does not become official LGU integration.
- No payments, escrow, full chat, backend, production authentication, production database, native mobile build, moderation workflow, or dispute-resolution workflow exists in v0.1.

## Suggested Demo Close

Use this short close:

```text
Paggawa v0.1 proves the core local work loop: residents can post needs, workers can respond, barangay staff can assist offline users, matches can be created, and completed work can improve simple reputation signals.

The next phase is not to add everything at once. The next responsible step is to decide which production risks to tackle first: backend persistence, authentication, privacy hardening, pilot data design, or operational workflows.
```

## Validated Evidence Referenced

- `ADAPT/09_CLOSEOUT/CLOSEOUT_PACKAGE.md`
- `ADAPT/09_CLOSEOUT/MVP_VALIDATION_REPORT.md`
- `ADAPT/05_VALIDATION/LANE-01-VALIDATION-REPORT.md`
- `ADAPT/05_VALIDATION/LANE-02-VALIDATION-REPORT.md`
- `ADAPT/05_VALIDATION/LANE-03-VALIDATION-REPORT.md`
- `ADAPT/05_VALIDATION/LANE-04-VALIDATION-REPORT.md`
- `ADAPT/05_VALIDATION/LANE-05-VALIDATION-REPORT.md`
- `ADAPT/05_VALIDATION/LANE-06-VALIDATION-REPORT.md`

## ADAPT State At Demo Script Creation

```text
currentPhase: DEMO_SCRIPT_CREATED
activeLane: NONE
nextAction: CREATE_RELEASE_SUMMARY
applicationCodeCreated: true
```
