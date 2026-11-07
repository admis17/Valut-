# Project Process

## Project Goal
BizVault — a premium React app storing scanned business cards & brochures with notes, searchable and filterable. Midnight black + molten gold aesthetic.

## Current Milestone
v0.3 — Dashboard screen added (spec: BizVault-Dashboard-Prompt.md), tabs Overview/Vault/Tags

## Current Task
None — awaiting user direction

## Current Status
Built and committed; production build passes; dev server running on :5173

## Completed
- v0.0: Repo connected (test push), master doc committed
- v0.1: Full MVP vault grid per master doc
- v0.2: front/back/pdf slots, doc types, remove buttons, type-gated uploads, blob: PDF fix
- v0.3: Dashboard (stat cards w/ live % + monthly count, Top industries bars w/ mount animation, TypeBreakdown dot-bars, ActivityFeed last 4, 3-col EntryGrid w/ local search+filter, detail panel below grid, empty-vault invite). Shared header now: icon + BizVault/{label} + Overview·Vault·Tags tabs + Add entry. New industry?: string field (modal input) powering industry bars. TagsTab lists industries w/ counts, click → Vault tab + store search. EntryDetailPanel extracted (shared: inline on Vault, below-grid on Dashboard). EntryCard gained thumbH/inlinePanel/clickToExpand props. SearchBar/FilterPills now controlled.

## In Progress
- Nothing yet

## Next Steps
- User: verify dashboard rendering + flows in browser
- Optional: Supabase swap (doc step 12); industry editing in detail panel (currently only at creation)

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
