import { expect } from 'chai';
import i18n from 'i18next';
import { options } from '@dismoi/i18n';
import pathToContributor from './pathToContributor';

describe('pathToContributor', () => {
  before(async () => {
    await i18n.init({ ...options, lng: 'fr' });
  });

  it('does not repeat the locale already carried by the translated path', () => {
    // `path.profiles.contributors` vaut « /fr/profils » : la langue y est déjà,
    // et c'est la seule forme que sert le site (pages/fr/profils).
    expect(
      pathToContributor({ id: 42, name: 'Jean Dupont' } as never),
    ).to.equal('/fr/profils/42/Jean-Dupont');
  });
});
