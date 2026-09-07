// Official 3D Icons from 3dicons.co by Vijay Verma (realvjy)
// CC0 Open Source, high-resolution 3D renders with dynamic lighting & clay textures
// Source: https://3dicons.co/

const STORAGE_URL = 'https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes';

export const ICONS_3D = {
  // 8 Canonical Vibes
  chill: `${STORAGE_URL}/845bf0-tea-cup/dynamic/200/color.webp`,
  play: `${STORAGE_URL}/866e45-play/dynamic/200/color.webp`,
  study: `${STORAGE_URL}/628100-notebook/dynamic/200/color.webp`,
  explore: `${STORAGE_URL}/a0330a-explorer/dynamic/200/color.webp`,
  create: `${STORAGE_URL}/82db59-color-palette/dynamic/200/color.webp`,
  eat: `${STORAGE_URL}/7fb19c-cup/dynamic/200/color.webp`,
  talk: `${STORAGE_URL}/eec43d-chat-bubble/dynamic/200/color.webp`,
  spontaneous: `${STORAGE_URL}/6bfe8c-fire/dynamic/200/color.webp`,

  // Core UI Actions & Elements
  spark: `${STORAGE_URL}/637858-flash/dynamic/200/color.webp`,
  sparkles: `${STORAGE_URL}/17125d-star/dynamic/200/color.webp`,
  photo: `${STORAGE_URL}/5656e5-camera/dynamic/200/color.webp`,
  voice: `${STORAGE_URL}/fddbbc-mic/dynamic/200/color.webp`,
  sketch: `${STORAGE_URL}/66b0f8-pencil/dynamic/200/color.webp`,
  text: `${STORAGE_URL}/65d841-file-text/dynamic/200/color.webp`,
  location: `${STORAGE_URL}/1858b9-map-pin/dynamic/200/color.webp`,
  clock: `${STORAGE_URL}/8ef1fa-clock/dynamic/200/color.webp`,
  trophy: `${STORAGE_URL}/39121b-medal/dynamic/200/color.webp`,
  people: `${STORAGE_URL}/a14880-boy/dynamic/200/color.webp`,
  heart: `${STORAGE_URL}/1acc3d-heart/dynamic/200/color.webp`,
  world: `${STORAGE_URL}/a0330a-explorer/dynamic/200/color.webp`,
  cards: `${STORAGE_URL}/49b6f4-target/dynamic/200/color.webp`,
} as const;

export type Icon3DKey = keyof typeof ICONS_3D;
