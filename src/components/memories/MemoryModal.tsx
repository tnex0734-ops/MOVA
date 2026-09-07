import React from 'react';
import { Memory } from '../../types/mova';
import { X, MapPin, Users, GitBranch, MessageSquare, Award } from 'lucide-react';
import { Button } from '../common/Button';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface MemoryModalProps {
  isOpen: boolean;
  memory: Memory | null;
  onClose: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({ isOpen, memory, onClose }) => {
  const modalRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
  });

  if (!isOpen || !memory) return null;

  const vibe = CANONICAL_VIBES.find((v) => v.id === memory.vibeId);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-mova-nearblack/50 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-drawer p-5 sm:p-8 shadow-2xl border border-mova-ice-border flex flex-col max-h-[90dvh] overflow-y-auto"
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close memory modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white flex items-center justify-center text-mova-muted hover:text-mova-nearblack shadow-xs transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Memory Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-tabular font-bold text-mova-muted">
              {memory.date}
            </span>
            <span className="text-xs text-mova-muted">·</span>
            <span className="text-xs font-bold text-mova-ocean flex items-center gap-1">
              <span>{vibe?.icon}</span>
              <span>{vibe?.label}</span>
            </span>
          </div>

          <h2 id="memory-modal-title" className="font-crayon text-3xl sm:text-4xl font-bold text-mova-nearblack leading-tight">
            {memory.title}
          </h2>

          <div className="flex items-center gap-2 text-xs text-mova-muted mt-1">
            <MapPin className="w-3.5 h-3.5 text-mova-ocean" />
            <span>{memory.location}</span>
          </div>
        </div>

        {/* Polaroids Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {memory.polaroidImages.map((img, i) => (
            <div
              key={i}
              style={{ transform: `rotate(${img.rotation}deg)` }}
              className="p-3 bg-white rounded-xl shadow-md border border-mova-ice-border transition-transform hover:rotate-0"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="font-crayon text-xs text-mova-nearblack text-center font-semibold">
                {img.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Scrapbook Reflection Note */}
        <div className="p-4 rounded-2xl bg-white border border-mova-ice-border shadow-xs mb-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-mova-muted block mb-1">
            Scrapbook Memory Note
          </span>
          <p className="font-crayon text-base text-mova-ocean leading-relaxed italic">
            "{memory.scrapbookNote}"
          </p>
        </div>

        {/* Highlight Quotes */}
        {memory.highlightQuotes.length > 0 && (
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-mova-muted block mb-2">
              Overheard in the Thread
            </span>
            <div className="flex flex-col gap-1.5">
              {memory.highlightQuotes.map((q, i) => (
                <span
                  key={i}
                  className="font-crayon text-xs text-mova-ocean bg-mova-ocean-light/50 px-3 py-1.5 rounded-lg border border-mova-ocean/10"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Summary Metric Ribbon */}
        <div className="p-3.5 rounded-xl bg-mova-ice-soft border border-mova-ice-border flex items-center justify-between text-xs mb-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-mova-ocean" />
              <strong>{memory.participantsCount}</strong> people
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-mova-muted" />
              <strong>{memory.contributionsCount}</strong> contributions
            </span>
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-mova-ice" />
              <strong>{memory.branchesCount}</strong> branches
            </span>
          </div>

          {memory.meetupOccurred && (
            <span className="font-bold text-mova-ocean flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Met in Real Life
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close Memory
          </Button>
        </div>

      </div>
    </div>
  );
};
