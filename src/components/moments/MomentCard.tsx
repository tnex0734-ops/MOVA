import React from 'react';
import { Moment } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Users, ArrowRight, X } from 'lucide-react';
import { Button } from '../common/Button';
import { formatTimeRemaining } from '../../lib/utils';
import { Icon3D } from '../common/Icon3D';

interface MomentCardProps {
  moment: Moment;
  onJoin: (moment: Moment) => void;
  onPass: (moment: Moment) => void;
  onOpenThread: (moment: Moment) => void;
  isCompact?: boolean;
}

export const MomentCard: React.FC<MomentCardProps> = ({
  moment,
  onJoin,
  onPass,
  onOpenThread,
  isCompact = false,
}) => {
  const vibe = CANONICAL_VIBES.find((v) => v.id === moment.vibeId);

  return (
    <article
      className={`relative w-full rounded-bento bg-white border border-black/[0.06] shadow-bento hover:shadow-bento-hover transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        isCompact ? 'p-5' : 'p-6 sm:p-7'
      }`}
    >
      {/* Top Metadata Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-black/[0.03] text-mova-nearblack border border-black/[0.05] text-xs font-bold shadow-xs">
            {vibe?.icon3d ? (
              <Icon3D name={vibe.icon3d} size="xs" fallbackText={vibe.icon} />
            ) : (
              <span>{vibe?.icon}</span>
            )}
            <span>{vibe?.label}</span>
          </span>

          <span className="font-mono-tabular text-xs font-semibold px-2.5 py-1 rounded-pill bg-mova-ocean/5 text-mova-ocean flex items-center gap-1.5">
            <Icon3D name="clock" size="xs" />
            <span>{formatTimeRemaining(moment.remainingMinutes)}</span>
          </span>
        </div>

        {/* Photo Visual (if available) */}
        {moment.photoUrl && (
          <div className="mb-4 rounded-2xl overflow-hidden h-40 border border-black/[0.05] relative group">
            <img
              src={moment.photoUrl}
              alt={moment.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {moment.distanceMeters && (
              <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono-tabular font-bold px-3 py-1 rounded-full shadow-sm">
                📍 {moment.distanceMeters}m away · {moment.walkingMinutes || 2}m walk
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="leading-snug mb-2">
          <button
            type="button"
            onClick={() => onOpenThread(moment)}
            className="font-crayon text-2xl font-bold text-mova-ocean hover:text-mova-ocean-hover cursor-pointer leading-snug transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded"
            aria-label={`Open living thread for ${moment.title}`}
          >
            {moment.title}
          </button>
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-mova-muted font-medium mb-3">
          <Icon3D name="location" size="xs" />
          <span className="truncate font-semibold text-mova-nearblack">{moment.location}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-mova-muted line-clamp-2 leading-relaxed mb-5">
          {moment.description}
        </p>
      </div>

      {/* Bottom Section: Participants & Actions */}
      <div>
        <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between mb-5">
          {/* Participant Avatars */}
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2 overflow-hidden">
              {moment.participants.slice(0, 4).map((p) => (
                <img
                  key={p.id}
                  src={p.avatar}
                  alt={p.name}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-mova-nearblack flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-mova-muted" />
              <span>{moment.participantCount} in</span>
            </span>
          </div>

          {moment.hasDrop && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-mova-orange-light/70 text-mova-ocean flex items-center gap-1 shadow-xs border border-mova-orange/30">
              <Icon3D name="spark" size="xs" />
              <span>Drop Attached</span>
            </span>
          )}
        </div>

        {/* Action Buttons: Pass vs Join */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => onPass(moment)}
            aria-label={`Pass ${moment.title}`}
            className="flex items-center justify-center gap-1.5 text-xs text-mova-muted hover:text-mova-nearblack min-h-[42px]"
          >
            <X className="w-3.5 h-3.5" />
            <span>Pass</span>
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => onJoin(moment)}
            aria-label={`Join ${moment.title}`}
            className="flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm min-h-[42px]"
          >
            <span>I'm In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
};
