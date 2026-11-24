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

// not-found.tsx serves both languages but does not receive the route
// parameters, and has to stay a server component: a client boundary would
// lose the server rendering, and a visitor without JavaScript would read
// nothing.
export const LOCALE_HEADER = 'x-dismoi-locale';

export const localeFromPathname = (pathname: string): ContentLocale =>
  pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'fr';

// The value comes from a request: validated here, not assumed well formed
// because we are the ones who set it.
export const localeFromHeader = (value: string | null): ContentLocale =>
  value === 'en' ? 'en' : 'fr';

const contents: Record<ContentLocale, Omit<NotFoundContent, 'locale'>> = {
  fr: {
    title: 'Page introuvable',
    intro: 'Cette address ne correspond à aucune page.',
    links: [
      { label: 'Les contributors', href: '/fr/profils' },
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
