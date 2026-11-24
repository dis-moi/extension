import { describe, expect, it } from 'vitest';
import {
  contentType,
  contributorFileName,
  extensionOfFormat,
  formatOfBytes,
  formatOfName,
  IMAGE_DIRECTORIES,
  noticeFileName,
  parseUploadPath,
  randomName,
  storagePath,
  thumbnailStoragePath,
} from './UploadedImage';
import type { ImageField } from './UploadedImage';

describe('uploaded image', () => {
  describe('directories of vich_uploader.yaml', () => {
    const cases: ReadonlyArray<[ImageField, string]> = [
      ['imageFile', 'avatars'],
      ['bannerImageFile', 'contributor_banners'],
      ['previewImageFile', 'contributor_previews'],
      ['screenshotFile', 'notice_screenshots'],
    ];

    for (const [field, directory] of cases) {
      it(`maps ${directory} to the ${field} field`, () => {
        expect(parseUploadPath([directory, 'nkfpbqlhbt.png'])).toEqual({
          field,
          fileName: 'nkfpbqlhbt.png',
        });
      });
    }

    it('number four', () => {
      expect(Object.keys(IMAGE_DIRECTORIES)).toHaveLength(cases.length);
    });
  });

  describe('path coming from the URL', () => {
    it('accepts the accented, spaced name present in the database', () => {
      expect(parseUploadPath(['avatars', 'apple reconditionné.jpg'])).toEqual({
        field: 'imageFile',
        fileName: 'apple reconditionné.jpg',
      });
    });

    it('refuses an unknown directory', () => {
      expect(parseUploadPath(['secrets', 'a.png'])).toBeNull();
      expect(parseUploadPath(['', 'a.png'])).toBeNull();
    });

    it('refuses an already decoded directory traversal', () => {
      expect(parseUploadPath(['avatars', '..'])).toBeNull();
      expect(parseUploadPath(['avatars', '../../etc/passwd'])).toBeNull();
      expect(parseUploadPath(['..', 'a.png'])).toBeNull();
      expect(parseUploadPath(['avatars', 'a\\b.png'])).toBeNull();
    });

    it('refuses an empty name, a lone dot, or a null byte', () => {
      expect(parseUploadPath(['avatars', ''])).toBeNull();
      expect(parseUploadPath(['avatars', '.'])).toBeNull();
      expect(parseUploadPath(['avatars', 'a\u0000.png'])).toBeNull();
    });

    it('refuses a path that does not hold exactly two segments', () => {
      expect(parseUploadPath(['avatars'])).toBeNull();
      expect(parseUploadPath(['avatars', 'under', 'a.png'])).toBeNull();
      expect(parseUploadPath([])).toBeNull();
    });
  });

  describe('storage path', () => {
    it('files the original under its directory, name unencoded', () => {
      expect(storagePath('imageFile', 'apple reconditionné.jpg')).toBe(
        'uploads/avatars/apple reconditionné.jpg',
      );
    });

    it('files the thumbnail where its address points', () => {
      expect(
        thumbnailStoragePath('xl_thumb', 'screenshotFile', '242.jpg'),
      ).toBe('media/cache/xl_thumb/uploads/notice_screenshots/242.jpg');
    });
  });
});

describe('format of an uploaded image', () => {
  it('normalises jpg, jpeg and jfif to jpeg', () => {
    expect(formatOfName('a.jpg')).toBe('jpeg');
    expect(formatOfName('a.jpeg')).toBe('jpeg');
    expect(formatOfName('a.jfif')).toBe('jpeg');
  });

  it('recognises png and webp', () => {
    expect(formatOfName('a.png')).toBe('png');
    expect(formatOfName('a.webp')).toBe('webp');
  });

  it('ignores the case of the extension', () => {
    expect(formatOfName('yAE2HjObSM.PNG')).toBe('png');
    expect(contentType('yAE2HjObSM.PNG')).toBe('image/png');
  });

  it('gives the content type of the five extensions present in the database', () => {
    expect(contentType('a.png')).toBe('image/png');
    expect(contentType('a.jpg')).toBe('image/jpeg');
    expect(contentType('a.jpeg')).toBe('image/jpeg');
    expect(contentType('a.jfif')).toBe('image/jpeg');
    expect(contentType('a.webp')).toBe('image/webp');
  });

  it('refuses SVG, and anything outside the list', () => {
    expect(formatOfName('a.svg')).toBeNull();
    expect(contentType('a.svg')).toBeNull();
    expect(contentType('a.html')).toBeNull();
    expect(contentType('a.gif')).toBeNull();
    expect(contentType('no-extension')).toBeNull();
    expect(contentType('.cache')).toBeNull();
  });
});

describe('format recognised from the bytes', () => {
  const withHeader = (header: ReadonlyArray<number>, size = 32): Uint8Array => {
    const bytes = new Uint8Array(size);
    bytes.set(header);
    return bytes;
  };

  const ascii = (text: string): ReadonlyArray<number> =>
    [...text].map((character) => character.charCodeAt(0));

  it('recognises PNG by its signature', () => {
    expect(
      formatOfBytes(
        withHeader([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      ),
    ).toBe('png');
  });

  it('recognises JPEG by its signature', () => {
    expect(formatOfBytes(withHeader([0xff, 0xd8, 0xff, 0xe0]))).toBe('jpeg');
  });

  it('recognises WebP by its RIFF container', () => {
    expect(
      formatOfBytes(
        withHeader([
          ...ascii('RIFF'),
          0x1a,
          0x00,
          0x00,
          0x00,
          ...ascii('WEBP'),
        ]),
      ),
    ).toBe('webp');
  });

  it('refuses a RIFF that is not WebP', () => {
    expect(
      formatOfBytes(
        withHeader([
          ...ascii('RIFF'),
          0x1a,
          0x00,
          0x00,
          0x00,
          ...ascii('WAVE'),
        ]),
      ),
    ).toBeNull();
  });

  it('refuses the SVG, GIF and HTML an extension would announce as images', () => {
    expect(formatOfBytes(withHeader(ascii('<svg xmlns=')))).toBeNull();
    expect(formatOfBytes(withHeader(ascii('GIF89a')))).toBeNull();
    expect(formatOfBytes(withHeader(ascii('<!DOCTYPE html>')))).toBeNull();
  });

  it('refuses an empty or truncated header', () => {
    expect(formatOfBytes(new Uint8Array(0))).toBeNull();
    expect(formatOfBytes(new Uint8Array([0x89, 0x50]))).toBeNull();
    expect(formatOfBytes(new Uint8Array([0xff, 0xd8]))).toBeNull();
  });
});

describe('name given to a received image', () => {
  it('gives JPEG the jpg extension the stored files already carry', () => {
    expect(extensionOfFormat('jpeg')).toBe('jpg');
    expect(extensionOfFormat('png')).toBe('png');
    expect(extensionOfFormat('webp')).toBe('webp');
  });

  it('draws a 32-character alphanumeric name for a contributor', () => {
    const name = randomName(
      Uint8Array.from({ length: 32 }, (_, rank) => rank * 7),
    );

    expect(name).toMatch(/^[0-9a-zA-Z]{32}$/);
  });

  it('covers the whole vich_uploader alphabet, wrapping past it', () => {
    expect(randomName(new Uint8Array(32))).toBe('0'.repeat(32));
    expect(randomName(Uint8Array.from({ length: 32 }, () => 61))).toBe(
      'Z'.repeat(32),
    );
    expect(randomName(Uint8Array.from({ length: 32 }, () => 62))).toBe(
      '0'.repeat(32),
    );
  });

  it('demands exactly the bytes of the name', () => {
    expect(() => randomName(new Uint8Array(31))).toThrow();
  });

  it('names a notice screenshot by its identifier, as Vich does', () => {
    expect(noticeFileName(2100, 'jpeg')).toBe('2100.jpg');
  });

  it('composes a contributor name from the draw', () => {
    expect(
      contributorFileName('AGfT2KYrNQVfYq10yGykdsgO4bY6ieK0', 'jpeg'),
    ).toBe('AGfT2KYrNQVfYq10yGykdsgO4bY6ieK0.jpg');
  });
});
