#!/usr/bin/env node
/**
 * Inscrit la version décidée par semantic-release dans le `package.json`
 * racine, d'où `wxt.config.ts` la lit pour le manifeste des deux navigateurs.
 *
 * Usage : node bin/setVersion.mjs 4.0.0
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

/**
 * Rend le contenu du fichier avec la seule version changée.
 *
 * La substitution est textuelle plutôt qu'un aller-retour par `JSON.parse` :
 * réécrire le document entier reformaterait un fichier de deux cents lignes à
 * chaque publication, et noierait le changement de version dans le diff du
 * commit de release.
 */
export const withVersion = (contents, version) => {
  if (!SEMVER.test(version)) {
    throw new Error(`« ${version} » n'est pas une version sémantique.`);
  }

  const remplace = contents.replace(
    /^(\s*"version"\s*:\s*)"[^"]*"/m,
    `$1"${version}"`,
  );

  if (remplace === contents) {
    throw new Error('Aucun champ « version » trouvé dans le package.json.');
  }

  return remplace;
};

const main = () => {
  const version = process.argv[2];
  const fichier = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'package.json',
  );

  fs.writeFileSync(
    fichier,
    withVersion(fs.readFileSync(fichier, 'utf-8'), version),
  );

  console.log(`Version du projet portée à ${version}`);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
