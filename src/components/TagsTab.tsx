import { useVaultStore } from '../store/useVaultStore';

export function TagsTab({ onSwitch }: { onSwitch: () => void }) {
  const entries = useVaultStore((s) => s.entries);
  const setSearch = useVaultStore((s) => s.setSearch);

  const counts: Record<string, number> = {};
  entries.forEach((e) => {
    if (e.industry) counts[e.industry] = (counts[e.industry] || 0) + 1;
  });
  const tags = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mt-5">
      {tags.length === 0 ? (
        <p className="mt-24 text-center text-[13px] text-textMid">
          No industry tags yet — add an industry when creating entries.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map(([name, count]) => (
            <button
              key={name}
              onClick={() => {
                setSearch(name);
                onSwitch();
              }}
              className="rounded-full border-[0.5px] border-line px-3 py-1 text-[11px] text-textMid transition-colors duration-[180ms] hover:border-goldline hover:text-gold focus:outline-none focus:ring-2 focus:ring-goldFocus"
            >
              {name} <span className="ml-1 text-[10px] text-textLow">{count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
