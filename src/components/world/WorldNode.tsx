import React from 'react';
import { Moment } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';

import { Icon3D } from '../common/Icon3D';

interface WorldNodeProps {
  moment: Moment;
  isSelected?: boolean;
  onSelect: (moment: Moment) => void;
}

export const WorldNode: React.FC<WorldNodeProps> = ({ moment, isSelected, onSelect }) => {
  const vibe = CANONICAL_VIBES.find((v) => v.id === moment.vibeId);

  // Map participant count to node scale
  const getNodeScaleClass = (count: number) => {
    if (count <= 3) return 'w-15 h-15 p-2';
    if (count <= 8) return 'w-18 h-18 p-2.5';
    if (count <= 18) return 'w-22 h-22 p-3';
    return 'w-26 h-26 p-3.5';
  };

  const isHot = moment.activityLevel === 'hot';
  const isEnding = moment.status === 'closing';

  return (
    <div
      style={{
        left: `${moment.coordinates.x}%`,
        top: `${moment.coordinates.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className="absolute group z-10 select-none"
    >
      {/* Concentric Pulse Rings for Hot / Active Nodes */}
      {isHot && (
        <span
          className="absolute inset-0 rounded-full bg-mova-orange/30 animate-ping"
          style={{ animationDuration: '2.5s' }}
          aria-hidden="true"
        />
      )}

      {/* Interactive Node Button */}
      <button
        onClick={() => onSelect(moment)}
        aria-label={`${moment.title}, ${moment.participantCount} people participating, ${moment.remainingMinutes} minutes remaining. Vibe: ${vibe?.label || 'General'}.`}
        className={`relative rounded-full flex flex-col items-center justify-center font-bold transition-transform duration-200 group-hover:scale-110 active:scale-95 shadow-md ${getNodeScaleClass(
          moment.participantCount
        )} ${
          isSelected
            ? 'bg-mova-ocean text-white ring-4 ring-mova-orange shadow-lg z-20 scale-105'
            : isHot
            ? 'bg-white text-mova-ocean border-2 border-mova-orange ring-2 ring-mova-orange/40'
            : isEnding
            ? 'bg-mova-ice-soft text-mova-muted border border-mova-ice-border opacity-85'
            : 'bg-white text-mova-ocean border border-mova-ice-border hover:border-mova-ocean'
        }`}
      >
        {vibe?.icon3d ? (
          <Icon3D
            name={vibe.icon3d}
            size={moment.participantCount <= 3 ? 'sm' : moment.participantCount <= 8 ? 'md' : 'lg'}
            fallbackText={vibe.icon}
          />
        ) : (
          <span className="text-xl leading-none" aria-hidden="true">
            {vibe?.icon || '●'}
          </span>
        )}
        <span className="font-mono-tabular text-[10px] font-extrabold mt-0.5">
          {moment.participantCount}
        </span>
      </button>

      {/* Floating Tactical Label */}
      <div
        className={`absolute left-1/2 -bottom-7 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-all duration-150 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight shadow-sm z-30 ${
          isSelected
            ? 'bg-mova-ocean text-white opacity-100 scale-100'
            : 'bg-white/95 text-mova-ocean border border-mova-border opacity-90 group-hover:opacity-100 group-hover:scale-105'
        }`}
      >
        <span className="font-crayon mr-1">{moment.title}</span>
        <span className="font-mono-tabular text-[9px] text-mova-muted">
          · {moment.remainingMinutes}m
        </span>
      </div>
    </div>
  );
};
