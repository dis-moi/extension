import type { ContentLocale } from './content';

export interface NotFoundLink {
  label: string;
  href: string;
}

export interface NotFoundContent {
  locale: ContentLocale;
  title: string;
  intro: string;
  links: NotFoundLink[];
}

/**
 * En-tête par lequel le middleware transmet la langue du chemin demandé.
 *
 * `not-found.tsx` sert les deux langues mais ne reçoit pas les paramètres de
 * la route, et il doit rester un composant serveur : une frontière client y
 * perd le rendu serveur — le corps de la page n'arrive alors plus dans le
 * HTML, et un visiteur sans JavaScript ne lit rien.
 */
export const LOCALE_HEADER = 'x-dismoi-locale';

export const localeFromPathname = (pathname: string): ContentLocale =>
  pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'fr';

/**
 * La valeur de l'en-tête vient d'une requête : elle est validée ici, et non
 * supposée conforme parce que c'est nous qui l'avons posée.
 */
export const localeFromHeader = (value: string | null): ContentLocale =>
  value === 'en' ? 'en' : 'fr';

const contents: Record<ContentLocale, Omit<NotFoundContent, 'locale'>> = {
  fr: {
    title: 'Page introuvable',
    intro: 'Cette adresse ne correspond à aucune page.',
    links: [
      { label: 'Les contributeurs', href: '/fr/profils' },
      { label: 'L’aide', href: '/fr/aide' },
    ],
  },
  en: {
    title: 'Page not found',
    intro: 'This address does not match any page.',
    links: [
      { label: 'The contributors', href: '/en/guides' },
      { label: 'Help', href: '/fr/aide' },
    ],
  },
};

export const notFoundContent = (locale: ContentLocale): NotFoundContent => ({
  locale,
  ...contents[locale],
});
