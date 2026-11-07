import { Vault } from 'lucide-react';

export function EmptyVault({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mt-24 flex flex-col items-center gap-3">
      <Vault size={36} strokeWidth={1} className="text-gold" />
      <p className="text-[13px] text-textMid">Your vault is empty. Add your first entry.</p>
      <button
        onClick={onAdd}
        className="rounded-control bg-gold px-3.5 py-2 text-[12px] font-medium text-void transition-colors duration-[180ms] hover:bg-gold/90"
      >
        + Add entry
      </button>
    </div>
  );
}
