import { describe, expect, it } from 'vitest';
import { isServed, VISIBILITIES, type Visibility } from './NoticeVisibility';

const now = new Date('2026-11-19T03:00:00Z');
const yesterday = new Date('2026-11-18T03:00:00Z');
const tomorrow = new Date('2026-11-20T03:00:00Z');

const notice = (parts: {
  visibility?: Visibility;
  expires?: Date | null;
  unpublishedOnExpiration?: boolean;
  contributorEnabled?: boolean;
}) => ({
  visibility: parts.visibility ?? ('public' as Visibility),
  expires: parts.expires === undefined ? null : parts.expires,
  unpublishedOnExpiration: parts.unpublishedOnExpiration ?? false,
  contributorEnabled: parts.contributorEnabled ?? true,
});

describe('domain > visibility of a notice', () => {
  it('lists the five visibilities of the model', () => {
    expect([...VISIBILITIES]).toEqual([
      'public',
      'private',
      'archived',
      'draft',
      'question',
    ]);
  });

  it('serves a public notice with no expiry date', () => {
    expect(isServed(notice({}), now)).toBe(true);
  });

  it('serves a notice whose date is still ahead', () => {
    expect(isServed(notice({ expires: tomorrow }), now)).toBe(true);
  });

  it('still serves an expired notice that does not ask to be unpublished', () => {
    expect(
      isServed(
        notice({ expires: yesterday, unpublishedOnExpiration: false }),
        now,
      ),
    ).toBe(true);
  });

  it('withdraws an expired notice that asks to be unpublished', () => {
    expect(
      isServed(
        notice({ expires: yesterday, unpublishedOnExpiration: true }),
        now,
      ),
    ).toBe(false);
  });

  it('keeps a future notice that asks to be unpublished', () => {
    expect(
      isServed(
        notice({ expires: tomorrow, unpublishedOnExpiration: true }),
        now,
      ),
    ).toBe(true);
  });

  it('serves no visibility other than public', () => {
    for (const visibility of [
      'private',
      'archived',
      'draft',
      'question',
    ] as const) {
      expect(isServed(notice({ visibility }), now)).toBe(false);
    }
  });

  it('serves nothing from a disabled contributor', () => {
    expect(isServed(notice({ contributorEnabled: false }), now)).toBe(false);
  });
});
