# 02 — Requirements and Acceptance

## Story index

| ID | Story | Priority | Status |
| --- | --- | --- | --- |
| US-01 | [As a..., I want..., so that...] | Must | Planned |

## US-01 — [Short name]

**As a** [user]  
**I want** [capability]  
**So that** [outcome]

### Acceptance criteria

1. Given [context], when [action], then [observable result].
2. Given [boundary/error], when [action], then [recovery or message].
3. Loading, empty, error and success states are explicit.

### Not included

- [Nearby capability outside this story.]

### Verification

- [Test level and evidence.]



## Accepted baseline requirements

### LK-01 — Select a campaign

Given multiple campaigns, when the operator starts ingestion or a query, an explicit campaign must be selected. Missing, invalid or unknown campaign identifiers fail validation without defaulting to another campaign. Exact HTTP mapping is defined before the slice implementing it.

### LK-02 — Isolate evidence

Given two campaigns with overlapping NPC names, querying campaign A returns only A's chunks and citations. Campaign filtering applies to lexical and vector candidate retrieval before ranking. Reranking, context construction, caches and source resolution retain the same scope.

Verification: integration test with real PostgreSQL/pgvector and overlapping-name fixtures; assert no campaign B content or source identifiers appear.

### LK-03 — Isolate mutations

Ingesting, reindexing or deleting a source in campaign A cannot modify campaign B. A source/document reference from another campaign is rejected. Verify database constraints and application checks with integration tests.

### LK-04 — Personal access boundary

Local development needs no application login. Before Internet exposure, unauthorised access to both UI and API must be denied by the selected application or external access layer; direct-origin bypass must also be prevented and tested.

### Requirements before implementation

Each slice needs concrete input/output, validation, failure/recovery and relevant UI states plus verification evidence. The story template above is not a ready story. Knowledge-status and source-backed generation acceptance criteria must be resolved at the roadmap gates before those behaviours are implemented.

## Initial workspace/ingestion approach

Expand the acceptance scenarios in [workspace and ingestion UX](12-workspace-and-ingestion-ux.md) into slice requirements before implementation: campaign switching and late responses, import validation/partial failures, update preservation, removal and historical citations. These supplement LK-01–04; unresolved contracts remain blocking for the affected slice.

## Design/evidence acceptance additions

Answers must not render canonical-fact or knowledge-asymmetry claims without supporting source evidence. Missing source mentions do not establish player ignorance. Citation locators must map to actual source locations, with title/heading/fragment fallback. Verify keyboard interaction, focus, readable responsive layout and real colour contrast for each implemented screen against DESIGN.md.
