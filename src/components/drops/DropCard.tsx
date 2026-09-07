import React from 'react';
import { Drop } from '../../types/mova';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { formatSecondsToTimer } from '../../lib/utils';
import { Icon3D } from '../common/Icon3D';

interface DropCardProps {
  drop: Drop;
  onOpenDrop: (drop: Drop) => void;
}

export const DropCard: React.FC<DropCardProps> = ({ drop, onOpenDrop }) => {
  const isLive = drop.status === 'active';

  return (
    <div className="relative w-full rounded-bento bg-white border border-black/[0.06] shadow-bento hover:shadow-bento-hover transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
      
      {/* Background Gold Accent Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-mova-orange-light/50 pointer-events-none blur-2xl" />

      <div>
        {/* Drop Tag & Countdown */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-mova-orange-light/80 text-mova-ocean border border-mova-orange/20 text-xs font-bold shadow-xs">
            <Icon3D name="spark" size="xs" />
            <span>{isLive ? '● LIVE 5-MIN DROP' : drop.status.toUpperCase()}</span>
          </span>

          <span className="font-mono-tabular text-xs font-extrabold px-3 py-1 rounded-pill bg-mova-ocean text-white flex items-center gap-1.5 shadow-sm">
            <Icon3D name="clock" size="xs" />
            <span>{formatSecondsToTimer(drop.remainingSeconds)}</span>
          </span>
        </div>

        {/* Drop Title & Prompt */}
        <h3 className="font-extrabold text-xs uppercase tracking-wider text-mova-muted mb-1.5">
          {drop.title}
        </h3>
        <p className="font-crayon text-2xl font-bold text-mova-ocean leading-snug mb-5">
          "{drop.prompt}"
        </p>

        {/* Preview Image thumbnails if any */}
        {drop.previewImages.length > 0 && (
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            {drop.previewImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Drop thumbnail"
                className="w-full h-16 rounded-xl object-cover border border-black/[0.06] shadow-xs"
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Details & Action CTA */}
      <div>
        <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-mova-nearblack">
            <Users className="w-3.5 h-3.5 text-mova-muted" />
            <span>{drop.participantCount} participating</span>
          </div>

          <span className="text-xs text-mova-muted font-mono-tabular">
            <strong>{drop.contributionsCount}</strong> dropped
          </span>
        </div>

        <Button
          variant={isLive ? 'primary' : 'secondary'}
          size="md"
          onClick={() => onOpenDrop(drop)}
          disabled={drop.status === 'completed'}
          className="w-full flex items-center justify-center gap-2 font-bold shadow-sm py-3"
        >
          {isLive ? (
            <>
              <Icon3D name="photo" size="xs" />
              <span>DROP PERSPECTIVE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <span>View Completed Drop</span>
          )}
        </Button>
      </div>

    </div>
  );
};
