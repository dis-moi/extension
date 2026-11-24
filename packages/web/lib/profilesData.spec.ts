import { expect } from 'chai';
import { fetchProfilesData, findContributorInPath } from './profilesData';

describe('web > lib > profilesData', function () {
  const realFetch = globalThis.fetch;
  let calledUrls: string[] = [];

  const answer = (answers: Record<string, unknown>, ok = true) => {
    calledUrls = [];
    globalThis.fetch = (async (url: string) => {
      calledUrls.push(String(url));
      const key = Object.keys(answers).find((name) =>
        String(url).endsWith(name),
      );

      return {
        ok,
        json: async () => (key ? answers[key] : undefined),
      };
    }) as unknown as typeof fetch;
  };

  const fail = (error: Error) => {
    calledUrls = [];
    globalThis.fetch = (async () => {
      throw error;
    }) as unknown as typeof fetch;
  };

  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it('asks for the contributors and the categories', async () => {
    answer({ contributors: [{ id: 1 }], categories: { a: 'Conso' } });

    const data = await fetchProfilesData();

    expect(calledUrls.some((url) => url.endsWith('contributors'))).to.equal(
      true,
    );
    expect(calledUrls.some((url) => url.endsWith('categories'))).to.equal(true);
    expect(data.contributors).to.have.lengthOf(1);
    expect(data.categories).to.deep.equal({ a: 'Conso' });
  });

  it('gives empty collections when the API refuses', async () => {
    answer({}, false);

    expect(await fetchProfilesData()).to.deep.equal({
      contributors: [],
      categories: {},
    });
  });

  it('gives empty collections when the API cannot be reached', async () => {
    fail(new Error('ECONNREFUSED'));

    expect(await fetchProfilesData()).to.deep.equal({
      contributors: [],
      categories: {},
    });
  });

  it('gives empty collections when the API answers anything at all', async () => {
    answer({ contributors: '<html>oups</html>', categories: null });

    expect(await fetchProfilesData()).to.deep.equal({
      contributors: [],
      categories: {},
    });
  });

  describe('findContributorInPath', function () {
    it('finds the contributor the identifier of the path names', async () => {
      answer({ contributors: [{ id: 16, name: 'Le Même en Mieux' }] });

      const contributor = await findContributorInPath([
        '16',
        'le-meme-en-mieux',
      ]);

      expect(contributor?.name).to.equal('Le Même en Mieux');
    });

    it('looks for nothing without an identifier', async () => {
      answer({ contributors: [{ id: 16 }] });

      expect(await findContributorInPath(undefined)).to.equal(null);
      expect(await findContributorInPath([])).to.equal(null);
      expect(await findContributorInPath(['pas-un-nombre'])).to.equal(null);
      expect(calledUrls).to.be.empty;
    });

    it('gives nothing for an unknown identifier', async () => {
      answer({ contributors: [{ id: 16 }] });

      expect(await findContributorInPath(['999'])).to.equal(null);
    });
  });
});
