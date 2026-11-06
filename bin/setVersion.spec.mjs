import { expect } from 'chai';
import { withVersion } from './setVersion.mjs';

/**
 * La version du `package.json` racine alimente le manifeste des deux
 * navigateurs : c'est elle, et elle seule, que les stores comparent à la
 * version déjà en ligne. L'écriture doit donc être chirurgicale — le reste du
 * fichier, son ordre et son formatage, n'appartiennent pas à la publication.
 */
describe('bin > setVersion', () => {
  const original =
    '{\n  "name": "dismoi",\n  "version": "3.97.3",\n  "scripts": {\n    "zip": "wxt zip"\n  }\n}\n';

  it('remplace la version', () => {
    expect(JSON.parse(withVersion(original, '4.0.0')).version).to.equal(
      '4.0.0',
    );
  });

  it('ne touche à rien d’autre', () => {
    const avant = JSON.parse(original);
    const apres = JSON.parse(withVersion(original, '4.0.0'));

    expect(Object.keys(apres)).to.deep.equal(Object.keys(avant));
    expect(apres.scripts).to.deep.equal(avant.scripts);
    expect(apres.name).to.equal('dismoi');
  });

  it('conserve le formatage et la ligne finale', () => {
    const resultat = withVersion(original, '4.0.0');

    expect(resultat).to.equal(original.replace('3.97.3', '4.0.0'));
    expect(resultat.endsWith('\n')).to.equal(true);
  });

  it('refuse une version qui n’en est pas une', () => {
    expect(() => withVersion(original, 'latest')).to.throw(/latest/);
    expect(() => withVersion(original, '')).to.throw();
  });
});
