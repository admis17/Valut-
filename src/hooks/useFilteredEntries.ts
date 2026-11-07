import { useVaultStore } from '../store/useVaultStore';

export function useFilteredEntries() {
  const { entries, search, filter } = useVaultStore();

  return entries.filter((e) => {
    const matchesFilter = filter === 'all' || e.type === filter;

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      e.companyName.toLowerCase().includes(q) ||
      e.contactName.toLowerCase().includes(q) ||
      e.notes.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });
}
