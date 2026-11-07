# BizVault — Master Prompt, PRD & Tech Stack

---

## Master Prompt

You are building **BizVault** — a premium, futuristic business card and brochure vault built in React. The product is a private archive where a user stores scanned business cards and brochures, attaches notes to each entry, and retrieves them instantly.

### Aesthetic directive

The entire visual language is **midnight black + molten gold**.

- Every surface is near-black: `#080808` (void/page), `#0e0e0e` (cards), `#111111` (panels)
- Gold `#FFB800` is used exclusively for: active states, focus rings, type tags, CTA buttons, border highlights, and icon accents
- No other accent color exists in this product
- No gradients except subtle directional overlays (`rgba(255,184,0,0.07)` to `rgba(10,10,10,0.9)`) on card thumbnails
- No drop shadows. No glassmorphism. No blur. Flat, sharp, premium
- The UI must feel like a **sci-fi luxury vault** — black titanium card case meets Bloomberg terminal

### Motion rules

- `transform: translateY(-1px)` on card hover
- `border-color` and `background` transitions at `180ms ease`
- Gold focus glow: `box-shadow: 0 0 0 2px rgba(255,184,0,0.2)`
- Nothing bouncy. Nothing playful. Every animation is purposeful

### Typography rules

- Font: **Inter** (Google Fonts), weights 400 and 500 only. Never 600+
- Headings: `letter-spacing: 0.02em`
- Uppercase labels: `letter-spacing: 0.08em`, `font-size: 10–11px`, `text-transform: uppercase`
- Body/notes: `font-size: 13px`, `line-height: 1.65`, `color: #f2f2f0`
- Supporting text: `color: #777`
- Muted/meta text: `color: #333`

---

## Product Requirements Document (PRD)

### Vision

A single-user personal vault for storing, annotating, and retrieving physical business cards and brochures in digital form. Fast, beautiful, distraction-free.

### Core User Stories

1. As a user, I can **add a new entry** by uploading a card scan, a brochure (or both), filling in company and contact details, and writing notes
2. As a user, I can **view all entries** in a 2-column card grid showing company, contact, type tag, thumbnail, and a 2-line note preview
3. As a user, I can **expand any entry** to see full notes, full-size file previews, and edit or delete
4. As a user, I can **search entries** in real time across company name, contact name, and notes
5. As a user, I can **filter entries** by type: All · Cards · Brochures · Both
6. As a user, I can **edit notes inline** in the detail panel and save
7. As a user, I can **delete an entry** with a confirmation prompt
8. As a user, my **data persists** across sessions (localStorage MVP, Supabase production)

### Entry Data Model

```ts
type Entry = {
  id: string;               // crypto.randomUUID()
  companyName: string;
  contactName: string;
  role: string;
  type: 'card' | 'brochure' | 'both';
  cardImageUrl?: string;    // base64 (MVP) or Supabase Storage URL
  brochureFileUrl?: string;
  notes: string;
  createdAt: string;        // ISO date string
  updatedAt: string;
};
```

---

### Screens & Components

#### Screen 1 — Vault Grid (Home `/`)

| Element | Detail |
|---|---|
| Top bar | Logo + "BizVault / Card Archive" label left · `+ Add entry` gold button right |
| Search | Full-width input, real-time filter, placeholder: `Search companies, people, tags…` |
| Filter pills | All · Cards · Brochures · Both — active pill gets gold border + tint |
| Grid | 2-column responsive (1-col on mobile <640px), `gap: 11px` |
| Empty state | Centered vault icon (Lucide), `Your vault is empty. Add your first entry.` in muted text, gold `+ Add entry` button |

#### EntryCard (collapsed)

| Element | Detail |
|---|---|
| Company name | 13px / 500 / `#f2f2f0` |
| Contact + role | 11px / `#777` |
| Type tag | Pill: `card` = gold, `brochure` = gray, `both` = bright gold |
| Thumbnail strip | 52px tall, `object-fit: cover`, subtle gold-tinted overlay |
| Note preview | 2-line clamp, 11px, `#777` |
| Footer | Date left · icon actions right (expand, delete) |

#### EntryCard (expanded detail panel)

Slides open below selected card. Contains:
- Section header: `COMPANY — files & notes` (uppercase, gold, hairline rule)
- File row: card slot + brochure slot (68px tall each). Filled = gold tint + filename. Empty = dashed border + "No file yet"
- Notes label (uppercase, 10px, `#444`)
- Notes textarea: auto-grow, `min-height: 78px`, gold focus ring, dark bg
- Upload file button (dashed gold border)
- Save button (gold filled, `color: #080808`) + Delete link (muted, confirms before action)

#### Add Entry Modal

Triggered by `+ Add entry` button. Full overlay (`rgba(0,0,0,0.85)`), centered card.

Fields:
- Company name (required)
- Contact name
- Role / title
- Type selector: Card / Brochure / Both (segmented control, gold active)
- Drop zone: card image (drag + click, accepts jpg/png/webp)
- Drop zone: brochure file (accepts pdf/jpg/png)
- Notes textarea
- `Save to vault` (gold CTA) · `Cancel` (ghost)

#### Full-screen Image Viewer

- Triggered by clicking any card/brochure thumbnail
- Black overlay `rgba(0,0,0,0.95)`, image centered, max 90vw / 90vh
- Close: Esc key or ✕ button (top-right, gold)
- Smooth opacity fade-in `200ms ease`

---

### Non-functional Requirements

- All interactions respond within 100ms (no loading spinners for local ops)
- Images stored as base64 in localStorage for MVP (note: base64 images inflate storage ~33%; recommend Supabase for large scans)
- Search runs client-side on every keystroke, no debounce needed at this data scale
- Mobile responsive: 1-column grid below 640px, modal full-screen on mobile
- No authentication required for MVP (single-user, single-device)
- Keyboard accessible: Tab through all controls, Esc closes modal/viewer

---

## Design Stack

### Color Tokens

```ts
// src/lib/tokens.ts
export const tokens = {
  void:        '#080808',   // page background
  cardBg:      '#0e0e0e',   // entry card background
  panel:       '#111111',   // panels, detail sections
  border:      '#1c1c1c',   // default hairline border
  gold:        '#FFB800',   // primary accent
  goldDim:     'rgba(255,184,0,0.10)',  // tinted background
  goldBorder:  'rgba(255,184,0,0.30)',  // accent border
  goldGlow:    'rgba(255,184,0,0.08)',  // hover glow
  goldFocus:   'rgba(255,184,0,0.20)',  // focus ring
  textHi:      '#f2f2f0',  // primary text
  textMid:     '#777777',  // secondary text
  textLow:     '#333333',  // muted / meta
} as const;
```

### Tailwind Config Extensions

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        void:   '#080808',
        vault:  '#0e0e0e',
        panel:  '#111111',
        gold:   '#FFB800',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        control: '8px',
        card:    '12px',
        modal:   '16px',
      },
    },
  },
};
```

### Design Decisions

| Property | Value | Why |
|---|---|---|
| Spacing unit | 8px base | Consistent vertical rhythm |
| Card border radius | 12px | Refined without being bubbly |
| Border weight | 0.5px | Barely-there, luxury feel |
| Border color (default) | `#1c1c1c` | Near-invisible in dark context |
| Border color (active) | `rgba(255,184,0,0.5)` | Gold highlight without glare |
| Hover lift | `translateY(-1px)` | Subtle, not cartoonish |
| Transition | `180ms ease` | Snappy without feeling instant |
| Icon set | Lucide React, outline only | No filled icons anywhere |
| Thumbnail height | 52px fixed | Uniform grid rows |

---

## Tech Stack

### Frontend

| Layer | Choice | Notes |
|---|---|---|
| Framework | **React 18** | Functional components + hooks throughout |
| Language | **TypeScript** (strict) | All types in `src/types/` |
| Build tool | **Vite 5** | Fast HMR, minimal config overhead |
| Styling | **Tailwind CSS v3** + inline CSS vars | Utility-first; custom gold tokens in config |
| Global state | **Zustand** | Minimal boilerplate, persists to localStorage |
| File upload | **react-dropzone** | Drag-and-drop + click, preview support |
| Icons | **Lucide React** | Outline only, tree-shakeable |
| IDs | `crypto.randomUUID()` | Native browser API, no package needed |
| Routing | **React Router v6** | `/` home, `/entry/:id` optional |

### Storage

| Tier | Tech | Notes |
|---|---|---|
| MVP | `localStorage` via Zustand persist | Zero setup, single device |
| Production | **Supabase** (Postgres + Storage bucket) | Multi-device, file hosting, auth-ready |

### Supabase Schema (production)

```sql
create table entries (
  id               uuid primary key default gen_random_uuid(),
  company_name     text not null,
  contact_name     text,
  role             text,
  type             text check (type in ('card', 'brochure', 'both')),
  card_image_url   text,
  brochure_file_url text,
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- RLS (when auth added later)
alter table entries enable row level security;
```

---

## Project Structure

```
bizvault/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── VaultHeader.tsx      # Logo + Add entry button
│   │   ├── SearchBar.tsx        # Controlled search input
│   │   ├── FilterPills.tsx      # All / Card / Brochure / Both
│   │   ├── EntryCard.tsx        # Collapsed card + expanded detail panel
│   │   ├── AddEntryModal.tsx    # New entry form with dropzones
│   │   └── ImageViewer.tsx      # Full-screen overlay
│   ├── store/
│   │   └── useVaultStore.ts     # Zustand store with localStorage persist
│   ├── types/
│   │   └── entry.ts             # Entry type + filter type
│   ├── lib/
│   │   ├── tokens.ts            # Color + spacing constants
│   │   └── supabase.ts          # Supabase client (production)
│   ├── hooks/
│   │   └── useFilteredEntries.ts  # Derived: search + filter applied
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                # Inter font import + base resets
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "zustand": "^4.5.4",
    "react-dropzone": "^14.2.3",
    "lucide-react": "^0.383.0",
    "@supabase/supabase-js": "^2.44.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vite": "^5.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Zustand Store

```ts
// src/store/useVaultStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Entry } from '../types/entry';

type Filter = 'all' | 'card' | 'brochure' | 'both';

type VaultStore = {
  entries: Entry[];
  search: string;
  filter: Filter;
  selectedId: string | null;
  // actions
  setSearch: (q: string) => void;
  setFilter: (f: Filter) => void;
  setSelected: (id: string | null) => void;
  addEntry: (entry: Entry) => void;
  updateEntry: (id: string, patch: Partial<Entry>) => void;
  deleteEntry: (id: string) => void;
};

export const useVaultStore = create<VaultStore>()(
  persist(
    (set) => ({
      entries: [],
      search: '',
      filter: 'all',
      selectedId: null,
      setSearch: (q) => set({ search: q }),
      setFilter: (f) => set({ filter: f }),
      setSelected: (id) => set({ selectedId: id }),
      addEntry: (entry) =>
        set((s) => ({ entries: [entry, ...s.entries] })),
      updateEntry: (id, patch) =>
        set((s) => ({
          entries: s.entries.map((e) =>
            e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e
          ),
        })),
      deleteEntry: (id) =>
        set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
    }),
    { name: 'bizvault-storage' }
  )
);
```

---

## useFilteredEntries Hook

```ts
// src/hooks/useFilteredEntries.ts
import { useVaultStore } from '../store/useVaultStore';

export function useFilteredEntries() {
  const { entries, search, filter } = useVaultStore();

  return entries.filter((e) => {
    const matchesFilter =
      filter === 'all' || e.type === filter;

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      e.companyName.toLowerCase().includes(q) ||
      e.contactName.toLowerCase().includes(q) ||
      e.notes.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });
}
```

---

## MVP Build Order

| Step | Task |
|---|---|
| 1 | `npm create vite@latest bizvault -- --template react-ts` |
| 2 | Install Tailwind, configure tokens in `tailwind.config.ts` |
| 3 | Add Inter font to `index.css`, set global bg to `#080808` |
| 4 | Build `useVaultStore` with Zustand persist |
| 5 | Build `VaultHeader` + `SearchBar` + `FilterPills` |
| 6 | Build `EntryCard` (collapsed state) |
| 7 | Add expanded detail panel to `EntryCard` |
| 8 | Build `AddEntryModal` with react-dropzone |
| 9 | Wire `useFilteredEntries` to grid |
| 10 | Build `ImageViewer` overlay |
| 11 | Empty state, mobile layout, keyboard nav |
| 12 | Swap localStorage → Supabase when ready |
