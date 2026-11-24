import { describe, expect, it } from 'vitest';
import {
  domainViolations,
  domainsSetViolations,
  prettyName,
  restrictedContextViolations,
} from './CatalogueSubmission';

const domain = {
  name: 'exemple.fr',
  path: null as string | null,
  aliases: [] as ReadonlyArray<string>,
};

describe('a domain submitted from the administration', () => {
  it('accepts a host alone', () => {
    expect(domainViolations(domain)).toEqual([]);
  });

  it('accepts a subdomain and a hyphen', () => {
    expect(
      domainViolations({ ...domain, name: 'ma-boutique.exemple.fr' }),
    ).toEqual([]);
  });

  it('refuses an empty name', () => {
    expect(domainViolations({ ...domain, name: '' })).toEqual([
      'Le nom de domaine n’est pas valide.',
    ]);
  });

  it('refuses a name carrying a scheme', () => {
    expect(domainViolations({ ...domain, name: 'https://exemple.fr' })).toEqual(
      ['Le nom de domaine n’est pas valide.'],
    );
  });

  it('refuses a name carrying a path', () => {
    expect(
      domainViolations({ ...domain, name: 'exemple.fr/boutique' }),
    ).toEqual(['Le nom de domaine n’est pas valide.']);
  });

  it('accepts a path opening with a slash', () => {
    expect(domainViolations({ ...domain, path: '/boutique' })).toEqual([]);
  });

  it('refuses a path that does not open with a slash', () => {
    expect(domainViolations({ ...domain, path: 'boutique' })).toEqual([
      'Le chemin doit commencer par une barre oblique.',
    ]);
  });

  it('accepts aliases that are hosts', () => {
    expect(
      domainViolations({ ...domain, aliases: ['exemple.com', 'exemple.be'] }),
    ).toEqual([]);
  });

  it('refuses an alias that is not a host', () => {
    expect(domainViolations({ ...domain, aliases: ['exemple .fr'] })).toEqual([
      'L’alias « exemple .fr » n’est pas un nom de domaine valide.',
    ]);
  });

  it('reports the name and the path together', () => {
    expect(
      domainViolations({ ...domain, name: 'exemple .fr', path: 'boutique' }),
    ).toEqual([
      'Le nom de domaine n’est pas valide.',
      'Le chemin doit commencer par une barre oblique.',
    ]);
  });
});

describe('the displayed name of a domain', () => {
  it('appends the path to the host, as getFullName did', () => {
    expect(prettyName('exemple.fr', '/boutique')).toBe('exemple.fr/boutique');
  });

  it('is the host alone without a path', () => {
    expect(prettyName('exemple.fr', null)).toBe('exemple.fr');
  });
});

describe('a domains set submitted from the administration', () => {
  it('accepts a name', () => {
    expect(domainsSetViolations({ name: 'Marchands' })).toEqual([]);
  });

  it('refuses an empty name', () => {
    expect(domainsSetViolations({ name: '  ' })).toEqual([
      'Le nom du jeu ne peut pas être vide.',
    ]);
  });
});

describe('a restricted context submitted from the administration', () => {
  it('accepts a pattern that compiles', () => {
    expect(
      restrictedContextViolations({ urlRegex: '^https://banque\\.' }),
    ).toEqual([]);
  });

  it('refuses an empty pattern', () => {
    expect(restrictedContextViolations({ urlRegex: '' })).toEqual([
      'Le motif ne peut pas être vide.',
    ]);
  });

  it('refuses a pattern that does not compile', () => {
    expect(restrictedContextViolations({ urlRegex: '(' })).toEqual([
      'Le motif n’est pas une expression régulière valide.',
    ]);
  });
});
