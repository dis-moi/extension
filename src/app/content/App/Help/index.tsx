import React from 'react';
import { List, ExternalLink, Anchor } from 'components/atoms';
import withTitle from 'app/hocs/withTitle';
import Container from './Container';
import ContentTitle from './ContentTitle';
import Content from '../Account/About/Content';

export const Help = () => (
  <Container>
    <ContentTitle>Questions fréquentes</ContentTitle>
    <List>
      <li>
        <ExternalLink href="https://www.bulles.fr/apparition/">
          Sur quelles pages apparaissent les notices ?
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://www.bulles.fr/napparait-pas/">
          J’ai beau testé, les notices n’apparaissent pas
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://www.bulles.fr/vie-privee/">
          Quelles sont les données utilisées ?
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://www.bulles.fr/faq/">
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
