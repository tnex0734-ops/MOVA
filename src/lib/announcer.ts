// Accessible Screen Reader Announcer State & Handler
let globalAnnounce: ((message: string) => void) | null = null;

export function setGlobalAnnounceHandler(handler: ((message: string) => void) | null) {
  globalAnnounce = handler;
}

export function announce(message: string) {
  if (globalAnnounce) {
    globalAnnounce(message);
  }
}
