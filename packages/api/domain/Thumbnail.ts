// Reproduces ThumbnailFilterLoader::load (liip/imagine-bundle 2.3.1) and
// AbstractImage::thumbnail (imagine/imagine 1.2.4), the versions pinned by
// backend/composer.lock. The /media/cache/… addresses are stored inside
// installed extensions: their dimensions cannot change.

export interface Box {
  readonly width: number;
  readonly height: number;
}

export interface Crop {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export const FILTERS = {
  s_thumb: { size: 40, quality: 60 },
  m_thumb: { size: 90, quality: 70 },
  l_thumb: { size: 120, quality: 80 },
  xl_thumb: { size: 200, quality: 90 },
} as const;

export type FilterName = keyof typeof FILTERS;

export const isFilterName = (name: string): name is FilterName =>
  Object.prototype.hasOwnProperty.call(FILTERS, name);

export const boxOfFilter = (name: FilterName): Box => ({
  width: FILTERS[name].size,
  height: FILTERS[name].size,
});

export type Transformation =
  | { readonly operation: 'copy' }
  | {
      readonly operation: 'thumbnail';
      readonly resize: Box | null;
      readonly crop: Crop;
    };

const scaled = (box: Box, ratio: number): Box => ({
  width: Math.max(1, Math.round(ratio * box.width)),
  height: Math.max(1, Math.round(ratio * box.height)),
});

const covers = (box: Box, other: Box): boolean =>
  box.width >= other.width && box.height >= other.height;

const centredCorner = (
  from: Box,
  target: Box,
): { readonly x: number; readonly y: number } => ({
  x: Math.max(0, Math.round((from.width - target.width) / 2)),
  y: Math.max(0, Math.round((from.height - target.height) / 2)),
});

const fitsInThumbnail = (source: Box, target: Box): boolean =>
  source.width <= target.width && source.height <= target.height;

export const transformation = (source: Box, target: Box): Transformation => {
  if (fitsInThumbnail(source, target)) return { operation: 'copy' };

  if (covers(source, target)) {
    const ratio = Math.max(
      target.width / source.width,
      target.height / source.height,
    );
    const intermediate = scaled(source, ratio);

    return {
      operation: 'thumbnail',
      resize: intermediate,
      crop: { ...centredCorner(intermediate, target), ...target },
    };
  }

  return {
    operation: 'thumbnail',
    resize: null,
    crop: {
      ...centredCorner(source, target),
      width: Math.min(source.width, target.width),
      height: Math.min(source.height, target.height),
    },
  };
};

export const pngCompressionLevel = (quality: number): number =>
  Math.round(((100 - quality) * 9) / 100);
