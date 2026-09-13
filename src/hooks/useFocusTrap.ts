import { useEffect, useRef } from 'react';

interface FocusTrapOptions {
  isOpen: boolean;
  onClose?: () => void;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

export function useFocusTrap<T extends HTMLElement = HTMLDivElement>({
  isOpen,
  onClose,
  initialFocusRef,
}: FocusTrapOptions) {
  const containerRef = useRef<T>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const initialFocusRefRef = useRef(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const hasFocusedForThisOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      hasFocusedForThisOpenRef.current = false;
      return;
    }

    // Save previous active element for restoration on close
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Lock body scroll while modal is open to avoid background scroll chaining
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus designated element or first focusable child ONLY ONCE per modal opening
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!hasFocusedForThisOpenRef.current) {
      hasFocusedForThisOpenRef.current = true;
      timer = setTimeout(() => {
        // If the user already focused something inside the modal container, do NOT steal or jump focus
        if (containerRef.current && containerRef.current.contains(document.activeElement)) {
          return;
        }

        if (initialFocusRefRef.current?.current) {
          initialFocusRefRef.current.current.focus({ preventScroll: true });
        } else if (containerRef.current) {
          const focusables = containerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
          );
          if (focusables.length > 0) {
            focusables[0].focus({ preventScroll: true });
          }
        }
      }, 50);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onCloseRef.current?.();
        return;
      }

      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        )
      ).filter((el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0);

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: if on first element, wrap around to last
        if (document.activeElement === firstElement || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          lastElement.focus({ preventScroll: true });
        }
      } else {
        // Tab: if on last element, wrap around to first
        if (document.activeElement === lastElement || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          firstElement.focus({ preventScroll: true });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Restore focus to previous active element only on final unmount or close
  useEffect(() => {
    return () => {
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus({ preventScroll: true });
      }
    };
  }, []);

  return containerRef;
}
