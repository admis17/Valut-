# Project Process

## Project Goal
BizVault — a premium React app storing scanned business cards & brochures with notes, searchable and filterable. Midnight black + molten gold aesthetic.

## Current Milestone
MVP complete (v0.1.0) — all 11 build steps from BizVault-Master-Doc.md implemented

## Current Task
None — awaiting user direction (Supabase swap is doc step 12, optional)

## Current Status
Built and committed; production build passes (tsc strict + Vite)

## Completed
- Repo connected to https://github.com/admis17/Valut-.git, test push OK
- BizVault-Master-Doc.md committed (full PRD, tokens, structure, store)
- Scaffolded Vite 5 + React 18 + TS strict + Tailwind 3.4 at repo root
- Zustand store (persist 'bizvault-storage') exactly per doc
- VaultHeader, SearchBar, FilterPills, EntryCard (collapsed + expanded panel, file slots, save/delete), AddEntryModal (react-dropzone, base64), ImageViewer, empty state
- useFilteredEntries hook per doc
- npm install OK; npm run build passes

## In Progress
- Nothing yet

## Next Steps
- User: run `npm run dev` to verify visually in a browser
- Optional: swap localStorage → Supabase (doc step 12)
- Optional: deploy

## Architecture
- React 18 + TS strict, Vite 5, Tailwind v3, Zustand persist (localStorage), Lucide, react-dropzone
- No router (single screen — doc marks routing optional), no Supabase client yet (unused until step 12)
- All styling via Tailwind tokens in tailwind.config.ts; src/lib/tokens.ts holds canonical token source

## Important Decisions
- Identity (repo-local git): admis17 <admis17@users.noreply.github.com>
- Gold #FFB800 is the ONLY accent color; flat design, no shadows/blur/gradients
- Files stored as base64 data URLs; pdf opens via window.open, images via ImageViewer
- ExpandedPanel drafts are local state, resynced from store on save/entry change

## Known Issues
- npm audit: 1 moderate + 1 high (dev-tool transitive deps); not fixed — nothing user-facing. Look before adding prod traffic.
- base64 in localStorage caps ~4-5MB of scans; doc itself flags this (upgrade path = Supabase)

## Failed Approaches
- None yet

## Environment / Commands
- Repo: C:\Users\Adarsh\AppData\Local\Temp\opencode\Valut-
- Dev: `npm.cmd run dev` (npm.ps1 blocked by PowerShell policy — use npm.cmd)
- Build: `npm.cmd run build` (passes)

## User Requirements
- Two-column grid, real-time search, filter pills, inline notes edit, delete confirm, persistence
