import { loadEnv } from 'vite';

/**
 * Variables d'environnement injectées dans le bundle à la compilation.
 * Une variable absente de cette liste n'est jamais exposée au code de
 * l'extension, même si elle est présente dans un fichier `.env`.
 */
export const INJECTED_ENV_VARS = [
  'WEBSITE_URL',
  'SENTRY_DSN',
  'BACKEND_ORIGIN',
  'UNINSTALL_ORIGIN',
  'REFRESH_MC_INTERVAL',
  'REFRESH_CONTRIBUTORS_INTERVAL',
  'TRACKING_BACKEND',
  'PLAUSIBLE_DOMAIN',
  'PLAUSIBLE_API_URL',
  'SENTRY_ENABLED',
  'PLATFORM',
  'CHROME_EXTENSION_ID',
  'FIREFOX_EXTENSION_ID',
  'CHROME_STORE_URL',
  'FIREFOX_STORE_URL',
  'PROFILES_ORIGIN',
  'ACCESSIBLE_CONTRIBUTORS_IDS',
  'PRESELECTED_CONTRIBUTORS_IDS',
] as const;

export type InjectedEnvVar = (typeof INJECTED_ENV_VARS)[number];

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
