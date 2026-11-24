#!/usr/bin/env node
/**
 * Captures the answers of the production V3 API, which serve as the
 * reference of the differential tests of `packages/api`.
 *
 * Those tests compare the rendering of the new API, byte for byte, with what
 * the PHP backend answers. The reference therefore has to be taken **while
 * the PHP is still running**: once it is decommissioned, it can no longer be
 * reproduced.
 *
 *   node bin/capture-v3.mjs
 *
 * The corpus is excluded from the repository: it carries the text of 2,000
 * public notices, a dozen email addresses among them. That is a decision to
 * take knowingly before the PHP is switched off — either it is versioned, or
 * a copy is kept outside the repository.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ORIGIN = process.env.DISMOI_V3_ORIGIN ?? 'https://api.dismoi.io';
const DESTINATION =
  process.env.DISMOI_V3_FIXTURES ?? 'packages/api/test/fixtures/v3';

/** The number of notices asked per page, as the extension does. */
const PER_PAGE = 1000;

const DETAILED_NOTICES = 24;

const read = async (path) => {
  const response = await fetch(`${ORIGIN}/api/v3/${path}`);

  if (!response.ok) {
    throw new Error(`GET /api/v3/${path} → ${response.status}`);
  }

  // The body is kept as it is, without reinterpretation: the reference is
  // the byte served, not its value once read back.
  return response.text();
};

const write = async (name, body) => {
  const target = join(DESTINATION, name);
  await mkdir(join(target, '..'), { recursive: true });
  await writeFile(target, body);
  process.stdout.write(
    `  ${name.padEnd(32)} ${(body.length / 1024).toFixed(0)} KiB\n`,
  );
};

const main = async () => {
  process.stdout.write(`Capturing from ${ORIGIN} into ${DESTINATION}\n`);

  for (const path of ['categories', 'contributors', 'restricted-contexts']) {
    await write(`${path}.json`, await read(path));
  }

  await write('matching-contexts-all.json', await read('matching-contexts'));
  await write(
    'matching-contexts-13.json',
    await read('matching-contexts?contributors=%5B13%5D'),
  );

  // The notices are paginated: advance until a page comes back incomplete.
  const identifiers = [];
  for (let offset = 0; ; offset += PER_PAGE) {
    const body = await read(`notices?limit=${PER_PAGE}&offset=${offset}`);
    await write(`notices-${offset}.json`, body);

    const page = JSON.parse(body);
    identifiers.push(...page.map((notice) => notice.id));
    if (page.length < PER_PAGE) break;
  }

  for (const id of identifiers.slice(0, DETAILED_NOTICES)) {
    await write(`notice/${id}.json`, await read(`notices/${id}`));
  }

  process.stdout.write(`${identifiers.length} notices captured.\n`);
};

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
