# Lorekeeper

AI-powered campaign memory for Game Masters. Angular, .NET & hybrid RAG.

A Lazy Lands experiment that turns campaign notes into searchable lore and answers questions with sources.

## Planned stack

- **Frontend:** Angular 22 and TypeScript.
- **Backend:** ASP.NET Core, modular monolith, vertical slices and pragmatic CQRS.
- **Data:** PostgreSQL, EF Core and pgvector.
- **AI:** Notion ingestion, hybrid retrieval (full-text + vectors), RRF, reranking and grounded answers. NaN through backend provider adapters.
- **Quality:** Vitest, Angular Testing Library, xUnit, Testcontainers, Playwright and AI evals.

## Status

Documentation baseline. Application scaffolding and executable setup commands will follow during implementation.

## Documentation

- [Product](PRODUCT.md)
- [Design](DESIGN.md)
- [Documentation index](docs/README.md)
- [Architecture](docs/04-architecture.md)
- [AI system](docs/05-ai-system.md)
- [Roadmap](docs/10-roadmap.md)

Agents start at [AGENTS.md](AGENTS.md). `CLAUDE.md` imports the same instructions.
