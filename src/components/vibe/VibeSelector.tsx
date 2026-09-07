import React from 'react';
import { VibeId } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Sparkles } from 'lucide-react';

import { Icon3D } from '../common/Icon3D';

interface VibeSelectorProps {
  selectedVibe: VibeId | 'all';
  onSelectVibe: (vibeId: VibeId | 'all') => void;
  onOpenSpark: () => void;
  onOpenCustomVibe?: () => void;
  variant?: 'bento' | 'chips' | 'auto';
}

export const VibeSelector: React.FC<VibeSelectorProps> = ({
  selectedVibe,
  onSelectVibe,
  onOpenSpark,
  onOpenCustomVibe,
  variant = 'auto',
}) => {
  // Horizontal chips variant for mobile / compact trays
  if (variant === 'chips') {
    return (
      <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 touch-pan-x" role="radiogroup" aria-label="Filter moments by current vibe">
        <button
          role="radio"
          aria-checked={selectedVibe === 'all'}
          onClick={() => onSelectVibe('all')}
          className={`shrink-0 px-3.5 py-2 rounded-pill text-xs font-bold transition-all flex items-center gap-1.5 min-h-[40px] ${
            selectedVibe === 'all'
              ? 'bg-mova-ocean text-white shadow-xs'
              : 'bg-white text-mova-nearblack border border-black/[0.08] hover:bg-black/[0.02]'
          }`}
        >
          <span>✨</span>
          <span className="font-crayon text-sm font-semibold">All Situations</span>
        </button>

        {CANONICAL_VIBES.map((vibe) => {
          const isSelected = selectedVibe === vibe.id;
          return (
            <button
              key={vibe.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectVibe(vibe.id)}
              className={`shrink-0 px-3.5 py-2 rounded-pill text-xs font-bold transition-all flex items-center gap-2 min-h-[40px] ${
                isSelected
                  ? 'bg-mova-ocean text-white shadow-xs'
                  : 'bg-white text-mova-nearblack border border-black/[0.08] hover:bg-black/[0.02]'
              }`}
            >
              {vibe.icon3d ? (
                <Icon3D name={vibe.icon3d} size="xs" fallbackText={vibe.icon} />
              ) : (
                <span aria-hidden="true">{vibe.icon}</span>
              )}
              <span className="font-crayon text-sm font-semibold">{vibe.label}</span>
              <span
                className={`text-[10px] font-mono-tabular px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/[0.05] text-mova-muted'
                }`}
              >
                {vibe.activeCount}
              </span>
            </button>
          );
        })}

        {onOpenCustomVibe && (
          <button
            type="button"
            onClick={onOpenCustomVibe}
            aria-label="Set custom vibe status"
            className="shrink-0 px-3 py-2 rounded-pill border border-dashed border-mova-ocean/40 text-[11px] font-bold text-mova-ocean bg-mova-ocean/5 hover:bg-mova-ocean/10 transition-colors min-h-[40px] whitespace-nowrap"
          >
            <span>+ Custom</span>
          </button>
        )}
      </div>
    );
  }

  // Default Bento Card layout (Desktop and comprehensive view)
  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-bento bg-white border border-black/[0.06] shadow-bento">
      <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.04]">
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-mova-muted">
            Current Vibe
          </h3>
          <p className="font-crayon text-xl text-mova-ocean font-bold leading-snug">
            Filter by situation
          </p>
        </div>
        <button
          onClick={() => onSelectVibe('all')}
          aria-label="Show all vibes"
          className={`text-xs px-3.5 py-1.5 rounded-pill transition-all font-semibold min-h-[36px] ${
            selectedVibe === 'all'
              ? 'bg-mova-ocean text-white shadow-xs'
              : 'bg-black/[0.03] text-mova-muted hover:text-mova-nearblack hover:bg-black/[0.06] border border-black/[0.05]'
          }`}
        >
          All
        </button>
      </div>

      {/* Canonical Vibe List */}
      <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Select your current vibe">
        {CANONICAL_VIBES.map((vibe) => {
          const isSelected = selectedVibe === vibe.id;
          return (
            <button
              key={vibe.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectVibe(vibe.id)}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-150 text-left select-none min-h-[44px] ${
                isSelected
                  ? 'bg-mova-ocean text-white shadow-sm'
                  : 'bg-transparent hover:bg-black/[0.03] text-mova-nearblack border border-transparent hover:border-black/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {vibe.icon3d ? (
                  <Icon3D name={vibe.icon3d} size="sm" fallbackText={vibe.icon} />
                ) : (
                  <span className="text-lg shrink-0" aria-hidden="true">
                    {vibe.icon}
                  </span>
                )}
                <span className="font-crayon text-base font-bold truncate">
                  {vibe.label}
                </span>
              </div>

              <span
                className={`font-mono-tabular text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-black/[0.04] text-mova-muted group-hover:bg-black/[0.06]'
                }`}
              >
                {vibe.activeCount}
              </span>
            </button>
          );
        })}

        {onOpenCustomVibe && (
          <button
            type="button"
            onClick={onOpenCustomVibe}
            className="w-full py-2.5 px-3 mt-1 rounded-xl border border-dashed border-black/[0.12] hover:border-mova-ocean/50 text-xs font-bold text-mova-ocean bg-black/[0.01] hover:bg-mova-ocean/5 flex items-center justify-center gap-1.5 transition-colors min-h-[40px]"
          >
            <span>+ Set Custom Vibe Status</span>
          </button>
        )}
      </div>

      {/* Spark Quick Creator Teaser */}
      <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
        <span className="text-mova-muted font-medium">Spontaneous plan?</span>
        <button
          onClick={onOpenSpark}
          className="font-crayon text-sm font-bold text-mova-ocean hover:text-mova-ocean-hover flex items-center gap-1.5 transition-colors min-h-[36px]"
        >
          <Sparkles className="w-3.5 h-3.5 text-mova-orange" />
          <span>+ Spark Moment</span>
        </button>
      </div>
    </div>
  );
};
