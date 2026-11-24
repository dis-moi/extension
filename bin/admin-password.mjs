#!/usr/bin/env node
/**
 * Pose le mot de passe d'un compte d'administration.
 *
 *   yarn admin:motdepasse jarfaoui
 *
 * Le mot de passe est lu sur l'entrée standard, sans écho, et n'apparaît donc
 * ni dans la ligne de commande ni dans l'historique du shell.
 *
 * L'empreinte produite est du bcrypt au coût 13, réécrite au préfixe `$2y$` :
 * c'est exactement la forme que FOSUserBundle a posée sur les 26 comptes
 * existants, de sorte que le backend PHP et la nouvelle administration
 * acceptent tous deux le mot de passe aussi longtemps que les deux coexistent.
 */
import { createInterface } from 'node:readline';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const COUT = 13;

const connexion = () =>
  mysql.createConnection({
    host: process.env.DISMOI_DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DISMOI_DB_PORT ?? 3310),
    database: process.env.DISMOI_DB_NAME ?? 'dismoi',
    user: process.env.DISMOI_DB_USER ?? 'root',
    password: process.env.DISMOI_DB_PASSWORD ?? 'dev',
  });

/**
 * Lit tout le flux d'entrée et en rend la première ligne.
 *
 * C'est le chemin hors terminal, qui permet
 * `echo … | yarn admin:motdepasse alice` depuis un script.
 */
const lireLeFlux = async () => {
  const morceaux = [];
  for await (const morceau of process.stdin) morceaux.push(morceau);

  const texte = Buffer.concat(morceaux).toString('utf8');
  const premiere = texte.split('\n')[0] ?? '';
  return premiere.replace(/\r$/, '');
};

/** Lit une ligne au terminal, sans l'afficher. */
const lireSansEcho = (invite) =>
  new Promise((resoudre) => {
    process.stderr.write(invite);

    const lecteur = createInterface({
      input: process.stdin,
      output: process.stderr,
      terminal: true,
    });
    // `_writeToOutput` neutralisé : l'invite s'affiche, la saisie non.
    lecteur._writeToOutput = () => {};

    lecteur.question('', (ligne) => {
      lecteur.close();
      process.stderr.write('\n');
      resoudre(ligne);
    });
  });

/** Demande le mot de passe, au terminal ou sur l'entrée standard. */
const demanderLeMotDePasse = async (invite) =>
  process.stdin.isTTY ? lireSansEcho(invite) : lireLeFlux();

const main = async () => {
  const identifiant = process.argv[2];
  if (identifiant === undefined) {
    throw new Error(
      'Usage : yarn admin:motdepasse <identifiant ou adresse>\n' +
        "L'identifiant est celui de la table fos_user.",
    );
  }

  const canonique = identifiant.trim().toLowerCase();
  const bd = await connexion();

  try {
    const [comptes] = await bd.execute(
      `SELECT id, username, email, enabled FROM fos_user
        WHERE username_canonical = ? OR email_canonical = ?`,
      [canonique, canonique],
    );

    const compte = comptes[0];
    if (compte === undefined) {
      const [tous] = await bd.execute(
        'SELECT username FROM fos_user ORDER BY username',
      );
      throw new Error(
        `Aucun compte « ${identifiant} ».\n` +
          `Comptes existants : ${tous.map((c) => c.username).join(', ')}`,
      );
    }

    process.stderr.write(
      `Compte ${compte.username} <${compte.email}>` +
        (compte.enabled === 1 ? '' : ' — DÉSACTIVÉ') +
        '\n',
    );

    const motDePasse = await demanderLeMotDePasse('Nouveau mot de passe : ');
    if (motDePasse.length < 12) {
      throw new Error('Mot de passe trop court : douze caractères au moins.');
    }

    const confirmation = process.stdin.isTTY
      ? await lireSansEcho('Confirmer : ')
      : motDePasse;
    if (confirmation !== motDePasse) {
      throw new Error('Les deux saisies diffèrent.');
    }

    const empreinte = (await bcrypt.hash(motDePasse, COUT)).replace(
      /^\$2[aby]\$/,
      '$2y$',
    );

    await bd.execute(
      'UPDATE fos_user SET password = ?, salt = NULL WHERE id = ?',
      [empreinte, compte.id],
    );

    process.stderr.write(`Mot de passe posé pour ${compte.username}.\n`);
    if (compte.enabled !== 1) {
      process.stderr.write(
        'Attention : ce compte est désactivé, il ne pourra pas se connecter.\n',
      );
    }
  } finally {
    await bd.end();
  }
};

main().catch((erreur) => {
  process.stderr.write(`${erreur.message}\n`);
  process.exitCode = 1;
});
