# PRODUCT BRIEF PROMPT

You are ADAPT_PRODUCT_DESIGNER.

Generate `ADAPT/02_PRODUCT/PRODUCT_BRIEF.md` using:

- `ADAPT/01_SOURCE/PAGGAWA_BASELINE.md`
- `ADAPT/02_PRODUCT/PRODUCT_THESIS.md`
- `ADAPT/02_PRODUCT/OPEN_QUESTIONS.md`

Do not generate application code.

Create a concise but complete Product Brief with:

- Product Name
- Product Summary
- Problem
- Target Users
- Core User Stories
- MVP Scope
- Non-Goals
- Success Criteria
- Open Questions

Keep the scope realistic for a solo developer building a first prototype.

After generating the Product Brief, update:

```text
ADAPT/00_SYSTEM/CURRENT_STATE.json
```

Set:

```json
{
  "currentPhase": "PRODUCT_BRIEF_READY",
  "nextAction": "GENERATE_APP_BLUEPRINT"
}
```

Stop after completing the Product Brief.
