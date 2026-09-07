import { Drop } from '../types/mova';

export const INITIAL_DROPS: Drop[] = [
  {
    id: 'drop-live-moment',
    title: '8:00 PM SYNCHRONIZED DROP',
    prompt: "Show us what is directly in front of your eyes right now. No posing, just real presence.",
    totalSeconds: 300, // 5 minutes
    remainingSeconds: 247,
    participantCount: 42,
    status: 'active',
    contributionsCount: 19,
    vibeId: 'spontaneous',
    previewImages: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ],
    associatedMomentId: 'moment-rain-chaos',
  },
  {
    id: 'drop-canteen-views',
    title: 'TEA CUP STEAM CAPTURE',
    prompt: 'Drop the steam rising from whatever hot drink you are holding right now.',
    totalSeconds: 300,
    remainingSeconds: 0,
    participantCount: 28,
    status: 'completed',
    contributionsCount: 16,
    vibeId: 'chill',
    previewImages: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ],
    associatedMomentId: 'moment-chai-samosa',
  },
  {
    id: 'drop-upcoming-sketch',
    title: '10:00 PM MIDNIGHT DOODLE',
    prompt: 'Draw one continuous single-line sketch of what made you smile today.',
    totalSeconds: 300,
    remainingSeconds: 300,
    participantCount: 15,
    status: 'upcoming',
    contributionsCount: 0,
    vibeId: 'create',
    previewImages: [],
  }
];
