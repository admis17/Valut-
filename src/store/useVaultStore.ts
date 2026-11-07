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
