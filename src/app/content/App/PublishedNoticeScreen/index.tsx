import React from 'react';

import Notification from 'components/organisms/Notification';
import { Button, CenterContainer, ExternalLink } from 'components/atoms';
import BorderButton from 'components/atoms/Buttons/BorderButton';
import Container from './Container';
import Content from './Content';
import ContentTitle from './ContentTitle';
import Illustration from './Illustration';

export default () => (
  <Notification close={close}>
    <Container>
      <Illustration />
      <ContentTitle>Félicitations !</ContentTitle>
      <Content>
        Votre bulle sera publiée d’ici 24h sur :
        <ExternalLink>www.ouisncf.com</ExternalLink>
      </Content>
      <BorderButton>Voir la Bulle</BorderButton>

      <CenterContainer>
        <Button>Retour aux Bulles</Button>
      </CenterContainer>
    </Container>
  </Notification>
);
