import React from 'react';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';
import { useTranslation } from 'react-i18next';

export type Link = {
  label: string;
  href: string;
};

interface LinksProps {
  links: Link[];
}

const ListLinks = ({ links }: LinksProps) => {
  const { t } = useTranslation('website');
  return (
    <>
      {links.map((link, i) => (
        <NavDesktopItem key={i} href={t('links.' + link.href)}>
          {link.label}
        </NavDesktopItem>
      ))}
    </>
  );
};
export default ListLinks;
