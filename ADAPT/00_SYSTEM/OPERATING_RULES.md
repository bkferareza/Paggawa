# ADAPT Operating Rules

## Core Rules

1. Source truth first.
2. No code before Product Brief and App Blueprint.
3. Build one lane at a time.
4. Keep MVP scope small.
5. Prefer one maintainable codebase.
6. Prefer responsive web/PWA surfaces before native mobile; Paggawa Mobile is phone/mobile-first and Paggawa Quest is barangay hall-friendly.
7. Prefer mock/local data before real backend.
8. Every build lane must have validation criteria.
9. Preserve decisions in the Decision Log.
10. Do not expand scope without recording the decision.

---

## v0.1 Non-Goals

Do not implement these in v0.1:

- payments
- escrow
- real GPS tracking
- full chat
- official LGU integration
- complex dispute resolution
- advanced AI matching
- full native mobile application
- production-grade authentication
- production database
- nationwide deployment logic

---

## Privacy and Safety Rules

1. Exact resident address must not be exposed before match.
2. Contact details must not be exposed before confirmed match.
3. Discovery should use approximate location first.
4. Barangay registration must not imply guaranteed work quality.
5. Use wording such as:
   - Barangay-registered
   - Identity checked
   - Community-referred
6. Avoid wording such as:
   - Guaranteed worker
   - Barangay-certified quality
   - Fully verified expert

---

## Build Discipline

Before building a lane, ADAPT must confirm:

- the lane purpose
- required inputs
- intended output
- in-scope items
- out-of-scope items
- validation criteria

Application code must only be generated after the Product Brief, App Blueprint, and lane plan are ready.
