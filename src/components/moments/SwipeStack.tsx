import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Moment } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Users, ArrowRight, X, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { formatTimeRemaining } from '../../lib/utils';
import { Icon3D } from '../common/Icon3D';
import { announce } from '../common/LiveAnnouncer';

interface SwipeStackProps {
  moments: Moment[];
  onJoin: (moment: Moment) => void;
  onPass: (moment: Moment) => void;
  onOpenThread: (moment: Moment) => void;
  onResetStack: () => void;
  onUndoPass?: (restored: Moment) => void;
  onChangeVibe?: () => void;
  onExploreAll?: () => void;
  onStartSomething?: () => void;
}

export const SwipeStack: React.FC<SwipeStackProps> = ({
  moments,
  onJoin,
  onPass,
  onOpenThread,
  onResetStack,
  onUndoPass,
  onChangeVibe,
  onExploreAll,
  onStartSomething,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastPassedMoment, setLastPassedMoment] = useState<Moment | null>(null);
  const [showGestureHint, setShowGestureHint] = useState<boolean>(() => {
    return !localStorage.getItem('mova_swipe_hint_dismissed');
  });

  const dismissGestureHint = () => {
    setShowGestureHint(false);
    localStorage.setItem('mova_swipe_hint_dismissed', 'true');
  };

  // Active moment is at currentIndex
  const activeMoment = moments[currentIndex];
  const nextMoment = moments[currentIndex + 1];

  // Motion values for swipe physics
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
  const joinStampOpacity = useTransform(x, [30, 120], [0, 1]);
  const passStampOpacity = useTransform(x, [-30, -120], [0, 1]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 120;
    if (showGestureHint) dismissGestureHint();

    if (info.offset.x > threshold) {
      // Swiped Right -> I'm In
      if (activeMoment) {
        announce(`Joining ${activeMoment.title}. Opening confirmation.`);
        onJoin(activeMoment);
      }
      x.set(0);
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x < -threshold) {
      // Swiped Left -> Pass
      if (activeMoment) {
        announce(`Passed ${activeMoment.title}.`);
        setLastPassedMoment(activeMoment);
        onPass(activeMoment);
      }
      x.set(0);
      setCurrentIndex((prev) => prev + 1);
    } else {
      x.set(0);
    }
  };

  const handleExplicitPass = () => {
    if (!activeMoment) return;
    if (showGestureHint) dismissGestureHint();
    announce(`Passed ${activeMoment.title}.`);
    setLastPassedMoment(activeMoment);
    onPass(activeMoment);
    x.set(0);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleExplicitJoin = () => {
    if (!activeMoment) return;
    if (showGestureHint) dismissGestureHint();
    announce(`Joining ${activeMoment.title}. Opening confirmation.`);
    onJoin(activeMoment);
    x.set(0);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleUndoPass = () => {
    if (currentIndex > 0) {
      const restored = moments[currentIndex - 1];
      setCurrentIndex((prev) => prev - 1);
      setLastPassedMoment(null);
      announce('Restored passed moment.');
      if (onUndoPass && restored) {
        onUndoPass(restored);
      }
    }
  };

  if (!activeMoment) {
    return (
      <div className="w-full min-h-[500px] rounded-bento bg-white border border-black/[0.06] shadow-bento flex flex-col items-center justify-center p-8 sm:p-12 text-center select-none">
        <div className="w-20 h-20 rounded-full bg-black/[0.03] flex items-center justify-center text-mova-maroon mb-4 shadow-sm">
          <Icon3D name="spark" size="xl" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-mova-gold mb-1">
          Discovery Complete
        </span>
        <h3 className="font-crayon text-3xl sm:text-4xl text-mova-nearblack mb-2">
          You've seen everything for now.
        </h3>
        <p className="text-xs text-mova-muted max-w-md mb-6 leading-relaxed">
          No more moments match your current filter. Try exploring all situations, switching to a different vibe, or igniting a spontaneous plan.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onChangeVibe && (
            <Button variant="secondary" size="md" onClick={onChangeVibe}>
              Change Vibe
            </Button>
          )}
          {onExploreAll && (
            <Button variant="secondary" size="md" onClick={onExploreAll}>
              Explore All
            </Button>
          )}
          {onStartSomething && (
            <Button variant="primary" size="md" onClick={onStartSomething}>
              + Start Something
            </Button>
          )}
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setCurrentIndex(0);
              onResetStack();
            }}
            className="flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rewind Stack</span>
          </Button>
        </div>
      </div>
    );
  }

  const vibe = CANONICAL_VIBES.find((v) => v.id === activeMoment.vibeId);

  return (
    <div className="relative w-full min-h-[540px] flex flex-col items-center justify-center select-none">
      
      {/* Dynamic First-Use Gesture Guidance & Undo Recovery Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 px-2 min-h-[32px]">
        {showGestureHint ? (
          <div className="w-full py-1.5 px-3.5 rounded-full bg-mova-maroon/10 border border-mova-maroon/20 text-mova-maroon text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
            <span className="flex items-center gap-2">
              <span>👉 <strong>Swipe Right</strong> to Join</span>
              <span className="text-black/20">·</span>
              <span>👈 <strong>Swipe Left</strong> to Pass</span>
            </span>
            <button
              onClick={dismissGestureHint}
              aria-label="Dismiss gesture hint"
              className="text-mova-maroon/70 hover:text-mova-maroon text-[11px] font-bold ml-2 underline"
            >
              Got it
            </button>
          </div>
        ) : lastPassedMoment && currentIndex > 0 ? (
          <button
            onClick={handleUndoPass}
            className="py-1 px-3 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-xs font-bold text-mova-nearblack border border-black/[0.08] flex items-center gap-1.5 transition-all shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-mova-gold" />
            <span>Undo pass: {lastPassedMoment.title.substring(0, 20)}...</span>
          </button>
        ) : (
          <div className="text-[11px] font-mono-tabular text-mova-muted">
            Card {currentIndex + 1} of {moments.length}
          </div>
        )}
      </div>

      {/* Background Layer (Next Card Preview) */}
      {nextMoment && (
        <div className="absolute top-11 w-[94%] h-[470px] rounded-bento bg-black/[0.02] border border-black/[0.05] shadow-xs transform translate-y-2 scale-95 opacity-60 pointer-events-none transition-all" />
      )}

      {/* Foreground Swipeable Card */}
      <AnimatePresence>
        <motion.div
          key={activeMoment.id}
          style={{ x, rotate }}
          drag="x"
          dragElastic={0.65}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="relative w-full min-h-[470px] sm:h-[480px] rounded-bento bg-white border border-black/[0.08] shadow-bento hover:shadow-bento-hover p-5 sm:p-8 flex flex-col justify-between cursor-grab active:cursor-grabbing z-20 overflow-hidden touch-pan-y"
        >
          {/* I'M IN! Stamp Overlay (Right Swipe) */}
          <motion.div
            style={{ opacity: joinStampOpacity }}
            className="absolute top-8 left-8 border-4 border-mova-ocean text-mova-ocean rounded-2xl px-5 py-2 transform -rotate-12 pointer-events-none z-30 font-crayon font-bold text-3xl tracking-wider uppercase shadow-stamp bg-white/95"
          >
            I'M IN!
          </motion.div>

          {/* PASS Stamp Overlay (Left Swipe) */}
          <motion.div
            style={{ opacity: passStampOpacity }}
            className="absolute top-8 right-8 border-4 border-mova-muted text-mova-muted rounded-2xl px-5 py-2 transform rotate-12 pointer-events-none z-30 font-crayon font-bold text-3xl tracking-wider uppercase bg-white/95"
          >
            PASS
          </motion.div>

          {/* Card Top Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-mova-ice-soft border border-mova-ice-border text-xs font-bold shadow-xs">
                {vibe?.icon3d ? (
                  <Icon3D name={vibe.icon3d} size="sm" fallbackText={vibe.icon} />
                ) : (
                  <span className="text-base">{vibe?.icon}</span>
                )}
                <span className="text-mova-ocean">{vibe?.label}</span>
              </span>

              <span className="font-mono-tabular text-xs font-semibold px-3.5 py-1.5 rounded-pill bg-white text-mova-ocean border border-mova-ice-border flex items-center gap-1.5 shadow-xs">
                <Icon3D name="clock" size="xs" />
                <span>{formatTimeRemaining(activeMoment.remainingMinutes)}</span>
              </span>
            </div>

            <h2 className="leading-tight mb-3">
              <button
                type="button"
                onClick={() => onOpenThread(activeMoment)}
                className="font-crayon text-3xl sm:text-4xl font-bold text-mova-ocean hover:text-mova-ocean-hover cursor-pointer text-left leading-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded-lg"
                aria-label={`Open living thread for ${activeMoment.title}`}
              >
                {activeMoment.title}
              </button>
            </h2>

            <div className="flex items-center gap-2 text-xs text-mova-muted font-medium mb-4">
              <Icon3D name="location" size="xs" />
              <span className="text-sm font-semibold text-mova-ocean/90">
                {activeMoment.location}
              </span>
            </div>

            <p className="text-sm text-mova-ocean/80 leading-relaxed line-clamp-3 mb-4">
              {activeMoment.description}
            </p>
          </div>

          {/* Card Bottom: Participants & Actions */}
          <div>
            <div className="pt-4 border-t border-mova-border/60 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  {activeMoment.participants.slice(0, 5).map((p) => (
                    <img
                      key={p.id}
                      src={p.avatar}
                      alt={p.name}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-mova-ocean flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-mova-muted" />
                    <span>{activeMoment.participantCount} participating</span>
                  </span>
                  <span className="text-[10px] text-mova-muted">
                    Hosted by {activeMoment.initiator.name}
                  </span>
                </div>
              </div>

              {activeMoment.hasDrop && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-mova-orange-light text-mova-ocean flex items-center gap-1.5 shadow-xs border border-mova-orange/40">
                  <Icon3D name="spark" size="xs" />
                  <span>Drop Ready</span>
                </span>
              )}
            </div>

            {/* Explicit Touch / Click Controls */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={handleExplicitPass}
                aria-label={`Pass ${activeMoment.title} (Left arrow)`}
                className="flex items-center justify-center gap-2 border-mova-ice-border min-h-[44px]"
              >
                <X className="w-4 h-4 text-mova-ice" />
                <span className="font-semibold text-mova-muted">Pass (←)</span>
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleExplicitJoin}
                aria-label={`Join ${activeMoment.title} (Right arrow)`}
                className="flex items-center justify-center gap-2 font-bold shadow-md min-h-[44px]"
              >
                <span>I'm In (→)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Swipe Gesture Accessibility Hint */}
      <p className="font-crayon text-xs text-mova-muted mt-3 text-center">
        Drag card left to Pass or right to Join · Keyboard: ← / →
      </p>

    </div>
  );
};
