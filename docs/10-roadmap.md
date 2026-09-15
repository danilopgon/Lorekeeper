# 10 — Implementation Roadmap

## Status and execution rule

`Not started` · `In progress` · `Blocked` · `Done`.

Apply the blocking Definition of Ready in `08-quality-strategy.md` before every block. Dependencies are necessary but not sufficient: resolve the entry decisions below in their owning documents. Record evidence and status here before coding. Unknowns on another block's path do not block independent ready work.

## Current block

**Definition — product and first-slice specification**  
**Status:** Not started  
**Outcome:** an implementable first slice with explicit scope and acceptance criteria.

Accepted: personal single-operator use, multiple isolated campaigns, no multiuser scaffolding, access control required before Internet exposure. Still open: exact first slice, minimum campaign lifecycle/schema, screen design and concrete contracts. Implementation is blocked wherever those decisions are required.

## Blocks and gates

| Block | Outcome / dependency | Required decisions before implementation | Exit evidence |
| --- | --- | --- | --- |
| Definition | Product and scope / none | Personal multicampaign boundaries, first slice, non-goals and observable acceptance in PRODUCT, 00–03 | First slice passes Definition of Ready; unresolved later decisions explicitly assigned |
| 00 | Skeleton and CI / Definition | Runtime/package versions, package manager, module/project layout, one E2E location, real commands and CI tools in 04/08/09 | Scaffold builds; applicable checks run; AGENTS commands updated |
| 01 | Angular → .NET → PostgreSQL slice / 00 | Campaign schema/invariants, explicit campaign selection, endpoint DTOs/errors, minimal UI states/tokens in 02/03/06/DESIGN | Accepted first flow and database isolation tests pass |
| 02 | Generated OpenAPI client / 01 | Generator, output location/versioning and contract-diff policy in 06 | Client generation and contract gate run |
| 03 | AI ports and deterministic fake / 01 | NaN adapter/model settings, dimensions, limits, failure policy in 05/09 | Fake verifies orchestration; configured adapter compatibility checked before live use |
| 04A | Sources: Markdown/text and pasted text / 03 | Upload/review limits, canonical schema, knowledge status, chunking, progress/retry, identity/version publication, removal and private-data policy in 02/03/05/06/07/12 | Supported inputs available per campaign; partial failure/update/isolation verified; initial eval fixtures ready |
| 04B | Notion ingestion / 04A | Root/credentials, traversal, supported blocks, sync and remote deletion in 03/05/06/07/12 | Notion uses the same canonical pipeline and source lifecycle; campaign isolation verified |
| 05 | FTS + vector retrieval / 04B | FTS language, vector/index configuration and candidate limits; initial eval dataset exists; decide whether offline Python experiments add value for embedding/retrieval comparisons | Separate lexical/vector baselines recorded; no campaign leakage; any experimental comparison is reproducible from committed inputs |
| 06 | Fusion and grounded answer / 05 | RRF settings, reranker decision, budgets, citations, contradictions, insufficient evidence, transport and generation criteria in 02/05/06; compare no-reranker/provider/local candidates before promoting runtime complexity | Answers trace to campaign evidence; comparison against baselines recorded; any promoted reranker has measured quality/latency/resource evidence |
| 07 | Regression gates / 06 | Measured thresholds/tolerances, frozen versus live eval execution in 08; decide whether Langfuse or equivalent adds material value beyond OpenTelemetry | Repeatable gates with documented baseline and cost/variance policy; AI observability choice and privacy policy recorded |
| 08 | Complete flow and deployment / 07 | Hosting, auth or private-access layer, backups, limits and rollback in 07/09; any local-model runtime must have artefact/version/fallback/runbook decisions | Critical flow passes; any remote exposure passes access gate and smoke verification; promoted AI runtime dependencies are operationally reproducible |

All numbered blocks are **Not started**. Mark a block **Blocked** when readiness assessment identifies an unresolved required decision; document the exact condition below.

## AI engineering extension rule

Lorekeeper may use a small Python workbench (`uv`, Pydantic, pytest) and model-ecosystem libraries such as Hugging Face, SentenceTransformers and PyTorch for offline evaluation, reranking or inference experiments. These are not baseline product dependencies.

Adopt them incrementally:

1. start from the committed retrieval/eval corpus;
2. use Python only where the ecosystem materially improves experimentation or analysis;
3. compare candidate model behaviour against the simpler .NET/provider baseline;
4. promote a local model/runtime dependency only when measured quality gains justify latency, resource and delivery costs;
5. require an ADR before introducing a separately deployed Python/model service.

OpenTelemetry remains the default system-wide observability stack. Langfuse or another AI-specific platform may be added when prompt/model/retrieval inspection and eval workflows justify a second telemetry system, with explicit privacy and retention rules.

## Readiness record (required per block)

- Block and status:
- Entry decisions and links to resolved specifications:
- Remaining blocker, target document and unblock condition:
- Acceptance criteria and verification plan:
- Exit evidence and remaining limitations:

## Cross-cutting gates

- Any Internet exposure, including an early preview, requires verified control of both UI and API plus prevention of direct-origin bypass. Resolve authentication or external private access then, not necessarily during scaffold work.
- Campaign boundaries are enforced from the first persistence slice onward.
- Preparation, actual events and player knowledge must be modelled before ingestion; a DM note is not proof of player discovery.
- Evaluation starts before retrieval implementation; block 07 formalises gates.
- AI/model tooling does not enter the production runtime solely for portfolio value; the committed evaluation corpus must justify the added dependency.
- Each PR identifies its block, specification and acceptance evidence. No feature may rely on a placeholder as an approved decision.

## First UX approach: sequencing clarification

[Workspace and ingestion UX](12-workspace-and-ingestion-ux.md) assigns campaign creation/selection and navigation to 01, Sources/file-text import to 04A, Notion to 04B, and Chat/citations to 06. Define the navigation/states before the corresponding UI work. Source publication/progress contracts are specified in 04A; vector indexing is completed with 05, so an intermediate parser/storage milestone must not claim production retrieval readiness. End-to-end source availability is verified once indexing exists. This decomposition preserves the existing gates and does not mark blocks ready.

## Design decision resolved

Codex Lithographica is adopted in [DESIGN.md](../DESIGN.md), including conditional evidence blocks, real citation locators, responsive and accessibility requirements. The visual-direction decision is resolved; detailed screen/component specifications and verified accessible token combinations remain block 01 / affected-UI entry requirements. This documentation update does not mark implementation blocks complete.
