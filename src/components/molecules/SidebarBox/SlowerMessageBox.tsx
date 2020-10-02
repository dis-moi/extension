import React from 'react';
import { ExternalLink, Paragraph, Title2 } from 'components/atoms';
import SidebarBox from './SidebarBox';
import { WEBSITE_DOMAIN } from 'app/lmem';

export default () => (
  <SidebarBox>
    <Title2 as="h3">DisMoi ne ralentit pas votre navigateur</Title2>
    <Paragraph>
      Contrairement à d’autres extensions, DisMoi ne ralentit pas votre
      navigateur.
    </Paragraph>
    <ExternalLink href={`https://${WEBSITE_DOMAIN}/vitesse-navigation/`}>
      Plus de détails
    </ExternalLink>
  </SidebarBox>
);
