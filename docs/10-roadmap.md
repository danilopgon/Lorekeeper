# 10 — Implementation Roadmap

## Status legend

`Not started` · `In progress` · `Blocked` · `Done`

## Current block

**Block NN — [Name]**  
**Status:** [status]  
**Outcome:** [vertical, demonstrable result]

### Included

- [work unit];
- [work unit].

### Exit criteria

- [observable result];
- [quality gate];
- [documentation update].

## Blocks

| Block | Outcome | Depends on | Status |
| ---: | --- | --- | --- |
| 00 | Baseline, solution skeleton and CI | — | Not started |
| 01 | First Angular → .NET → PostgreSQL vertical slice | 00 | Not started |
| 02 | OpenAPI client generation and contract gate | 01 | Not started |
| 03 | AI provider ports with deterministic fake | 01 | Not started |
| 04 | Ingestion and canonical documents | 03 | Not started |
| 05 | PostgreSQL FTS + pgvector retrieval | 04 | Not started |
| 06 | RRF, optional reranking and context builder | 05 | Not started |
| 07 | Versioned eval dataset and regression gates | 06 | Not started |
| 08 | End-to-end product flow and production hardening | 07 | Not started |

## PR strategy

```text
PR 01 — [single coherent deliverable]
PR 02 — [next slice]
```
