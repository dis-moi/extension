import { describe, expect, it } from 'vitest';
import { formatDateTime } from './dateTime';

describe('formatting of the dates', () => {
  it('completes a winter time with +01:00, as notice 2551 does', () => {
    expect(formatDateTime('2024-12-24 15:32:53')).toBe(
      '2024-12-24T15:32:53+01:00',
    );
  });

  it('completes a summer time with +02:00, as notice 2549 does', () => {
    expect(formatDateTime('2024-09-30 23:13:17')).toBe(
      '2024-09-30T23:13:17+02:00',
    );
  });

  it('never moves the wall-clock time', () => {
    expect(formatDateTime('2016-05-16 00:00:00')).toBe(
      '2016-05-16T00:00:00+02:00',
    );
    expect(formatDateTime('2016-01-16 00:00:00')).toBe(
      '2016-01-16T00:00:00+01:00',
    );
  });

  describe('around the daylight-saving changes', () => {
    it('handles the night of 29 March 2026, where local 02:00 becomes 03:00', () => {
      expect(formatDateTime('2026-03-29 01:59:59')).toBe(
        '2026-03-29T01:59:59+01:00',
      );
      expect(formatDateTime('2026-03-29 03:00:01')).toBe(
        '2026-03-29T03:00:01+02:00',
      );
    });

    it('handles the night of 25 October 2026, where local 03:00 goes back to 02:00', () => {
      expect(formatDateTime('2026-10-25 01:00:00')).toBe(
        '2026-10-25T01:00:00+02:00',
      );
      expect(formatDateTime('2026-10-25 04:00:00')).toBe(
        '2026-10-25T04:00:00+01:00',
      );
    });
  });

  it('accepts the T separator already in place', () => {
    expect(formatDateTime('2024-12-24T15:32:53')).toBe(
      '2024-12-24T15:32:53+01:00',
    );
  });

  it('refuses an unreadable time rather than invent a date', () => {
    expect(() => formatDateTime('hier')).toThrow('Unreadable time');
  });

  it('gives +00:00 for a zone with no offset', () => {
    expect(formatDateTime('2024-12-24 15:32:53', 'UTC')).toBe(
      '2024-12-24T15:32:53+00:00',
    );
  });
});
