# Tech Stack Decision

STATUS: RECOMMENDED_NOT_FINAL

## Recommended Starting Direction

For v0.1, Paggawa should start as two web/PWA app surfaces under one shared product system.

Recommended candidate stack:

- React
- Vite
- TypeScript
- Tailwind or simple CSS
- Mock data / LocalStorage first

Surface targets:

- Paggawa Mobile: phone/mobile-first surface for residents and workers.
- Paggawa Quest: barangay hall-friendly surface for barangay staff assisted-access workflows. It may be tablet-friendly, kiosk-friendly, laptop-friendly, or desktop-friendly.

---

## Reason

This is the easiest and most maintainable approach for a solo developer using VS Code on a personal PC.

The surfaces should share one workspace, one domain model, one mock/local data layer, and one validation model. They should not become separate repositories or duplicated business logic.

It avoids early complexity from:

- native Android setup
- native iOS setup
- app signing
- backend infrastructure
- authentication servers
- real database setup
- app store deployment

---

## Backend Position

Backend should be introduced later only after the core product loop is proven.

---

## Native Mobile Position

Native mobile should be introduced later only after product validation.

The first objective is to prove the product flow, not to build a production-grade mobile platform.
