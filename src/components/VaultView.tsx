import { useFilteredEntries } from '../hooks/useFilteredEntries';
import { useVaultStore } from '../store/useVaultStore';
import { SearchBar } from './SearchBar';
import { FilterPills } from './FilterPills';
import { EntryCard } from './EntryCard';
import { EmptyVault } from './EmptyVault';

export function VaultView({
  onAdd,
  onViewImage,
}: {
  onAdd: () => void;
  onViewImage: (url: string) => void;
}) {
  const search = useVaultStore((s) => s.search);
  const setSearch = useVaultStore((s) => s.setSearch);
  const filter = useVaultStore((s) => s.filter);
  const setFilter = useVaultStore((s) => s.setFilter);
  const entries = useFilteredEntries();
  const total = useVaultStore((s) => s.entries.length);

  return (
    <>
      <div className="mt-5 space-y-3">
        <SearchBar value={search} onChange={setSearch} />
        <FilterPills value={filter} onChange={setFilter} />
      </div>

      {entries.length === 0 ? (
        total === 0 ? (
          <EmptyVault onAdd={onAdd} />
        ) : (
          <p className="mt-16 text-center text-[13px] text-textLow">No entries match your search.</p>
        )
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-[11px] sm:grid-cols-2">
          {entries.map((e) => (
            <EntryCard key={e.id} entry={e} onViewImage={onViewImage} />
          ))}
        </div>
      )}
    </>
  );
}
