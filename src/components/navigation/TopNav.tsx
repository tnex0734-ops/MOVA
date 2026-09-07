import React from 'react';
import { Volume2, VolumeX, Bell, HelpCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { VibeId } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Icon3D } from '../common/Icon3D';
import movaLogo from '../../assets/MOVALOGO.png';

interface TopNavProps {
  activeTab: 'now' | 'drops' | 'memories';
  onSelectTab: (tab: 'now' | 'drops' | 'memories') => void;
  currentVibeId: VibeId | 'all';
  onOpenSpark: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  totalMomentsCount: number;
  totalParticipantsCount: number;
  activeDropsCount: number;
  unreadActivitiesCount?: number;
  onOpenActivity?: () => void;
  onOpenIdentity?: () => void;
  onOpenOnboarding?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  currentVibeId,
  onOpenSpark,
  isSoundEnabled,
  onToggleSound,
  totalMomentsCount,
  totalParticipantsCount,
  activeDropsCount,
  unreadActivitiesCount = 0,
  onOpenActivity,
  onOpenIdentity,
  onOpenOnboarding,
}) => {
  const currentVibe = CANONICAL_VIBES.find((v) => v.id === currentVibeId);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-6 lg:px-14 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-2.5 sm:gap-6 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded-2xl min-h-[44px]"
            onClick={() => onSelectTab('now')}
            aria-label="MOVA Home - Now World"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-mova-ocean border border-mova-orange/30 shadow-sm p-1 sm:p-1.5 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={movaLogo}
                alt="MOVA Logo"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-mova-ocean leading-none group-hover:text-mova-ocean-hover transition-colors">
                MOVA
              </span>
              <span className="font-crayon text-xs text-mova-ocean/85 font-semibold -mt-0.5 tracking-wide hidden md:block">
                Follow Moments
              </span>
            </div>
          </button>

          {/* Metrics Ribbon (Desktop only) */}
          <div className="hidden xl:flex items-center gap-4 pl-6 border-l border-black/[0.06] text-xs font-mono-tabular text-mova-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-mova-nearblack">{totalMomentsCount}</strong> MOMENTS
            </span>
            <span className="text-black/20">·</span>
            <span>
              <strong className="text-mova-nearblack">{totalParticipantsCount}</strong> IN
            </span>
            <span className="text-black/20">·</span>
            <span className="text-mova-orange font-bold">
              <strong>{activeDropsCount}</strong> ACTIVE DROPS
            </span>
          </div>
        </div>

        {/* Primary View Navigation */}
        <nav className="flex items-center p-1 sm:p-1.5 bg-black/[0.03] rounded-pill border border-black/[0.06] shadow-xs shrink-0" aria-label="Main View Selector">
          <button
            onClick={() => onSelectTab('now')}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-pill transition-all duration-150 flex items-center gap-1.5 sm:gap-2 min-h-[38px] sm:min-h-[44px] ${
              activeTab === 'now'
                ? 'bg-mova-ocean text-white shadow-sm'
                : 'text-mova-nearblack hover:text-mova-ocean hover:bg-black/[0.02]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeTab === 'now' ? 'bg-emerald-300' : 'bg-emerald-500'} animate-pulse`} />
            <span>Now<span className="hidden sm:inline"> World</span></span>
          </button>
          <button
            onClick={() => onSelectTab('drops')}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-pill transition-all duration-150 flex items-center gap-1.5 sm:gap-2 min-h-[38px] sm:min-h-[44px] ${
              activeTab === 'drops'
                ? 'bg-mova-ocean text-white shadow-sm'
                : 'text-mova-nearblack hover:text-mova-ocean hover:bg-black/[0.02]'
            }`}
          >
            <Icon3D name="spark" size="xs" />
            <span><span className="hidden sm:inline">5m </span>Drops</span>
            <span className={`text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-mono font-bold ${activeTab === 'drops' ? 'bg-white/20 text-white' : 'bg-mova-orange text-mova-ocean'}`}>
              LIVE
            </span>
          </button>
          <button
            onClick={() => onSelectTab('memories')}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-pill transition-all duration-150 flex items-center gap-1.5 sm:gap-2 min-h-[38px] sm:min-h-[44px] ${
              activeTab === 'memories'
                ? 'bg-mova-ocean text-white shadow-sm'
                : 'text-mova-nearblack hover:text-mova-ocean hover:bg-black/[0.02]'
            }`}
          >
            <Icon3D name="photo" size="xs" />
            <span>Memories</span>
          </button>
        </nav>

        {/* User Context & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0">
          {/* How It Works / Onboarding Trigger */}
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              aria-label="How MOVA Works / Product Guide"
              className="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center text-mova-muted hover:text-mova-ocean hover:bg-black/[0.04] transition-colors border border-black/[0.08] min-h-[44px] min-w-[44px]"
              title="How MOVA Works"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}

          {/* Meaningful Activity Notification Bell */}
          {onOpenActivity && (
            <button
              onClick={onOpenActivity}
              aria-label={`Activity Notifications ${unreadActivitiesCount > 0 ? `(${unreadActivitiesCount} unread)` : ''}`}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-mova-muted hover:text-mova-ocean hover:bg-black/[0.04] transition-colors border border-black/[0.08] min-h-[40px] min-w-[40px]"
              title="Activity Feed (Branch & Drop updates)"
            >
              <Bell className="w-4 h-4" />
              {unreadActivitiesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-mova-orange text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadActivitiesCount}
                </span>
              )}
            </button>
          )}

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-mova-muted hover:text-mova-ocean hover:bg-black/[0.04] transition-colors border border-black/[0.08] min-h-[40px] min-w-[40px]"
            title={isSoundEnabled ? 'Sound FX On (Web Audio)' : 'Sound FX Muted'}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-mova-ocean" /> : <VolumeX className="w-4 h-4 text-mova-muted" />}
          </button>

          {/* Minimal Identity & Presence Pill */}
          <button
            type="button"
            onClick={onOpenIdentity}
            aria-label="Open Minimal Identity & Presence Drawer"
            className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.06] text-xs font-medium shadow-xs transition-colors cursor-pointer text-left min-h-[44px]"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
              alt="Arun profile"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-mova-ocean/20"
            />
            <span className="font-semibold text-mova-nearblack">Arun</span>
            <span className="text-black/20">·</span>
            <div className="flex items-center gap-1.5 text-mova-ocean font-bold">
              {currentVibe?.icon3d ? (
                <Icon3D name={currentVibe.icon3d} size="xs" fallbackText={currentVibe.icon} />
              ) : (
                <span className="text-sm">⚡</span>
              )}
              <span>{currentVibe ? currentVibe.label : 'All Vibes'}</span>
            </div>
          </button>

          {/* Spark Action CTA */}
          <Button
            variant="primary"
            size="md"
            onClick={onOpenSpark}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 font-bold shadow-sm min-h-[40px] sm:min-h-[44px] text-xs sm:text-sm"
          >
            <Icon3D name="spark" size="xs" />
            <span>Spark</span>
          </Button>
        </div>

      </div>
    </header>
  );
};
