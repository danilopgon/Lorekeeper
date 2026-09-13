# 05 — AI System

This document specifies Lorekeeper retrieval and generation. Open settings must be resolved at the relevant roadmap gate.

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

- Scope both lexical and vector candidates by explicit `campaignId` before ranking; the initial installation has one operator, not tenants.
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



## Required decisions by block

- **03:** NaN adapter configuration, supported chat/embedding models, dimensions, budgets, timeouts, retries and failure behaviour; verify compatibility before locking settings.
- **04:** Notion root per campaign, supported block types, canonical schema, structural chunking limits, tables, source removal, idempotency and job lifecycle. Preserve knowledge status; unknown is not confirmed canon.
- **Before 05:** fixed corpus and expected-source questions, including overlapping NPC names in different campaigns. Record baseline results before adding regression thresholds.
- **05:** FTS language, vector representation/index compatibility, candidate limits and retrieval parameters.
- **06:** RRF settings, reranker decision, context budget/truncation, citation schema, contradictory/insufficient evidence and response transport. Define whether any structured current-state context is in scope rather than assuming all Lazy Lands features exist here.
- **07:** measured thresholds and tolerances; distinguish frozen reproducible fixtures from live-provider evals.

Campaign identity is preserved through all stages; final citation resolution must not fetch another campaign's document.

## Initial workspace/ingestion approach

Entry adapters now start with Markdown/text files and pasted text (04A), followed by Notion (04B). Both feed the canonical pipeline. Retrieval uses only published available source versions; failed/pending updates preserve the previous usable version. See [UX approach](12-workspace-and-ingestion-ux.md); define atomic publication and deletion races before implementation.

## Evidence presentation contract

The adopted design uses conditional canonical-fact, knowledge-asymmetry and information-limit blocks. Show canon or player/GM knowledge differences only when sources support them. Missing mentions do not prove ignorance. Never invent line/folio locators; emit only traceable source locations. Define the precise output schema before block 06; no mandatory three-part answer is implied.
