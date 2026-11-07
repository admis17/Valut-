import { Search } from 'lucide-react';
import { useVaultStore } from '../store/useVaultStore';

export function SearchBar() {
  const { search, setSearch } = useVaultStore();
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLow" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search companies, people, tags…"
        className="w-full rounded-control border-[0.5px] border-line bg-panel py-2.5 pl-9 pr-3 text-[13px] text-textHi placeholder:text-textLow focus:border-goldline focus:outline-none focus:ring-2 focus:ring-goldFocus"
      />
    </div>
  );
}
