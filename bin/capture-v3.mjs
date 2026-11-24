#!/usr/bin/env node
/**
 * Capture les réponses de l'API V3 de production, qui servent de référence aux
 * tests différentiels de `packages/api`.
 *
 * Ces tests comparent le rendu de la nouvelle API, octet pour octet, avec ce
 * que le backend PHP répond. La référence doit donc être prise **pendant que
 * le PHP tourne encore** : une fois celui-ci décommissionné, elle n'est plus
 * reproductible.
 *
 *   node bin/capture-v3.mjs
 *
 * Le corpus est exclu du dépôt : il porte le texte de 2 000 notices publiques,
 * dont une dizaine d'adresses de courriel. C'est une décision à prendre
 * sciemment avant l'arrêt du PHP — soit on le versionne, soit on garde une
 * copie hors dépôt.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ORIGINE = process.env.DISMOI_V3_ORIGIN ?? 'https://api.dismoi.io';
const DESTINATION =
  process.env.DISMOI_V3_FIXTURES ?? 'packages/api/test/fixtures/v3';

/** Le nombre de notices demandées par page, comme le fait l'extension. */
const PAR_PAGE = 1000;

/** Combien de notices individuelles capturer, pour la variante détaillée. */
const NOTICES_DETAILLEES = 24;

const lire = async (chemin) => {
  const reponse = await fetch(`${ORIGINE}/api/v3/${chemin}`);

  if (!reponse.ok) {
    throw new Error(`GET /api/v3/${chemin} → ${reponse.status}`);
  }

  // Le corps est gardé tel quel, sans réinterprétation : c'est l'octet servi
  // qui fait référence, pas sa valeur une fois relue.
  return reponse.text();
};

const ecrire = async (nom, corps) => {
  const cible = join(DESTINATION, nom);
  await mkdir(join(cible, '..'), { recursive: true });
  await writeFile(cible, corps);
  process.stdout.write(
    `  ${nom.padEnd(32)} ${(corps.length / 1024).toFixed(0)} Kio\n`,
  );
};

const main = async () => {
  process.stdout.write(`Capture depuis ${ORIGINE} vers ${DESTINATION}\n`);

  for (const chemin of ['categories', 'contributors', 'restricted-contexts']) {
    await ecrire(`${chemin}.json`, await lire(chemin));
  }

  await ecrire('matching-contexts-all.json', await lire('matching-contexts'));
  await ecrire(
    'matching-contexts-13.json',
    await lire('matching-contexts?contributors=%5B13%5D'),
  );

  // Les notices sont paginées : on avance jusqu'à une page incomplète.
  const identifiants = [];
  for (let offset = 0; ; offset += PAR_PAGE) {
    const corps = await lire(`notices?limit=${PAR_PAGE}&offset=${offset}`);
    await ecrire(`notices-${offset}.json`, corps);

    const page = JSON.parse(corps);
    identifiants.push(...page.map((notice) => notice.id));
    if (page.length < PAR_PAGE) break;
  }

  for (const id of identifiants.slice(0, NOTICES_DETAILLEES)) {
    await ecrire(`notice/${id}.json`, await lire(`notices/${id}`));
  }

  process.stdout.write(`${identifiants.length} notices capturées.\n`);
};

main().catch((erreur) => {
  process.stderr.write(`${erreur.message}\n`);
  process.exitCode = 1;
});
