import { useState, useMemo, useEffect } from 'react';
import { VibeId, Moment, Drop, Memory, Contribution, ContributionType } from './types/mova';
import { INITIAL_MOMENTS } from './data/mockMoments';
import { INITIAL_DROPS } from './data/mockDrops';
import { INITIAL_MEMORIES } from './data/mockMemories';
import { INITIAL_CONTRIBUTIONS } from './data/mockThreads';
import { TopNav } from './components/navigation/TopNav';
import { VibeSelector } from './components/vibe/VibeSelector';
import { SparkModal } from './components/vibe/SparkModal';
import { LiveWorld } from './components/world/LiveWorld';
import { MomentCard } from './components/moments/MomentCard';
import { SwipeStack } from './components/moments/SwipeStack';
import { ConfirmationDrawer } from './components/drawer/ConfirmationDrawer';
import { LivingThreadModal } from './components/thread/LivingThreadModal';
import { DropCard } from './components/drops/DropCard';
import { DropModal } from './components/drops/DropModal';
import { MemoryCard } from './components/memories/MemoryCard';
import { MemoryModal } from './components/memories/MemoryModal';
import { useClock } from './hooks/useClock';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { Layers, HelpCircle } from 'lucide-react';
import { Button } from './components/common/Button';
import { Icon3D } from './components/common/Icon3D';
import { LiveAnnouncer, announce } from './components/common/LiveAnnouncer';
import movaLogo from './assets/MOVALOGO.png';

export function App() {
  // Navigation & View Tabs
  const [activeTab, setActiveTab] = useState<'now' | 'drops' | 'memories'>('now');
  const [centerSubView, setCenterSubView] = useState<'world' | 'swipe' | 'grid'>('world');
  const [selectedVibe, setSelectedVibe] = useState<VibeId | 'all'>('all');

  // Core Domain State
  const [moments, setMoments] = useState<Moment[]>(INITIAL_MOMENTS);
  const [drops, setDrops] = useState<Drop[]>(INITIAL_DROPS);
  const [memories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [contributions, setContributions] = useState<Record<string, Contribution[]>>(INITIAL_CONTRIBUTIONS);

  // Modals & Drawers
  const [isSparkOpen, setIsSparkOpen] = useState<boolean>(false);
  const [selectedMomentForDrawer, setSelectedMomentForDrawer] = useState<Moment | null>(null);
  const [activeMomentForThread, setActiveMomentForThread] = useState<Moment | null>(null);
  const [activeDropForModal, setActiveDropForModal] = useState<Drop | null>(null);
  const [activeMemoryForModal, setActiveMemoryForModal] = useState<Memory | null>(null);
  const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState<boolean>(false);

  // Centralized Clock & Audio Feedback
  const { now } = useClock();
  const { isEnabled: isSoundEnabled, toggleSound, playClick, playJoin, playPass, playDropAlert } = useAudioFeedback();

  // Central timer tick updates drop remaining seconds
  useEffect(() => {
    setDrops((prevDrops) =>
      prevDrops.map((d) => {
        if (d.status === 'active' && d.remainingSeconds > 0) {
          return { ...d, remainingSeconds: Math.max(0, d.remainingSeconds - 1) };
        }
        return d;
      })
    );
  }, [now]);

  // Vibe filtered moments
  const filteredMoments = useMemo(() => {
    if (selectedVibe === 'all') return moments;
    return moments.filter((m) => m.vibeId === selectedVibe);
  }, [moments, selectedVibe]);

  // Active Drops count
  const activeDropsCount = useMemo(() => {
    return drops.filter((d) => d.status === 'active').length;
  }, [drops]);

  // Total in count
  const totalParticipantsCount = useMemo(() => {
    return moments.reduce((acc, m) => acc + m.participantCount, 0);
  }, [moments]);

  // Shared Action Handlers (Master Prompt Sec 51: Shared Action Handlers)
  const handleJoin = (moment: Moment) => {
    playJoin();
    announce(`Joining ${moment.title}. Opening confirmation drawer.`);
    setSelectedMomentForDrawer(moment);
  };

  const handlePass = (moment: Moment) => {
    playPass();
    announce(`Passed ${moment.title}.`);
    setMoments((prev) =>
      prev.map((m) => (m.id === moment.id ? { ...m, isPassed: true } : m))
    );
  };

  const handleConfirmArrival = (
    moment: Moment,
    initialContribution?: {
      type: ContributionType;
      content: string;
      mediaUrl?: string;
      sketchDataUrl?: string;
    }
  ) => {
    playJoin();
    // Increment participant count
    setMoments((prev) =>
      prev.map((m) =>
        m.id === moment.id
          ? {
              ...m,
              isJoined: true,
              participantCount: m.participantCount + 1,
              participants: [
                {
                  id: 'user-arun',
                  name: 'Arun K.',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
                  joinedAt: 'Just now',
                },
                ...m.participants,
              ],
            }
          : m
      )
    );

    // If initial contribution provided, add to thread
    if (initialContribution) {
      const newContrib: Contribution = {
        id: `c-${Date.now()}`,
        momentId: moment.id,
        parentId: null,
        type: initialContribution.type,
        content: initialContribution.content,
        mediaUrl: initialContribution.mediaUrl,
        author: {
          id: 'user-arun',
          name: 'Arun K.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          joinedAt: 'Just now',
        },
        timestamp: 'Just now',
        branchName: 'Arrival Check-in',
        likesCount: 1,
      };

      setContributions((prev) => ({
        ...prev,
        [moment.id]: [newContrib, ...(prev[moment.id] || [])],
      }));
    }

    // Open Living Thread for this moment
    setActiveMomentForThread(moment);
  };

  const handleAddContribution = (
    momentId: string,
    newContrib: Omit<Contribution, 'id' | 'timestamp'>
  ) => {
    playClick();
    const fullContrib: Contribution = {
      ...newContrib,
      id: `c-${Date.now()}`,
      timestamp: 'Just now',
    };

    setContributions((prev) => ({
      ...prev,
      [momentId]: [...(prev[momentId] || []), fullContrib],
    }));
  };

  const handleDropSubmission = (
    dropId: string,
    content: string,
    type: 'photo' | 'text' | 'voice',
    mediaUrl?: string
  ) => {
    playDropAlert();
    announce('Perspective submitted to Synchronized Drop.');
    setDrops((prev) =>
      prev.map((d) =>
        d.id === dropId
          ? {
              ...d,
              participantCount: d.participantCount + 1,
              contributionsCount: d.contributionsCount + 1,
              previewImages:
                type === 'photo'
                  ? [
                      mediaUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
                      ...d.previewImages.slice(0, 3),
                    ]
                  : d.previewImages,
            }
          : d
      )
    );

    // If associated with a moment, add contribution to thread
    const drop = drops.find((d) => d.id === dropId);
    if (drop?.associatedMomentId) {
      handleAddContribution(drop.associatedMomentId, {
        momentId: drop.associatedMomentId,
        parentId: null,
        type,
        content: `[Synchronized Drop]: ${content}`,
        mediaUrl: type === 'photo' ? mediaUrl : undefined,
        author: {
          id: 'user-arun',
          name: 'Arun K.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          joinedAt: 'Just now',
        },
        branchName: 'Synchronized Drop',
        likesCount: 3,
      });
    }
  };

  const handleCreateSpark = (newMoment: Moment) => {
    playJoin();
    announce(`Sparked new moment: ${newMoment.title} at ${newMoment.location}.`);
    setMoments((prev) => [newMoment, ...prev]);
    setSelectedVibe(newMoment.vibeId);
  };

  // Keyboard accessibility hook
  useKeyboardNav({
    disabled: Boolean(
      selectedMomentForDrawer ||
      activeMomentForThread ||
      activeDropForModal ||
      activeMemoryForModal ||
      isSparkOpen ||
      isKeyboardHelpOpen
    ),
    onPass: () => {
      if (filteredMoments.length > 0) {
        handlePass(filteredMoments[0]);
      }
    },
    onJoin: () => {
      if (filteredMoments.length > 0) {
        handleJoin(filteredMoments[0]);
      }
    },
    onEscape: () => {
      setSelectedMomentForDrawer(null);
      setActiveMomentForThread(null);
      setActiveDropForModal(null);
      setActiveMemoryForModal(null);
      setIsSparkOpen(false);
      setIsKeyboardHelpOpen(false);
    },
  });

  return (
    <div className="min-h-screen bg-white text-mova-ocean flex flex-col antialiased selection:bg-mova-ice-soft selection:text-mova-ocean">
      {/* Central Screen Reader Announcer */}
      <LiveAnnouncer />
      
      {/* 1. Global Navigation */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          playClick();
          setActiveTab(tab);
        }}
        currentVibeId={selectedVibe}
        onOpenSpark={() => {
          playClick();
          setIsSparkOpen(true);
        }}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
        totalMomentsCount={moments.length}
        totalParticipantsCount={totalParticipantsCount}
        activeDropsCount={activeDropsCount}
      />

      {/* 2. Main Content Body */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-10">
        
        {/* ==================== TAB: NOW WORLD ==================== */}
        {activeTab === 'now' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
            
            {/* LEFT RAIL (3 COLUMNS): VIBE SELECTOR & SPARK QUICK BOX */}
            <aside className="lg:col-span-3 flex flex-col gap-8" aria-label="Current Vibe and Quick Actions">
              <VibeSelector
                selectedVibe={selectedVibe}
                onSelectVibe={(v) => {
                  playClick();
                  setSelectedVibe(v);
                }}
                onOpenSpark={() => {
                  playClick();
                  setIsSparkOpen(true);
                }}
              />

              {/* Spark Quick Card */}
              <div className="p-6 sm:p-7 rounded-bento bg-white border border-black/[0.06] shadow-bento flex flex-col justify-between gap-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mova-ocean flex items-center gap-1.5 mb-2">
                    <Icon3D name="spark" size="xs" />
                    Spontaneous Trigger
                  </span>
                  <h3 className="font-crayon text-2xl font-bold text-mova-ocean leading-snug mb-3">
                    Start something in 10 seconds.
                  </h3>
                  <p className="text-xs text-mova-muted leading-relaxed">
                    No followers required. If you're playing badminton or heading for chai, invite whoever is around.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    playClick();
                    setIsSparkOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 font-bold shadow-sm py-3"
                >
                  <Icon3D name="spark" size="xs" />
                  <span>+ Launch Moment</span>
                </Button>
              </div>

              {/* Keyboard Navigation Quick Info */}
              <div className="hidden lg:flex items-center justify-between px-4 py-3 rounded-2xl bg-black/[0.02] border border-black/[0.05] text-xs text-mova-muted">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-mova-ocean" />
                  <span>Keyboard shortcuts</span>
                </span>
                <span className="font-mono-tabular text-[10px] bg-white px-2 py-0.5 rounded-md border border-black/[0.08] shadow-2xs font-semibold text-mova-nearblack">
                  ← Pass · → Join
                </span>
              </div>
            </aside>

            {/* CENTER (6 COLUMNS): LIVE WORLD / SWIPE DECISION DECK */}
            <section className="lg:col-span-6 flex flex-col gap-6" aria-label="Now Moments and Spatial View">
              
              {/* Sub-view switcher */}
              <div className="flex items-center justify-between p-1.5 bg-black/[0.03] rounded-2xl border border-black/[0.06] shadow-xs">
                <span className="text-xs font-bold px-3 text-mova-nearblack flex items-center gap-2 shrink-0">
                  <Icon3D name="spontaneous" size="xs" />
                  <span className="hidden sm:inline">Live Situation</span>
                </span>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => {
                      playClick();
                      setCenterSubView('world');
                    }}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 flex items-center gap-2 shrink-0 ${
                      centerSubView === 'world'
                        ? 'bg-white text-mova-ocean shadow-xs border border-black/[0.06]'
                        : 'text-mova-muted hover:text-mova-nearblack hover:bg-black/[0.02]'
                    }`}
                  >
                    <Icon3D name="world" size="xs" />
                    <span className="inline sm:hidden">Map</span>
                    <span className="hidden sm:inline">Realistic Map</span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      setCenterSubView('swipe');
                    }}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 flex items-center gap-2 shrink-0 ${
                      centerSubView === 'swipe'
                        ? 'bg-white text-mova-ocean shadow-xs border border-black/[0.06]'
                        : 'text-mova-muted hover:text-mova-nearblack hover:bg-black/[0.02]'
                    }`}
                  >
                    <Icon3D name="cards" size="xs" />
                    <span className="inline sm:hidden">Swipe</span>
                    <span className="hidden sm:inline">Swipe Deck</span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      setCenterSubView('grid');
                    }}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 flex items-center gap-2 shrink-0 ${
                      centerSubView === 'grid'
                        ? 'bg-white text-mova-ocean shadow-xs border border-black/[0.06]'
                        : 'text-mova-muted hover:text-mova-nearblack hover:bg-black/[0.02]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="inline sm:hidden">Grid</span>
                    <span className="hidden sm:inline">Bento Grid</span>
                  </button>
                </div>
              </div>

              {/* View 1: Realistic Campus Map & Spatial World */}
              {centerSubView === 'world' && (
                <LiveWorld
                  moments={moments}
                  selectedMoment={selectedMomentForDrawer}
                  onSelectMoment={(m) => handleJoin(m)}
                  selectedVibe={selectedVibe}
                  onOpenSpark={() => setIsSparkOpen(true)}
                  onQuickJoin={(m) => handleJoin(m)}
                />
              )}

              {/* View 2: Physical Swipe Card Deck */}
              {centerSubView === 'swipe' && (
                <SwipeStack
                  moments={filteredMoments}
                  onJoin={handleJoin}
                  onPass={handlePass}
                  onOpenThread={(m) => setActiveMomentForThread(m)}
                  onResetStack={() => setMoments(INITIAL_MOMENTS)}
                />
              )}

              {/* View 3: Tactile Bento Grid */}
              {centerSubView === 'grid' && (
                filteredMoments.length === 0 ? (
                  <div className="p-16 text-center flex flex-col items-center justify-center rounded-bento bg-white border border-black/[0.06] shadow-xs">
                    <div className="w-16 h-16 rounded-full bg-black/[0.03] flex items-center justify-center text-mova-ocean mb-4 shadow-xs">
                      <Icon3D name="spark" size="lg" />
                    </div>
                    <h3 className="font-crayon text-2xl text-mova-nearblack mb-2">
                      It's quiet right now.
                    </h3>
                    <p className="text-xs text-mova-muted max-w-sm mb-5">
                      {selectedVibe !== 'all' ? 'Nothing matches this vibe yet.' : 'No active moments right now.'}
                    </p>
                    <Button variant="primary" size="md" onClick={() => setIsSparkOpen(true)}>
                      Start Something
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredMoments.map((m) => (
                      <MomentCard
                        key={m.id}
                        moment={m}
                        onJoin={handleJoin}
                        onPass={handlePass}
                        onOpenThread={(moment) => setActiveMomentForThread(moment)}
                      />
                    ))}
                  </div>
                )
              )}
            </section>

            {/* RIGHT RAIL (3 COLUMNS): SYNCHRONIZED DROPS & LIVE STREAM */}
            <aside className="lg:col-span-3 flex flex-col gap-8" aria-label="Synchronized Community Drops and Feed">
              
              {/* Active Synchronized Drop */}
              {drops.length > 0 && (
                <DropCard
                  drop={drops[0]}
                  onOpenDrop={(d) => {
                    playClick();
                    setActiveDropForModal(d);
                  }}
                />
              )}

              {/* Live Moments Stream */}
              <div className="p-6 sm:p-7 rounded-bento bg-white border border-black/[0.06] shadow-bento flex flex-col gap-4">
                <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-mova-muted">
                    Happening Nearby
                  </h3>
                  <span className="font-mono-tabular text-[10px] text-mova-ocean font-bold bg-mova-ocean/5 px-2.5 py-0.5 rounded-full border border-mova-ocean/10">
                    Live
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {moments.slice(0, 4).map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setActiveMomentForThread(m)}
                      aria-label={`Inspect ${m.title} at ${m.location}`}
                      className="w-full text-left p-3.5 rounded-2xl bg-transparent hover:bg-black/[0.03] border border-transparent hover:border-black/[0.05] cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean"
                    >
                      <div className="flex flex-col truncate">
                        <span className="font-crayon text-sm font-bold text-mova-ocean group-hover:text-mova-ocean-hover truncate">
                          {m.title}
                        </span>
                        <span className="text-xs text-mova-muted truncate mt-0.5">
                          {m.location}
                        </span>
                      </div>
                      <span className="font-mono-tabular text-xs font-semibold text-mova-nearblack shrink-0 px-2 py-0.5 rounded-md bg-black/[0.03]">
                        {m.participantCount} in
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        )}

        {/* ==================== TAB: SYNCHRONIZED DROPS ==================== */}
        {activeTab === 'drops' && (
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="p-8 sm:p-10 rounded-bento bg-white border border-black/[0.06] shadow-bento flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-mova-ocean flex items-center gap-2 mb-2">
                  <Icon3D name="sparkles" size="xs" />
                  Synchronized Social Moments
                </span>
                <h2 className="font-crayon text-3xl sm:text-4xl font-bold text-mova-ocean leading-tight">
                  Drops happen together, never alone.
                </h2>
                <p className="text-sm text-mova-muted mt-2 max-w-2xl leading-relaxed">
                  At scheduled moments, everyone on campus gets the exact same prompt. You have 5 minutes to drop your live perspective before the moment closes forever.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono-tabular text-xs bg-black/[0.03] text-mova-nearblack px-4 py-2.5 rounded-xl border border-black/[0.06] shadow-xs">
                  Next Global Drop: <strong>10:00 PM</strong>
                </span>
              </div>
            </div>

            {/* Drops Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {drops.map((drop) => (
                <DropCard
                  key={drop.id}
                  drop={drop}
                  onOpenDrop={(d) => {
                    playClick();
                    setActiveDropForModal(d);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB: MEMORIES SCRAPBOOK ==================== */}
        {activeTab === 'memories' && (
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="p-8 sm:p-10 rounded-bento bg-white border border-black/[0.06] shadow-bento flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-mova-ocean flex items-center gap-2 mb-2">
                  <Icon3D name="sparkles" size="xs" />
                  The Scrapbook Archive
                </span>
                <h2 className="font-crayon text-3xl sm:text-4xl font-bold text-mova-ocean leading-tight">
                  When moments end, memories remain.
                </h2>
                <p className="text-sm text-mova-muted mt-2 max-w-2xl leading-relaxed">
                  No infinite algorithm feeds or vanity follower metrics. Just genuine artifacts of times strangers came together.
                </p>
              </div>

              <div className="font-mono-tabular text-xs bg-black/[0.03] text-mova-nearblack px-4 py-2.5 rounded-xl border border-black/[0.06] shadow-xs shrink-0">
                Archived Memories: <strong>{memories.length}</strong>
              </div>
            </div>

            {/* Scrapbook Polaroid Grid */}
            {memories.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center justify-center rounded-bento bg-white border border-black/[0.06] shadow-xs">
                <div className="w-16 h-16 rounded-full bg-mova-ice-soft flex items-center justify-center text-mova-ocean mb-3 shadow-xs">
                  <Icon3D name="photo" size="lg" />
                </div>
                <h3 className="font-crayon text-2xl text-mova-ocean mb-1">
                  Nothing here yet.
                </h3>
                <p className="text-xs text-mova-muted max-w-sm mb-4">
                  Join a moment. Make a memory.
                </p>
                <Button variant="primary" size="sm" onClick={() => setActiveTab('now')}>
                  Explore Live Moments
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memories.map((mem) => (
                  <MemoryCard
                    key={mem.id}
                    memory={mem}
                    onOpenMemory={(m) => {
                      playClick();
                      setActiveMemoryForModal(m);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* 3. Global Footer */}
      <footer className="w-full bg-white border-t border-mova-border py-6 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mova-muted">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-mova-ocean border border-mova-orange/30 shadow-xs p-0.5 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={movaLogo}
                alt="MOVA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-sm text-mova-ocean">MOVA</span>
            <span>·</span>
            <span className="font-crayon text-sm text-mova-ocean font-semibold">
              Don't Follow People. Follow Moments.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsKeyboardHelpOpen(true)}
              className="hover:underline flex items-center gap-1 text-mova-ocean"
            >
              <HelpCircle className="w-3.5 h-3.5 text-mova-ocean" />
              <span>Shortcuts</span>
            </button>
            <span>·</span>
            <span>Frontend Architecture Demo</span>
            <span>·</span>
            <span className="text-mova-ocean font-semibold">Judge-Ready Baseline</span>
          </div>
        </div>
      </footer>

      {/* 4. Interactive Drawers and Modals */}
      <ConfirmationDrawer
        isOpen={Boolean(selectedMomentForDrawer)}
        moment={selectedMomentForDrawer}
        onClose={() => setSelectedMomentForDrawer(null)}
        onConfirm={handleConfirmArrival}
      />

      <LivingThreadModal
        isOpen={Boolean(activeMomentForThread)}
        moment={activeMomentForThread}
        contributions={activeMomentForThread ? contributions[activeMomentForThread.id] || [] : []}
        onClose={() => setActiveMomentForThread(null)}
        onAddContribution={handleAddContribution}
      />

      <DropModal
        isOpen={Boolean(activeDropForModal)}
        drop={activeDropForModal}
        onClose={() => setActiveDropForModal(null)}
        onSubmitContribution={handleDropSubmission}
      />

      <MemoryModal
        isOpen={Boolean(activeMemoryForModal)}
        memory={activeMemoryForModal}
        onClose={() => setActiveMemoryForModal(null)}
      />

      <SparkModal
        isOpen={isSparkOpen}
        onClose={() => setIsSparkOpen(false)}
        onCreateMoment={handleCreateSpark}
        defaultVibeId={selectedVibe}
      />

      {/* 5. Keyboard Navigation Helper Modal */}
      {isKeyboardHelpOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-mova-nearblack/50 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm bg-white rounded-drawer p-6 shadow-2xl border border-mova-ice-border">
            <h3 className="font-crayon text-2xl font-bold text-mova-nearblack mb-3">
              Keyboard Shortcuts
            </h3>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-mova-border">
                <span className="text-mova-muted">Pass Current Moment</span>
                <kbd className="px-2 py-0.5 rounded bg-mova-ice-soft font-mono text-[11px] font-bold">← Arrow Left</kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-mova-border">
                <span className="text-mova-muted">Join Current Moment</span>
                <kbd className="px-2 py-0.5 rounded bg-mova-ice-soft font-mono text-[11px] font-bold">→ Arrow Right</kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-mova-border">
                <span className="text-mova-muted">Close Drawer / Modal</span>
                <kbd className="px-2 py-0.5 rounded bg-mova-ice-soft font-mono text-[11px] font-bold">Esc</kbd>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-mova-muted">Focus Navigation</span>
                <kbd className="px-2 py-0.5 rounded bg-mova-ice-soft font-mono text-[11px] font-bold">Tab / Shift+Tab</kbd>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-mova-border flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setIsKeyboardHelpOpen(false)}>
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
