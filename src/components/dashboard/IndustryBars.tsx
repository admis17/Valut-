import { useEffect, useState } from 'react';

function IndustryBar({ name, count, max }: { name: string; count: number; max: number }) {
  const [width, setWidth] = useState(0);

  // animate the fill 0 → target on mount
  useEffect(() => {
    setWidth((count / max) * 100);
  }, [count, max]);

  return (
    <div className="flex items-center gap-2">
      <span className="w-[90px] truncate text-[11px] text-textMid">{name}</span>
      <span className="h-[5px] flex-1 rounded-[3px] bg-line">
        <span
          className="block h-full rounded-[3px] bg-gold transition-[width] duration-[400ms]"
          style={{ width: `${width}%` }}
        />
      </span>
      <span className="w-6 text-right text-[11px] text-[#555]">{count}</span>
    </div>
  );
}

export function IndustryBars({ industries }: { industries: [string, number][] }) {
  const max = Math.max(1, ...industries.map(([, c]) => c));
  return (
    <div className="space-y-3">
      {industries.map(([name, count]) => (
        <IndustryBar key={name} name={name} count={count} max={max} />
      ))}
    </div>
  );
}
