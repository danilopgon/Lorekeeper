# 00 — Product Brief

**Name:** Lorekeeper  
**Category:** AI-assisted campaign memory  
**Primary user:** Dani, as GM of his own campaigns  
**Status:** PoC specification; implementation not started

## Problem and value

Campaign facts are scattered across notes. Retrieve relevant evidence within a selected campaign and answer with traceable sources, without confusing preparation with established events or player knowledge.

## Principles

Personal installation, multiple isolated campaigns, GM control over canon, explicit uncertainty when evidence is missing. No multiuser product in the first release.

## Success signals

An agreed end-to-end recall flow works; citations resolve within the selected campaign; lexical/vector and fusion quality have recorded baselines. Concrete thresholds follow measurement.

## First implementation slice

Start with campaign creation/selection and an empty campaign workspace shell.

- The operator can create a campaign, select it and navigate to Chat or Sources for that campaign.
- The active campaign is represented by the URL: `/campaigns`, `/campaigns/{campaignId}/chat` and `/campaigns/{campaignId}/sources`.
- A campaign has `id`, `name`, `createdAt` and `updatedAt`; `name` is required, trimmed, 1–120 characters and unique case-insensitively.
- Campaign deletion, ingestion, AI chat, retrieval and citations are outside this first slice.

## Remaining definition

Detailed knowledge-status model, ingestion lifecycle, answer generation acceptance, later screen details and deployment access control must pass their roadmap readiness gates. Remote exposure additionally requires verified access control.
