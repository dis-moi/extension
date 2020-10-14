import React from 'react';
import styled from 'styled-components';
import { ExternalLink, Paragraph, Title2 } from 'components/atoms';
import SidebarBox from './SidebarBox';
import { WEBSITE_DOMAIN } from 'app/lmem';

const Title = styled(Title2)`
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.textColor};
`;

export default () => (
  <SidebarBox>
    <Title as="h3">DisMoi ne ralentit pas votre navigateur</Title>
    <Paragraph>
      Contrairement à d’autres extensions, DisMoi ne ralentit pas votre
      navigateur.
    </Paragraph>
    <ExternalLink href={`https://${WEBSITE_DOMAIN}/vitesse-navigation/`}>
      Plus de détails
    </ExternalLink>
  </SidebarBox>
);
