import React from 'react';
import { ExternalLink, List, Title2 } from 'components/atoms';
import SidebarBox from './SidebarBox';
import { WEBSITE_DOMAIN } from 'app/lmem';

export default () => (
  <SidebarBox>
    <Title2 as="h3">DisMoi respecte votre vie privée</Title2>
    <List>
      <li>
        Nous ne collectons ni revendons{' '}
        <strong>aucune donnée personnelle</strong>
      </li>
      <li>
        Nous ne faisons <strong>aucun profilage</strong>
      </li>
    </List>

    <ExternalLink href={`https://${WEBSITE_DOMAIN}/vie-privee/`}>
      En savoir plus
    </ExternalLink>
  </SidebarBox>
);
