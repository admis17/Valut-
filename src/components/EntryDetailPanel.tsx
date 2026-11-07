import { useEffect, useRef, useState } from 'react';
import { FileText, Image as ImageIcon } from 'lucide-react';
import { useVaultStore } from '../store/useVaultStore';
import type { Entry } from '../types/entry';

const IMG_ACCEPT = 'image/jpeg,image/png,image/webp';
const DOC_ACCEPT = 'application/pdf,image/jpeg,image/png,.doc,.docx,.csv,.xlsx,.xls,.txt';

// Chrome blocks top-frame navigation to `data:` URLs — pass through a blob: URL instead.
async function openDataUrl(url: string) {
  const blob = await fetch(url).then((r) => r.blob());
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 60_000);
}

type SlotValue = string | null;

function FileSlotRow({
  kind,
  label,
  url,
  accept,
  onPick,
  onRemove,
  onOpen,
}: {
  kind: 'image' | 'file';
  label: string;
  url: SlotValue;
  accept: string;
  onPick: (dataUrl: string) => void;
  onRemove: () => void;
  onOpen: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isImage = url !== null && url.startsWith('data:image');

  return (
    <div
      onClick={() => !url && inputRef.current?.click()}
      className={`flex min-h-[68px] items-center gap-2 rounded-control border px-3 ${
        url ? 'border-goldline bg-goldDim' : 'cursor-pointer border-dashed border-line bg-void'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') onPick(reader.result);
          };
          reader.readAsDataURL(file);
          e.target.value = '';
        }}
      />
      {url ? (
        isImage ? (
          <img src={url} className="h-11 w-11 shrink-0 rounded-control object-cover" />
        ) : (
          <FileText size={16} className="shrink-0 text-gold" />
        )
      ) : kind === 'image' ? (
        <ImageIcon size={16} className="text-textLow" />
      ) : (
        <FileText size={16} className="text-textLow" />
      )}
      {url ? (
        <>
          <span className="truncate text-[12px] text-textHi">{label}</span>
          <span className="ml-auto flex shrink-0 items-center gap-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isImage) onOpen(url);
                else void openDataUrl(url);
              }}
              className="text-[11px] text-gold"
            >
              Open
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="text-[10px] uppercase tracking-[0.08em] text-textLow transition-colors duration-[180ms] hover:text-gold"
            >
              Replace
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Remove ${label.toLowerCase()}?`)) onRemove();
              }}
              className="text-[10px] uppercase tracking-[0.08em] text-textLow transition-colors duration-[180ms] hover:text-gold"
            >
              Remove
            </button>
          </span>
        </>
      ) : (
        <span className="truncate text-[11px] text-textLow">{label} — no file yet</span>
      )}
    </div>
  );
}

export function EntryDetailPanel({
  entry,
  onViewImage,
}: {
  entry: Entry;
  onViewImage: (url: string) => void;
}) {
  const updateEntry = useVaultStore((s) => s.updateEntry);
  const deleteEntry = useVaultStore((s) => s.deleteEntry);
  const setSelected = useVaultStore((s) => s.setSelected);
  const [notes, setNotes] = useState(entry.notes);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => setNotes(entry.notes), [entry.id]);

  // auto-grow
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [notes]);

  // slot visibility follows the entry's type: card → front/back/pdf, brochure → brochure, both → all
  const hasCardSlots = entry.type === 'card' || entry.type === 'both';
  const hasBrochureSlot = entry.type === 'brochure' || entry.type === 'both';

  return (
    <div className="rounded-card border-[0.5px] border-line bg-panel p-3.5">
      <div className="border-b border-line pb-2 text-[10px] uppercase tracking-[0.08em] text-gold">
        {entry.companyName} — files & notes
      </div>

      <div className="mt-2.5 space-y-2">
        {hasCardSlots && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <FileSlotRow
                kind="image"
                label="Front"
                accept={IMG_ACCEPT}
                url={entry.cardFrontUrl ?? null}
                onPick={(u) => updateEntry(entry.id, { cardFrontUrl: u })}
                onRemove={() => updateEntry(entry.id, { cardFrontUrl: undefined })}
                onOpen={onViewImage}
              />
              <FileSlotRow
                kind="image"
                label="Back"
                accept={IMG_ACCEPT}
                url={entry.cardBackUrl ?? null}
                onPick={(u) => updateEntry(entry.id, { cardBackUrl: u })}
                onRemove={() => updateEntry(entry.id, { cardBackUrl: undefined })}
                onOpen={onViewImage}
              />
            </div>
            <FileSlotRow
              kind="file"
              label="Card PDF"
              accept={DOC_ACCEPT}
              url={entry.cardDocUrl ?? null}
              onPick={(u) => updateEntry(entry.id, { cardDocUrl: u })}
              onRemove={() => updateEntry(entry.id, { cardDocUrl: undefined })}
              onOpen={onViewImage}
            />
          </>
        )}
        {hasBrochureSlot && (
          <FileSlotRow
            kind="file"
            label="Brochure"
            accept={DOC_ACCEPT}
            url={entry.brochureFileUrl ?? null}
            onPick={(u) => updateEntry(entry.id, { brochureFileUrl: u })}
            onRemove={() => updateEntry(entry.id, { brochureFileUrl: undefined })}
            onOpen={onViewImage}
          />
        )}
      </div>

      <label className="mt-2.5 block text-[10px] uppercase tracking-[0.08em] text-textLow">
        Notes
      </label>
      <textarea
        ref={textareaRef}
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mt-1 block min-h-[78px] w-full resize-none rounded-control border-[0.5px] border-line bg-void px-3 py-2 text-[13px] leading-[1.65] text-textHi focus:border-goldline focus:outline-none focus:ring-2 focus:ring-goldFocus"
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => updateEntry(entry.id, { notes })}
          className="rounded-control bg-gold px-3.5 py-1.5 text-[12px] font-medium text-void transition-colors duration-[180ms] hover:bg-gold/90"
        >
          Save
        </button>
        <button
          onClick={() => {
            if (window.confirm('Delete this entry permanently?')) {
              deleteEntry(entry.id);
              setSelected(null);
            }
          }}
          className="text-[12px] text-textLow transition-colors duration-[180ms] hover:text-gold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
