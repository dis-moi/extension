import { describe, expect, it } from 'vitest';
import { containing } from './likePattern';

describe('term typed into the admin search box', () => {
  it('matches anywhere in the column', () => {
    expect(containing('rappel')).toBe('%rappel%');
  });

  it('keeps a percent sign literal', () => {
    expect(containing('remise de 100%')).toBe('%remise de 100\\%%');
  });

  it('keeps an underscore literal', () => {
    expect(containing('notice_id')).toBe('%notice\\_id%');
  });

  it('keeps a backslash literal', () => {
    expect(containing('a\\b')).toBe('%a\\\\b%');
  });
});
