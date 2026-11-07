# Project Process

## Project Goal
BizVault — a premium React app storing scanned business cards & brochures with notes, searchable and filterable. Midnight black + molten gold aesthetic.

## Current Milestone
MVP bootstrap (per "MVP Build Order" in BizVault-Master-Doc.md)

## Current Task
Setup: scaffold Vite project and begin build order step 1

## Current Status
Spec committed; no code written yet

## Completed
- Repo connected to https://github.com/admis17/Valut-.git, test push OK
- BizVault-Master-Doc.md committed (full PRD, tokens, structure, store)

## In Progress
- Nothing yet

## Next Steps
1. `npm create vite@latest bizvault -- --template react-ts`
2. Tailwind v3 + tokens in tailwind.config.ts
3. Inter font, bg #080808
4. useVaultStore (Zustand persist)
5. VaultHeader / SearchBar / FilterPills
6-7. EntryCard + expanded panel
8. AddEntryModal with react-dropzone
9. useFilteredEntries wiring
10. ImageViewer
11. Empty state, mobile, keyboard nav

## Architecture
- React 18 + TS strict, Vite 5, Tailwind v3, Zustand (localStorage persist), Lucide, react-dropzone
- Storage: localStorage MVP → Supabase later (schema in doc)
- Key files planned per doc's Project Structure section

## Important Decisions
- Identity (repo-local): admis17 <admis17@users.noreply.github.com>
- Gold #FFB800 is the ONLY accent color; flat design, no shadows/blur/gradients

## Known Issues
- None yet

## Failed Approaches
- None yet

## Environment / Commands
- Repo: C:\Users\Adarsh\AppData\Local\Temp\opencode\Valut-
- Build: npm run build ; Lint: npm run lint ; Typecheck: default tsc after scaffold

## User Requirements
- Two-column grid, real-time search, filter pills, inline notes edit, delete confirm, persistence
