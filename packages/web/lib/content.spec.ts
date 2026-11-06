import { expect } from 'chai';
import { listContentSlugs, readContentPage } from './content';

describe('web > lib > content', function () {
  describe('listContentSlugs', function () {
    it('liste les pages françaises sans leur extension', () => {
      const slugs = listContentSlugs('fr');

      expect(slugs).to.include('aide');
      expect(slugs).to.include('mentions-legales');
      expect(slugs.every((slug) => !slug.endsWith('.mdx'))).to.equal(true);
    });

    it('liste les pages anglaises séparément', () => {
      const slugs = listContentSlugs('en');

      expect(slugs).to.include('about');
      expect(slugs).to.not.include('aide');
    });

    it('rend les slugs dans un ordre stable', () => {
      expect(listContentSlugs('fr')).to.deep.equal(
        [...listContentSlugs('fr')].sort(),
      );
    });
  });

  describe('readContentPage', function () {
    it('lit le titre dans l’entête', () => {
      expect(readContentPage('fr', 'aide')?.title).to.equal('Aide');
    });

    it('sépare le corps de l’entête', () => {
      const page = readContentPage('fr', 'aide');

      expect(page?.body).to.not.include('locale:');
      expect(page?.body).to.include('Questions fréquentes');
    });

    /**
     * Le référencement est la raison d'être de cette migration : jusqu'ici une
     * unique description, en français, servait les trente-quatre routes. Faute
     * de description dans l'entête, on prend la première phrase du corps.
     */
    it('déduit une description de la première phrase quand l’entête n’en donne pas', () => {
      const description = readContentPage('fr', 'aide')?.description;

      expect(description).to.be.a('string');
      expect(description).to.not.equal('');
      expect(description).to.not.include('#');
      expect((description as string).length).to.be.at.most(160);
    });

    it('prend la prose d’une citation quand la page commence par là', () => {
      // « Mentions légales » ouvre sur un bloc de citation : sans cela, elle
      // n'avait aucune description.
      const description = readContentPage('fr', 'mentions-legales')
        ?.description as string;

      expect(description).to.not.equal('');
      expect(description.startsWith('>')).to.equal(false);
      expect(description).to.include('mentions légales');
    });

    it('ne prend pas une image pour une phrase', () => {
      const description = readContentPage('fr', 'contribuer')
        ?.description as string;

      expect(description).to.not.include('!');
      expect(description).to.not.equal('');
    });

    it('préfère la description de l’entête quand elle existe', () => {
      // `dismoi-en-peril` en déclare une : c'est elle qui doit sortir.
      const page = readContentPage('fr', 'dismoi-en-peril');

      expect(page?.description).to.be.a('string');
    });

    it('ne rend rien pour une page inconnue', () => {
      expect(readContentPage('fr', 'page-qui-nexiste-pas')).to.equal(null);
    });

    /**
     * Le slug arrive de l'URL : il ne doit jamais pouvoir désigner un fichier
     * hors du dossier de contenu.
     */
    it('refuse un slug qui tente de sortir du dossier de contenu', () => {
      expect(readContentPage('fr', '../../../package.json')).to.equal(null);
      expect(readContentPage('fr', '../en/about')).to.equal(null);
    });
  });
});
