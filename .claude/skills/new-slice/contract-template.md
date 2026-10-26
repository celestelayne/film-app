# Contract template

Three sections, one per output file under `docs/slices/<name>/`. Copy each between its `---` markers into the matching file. Keep answers short. Prefer an "Open question" over a guess.

---
# intent.md

## User job
One sentence from the user's point of view: what they're trying to do when they use this slice. If it won't fit in one sentence, the slice is too big — split it.

## Entry point
Where the user comes from and what triggers this slice. Which screen, which control, which URL state.

## What success looks like
Two or three observable outcomes. No "fast", "clean", or other unmeasurables.

## Out of scope
What this slice deliberately does not do. Point to the slice that will cover it, if any.

## Open questions
- 
---
# spec.md

## User-visible behavior
Numbered list of what happens from the user's point of view, in the happy path. Keep failure modes in their own section below.

## Inputs
Every input this slice reads and where it lives (per guardrail #3): URL, browser storage, or component state. One line each. Name the shape.

## Data shape
Which fields of `Film` this slice reads. Any new fields? Any derived values?

## View rules
Grid, list, both, or neither. What changes when the user switches views, if anything.

## Failure
What counts as bad input or an unhappy state, and what the slice does about it (per guardrail #4: fall back to a default, don't crash). Cover: empty result, invalid URL value, corrupt or missing browser storage, anything else that can go wrong.

## Done means
Checklist. Every item is something a human or a test can verify in one pass.
- [ ] 
- [ ] 

## Open questions
- 
---
# plan.md

## Files to add
Path and one-line purpose.

## Files to change
Path, one-line reason, and the slice (if any) that owns the file today.

## Shared-file changes
Every file outside this slice folder that will be touched, and which other slices also touch it. If two slices fight over the same file, flag it here before building.

## Sequence
The order you'd build this in. Thin first; a running UI before a correct one.

## Open questions
- 
---
