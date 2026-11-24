import { cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Completes the `output: 'standalone'` output of Next.
 *
 * Next puts the server and its dependencies there, but neither the static
 * files nor `public/`: it expects them to be copied, and without them the
 * server starts, answers, and serves neither CSS nor images. This script
 * makes that copy so that `nx run web:build` produces a directory that is
 * really startable — that is what the host launches, with no manual step
 * left to forget.
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
  console.log(`copied ${path.relative(web, from)} to ${path.relative(web, to)}`);
}
