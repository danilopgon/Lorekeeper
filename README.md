# Lorekeeper

AI-powered campaign memory for Game Masters. Angular, .NET & hybrid RAG.

A Lazy Lands experiment that turns campaign notes into searchable lore and answers questions with sources.

## Stack

- **Frontend:** Angular 22, TypeScript, Tailwind and pnpm.
- **Backend:** ASP.NET Core/.NET 10, modular monolith, vertical slices and pragmatic CQRS.
- **Data:** PostgreSQL 17, EF Core and pgvector where semantic retrieval is required.
- **AI:** Notion ingestion, hybrid retrieval (full-text + vectors), RRF, reranking and grounded answers. NaN through backend provider adapters.
- **Quality:** Vitest, Angular Testing Library, xUnit, Testcontainers, Playwright and AI evals.

## Status

Block 00 scaffold complete. The next implementation block is the first Angular → .NET → PostgreSQL campaign workspace slice.

## Local commands

```bash
pnpm install --frozen-lockfile
pnpm run format:check
pnpm run lint
pnpm run test
pnpm run build
pnpm run e2e

dotnet restore services/api/Lorekeeper.slnx
dotnet format services/api/Lorekeeper.slnx --verify-no-changes
dotnet build services/api/Lorekeeper.slnx --no-restore --configuration Release
dotnet test services/api/Lorekeeper.slnx --no-build --configuration Release
```

## Documentation

- [Product](PRODUCT.md)
- [Design](DESIGN.md)
- [Documentation index](docs/README.md)
- [Architecture](docs/04-architecture.md)
- [AI system](docs/05-ai-system.md)
- [Roadmap](docs/10-roadmap.md)

Agents start at [AGENTS.md](AGENTS.md). `CLAUDE.md` imports the same instructions.
