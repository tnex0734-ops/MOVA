import React, { useState } from 'react';
import { Moment, VibeId } from '../../types/mova';
import { WorldNode } from './WorldNode';
import { RealisticMap } from './RealisticMap';
import { Sparkles, MapPin, Map } from 'lucide-react';
import { CANONICAL_VIBES } from '../../data/mockVibes';

interface LiveWorldProps {
  moments: Moment[];
  selectedMoment: Moment | null;
  onSelectMoment: (moment: Moment) => void;
  selectedVibe: VibeId | 'all';
  onOpenSpark: () => void;
  onQuickJoin?: (moment: Moment) => void;
  onOpenThread?: (moment: Moment) => void;
}

export const LiveWorld: React.FC<LiveWorldProps> = ({
  moments,
  selectedMoment,
  onSelectMoment,
  selectedVibe,
  onOpenSpark,
  onQuickJoin,
  onOpenThread,
}) => {
  const [viewMode, setViewMode] = useState<'realistic' | 'network'>('realistic');
  const currentVibe = CANONICAL_VIBES.find((v) => v.id === selectedVibe);

  // If in realistic mode, render the full RealisticMap
  if (viewMode === 'realistic') {
    return (
      <RealisticMap
        moments={moments}
        selectedVibe={selectedVibe}
        activeMomentId={selectedMoment?.id}
        onSelectMoment={onSelectMoment}
        onQuickJoin={onQuickJoin || onSelectMoment}
        onOpenThread={onOpenThread}
        onSwitchToNetwork={() => setViewMode('network')}
      />
    );
  }

  // Filter moments matching vibe (or show all if 'all')
  const visibleMoments = selectedVibe === 'all' 
    ? moments 
    : moments.filter((m) => m.vibeId === selectedVibe);

  return (
    <div className="relative isolate overflow-hidden w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-bento bg-[#FCFBF8] border border-black/[0.06] shadow-bento flex flex-col select-none">
      
      {/* Live World Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 bg-mova-ocean/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-float pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-extrabold text-white tracking-wide">
            LIVE SOCIAL WORLD
          </span>
          <span className="text-xs text-white/40">·</span>
          <span className="text-xs font-crayon text-mova-orange font-bold">
            {currentVibe ? `${currentVibe.label} Field` : 'All Situations'}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setViewMode('realistic')}
            className="px-3.5 py-1.5 bg-white border-2 border-mova-ocean text-mova-ocean rounded-full text-xs font-bold hover:bg-mova-ocean hover:text-white flex items-center gap-1.5 shadow-float transition-all group"
          >
            <Map className="w-3.5 h-3.5 text-mova-ocean group-hover:text-white transition-colors" />
            <span>Campus Map</span>
          </button>
          <span className="text-xs font-mono-tabular bg-mova-ocean/90 text-white px-3 py-1.5 rounded-full border border-white/20 shadow-float">
            <strong className="text-mova-orange">{visibleMoments.length}</strong> active nodes
          </span>
        </div>
      </div>

      {/* SVG Curved Bezier Connector Lines Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0EBFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#002B4C" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Generate dynamic connectors between adjacent nodes */}
        {visibleMoments.map((node, i) => {
          if (i === 0) return null;
          const prev = visibleMoments[i - 1];
          const midX = (prev.coordinates.x + node.coordinates.x) / 2;
          const midY = (prev.coordinates.y + node.coordinates.y) / 2 - 8;

          return (
            <path
              key={`conn-${prev.id}-${node.id}`}
              d={`M ${prev.coordinates.x}% ${prev.coordinates.y}% Q ${midX}% ${midY}% ${node.coordinates.x}% ${node.coordinates.y}%`}
              fill="none"
              stroke="#A8DFF6"
              strokeWidth="2"
              strokeDasharray="4 6"
              strokeLinecap="round"
              className="opacity-80 transition-all duration-300"
            />
          );
        })}
      </svg>

      {/* Spatial Graph Interactive Area */}
      <div className="relative w-full h-full">
        {visibleMoments.map((m) => (
          <WorldNode
            key={m.id}
            moment={m}
            isSelected={selectedMoment?.id === m.id}
            onSelect={onSelectMoment}
          />
        ))}

        {/* User Anchor ("You Are Here") */}
        <div
          style={{ left: '50%', top: '50%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-0 opacity-80"
        >
          <div className="w-5 h-5 rounded-full bg-mova-orange/25 flex items-center justify-center animate-pulse">
            <div className="w-2.5 h-2.5 rounded-full bg-mova-orange" />
          </div>
          <span className="font-crayon text-[11px] text-mova-muted mt-1 whitespace-nowrap">
            Campus Hub
          </span>
        </div>

        {/* Empty State when filtered */}
        {visibleMoments.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-2xl bg-mova-ice-soft flex items-center justify-center text-mova-muted mb-2">
              <MapPin className="w-6 h-6 text-mova-ocean" />
            </div>
            <p className="font-crayon text-xl text-mova-ocean">
              It is quiet here right now.
            </p>
            <p className="text-xs text-mova-muted max-w-xs mt-1 mb-4">
              No active moments matching this vibe. Start one and let others join you!
            </p>
            <button
              onClick={onOpenSpark}
              className="px-5 py-2.5 rounded-pill bg-mova-ocean text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:bg-mova-ocean-hover transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-mova-orange" />
              <span>Spark First Moment</span>
            </button>
          </div>
        )}
      </div>

      {/* Map Footer Legend / Instruction */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] text-mova-muted bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-mova-border/60">
        <span className="font-medium">Click any node to inspect & join</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-mova-orange ring-2 ring-mova-orange/40" /> Hot
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white border border-mova-ocean" /> Active
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-mova-ice" /> Closing
          </span>
        </div>
      </div>

    </div>
  );
};
