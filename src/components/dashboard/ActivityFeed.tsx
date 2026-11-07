import type { Entry } from '../../types/entry';

const DOT: Record<Entry['type'], string> = {
  card: '#FFB800',
  brochure: '#444444',
  both: '#FFD050',
};

const TAG: Record<Entry['type'], string> = {
  card: 'border-goldline bg-goldDim text-gold',
  brochure: 'border-line bg-transparent text-textMid',
  both: 'border-goldline bg-gold text-void',
};

export function ActivityFeed({ entries }: { entries: Entry[] }) {
  const recent = [...entries]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  return (
    <div>
      {recent.map((e) => {
        const contact = [e.contactName, e.role].filter(Boolean).join(' · ');
        return (
          <div key={e.id} className="flex items-center gap-2 border-b border-line py-2 last:border-b-0">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: DOT[e.type] }} />
            <span className="truncate text-[12px] text-textHi">{e.companyName}</span>
            <span className="hidden truncate text-[11px] text-textMid sm:block">{contact}</span>
            <span
              className={`shrink-0 rounded-full border-[0.5px] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.08em] ${TAG[e.type]}`}
            >
              {e.type}
            </span>
            <span className="ml-auto shrink-0 text-[10px] text-textLow">
              {new Date(e.createdAt).toLocaleDateString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
