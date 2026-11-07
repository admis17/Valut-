import { Plus, Vault } from 'lucide-react';

export type TabId = 'dashboard' | 'vault' | 'tags';

export function VaultHeader({
  label,
  tabs,
  active,
  onTab,
  onAdd,
}: {
  label: string;
  tabs: { id: TabId; label: string }[];
  active: TabId;
  onTab: (t: TabId) => void;
  onAdd: () => void;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <Vault size={18} className="text-gold" />
        <div>
          <div className="text-[13px] font-medium text-textHi">BizVault</div>
          <div className="text-[10px] uppercase tracking-[0.08em] text-textLow">{label}</div>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTab(t.id)}
            className={`text-[11px] uppercase tracking-[0.08em] transition-colors duration-[180ms] focus:outline-none focus:ring-2 focus:ring-goldFocus ${
              active === t.id ? 'text-gold' : 'text-textMid hover:text-textHi'
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-control bg-gold px-3.5 py-2 text-[12px] font-medium text-void transition-colors duration-[180ms] hover:bg-gold/90"
        >
          <Plus size={14} /> Add entry
        </button>
      </nav>
    </header>
  );
}
