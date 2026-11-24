import { describe, expect, it } from 'vitest';
import { noticeViolations } from './NoticeSubmission';

const context = {
  urlRegex: '^/produit/',
  excludeUrlRegex: null,
};

const valid = {
  message: 'Ce produit est réparable.',
  visibility: 'public',
  excludeUrlRegex: null,
  contextes: [context],
};

describe('notice submitted by the admin', () => {
  it('accepts a notice with one context', () => {
    expect(noticeViolations(valid)).toEqual([]);
  });

  it('refuses an empty message', () => {
    expect(noticeViolations({ ...valid, message: '   ' })).toEqual([
      'Le message ne peut pas être vide.',
    ]);
  });

  it('refuses a message beyond the admin counter', () => {
    expect(noticeViolations({ ...valid, message: 'a'.repeat(501) })).toEqual([
      'Le message dépasse 500 caractères.',
    ]);
  });

  it('refuses an unknown visibility', () => {
    expect(noticeViolations({ ...valid, visibility: 'secrète' })).toEqual([
      'Visibilité inconnue.',
    ]);
  });

  it('refuses a notice without any targeting context', () => {
    expect(noticeViolations({ ...valid, contextes: [] })).toEqual([
      'Une notice a besoin d’au moins un contexte de ciblage.',
    ]);
  });

  it('refuses an exclusion pattern the browser cannot compile', () => {
    expect(noticeViolations({ ...valid, excludeUrlRegex: '[' })).toEqual([
      'Le motif d’exclusion de la notice n’est pas valide.',
    ]);
  });

  it('names the context a broken pattern belongs to', () => {
    expect(
      noticeViolations({
        ...valid,
        contextes: [context, { urlRegex: '(', excludeUrlRegex: null }],
      }),
    ).toEqual(['Contexte 2 : le motif de chemin est invalide.']);
  });

  it('refuses an empty path pattern', () => {
    expect(
      noticeViolations({
        ...valid,
        contextes: [{ urlRegex: '', excludeUrlRegex: null }],
      }),
    ).toEqual(['Contexte 1 : le motif de chemin est vide.']);
  });

  it('refuses a broken exclusion pattern inside a context', () => {
    expect(
      noticeViolations({
        ...valid,
        contextes: [{ urlRegex: '^/a', excludeUrlRegex: '*' }],
      }),
    ).toEqual(['Contexte 1 : le motif d’exclusion est invalide.']);
  });

  it('reports every broken rule at once', () => {
    expect(
      noticeViolations({
        message: '',
        visibility: 'public',
        excludeUrlRegex: null,
        contextes: [{ urlRegex: '(', excludeUrlRegex: null }],
      }),
    ).toEqual([
      'Le message ne peut pas être vide.',
      'Contexte 1 : le motif de chemin est invalide.',
    ]);
  });
});
