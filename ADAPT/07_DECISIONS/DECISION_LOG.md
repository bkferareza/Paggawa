# Decision Log

| Date | Decision | Reason | Status |
|---|---|---|---|
| Bootstrap | Initialize ADAPT Create workspace before generating application code | Preserve source truth and prevent unbounded app generation | ACTIVE |
| 2026-05-07 | Paggawa v0.1 will start as one mobile-first web/PWA codebase with role-based views and mock/local data before backend or native mobile. | This kept the prototype maintainable, but it collapsed the barangay surface into a three-role app model. | SUPERSEDED |
| 2026-05-07 | Paggawa v0.1 is modeled as two app surfaces: Paggawa Mobile for Resident and Worker phone/mobile use, and Paggawa Quest for Barangay Staff assisted-access workflows. | Corrects the product model before Lane 01 while preserving one workspace, one shared domain model, one shared mock/local data layer, one shared validation model, and one ADAPT delivery system. | ACTIVE |
# Decision: Two App Surfaces for Paggawa v0.1

Decision: Paggawa v0.1 will model two app surfaces: Paggawa Mobile for residents/workers and Paggawa Quest for barangay-assisted workflows.

Reason: The mobile discovery experience and barangay quest-board experience have different UX needs, but should share one domain model and local data layer for maintainability.

Status: ACTIVE
