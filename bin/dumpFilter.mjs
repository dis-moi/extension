/**
 * Filtre un dump SQL phpMyAdmin pour en faire une base de développement
 * utilisable.
 *
 * Le dump de production fait 2,7 Go, dont 2,24 pour `rating` (11,6 millions de
 * lignes, dont 90 % de simples affichages de badge) et 414 Mo pour
 * `subscription` (6,2 millions de couples extension – contributeur). Ces deux
 * tables ne sont utiles en entier que pour vérifier les compteurs ; pour tout
 * le reste, un échantillon suffit et charge en quelques secondes au lieu de
 * dizaines de minutes.
 *
 * Le filtre est une fonction pure sur un flux de lignes : il ne connaît ni
 * fichier, ni base, ni identifiants. C'est ce qui le rend testable.
 */

/** Les deux tables de mesure, seules à mériter un plafond. */
export const TABLES_PLAFONNEES = ['rating', 'subscription'];

export const MODES = ['schema', 'sample', 'full'];

const DEBUT_INSERT = /^INSERT INTO `([^`]+)`/;

/**
 * Une ligne de valeurs d'un dump phpMyAdmin : `(1, 'a'),` ou `(1, 'a');`.
 * L'en-tête de l'instruction se termine par `VALUES` et vit sur sa propre
 * ligne, les valeurs suivent une par ligne.
 */
const estLigneDeValeurs = (ligne) => ligne.startsWith('(');

const termineInstruction = (ligne) => /;\s*$/.test(ligne);

/** Transforme `…),` en `…);` pour refermer un INSERT qu'on vient de couper. */
const refermer = (ligne) => ligne.replace(/,\s*$/, ';');

const valider = ({ mode, limit }) => {
  if (!MODES.includes(mode)) {
    throw new Error(
      `Mode de filtrage inconnu : « ${mode} ». Attendu : ${MODES.join(', ')}.`,
    );
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error(
      `Limite invalide : « ${limit} ». Attendu un entier positif ou nul.`,
    );
  }
};

/**
 * @param {Iterable<string> | AsyncIterable<string>} lignes
 * @param {{ mode: string, limit?: number, plafonnees?: string[] }} options
 * @returns {AsyncGenerator<string>}
 */
export async function* filterDump(lignes, options) {
  const mode = options?.mode;
  const limit = options?.limit ?? 20000;
  const plafonnees = options?.plafonnees ?? TABLES_PLAFONNEES;

  valider({ mode, limit });

  if (mode === 'full') {
    for await (const ligne of lignes) yield ligne;
    return;
  }

  // Table dont on traverse les valeurs, et son plafond courant.
  let table = null;
  let plafond = 0;

  /**
   * Lignes déjà émises par table, pour toute la durée du filtrage.
   *
   * phpMyAdmin ne produit pas une instruction par table mais une par paquet :
   * le dump de production porte 46 750 `INSERT INTO `rating`` d'environ 248
   * lignes. Un compteur remis à zéro à chaque instruction ne plafonnerait
   * rien.
   */
  const emisesParTable = new Map();

  for await (const ligne of lignes) {
    const debut = DEBUT_INSERT.exec(ligne);

    if (debut) {
      table = debut[1];
      plafond =
        mode === 'schema' ? 0 : plafonnees.includes(table) ? limit : Infinity;

      // Un en-tête sans aucune ligne à suivre laisserait une instruction
      // incomplète : on le jette avec ses valeurs. C'est le cas du mode
      // « schema », et celui d'une table dont le plafond est déjà atteint.
      if ((emisesParTable.get(table) ?? 0) < plafond) yield ligne;

      // phpMyAdmin peut, selon ses réglages, poser les premières valeurs sur
      // la même ligne que l'en-tête. Dans ce cas la ligne porte déjà sa
      // donnée et on ne sait pas la découper sans parser le SQL : on la laisse
      // telle quelle et on considère l'instruction consommée.
      if (termineInstruction(ligne)) table = null;
      continue;
    }

    if (table !== null && estLigneDeValeurs(ligne)) {
      const emises = emisesParTable.get(table) ?? 0;

      if (termineInstruction(ligne)) {
        if (emises < plafond) {
          yield ligne;
          emisesParTable.set(table, emises + 1);
        }
        table = null;
        continue;
      }

      if (emises + 1 < plafond) {
        yield ligne;
        emisesParTable.set(table, emises + 1);
        continue;
      }

      if (emises + 1 === plafond) {
        // Dernière ligne retenue : elle doit refermer l'instruction, sinon
        // MySQL attend la suite et échoue sur l'instruction d'après.
        yield refermer(ligne);
        emisesParTable.set(table, emises + 1);
      }

      // Au-delà du plafond, on jette en silence jusqu'à la fin du bloc.
      continue;
    }

    if (table !== null && !estLigneDeValeurs(ligne)) {
      // Une ligne qui n'est ni l'en-tête ni une valeur clôt le bloc.
      table = null;
    }

    yield ligne;
  }
}
