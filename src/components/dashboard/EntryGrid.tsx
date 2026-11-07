import { useVaultStore } from '../../store/useVaultStore';
import { SearchBar } from '../SearchBar';
import { FilterPills } from '../FilterPills';
import { EntryCard } from '../EntryCard';
import { EntryDetailPanel } from '../EntryDetailPanel';
import type { Entry, Filter } from '../../types/entry';

export function EntryGrid({
  entries,
  search,
  onSearch,
  filter,
  onFilter,
  onViewImage,
}: {
  entries: Entry[];
  search: string;
  onSearch: (q: string) => void;
  filter: Filter;
  onFilter: (f: Filter) => void;
  onViewImage: (url: string) => void;
}) {
  const selectedId = useVaultStore((s) => s.selectedId);
  const selected = entries.find((e) => e.id === selectedId) ?? null;

  return (
    <div className="mt-[11px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:w-72">
          <SearchBar value={search} onChange={onSearch} />
        </div>
        <div className="sm:ml-auto">
          <FilterPills value={filter} onChange={onFilter} />
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="mt-10 text-center text-[13px] text-textLow">No entries match your search.</p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-[11px] sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e) => (
            <EntryCard
              key={e.id}
              entry={e}
              onViewImage={onViewImage}
              thumbH="sm"
              inlinePanel={false}
              clickToExpand
            />
          ))}
        </div>
      )}

      {selected && (
        <div className="mt-[11px]">
          <EntryDetailPanel entry={selected} onViewImage={onViewImage} />
        </div>
      )}
    </div>
  );
}
