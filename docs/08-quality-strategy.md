# 08 — Quality Strategy

## Principle

Test behaviour at the cheapest layer that provides confidence. Most tests live below E2E; real boundaries are exercised with real infrastructure.

## Testing pyramid and tools

| Level | Tools | Protects |
| --- | --- | --- |
| Domain unit | xUnit, FluentAssertions | Invariants, policies, value objects, ranking maths |
| Application unit | xUnit, NSubstitute | Command/query orchestration and failure paths |
| Angular unit/component | Vitest, Angular Testing Library | Signals, rendering, interaction and accessible behaviour |
| Backend integration | WebApplicationFactory, Testcontainers, PostgreSQL/pgvector | HTTP pipeline, EF mappings, migrations, FTS and vector queries |
| Contract | OpenAPI snapshot/diff, generated TypeScript client | Angular ↔ API compatibility |
| End-to-end | Playwright | Critical user journeys only |
| AI evaluations | Versioned dataset and dedicated .NET runner | Retrieval, fusion, reranking and grounded generation |

## Tooling baseline

### Angular 22

- Vitest as the test runner.
- Angular Testing Library for behaviour-first component tests.
- Playwright for E2E and accessibility smoke checks.
- Angular ESLint, Prettier and TypeScript strict mode.
- Avoid shallow tests coupled to component internals.

### ASP.NET Core

- xUnit for unit and integration suites.
- FluentAssertions for readable outcomes.
- NSubstitute only at real ports; do not mock domain objects or EF queries.
- `WebApplicationFactory` for the real ASP.NET pipeline.
- Testcontainers with the same PostgreSQL extensions used in production.
- `dotnet format`, .NET analyzers, nullable enabled and warnings treated as errors.

### System quality

- OpenAPI generation and breaking-change detection.
- Dependabot/Renovate or equivalent dependency updates.
- Dependency and container vulnerability scanning in CI.
- OpenTelemetry for traces, metrics and structured logs.

## Test placement

```text
apps/web/src/app/features/**/__tests__/
apps/web/e2e/
services/api/tests/Unit/
services/api/tests/Integration/
tests/contracts/
tests/evals/
```

Follow the repository's actual conventions if the framework scaffolding establishes a different colocated layout.

## Required scenarios

- happy path and validation failures;
- empty, loading, error and success UI states;
- authorization and ownership;
- concurrency, retries and idempotency where applicable;
- real migrations and database constraints;
- keyboard navigation and accessible names;
- AI output validation, missing evidence and provider failure;
- regression test for every fixed defect with meaningful recurrence risk.

## AI quality gates

| Gate | Default policy |
| --- | --- |
| Ingestion normalisation/chunking | Deterministic and blocking |
| Retrieval Recall@K / MRR | Blocking against committed thresholds |
| RRF/reranker comparison | Report regression; block beyond agreed tolerance |
| Grounding/citations | Blocking on deterministic fixtures where possible |
| Live model quality | Scheduled/manual unless provider is deterministic and affordable |

Thresholds belong beside the eval dataset and must be based on a recorded baseline, not invented aspirational numbers.

## CI quality gates

```text
Frontend:
npm ci
npm run format:check
npm run lint
npm run test -- --run
npm run build

Backend:
dotnet restore
dotnet format --verify-no-changes
dotnet build --no-restore
dotnet test --no-build

System:
OpenAPI generation + diff
integration tests with Testcontainers
deterministic retrieval evals
Playwright critical-path suite
```

Adapt script names to the repository, then replace this block. Do not leave fictional commands in an active project.

## Definition of Done

- [ ] Acceptance criteria have test or review evidence.
- [ ] Applicable format, lint, build and test gates pass.
- [ ] Integration tests exercise every changed external/persistence boundary.
- [ ] OpenAPI and generated client are in sync.
- [ ] Retrieval/eval baselines do not regress beyond the agreed tolerance.
- [ ] Accessibility states and keyboard flow were checked for UI changes.
- [ ] Security, ownership, observability and failure behaviour were reviewed.
- [ ] Documentation represents the resulting system.
- [ ] Any unexecuted check or remaining risk is explicit.



## Definition of Ready — blocking SDD gate

A block may start only when:

- Its outcome, included/excluded scope and dependencies are explicit.
- Required product/domain decisions are resolved in the source-of-truth documents.
- Acceptance criteria cover successful behaviour and relevant boundaries/failures.
- Contracts and data invariants needed by the slice are specified.
- Verification approach, fixtures and applicable checks are identified.
- No placeholder or unresolved question remains on the block's critical path.

Record readiness evidence in `10-roadmap.md`. If any required decision is unresolved, mark that block **Blocked**, list the missing decision, target document and unblock condition. Do not invent answers or silently skip gates. Unrelated ready blocks may proceed. Implementation changes to specified behaviour require updating the specification first.

## Mandatory campaign-isolation evidence

Use at least two campaigns with overlapping NPC names. Test retrieval/citations, invalid cross-campaign references and ingestion/reindex/removal boundaries against real persistence. Test cache isolation if caching is implemented. No user/account scaffolding is needed for these checks.

## Evaluation sequencing

Create fixed questions and expected sources before block 05. Measure lexical/vector baselines in 05 and fusion/reranking in 06. Block 07 consolidates measured regression thresholds; it is not the first evaluation activity. Live-provider variability must not be labelled deterministic.
