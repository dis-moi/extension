import React from 'react';
import { getFacet } from '../../../../libs/facets/getFacet';
import NavMobileItem from '../../atoms/NavMobileItem/NavMobileItem';

export interface Link {
  label: string;
  href?: () => void;
}

interface LinksProps {
  links: Link[];
}

const ListLinksMobile = ({ links }: LinksProps) => {
  const facet = getFacet();
  const lmel = facet === 'lmel';
  return (
    <>
      {links.map((link, i) =>
        !(lmel && link.label === 'Espace Presse') ? (
          <NavMobileItem key={i} onClick={link.href}>
            {link.label}
          </NavMobileItem>
        ) : (
          ''
        )
      )}
    </>
  );
};
export default ListLinksMobile;
