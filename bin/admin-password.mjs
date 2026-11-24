#!/usr/bin/env node
/**
 * Sets the password of an administration account.
 *
 *   yarn admin:password jarfaoui
 *
 * The password is read from standard input without echo, so it appears
 * neither in the command line nor in the shell history.
 *
 * The hash produced is bcrypt at cost 13, rewritten with the `$2y$` prefix:
 * exactly the form FOSUserBundle put on the 26 existing accounts, so that
 * the PHP backend and the new administration both accept the password for as
 * long as the two coexist.
 */
import { createInterface } from 'node:readline';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const COST = 13;

const connect = () =>
  mysql.createConnection({
    host: process.env.DISMOI_DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DISMOI_DB_PORT ?? 3310),
    database: process.env.DISMOI_DB_NAME ?? 'dismoi',
    user: process.env.DISMOI_DB_USER ?? 'root',
    password: process.env.DISMOI_DB_PASSWORD ?? 'dev',
  });

/**
 * The path outside a terminal, which allows `echo … | yarn admin:password
 * alice` from a script.
 */
const readStream = async () => {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);

  const text = Buffer.concat(chunks).toString('utf8');
  const firstLine = text.split('\n')[0] ?? '';
  return firstLine.replace(/\r$/, '');
};

const readWithoutEcho = (prompt) =>
  new Promise((resolve) => {
    process.stderr.write(prompt);

    const reader = createInterface({
      input: process.stdin,
      output: process.stderr,
      terminal: true,
    });
    // `_writeToOutput` neutralised: the prompt shows, the input does not.
    reader._writeToOutput = () => {};

    reader.question('', (line) => {
      reader.close();
      process.stderr.write('\n');
      resolve(line);
    });
  });

const askForPassword = async (prompt) =>
  process.stdin.isTTY ? readWithoutEcho(prompt) : readStream();

const main = async () => {
  const login = process.argv[2];
  if (login === undefined) {
    throw new Error(
      'Usage: yarn admin:password <login or address>\n' +
        'The login is the one of the fos_user table.',
    );
  }

  const canonical = login.trim().toLowerCase();
  const db = await connect();

  try {
    const [accounts] = await db.execute(
      `SELECT id, username, email, enabled FROM fos_user
        WHERE username_canonical = ? OR email_canonical = ?`,
      [canonical, canonical],
    );

    const account = accounts[0];
    if (account === undefined) {
      const [all] = await db.execute(
        'SELECT username FROM fos_user ORDER BY username',
      );
      throw new Error(
        `No account "${login}".\n` +
          `Existing accounts: ${all.map((row) => row.username).join(', ')}`,
      );
    }

    process.stderr.write(
      `Account ${account.username} <${account.email}>` +
        (account.enabled === 1 ? '' : ' — DISABLED') +
        '\n',
    );

    const password = await askForPassword('New password: ');
    if (password.length < 12) {
      throw new Error('Password too short: twelve characters at least.');
    }

    const confirmation = process.stdin.isTTY
      ? await readWithoutEcho('Confirm: ')
      : password;
    if (confirmation !== password) {
      throw new Error('The two entries differ.');
    }

    const hash = (await bcrypt.hash(password, COST)).replace(
      /^\$2[aby]\$/,
      '$2y$',
    );

    await db.execute(
      'UPDATE fos_user SET password = ?, salt = NULL WHERE id = ?',
      [hash, account.id],
    );

    process.stderr.write(`Password set for ${account.username}.\n`);
    if (account.enabled !== 1) {
      process.stderr.write(
        'Warning: this account is disabled, it will not be able to sign in.\n',
      );
    }
  } finally {
    await db.end();
  }
};

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
