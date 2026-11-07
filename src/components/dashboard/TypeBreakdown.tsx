const TYPES = [
  { key: 'card', label: 'Cards', color: '#FFB800' },
  { key: 'both', label: 'Both', color: '#FFD050' },
  { key: 'brochure', label: 'Brochures', color: '#444444' },
] as const;

export function TypeBreakdown({
  total,
  counts,
}: {
  total: number;
  counts: Record<(typeof TYPES)[number]['key'], number>;
}) {
  return (
    <div className="space-y-2.5">
      {TYPES.map((t) => (
        <div key={t.key} className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: t.color }} />
          <span className="w-[70px] shrink-0 text-[11px] text-textMid">{t.label}</span>
          <span className="h-[5px] flex-1 rounded-[3px] bg-line">
            <span
              className="block h-full rounded-[3px]"
              style={{
                backgroundColor: t.color,
                width: `${total ? (counts[t.key] / total) * 100 : 0}%`,
              }}
            />
          </span>
          <span className="w-6 text-right text-[11px] text-[#555]">{counts[t.key]}</span>
        </div>
      ))}
    </div>
  );
}
