# 03 — Domain Model

## Ubiquitous language

| Term | Definition | Not the same as |
| --- | --- | --- |
| `[Term]` | `[precise meaning]` | `[common confusion]` |

## Entity map

```text
[Aggregate Root]
├── [Entity]
└── [Value Object]
```

## [Entity]

**Purpose:** [why it exists]  
**Owner:** [user/aggregate/system]  
**Lifecycle:** [creation → transitions → terminal state]

| Field | Type | Rule |
| --- | --- | --- |
| `id` | identifier | Stable and opaque |
| `[field]` | `[type]` | `[invariant]` |

## Invariants

- [Rule that must always hold.]
- [Forbidden transition.]



## Accepted campaign boundary

- `Campaign` identifies one campaign in the personal installation. There is no account/tenant aggregate in this release.
- A configured source belongs to one campaign. A canonical document belongs to that source and campaign; a chunk belongs to that document and the same campaign.
- Carry `campaignId` through ingestion, persistence, retrieval, context building, citations and any cached/retained query results.
- Source identity/deduplication must include campaign scope; the same external identifier in another campaign must not cause collisions or overwrite data.
- Database keys/foreign keys and application validation must prevent inconsistent campaign relationships. Exact schema is a block 01/04 prerequisite.
- Query input requires an explicit campaign. Campaign deletion and source removal policies must be defined before implementing either operation.

## Open domain decisions

Before block 01: minimal campaign fields, lifecycle and first-slice invariants. Before block 04: source/document/chunk schema, IDs and how preparation, actual events and player knowledge are represented, including unknown status. Never infer player discovery merely from a DM note. Before block 06: handling contradictory evidence and temporal questions.
