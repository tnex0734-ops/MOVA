import { useState, useMemo, useEffect } from 'react';
import { VibeId, Moment, Drop, Memory, Contribution, ContributionType, UserProfile, ActivityNotification } from './types/mova';
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
import { ToastProvider } from './components/common/Toast';
import { useToast } from './hooks/useToast';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { IdentityDrawer } from './components/identity/IdentityDrawer';
import { ActivityDrawer } from './components/identity/ActivityDrawer';
import { CustomVibeModal } from './components/vibe/CustomVibeModal';
import { useClock } from './hooks/useClock';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { Layers, HelpCircle, Search, WifiOff, X, Sparkles, MapPin, Clock, Calendar } from 'lucide-react';
import { Button } from './components/common/Button';
import { Icon3D } from './components/common/Icon3D';
import { LiveAnnouncer } from './components/common/LiveAnnouncer';
import { announce } from './lib/announcer';
import movaLogo from './assets/MOVALOGO.png';

const INITIAL_PROFILE: UserProfile = {
  id: 'user-arun',
  name: 'Arun K.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  bio: 'CompSci sophomore · usually at Central Quad or Canteen table 4.',
  campusArea: 'Central Quad & Steps',
  currentVibeId: 'chill',
  joinedMomentsCount: 14,
  contributionsCount: 26,
  sparksStartedCount: 5,
};

const INITIAL_NOTIFICATIONS: ActivityNotification[] = [
  {
    id: 'notif-1',
    title: 'New Branch: "Chai Run to Canteen"',
    description: 'Tara V. started a micro-branch from Rain Chaos gathering.',
    timestamp: '3m ago',
    type: 'branch_created',
    momentId: 'moment-rain-chaos',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Synchronized Drop Live!',
    description: '"Show the sky right above you" is live for 5 minutes.',
    timestamp: '5m ago',
    type: 'drop_start',
    dropId: 'drop-sky-now',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Priya M. joined your table',
    description: 'Joined Chai & Samosa Run at Campus Canteen.',
    timestamp: '12m ago',
    type: 'join',
    momentId: 'moment-chai-samosa',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'Memory Capsule Sealed',
    description: 'Silent Pomodoro Sprint concluded. View the collective notes.',
    timestamp: '2h ago',
    type: 'moment_closed',
    momentId: 'moment-concluded-library',
    read: true,
  },
];

function MOVAApp() {
  // Navigation & View Tabs
  const [activeTab, setActiveTab] = useState<'now' | 'drops' | 'memories'>('now');
  const [centerSubView, setCenterSubView] = useState<'world' | 'swipe' | 'grid'>('world');
  const [selectedVibe, setSelectedVibe] = useState<VibeId | 'all'>('all');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChip, setFilterChip] = useState<'all' | 'closing' | 'nearby' | 'open' | 'scheduled'>('all');
  const [dropsFilter, setDropsFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  // Core Domain State
  const [moments, setMoments] = useState<Moment[]>(INITIAL_MOMENTS);
  const [drops, setDrops] = useState<Drop[]>(INITIAL_DROPS);
  const [memories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [contributions, setContributions] = useState<Record<string, Contribution[]>>(INITIAL_CONTRIBUTIONS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [notifications, setNotifications] = useState<ActivityNotification[]>(INITIAL_NOTIFICATIONS);

  // Online detection
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Modals & Drawers
  const [isSparkOpen, setIsSparkOpen] = useState<boolean>(false);
  const [sparkInitialTitle, setSparkInitialTitle] = useState<string>('');
  const [selectedMomentForDrawer, setSelectedMomentForDrawer] = useState<Moment | null>(null);
  const [activeMomentForThread, setActiveMomentForThread] = useState<Moment | null>(null);
  const [activeDropForModal, setActiveDropForModal] = useState<Drop | null>(null);
  const [activeMemoryForModal, setActiveMemoryForModal] = useState<Memory | null>(null);
  const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(true);
  const [isIdentityOpen, setIsIdentityOpen] = useState<boolean>(false);
  const [isActivityOpen, setIsActivityOpen] = useState<boolean>(false);
  const [isCustomVibeOpen, setIsCustomVibeOpen] = useState<boolean>(false);

  // Always recognise user as new on open and clear old onboarding flag
  useEffect(() => {
    try {
      localStorage.removeItem('mova_onboarded');
    } catch {
      // ignore
    }
  }, []);

  // Toast hook
  const { showToast } = useToast();

  // Centralized Clock & Audio Feedback
  const { now: _now } = useClock();
  const { isEnabled: isSoundEnabled, toggleSound, playClick, playJoin, playPass, playDropAlert } = useAudioFeedback();

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast('You are back online. Synchronizing campus moments.', 'success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast('You are offline. Showing cached moments.', 'info');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  // Central timer tick updates drop remaining seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDrops((prevDrops) =>
        prevDrops.map((d) => {
          if (d.status === 'active' && d.remainingSeconds > 0) {
            const nextSec = d.remainingSeconds - 1;
            if (nextSec === 0) {
              return { ...d, remainingSeconds: 0, status: 'completed' };
            }
            return { ...d, remainingSeconds: nextSec };
          }
          return d;
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Vibe, Search, and Filter filtered moments
  const filteredMoments = useMemo(() => {
    return moments.filter((m) => {
      // Vibe filter
      if (selectedVibe !== 'all' && m.vibeId !== selectedVibe) return false;

      // Filter chip
      if (filterChip === 'closing') {
        if (m.remainingMinutes > 15 || m.status === 'closed') return false;
      } else if (filterChip === 'nearby') {
        if ((m.distanceMeters ?? 999) > 150) return false;
      } else if (filterChip === 'open') {
        if (m.isFull || m.status === 'full' || m.status === 'closed' || (m.maxParticipants && m.participantCount >= m.maxParticipants)) return false;
      } else if (filterChip === 'scheduled') {
        if (!m.isScheduled && !m.scheduledDate) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchLocation = m.location.toLowerCase().includes(q);
        const matchDesc = m.description.toLowerCase().includes(q);
        const matchTags = m.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchLocation && !matchDesc && !matchTags) return false;
      }

      return true;
    });
  }, [moments, selectedVibe, filterChip, searchQuery]);

  // Active Drops count
  const activeDropsCount = useMemo(() => {
    return drops.filter((d) => d.status === 'active').length;
  }, [drops]);

  // Filtered drops list
  const filteredDrops = useMemo(() => {
    if (dropsFilter === 'all') return drops;
    return drops.filter((d) => d.status === dropsFilter);
  }, [drops, dropsFilter]);

  // Total in count
  const totalParticipantsCount = useMemo(() => {
    return moments.reduce((acc, m) => acc + m.participantCount, 0);
  }, [moments]);

  // Unread activities count
  const unreadActivitiesCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Shared Action Handlers
  const handleJoin = (moment: Moment) => {
    if (moment.isJoined) {
      announce(`Opening living thread for ${moment.title}.`);
      setActiveMomentForThread(moment);
      return;
    }
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

    // Show undo toast notification
    showToast(
      `Passed "${moment.title}"`,
      'info',
      () => {
        setMoments((prev) =>
          prev.map((m) => (m.id === moment.id ? { ...m, isPassed: false } : m))
        );
        showToast(`Restored "${moment.title}" to stack`, 'success');
      }
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
    // Increment participant count idempotently
    setMoments((prev) =>
      prev.map((m) => {
        if (m.id !== moment.id) return m;
        if (m.isJoined) return m;
        return {
          ...m,
          isJoined: true,
          participantCount: m.participantCount + 1,
          participants: [
            {
              id: userProfile.id,
              name: userProfile.name,
              avatar: userProfile.avatar,
              joinedAt: 'Just now',
            },
            ...m.participants.filter((p) => p.id !== userProfile.id),
          ],
        };
      })
    );

    if (!moment.isJoined) {
      setUserProfile((prev) => ({
        ...prev,
        joinedMomentsCount: prev.joinedMomentsCount + 1,
      }));
    }

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
          id: userProfile.id,
          name: userProfile.name,
          avatar: userProfile.avatar,
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

    showToast(`You joined ${moment.title}!`, 'success');

    const updatedMoment: Moment = {
      ...moment,
      isJoined: true,
      participantCount: moment.isJoined ? moment.participantCount : moment.participantCount + 1,
      participants: moment.isJoined
        ? moment.participants
        : [
            {
              id: userProfile.id,
              name: userProfile.name,
              avatar: userProfile.avatar,
              joinedAt: 'Just now',
            },
            ...moment.participants.filter((p) => p.id !== userProfile.id),
          ],
    };

    // Close confirmation drawer & Open Living Thread for this moment
    setSelectedMomentForDrawer(null);
    setActiveMomentForThread(updatedMoment);
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
      author: {
        id: userProfile.id,
        name: userProfile.name,
        avatar: userProfile.avatar,
        joinedAt: 'Just now',
      },
    };

    setContributions((prev) => ({
      ...prev,
      [momentId]: [...(prev[momentId] || []), fullContrib],
    }));

    setUserProfile((prev) => ({
      ...prev,
      contributionsCount: prev.contributionsCount + 1,
    }));

    showToast('Contribution published to Living Thread', 'success');
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

    showToast('Dropped your perspective into the collective!', 'success');

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
          id: userProfile.id,
          name: userProfile.name,
          avatar: userProfile.avatar,
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
    setActiveTab('now');
    setUserProfile((prev) => ({
      ...prev,
      sparksStartedCount: prev.sparksStartedCount + 1,
      joinedMomentsCount: prev.joinedMomentsCount + 1,
    }));
    showToast(`Moment "${newMoment.title}" sparked live!`, 'success');
  };

  const handleOnboardingComplete = (vibe: VibeId, area: string) => {
    setSelectedVibe(vibe);
    setUserProfile((prev) => ({
      ...prev,
      currentVibeId: vibe,
      campusArea: area,
    }));
    showToast(`Welcome to MOVA! Campus context set to ${area}`, 'success');
  };

  const handleSaveCustomVibe = (customText: string) => {
    setUserProfile((prev) => ({
      ...prev,
      customVibeText: customText,
    }));
    showToast(`Custom vibe status updated: "${customText}"`, 'success');
  };

  // Keyboard accessibility hook
  useKeyboardNav({
    disabled: Boolean(
      selectedMomentForDrawer ||
      activeMomentForThread ||
      activeDropForModal ||
      activeMemoryForModal ||
      isSparkOpen ||
      isKeyboardHelpOpen ||
      isOnboardingOpen ||
      isIdentityOpen ||
      isActivityOpen ||
      isCustomVibeOpen
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
      setIsOnboardingOpen(false);
      setIsIdentityOpen(false);
      setIsActivityOpen(false);
      setIsCustomVibeOpen(false);
    },
  });

  return (
    <div className="min-h-screen bg-white text-mova-ocean flex flex-col antialiased selection:bg-mova-ice-soft selection:text-mova-ocean">
      {/* Central Screen Reader Announcer */}
      <LiveAnnouncer />

      {/* Offline Status Warning Banner */}
      {!isOnline && (
        <aside aria-label="Offline Mode Notice" className="bg-amber-500 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all animate-fadeIn">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>You are viewing offline cached moments. Live synchronization will resume automatically when you reconnect.</span>
        </aside>
      )}

      {/* Custom Situation Banner (if user set one) */}
      {userProfile.customVibeText && (
        <div className="bg-mova-ice-soft/80 border-b border-mova-ice-border px-6 py-2 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-mova-ocean flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-mova-orange" />
              Your Status:
            </span>
            <span className="font-semibold text-mova-nearblack">"{userProfile.customVibeText}"</span>
            <span className="text-mova-muted">· {userProfile.campusArea}</span>
          </div>
          <button
            type="button"
            onClick={() => setUserProfile((prev) => ({ ...prev, customVibeText: undefined }))}
            className="text-[11px] text-mova-muted hover:text-mova-ocean underline"
          >
            Clear
          </button>
        </div>
      )}
      
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
          setSparkInitialTitle('');
          setIsSparkOpen(true);
        }}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
        totalMomentsCount={moments.length}
        totalParticipantsCount={totalParticipantsCount}
        activeDropsCount={activeDropsCount}
        unreadActivitiesCount={unreadActivitiesCount}
        userProfile={userProfile}
        onOpenActivity={() => {
          playClick();
          setIsActivityOpen(true);
          // Mark notifications as read
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onOpenIdentity={() => {
          playClick();
          setIsIdentityOpen(true);
        }}
        onOpenOnboarding={() => {
          playClick();
          setIsOnboardingOpen(true);
        }}
      />

      {/* 2. Main Content Body with Safe Area Padding */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-7 pb-[max(2rem,env(safe-area-inset-bottom))]">
        
        {/* ==================== TAB: NOW WORLD ==================== */}
        {activeTab === 'now' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">

            {/* MOBILE ONLY: Sleek Horizontal Vibe Selector Tray */}
            <div className="lg:hidden flex flex-col gap-2 p-3 sm:p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
              <div className="flex items-center justify-between px-1">
                <span className="font-crayon text-lg font-bold text-mova-ocean">
                  What's your vibe right now?
                </span>
                <span className="text-[10px] font-mono-tabular text-mova-muted font-bold uppercase tracking-wider">
                  Live Campus
                </span>
              </div>
              <VibeSelector
                variant="chips"
                selectedVibe={selectedVibe}
                onSelectVibe={(v) => {
                  playClick();
                  setSelectedVibe(v);
                }}
                onOpenSpark={() => {
                  playClick();
                  setSparkInitialTitle('');
                  setIsSparkOpen(true);
                }}
                onOpenCustomVibe={() => {
                  playClick();
                  setIsCustomVibeOpen(true);
                }}
              />
            </div>
            
            {/* DESKTOP LEFT RAIL (3 COLUMNS): VIBE SELECTOR & SPARK QUICK BOX */}
            <aside className="hidden lg:flex lg:col-span-3 flex-col gap-8" aria-label="Current Vibe and Quick Actions">
              <VibeSelector
                variant="bento"
                selectedVibe={selectedVibe}
                onSelectVibe={(v) => {
                  playClick();
                  setSelectedVibe(v);
                }}
                onOpenSpark={() => {
                  playClick();
                  setSparkInitialTitle('');
                  setIsSparkOpen(true);
                }}
                onOpenCustomVibe={() => {
                  playClick();
                  setIsCustomVibeOpen(true);
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
                    setSparkInitialTitle('');
                    setIsSparkOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 font-bold shadow-sm py-3 min-h-[44px]"
                >
                  <Icon3D name="spark" size="xs" />
                  <span>+ Launch Moment</span>
                </Button>
              </div>

              {/* Campus Area Context Switcher */}
              <div className="p-5 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-mova-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-mova-ocean" />
                    Campus Context
                  </span>
                  <span className="text-[11px] font-bold text-mova-ocean">
                    {userProfile.campusArea}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {['Central Quad & Steps', 'Campus Canteen · Block B', 'Central Library Floor 3', 'Sports Complex Courts'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setUserProfile((prev) => ({ ...prev, campusArea: loc }));
                        showToast(`Switched campus area to ${loc}`, 'info');
                      }}
                      className={`px-2.5 py-2 rounded-lg text-[11px] font-semibold text-left truncate transition-colors min-h-[38px] ${
                        userProfile.campusArea === loc
                          ? 'bg-mova-ocean text-white'
                          : 'bg-white text-mova-nearblack border border-black/[0.06] hover:bg-black/[0.02]'
                      }`}
                    >
                      {loc.split('·')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyboard Navigation Quick Info */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-black/[0.02] border border-black/[0.05] text-xs text-mova-muted">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-mova-ocean" />
                  <span className="font-crayon text-sm font-semibold">Keyboard shortcuts</span>
                </span>
                <span className="font-mono-tabular text-[10px] bg-white px-2 py-0.5 rounded-md border border-black/[0.08] shadow-2xs font-semibold text-mova-nearblack">
                  ← Pass · → Join
                </span>
              </div>
            </aside>

            {/* CENTER (6 COLUMNS ON DESKTOP, FULL WIDTH ON MOBILE): LIVE WORLD / SWIPE DECISION DECK */}
            <section className="w-full lg:col-span-6 flex flex-col gap-5" aria-label="Now Moments and Spatial View">
              
              {/* Search & Filter Bar */}
              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col gap-2.5">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-mova-muted absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search moments, spots, or activities (e.g. Badminton, Chai, Jam)..."
                    aria-label="Search moments, spots, or activities"
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/[0.02] focus:bg-white border border-transparent focus:border-mova-ocean/30 text-xs font-medium focus:ring-2 focus:ring-mova-ocean/10 focus:outline-none transition-all min-h-[42px]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-3 p-1 rounded-full text-mova-muted hover:text-mova-nearblack"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Quick Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
                  <button
                    onClick={() => setFilterChip('all')}
                    className={`px-3 py-1 rounded-pill text-xs font-bold whitespace-nowrap transition-all ${
                      filterChip === 'all'
                        ? 'bg-mova-ocean text-white shadow-2xs'
                        : 'bg-black/[0.03] text-mova-nearblack hover:bg-black/[0.06]'
                    }`}
                  >
                    All Moments
                  </button>
                  <button
                    onClick={() => setFilterChip('closing')}
                    className={`px-3 py-1 rounded-pill text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      filterChip === 'closing'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>Closing Soon (≤15m)</span>
                  </button>
                  <button
                    onClick={() => setFilterChip('nearby')}
                    className={`px-3 py-1 rounded-pill text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      filterChip === 'nearby'
                        ? 'bg-mova-ocean text-white shadow-2xs'
                        : 'bg-black/[0.03] text-mova-nearblack hover:bg-black/[0.06]'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Nearby (≤150m)</span>
                  </button>
                  <button
                    onClick={() => setFilterChip('open')}
                    className={`px-3 py-1 rounded-pill text-xs font-bold whitespace-nowrap transition-all ${
                      filterChip === 'open'
                        ? 'bg-mova-ocean text-white shadow-2xs'
                        : 'bg-black/[0.03] text-mova-nearblack hover:bg-black/[0.06]'
                    }`}
                  >
                    Open Capacity
                  </button>
                  <button
                    onClick={() => setFilterChip('scheduled')}
                    className={`px-3 py-1 rounded-pill text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      filterChip === 'scheduled'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200/80 hover:bg-indigo-100'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Scheduled Ahead</span>
                  </button>
                </div>
              </div>

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
                  moments={filteredMoments}
                  selectedMoment={selectedMomentForDrawer}
                  onSelectMoment={(m) => handleJoin(m)}
                  selectedVibe={selectedVibe}
                  onOpenSpark={() => {
                    setSparkInitialTitle(searchQuery);
                    setIsSparkOpen(true);
                  }}
                  onQuickJoin={(m) => handleJoin(m)}
                  onOpenThread={(m) => setActiveMomentForThread(m)}
                />
              )}

              {/* View 2: Physical Swipe Card Deck */}
              {centerSubView === 'swipe' && (
                <SwipeStack
                  moments={filteredMoments}
                  onJoin={handleJoin}
                  onPass={handlePass}
                  onOpenThread={(m) => setActiveMomentForThread(m)}
                  onChangeVibe={() => setSelectedVibe('all')}
                  onExploreAll={() => {
                    setSelectedVibe('all');
                    setFilterChip('all');
                    setSearchQuery('');
                  }}
                  onStartSomething={() => {
                    setSparkInitialTitle(searchQuery);
                    setIsSparkOpen(true);
                  }}
                  onResetStack={() => {
                    setMoments(INITIAL_MOMENTS);
                    setSearchQuery('');
                    setFilterChip('all');
                  }}
                  onUndoPass={(restored) => {
                    setMoments((prev) =>
                      prev.map((m) => (m.id === restored.id ? { ...m, isPassed: false } : m))
                    );
                    showToast(`Restored "${restored.title}" to stack`, 'success');
                  }}
                />
              )}

              {/* View 3: Tactile Bento Grid */}
              {centerSubView === 'grid' && (
                filteredMoments.length === 0 ? (
                  <div className="p-12 text-center flex flex-col items-center justify-center rounded-bento bg-white border border-black/[0.06] shadow-xs">
                    <div className="w-14 h-14 rounded-full bg-black/[0.03] flex items-center justify-center text-mova-ocean mb-3 shadow-xs">
                      <Icon3D name="spark" size="md" />
                    </div>
                    <h3 className="font-crayon text-2xl text-mova-nearblack mb-1">
                      {searchQuery ? `No moments match "${searchQuery}"` : "It's quiet right now."}
                    </h3>
                    <p className="text-xs text-mova-muted max-w-sm mb-5">
                      {searchQuery
                        ? "Want this to happen? Spark it right now and invite whoever is nearby to join."
                        : selectedVibe !== 'all'
                        ? 'Nothing matches this vibe currently. Be the first to start it!'
                        : 'No active moments found. Launch the first one.'}
                    </p>
                    <div className="flex items-center gap-3">
                      {searchQuery && (
                        <Button
                          variant="secondary"
                          size="md"
                          onClick={() => {
                            setSearchQuery('');
                            setFilterChip('all');
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => {
                          setSparkInitialTitle(searchQuery);
                          setIsSparkOpen(true);
                        }}
                      >
                        {searchQuery ? `+ Spark "${searchQuery}"` : '+ Start Something'}
                      </Button>
                    </div>
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
                  {moments.slice(0, 5).map((m) => (
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

              {/* Drops Tab Filter Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-black/[0.03] rounded-2xl border border-black/[0.06] shrink-0">
                <button
                  type="button"
                  onClick={() => setDropsFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    dropsFilter === 'all' ? 'bg-white text-mova-ocean shadow-xs' : 'text-mova-muted hover:text-mova-nearblack'
                  }`}
                >
                  All ({drops.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDropsFilter('active')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    dropsFilter === 'active' ? 'bg-white text-mova-ocean shadow-xs' : 'text-mova-muted hover:text-mova-nearblack'
                  }`}
                >
                  Live 5m ({drops.filter(d => d.status === 'active').length})
                </button>
                <button
                  type="button"
                  onClick={() => setDropsFilter('upcoming')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    dropsFilter === 'upcoming' ? 'bg-white text-mova-ocean shadow-xs' : 'text-mova-muted hover:text-mova-nearblack'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  type="button"
                  onClick={() => setDropsFilter('completed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    dropsFilter === 'completed' ? 'bg-white text-mova-ocean shadow-xs' : 'text-mova-muted hover:text-mova-nearblack'
                  }`}
                >
                  Archived Capsules
                </button>
              </div>
            </div>

            {/* Drops Cards Grid */}
            {filteredDrops.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center justify-center rounded-bento bg-white border border-black/[0.06] shadow-xs">
                <div className="w-14 h-14 rounded-full bg-black/[0.03] flex items-center justify-center text-mova-ocean mb-3 shadow-xs">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-crayon text-2xl text-mova-nearblack mb-1">No drops in this category.</h3>
                <p className="text-xs text-mova-muted mb-4">Switch to "All" or explore active drops.</p>
                <Button variant="secondary" size="sm" onClick={() => setDropsFilter('all')}>
                  Show All Drops
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {filteredDrops.map((drop) => (
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
            )}
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

            {/* Scrapbook Polaroid Grid with Temporal Grouping */}
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
              <div className="flex flex-col gap-10">
                {/* Temporal Group: Today's Collective Archives */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-black/[0.06]">
                    <span className="w-2.5 h-2.5 rounded-full bg-mova-orange" />
                    <h3 className="font-crayon text-xl font-bold text-mova-ocean">Today's Shared Archives</h3>
                    <span className="text-xs text-mova-muted font-mono-tabular">({memories.slice(0, 3).length} moments)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {memories.slice(0, 3).map((mem) => (
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
                </div>

                {/* Temporal Group: Past 48 Hours with Typographic Keepsake Card */}
                {memories.length > 3 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-black/[0.06]">
                      <span className="w-2.5 h-2.5 rounded-full bg-mova-ocean/50" />
                      <h3 className="font-crayon text-xl font-bold text-mova-ocean">Past 48 Hours</h3>
                      <span className="text-xs text-mova-muted font-mono-tabular">({memories.slice(3).length} moments)</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {memories.slice(3).map((mem) => (
                        <MemoryCard
                          key={mem.id}
                          memory={mem}
                          onOpenMemory={(m) => {
                            playClick();
                            setActiveMemoryForModal(m);
                          }}
                        />
                      ))}

                      {/* Typographic Keepsake Artifact Card (Prompt Edge-Case: Memory with No Images) */}
                      <div className="p-6 rounded-bento bg-[#FBF9F5] border-2 border-dashed border-amber-200/80 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100/70 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                              Typographic Keepsake
                            </span>
                            <span className="text-[11px] text-mova-muted font-mono-tabular">Yesterday · 11:40 PM</span>
                          </div>
                          <h4 className="font-crayon text-2xl text-mova-ocean font-bold mb-2">
                            "The stairs where nobody asked for names."
                          </h4>
                          <p className="text-xs text-mova-muted italic leading-relaxed mb-4">
                            Four strangers sat on the library steps during the sudden rainstorm. No photos were taken, but the sound of the acoustic guitar lingered for an hour.
                          </p>
                        </div>
                        <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-mova-muted">
                          <span>📍 Main Quad Steps</span>
                          <span className="font-bold text-mova-ocean">4 joined</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
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
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="hover:underline flex items-center gap-1 text-mova-ocean"
            >
              <span>Product Tour</span>
            </button>
            <span>·</span>
            <span className="text-mova-ocean font-semibold">No Vanity Metrics · Pure Synchrony</span>
          </div>
        </div>
      </footer>

      {/* 4. Interactive Drawers and Modals */}
      <ConfirmationDrawer
        key={selectedMomentForDrawer?.id ?? 'none'}
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
        currentUser={userProfile}
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
        key={isSparkOpen ? `spark-${sparkInitialTitle}` : 'spark-closed'}
        isOpen={isSparkOpen}
        onClose={() => setIsSparkOpen(false)}
        onCreateMoment={handleCreateSpark}
        defaultVibeId={selectedVibe}
        initialTitle={sparkInitialTitle}
        currentUser={userProfile}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      <IdentityDrawer
        isOpen={isIdentityOpen}
        onClose={() => setIsIdentityOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
        onOpenCustomVibe={() => {
          setIsIdentityOpen(false);
          setIsCustomVibeOpen(true);
        }}
      />

      <ActivityDrawer
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        notifications={notifications}
        onSelectNotification={(n) => {
          setIsActivityOpen(false);
          // Mark notification as read
          setNotifications((prev) =>
            prev.map((notif) => (notif.id === n.id ? { ...notif, read: true } : notif))
          );
          if (n.momentId) {
            const m = moments.find((mom) => mom.id === n.momentId);
            if (m) setActiveMomentForThread(m);
          } else if (n.dropId) {
            const d = drops.find((dr) => dr.id === n.dropId);
            if (d) setActiveDropForModal(d);
          }
        }}
        onClearAll={() => setNotifications([])}
      />

      <CustomVibeModal
        isOpen={isCustomVibeOpen}
        onClose={() => setIsCustomVibeOpen(false)}
        onSaveCustomVibe={handleSaveCustomVibe}
        initialValue={userProfile.customVibeText || ''}
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

export function App() {
  return (
    <ToastProvider>
      <MOVAApp />
    </ToastProvider>
  );
}
