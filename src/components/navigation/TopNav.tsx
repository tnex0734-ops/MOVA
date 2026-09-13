import React from 'react';
import { Volume2, VolumeX, Bell, HelpCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { VibeId, UserProfile } from '../../types/mova';
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
  userProfile?: UserProfile;
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
  userProfile,
  onOpenActivity,
  onOpenIdentity,
  onOpenOnboarding,
}) => {
  const currentVibe = CANONICAL_VIBES.find((v) => v.id === currentVibeId);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded-xl min-h-[36px]"
            onClick={() => onSelectTab('now')}
            aria-label="MOVA Home - Now World"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-mova-ocean border border-mova-orange/30 shadow-xs p-1 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={movaLogo}
                alt="MOVA Logo"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-mova-ocean leading-none group-hover:text-mova-ocean-hover transition-colors">
                MOVA
              </span>
              <span className="font-crayon text-[11px] text-mova-ocean/85 font-semibold -mt-0.5 tracking-wide hidden lg:block">
                Follow Moments
              </span>
            </div>
          </button>

          {/* Metrics Ribbon (Wide Desktop only) */}
          <div className="hidden 2xl:flex items-center gap-3 pl-4 border-l border-black/[0.06] text-[11px] font-mono-tabular text-mova-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-mova-nearblack">{totalMomentsCount}</strong> MOMENTS
            </span>
            <span className="text-black/20">·</span>
            <span>
              <strong className="text-mova-nearblack">{totalParticipantsCount}</strong> IN
            </span>
            <span className="text-black/20">·</span>
            <span className="text-mova-orange font-bold">
              <strong>{activeDropsCount}</strong> DROPS
            </span>
          </div>
        </div>

        {/* Primary View Navigation */}
        <nav className="flex items-center p-1 bg-black/[0.03] rounded-pill border border-black/[0.06] shadow-xs shrink-0" aria-label="Main View Selector">
          <button
            onClick={() => onSelectTab('now')}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-pill transition-all duration-150 flex items-center gap-1.5 min-h-[32px] sm:min-h-[36px] ${
              activeTab === 'now'
                ? 'bg-mova-ocean text-white shadow-sm'
                : 'text-mova-nearblack hover:text-mova-ocean hover:bg-black/[0.02]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'now' ? 'bg-emerald-300' : 'bg-emerald-500'} animate-pulse`} />
            <span>Now<span className="hidden sm:inline"> World</span></span>
          </button>
          <button
            onClick={() => onSelectTab('drops')}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-pill transition-all duration-150 flex items-center gap-1.5 min-h-[32px] sm:min-h-[36px] ${
              activeTab === 'drops'
                ? 'bg-mova-ocean text-white shadow-sm'
                : 'text-mova-nearblack hover:text-mova-ocean hover:bg-black/[0.02]'
            }`}
          >
            <Icon3D name="spark" size="xs" />
            <span><span className="hidden sm:inline">5m </span>Drops</span>
            <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${activeTab === 'drops' ? 'bg-white/20 text-white' : 'bg-mova-orange text-mova-ocean'}`}>
              LIVE
            </span>
          </button>
          <button
            onClick={() => onSelectTab('memories')}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-pill transition-all duration-150 flex items-center gap-1.5 min-h-[32px] sm:min-h-[36px] ${
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* How It Works / Onboarding Trigger */}
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              aria-label="How MOVA Works / Product Guide"
              className="hidden md:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center text-mova-muted hover:text-mova-ocean hover:bg-black/[0.04] transition-colors border border-black/[0.08]"
              title="How MOVA Works"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Meaningful Activity Notification Bell */}
          {onOpenActivity && (
            <button
              onClick={onOpenActivity}
              aria-label={`Activity Notifications ${unreadActivitiesCount > 0 ? `(${unreadActivitiesCount} unread)` : ''}`}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-mova-muted hover:text-mova-ocean hover:bg-black/[0.04] transition-colors border border-black/[0.08]"
              title="Activity Feed (Branch & Drop updates)"
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadActivitiesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-mova-orange text-white text-[8px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadActivitiesCount}
                </span>
              )}
            </button>
          )}

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-mova-muted hover:text-mova-ocean hover:bg-black/[0.04] transition-colors border border-black/[0.08]"
            title={isSoundEnabled ? 'Sound FX On (Web Audio)' : 'Sound FX Muted'}
          >
            {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5 text-mova-ocean" /> : <VolumeX className="w-3.5 h-3.5 text-mova-muted" />}
          </button>

          {/* Minimal Identity & Presence Pill */}
          <button
            type="button"
            onClick={onOpenIdentity}
            aria-label="Open Minimal Identity & Presence Drawer"
            className="hidden xl:flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-pill bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.06] text-xs font-medium shadow-xs transition-colors cursor-pointer text-left min-h-[36px]"
          >
            <img
              src={userProfile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"}
              alt={`${userProfile?.name || 'User'} profile`}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-mova-ocean/20"
            />
            <span className="font-semibold text-mova-nearblack text-[11px]">
              {userProfile?.name ? userProfile.name.split(' ')[0] : 'Arun'}
            </span>
            <span className="text-black/20">·</span>
            <div className="flex items-center gap-1 text-mova-ocean font-bold text-[11px]">
              {currentVibe?.icon3d ? (
                <Icon3D name={currentVibe.icon3d} size="xs" fallbackText={currentVibe.icon} />
              ) : (
                <span className="text-xs">⚡</span>
              )}
              <span>{currentVibe ? currentVibe.label : 'All Vibes'}</span>
            </div>
          </button>

          {/* Spark Action CTA */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenSpark}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 font-bold shadow-sm min-h-[36px] text-xs sm:text-sm rounded-pill"
          >
            <Icon3D name="spark" size="xs" />
            <span>Spark</span>
          </Button>
        </div>

      </div>
    </header>
  );
};
