import { Memory } from '../types/mova';

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-monsoon-jam',
    momentId: 'moment-rain-chaos-yesterday',
    title: 'Monsoon Acoustic Verandah',
    vibeId: 'spontaneous',
    date: 'Yesterday · 8:14 PM',
    location: 'Science Block Quadrangle',
    participantsCount: 22,
    contributionsCount: 38,
    branchesCount: 4,
    meetupOccurred: true,
    scrapbookNote: 'Started with 3 people hiding under the concrete eaves. By 8:30 PM, 22 strangers were singing songs together while lightning flashed across the sky.',
    polaroidImages: [
      {
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
        caption: 'The acoustic circle at 8:20 PM',
        rotation: -2.5,
      },
      {
        url: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=500&auto=format&fit=crop&q=80',
        caption: 'Rain pouring over the steps',
        rotation: 3.1,
      },
    ],
    highlightQuotes: [
      '"Best unintended Friday in months"',
      '"Whoever made tea run #2 is a legend"',
      '"Paper boats actually survived the stream"',
    ],
  },
  {
    id: 'mem-midnight-chess',
    momentId: 'moment-chess-lobby',
    title: 'Hostel Lobby Blitz Tournament',
    vibeId: 'play',
    date: '2 days ago · 11:30 PM',
    location: 'Hostel 3 Common Room',
    participantsCount: 16,
    contributionsCount: 24,
    branchesCount: 3,
    meetupOccurred: true,
    scrapbookNote: 'One board turned into an 8-person bracket on the whiteboard. Final match ended in a dramatic queen sacrifice stalemate.',
    polaroidImages: [
      {
        url: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500&auto=format&fit=crop&q=80',
        caption: 'Blitz finals on table 1',
        rotation: 1.8,
      },
    ],
    highlightQuotes: [
      '"Kunal played the Evans Gambit out of nowhere"',
      '"Spectator commentary was louder than a football game"',
    ],
  },
  {
    id: 'mem-sunrise-study',
    momentId: 'moment-terrace-sunrise',
    title: 'Pre-Dawn Exam Survival Camp',
    vibeId: 'study',
    date: '3 days ago · 5:45 AM',
    location: 'Hostel Terrace East Corner',
    participantsCount: 11,
    contributionsCount: 18,
    branchesCount: 2,
    meetupOccurred: true,
    scrapbookNote: 'We survived Operating Systems midterm night. Watched the orange sunrise break over the reservoir with thermos coffee.',
    polaroidImages: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
        caption: '5:50 AM sunrise breath',
        rotation: -1.2,
      },
    ],
    highlightQuotes: [
      '"We actually solved the semaphore deadlock at 4 AM"',
      '"Thermos coffee never tasted so sweet"',
    ],
  }
];
