import { useState, useEffect } from 'react';

// Single centralized shared clock hook per specification (Sec 28 & 52 of Master Prompt)
// Pauses when tab is hidden to preserve battery and CPU
export function useClock() {
  const [now, setNow] = useState<number>(Date.now());
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const timerId = setInterval(() => {
      if (!document.hidden) {
        setNow(Date.now());
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return { now, isTabVisible };
}
