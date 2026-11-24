import { Link } from '@dismoi/ui/website/molecules/Header/ListLinks';
import { ContentLocale } from './content';

export interface Menus {
  header: Link[];
  footer: Link[];
}

export const APP_ROUTES: Record<ContentLocale, string[]> = {
  fr: ['/fr/profils', '/fr/mes-abonnements'],
  en: ['/en/guides', '/en/my-subscriptions'],
};

// Labels and paths written out rather than taken from i18next: the menus
// render on the server, where a translation still loading would show the raw
// key in place of an address.
const menus: Record<ContentLocale, Menus> = {
  fr: {
    header: [
      { label: 'Les contributors', href: '/fr/profils' },
      { label: 'Contribuer', href: '/fr/contribuer' },
      { label: 'Aide', href: '/fr/aide' },
    ],
    footer: [
      { label: 'Contact', href: '/fr/contact' },
      { label: 'À propos', href: '/fr/a-propos' },
      { label: 'Mentions légales', href: '/fr/mentions-legales' },
      { label: 'Vie privée', href: '/fr/privacy' },
      { label: 'CGU', href: '/fr/tcu' },
      { label: 'Espace Presse', href: '/fr/espace-presse' },
    ],
  },
  en: {
    header: [
      { label: 'Guides', href: '/en/guides' },
      { label: 'Creating a post', href: '/en/creating-a-post' },
    ],
    footer: [
      { label: 'Contact', href: '/en/contact' },
      { label: 'About us', href: '/en/about' },
      { label: 'Legal information', href: '/en/legal-information' },
      { label: 'Privacy', href: '/en/privacy' },
      { label: 'Terms of use', href: '/en/tcu' },
      { label: 'Press room', href: '/en/press-room' },
    ],
  },
};

export const getMenus = (locale: ContentLocale): Menus => menus[locale];
