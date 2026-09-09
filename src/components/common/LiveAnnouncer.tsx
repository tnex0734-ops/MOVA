import React, { useState, useEffect } from 'react';
import { setGlobalAnnounceHandler } from '../../lib/announcer';

export const LiveAnnouncer: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    setGlobalAnnounceHandler((msg: string) => {
      // Clear first to ensure subsequent identical messages re-trigger aria-live
      setAnnouncement('');
      setTimeout(() => {
        setAnnouncement(msg);
      }, 50);
    });

    return () => {
      setGlobalAnnounceHandler(null);
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
