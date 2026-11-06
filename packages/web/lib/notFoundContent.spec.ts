import { expect } from 'chai';
import {
  localeFromHeader,
  localeFromPathname,
  notFoundContent,
} from './notFoundContent';
import { getMenus } from './menus';
import { listContentSlugs } from './content';

/**
 * La page introuvable était écrite en dur en français alors qu'elle sert les
 * deux langues. Elle ne reçoit pas les paramètres de la route : la langue lui
 * vient d'un en-tête posé par le middleware, à partir du chemin demandé.
 */
describe('web > lib > notFoundContent', function () {
  describe('localeFromPathname', function () {
    it('lit la langue dans le chemin demandé', () => {
      expect(localeFromPathname('/en/une-page-absente')).to.equal('en');
      expect(localeFromPathname('/en')).to.equal('en');
      expect(localeFromPathname('/fr/une-page-absente')).to.equal('fr');
    });

    it('se rabat sur le français hors de toute langue connue', () => {
      // Même repli que les métadonnées de la mise en page.
      expect(localeFromPathname('/')).to.equal('fr');
      expect(localeFromPathname('/zz/quoi')).to.equal('fr');
      expect(localeFromPathname('/enfant')).to.equal('fr');
    });
  });

  describe('localeFromHeader', function () {
    it('accepte la langue transmise', () => {
      expect(localeFromHeader('en')).to.equal('en');
      expect(localeFromHeader('fr')).to.equal('fr');
    });

    it('n’accorde aucune confiance à la valeur reçue', () => {
      // L'en-tête voyage dans une requête : un client peut l'écrire.
      expect(localeFromHeader(null)).to.equal('fr');
      expect(localeFromHeader('')).to.equal('fr');
      expect(localeFromHeader('../../etc/passwd')).to.equal('fr');
      expect(localeFromHeader('EN')).to.equal('fr');
    });
  });

  it('répond en anglais à un visiteur anglophone', () => {
    const contenu = notFoundContent('en');

    expect(contenu.title).to.equal('Page not found');
    expect(contenu.links.map((lien) => lien.href)).to.include('/en/guides');
  });

  it('répond en français à un visiteur francophone', () => {
    const contenu = notFoundContent('fr');

    expect(contenu.title).to.equal('Page introuvable');
    expect(contenu.links.map((lien) => lien.href)).to.include('/fr/profils');
  });

  it('ne propose que des pages qui existent', () => {
    const existe = (href: string): boolean => {
      const [, locale, ...reste] = href.split('/');
      const langue = locale as 'fr' | 'en';

      return (
        listContentSlugs(langue).includes(reste.join('/')) ||
        getMenus(langue).header.some((lien) => lien.href === href)
      );
    };

    (['fr', 'en'] as const).forEach((locale) => {
      const inconnues = notFoundContent(locale)
        .links.map((lien) => lien.href)
        .filter((href) => !existe(href));

      expect(inconnues, `adresses sans page : ${inconnues.join(', ')}`).to.be
        .empty;
    });
  });
});
