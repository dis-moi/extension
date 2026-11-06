import { expect } from 'chai';
import { getMenus, APP_ROUTES } from './menus';
import { listContentSlugs, ContentLocale } from './content';

/**
 * Les menus sont écrits à la main : rien n'empêche une entrée de pointer une
 * page qui n'existe pas. Ces exemples confrontent chaque adresse au contenu
 * réellement publié — c'est ce qui a manqué quand les chemins visaient encore
 * ceux de WordPress.
 */
describe('web > lib > menus', function () {
  const routesExistantes = (locale: ContentLocale): string[] => [
    `/${locale}`,
    ...listContentSlugs(locale).map((slug) => `/${locale}/${slug}`),
    ...APP_ROUTES[locale],
  ];

  (['fr', 'en'] as ContentLocale[]).forEach((locale) => {
    describe(locale, function () {
      const { header, footer } = getMenus(locale);

      it('propose des entrées dans l’en-tête et le pied de page', () => {
        expect(header.length).to.be.greaterThan(0);
        expect(footer.length).to.be.greaterThan(0);
      });

      it('ne pointe que vers des pages qui existent', () => {
        const connues = routesExistantes(locale);
        const inconnues = [...header, ...footer]
          .map((lien) => lien.href)
          .filter((href) => !connues.includes(href));

        expect(inconnues, `adresses sans page : ${inconnues.join(', ')}`).to.be
          .empty;
      });

      it('reste dans sa langue', () => {
        [...header, ...footer].forEach((lien) => {
          expect(lien.href).to.match(new RegExp(`^/${locale}(/|$)`));
        });
      });

      it('donne un libellé à chaque entrée', () => {
        [...header, ...footer].forEach((lien) => {
          expect(lien.label).to.be.a('string').and.to.not.equal('');
        });
      });
    });
  });
});
