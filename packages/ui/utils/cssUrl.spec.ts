import { expect } from 'chai';
import cssUrl from './cssUrl';

describe('ui > utils > cssUrl', function () {
  it('entoure l’URL de guillemets', () => {
    expect(cssUrl('/img/arrow.svg')).to.equal('url("/img/arrow.svg")');
  });

  it('préserve une URL de données qui contient des parenthèses', () => {
    // Le bundler inline les petits SVG en `data:` sans encoder les
    // parenthèses. Sans guillemets, le jeton `url(` se termine à la première
    // parenthèse rencontrée : la déclaration devient invalide et le navigateur
    // abandonne non seulement cette règle, mais tout le reste de la feuille.
    const svg =
      "data:image/svg+xml,%3csvg%3e%3cpath%20transform='translate(-523.413%20141.723)'/%3e%3c/svg%3e";

    expect(cssUrl(svg)).to.equal(`url("${svg}")`);
  });

  it('encode un guillemet double présent dans l’URL', () => {
    expect(cssUrl('/img/a"b.svg')).to.equal('url("/img/a%22b.svg")');
  });
});
