import { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import type { Filter } from '../../types/entry';
import { StatCard } from './StatCard';
import { IndustryBars } from './IndustryBars';
import { TypeBreakdown } from './TypeBreakdown';
import { ActivityFeed } from './ActivityFeed';
import { EntryGrid } from './EntryGrid';
import { EmptyVault } from '../EmptyVault';

export function DashboardPage({
  onAdd,
  onViewImage,
}: {
  onAdd: () => void;
  onViewImage: (url: string) => void;
}) {
  const entries = useVaultStore((s) => s.entries);
  const { total, addedThisMonth, cardCount, brochureCount, bothCount, topIndustries } =
    useDashboardStats(entries);

  // dashboard search/filter is local state, per spec — not the vault store
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const q = search.toLowerCase();
  const filtered = entries.filter(
    (e) =>
      (filter === 'all' || e.type === filter) &&
      (!q ||
        e.companyName.toLowerCase().includes(q) ||
        e.contactName.toLowerCase().includes(q) ||
        e.notes.toLowerCase().includes(q))
  );

  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);

  const panelHead = 'text-[10px] uppercase tracking-[0.08em] text-gold';

  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-[11px] sm:grid-cols-4">
        <StatCard label="Total entries" value={total} sub={`+${addedThisMonth} this month`} highlight />
        <StatCard label="Business cards" value={cardCount} sub={`${pct(cardCount)}% of vault`} />
        <StatCard label="Brochures" value={brochureCount} sub={`${pct(brochureCount)}% of vault`} />
        <StatCard label="Both attached" value={bothCount} sub={`${pct(bothCount)}% of vault`} />
      </div>

      {total === 0 ? (
        <EmptyVault onAdd={onAdd} />
      ) : (
        <>
          <div className="mt-[11px] grid grid-cols-1 gap-[11px] md:grid-cols-2">
            <section className="rounded-card border-[0.5px] border-line bg-panel p-3.5">
              <h4 className={panelHead}>Top industries</h4>
              <div className="mt-3.5">
                {topIndustries.length > 0 ? (
                  <IndustryBars industries={topIndustries} />
                ) : (
                  <p className="text-[11px] text-textLow">
                    No industries tagged yet — add one when creating entries.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-card border-[0.5px] border-line bg-panel p-3.5">
              <h4 className={panelHead}>Entry breakdown</h4>
              <div className="mt-3.5">
                <TypeBreakdown
                  total={total}
                  counts={{ card: cardCount, brochure: brochureCount, both: bothCount }}
                />
              </div>
              <div className="my-2.5 border-t border-line" />
              <ActivityFeed entries={entries} />
            </section>
          </div>

          <EntryGrid
            entries={filtered}
            search={search}
            onSearch={setSearch}
            filter={filter}
            onFilter={setFilter}
            onViewImage={onViewImage}
          />
        </>
      )}
    </>
  );
}
