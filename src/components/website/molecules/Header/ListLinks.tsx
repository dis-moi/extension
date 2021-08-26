import React from 'react';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';

export type Link = {
  label: string;
  href: string;
};

interface LinksProps {
  links: Link[];
}

const ListLinks = ({ links }: LinksProps) => {
  return (
    <>
      {links.map((link, i) => (
        <NavDesktopItem key={i} href={link.href}>
          {link.label}
        </NavDesktopItem>
      ))}
    </>
  );
};
export default ListLinks;
