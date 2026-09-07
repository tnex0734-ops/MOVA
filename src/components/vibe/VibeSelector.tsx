import React from 'react';
import { VibeId } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Sparkles } from 'lucide-react';

import { Icon3D } from '../common/Icon3D';

interface VibeSelectorProps {
  selectedVibe: VibeId | 'all';
  onSelectVibe: (vibeId: VibeId | 'all') => void;
  onOpenSpark: () => void;
}

export const VibeSelector: React.FC<VibeSelectorProps> = ({
  selectedVibe,
  onSelectVibe,
  onOpenSpark,
}) => {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-bento bg-white border border-black/[0.06] shadow-bento">
      <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-mova-muted">
            Current Vibe
          </h3>
          <p className="font-crayon text-lg text-mova-nearblack leading-snug">
            Filter by situation
          </p>
        </div>
        <button
          onClick={() => onSelectVibe('all')}
          className={`text-xs px-3.5 py-1.5 rounded-pill transition-all font-semibold ${
            selectedVibe === 'all'
              ? 'bg-mova-ocean text-white shadow-xs'
              : 'bg-black/[0.03] text-mova-muted hover:text-mova-nearblack hover:bg-black/[0.06] border border-black/[0.05]'
          }`}
        >
          All
        </button>
      </div>

      {/* Spacious Canonical Vibe List */}
      <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Select your current vibe">
        {CANONICAL_VIBES.map((vibe) => {
          const isSelected = selectedVibe === vibe.id;
          return (
            <button
              key={vibe.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectVibe(vibe.id)}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-150 text-left select-none ${
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
                <span className="text-xs font-bold truncate">
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
      </div>

      {/* Spark Quick Creator Teaser */}
      <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
        <span className="text-mova-muted">Spontaneous plan?</span>
        <button
          onClick={onOpenSpark}
          className="font-bold text-mova-ocean hover:text-mova-ocean-hover flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-mova-orange" />
          <span>+ Spark Moment</span>
        </button>
      </div>
    </div>
  );
};
