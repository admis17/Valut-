import { Star } from 'lucide-react';

export function StatCard({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: number;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-card border-[0.5px] bg-panel p-3.5 ${
        highlight ? 'border-[rgba(255,184,0,0.5)]' : 'border-line'
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.08em] text-[#666]">{label}</div>
      <div
        className={`mt-1.5 flex items-center gap-1.5 text-[26px] font-medium leading-none ${
          highlight ? 'text-gold' : 'text-textHi'
        }`}
      >
        {value}
        {highlight && <Star size={13} className="text-gold" />}
      </div>
      <div className="mt-2 text-[11px] text-[#555]">{sub}</div>
    </div>
  );
}
