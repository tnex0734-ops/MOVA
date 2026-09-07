import { describe, it, expect } from 'vitest';
import { formatTimeRemaining, formatSecondsToTimer } from '../src/lib/utils';
import { validateMomentTitle, validateLocation, sanitizeText, isValidMediaUrl } from '../src/lib/validation';
import { CANONICAL_VIBES } from '../src/data/mockVibes';

describe('Responsiveness & Accessibility Guardrails (WCAG 2.2 AA)', () => {
  it('formats temporal counters into accessible non-color labels', () => {
    expect(formatTimeRemaining(45)).toBe('45m left');
    expect(formatTimeRemaining(0)).toBe('Ending now');
    expect(formatTimeRemaining(-5)).toBe('Ending now');

    expect(formatSecondsToTimer(300)).toBe('05:00');
    expect(formatSecondsToTimer(75)).toBe('01:15');
    expect(formatSecondsToTimer(0)).toBe('00:00');
  });

  it('guarantees all canonical vibes include semantic labels and non-color text fallbacks', () => {
    expect(CANONICAL_VIBES.length).toBeGreaterThan(0);
    CANONICAL_VIBES.forEach((vibe) => {
      expect(vibe.id).toBeTruthy();
      expect(vibe.label).toBeTruthy();
      expect(vibe.icon).toBeTruthy();
      expect(typeof vibe.activeCount).toBe('number');
    });
  });

  it('sanitizes dangerous HTML markup from user-submitted text', () => {
    const maliciousInput = '<script>alert("xss")</script>Join badminton at quad!';
    const sanitized = sanitizeText(maliciousInput);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('</script>');
    expect(sanitized).toBe('scriptalert("xss")/scriptJoin badminton at quad!');
  });

  it('validates moment titles with clear error messaging for screen-reader feedback', () => {
    const emptyResult = validateMomentTitle('   ');
    expect(emptyResult.isValid).toBe(false);
    expect(emptyResult.error).toBe('Moment title cannot be empty.');

    const shortResult = validateMomentTitle('ab');
    expect(shortResult.isValid).toBe(false);
    expect(shortResult.error).toBe('Moment title must be at least 3 characters.');

    const validResult = validateMomentTitle('Campus Chai Run at Verandah');
    expect(validResult.isValid).toBe(true);
    expect(validResult.error).toBeUndefined();
  });

  it('validates location strings cleanly', () => {
    expect(validateLocation('').isValid).toBe(false);
    expect(validateLocation('Main Library Steps').isValid).toBe(true);
  });

  it('blocks unsafe protocols while allowing safe image/audio protocols and base64 data URLs', () => {
    expect(isValidMediaUrl('javascript:alert(1)')).toBe(false);
    expect(isValidMediaUrl('vbscript:msgbox(1)')).toBe(false);
    expect(isValidMediaUrl('file:///etc/passwd')).toBe(false);

    expect(isValidMediaUrl('https://images.unsplash.com/photo-123')).toBe(true);
    expect(isValidMediaUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')).toBe(true);
  });
});
