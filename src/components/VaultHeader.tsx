import { Plus, Vault } from 'lucide-react';

export function VaultHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Vault size={18} className="text-gold" />
        <div>
          <div className="text-[13px] font-medium text-textHi">BizVault</div>
          <div className="text-[10px] uppercase tracking-[0.08em] text-textLow">
            Card Archive
          </div>
        </div>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 rounded-control bg-gold px-3.5 py-2 text-[12px] font-medium text-void transition-colors duration-[180ms] hover:bg-gold/90"
      >
        <Plus size={14} /> Add entry
      </button>
    </header>
  );
}
