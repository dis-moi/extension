/**
 * Isolated from the script that reads the file and writes to standard
 * output, so that the rules — defaults, accepted forms, refusals — can be
 * checked without touching the disk or a database.
 */
import { MODES } from './dumpFilter.mjs';

const DEFAULTS = { mode: 'sample', limit: 20000 };

const requireValue = (name, value) => {
  if (value === undefined || value.startsWith('--')) {
    throw new Error(`The ${name} argument expects a value.`);
  }
  return value;
};

/**
 * @param {string[]} argv arguments, without the binary or the script
 * @param {Record<string, string | undefined>} env
 * @returns {{ mode: string, limit: number, dump: string }}
 */
export const readOptions = (argv, env = {}) => {
  const options = { ...DEFAULTS, dump: env.DISMOI_DUMP };

  for (let i = 0; i < argv.length; i += 1) {
    const separator = argv[i].indexOf('=');
    const name = separator === -1 ? argv[i] : argv[i].slice(0, separator);
    const attached = separator === -1 ? undefined : argv[i].slice(separator + 1);
    const value = attached ?? argv[i + 1];
    const consumed = attached === undefined ? 1 : 0;

    if (name === '--mode') {
      options.mode = requireValue(name, value);
      i += consumed;
    } else if (name === '--limit') {
      const raw = requireValue(name, value);
      const limit = Number(raw);
      if (!Number.isInteger(limit) || limit < 0) {
        throw new Error(
          `Invalid limit: "${raw}". Expected a positive integer or zero.`,
        );
      }
      options.limit = limit;
      i += consumed;
    } else if (name === '--dump') {
      options.dump = requireValue(name, value);
      i += consumed;
    } else {
      throw new Error(
        `Unknown argument: "${argv[i]}". Expected: --mode, --limit, --dump.`,
      );
    }
  }

  if (!MODES.includes(options.mode)) {
    throw new Error(
      `Unknown mode: "${options.mode}". Expected: ${MODES.join(', ')}.`,
    );
  }

  if (!options.dump) {
    throw new Error(
      'Dump path missing. Pass --dump <file> or set DISMOI_DUMP.',
    );
  }

  return options;
};
