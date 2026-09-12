# Documentation and Comment Conventions

## Documentation

- Put the conclusion or decision first.
- Separate current state, target state and transition plan.
- State non-goals when they prevent plausible scope creep.
- Prefer concrete examples, contracts and file trees over vague principles.
- Keep product truth in `PRODUCT.md`, visual truth in `DESIGN.md`, technical shape in `04-architecture.md`, AI behavior in `05-ai-system.md` and decisions in ADRs.
- Update or supersede stale statements. Do not leave contradictory directions active.
- Do not duplicate a rule across files; link to its source of truth.

## Code comments

Default to no comment. Prefer a better name, smaller function, typed boundary or descriptive test.

A comment is justified only when the constraint cannot be expressed through code, a competent reader might otherwise break it, and it can be stated briefly.

Do not restate code, narrate steps, mark decorative sections or preserve history already available in git.
