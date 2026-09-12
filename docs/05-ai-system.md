# 05 — AI System

Delete this document and remove its routes if the project has no AI capability. AI is not mandatory garnish.

## Product capability

**Input:** [user data and trusted context]  
**Output:** [proposal/search result/structured result]  
**Human control:** [what the user reviews or decides]  
**Failure mode:** [safe behaviour when evidence/provider is unavailable]

## Provider architecture

Application code depends on project-owned ports. Infrastructure adapts `Microsoft.Extensions.AI`, OpenAI-compatible clients or provider-specific HTTP APIs.

```text
Use case
├── IChatModel
├── IEmbeddingGenerator
└── IReranker
        ↓
Infrastructure adapters
        ↓
[configured provider]
```

Provider selection, model names, endpoints and credentials come from validated configuration. The domain does not know which provider is active.

## Retrieval pipeline

```text
[knowledge source]
    ↓ source reader
canonical documents
    ↓ semantic chunking
PostgreSQL
    ├── Full-Text Search
    └── pgvector
          ↓
Reciprocal Rank Fusion
    ↓ optional reranker
top K evidence
    ↓ context builder
LLM
    ↓ structured validation
grounded response + sources
```

## Ingestion rules

- Sources are adapters behind a common document contract.
- Preserve headings, paths, entity type, timestamps and ownership as metadata.
- Chunk on semantic boundaries before token-size fallback splitting.
- Track external ID, last-modified time and content hash for idempotent incremental ingestion.
- Rechunk and re-embed only changed documents.
- Deletion from a source has an explicit tombstone/removal policy.

## Retrieval rules

- Scope by tenant/owner before ranking.
- Run lexical and semantic retrieval independently.
- Fuse rankings with RRF; keep parameters explicit and testable.
- Reranking is optional and provider-specific behind `IReranker`.
- Return source identity and heading path with every selected chunk.
- If evidence is insufficient, say so; do not fill gaps with confident prose.

## Prompt and output rules

- Version prompts beside their owning capability.
- Separate system instructions, structured state, retrieved evidence and user input.
- Define context budget, truncation order and maximum output.
- Validate structured output before storage or return.
- Treat retrieved content as data, not instructions.
- Never log secrets or private prompt content by default.

## Evaluation dataset

Store versioned cases under `tests/evals/fixtures/`:

```yaml
id: case-001
question: "[question]"
expected_sources:
  - "[source-id]"
expected_facts:
  - "[fact]"
forbidden_facts:
  - "[unsupported claim]"
```

## Evaluation layers

| Layer | Measures | Suggested metrics |
| --- | --- | --- |
| Lexical/vector retrieval | Evidence found | Recall@K, MRR |
| Fusion/reranking | Ordering quality | nDCG@K, MRR |
| Context builder | Evidence density | Context precision/recall |
| Generation | Grounding and usefulness | Fact support, citation correctness, refusal quality |

Retrieval evals are deterministic CI candidates. Model-graded generation evals run separately when cost or variance makes them unsuitable as a blocking gate.

## Observability and cost

Capture provider/model, latency, token or character usage, retrieved source IDs, retry/fallback path and validation failures. Do not store raw private content unless explicitly required and protected.

