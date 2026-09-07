// Sanitization and Validation Guardrails for MOVA

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateMomentTitle(title: string): ValidationResult {
  const trimmed = title.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Moment title cannot be empty.' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Moment title must be at least 3 characters.' };
  }
  if (trimmed.length > 80) {
    return { isValid: false, error: 'Moment title cannot exceed 80 characters.' };
  }
  return { isValid: true };
}

export function validateLocation(location: string): ValidationResult {
  const trimmed = location.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Location cannot be empty.' };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'Location cannot exceed 60 characters.' };
  }
  return { isValid: true };
}

export function validateContributionContent(content: string): ValidationResult {
  const trimmed = content.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Contribution cannot be empty.' };
  }
  if (trimmed.length > 500) {
    return { isValid: false, error: 'Contribution cannot exceed 500 characters.' };
  }
  return { isValid: true };
}

export function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[<>]/g, '') // Strip brackets to prevent accidental HTML injection
    .trim();
}

export function isValidMediaUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();

  // Explicitly reject malicious script schemes
  if (/^(javascript|vbscript|file):/i.test(trimmed)) {
    return false;
  }

  // If data URL, ensure it strictly conforms to safe image or audio types
  if (trimmed.startsWith('data:')) {
    return /^data:(image\/(png|jpeg|jpg|webp|gif|svg\+xml)|audio\/(webm|mp3|ogg|wav|mpeg));base64,/i.test(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    return ['http:', 'https:', 'blob:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
