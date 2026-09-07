import { describe, it, expect } from 'vitest';
import {
  validateMomentTitle,
  validateLocation,
  validateContributionContent,
  sanitizeText,
  isValidMediaUrl,
} from '../src/lib/validation';

describe('Validation Guardrails', () => {
  it('validates moment titles within bounds', () => {
    expect(validateMomentTitle('').isValid).toBe(false);
    expect(validateMomentTitle('Hi').isValid).toBe(false); // < 3 chars
    expect(validateMomentTitle('Chai Run at Canteen').isValid).toBe(true);
    expect(validateMomentTitle('a'.repeat(81)).isValid).toBe(false); // > 80 chars
  });

  it('validates locations properly', () => {
    expect(validateLocation('').isValid).toBe(false);
    expect(validateLocation('Campus Canteen · Block B').isValid).toBe(true);
    expect(validateLocation('x'.repeat(61)).isValid).toBe(false);
  });

  it('validates contribution content within bounds', () => {
    expect(validateContributionContent('').isValid).toBe(false);
    expect(validateContributionContent('Window table is free!').isValid).toBe(true);
    expect(validateContributionContent('a'.repeat(501)).isValid).toBe(false);
  });

  it('sanitizes text by stripping harmful brackets', () => {
    expect(sanitizeText('<script>alert("hack")</script>Hello')).toBe('scriptalert("hack")/scriptHello');
    expect(sanitizeText('   Clean text   ')).toBe('Clean text');
  });

  it('validates safe media URLs', () => {
    expect(isValidMediaUrl('https://example.com/photo.jpg')).toBe(true);
    expect(isValidMediaUrl('http://example.com/photo.jpg')).toBe(true);
    expect(isValidMediaUrl('blob:http://localhost:3000/123')).toBe(true);
    expect(isValidMediaUrl('javascript:alert(1)')).toBe(false);
    expect(isValidMediaUrl('not-a-valid-url')).toBe(false);
  });
});
