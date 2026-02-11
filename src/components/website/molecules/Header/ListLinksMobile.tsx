import React from 'react';
import NavMobileItem from '../../atoms/NavMobileItem/NavMobileItem';

export interface Link {
  label: string;
  href?: () => void;
}

interface LinksProps {
  links: Link[];
}

const ListLinksMobile = ({ links }: LinksProps) => {
  return (
    <>
      {links.map((link, i) => (
        <NavMobileItem key={i} onClick={link.href}>
          {link.label}
        </NavMobileItem>
      ))}
    </>
  );
};
export default ListLinksMobile;
