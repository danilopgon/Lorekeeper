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
