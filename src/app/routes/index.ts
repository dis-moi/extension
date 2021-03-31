type PagesPath = {
  CONTRIBUTORS: string;
  SUBSCRIPTIONS: string;
};

interface Path {
  en: PagesPath;
  fr: PagesPath;
}

export const path: Path = {
  en: {
    CONTRIBUTORS: '/en/guides',
    SUBSCRIPTIONS: '/en/my-subscription'
  },
  fr: {
    CONTRIBUTORS: '/eclaireurs',
    SUBSCRIPTIONS: '/mes-abonnements'
  }
};
