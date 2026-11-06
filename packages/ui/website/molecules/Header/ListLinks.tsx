import React from 'react';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';

export interface Link {
  label: string;
  href: string;
}

interface LinksProps {
  links: Link[];
}

const ListLinks = ({ links }: LinksProps) => {
  return (
    <>
      {links.map((link) => (
        <NavDesktopItem key={link.href} href={link.href}>
          {link.label}
        </NavDesktopItem>
      ))}
    </>
  );
};
export default ListLinks;
