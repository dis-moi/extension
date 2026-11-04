import path from 'path';
import { expect } from 'chai';
import { assertRequiredEnv, resolveInjectedEnv } from './buildEnv';

const repoRoot = path.resolve(__dirname, '../..');

/**
 * Fixe — ou retire, avec `undefined` — une variable du shell le temps d'un
 * test. La cible `test` définit `BACKEND_ORIGIN=''`, ce qui masquerait les
 * fichiers `.env` dont ces tests vérifient le contenu.
 */
const withEnv = <T>(
  name: string,
  value: string | undefined,
  run: () => T,
): T => {
  const initial = process.env[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
  try {
    return run();
  } finally {
    if (initial === undefined) delete process.env[name];
    else process.env[name] = initial;
  }
};

describe('resolveInjectedEnv', () => {
  // Les modes dont le fichier .env est versionné, donc constructibles en CI.
  ['production', 'staging', 'proding'].forEach((mode) => {
    it(`resolves an absolute backend origin in ${mode} mode`, () => {
      const { BACKEND_ORIGIN } = withEnv('BACKEND_ORIGIN', undefined, () =>
        resolveInjectedEnv(mode, repoRoot),
      );

      expect(BACKEND_ORIGIN, `BACKEND_ORIGIN en mode ${mode}`).to.be.a(
        'string',
      );
      expect(BACKEND_ORIGIN).to.match(/^https:\/\//);
      // call.ts concatène sans séparateur : BACKEND_ORIGIN + 'contributors'
      expect(BACKEND_ORIGIN).to.match(/\/$/);
    });
  });

  it('reads the shared .env as well as the mode-specific one', () => {
    expect(
      resolveInjectedEnv('production', repoRoot).CHROME_STORE_URL,
    ).to.match(/^https:\/\//);
  });

  it('lets a value set in the shell override the files', () => {
    const resolved = withEnv(
      'BACKEND_ORIGIN',
      'https://example.test/api/',
      () => resolveInjectedEnv('production', repoRoot),
    );

    expect(resolved.BACKEND_ORIGIN).to.equal('https://example.test/api/');
  });

  it('does not expose variables outside the allow list', () => {
    // SENTRY_ORG est dans .env.production mais ne doit pas atteindre le bundle.
    expect(
      Object.keys(resolveInjectedEnv('production', repoRoot)),
    ).not.to.include('SENTRY_ORG');
  });
});

describe('assertRequiredEnv', () => {
  it('accepts the environment resolved for a versioned mode', () => {
    const env = withEnv('BACKEND_ORIGIN', undefined, () =>
      resolveInjectedEnv('production', repoRoot),
    );

    expect(() => assertRequiredEnv(env, 'production')).not.to.throw();
  });

  it('rejects a missing backend origin', () => {
    expect(() => assertRequiredEnv({}, 'production')).to.throw(
      /BACKEND_ORIGIN/,
    );
  });

  it('rejects an empty backend origin, which would build relative URLs', () => {
    // `BACKEND_ORIGIN + 'contributors'` donnerait un chemin relatif à
    // l'extension : des 404 silencieux au lieu d'un échec de compilation.
    expect(() =>
      assertRequiredEnv({ BACKEND_ORIGIN: '' }, 'production'),
    ).to.throw(/BACKEND_ORIGIN/);
  });

  it('names the build mode so the right .env file can be found', () => {
    expect(() => assertRequiredEnv({}, 'staging')).to.throw(/staging/);
  });
});
