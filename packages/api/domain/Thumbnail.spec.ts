import { describe, expect, it } from 'vitest';
import {
  boxOfFilter,
  FILTERS,
  isFilterName,
  pngCompressionLevel,
  transformation,
} from './Thumbnail';

describe('thumbnail', () => {
  describe('the filters of liip_imagine.yaml', () => {
    it('are s_thumb 40/60, m_thumb 90/70, l_thumb 120/80, xl_thumb 200/90', () => {
      expect(FILTERS).toEqual({
        s_thumb: { size: 40, quality: 60 },
        m_thumb: { size: 90, quality: 70 },
        l_thumb: { size: 120, quality: 80 },
        xl_thumb: { size: 200, quality: 90 },
      });
    });

    it('are square', () => {
      expect(boxOfFilter('m_thumb')).toEqual({ width: 90, height: 90 });
    });

    it('are the only names recognised', () => {
      expect(isFilterName('xl_thumb')).toBe(true);
      expect(isFilterName('cache')).toBe(false);
      expect(isFilterName('../../etc/passwd')).toBe(false);
      expect(isFilterName('')).toBe(false);
    });
  });

  describe('source larger than the thumbnail on both sides', () => {
    it('scales 300x200 to 60x40 at ratio 0.2 then crops 40x40 at the centre', () => {
      expect(
        transformation({ width: 300, height: 200 }, boxOfFilter('s_thumb')),
      ).toEqual({
        operation: 'thumbnail',
        resize: { width: 60, height: 40 },
        crop: { x: 10, y: 0, width: 40, height: 40 },
      });
    });

    it('scales 400x400 to 90x90 with nothing to crop', () => {
      expect(
        transformation({ width: 400, height: 400 }, boxOfFilter('m_thumb')),
      ).toEqual({
        operation: 'thumbnail',
        resize: { width: 90, height: 90 },
        crop: { x: 0, y: 0, width: 90, height: 90 },
      });
    });

    it('scales 200x300 to 120x180 then takes 30 pixels off top and bottom', () => {
      expect(
        transformation({ width: 200, height: 300 }, boxOfFilter('l_thumb')),
      ).toEqual({
        operation: 'thumbnail',
        resize: { width: 120, height: 180 },
        crop: { x: 0, y: 30, width: 120, height: 120 },
      });
    });

    it('rounds 133.2 to 133 and the 46.5 offset to 47', () => {
      expect(
        transformation({ width: 333, height: 100 }, boxOfFilter('s_thumb')),
      ).toEqual({
        operation: 'thumbnail',
        resize: { width: 133, height: 40 },
        crop: { x: 47, y: 0, width: 40, height: 40 },
      });
    });
  });

  describe('source already fitting the thumbnail, allow_upscale absent', () => {
    it('serves the original rather than enlarging a 40x40 asked as xl_thumb', () => {
      expect(
        transformation({ width: 40, height: 40 }, boxOfFilter('xl_thumb')),
      ).toEqual({ operation: 'copy' });
    });

    it('serves the original for a 40x40 asked as s_thumb', () => {
      expect(
        transformation({ width: 40, height: 40 }, boxOfFilter('s_thumb')),
      ).toEqual({ operation: 'copy' });
    });
  });

  describe('source smaller on one side only', () => {
    it('keeps the 30 width of 30x300, brings the height to 40, crops centred', () => {
      expect(
        transformation({ width: 30, height: 300 }, boxOfFilter('s_thumb')),
      ).toEqual({
        operation: 'thumbnail',
        resize: null,
        crop: { x: 0, y: 130, width: 30, height: 40 },
      });
    });

    it('crops 1000x10 to 40x10 without scaling', () => {
      expect(
        transformation({ width: 1000, height: 10 }, boxOfFilter('s_thumb')),
      ).toEqual({
        operation: 'thumbnail',
        resize: null,
        crop: { x: 480, y: 0, width: 40, height: 10 },
      });
    });
  });

  describe('quality translated into PNG compression', () => {
    it('gives 4, 3, 2 and 1 for the qualities of the four filters', () => {
      expect(pngCompressionLevel(60)).toBe(4);
      expect(pngCompressionLevel(70)).toBe(3);
      expect(pngCompressionLevel(80)).toBe(2);
      expect(pngCompressionLevel(90)).toBe(1);
    });

    it('stays within 0 to 9 at the bounds', () => {
      expect(pngCompressionLevel(100)).toBe(0);
      expect(pngCompressionLevel(0)).toBe(9);
    });
  });
});
