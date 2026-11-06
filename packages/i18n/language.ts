/**
 * Le vocabulaire des langues, isolé de l'initialisation d'i18next.
 *
 * `date.ts` et `packages/domain` n'ont besoin que de ces trois valeurs. Les
 * lire depuis `./index` créait un cycle — index → format → date → index — dont
 * l'issue dépendait du module chargé en premier : en entrant par `format.ts`,
 * `options.interpolation.format` valait `undefined` et i18next n'appliquait
 * plus aucun formatage de date.
 */
export type SupportedLanguage = 'fr' | 'en' | 'br';

export const fallbackLng: SupportedLanguage = 'en';

export const defaultLng = 'fr' as SupportedLanguage;
