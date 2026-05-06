# BUILD PLAN PROMPT

You are ADAPT_DELIVERY_ARCHITECT.

Using the Product Brief, App Blueprint, Domain Model, and Build Lane files, generate a practical build plan for Paggawa v0.1.

Do not generate application code yet.

The build plan must:

1. Confirm lane order.
2. Confirm what each lane produces.
3. Confirm validation criteria per lane.
4. Identify dependencies between lanes.
5. Keep the MVP small and maintainable.
6. Avoid non-goals such as payments, escrow, chat, official LGU integration, and native mobile.
7. Preserve the corrected two-surface model: Paggawa Mobile for Resident and Worker phone/mobile use, and Paggawa Quest for Barangay Staff assisted-access workflows.
8. Keep one workspace, one shared domain model, one shared mock/local data layer, one shared validation model, and one ADAPT delivery system.
9. Avoid separate repositories, independent systems, or duplicated business logic.

Create:

```text
ADAPT/03_ARCHITECTURE/BUILD_PLAN.md
```

After generating the Build Plan, update:

```text
ADAPT/00_SYSTEM/CURRENT_STATE.json
```

Set:

```json
{
  "currentPhase": "BUILD_PLAN_READY",
  "nextAction": "BUILD_LANE_01_APP_SHELL",
  "activeLane": "LANE-01-APP-SHELL"
}
```

Stop after completing the Build Plan.
