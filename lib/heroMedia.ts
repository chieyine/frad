const HERO_VIDEO_BY_IMAGE: Record<string, string> = {
  '/images/frad-field-hero.jpg': '/videos/frad-field-loop.mp4',
  '/images/frad-programme-outreach.jpg': '/videos/frad-programme-loop.mp4',
  '/images/frad-water-access.jpg': '/videos/frad-water-loop.mp4',
};

export function getHeroVideoForImage(image?: string) {
  if (!image) return HERO_VIDEO_BY_IMAGE['/images/frad-field-hero.jpg'];
  return HERO_VIDEO_BY_IMAGE[image];
}
