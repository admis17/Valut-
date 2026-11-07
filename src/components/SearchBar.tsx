import { Search } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (q: string) => void;
}) {
  return (
    <div className="relative">
      <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-textLow" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search companies, people, tags…"
        className="w-full rounded-control border-[0.5px] border-line bg-panel py-2.5 pl-9 pr-3 text-[13px] text-textHi placeholder:text-textLow focus:border-goldline focus:outline-none focus:ring-2 focus:ring-goldFocus"
      />
    </div>
  );
}
