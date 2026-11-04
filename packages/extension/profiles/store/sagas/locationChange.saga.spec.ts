import { expect } from 'chai';
import { matchPath } from 'react-router';
import {
  contributorPaths,
  contributorsPaths,
  subscriptionsPaths,
} from './locationChange.saga';

// Reproduit la correspondance de takeLatestLocationChange.
const matches = (paths: string[], pathname: string) =>
  paths.some(
    (path) =>
      matchPath(pathname, { path, exact: true, strict: false }) !== null,
  );

describe('locationChange routes', () => {
  // Les chemins traduits portent déjà la langue : les motifs doivent donc
  // correspondre aux URL réellement servies, sans préfixe supplémentaire.
  it('matches the French contributors page', () => {
    expect(matches(contributorsPaths, '/fr/profils')).to.equal(true);
  });

  it('matches the English contributors page', () => {
    expect(matches(contributorsPaths, '/en/guides')).to.equal(true);
  });

  it('matches the French subscriptions page', () => {
    expect(matches(subscriptionsPaths, '/fr/mes-abonnements')).to.equal(true);
  });

  it('matches a single contributor page', () => {
    expect(matches(contributorPaths, '/fr/profils/42/Jean-Dupont')).to.equal(
      true,
    );
  });
});
