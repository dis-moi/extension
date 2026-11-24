import { assert, describe, it } from '@effect/vitest';
import { tryTargeting } from './TargetingAttempt';

describe('targeting attempt', () => {
  it('demands a pattern and a URL before ruling', () => {
    assert.strictEqual(
      tryTargeting([], '', 'https://exemple.fr/').state,
      'empty',
    );
    assert.strictEqual(tryTargeting([], '.*', '').state, 'empty');
    assert.strictEqual(tryTargeting([], '   ', '  ').state, 'empty');
  });

  it('returns the composed pattern, domains escaped', () => {
    const verdict = tryTargeting(
      ['recrute.leroymerlin.fr'],
      '.*',
      'https://recrute.leroymerlin.fr/offre/12',
    );

    assert.strictEqual(verdict.state, 'matches');
    if (verdict.state !== 'matches') return;
    assert.strictEqual(verdict.pattern, '(recrute\\.leroymerlin\\.fr).*');
  });

  it('serves the path pattern as is when no domain is attached', () => {
    const verdict = tryTargeting(
      [],
      '^https://exemple\\.fr/',
      'https://exemple.fr/page',
    );

    assert.strictEqual(verdict.state, 'matches');
    if (verdict.state !== 'matches') return;
    assert.strictEqual(verdict.pattern, '^https://exemple\\.fr/');
  });

  it('says when the example URL does not match', () => {
    const verdict = tryTargeting(
      ['amazon.fr'],
      '/dp/',
      'https://amazon.fr/gp/cart',
    );

    assert.strictEqual(verdict.state, 'does-not-match');
  });

  it('leaves the slash unescaped, as 88 domain groups carry it bare in production', () => {
    const verdict = tryTargeting(
      ['exemple.fr/boutique'],
      '.*',
      'https://exemple.fr/boutique/article',
    );

    assert.strictEqual(verdict.state, 'matches');
    if (verdict.state !== 'matches') return;
    assert.strictEqual(verdict.pattern, '(exemple\\.fr/boutique).*');
  });

  it('joins several domains with an alternation', () => {
    const verdict = tryTargeting(
      ['amazon.fr', 'www.amazon.fr'],
      '/dp/',
      'https://www.amazon.fr/dp/B08',
    );

    assert.strictEqual(verdict.state, 'matches');
    if (verdict.state !== 'matches') return;
    assert.strictEqual(verdict.pattern, '(amazon\\.fr|www\\.amazon\\.fr)/dp/');
  });

  it('drops empty domains, whose alternation would match everything', () => {
    const verdict = tryTargeting(
      ['amazon.fr', '', '  '],
      '/dp/',
      'https://amazon.fr/dp/B08',
    );

    assert.strictEqual(verdict.state, 'matches');
    if (verdict.state !== 'matches') return;
    assert.strictEqual(verdict.pattern, '(amazon\\.fr)/dp/');
  });

  it('reports an unreadable pattern without throwing', () => {
    const verdict = tryTargeting([], '(unclosed', 'https://exemple.fr');

    assert.strictEqual(verdict.state, 'invalid');
    if (verdict.state !== 'invalid') return;
    assert.isTrue(verdict.message.length > 0);
  });
});
