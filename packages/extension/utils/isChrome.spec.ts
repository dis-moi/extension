import { expect } from 'chai';
import isChrome from './isChrome';

/**
 * `isChrome` était une constante calculée au chargement du module, à partir
 * de `window.browser` — la variable de Firefox, absente de Chrome et de tout
 * rendu serveur. Elle levait donc une erreur là où on la lisait, et désignait
 * Firefox là où elle aboutissait.
 */
describe('utils > isChrome', function () {
  it('répond sans lire de variable globale absente', () => {
    expect(() => isChrome()).to.not.throw();
    expect(isChrome()).to.be.a('boolean');
  });

  it('reconnaît Chrome', () => {
    expect(
      isChrome(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      ),
    ).to.equal(true);
  });

  it('ne prend pas Firefox pour Chrome', () => {
    expect(
      isChrome(
        'Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0',
      ),
    ).to.equal(false);
  });
});
