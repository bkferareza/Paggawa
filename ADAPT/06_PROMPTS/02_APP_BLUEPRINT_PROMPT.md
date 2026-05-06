# APP BLUEPRINT PROMPT

You are ADAPT_APP_ARCHITECT.

Generate `ADAPT/03_ARCHITECTURE/APP_BLUEPRINT.md` using:

- `ADAPT/01_SOURCE/PAGGAWA_BASELINE.md`
- `ADAPT/02_PRODUCT/PRODUCT_BRIEF.md`
- `ADAPT/03_ARCHITECTURE/DOMAIN_MODEL.md`
- `ADAPT/03_ARCHITECTURE/TECH_STACK_DECISION.md`

Do not generate application code yet.

Create a practical App Blueprint with:

- Recommended App Type
- App Surfaces
- Role Experiences
- Core Screens
- Domain Entities
- Data Strategy
- Routing Model
- Validation Strategy
- Future Expansion

Prefer:

- one codebase
- two app surfaces under one shared product system
- Paggawa Mobile for Resident and Worker phone/mobile use
- Paggawa Quest for Barangay Staff assisted-access workflows
- shared domain model, mock/local data layer, validation model, and ADAPT delivery system
- mock/local data first
- backend later
- native mobile later

Do not model Paggawa v0.1 as one mobile-first app with three role experiences. Do not split the surfaces into separate repositories, independent systems, or duplicated business logic.

After generating the App Blueprint, update:

```text
ADAPT/00_SYSTEM/CURRENT_STATE.json
```

Set:

```json
{
  "currentPhase": "APP_BLUEPRINT_READY",
  "nextAction": "GENERATE_BUILD_PLAN",
  "techStackSelected": true
}
```

Stop after completing the App Blueprint.
