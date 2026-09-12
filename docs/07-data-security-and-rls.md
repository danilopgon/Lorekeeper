# 07 — Data Security and Access Boundary

## Current deployment model

One personal installation for Dani, containing multiple campaigns. Accounts, teams, invitations and multiuser permissions are out of scope. Campaign notes and provider credentials are private. `campaignId` provides data partitioning, not authentication or proof of ownership.

## Campaign isolation

Scope all campaign reads/writes, ingestion jobs, lexical/vector candidate searches, caches and citations explicitly. Validate nested relationships and enforce consistent campaign ownership with database constraints. Integration tests must demonstrate isolation with overlapping names and cross-campaign references.

No tenant/RLS subsystem is mandated for this personal release. Future multiuser access requires an explicit ADR, ownership model and authorization checks; query filters alone would not suffice.

## Blocking gate: Internet exposure

Local-only development may proceed without application login. Before exposing any UI or API endpoint to the Internet, choose and document either application authentication or an external private-access layer.

The gate is satisfied only when:

- The chosen mechanism and trusted boundaries are documented in `09-delivery.md` and an ADR.
- Both UI and API are protected; direct backend/origin access cannot bypass the layer.
- Unauthorised requests are denied and authorised end-to-end access works, with recorded deployment verification.
- Database and secrets are not publicly exposed; provider credentials remain backend-only.

Until then, remote exposure is **Blocked**, regardless of roadmap progress. This does not block local ingestion/retrieval work. Public anonymous access to real campaign data is not an acceptable interim deployment.

## Decisions before real data ingestion

Document what campaign content is sent to Notion/AI providers, retention/removal policy and log redaction before ingesting private notes. Synthetic fixtures may be used while these decisions are open.

## Secrets and resilience

Keep credentials outside Git; examples contain placeholders only. Do not log private prompts or tokens by default. Define request-size limits, provider budgets, timeouts and abuse controls at the corresponding implementation/deployment gates.
