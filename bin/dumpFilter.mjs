/**
 * Filters a phpMyAdmin SQL dump into a usable development database.
 *
 * The production dump is 2.7 GB, of which 2.24 is `rating` (11.6 million
 * rows, 90% of them plain badge impressions) and 414 MB is `subscription`
 * (6.2 million extension-contributor pairs). Those two tables are only
 * needed whole to check the counters; for everything else a sample is
 * enough and loads in seconds instead of tens of minutes.
 */

export const CAPPED_TABLES = ['rating', 'subscription'];

export const MODES = ['schema', 'sample', 'full'];

const INSERT_HEADER = /^INSERT INTO `([^`]+)`/;

/**
 * A values line of a phpMyAdmin dump: `(1, 'a'),` or `(1, 'a');`. The header
 * of the statement ends with `VALUES` and lives on its own line, the values
 * following one per line.
 */
const isValuesLine = (line) => line.startsWith('(');

const endsStatement = (line) => /;\s*$/.test(line);

const closeStatement = (line) => line.replace(/,\s*$/, ';');

const validate = ({ mode, limit }) => {
  if (!MODES.includes(mode)) {
    throw new Error(
      `Unknown filter mode: "${mode}". Expected: ${MODES.join(', ')}.`,
    );
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error(
      `Invalid limit: "${limit}". Expected a positive integer or zero.`,
    );
  }
};

/**
 * @param {Iterable<string> | AsyncIterable<string>} lines
 * @param {{ mode: string, limit?: number, capped?: string[] }} options
 * @returns {AsyncGenerator<string>}
 */
export async function* filterDump(lines, options) {
  const mode = options?.mode;
  const limit = options?.limit ?? 20000;
  const capped = options?.capped ?? CAPPED_TABLES;

  validate({ mode, limit });

  if (mode === 'full') {
    for await (const line of lines) yield line;
    return;
  }

  let table = null;
  let cap = 0;

  /**
   * phpMyAdmin does not produce one statement per table but one per batch:
   * the production dump carries 46,750 `INSERT INTO `rating`` of about 248
   * lines each. A counter reset on every statement would cap nothing.
   */
  const emittedByTable = new Map();

  for await (const line of lines) {
    const header = INSERT_HEADER.exec(line);

    if (header) {
      table = header[1];
      cap = mode === 'schema' ? 0 : capped.includes(table) ? limit : Infinity;

      // A header with no line to follow would leave an incomplete
      // statement: it is dropped along with its values. That is the case of
      // the `schema` mode, and of a table whose cap is already reached.
      if ((emittedByTable.get(table) ?? 0) < cap) yield line;

      // Depending on its settings, phpMyAdmin may put the first values on
      // the same line as the header. The line then already carries data and
      // splitting it would mean parsing the SQL: it is left as it is and the
      // statement is considered consumed.
      if (endsStatement(line)) table = null;
      continue;
    }

    if (table !== null && isValuesLine(line)) {
      const emitted = emittedByTable.get(table) ?? 0;

      if (endsStatement(line)) {
        if (emitted < cap) {
          yield line;
          emittedByTable.set(table, emitted + 1);
        }
        table = null;
        continue;
      }

      if (emitted + 1 < cap) {
        yield line;
        emittedByTable.set(table, emitted + 1);
        continue;
      }

      if (emitted + 1 === cap) {
        // The last line kept has to close the statement, or MySQL waits for
        // the rest and fails on the one after.
        yield closeStatement(line);
        emittedByTable.set(table, emitted + 1);
      }

      continue;
    }

    if (table !== null && !isValuesLine(line)) {
      table = null;
    }

    yield line;
  }
}
