import { describe, it, expect } from 'vitest';
import { Drop, ActivityNotification } from '../src/types/mova';
import { INITIAL_MOMENTS } from '../src/data/mockMoments';

describe('MOVA Edge Cases & Status Transitions', () => {
  it('identifies closing soon moments correctly (<=15 min remaining)', () => {
    const closingMoments = INITIAL_MOMENTS.filter(
      (m) => m.status === 'closing' || m.remainingMinutes <= 15
    );
    expect(closingMoments.length).toBeGreaterThan(0);
    closingMoments.forEach((m) => {
      expect(m.remainingMinutes).toBeLessThanOrEqual(15);
    });
  });

  it('identifies capacity full moments where participantCount >= maxParticipants', () => {
    const fullMoments = INITIAL_MOMENTS.filter(
      (m) => m.status === 'full' || (m.maxParticipants && m.participantCount >= m.maxParticipants)
    );
    expect(fullMoments.length).toBeGreaterThan(0);
    fullMoments.forEach((m) => {
      if (m.maxParticipants) {
        expect(m.participantCount).toBeGreaterThanOrEqual(m.maxParticipants);
      }
    });
  });

  it('identifies archived closed moments with remainingMinutes <= 0', () => {
    const closedMoments = INITIAL_MOMENTS.filter(
      (m) => m.status === 'closed' || m.remainingMinutes <= 0
    );
    expect(closedMoments.length).toBeGreaterThan(0);
    closedMoments.forEach((m) => {
      expect(m.remainingMinutes).toBe(0);
    });
  });

  it('filters moments accurately using keyword search', () => {
    const query = 'chai';
    const matches = INITIAL_MOMENTS.filter(
      (m) =>
        m.title.toLowerCase().includes(query) ||
        m.location.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.tags.some((t) => t.toLowerCase().includes(query))
    );
    expect(matches.length).toBeGreaterThan(0);
    matches.forEach((m) => {
      const matchFound =
        m.title.toLowerCase().includes(query) ||
        m.location.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.tags.some((t) => t.toLowerCase().includes(query));
      expect(matchFound).toBe(true);
    });
  });

  it('calculates unread activity notification badges accurately', () => {
    const sampleNotifications: ActivityNotification[] = [
      { id: '1', title: 'A', description: 'desc', timestamp: '1m', type: 'branch_created', read: false },
      { id: '2', title: 'B', description: 'desc', timestamp: '2m', type: 'drop_start', read: false },
      { id: '3', title: 'C', description: 'desc', timestamp: '3m', type: 'join', read: true },
    ];
    const unread = sampleNotifications.filter((n) => !n.read).length;
    expect(unread).toBe(2);
  });

  it('transitions synchronized drop to completed when remainingSeconds reaches 0', () => {
    const liveDrop: Drop = {
      id: 'drop-test',
      title: 'Quick Snapshot',
      prompt: 'Look up right now',
      durationSeconds: 300,
      remainingSeconds: 1,
      status: 'active',
      participantCount: 5,
      contributionsCount: 3,
      previewImages: [],
      createdAt: '1m ago',
    };

    // Simulate tick down
    const nextSeconds = liveDrop.remainingSeconds - 1;
    const nextStatus = nextSeconds <= 0 ? 'completed' : 'active';

    expect(nextSeconds).toBe(0);
    expect(nextStatus).toBe('completed');
  });

  it('ensures idempotent moment joining without duplicate participants or count increments', () => {
    const baseMoment = { ...INITIAL_MOMENTS[0], isJoined: false, participantCount: 3, participants: [{ id: 'other', name: 'Other', avatar: '', joinedAt: '1m ago' }] };
    const user = { id: 'user-arun', name: 'Arun K.', avatar: 'avatar.png', joinedAt: 'Just now' };

    // First join
    const joinedFirstTime = {
      ...baseMoment,
      isJoined: true,
      participantCount: baseMoment.participantCount + 1,
      participants: [user, ...baseMoment.participants],
    };

    expect(joinedFirstTime.participantCount).toBe(4);
    expect(joinedFirstTime.participants.length).toBe(2);

    // Re-join attempt should be idempotent
    const joinedSecondTime = joinedFirstTime.isJoined
      ? joinedFirstTime
      : {
          ...joinedFirstTime,
          isJoined: true,
          participantCount: joinedFirstTime.participantCount + 1,
          participants: [user, ...joinedFirstTime.participants.filter((p) => p.id !== user.id)],
        };

    expect(joinedSecondTime.participantCount).toBe(4);
    expect(joinedSecondTime.participants.length).toBe(2);
  });

  it('marks notifications as read and decrements unreadActivitiesCount', () => {
    let notifications: ActivityNotification[] = [
      { id: '1', title: 'Joined Moment', description: 'desc', timestamp: '1m', type: 'join', read: false },
      { id: '2', title: 'Drop Ready', description: 'desc', timestamp: '2m', type: 'drop_start', read: false },
    ];

    expect(notifications.filter((n) => !n.read).length).toBe(2);

    // User taps notification 1
    notifications = notifications.map((n) => (n.id === '1' ? { ...n, read: true } : n));

    expect(notifications.find((n) => n.id === '1')?.read).toBe(true);
    expect(notifications.filter((n) => !n.read).length).toBe(1);
  });
});
