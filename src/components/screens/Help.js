import React from 'react';
import { Notification } from '../organisms';
import { Container, ContentTitle } from '../atoms/Help';
import { 
  BorderButton, 
  CenterContainer, 
  List, 
  ExternalLink
} from '../atoms';
import { Textarea, Form } from '../atoms/Forms';

export default () => (
  <Notification title="Aide">
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

      <ContentTitle>Contacter le support de Bulles</ContentTitle>

      <Form>
        <Textarea placeholder="Écrire votre message ici" required />

        <CenterContainer>
          <BorderButton>Envoyer</BorderButton>
        </CenterContainer>
      </Form>

    </Container>
  </Notification>
);
