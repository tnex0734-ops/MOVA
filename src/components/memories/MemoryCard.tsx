import React from 'react';
import { Memory } from '../../types/mova';
import { Users, GitBranch, MessageSquare } from 'lucide-react';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Icon3D } from '../common/Icon3D';

interface MemoryCardProps {
  memory: Memory;
  onOpenMemory: (memory: Memory) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onOpenMemory }) => {
  const vibe = CANONICAL_VIBES.find((v) => v.id === memory.vibeId);
  const primaryPolaroid = memory.polaroidImages[0];

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpenMemory(memory)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenMemory(memory);
        }
      }}
      aria-label={`Open memory archive for ${memory.title}`}
      className="relative w-full rounded-bento bg-[#FDFBF7] border border-mova-ice-border shadow-bento hover:shadow-bento-hover transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean"
    >
      {/* Tape Sticker Accent */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-mova-ice-soft/80 border border-mova-ice-border/60 rounded-xs shadow-xs transform rotate-1 pointer-events-none" />

      <div>
        {/* Header date & Vibe */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono-tabular font-bold uppercase tracking-wider text-mova-muted">
            {memory.date}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-mova-ice-soft border border-mova-ice-border font-bold text-mova-ocean flex items-center gap-1.5 shadow-xs">
            {vibe?.icon3d ? (
              <Icon3D name={vibe.icon3d} size="xs" fallbackText={vibe.icon} />
            ) : (
              <span>{vibe?.icon}</span>
            )}
            <span>{vibe?.label}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-crayon text-3xl font-bold text-mova-ocean group-hover:text-mova-ocean-hover transition-colors leading-tight mb-2">
          {memory.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-mova-muted font-medium mb-4">
          <Icon3D name="location" size="xs" />
          <span>{memory.location}</span>
        </div>

        {/* Polaroid Scrapbook Thumbnail */}
        {primaryPolaroid && (
          <div
            style={{ transform: `rotate(${primaryPolaroid.rotation || 1.5}deg)` }}
            className="p-3 bg-white rounded-xl shadow-md border border-mova-ice-border/80 mb-4 transition-transform group-hover:rotate-0"
          >
            <img
              src={primaryPolaroid.url}
              alt={primaryPolaroid.caption}
              className="w-full h-44 object-cover rounded-lg mb-2"
            />
            <p className="font-crayon text-xs text-mova-ocean text-center font-semibold">
              {primaryPolaroid.caption}
            </p>
          </div>
        )}

        {/* Scrapbook Note */}
        <p className="text-xs text-mova-ocean/80 leading-relaxed italic mb-4">
          "{memory.scrapbookNote}"
        </p>
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-mova-border/60 flex items-center justify-between text-xs text-mova-muted font-medium">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-mova-ocean" />
            <strong className="text-mova-ocean">{memory.participantsCount}</strong>
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-mova-muted" />
            <strong className="text-mova-ocean">{memory.contributionsCount}</strong>
          </span>
          <span className="flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5 text-mova-orange" />
            <strong className="text-mova-ocean">{memory.branchesCount}</strong>
          </span>
        </div>

        {memory.meetupOccurred && (
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-mova-ocean bg-mova-ice-soft px-2.5 py-1 rounded-full border border-mova-ice-border shadow-xs">
            <Icon3D name="trophy" size="xs" />
            <span>Met in Real Life</span>
          </span>
        )}
      </div>

    </article>
  );
};
