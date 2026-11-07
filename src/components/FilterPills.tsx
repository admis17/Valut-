import type { Filter } from '../types/entry';

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Cards', value: 'card' },
  { label: 'Brochures', value: 'brochure' },
  { label: 'Both', value: 'both' },
];

export function FilterPills({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (f: Filter) => void;
}) {
  return (
    <div className="flex gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`rounded-full border-[0.5px] px-3 py-1 text-[11px] transition-colors duration-[180ms] focus:outline-none focus:ring-2 focus:ring-goldFocus ${
            value === f.value
              ? 'border-goldline bg-goldDim text-gold'
              : 'border-line bg-transparent text-textMid hover:border-goldline'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
