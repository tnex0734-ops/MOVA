import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardNav } from '../src/hooks/useKeyboardNav';

describe('useKeyboardNav Hook Accessibility Guardrails', () => {
  let onPass: ReturnType<typeof vi.fn>;
  let onJoin: ReturnType<typeof vi.fn>;
  let onEscape: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onPass = vi.fn();
    onJoin = vi.fn();
    onEscape = vi.fn();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('triggers onPass on ArrowLeft when enabled', () => {
    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(onPass).toHaveBeenCalledTimes(1);
    expect(onJoin).not.toHaveBeenCalled();
  });

  it('triggers onJoin on ArrowRight when enabled', () => {
    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(onJoin).toHaveBeenCalledTimes(1);
    expect(onPass).not.toHaveBeenCalled();
  });

  it('triggers onEscape on Escape key', () => {
    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('suppresses arrow shortcuts when focused inside an input element', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    expect(onPass).not.toHaveBeenCalled();
    expect(onJoin).not.toHaveBeenCalled();
  });

  it('suppresses arrow shortcuts when focused inside a textarea element', () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();

    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    expect(onPass).not.toHaveBeenCalled();
    expect(onJoin).not.toHaveBeenCalled();
  });

  it('allows Escape key even when focused in an input to dismiss focus', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('suppresses card swipe shortcuts when an accessible dialog is open', () => {
    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');
    document.body.appendChild(dialog);

    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    expect(onPass).not.toHaveBeenCalled();
    expect(onJoin).not.toHaveBeenCalled();
    // Escape should still close the dialog
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('does nothing when disabled is set to true', () => {
    renderHook(() => useKeyboardNav({ onPass, onJoin, onEscape, disabled: true }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(onPass).not.toHaveBeenCalled();
    expect(onJoin).not.toHaveBeenCalled();
    expect(onEscape).not.toHaveBeenCalled();
  });
});
