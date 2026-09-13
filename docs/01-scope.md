# 01 — Current Scope

## Release goal

Demonstrate source-backed campaign recall over the operator's notes, with multiple campaigns isolated within one personal installation.

## Included

- Explicit campaign selection and campaign-scoped ingestion and queries.
- Markdown/text files and pasted text first (04A), then Notion (04B), through canonical documents and traceable citations.
- PostgreSQL lexical/vector retrieval, RRF and evaluated answer generation.
- Repeatable evaluation fixtures and campaign-isolation checks.

## Excluded

Accounts, teams, invitations, multiuser permissions, cross-campaign search, automatic canon updates and public anonymous access to private campaign data. Reranking remains conditional on evaluation; extra authoring/session-preparation features require a scope decision.

## Open decisions

Follow roadmap entry gates for exact first slice, source configuration, ingestion lifecycle, knowledge-status model, UI, provider settings and deployment access mechanism. Unknowns are not implementation permission.

## Completion

The agreed end-to-end flow passes documented acceptance criteria and eval gates; no cross-campaign evidence is returned. Any remotely exposed deployment passes the access-control gate in `07-data-security-and-rls.md`.

## Initial UI boundary

Campaign selector/creation, Chat and Sources follow [the first UX approach](12-workspace-and-ingestion-ux.md). PDF, DOCX and ZIP imports are deferred. Source replacement preserves the previous usable version until successful publication; removal excludes the source from subsequent retrieval.
