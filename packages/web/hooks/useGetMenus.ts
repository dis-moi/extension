import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { SupportedLanguage } from '@dismoi/i18n';
import { Link } from '@dismoi/ui/website/molecules/Header/ListLinks';

interface GetMenus {
  header: Link[];
  footer: Link[];
}

interface MenuEntry {
  label: string;
  path: string;
}

// Labels and paths are hardcoded per locale instead of using i18next t() because
// i18next initializes asynchronously and isn't ready during SSR/first render,
// which causes raw translation keys (e.g. "links.contact") to appear as URLs.
const menuConfig: Record<
  SupportedLanguage,
  { header: MenuEntry[]; footer: MenuEntry[] }
> = {
  fr: {
    header: [
      { label: 'Les contributeurs', path: '/fr/profils' },
      { label: 'Contribuer', path: '/fr/contribuer' },
      { label: 'Aide', path: '/fr/aide' },
    ],
    footer: [
      { label: 'Contact', path: '/fr/contact' },
      { label: 'À propos', path: '/fr/a-propos' },
      { label: 'Mentions légales', path: '/fr/mentions-legales' },
      { label: 'Vie privée', path: '/fr/privacy' },
      { label: 'CGU', path: '/fr/tcu' },
      { label: 'Espace Presse', path: '/fr/espace-presse' },
    ],
  },
  en: {
    header: [
      { label: 'Guides', path: '/en/guides' },
      { label: 'Creating a post', path: '/en/creating-a-post' },
    ],
    footer: [
      { label: 'Contact', path: '/en/contact' },
      { label: 'About us', path: '/en/about' },
      { label: 'Legal information', path: '/en/legal-information' },
      { label: 'Privacy', path: '/en/privacy' },
      { label: 'Terms of use', path: '/en/tcu' },
      { label: 'Press room', path: '/en/press-room' },
    ],
  },
  br: {
    header: [],
    footer: [],
  },
};

const useGetMenus = (locale: SupportedLanguage): GetMenus => {
  const router = useRouter();
  const config = menuConfig[locale] || menuConfig.fr;

  return useMemo(() => {
    const toLink = ({ label, path }: MenuEntry): Link => ({
      label,
      href: () => {
        router.push(path);
      },
    });

    return {
      header: config.header.map(toLink),
      footer: config.footer.map(toLink),
    };
  }, [locale]);
};

export default useGetMenus;
