import React from 'react';
import { List, ExternalLink, Anchor } from 'components/atoms';
import withTitle from 'app/hocs/withTitle';
import Container from './Container';
import ContentTitle from './ContentTitle';
import Content from '../Account/About/Content';
import { WEBSITE_DOMAIN } from 'app/lmem';

export const Help = () => (
  <Container>
    <ContentTitle>Questions fréquentes</ContentTitle>
    <List>
      <li>
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/apparition/`}>
          Sur quelles pages apparaissent les notices ?
        </ExternalLink>
      </li>
      <li>
        <ExternalLink
          href={`https://${WEBSITE_DOMAIN}/probleme-apparition-bulles/`}
        >
          J’ai beau testé, les notices n’apparaissent pas
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/vie-privee/`}>
          Quelles sont les données utilisées ?
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/aide/`}>
          Autres questions fréquentes
        </ExternalLink>
      </li>
    </List>

    <ContentTitle>Contacter le support de Dismoi</ContentTitle>
    <Content>
      Merci de nous écrire à{' '}
      <Anchor href="mailto:support@bulles.fr">support@bulles.fr</Anchor>.
    </Content>
  </Container>
);

export default withTitle<{}>('Aide')(Help);
