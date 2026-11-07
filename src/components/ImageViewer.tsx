import { useEffect } from 'react';
import { X } from 'lucide-react';

export function ImageViewer({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.95)] p-4"
    >
      <button
        aria-label="Close viewer"
        onClick={onClose}
        className="absolute right-5 top-5 text-gold transition-colors duration-[180ms] hover:text-textHi"
      >
        <X size={22} />
      </button>
      <img
        src={url}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-card"
      />
    </div>
  );
}
