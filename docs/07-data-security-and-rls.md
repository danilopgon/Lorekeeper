# 07 — Data Security, Ownership and RLS

## Data classification

| Data | Sensitivity | Owner | Retention |
| --- | --- | --- | --- |
| `[data]` | `[public/internal/private]` | `[owner]` | `[rule]` |

## Authentication

[Identity source, session/token validation and trusted boundaries.]

## Authorization and ownership

- Every private aggregate belongs to [owner].
- Every read and write verifies ownership server-side.
- List queries are scoped before data is returned.
- Missing and inaccessible private resources do not leak unintended information.

## Database enforcement

[RLS/policies/constraints or where authorization is enforced.]

When PostgreSQL RLS is used, policies are defence in depth alongside application authorization. EF Core query filters alone are not an authorization boundary. Administrative/service credentials stay confined to Infrastructure and must not silently bypass tenant ownership.

## Secrets

- Real values remain outside the repository.
- `.env.example` contains safe placeholders only.
- Logs and errors never expose tokens or private provider payloads.

## Abuse and resilience

[Rate limits, size limits, upload validation, CORS/CSRF or AI-specific boundaries.]
