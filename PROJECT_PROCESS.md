# Project Process

## Project Goal
BizVault — a premium React app storing scanned business cards & brochures with notes, searchable and filterable. Midnight black + molten gold aesthetic.

## Current Milestone
MVP v0.2 — file slots model v1 (front/back/card-pdf/brochure), type-gated uploads

## Current Task
None — awaiting user direction

## Current Status
Built and committed; production build passes (tsc strict + Vite); dev server running on :5173

## Completed
- Repo connected to https://github.com/admis17/Valut-.git, test push OK
- BizVault-Master-Doc.md committed (full PRD, tokens, structure, store)
- Scaffolded Vite 5 + React 18 + TS strict + Tailwind 3.4 at repo root
- Zustand store (persist 'bizvault-storage') exactly per doc
- All screens built; npm run build passes
- Fix: PDF/doc open via blob: URL (Chrome blocks data: URL navigation)
- v0.2: Entry model v1 — cardFrontUrl/cardBackUrl/cardDocUrl/brochureFileUrl; persist migrate v0→v1
- v0.2: Type-gated dropzones in modal (card→front/back/pdf, brochure→brochure, both→all); Remove/Replace/Open per slot; files persist immediately on pick; docs accept pdf/doc/docx/xls/xlsx/csv/txt/images

## In Progress
- Nothing yet

## Next Steps
- User: verify v0.2 flows in browser (upload front+back, remove, card pdf open, type gating)
- Optional: swap localStorage → Supabase (doc step 12)
- Optional: deploy

## Architecture
- React 18 + TS strict, Vite 5, Tailwind v3, Zustand persist (localStorage), Lucide, react-dropzone
- No router (single screen — doc marks routing optional), no Supabase client yet (unused until step 12)
- All styling via Tailwind tokens in tailwind.config.ts; src/lib/tokens.ts holds canonical token source

## Important Decisions
- Identity (repo-local git): admis17 <admis17@users.noreply.github.com>
- Gold #FFB800 is the ONLY accent color; flat design, no shadows/blur/gradients
- Files stored as base64 data URLs; images → ImageViewer, other files → blob: URL in new tab
- File slots (pick/remove/replace) persist to store immediately; only notes use the Save button
- Deviation from doc per user: uploads gated by entry type; card entries have Front/Back/PDF slots
- ExpandedPanel notes draft is local state, resynced only on entry.id change (so file picks don't wipe unsaved notes)

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
