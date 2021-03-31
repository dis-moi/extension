type PagesPath = {
  CONTRIBUTORS: string;
  SUBSCRIPTIONS: string;
  APPEAR: string;
  PROBLEM_POST_APPEARING: string;
  PRIVACY: string;
  HELP: string;
  ABOUT: string;
  CONTACT: string;
  TOS: string;
  UNINSTALL: string;
};

interface Path {
  en: PagesPath;
  fr: PagesPath;
}

export const path: Path = {
  en: {
    CONTRIBUTORS: '/en/guides',
    SUBSCRIPTIONS: '/en/my-subscription',
    APPEAR: '/apparition',
    PROBLEM_POST_APPEARING: '/probleme-apparition-bulles',
    PRIVACY: '/vie-privee',
    HELP: '/aide',
    ABOUT: '/a-propos',
    CONTACT: '/contact',
    TOS: '/cgu',
    UNINSTALL: '/desinstaller'
  },
  fr: {
    CONTRIBUTORS: '/eclaireurs',
    SUBSCRIPTIONS: '/mes-abonnements',
    APPEAR: '/apparition',
    PROBLEM_POST_APPEARING: '/',
    PRIVACY: '/vie-privee',
    HELP: '/aide',
    ABOUT: '/a-propos',
    CONTACT: '/contact',
    TOS: '/cgu',
    UNINSTALL: '/desinstaller'
  }
};
