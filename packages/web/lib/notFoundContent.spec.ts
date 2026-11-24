import { expect } from 'chai';
import {
  localeFromHeader,
  localeFromPathname,
  notFoundContent,
} from './notFoundContent';
import { getMenus } from './menus';
import { listContentSlugs } from './content';

describe('web > lib > notFoundContent', function () {
  describe('localeFromPathname', function () {
    it('reads the locale from the requested path', () => {
      expect(localeFromPathname('/en/une-page-absente')).to.equal('en');
      expect(localeFromPathname('/en')).to.equal('en');
      expect(localeFromPathname('/fr/une-page-absente')).to.equal('fr');
    });

    it('falls back to French outside any known locale', () => {
      expect(localeFromPathname('/')).to.equal('fr');
      expect(localeFromPathname('/zz/quoi')).to.equal('fr');
      expect(localeFromPathname('/enfant')).to.equal('fr');
    });
  });

  describe('localeFromHeader', function () {
    it('accepts the locale that was passed', () => {
      expect(localeFromHeader('en')).to.equal('en');
      expect(localeFromHeader('fr')).to.equal('fr');
    });

    it('places no trust in the received value', () => {
      expect(localeFromHeader(null)).to.equal('fr');
      expect(localeFromHeader('')).to.equal('fr');
      expect(localeFromHeader('../../etc/passwd')).to.equal('fr');
      expect(localeFromHeader('EN')).to.equal('fr');
    });
  });

  it('answers in English to an English-speaking visitor', () => {
    const content = notFoundContent('en');

    expect(content.title).to.equal('Page not found');
    expect(content.links.map((link) => link.href)).to.include('/en/guides');
  });

  it('answers in French to a French-speaking visitor', () => {
    const content = notFoundContent('fr');

    expect(content.title).to.equal('Page introuvable');
    expect(content.links.map((link) => link.href)).to.include('/fr/profils');
  });

  it('offers only pages that exist', () => {
    const exists = (href: string): boolean => {
      const [, locale, ...rest] = href.split('/');
      const contentLocale = locale as 'fr' | 'en';

      return (
        listContentSlugs(contentLocale).includes(rest.join('/')) ||
        getMenus(contentLocale).header.some((link) => link.href === href)
      );
    };

    (['fr', 'en'] as const).forEach((locale) => {
      const unknown = notFoundContent(locale)
        .links.map((link) => link.href)
        .filter((href) => !exists(href));

      expect(unknown, `addresses with no page: ${unknown.join(', ')}`).to.be
        .empty;
    });
  });
});
