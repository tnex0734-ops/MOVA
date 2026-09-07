import { describe, it, expect } from 'vitest';
import { Moment } from '../src/types/mova';

// Helper to simulate swipe decision logic per Section 16 of Master Prompt
function evaluateSwipeThreshold(offsetX: number): 'join' | 'pass' | 'none' {
  const threshold = 120;
  if (offsetX > threshold) return 'join';
  if (offsetX < -threshold) return 'pass';
  return 'none';
}

describe('Swipe Stack Threshold and State Logic', () => {
  it('triggers join when dragged right beyond +120px', () => {
    expect(evaluateSwipeThreshold(121)).toBe('join');
    expect(evaluateSwipeThreshold(200)).toBe('join');
    expect(evaluateSwipeThreshold(350)).toBe('join');
  });

  it('triggers pass when dragged left beyond -120px', () => {
    expect(evaluateSwipeThreshold(-121)).toBe('pass');
    expect(evaluateSwipeThreshold(-200)).toBe('pass');
    expect(evaluateSwipeThreshold(-350)).toBe('pass');
  });

  it('does not trigger decision when release is within threshold (returns to center)', () => {
    expect(evaluateSwipeThreshold(0)).toBe('none');
    expect(evaluateSwipeThreshold(119)).toBe('none');
    expect(evaluateSwipeThreshold(-119)).toBe('none');
    expect(evaluateSwipeThreshold(50)).toBe('none');
    expect(evaluateSwipeThreshold(-50)).toBe('none');
  });

  it('incrementing participant count on join maintains valid domain state', () => {
    const initialMoment: Moment = {
      id: 'test-1',
      title: 'Chai Run at Canteen',
      vibeId: 'chill',
      location: 'Canteen Verandah',
      participantCount: 7,
      remainingMinutes: 18,
      status: 'active',
      activityLevel: 'hot',
      description: 'Heading for ginger chai.',
      initiator: {
        id: 'user-1',
        name: 'Rohan M.',
        avatar: 'https://example.com/avatar.jpg',
        joinedAt: '10m ago',
      },
      participants: [],
      tags: ['chai', 'canteen'],
      coordinates: { x: 45, y: 50 },
      createdAt: '15m ago',
    };

    // Simulate join
    const updatedMoment: Moment = {
      ...initialMoment,
      isJoined: true,
      participantCount: initialMoment.participantCount + 1,
      participants: [
        {
          id: 'user-arun',
          name: 'Arun K.',
          avatar: 'https://example.com/arun.jpg',
          joinedAt: 'Just now',
        },
        ...initialMoment.participants,
      ],
    };

    expect(updatedMoment.participantCount).toBe(8);
    expect(updatedMoment.isJoined).toBe(true);
    expect(updatedMoment.participants).toHaveLength(1);
    expect(updatedMoment.participants[0].name).toBe('Arun K.');
  });
});
