import { describe, it, expect } from 'vitest';
import { INITIAL_MOMENTS } from '../src/data/mockMoments';
import { CANONICAL_VIBES } from '../src/data/mockVibes';

describe('Vibe System & Filtering Logic', () => {
  it('contains exactly the 8 canonical vibes', () => {
    expect(CANONICAL_VIBES).toHaveLength(8);
    const vibeIds = CANONICAL_VIBES.map((v) => v.id);
    expect(vibeIds).toContain('chill');
    expect(vibeIds).toContain('play');
    expect(vibeIds).toContain('study');
    expect(vibeIds).toContain('explore');
    expect(vibeIds).toContain('create');
    expect(vibeIds).toContain('eat');
    expect(vibeIds).toContain('talk');
    expect(vibeIds).toContain('spontaneous');
  });

  it('filters moments deterministically by vibe', () => {
    const chillMoments = INITIAL_MOMENTS.filter((m) => m.vibeId === 'chill');
    expect(chillMoments.length).toBeGreaterThanOrEqual(1);
    chillMoments.forEach((m) => {
      expect(m.vibeId).toBe('chill');
    });

    const playMoments = INITIAL_MOMENTS.filter((m) => m.vibeId === 'play');
    expect(playMoments.length).toBeGreaterThanOrEqual(1);
    playMoments.forEach((m) => {
      expect(m.vibeId).toBe('play');
    });
  });

  it('all moments have required lifecycle and spatial fields', () => {
    INITIAL_MOMENTS.forEach((m) => {
      expect(m.id).toBeDefined();
      expect(m.title).toBeDefined();
      expect(m.coordinates).toBeDefined();
      expect(m.coordinates.x).toBeGreaterThanOrEqual(0);
      expect(m.coordinates.x).toBeLessThanOrEqual(100);
      expect(m.coordinates.y).toBeGreaterThanOrEqual(0);
      expect(m.coordinates.y).toBeLessThanOrEqual(100);
      expect(m.participantCount).toBeGreaterThanOrEqual(1);
      expect(m.status).toBeDefined();
    });
  });
});
