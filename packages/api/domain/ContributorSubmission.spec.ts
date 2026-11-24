import { describe, expect, it } from 'vitest';
import { contributorViolations } from './ContributorSubmission';

const valid = {
  name: 'UFC Que Choisir',
  title: 'association de consommateurs',
  email: 'contact@quechoisir.org',
  website: 'https://www.quechoisir.org',
  intro: 'Nous comparons.',
  locale: 'fr',
};

describe('contributor submitted by the admin', () => {
  it('accepts a complete contributor', () => {
    expect(contributorViolations(valid)).toEqual([]);
  });

  it('accepts every optional field left empty', () => {
    expect(
      contributorViolations({
        name: 'Anonyme',
        title: null,
        email: null,
        website: null,
        intro: null,
        locale: null,
      }),
    ).toEqual([]);
  });

  it('refuses an empty name', () => {
    expect(contributorViolations({ ...valid, name: '  ' })).toEqual([
      'Le nom ne peut pas être vide.',
    ]);
  });

  it('refuses a name beyond the column width', () => {
    expect(contributorViolations({ ...valid, name: 'a'.repeat(256) })).toEqual([
      'Le nom dépasse 255 caractères.',
    ]);
  });

  it('refuses an address that is not an address', () => {
    expect(contributorViolations({ ...valid, email: 'contact(at)fr' })).toEqual(
      ['L’adresse électronique n’est pas valide.'],
    );
  });

  it('refuses a title, a website and an intro beyond their column width', () => {
    expect(
      contributorViolations({
        ...valid,
        title: 'a'.repeat(256),
        website: 'a'.repeat(256),
        intro: 'a'.repeat(65536),
      }),
    ).toEqual([
      'Le titre dépasse 255 caractères.',
      'Le site web dépasse 255 caractères.',
      'La présentation dépasse 65535 caractères.',
    ]);
  });

  it('reports every broken rule at once', () => {
    expect(
      contributorViolations({ ...valid, name: '', email: 'pas-une-adresse' }),
    ).toEqual([
      'Le nom ne peut pas être vide.',
      'L’adresse électronique n’est pas valide.',
    ]);
  });
});
