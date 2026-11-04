import { loadEnv } from 'vite';
import injectedEnvVars from '../../injected-env-vars.json';

/**
 * Variables d'environnement injectées dans le bundle à la compilation.
 * Une variable absente de cette liste n'est jamais exposée au code, même si
 * elle est présente dans un fichier `.env`.
 *
 * La liste vit dans un JSON à la racine parce que le site Next.js la lit
 * aussi : les deux applications embarquent le même code partagé, donc une
 * variable oubliée d'un côté produirait la même panne silencieuse que celle
 * qui a motivé ce module.
 */
export const INJECTED_ENV_VARS: readonly string[] = injectedEnvVars;

export type InjectedEnvVar = string;

/**
 * Variables sans valeur utilisable desquelles l'extension construite est
 * inerte. La liste est volontairement minimale : on n'y ajoute une variable
 * que lorsque son caractère indispensable est établi.
 */
export const REQUIRED_ENV_VARS: readonly InjectedEnvVar[] = ['BACKEND_ORIGIN'];

/**
 * Résout les variables injectables pour un mode de compilation donné.
 *
 * WXT n'expose au code que les variables préfixées `WXT_` ou `VITE_`, et il
 * cherche les fichiers `.env` dans sa propre racine (`packages/extension`)
 * alors qu'ils vivent à la racine du dépôt. Les variables de ce projet n'ont
 * aucun de ces préfixes : il faut donc les charger explicitement, sinon elles
 * valent `undefined` dans le bundle et l'extension n'appelle plus le backend.
 *
 * La cascade est celle de Vite : `.env`, `.env.local`, `.env.<mode>`,
 * `.env.<mode>.local`. Une variable déjà définie dans l'environnement du shell
 * (CI, surcharge ponctuelle) a la priorité sur les fichiers.
 */
export const resolveInjectedEnv = (
  mode: string,
  envDir: string,
): Partial<Record<InjectedEnvVar, string>> => {
  const loaded = loadEnv(mode, envDir, '');

  return Object.fromEntries(
    INJECTED_ENV_VARS.filter((name) => loaded[name] !== undefined).map(
      (name) => [name, loaded[name]],
    ),
  );
};

/**
 * Échoue la compilation quand une variable indispensable est absente ou vide.
 *
 * Une valeur vide est aussi nuisible qu'absente : `call.ts` construit ses
 * requêtes par concaténation (`BACKEND_ORIGIN + 'contributors'`), donc une
 * origine vide produit une URL relative à l'extension — des 404 silencieux
 * plutôt qu'une erreur visible. Mieux vaut interrompre la compilation.
 */
export const assertRequiredEnv = (
  env: Partial<Record<InjectedEnvVar, string>>,
  mode: string,
): void => {
  const missing = REQUIRED_ENV_VARS.filter((name) => !env[name]);

  if (missing.length > 0) {
    throw new Error(
      `Variables d'environnement absentes ou vides en mode « ${mode} » : ${missing.join(', ')}. ` +
        `Elles sont attendues à la racine du dépôt (.env, .env.${mode}) ou dans l'environnement du shell.`,
    );
  }
};
