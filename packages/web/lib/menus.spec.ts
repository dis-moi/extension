import { expect } from 'chai';
import { getMenus, APP_ROUTES } from './menus';
import { listContentSlugs, ContentLocale } from './content';

describe('web > lib > menus', function () {
  const existingRoutes = (locale: ContentLocale): string[] => [
    `/${locale}`,
    ...listContentSlugs(locale).map((slug) => `/${locale}/${slug}`),
    ...APP_ROUTES[locale],
  ];

  (['fr', 'en'] as ContentLocale[]).forEach((locale) => {
    describe(locale, function () {
      const { header, footer } = getMenus(locale);

      it('offers entries in the header and in the footer', () => {
        expect(header.length).to.be.greaterThan(0);
        expect(footer.length).to.be.greaterThan(0);
      });

      it('points only to pages that exist', () => {
        const known = existingRoutes(locale);
        const unknown = [...header, ...footer]
          .map((link) => link.href)
          .filter((href) => !known.includes(href));

        expect(unknown, `addresses with no page: ${unknown.join(', ')}`).to.be
          .empty;
      });

      it('stays within its locale', () => {
        [...header, ...footer].forEach((link) => {
          expect(link.href).to.match(new RegExp(`^/${locale}(/|$)`));
        });
      });

      it('gives a label to every entry', () => {
        [...header, ...footer].forEach((link) => {
          expect(link.label).to.be.a('string').and.to.not.equal('');
        });
      });
    });
  });
});
