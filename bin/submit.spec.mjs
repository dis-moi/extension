import { expect } from 'chai';
import { MODES, firefoxChannel, parseEnvFile, submitArgs } from './submit.mjs';

/**
 * Trois canaux partagent un même compte de store et un même jeu d'identifiants
 * d'API : seule l'identité de l'élément distingue une publication interne
 * d'une publication aux 1 237 utilisateurs de la fiche publique. Ces exemples
 * interdisent de croiser les fils.
 */
describe('bin > submit', () => {
  const env = {
    staging: {
      CHROME_EXTENSION_ID: 'nfabbfkbbbcebdmnocndhdombaffkaog',
      FIREFOX_EXTENSION_ID: '{7d0d2553-c311-4acd-a170-f9a4714eb2c0}',
    },
    proding: {
      CHROME_EXTENSION_ID: 'mepoelfgpameiagpkgpjphnbgampgffm',
      FIREFOX_EXTENSION_ID: '{72aad822-62f5-4663-a8f0-025b2f9a3dd5}',
    },
    production: {
      CHROME_EXTENSION_ID: 'fpjlnlnbacohacebkadbbjebbipcknbg',
      FIREFOX_EXTENSION_ID: '@lmem',
    },
  };

  const valeurApres = (args, drapeau) => args[args.indexOf(drapeau) + 1];

  it('connaît exactement trois canaux', () => {
    expect(MODES).to.deep.equal(['staging', 'proding', 'production']);
  });

  describe('firefoxChannel', () => {
    it('ne rend « listed » que pour la production', () => {
      expect(firefoxChannel('production')).to.equal('listed');
      expect(firefoxChannel('staging')).to.equal('unlisted');
      expect(firefoxChannel('proding')).to.equal('unlisted');
    });
  });

  describe('parseEnvFile', () => {
    it('lit les paires, ignore commentaires et lignes vides', () => {
      expect(
        parseEnvFile('# un commentaire\n\nA=1\nB = deux \nC="trois"\n'),
      ).to.deep.equal({ A: '1', B: 'deux', C: 'trois' });
    });

    it('garde les signes égal d’une valeur', () => {
      expect(parseEnvFile('URL=https://x/?a=1&b=2').URL).to.equal(
        'https://x/?a=1&b=2',
      );
    });
  });

  describe('submitArgs', () => {
    MODES.forEach((mode) => {
      it(`soumet ${mode} à l’élément de ${mode}, et à nul autre`, () => {
        const args = submitArgs({ mode, version: '4.0.0', env: env[mode] });

        expect(valeurApres(args, '--chrome-extension-id')).to.equal(
          env[mode].CHROME_EXTENSION_ID,
        );
        expect(valeurApres(args, '--firefox-extension-id')).to.equal(
          env[mode].FIREFOX_EXTENSION_ID,
        );

        const autres = MODES.filter((m) => m !== mode);
        autres.forEach((autre) => {
          expect(args.join(' ')).to.not.contain(env[autre].CHROME_EXTENSION_ID);
          expect(args.join(' ')).to.not.contain(`-${autre}-`);
        });
      });

      it(`n’envoie que les archives de ${mode}`, () => {
        const args = submitArgs({ mode, version: '4.0.0', env: env[mode] });

        ['--chrome-zip', '--firefox-zip', '--firefox-sources-zip'].forEach(
          (drapeau) => {
            expect(valeurApres(args, drapeau)).to.contain(
              `dismoi-4.0.0-${mode}-`,
            );
          },
        );
      });
    });

    it('réserve le canal « listed » d’AMO à la production', () => {
      expect(
        valeurApres(
          submitArgs({
            mode: 'production',
            version: '4.0.0',
            env: env.production,
          }),
          '--firefox-channel',
        ),
      ).to.equal('listed');
      expect(
        valeurApres(
          submitArgs({ mode: 'staging', version: '4.0.0', env: env.staging }),
          '--firefox-channel',
        ),
      ).to.equal('unlisted');
    });

    it('transmet l’essai à blanc', () => {
      const args = submitArgs({
        mode: 'staging',
        version: '4.0.0',
        env: env.staging,
        dryRun: true,
      });

      expect(args).to.contain('--dry-run');
    });

    it('refuse un canal inconnu', () => {
      expect(() =>
        submitArgs({ mode: 'preprod', version: '4.0.0', env: {} }),
      ).to.throw(/preprod/);
    });

    it('refuse de publier sans identifiant d’élément', () => {
      // Sans identifiant, publish-extension créerait ou viserait autre chose
      // que ce qu'on croit : mieux vaut interrompre.
      expect(() =>
        submitArgs({ mode: 'production', version: '4.0.0', env: {} }),
      ).to.throw(/CHROME_EXTENSION_ID/);
      expect(() =>
        submitArgs({
          mode: 'production',
          version: '4.0.0',
          env: { CHROME_EXTENSION_ID: 'x' },
        }),
      ).to.throw(/FIREFOX_EXTENSION_ID/);
    });
  });
});
