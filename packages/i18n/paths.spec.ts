import { expect } from 'chai';
import { createI18n } from './index';

/**
 * Les chemins du site vivent dans les traductions, et c'est la liste des
 * contributeurs qui sert de base aux adresses de leurs pages. Ces exemples
 * fixent ce contrat : une clé renommée ou une valeur sans langue casserait
 * chaque lien de contributeur, sans qu'aucun autre test ne s'en aperçoive.
 */
describe('i18n > chemins du site', () => {
  it('donne la liste des contributeurs dans la langue demandée', () => {
    expect(createI18n('fr').t('path.profiles.contributors')).to.equal(
      '/fr/profils',
    );
    expect(createI18n('en').t('path.profiles.contributors')).to.equal(
      '/en/guides',
    );
  });

  it('porte la langue dans le chemin lui-même', () => {
    (['fr', 'en'] as const).forEach((langue) => {
      expect(createI18n(langue).t('path.profiles.contributors')).to.match(
        new RegExp(`^/${langue}/`),
      );
    });
  });
});
