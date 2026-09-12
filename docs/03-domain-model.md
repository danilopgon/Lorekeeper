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

