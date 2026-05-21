# ADAPT Operating Roadmap

STATUS: PLANNING_ARTIFACT

This roadmap describes how ADAPT should evolve around Paggawa. It does not change current execution state, advance lanes, validate Lane 05, build Lane 06, or create ACTION_PROMPT.

## Current ADAPT Status

ADAPT is already being used manually through:

- Source baseline.
- Product brief.
- App blueprint.
- Build plan.
- Lane execution.
- Validation reports.
- Decision log.

## Current Operating Mode

```text
Manual ADAPT orchestration
```

Meaning:

- Human asks for lane prompt.
- Builder executes one lane.
- Validator validates one lane.
- ADAPT state advances only after validation.

## Why ACTION_PROMPT Is Deferred

ACTION_PROMPT should be created after Lane 06 is validated.

This allows the first full MVP cycle to establish the real working pattern before ADAPT formalizes a reusable action prompt. Creating ACTION_PROMPT too early may make it too abstract, because the actual lane-build-validation rhythm is still being proven.

## When ACTION_PROMPT Should Be Created

Trigger:

```text
After LANE_06_VALIDATED
```

## Future ADAPT Prompt Set

- ACTION_PROMPT.md
- ROADMAP_PROMPT.md
- VALIDATION_PROMPT.md
- CORRECTION_PROMPT.md
- RELEASE_SUMMARY_PROMPT.md
- DEMO_PACKAGE_PROMPT.md

## ADAPT v0.1 Closeout

After Lane 06 validation, ADAPT should produce:

- MVP validation report.
- Demo script.
- Product roadmap update.
- Technical roadmap update.
- ADAPT action prompt.
- Git push/checkpoint summary.
