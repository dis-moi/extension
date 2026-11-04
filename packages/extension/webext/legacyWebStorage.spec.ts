import { expect } from 'chai';
import legacyWebStorage from './legacyWebStorage';

/** Un localStorage minimal : celui de jsdom refuse d'écrire sur `about:blank`. */
const inMemoryStorage = () => {
  const entries = new Map<string, string>();
  return {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => entries.set(key, value),
    removeItem: (key: string) => entries.delete(key),
  };
};

describe('webext > legacyWebStorage', function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scope = self as any;
  let original: unknown;

  beforeEach(() => {
    original = Object.getOwnPropertyDescriptor(scope, 'localStorage');
    Object.defineProperty(scope, 'localStorage', {
      value: inMemoryStorage(),
      configurable: true,
    });
  });

  afterEach(() => {
    delete scope.localStorage;
    if (original)
      Object.defineProperty(
        scope,
        'localStorage',
        original as PropertyDescriptor,
      );
  });

  it('ne construit rien quand la portée n’a pas de localStorage', () => {
    // Le service worker de Manifest V3 : lui réclamer un stockage web fait
    // écrire une erreur à redux-persist au moment même où le module est
    // évalué.
    expect(legacyWebStorage({})).to.equal(null);
  });

  it('construit un stockage quand la portée en a un', async () => {
    const storage = legacyWebStorage(scope);

    expect(storage).to.not.equal(null);
    await storage?.setItem('clé', 'valeur');
    expect(await storage?.getItem('clé')).to.equal('valeur');
  });
});
