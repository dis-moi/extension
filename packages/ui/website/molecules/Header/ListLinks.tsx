import React from 'react';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';

export interface Link {
  label: string;
  href?: () => void;
}

interface LinksProps {
  links: Link[];
}

const ListLinks = ({ links }: LinksProps) => {
  return (
    <>
      {links.map((link, i) => (
        <NavDesktopItem key={i} onClick={link.href}>
          {link.label}
        </NavDesktopItem>
      ))}
    </>
  );
};
export default ListLinks;
