import { createImageUrlBuilder } from '@sanity/image-url';
import { dataset, projectId } from './client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
});

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source).auto('format').fit('max');
}

/** Returns URL string or empty string if no image */
export function urlForImageStr(source: SanityImageSource | null | undefined): string {
  if (!source) return '';
  try {
    return urlForImage(source).url();
  } catch {
    return '';
  }
}
