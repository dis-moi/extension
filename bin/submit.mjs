#!/usr/bin/env node
/**
 * Soumet un canal aux stores Chrome et Firefox.
 *
 * Les trois canaux partagent un compte de store et un jeu d'identifiants
 * d'API : seule l'identité de l'élément distingue une publication interne de
 * la fiche publique. Ces identités sont publiques et vivent dans les
 * `.env.<canal>` du dépôt ; les secrets d'API, eux, ne viennent que de
 * l'environnement (CHROME_CLIENT_ID, CHROME_CLIENT_SECRET,
 * CHROME_REFRESH_TOKEN, FIREFOX_JWT_ISSUER, FIREFOX_JWT_SECRET) et ne sont ni
 * lus ni affichés ici : `wxt submit` les prend lui-même.
 *
 * Usage : node bin/submit.mjs <staging|proding|production> [--dry-run]
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MODES = ['staging', 'proding', 'production'];

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dossierExtension = path.join(racine, 'packages', 'extension');

/**
 * Lit un fichier `.env` sans dépendance : une paire par ligne, `#` en
 * commentaire. La valeur garde ses signes égal — une URL en contient.
 */
export const parseEnvFile = (contents) =>
  Object.fromEntries(
    contents
      .split('\n')
      .map((ligne) => ligne.trim())
      .filter((ligne) => ligne !== '' && !ligne.startsWith('#'))
      .map((ligne) => {
        const separateur = ligne.indexOf('=');

        return [
          ligne.slice(0, separateur).trim(),
          ligne
            .slice(separateur + 1)
            .trim()
            .replace(/^["']|["']$/g, ''),
        ];
      })
      .filter(([cle]) => cle !== ''),
  );

/**
 * Le canal d'AMO. « listed » publie sur addons.mozilla.org ; staging et
 * proding sont des builds internes, qui ne doivent apparaître nulle part.
 */
export const firefoxChannel = (mode) =>
  mode === 'production' ? 'listed' : 'unlisted';

const archive = (version, mode, suffixe) =>
  `.output/dismoi-${version}-${mode}-${suffixe}`;

/**
 * Construit la ligne de commande de `wxt submit` pour un canal.
 *
 * Les identifiants d'élément sont passés explicitement plutôt que laissés à
 * l'environnement : une variable héritée du shell publierait le mauvais
 * canal sans rien signaler.
 */
export const submitArgs = ({ mode, version, env, dryRun = false }) => {
  if (!MODES.includes(mode)) {
    throw new Error(
      `Canal inconnu : « ${mode} ». Attendu : ${MODES.join(', ')}.`,
    );
  }

  ['CHROME_EXTENSION_ID', 'FIREFOX_EXTENSION_ID'].forEach((nom) => {
    if (!env[nom]) {
      throw new Error(
        `${nom} est absent de .env.${mode}, publication annulée.`,
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
  const [mode, ...reste] = process.argv.slice(2);

  // Avant de chercher un fichier d'environnement : sans ce contrôle, un canal
  // mal orthographié échouait sur un ENOENT qui ne nommait pas la vraie
  // cause.
  if (!MODES.includes(mode)) {
    throw new Error(
      `Canal inconnu : « ${mode} ». Attendu : ${MODES.join(', ')}.`,
    );
  }

  const dryRun = reste.includes('--dry-run');
  const { version } = JSON.parse(
    fs.readFileSync(path.join(racine, 'package.json'), 'utf-8'),
  );
  const env = parseEnvFile(
    fs.readFileSync(path.join(racine, `.env.${mode}`), 'utf-8'),
  );
  const args = submitArgs({ mode, version, env, dryRun });

  console.log(
    `Soumission du canal ${mode} en ${version}${dryRun ? ' (essai à blanc)' : ''}`,
  );

  const { status } = spawnSync('npx', ['wxt', ...args], {
    cwd: dossierExtension,
    stdio: 'inherit',
  });

  if (status !== 0) {
    process.exit(status ?? 1);
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (erreur) {
    // Une erreur d'usage mérite une phrase, pas une trace de pile : elle sera
    // lue dans un journal de CI, par quelqu'un qui cherche quel canal a
    // échoué et pourquoi.
    console.error(`Publication interrompue : ${erreur.message}`);
    process.exit(1);
  }
}
