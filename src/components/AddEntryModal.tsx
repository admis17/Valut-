import { useCallback, useEffect, useState } from 'react';
import { FileText, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useVaultStore } from '../store/useVaultStore';
import type { Entry } from '../types/entry';

type FilePrep = { dataUrl: string; name: string } | null;

const IMG_ACCEPT = { 'image/jpeg': [], 'image/png': [], 'image/webp': [] };
const DOC_ACCEPT = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'text/csv': ['.csv'],
  'text/plain': ['.txt'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
};

const inputClass =
  'w-full rounded-control border-[0.5px] border-line bg-void px-3 py-2 text-[13px] text-textHi placeholder:text-textLow focus:border-goldline focus:outline-none focus:ring-2 focus:ring-goldFocus';
const labelClass = 'block text-[10px] uppercase tracking-[0.08em] text-textLow';

function readFile(file: File): Promise<{ dataUrl: string; name: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ dataUrl: String(reader.result), name: file.name });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function DropZone({
  title,
  kind,
  accept,
  file,
  onFile,
}: {
  title: string;
  kind: 'image' | 'file';
  accept: Record<string, string[]>;
  file: FilePrep;
  onFile: (f: FilePrep) => void;
}) {
  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (accepted[0]) onFile(await readFile(accepted[0]));
    },
    [onFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex h-[88px] cursor-pointer items-center justify-center rounded-control border border-dashed transition-colors duration-[180ms] ${
        isDragActive ? 'border-gold bg-goldDim' : 'border-goldline bg-void'
      }`}
    >
      <input {...getInputProps()} />
      {file ? (
        file.dataUrl.startsWith('data:image') ? (
          <img src={file.dataUrl} className="h-full w-full rounded-control object-cover" />
        ) : (
          <span className="flex items-center gap-2 px-2 text-center text-[11px] text-gold">
            <FileText size={14} /> {file.name}
          </span>
        )
      ) : (
        <span className="px-2 text-center text-[12px] text-textMid">
          {kind === 'image' ? `Drop ${title} here or click` : `${title} — drop or click`}
        </span>
      )}
    </div>
  );
}

export function AddEntryModal({ onClose }: { onClose: () => void }) {
  const addEntry = useVaultStore((s) => s.addEntry);
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [type, setType] = useState<Entry['type']>('card');
  const [notes, setNotes] = useState('');
  const [frontPrep, setFrontPrep] = useState<FilePrep>(null);
  const [backPrep, setBackPrep] = useState<FilePrep>(null);
  const [docPrep, setDocPrep] = useState<FilePrep>(null);
  const [brochurePrep, setBrochurePrep] = useState<FilePrep>(null);
  const [missingCompany, setMissingCompany] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // uploads follow the type: card → front/back/pdf, brochure → brochure, both → everything
  const switchType = (t: Entry['type']) => {
    setType(t);
    if (t === 'card') setBrochurePrep(null);
    if (t === 'brochure') {
      setFrontPrep(null);
      setBackPrep(null);
      setDocPrep(null);
    }
  };

  const save = () => {
    if (!company.trim()) {
      setMissingCompany(true);
      return;
    }
    const now = new Date().toISOString();
    addEntry({
      id: crypto.randomUUID(),
      companyName: company.trim(),
      contactName: contact.trim(),
      role: role.trim(),
      industry: industry.trim(),
      type,
      cardFrontUrl: frontPrep?.dataUrl,
      cardBackUrl: backPrep?.dataUrl,
      cardDocUrl: docPrep?.dataUrl,
      brochureFileUrl: brochurePrep?.dataUrl,
      notes: notes.trim(),
      createdAt: now,
      updatedAt: now,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,0,0,0.85)] p-4 max-md:p-0">
      <div className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-modal border-[0.5px] border-line bg-panel p-5 max-md:h-full max-md:max-h-none max-md:rounded-none">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] uppercase tracking-[0.08em] text-gold">New entry</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-textMid transition-colors duration-[180ms] hover:text-gold focus:outline-none focus:ring-2 focus:ring-goldFocus"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 space-y-3.5">
          <div>
            <label className={labelClass}>Company name *</label>
            <input
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setMissingCompany(false);
              }}
              placeholder="Acme Corp"
              autoFocus
              className={`mt-1 block ${inputClass} ${missingCompany ? 'border-goldline' : ''}`}
            />
            {missingCompany && <p className="mt-1 text-[11px] text-gold">Company name is required.</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Contact name</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Jane Doe"
                className={`mt-1 block ${inputClass}`}
              />
            </div>
            <div>
              <label className={labelClass}>Role / title</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Sales lead"
                className={`mt-1 block ${inputClass}`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Industry</label>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Consulting"
              className={`mt-1 block ${inputClass}`}
            />
          </div>

          <div>
            <label className={labelClass}>Type</label>
            <div className="mt-1 flex rounded-control border-[0.5px] border-line bg-void p-1">
              {(['card', 'brochure', 'both'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => switchType(t)}
                  className={`flex-1 rounded-[6px] py-1.5 text-[12px] transition-colors duration-[180ms] ${
                    type === t ? 'bg-gold text-void' : 'text-textMid hover:text-textHi'
                  }`}
                >
                  {t[0].toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {(type === 'card' || type === 'both') && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <DropZone title="front scan" kind="image" accept={IMG_ACCEPT} file={frontPrep} onFile={setFrontPrep} />
                <DropZone title="back scan" kind="image" accept={IMG_ACCEPT} file={backPrep} onFile={setBackPrep} />
              </div>
              <DropZone title="Card document (pdf/word/excel/…)" kind="file" accept={DOC_ACCEPT} file={docPrep} onFile={setDocPrep} />
            </>
          )}
          {(type === 'brochure' || type === 'both') && (
            <DropZone title="Brochure (pdf/image/doc)" kind="file" accept={DOC_ACCEPT} file={brochurePrep} onFile={setBrochurePrep} />
          )}

          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`mt-1 block min-h-[78px] resize-none leading-[1.65] ${inputClass}`}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={onClose}
              className="rounded-control border-[0.5px] border-line px-3.5 py-1.5 text-[12px] text-textMid transition-colors duration-[180ms] hover:text-textHi"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="rounded-control bg-gold px-3.5 py-1.5 text-[12px] font-medium text-void transition-colors duration-[180ms] hover:bg-gold/90"
            >
              Save to vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
