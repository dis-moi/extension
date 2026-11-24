import { describe, expect, it } from 'vitest';
import { parseUploadPath } from '../../domain/UploadedImage';
import { UPLOAD_PREFIXES, avatar, uploadPath, uploadUrl } from './media';

describe('addresses of the V3 images', () => {
  describe('prefixes of vich_uploader.yaml', () => {
    it('are /uploads/avatars, contributor_banners, contributor_previews and notice_screenshots', () => {
      expect(UPLOAD_PREFIXES).toEqual({
        imageFile: '/uploads/avatars',
        bannerImageFile: '/uploads/contributor_banners',
        previewImageFile: '/uploads/contributor_previews',
        screenshotFile: '/uploads/notice_screenshots',
      });
    });
  });

  describe('composition', () => {
    it('gives null for an empty field, as the PHP normaliser does', () => {
      expect(uploadUrl('https://x.fr', 'imageFile', null)).toBeNull();
      expect(uploadUrl('https://x.fr', 'imageFile', '')).toBeNull();
    });

    it('gives the four thumbnails of an avatar in the order of the JSON', () => {
      expect(avatar('https://x.fr', 'a.png')).toEqual({
        small: {
          url: 'https://x.fr/media/cache/s_thumb/uploads/avatars/a.png',
        },
        normal: {
          url: 'https://x.fr/media/cache/m_thumb/uploads/avatars/a.png',
        },
        large: {
          url: 'https://x.fr/media/cache/l_thumb/uploads/avatars/a.png',
        },
        extra_large: {
          url: 'https://x.fr/media/cache/xl_thumb/uploads/avatars/a.png',
        },
      });
    });

    it('encodes the accented, spaced name present in the database, and reads it back', () => {
      const name = 'apple reconditionné.jpg';
      const path = uploadPath('imageFile', name);

      expect(path).toBe('/uploads/avatars/apple%20reconditionn%C3%A9.jpg');

      const segments = path
        .replace('/uploads/', '')
        .split('/')
        .map(decodeURIComponent);

      expect(parseUploadPath(segments)).toEqual({
        field: 'imageFile',
        fileName: name,
      });
    });
  });
});
