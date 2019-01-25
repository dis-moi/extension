import React from 'react';

import { Notification } from '../../organisms';
import { Container, Content, ContentTitle } from '../../atoms/About';
import { ExternalLink } from '../../atoms';

export default () => (
  <Notification title="À propos">
    <Container>
      <ContentTitle>Le Même En Mieux V1.1.0</ContentTitle>
      <Content>
        Bulles vous permet de lire et poster des messages directement sur toutes les pages du web.
        Chacun reçoit ainsi les messages de ses amis, média et experts préférés au moment où il en besoin.
      </Content>

      <Content>
        Vous avez installé le compagnon Bulles le vendredi 7 décembre 2018.
      </Content>

      <nav>
        <ExternalLink href="_#">Contact</ExternalLink>
        &nbsp;
        -
        &nbsp;
        <ExternalLink href="_#">Désinstaller</ExternalLink>
      </nav>
    </Container>
  </Notification>
);
