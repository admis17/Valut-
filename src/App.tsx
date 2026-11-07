import { useState } from 'react';
import { VaultHeader, type TabId } from './components/VaultHeader';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { VaultView } from './components/VaultView';
import { TagsTab } from './components/TagsTab';
import { AddEntryModal } from './components/AddEntryModal';
import { ImageViewer } from './components/ImageViewer';

const TABS: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Overview' },
  { id: 'vault', label: 'Vault' },
  { id: 'tags', label: 'Tags' },
];

const LABELS: Record<TabId, string> = {
  dashboard: 'Dashboard',
  vault: 'Card Archive',
  tags: 'Tags',
};

export default function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const onAdd = () => setModalOpen(true);
  const onViewImage = (url: string) => setViewerUrl(url);

  return (
    <div className="mx-auto max-w-[1024px] px-4 py-6">
      <VaultHeader label={LABELS[tab]} tabs={TABS} active={tab} onTab={setTab} onAdd={onAdd} />
      {tab === 'dashboard' && <DashboardPage onAdd={onAdd} onViewImage={onViewImage} />}
      {tab === 'vault' && <VaultView onAdd={onAdd} onViewImage={onViewImage} />}
      {tab === 'tags' && <TagsTab onSwitch={() => setTab('vault')} />}
      {modalOpen && <AddEntryModal onClose={() => setModalOpen(false)} />}
      {viewerUrl && <ImageViewer url={viewerUrl} onClose={() => setViewerUrl(null)} />}
    </div>
  );
}
