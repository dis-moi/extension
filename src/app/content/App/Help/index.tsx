import React from 'react';
import {
  BorderButton,
  CenterContainer,
  List,
  ExternalLink
} from 'components/atoms';
import { Textarea } from 'components/atoms/Forms';
import Container from './Container';
import ContentTitle from './ContentTitle';
import ScreenProps, { useUITitleEffect } from '../../ScreenProps';
import withConnect from './withConnect';

interface Props extends ScreenProps {}

export const Help = (props: Props) => {
  useUITitleEffect(props)('Help');

  return (
    <Container>
      <ContentTitle>Questions fréquentes</ContentTitle>
      <List>
        <li>
          <ExternalLink>
            Sur quelles pages apparaissent les notices ?
          </ExternalLink>
        </li>
        <li>
          <ExternalLink>
            J’ai beau testé, les notices n’apparaissent pas
          </ExternalLink>
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
  );
};

export default withConnect(Help);
