import { useState, useCallback } from 'react';
import { sound } from '../lib/sound';

export function useAudioFeedback() {
  const [isEnabled, setIsEnabled] = useState<boolean>(!sound.getMuted());

  const toggleSound = useCallback(() => {
    const nextState = sound.toggleMute();
    setIsEnabled(nextState);
    if (nextState) {
      sound.playClick();
    }
  }, []);

  const playClick = useCallback(() => sound.playClick(), []);
  const playJoin = useCallback(() => sound.playJoin(), []);
  const playPass = useCallback(() => sound.playPass(), []);
  const playDropAlert = useCallback(() => sound.playDropAlert(), []);

  return {
    isEnabled,
    toggleSound,
    playClick,
    playJoin,
    playPass,
    playDropAlert,
  };
}
