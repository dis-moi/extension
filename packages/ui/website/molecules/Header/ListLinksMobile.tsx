import React from 'react';
import NavMobileItem from '../../atoms/NavMobileItem/NavMobileItem';
import { Link } from './ListLinks';

interface LinksProps {
  links: Link[];
}

const ListLinksMobile = ({ links }: LinksProps) => {
  return (
    <>
      {links.map((link) => (
        <NavMobileItem key={link.href} href={link.href}>
          {link.label}
        </NavMobileItem>
      ))}
    </>
  );
};
export default ListLinksMobile;
