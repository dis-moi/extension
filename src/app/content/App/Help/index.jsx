import React from 'react';
import Notification from 'components/organisms/Notification';
import {
  BorderButton,
  CenterContainer,
  List,
  ExternalLink
} from 'components/atoms';
import { Textarea } from 'components/atoms/Forms';
import Container from './Container';
import ContentTitle from './ContentTitle';

export default ({ close }) => (
  <Notification title="Aide" close={close}>
    <Container>
      <ContentTitle>Questions fréquentes</ContentTitle>

      <List>
        <li>
          <ExternalLink>Sur quelles pages apparaissent les notices ?</ExternalLink>
        </li>
        <li>
          <ExternalLink>J’ai beau testé, les notices n’apparaissent pas</ExternalLink>
        </li>
        <li>
          <ExternalLink>Quelles sont les données utilisées ?</ExternalLink>
        </li>
        <li>
          <ExternalLink>Autres questions fréquentes</ExternalLink>
        </li>
      </List>

      <ContentTitle>Contacter le support de Le Même En Mieux</ContentTitle>

      <form>
        <Textarea placeholder="Écrire votre message ici" required />

        <CenterContainer>
          <BorderButton>Envoyer</BorderButton>
        </CenterContainer>
      </form>

    </Container>
  </Notification>
);
