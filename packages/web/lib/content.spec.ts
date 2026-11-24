import { expect } from 'chai';
import { listContentSlugs, readContentPage } from './content';

describe('web > lib > content', function () {
  describe('listContentSlugs', function () {
    it('lists the French pages without their extension', () => {
      const slugs = listContentSlugs('fr');

      expect(slugs).to.include('aide');
      expect(slugs).to.include('mentions-legales');
      expect(slugs.every((slug) => !slug.endsWith('.mdx'))).to.equal(true);
    });

    it('lists the English pages separately', () => {
      const slugs = listContentSlugs('en');

      expect(slugs).to.include('about');
      expect(slugs).to.not.include('aide');
    });

    it('gives the slugs in a stable order', () => {
      expect(listContentSlugs('fr')).to.deep.equal(
        [...listContentSlugs('fr')].sort(),
      );
    });
  });

  describe('readContentPage', function () {
    it('reads the title from the front matter', () => {
      expect(readContentPage('fr', 'aide')?.title).to.equal('Aide');
    });

    it('separates the body from the front matter', () => {
      const page = readContentPage('fr', 'aide');

      expect(page?.body).to.not.include('locale:');
      expect(page?.body).to.include('Questions fréquentes');
    });

    it('derives a description from the first sentence when the front matter gives none', () => {
      const description = readContentPage('fr', 'aide')?.description;

      expect(description).to.be.a('string');
      expect(description).to.not.equal('');
      expect(description).to.not.include('#');
      expect((description as string).length).to.be.at.most(160);
    });

    it('takes the prose of a quote when the page starts with one', () => {
      const description = readContentPage('fr', 'mentions-legales')
        ?.description as string;

      expect(description).to.not.equal('');
      expect(description.startsWith('>')).to.equal(false);
      expect(description).to.include('mentions légales');
    });

    it('does not mistake an image for a sentence', () => {
      const description = readContentPage('fr', 'contribuer')
        ?.description as string;

      expect(description).to.not.include('!');
      expect(description).to.not.equal('');
    });

    it('prefers the description of the front matter when there is one', () => {
      const page = readContentPage('fr', 'dismoi-en-peril');

      expect(page?.description).to.be.a('string');
    });

    it('gives nothing for an unknown page', () => {
      expect(readContentPage('fr', 'page-qui-nexiste-pas')).to.equal(null);
    });

    it('refuses a slug that tries to leave the content directory', () => {
      expect(readContentPage('fr', '../../../package.json')).to.equal(null);
      expect(readContentPage('fr', '../en/about')).to.equal(null);
    });
  });
});
