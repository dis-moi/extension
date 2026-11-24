import { expect } from 'chai';
import { MODES, firefoxChannel, parseEnvFile, submitArgs } from './submit.mjs';

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

  const valueAfter = (args, flag) => args[args.indexOf(flag) + 1];

  it('knows exactly three channels', () => {
    expect(MODES).to.deep.equal(['staging', 'proding', 'production']);
  });

  describe('firefoxChannel', () => {
    it('returns listed for production alone', () => {
      expect(firefoxChannel('production')).to.equal('listed');
      expect(firefoxChannel('staging')).to.equal('unlisted');
      expect(firefoxChannel('proding')).to.equal('unlisted');
    });
  });

  describe('parseEnvFile', () => {
    it('reads the pairs and ignores comments and empty lines', () => {
      expect(
        parseEnvFile('# a comment\n\nA=1\nB = two \nC="three"\n'),
      ).to.deep.equal({ A: '1', B: 'two', C: 'three' });
    });

    it('keeps the equals signs of a value', () => {
      expect(parseEnvFile('URL=https://x/?a=1&b=2').URL).to.equal(
        'https://x/?a=1&b=2',
      );
    });
  });

  describe('submitArgs', () => {
    MODES.forEach((mode) => {
      it(`submits ${mode} to the ${mode} item, and to no other`, () => {
        const args = submitArgs({ mode, version: '4.0.0', env: env[mode] });

        expect(valueAfter(args, '--chrome-extension-id')).to.equal(
          env[mode].CHROME_EXTENSION_ID,
        );
        expect(valueAfter(args, '--firefox-extension-id')).to.equal(
          env[mode].FIREFOX_EXTENSION_ID,
        );

        MODES.filter((other) => other !== mode).forEach((other) => {
          expect(args.join(' ')).to.not.contain(env[other].CHROME_EXTENSION_ID);
          expect(args.join(' ')).to.not.contain(`-${other}-`);
        });
      });

      it(`sends the ${mode} archives alone`, () => {
        const args = submitArgs({ mode, version: '4.0.0', env: env[mode] });

        ['--chrome-zip', '--firefox-zip', '--firefox-sources-zip'].forEach(
          (flag) => {
            expect(valueAfter(args, flag)).to.contain(`dismoi-4.0.0-${mode}-`);
          },
        );
      });
    });

    it('reserves the listed channel of AMO for production', () => {
      expect(
        valueAfter(
          submitArgs({
            mode: 'production',
            version: '4.0.0',
            env: env.production,
          }),
          '--firefox-channel',
        ),
      ).to.equal('listed');
      expect(
        valueAfter(
          submitArgs({ mode: 'staging', version: '4.0.0', env: env.staging }),
          '--firefox-channel',
        ),
      ).to.equal('unlisted');
    });

    it('passes the dry run along', () => {
      const args = submitArgs({
        mode: 'staging',
        version: '4.0.0',
        env: env.staging,
        dryRun: true,
      });

      expect(args).to.contain('--dry-run');
    });

    it('refuses an unknown channel', () => {
      expect(() =>
        submitArgs({ mode: 'preprod', version: '4.0.0', env: {} }),
      ).to.throw(/preprod/);
    });

    it('refuses to publish with no item identifier', () => {
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
