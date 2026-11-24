#!/usr/bin/env node
/**
 * Writes a filtered dump to standard output, ready to be piped into a MySQL
 * client. This script knows no database and opens no connection: the caller
 * takes care of that, so no credential crosses this code.
 *
 *   node bin/db-restore.mjs --mode sample | docker exec -i … mysql … dismoi
 *
 * The dump path comes from --dump or from DISMOI_DUMP and has no default: a
 * production backup is not a file to be guessed.
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { filterDump, CAPPED_TABLES } from './dumpFilter.mjs';
import { readOptions } from './dbRestoreOptions.mjs';

const dumpSize = async (path) => {
  const info = await stat(path).catch(() => null);

  if (!info || !info.isFile()) {
    throw new Error(`The dump "${path}" is not a readable file.`);
  }

  return info.size;
};

const main = async () => {
  const options = readOptions(process.argv.slice(2), process.env);
  const size = await dumpSize(options.dump);

  // The report goes to standard error: standard output carries only SQL,
  // since it is piped into a MySQL client.
  process.stderr.write(
    `Dump: ${options.dump} (${(size / 1024 ** 3).toFixed(2)} GB)\n` +
      `Mode: ${options.mode}` +
      (options.mode === 'sample'
        ? `, ${options.limit} rows at most for ${CAPPED_TABLES.join(' and ')}`
        : '') +
      '\n',
  );

  const lines = createInterface({
    input: createReadStream(options.dump, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  await pipeline(
    Readable.from(
      (async function* () {
        for await (const line of filterDump(lines, options)) {
          yield `${line}\n`;
        }
      })(),
    ),
    process.stdout,
  );
};

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
