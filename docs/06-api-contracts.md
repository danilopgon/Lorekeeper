# 06 — API Contracts

## Conventions

- Base path: `[path]`.
- Authentication: `[mechanism]`.
- Error format: `[Problem Details / schema]`.
- Dates and times: `[ISO 8601 / timezone rule]`.
- Pagination/versioning/idempotency: `[rules]`.

## Source of truth and client generation

ASP.NET endpoint contracts generate OpenAPI. Angular consumes a generated TypeScript client behind a small application adapter.

- Never hand-edit generated files.
- Commit generated output only if the repository chooses that strategy consistently.
- CI regenerates and fails on unexpected diff.
- Breaking changes require an explicit migration or versioning decision.

## `[METHOD] /path`

**Purpose:** [use case]  
**Authorization:** [ownership/role rule]

### Request

```json
{ "field": "value" }
```

### Success response

```json
{ "id": "opaque-id" }
```

### Expected errors

| Status | Condition | Public code |
| ---: | --- | --- |
| 400 | [invalid input] | `[code]` |
| 403 | [not allowed] | `[code]` |
| 404 | [not found] | `[code]` |

## External integrations

Document provider contract, timeout, retry, mapping and fallback. Provider responses are not domain models.


## Campaign contract requirements

Campaign-dependent requests carry an explicit `campaignId` in the agreed route or request contract. No implicit campaign fallback. Validate that nested source/document IDs belong to that campaign for reads and writes. A campaign identifier is not an authentication credential.

Define the first slice's endpoint/DTO/error contracts before block 01 implementation; block 02 automates generation, it does not postpone contract design. Decide synchronous versus job-based ingestion before block 04 and full-response versus streaming contracts before block 06.

## Initial workspace/ingestion approach

Before 04A, specify import review/confirmation, upload/pasted-text validation, per-document progress/errors/retry, source update and removal contracts. Decide job polling/event transport explicitly. Before 06, specify conversation scope and source-fragment/version resolution. The [UX approach](12-workspace-and-ingestion-ux.md) defines behaviour, not final endpoint schemas.
