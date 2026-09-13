# 11 — Backlog and Non-goals

This document protects the current scope from attractive distractions.

## Deferred opportunities

| Idea | Why it may matter | Revisit when | Constraints |
| --- | --- | --- | --- |
| `[idea]` | `[value]` | `[real trigger]` | `[cost/risk]` |

Deferred means **not part of the active roadmap**. Do not scaffold it.

## Intentional non-goals

- **[Non-goal]:** [why it does not fit].

## Rejected ideas

Rejected architecture links to an ADR. Rejected product ideas stay here with a concise rationale.


## Explicit initial non-goals

Accounts, teams, invitations, shared roles/permissions, cross-campaign retrieval and automatic canon modification are outside the personal PoC. Multiuser support requires a fresh scope and ownership/authentication ADR. Application login is deferred pending deployment access design; control of remote access itself is mandatory before exposure.

## Initial workspace/ingestion approach

PDF, DOCX and ZIP import are deferred beyond the first ingestion approach. Revisit when real sources require them; define extraction quality and format limits before implementation. Initial formats are Markdown, plain text and pasted text, then Notion.
