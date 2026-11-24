#!/usr/bin/env node
/**
 * Submits a channel to the Chrome and Firefox stores.
 *
 * The three channels share one store account and one set of API
 * credentials: only the identity of the item distinguishes an internal
 * publication from the public listing. Those identities are public and live
 * in the `.env.<channel>` files of the repository; the API secrets come only
 * from the environment (CHROME_CLIENT_ID, CHROME_CLIENT_SECRET,
 * CHROME_REFRESH_TOKEN, FIREFOX_JWT_ISSUER, FIREFOX_JWT_SECRET) and are
 * neither read nor displayed here: `wxt submit` takes them itself.
 *
 * Usage: node bin/submit.mjs <staging|proding|production> [--dry-run]
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MODES = ['staging', 'proding', 'production'];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const extensionFolder = path.join(root, 'packages', 'extension');

/**
 * Reads an `.env` file with no dependency: one pair per line, `#` as a
 * comment. The value keeps its equals signs — a URL carries some.
 */
export const parseEnvFile = (contents) =>
  Object.fromEntries(
    contents
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '' && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=');

        return [
          line.slice(0, separator).trim(),
          line
            .slice(separator + 1)
            .trim()
            .replace(/^["']|["']$/g, ''),
        ];
      })
      .filter(([key]) => key !== ''),
  );

/**
 * The AMO channel. "listed" publishes on addons.mozilla.org; staging and
 * proding are internal builds, which must appear nowhere.
 */
export const firefoxChannel = (mode) =>
  mode === 'production' ? 'listed' : 'unlisted';

const archive = (version, mode, suffix) =>
  `.output/dismoi-${version}-${mode}-${suffix}`;

/**
 * The item identifiers are passed explicitly rather than left to the
 * environment: a variable inherited from the shell would publish the wrong
 * channel without signalling anything.
 */
export const submitArgs = ({ mode, version, env, dryRun = false }) => {
  if (!MODES.includes(mode)) {
    throw new Error(
      `Unknown channel: "${mode}". Expected: ${MODES.join(', ')}.`,
    );
  }

  ['CHROME_EXTENSION_ID', 'FIREFOX_EXTENSION_ID'].forEach((name) => {
    if (!env[name]) {
      throw new Error(
        `${name} is missing from .env.${mode}, publication cancelled.`,
      );
    }
  });

  return [
    'submit',
    ...(dryRun ? ['--dry-run'] : []),
    '--chrome-zip',
    archive(version, mode, 'chrome.zip'),
    '--chrome-extension-id',
    env.CHROME_EXTENSION_ID,
    '--firefox-zip',
    archive(version, mode, 'firefox.zip'),
    '--firefox-sources-zip',
    archive(version, mode, 'sources.zip'),
    '--firefox-extension-id',
    env.FIREFOX_EXTENSION_ID,
    '--firefox-channel',
    firefoxChannel(mode),
  ];
};

const main = () => {
  const [mode, ...rest] = process.argv.slice(2);

  // Before looking for an environment file: without this check, a
  // misspelled channel failed on an ENOENT that did not name the real cause.
  if (!MODES.includes(mode)) {
    throw new Error(
      `Unknown channel: "${mode}". Expected: ${MODES.join(', ')}.`,
    );
  }

  const dryRun = rest.includes('--dry-run');
  const { version } = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf-8'),
  );
  const env = parseEnvFile(
    fs.readFileSync(path.join(root, `.env.${mode}`), 'utf-8'),
  );
  const args = submitArgs({ mode, version, env, dryRun });

  console.log(
    `Submitting the ${mode} channel at ${version}${dryRun ? ' (dry run)' : ''}`,
  );

  const { status } = spawnSync('npx', ['wxt', ...args], {
    cwd: extensionFolder,
    stdio: 'inherit',
  });

  if (status !== 0) {
    process.exit(status ?? 1);
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    // A usage error deserves a sentence, not a stack trace: it will be read
    // in a CI log, by somebody looking for which channel failed and why.
    console.error(`Publication interrupted: ${error.message}`);
    process.exit(1);
  }
}
