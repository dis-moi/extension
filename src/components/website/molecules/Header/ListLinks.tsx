import React from 'react';
import NavDesktopItem from '../../atoms/NavDesktopItem/NavDesktopItem';
import { getFacet } from '../../../../libs/facets/getFacet';

export interface Link {
  label: string;
  href?: () => void;
}

interface LinksProps {
  links: Link[];
}

const ListLinks = ({ links }: LinksProps) => {
  const facet = getFacet();
  const lmel = facet === 'lmel';
  return (
    <>
      {links.map((link, i) =>
        !(lmel && link.label === 'Espace Presse') ? (
          <NavDesktopItem key={i} onClick={link.href}>
            {link.label}
          </NavDesktopItem>
        ) : (
          ''
        )
      )}
    </>
  );
};
export default ListLinks;
