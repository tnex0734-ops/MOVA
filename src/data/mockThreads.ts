import { Contribution, ThreadBranch } from '../types/mova';

export const INITIAL_CONTRIBUTIONS: Record<string, Contribution[]> = {
  'moment-rain-chaos': [
    {
      id: 'c-root-1',
      momentId: 'moment-rain-chaos',
      parentId: null,
      author: {
        id: 'user-tara',
        name: 'Tara V.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        joinedAt: '20m ago',
      },
      type: 'photo',
      content: 'Torrential downpour started out of nowhere! Verandah is full.',
      mediaUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=80',
      timestamp: '20m ago',
      branchName: 'Root Moment',
      likesCount: 12,
    },
    {
      id: 'c-branch-1',
      momentId: 'moment-rain-chaos',
      parentId: 'c-root-1',
      author: {
        id: 'u7',
        name: 'Samir L.',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
        joinedAt: '18m ago',
      },
      type: 'text',
      content: 'Canteen is packed to the brim, but someone managed to snag 3 extra chairs!',
      timestamp: '17m ago',
      branchName: 'Canteen Run',
      likesCount: 5,
    },
    {
      id: 'c-subbranch-1',
      momentId: 'moment-rain-chaos',
      parentId: 'c-branch-1',
      author: {
        id: 'u9',
        name: 'Vikram C.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        joinedAt: '12m ago',
      },
      type: 'voice',
      content: 'Voice note: 0:14 — Singing along to acoustic chords echoing in the hallway',
      timestamp: '14m ago',
      branchName: 'Acoustic Jam',
      likesCount: 9,
    },
    {
      id: 'c-subbranch-2',
      momentId: 'moment-rain-chaos',
      parentId: 'c-branch-1',
      author: {
        id: 'u8',
        name: 'Ananya R.',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
        joinedAt: '15m ago',
      },
      type: 'sketch',
      content: 'Scribbled a map of where dry socks can be found on campus',
      mediaUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80',
      timestamp: '10m ago',
      branchName: 'Dry Socks Map',
      likesCount: 7,
    },
  ],
  'moment-chai-samosa': [
    {
      id: 'c-chai-root',
      momentId: 'moment-chai-samosa',
      parentId: null,
      author: {
        id: 'user-arun',
        name: 'Arun K.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        joinedAt: '12m ago',
      },
      type: 'photo',
      content: 'Steaming ginger chai batch is hot and crispy samosas just dropped!',
      mediaUrl: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&auto=format&fit=crop&q=80',
      timestamp: '12m ago',
      branchName: 'Fresh Batch',
      likesCount: 8,
    },
    {
      id: 'c-chai-sub1',
      momentId: 'moment-chai-samosa',
      parentId: 'c-chai-root',
      author: {
        id: 'u1',
        name: 'Priya M.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        joinedAt: '10m ago',
      },
      type: 'text',
      content: 'Window booth grabbed. Room for 3 more on the bench!',
      timestamp: '9m ago',
      branchName: 'Window Seat',
      likesCount: 4,
    }
  ]
};

export const INITIAL_BRANCHES: Record<string, ThreadBranch[]> = {
  'moment-rain-chaos': [
    {
      id: 'branch-1',
      momentId: 'moment-rain-chaos',
      name: 'Verandah Acoustic Session',
      rootContributionId: 'c-root-1',
      contributions: INITIAL_CONTRIBUTIONS['moment-rain-chaos'],
      participantCount: 14,
    },
    {
      id: 'branch-2',
      momentId: 'moment-rain-chaos',
      name: 'Paper Boat Regatta',
      rootContributionId: 'c-branch-1',
      contributions: [],
      participantCount: 6,
    }
  ]
};
