import type { ReactNode } from 'react';
import { Maximize2, Trash2, Vault } from 'lucide-react';
import { useVaultStore } from '../store/useVaultStore';
import { EntryDetailPanel } from './EntryDetailPanel';
import type { Entry } from '../types/entry';

const TYPE_STYLES: Record<Entry['type'], string> = {
  card: 'border-goldline bg-goldDim text-gold',
  brochure: 'border-line bg-transparent text-textMid',
  both: 'border-goldline bg-gold text-void',
};

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="rounded text-textMid transition-colors duration-[180ms] hover:text-gold focus:outline-none focus:ring-2 focus:ring-goldFocus"
    >
      {children}
    </button>
  );
}

function firstImage(...urls: Array<string | undefined>): string | null {
  for (const u of urls) if (u && u.startsWith('data:image')) return u;
  return null;
}

export function EntryCard({
  entry,
  onViewImage,
  thumbH = 'md',
  inlinePanel = true,
  clickToExpand = false,
}: {
  entry: Entry;
  onViewImage: (url: string) => void;
  thumbH?: 'md' | 'sm';
  inlinePanel?: boolean;
  clickToExpand?: boolean;
}) {
  const selectedId = useVaultStore((s) => s.selectedId);
  const setSelected = useVaultStore((s) => s.setSelected);
  const deleteEntry = useVaultStore((s) => s.deleteEntry);
  const open = selectedId === entry.id;
  const thumb = firstImage(entry.cardFrontUrl, entry.cardBackUrl, entry.brochureFileUrl);
  const thumbClass = thumbH === 'sm' ? 'h-[38px]' : 'h-[52px]';
  const contact = [entry.contactName, entry.role].filter(Boolean).join(' · ');

  return (
    <div
      onClick={clickToExpand ? () => setSelected(open ? null : entry.id) : undefined}
      className={`rounded-card border-[0.5px] bg-vault p-3.5 transition-transform duration-[180ms] ${
        open ? 'border-[rgba(255,184,0,0.5)]' : 'border-line hover:-translate-y-px'
      } ${clickToExpand ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-medium text-textHi">{entry.companyName}</h3>
          {contact && <p className="mt-0.5 truncate text-[11px] text-textMid">{contact}</p>}
        </div>
        <span
          className={`shrink-0 rounded-full border-[0.5px] px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] ${TYPE_STYLES[entry.type]}`}
        >
          {entry.type}
        </span>
      </div>

      {thumb ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewImage(thumb);
          }}
          aria-label={`View ${entry.companyName} image`}
          className={`relative mt-2.5 block w-full overflow-hidden rounded-control focus:outline-none focus:ring-2 focus:ring-goldFocus ${thumbClass}`}
        >
          <img src={thumb} className="h-full w-full object-cover" />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,184,0,0.07),rgba(10,10,10,0.9))]" />
        </button>
      ) : (
        <div
          className={`mt-2.5 flex items-center justify-center rounded-control border-[0.5px] border-line bg-panel ${thumbClass}`}
        >
          <Vault size={14} className="text-textLow" />
        </div>
      )}

      {entry.notes && (
        <p className="mt-2 line-clamp-2 text-[11px] leading-[1.65] text-textMid">{entry.notes}</p>
      )}

      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[10px] text-textLow">
          {new Date(entry.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2">
          <IconButton
            label={open ? 'Collapse entry' : 'Expand entry'}
            onClick={() => setSelected(open ? null : entry.id)}
          >
            <Maximize2 size={13} />
          </IconButton>
          <IconButton
            label="Delete entry"
            onClick={() => {
              if (window.confirm('Delete this entry?')) deleteEntry(entry.id);
            }}
          >
            <Trash2 size={13} />
          </IconButton>
        </div>
      </div>

      {inlinePanel && open && <EntryDetailPanel entry={entry} onViewImage={onViewImage} />}
    </div>
  );
}
