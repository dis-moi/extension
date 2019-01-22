import React from 'react';
import { Notification } from '../organisms';
import { Container, ContentTitle } from '../atoms/Help';
import { BorderButton, CenterContainer, List } from '../atoms';
import { Textarea, Form } from '../atoms/Forms';

export default () => (
  <Notification title="Aide">
    <Container>
      <ContentTitle>Questions fréquentes</ContentTitle>

      <List>
        <li>
          <a href="_#">Sur quelles pages apparaissent les notices ?</a>
        </li>
        <li>
          <a href="_#">J’ai beau testé, les notices n’apparaissent pas</a>
        </li>
        <li>
          <a href="_#">Quelles sont les données utilisées ?</a>
        </li>
        <li>
          <a href="_#">Autres questions fréquentes</a>
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
