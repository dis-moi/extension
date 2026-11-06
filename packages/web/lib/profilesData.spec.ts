import { expect } from 'chai';
import { fetchProfilesData, findContributorInPath } from './profilesData';

/**
 * Ces données alimentent le rendu serveur de la page des profils. Une API
 * indisponible ne doit jamais faire tomber la page : elle se rend alors
 * vide, et les sagas rattrapent le chargement dans le navigateur.
 */
describe('web > lib > profilesData', function () {
  const vraiFetch = globalThis.fetch;
  let urlsAppelees: string[] = [];

  const repondre = (reponses: Record<string, unknown>, ok = true) => {
    urlsAppelees = [];
    globalThis.fetch = (async (url: string) => {
      urlsAppelees.push(String(url));
      const cle = Object.keys(reponses).find((nom) =>
        String(url).endsWith(nom),
      );

      return {
        ok,
        json: async () => (cle ? reponses[cle] : undefined),
      };
    }) as unknown as typeof fetch;
  };

  const echouer = (erreur: Error) => {
    urlsAppelees = [];
    globalThis.fetch = (async () => {
      throw erreur;
    }) as unknown as typeof fetch;
  };

  afterEach(() => {
    globalThis.fetch = vraiFetch;
  });

  it('demande les contributeurs et les catégories', async () => {
    repondre({ contributors: [{ id: 1 }], categories: { a: 'Conso' } });

    const data = await fetchProfilesData();

    expect(urlsAppelees.some((url) => url.endsWith('contributors'))).to.equal(
      true,
    );
    expect(urlsAppelees.some((url) => url.endsWith('categories'))).to.equal(
      true,
    );
    expect(data.contributors).to.have.lengthOf(1);
    expect(data.categories).to.deep.equal({ a: 'Conso' });
  });

  it('rend des collections vides quand l’API refuse', async () => {
    repondre({}, false);

    expect(await fetchProfilesData()).to.deep.equal({
      contributors: [],
      categories: {},
    });
  });

  it('rend des collections vides quand l’API est injoignable', async () => {
    echouer(new Error('ECONNREFUSED'));

    expect(await fetchProfilesData()).to.deep.equal({
      contributors: [],
      categories: {},
    });
  });

  it('rend des collections vides quand l’API répond n’importe quoi', async () => {
    // Une page d'erreur HTML servie en 200, par exemple : le rendu doit
    // tenir quand même.
    repondre({ contributors: '<html>oups</html>', categories: null });

    expect(await fetchProfilesData()).to.deep.equal({
      contributors: [],
      categories: {},
    });
  });

  describe('findContributorInPath', function () {
    it('trouve le contributeur désigné par l’identifiant du chemin', async () => {
      repondre({ contributors: [{ id: 16, name: 'Le Même en Mieux' }] });

      const contributeur = await findContributorInPath([
        '16',
        'le-meme-en-mieux',
      ]);

      expect(contributeur?.name).to.equal('Le Même en Mieux');
    });

    it('ne cherche rien sans identifiant', async () => {
      repondre({ contributors: [{ id: 16 }] });

      expect(await findContributorInPath(undefined)).to.equal(null);
      expect(await findContributorInPath([])).to.equal(null);
      expect(await findContributorInPath(['pas-un-nombre'])).to.equal(null);
      expect(urlsAppelees).to.be.empty;
    });

    it('ne rend rien pour un identifiant inconnu', async () => {
      repondre({ contributors: [{ id: 16 }] });

      expect(await findContributorInPath(['999'])).to.equal(null);
    });
  });
});
