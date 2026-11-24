#!/usr/bin/env node
/**
 * Écrit sur la sortie standard un dump filtré, prêt à être redirigé vers un
 * client MySQL. Ce script ne connaît aucune base et n'ouvre aucune connexion :
 * c'est l'appelant qui s'en charge, de sorte qu'aucun identifiant ne traverse
 * ce code.
 *
 *   node bin/db-restore.mjs --mode sample | docker exec -i … mysql … dismoi
 *
 * Le chemin du dump vient de --dump ou de DISMOI_DUMP, et n'a pas de valeur
 * par défaut : une sauvegarde de production n'est pas un fichier qu'on devine.
 *
 * Les règles d'analyse des arguments vivent dans `dbRestoreOptions.mjs` et le
 * filtrage dans `dumpFilter.mjs`, tous deux purs et testés. Il ne reste ici que
 * les entrées-sorties.
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { filterDump, TABLES_PLAFONNEES } from './dumpFilter.mjs';
import { lireOptions } from './dbRestoreOptions.mjs';

const tailleDuDump = async (chemin) => {
  const infos = await stat(chemin).catch(() => null);

  if (!infos || !infos.isFile()) {
    throw new Error(`Le dump « ${chemin} » n'est pas un fichier lisible.`);
  }

  return infos.size;
};

const main = async () => {
  const options = lireOptions(process.argv.slice(2), process.env);
  const taille = await tailleDuDump(options.dump);

  // Le compte rendu part sur la sortie d'erreur : la sortie standard ne porte
  // que du SQL, puisqu'elle est redirigée vers un client MySQL.
  process.stderr.write(
    `Dump : ${options.dump} (${(taille / 1024 ** 3).toFixed(2)} Go)\n` +
      `Mode : ${options.mode}` +
      (options.mode === 'sample'
        ? `, ${options.limit} lignes au plus pour ${TABLES_PLAFONNEES.join(' et ')}`
        : '') +
      '\n',
  );

  const lignes = createInterface({
    input: createReadStream(options.dump, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  await pipeline(
    Readable.from(
      (async function* () {
        for await (const ligne of filterDump(lignes, options)) {
          yield `${ligne}\n`;
        }
      })(),
    ),
    process.stdout,
  );
};

main().catch((erreur) => {
  process.stderr.write(`${erreur.message}\n`);
  process.exitCode = 1;
});
