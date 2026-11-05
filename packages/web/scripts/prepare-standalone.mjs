import { cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Complète la sortie `output: 'standalone'` de Next.
 *
 * Next y place le serveur et ses dépendances, mais ni les fichiers statiques
 * ni `public/` : il attend qu'on les copie, et sans eux le serveur démarre,
 * répond, et ne sert ni CSS ni images. Ce script fait cette copie pour que
 * `nx run web:build` produise un dossier réellement démarrable — c'est ce que
 * l'hébergeur lance, sans étape manuelle à ne pas oublier.
 *
 * https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
 */
const web = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const standalone = path.join(web, '.next/standalone/packages/web');

for (const [from, to] of [
  [path.join(web, '.next/static'), path.join(standalone, '.next/static')],
  [path.join(web, 'public'), path.join(standalone, 'public')],
]) {
  await rm(to, { recursive: true, force: true });
  await cp(from, to, { recursive: true });
  console.log(`copié ${path.relative(web, from)} → ${path.relative(web, to)}`);
}
