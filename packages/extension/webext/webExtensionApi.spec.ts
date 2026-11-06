import { expect } from 'chai';
import { canConnectToExtension, webExtensionApi } from './webExtensionApi';

describe('webext > webExtensionApi', function () {
  it('ne lit pas de variable globale qui n’existe pas', () => {
    // La page des profils s'exécute dans un onglet ordinaire : `browser` n'y
    // est pas déclaré, et l'y lire directement lève une ReferenceError que
    // l'opérateur `?.` n'intercepte pas.
    expect(() => webExtensionApi({})).to.not.throw();
    expect(webExtensionApi({})).to.equal(null);
  });

  it('préfère l’API normalisée quand elle est là', () => {
    const browser = { runtime: {} };
    const chrome = { runtime: {} };

    expect(webExtensionApi({ browser, chrome })).to.equal(browser);
  });

  it('se rabat sur l’API de Chrome', () => {
    const chrome = { runtime: {} };

    expect(webExtensionApi({ chrome })).to.equal(chrome);
  });

  describe('canConnectToExtension', function () {
    it('est faux hors de toute extension', () => {
      expect(canConnectToExtension({})).to.equal(false);
    });

    it('est faux quand l’API existe sans canal de connexion', () => {
      // Chrome expose un `chrome` minimal à toutes les pages ; seules celles
      // déclarées dans `externally_connectable` reçoivent `runtime.connect`.
      expect(canConnectToExtension({ chrome: {} })).to.equal(false);
      expect(canConnectToExtension({ chrome: { runtime: {} } })).to.equal(
        false,
      );
    });

    it('est vrai quand la page peut ouvrir un canal', () => {
      expect(
        canConnectToExtension({ chrome: { runtime: { connect: () => null } } }),
      ).to.equal(true);
    });
  });
});
