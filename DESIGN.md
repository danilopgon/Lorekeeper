# Lorekeeper — Design System

## 1. Design direction

[Describe the visual thesis in one memorable sentence.]

**Target balance:** `[80% functional · 15% expressive · 5% ornamental]`.

The interface should feel [qualities]. It should not feel [anti-references].

## 2. Principles

1. [Principle and practical consequence.]
2. [Principle and practical consequence.]
3. [Principle and practical consequence.]

## 3. Tokens

Document color, typography, spacing, radius, border, shadow and motion tokens with their semantic purpose.

## 4. Components

For each product primitive, define anatomy, variants, states, accessibility and what must not be generalized.

## 5. Page states

Every screen accounts explicitly for loading, empty, error, success and disabled/read-only states where relevant.

## 6. Responsive behavior

Describe priority and recomposition, not only breakpoints.

## 7. Accessibility

Semantic HTML first; full keyboard flow; visible focus; sufficient contrast; reduced motion; accessible names and live announcements.

## 8. Implementation rule

Before implementing a screen, inspect this document and the nearest shipped screen. Extract a checklist of fields, copy, states, layout, tokens, shared components and motion. Compare the result against it before completion.

## Accepted information architecture

The initial workspace has a persistent/accessibly reachable campaign selector and Chat / Sources navigation. Sources provides import review, per-document progress and source management; Chat opens cited fragments. See [initial UX approach](docs/12-workspace-and-ingestion-ux.md). Visual thesis, tokens and detailed components above remain to be specified before their UI slices; this flow does not establish a finished design system.
