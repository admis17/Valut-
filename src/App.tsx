import { useState } from 'react';
import { Vault } from 'lucide-react';
import { VaultHeader } from './components/VaultHeader';
import { SearchBar } from './components/SearchBar';
import { FilterPills } from './components/FilterPills';
import { EntryCard } from './components/EntryCard';
import { AddEntryModal } from './components/AddEntryModal';
import { ImageViewer } from './components/ImageViewer';
import { useFilteredEntries } from './hooks/useFilteredEntries';
import { useVaultStore } from './store/useVaultStore';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const entries = useFilteredEntries();
  const total = useVaultStore((s) => s.entries.length);

  return (
    <div className="mx-auto max-w-[880px] px-4 py-6">
      <VaultHeader onAdd={() => setModalOpen(true)} />

      <div className="mt-5 space-y-3">
        <SearchBar />
        <FilterPills />
      </div>

      {entries.length === 0 ? (
        total === 0 ? (
          <div className="mt-24 flex flex-col items-center gap-3">
            <Vault size={36} strokeWidth={1} className="text-gold" />
            <p className="text-[13px] text-textMid">Your vault is empty. Add your first entry.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-control bg-gold px-3.5 py-2 text-[12px] font-medium text-void transition-colors duration-[180ms] hover:bg-gold/90"
            >
              + Add entry
            </button>
          </div>
        ) : (
          <p className="mt-16 text-center text-[13px] text-textLow">No entries match your search.</p>
        )
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-[11px] sm:grid-cols-2">
          {entries.map((e) => (
            <EntryCard key={e.id} entry={e} onViewImage={setViewerUrl} />
          ))}
        </div>
      )}

      {modalOpen && <AddEntryModal onClose={() => setModalOpen(false)} />}
      {viewerUrl && <ImageViewer url={viewerUrl} onClose={() => setViewerUrl(null)} />}
    </div>
  );
}
