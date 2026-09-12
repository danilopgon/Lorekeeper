# 09 — Delivery and Operations

## Environments

| Environment | Purpose | Data policy |
| --- | --- | --- |
| Local | Development and automated integration tests | Seeded/non-sensitive |
| Staging | Contract, migration and smoke validation | Synthetic or protected |
| Production | Real users | Least privilege and audited access |

## Configuration

Document variable names and purpose in `.env.example` or platform configuration. Never commit real values.

| Variable | Used by | Purpose |
| --- | --- | --- |
| `[NAME]` | Web/API | `[purpose]` |

## Deployment shape

```text
Angular static/SSR host
        ↓ HTTPS
ASP.NET Core container
        ↓
PostgreSQL + pgvector
        ↓ outbound only
AI and external providers
```

## Pipeline

1. Restore/install from lockfiles.
2. Run format, lint, typecheck, build and unit tests.
3. Generate OpenAPI and verify the TypeScript client.
4. Run integration tests against Testcontainers.
5. Run deterministic AI evals and critical Playwright flows.
6. Build immutable frontend/backend artifacts.
7. Apply forward-compatible migrations.
8. Deploy, verify health/readiness and execute smoke tests.

## Database changes

- Expand before contract: add compatible schema first, migrate consumers, remove old shape later.
- Do not couple an irreversible migration to an unverified application rollout.
- pgvector extension and index strategy are provisioned explicitly.
- Test migrations from the last production schema, not only against an empty database.

## Observability

- OpenTelemetry traces across API, database and provider calls.
- Structured logs with request/correlation ID.
- Health checks distinguish liveness from readiness.
- Domain metrics, retrieval latency, provider usage, validation failures and fallback rate.
- Alerts must be actionable and point to a runbook.

## Rollback

Define the last known-good artifact, database compatibility window, feature-flag behaviour and how provider/config changes are reversed.



## Initial personal deployment and readiness

The initial installation serves one operator and several campaigns. Local-only development is permitted without application login. Hosting and application-auth versus external private-access enforcement remain **Open**; they must be settled before Internet exposure, even if a preview is attempted before block 08.

Record chosen host, network/origin restrictions, access mechanism, secrets, storage/backups and authorised/unauthorised smoke evidence here and in an ADR. Protect both frontend and API, including direct-origin paths. Until verified, keep the deployment local-only. This deployment gate does not block local product development.
