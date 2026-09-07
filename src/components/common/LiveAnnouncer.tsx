import React, { useState, useEffect } from 'react';

// Centralized Accessible Screen Reader Announcer
let globalAnnounce: ((message: string) => void) | null = null;

export function announce(message: string) {
  if (globalAnnounce) {
    globalAnnounce(message);
  }
}

export const LiveAnnouncer: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    globalAnnounce = (msg: string) => {
      // Clear first to ensure subsequent identical messages re-trigger aria-live
      setAnnouncement('');
      setTimeout(() => {
        setAnnouncement(msg);
      }, 50);
    };

    return () => {
      globalAnnounce = null;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};
