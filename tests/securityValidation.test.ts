import { describe, it, expect } from 'vitest';
import {
  validateMomentTitle,
  validateLocation,
  validateContributionContent,
  sanitizeText,
  isValidMediaUrl,
} from '../src/lib/validation';

describe('Comprehensive Security & Data Sanitization', () => {
  describe('Input length limits & whitespace trimming', () => {
    it('rejects empty or whitespace-only moment titles', () => {
      expect(validateMomentTitle('').isValid).toBe(false);
      expect(validateMomentTitle('   ').isValid).toBe(false);
      expect(validateMomentTitle('\t\n').isValid).toBe(false);
    });

    it('enforces character minimums and maximums for titles', () => {
      expect(validateMomentTitle('ab').isValid).toBe(false); // < 3 chars
      expect(validateMomentTitle('Tea').isValid).toBe(true); // exactly 3 chars
      expect(validateMomentTitle('a'.repeat(80)).isValid).toBe(true); // exactly 80 chars
      expect(validateMomentTitle('a'.repeat(81)).isValid).toBe(false); // > 80 chars
    });

    it('enforces bounds on location and contribution text', () => {
      expect(validateLocation('').isValid).toBe(false);
      expect(validateLocation('   ').isValid).toBe(false);
      expect(validateLocation('Campus Hub').isValid).toBe(true);
      expect(validateLocation('a'.repeat(61)).isValid).toBe(false);

      expect(validateContributionContent('').isValid).toBe(false);
      expect(validateContributionContent('Window booth is open!').isValid).toBe(true);
      expect(validateContributionContent('a'.repeat(501)).isValid).toBe(false);
    });
  });

  describe('HTML injection sanitization', () => {
    it('strips angle brackets to eliminate HTML injection vectors', () => {
      const malicious = '<img src=x onerror="alert(1)">Hello <script>bad()</script>';
      const sanitized = sanitizeText(malicious);
      expect(sanitized).not.toContain('<');
      expect(sanitized).not.toContain('>');
      expect(sanitized).toBe('img src=x onerror="alert(1)"Hello scriptbad()/script');
    });

    it('trims leading and trailing whitespace safely', () => {
      expect(sanitizeText('   clean content   ')).toBe('clean content');
    });
  });

  describe('Strict URL scheme and MIME security', () => {
    it('allows safe http, https, and blob URLs', () => {
      expect(isValidMediaUrl('https://images.unsplash.com/photo-1')).toBe(true);
      expect(isValidMediaUrl('http://campus.edu/photo.jpg')).toBe(true);
      expect(isValidMediaUrl('blob:http://localhost:5173/a1b2c3')).toBe(true);
    });

    it('strictly permits safe data:image and data:audio Base64 URLs', () => {
      expect(isValidMediaUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUg==')).toBe(true);
      expect(isValidMediaUrl('data:image/jpeg;base64,/9j/4AAQSkZJRg==')).toBe(true);
      expect(isValidMediaUrl('data:image/webp;base64,UklGRkIAAABXRUJQ')).toBe(true);
      expect(isValidMediaUrl('data:audio/webm;base64,GkXfo59ChoEBQveBAULygQ8=')).toBe(true);
    });

    it('rejects unsafe schemes (javascript:, vbscript:, file:)', () => {
      expect(isValidMediaUrl('javascript:alert(document.cookie)')).toBe(false);
      expect(isValidMediaUrl('javascript:/*--></title></style>alert(1)')).toBe(false);
      expect(isValidMediaUrl('vbscript:msgbox("hello")')).toBe(false);
      expect(isValidMediaUrl('file:///etc/passwd')).toBe(false);
    });

    it('rejects malicious data URLs containing executable HTML or scripts', () => {
      expect(isValidMediaUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==')).toBe(false);
      expect(isValidMediaUrl('data:text/javascript;base64,YWxlcnQoMSk=')).toBe(false);
      expect(isValidMediaUrl('data:application/javascript;base64,YWxlcnQoMSk=')).toBe(false);
    });
  });
});
