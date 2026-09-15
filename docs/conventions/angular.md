# Angular Conventions

## File suffixes

Keep Angular artifact suffixes in generated and hand-written files.

Examples:

- Components: `*.component.ts`, `*.component.html`, `*.component.css`, `*.component.spec.ts`
- Services: `*.service.ts`
- Directives: `*.directive.ts`
- Pipes: `*.pipe.ts`
- Guards: `*.guard.ts`
- Interceptors: `*.interceptor.ts`
- Resolvers: `*.resolver.ts`

The Angular workspace config must encode this preference in `apps/web/angular.json` schematics so future `ng generate` calls preserve suffixes by default.
