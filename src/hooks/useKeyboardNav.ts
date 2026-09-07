import { useEffect } from 'react';

interface KeyboardNavProps {
  onPass?: () => void;
  onJoin?: () => void;
  onEscape?: () => void;
  disabled?: boolean;
}

export function useKeyboardNav({ onPass, onJoin, onEscape, disabled = false }: KeyboardNavProps) {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement | null;
      const activeTag = activeElement?.tagName.toLowerCase();
      const isInputFocused =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        activeElement?.isContentEditable;

      // When focused in an input/textarea, allow Escape to close, but block arrow shortcuts
      if (isInputFocused) {
        if (e.key === 'Escape' && onEscape) {
          onEscape();
        }
        return;
      }

      // If a modal/dialog is currently active, do not allow background card pass/join
      const hasOpenDialog = Boolean(document.querySelector('[role="dialog"]'));

      if (e.key === 'ArrowLeft') {
        if (!hasOpenDialog) {
          e.preventDefault();
          onPass?.();
        }
      } else if (e.key === 'ArrowRight') {
        if (!hasOpenDialog) {
          e.preventDefault();
          onJoin?.();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPass, onJoin, onEscape, disabled]);
}
