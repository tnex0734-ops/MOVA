// MOVA Domain Type Definitions

export type VibeId = 
  | 'chill'
  | 'play'
  | 'study'
  | 'explore'
  | 'create'
  | 'eat'
  | 'talk'
  | 'spontaneous';

import { Icon3DKey } from '../lib/icons3d';

export interface Vibe {
  id: VibeId;
  label: string;
  icon: string;
  icon3d?: Icon3DKey;
  description: string;
  color: string;
  activeCount: number;
}

export type MomentStatus = 
  | 'starting' 
  | 'active' 
  | 'evolving' 
  | 'closing' 
  | 'closed'
  | 'full'
  | 'cancelled'
  | 'unavailable';

export type ActivityLevel = 'dormant' | 'active' | 'hot' | 'closing';

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  joinedAt: string;
}

export interface Moment {
  id: string;
  title: string;
  vibeId: VibeId;
  location: string;
  participantCount: number;
  maxParticipants?: number;
  remainingMinutes: number;
  status: MomentStatus;
  activityLevel: ActivityLevel;
  description: string;
  initiator: Participant;
  participants: Participant[];
  tags: string[];
  coordinates: { x: number; y: number }; // Relative coordinates (0-100%) for desktop Live World
  geo?: { lat: number; lng: number }; // Real geographic coordinates for Realistic Campus Map
  photoUrl?: string; // High quality cover image for the moment
  distanceMeters?: number; // Distance from user (e.g. 180m)
  walkingMinutes?: number; // Estimated walking time (e.g. 2 min)
  hasDrop?: boolean;
  dropId?: string;
  isJoined?: boolean;
  isPassed?: boolean;
  isFull?: boolean;
  isCancelled?: boolean;
  isScheduled?: boolean;
  scheduledDate?: string; // e.g. "Today", "Tomorrow", "This Weekend", or "2026-09-14"
  scheduledTime?: string; // e.g. "5:30 PM", "17:30"
  createdAt: string;
}

export type ContributionType = 'photo' | 'voice' | 'sketch' | 'text';

export interface Contribution {
  id: string;
  momentId: string;
  parentId?: string | null;
  author: Participant;
  type: ContributionType;
  content: string;
  mediaUrl?: string;
  caption?: string;
  voiceDurationSeconds?: number;
  sketchDataUrl?: string;
  timestamp: string;
  branchName?: string;
  likesCount?: number;
}

export interface ThreadBranch {
  id: string;
  momentId: string;
  name: string;
  rootContributionId: string;
  contributions: Contribution[];
  participantCount: number;
}

export interface Drop {
  id: string;
  title: string;
  prompt: string;
  totalSeconds: number;
  remainingSeconds: number;
  participantCount: number;
  status: 'active' | 'upcoming' | 'completed';
  contributionsCount: number;
  vibeId: VibeId;
  previewImages: string[];
  associatedMomentId?: string;
}

export interface Memory {
  id: string;
  momentId: string;
  title: string;
  vibeId: VibeId;
  date: string;
  location: string;
  participantsCount: number;
  contributionsCount: number;
  branchesCount: number;
  meetupOccurred: boolean;
  scrapbookNote: string;
  polaroidImages: Array<{
    url: string;
    caption: string;
    rotation: number;
  }>;
  highlightQuotes: string[];
}

export type CampusArea = 
  | 'all'
  | 'central_quad'
  | 'library'
  | 'canteen'
  | 'sports_complex'
  | 'arts_studio';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  campusArea: string;
  currentVibeId: VibeId | 'all';
  customVibeText?: string;
  joinedMomentsCount: number;
  contributionsCount: number;
  sparksStartedCount: number;
}

export interface ActivityNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'join' | 'drop_start' | 'moment_closed' | 'branch_created';
  momentId?: string;
  dropId?: string;
  read: boolean;
}

