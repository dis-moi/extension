/**
 * Analyse les arguments du chargement de base.
 *
 * Isolé du script qui lit le fichier et écrit sur la sortie standard, pour que
 * les règles — défauts, formes acceptées, refus — soient vérifiables sans
 * toucher ni au disque ni à une base.
 */
import { MODES } from './dumpFilter.mjs';

const DEFAUTS = { mode: 'sample', limit: 20000 };

const exigerValeur = (nom, valeur) => {
  if (valeur === undefined || valeur.startsWith('--')) {
    throw new Error(`L'argument ${nom} attend une valeur.`);
  }
  return valeur;
};

/**
 * @param {string[]} argv arguments, sans le binaire ni le script
 * @param {Record<string, string | undefined>} env
 * @returns {{ mode: string, limit: number, dump: string }}
 */
export const lireOptions = (argv, env = {}) => {
  const options = { ...DEFAUTS, dump: env.DISMOI_DUMP };

  for (let i = 0; i < argv.length; i += 1) {
    const separateur = argv[i].indexOf('=');
    const nom = separateur === -1 ? argv[i] : argv[i].slice(0, separateur);
    const collee =
      separateur === -1 ? undefined : argv[i].slice(separateur + 1);
    const valeur = collee ?? argv[i + 1];
    const avance = collee === undefined ? 1 : 0;

    if (nom === '--mode') {
      options.mode = exigerValeur(nom, valeur);
      i += avance;
    } else if (nom === '--limit') {
      const brut = exigerValeur(nom, valeur);
      const nombre = Number(brut);
      if (!Number.isInteger(nombre) || nombre < 0) {
        throw new Error(
          `Limite invalide : « ${brut} ». Attendu un entier positif ou nul.`,
        );
      }
      options.limit = nombre;
      i += avance;
    } else if (nom === '--dump') {
      options.dump = exigerValeur(nom, valeur);
      i += avance;
    } else {
      throw new Error(
        `Argument inconnu : « ${argv[i]} ». Attendus : --mode, --limit, --dump.`,
      );
    }
  }

  if (!MODES.includes(options.mode)) {
    throw new Error(
      `Mode inconnu : « ${options.mode} ». Attendu : ${MODES.join(', ')}.`,
    );
  }

  if (!options.dump) {
    throw new Error(
      'Chemin du dump absent. Passe --dump <fichier> ou définis DISMOI_DUMP.',
    );
  }

  return options;
};
