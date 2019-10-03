import React from 'react';

import { Button, CenterContainer } from 'components/atoms';
import Container from './Container';
import Content from './Content';
import ContentTitle from './ContentTitle';
import Illustration from './Illustration';

export interface ContributionSubmittedScreenProps {
  goBack: () => void;
}

export default ({ goBack }: ContributionSubmittedScreenProps) => (
  <Container>
    <Illustration />
    <ContentTitle>Félicitations !</ContentTitle>
    <Content>
      Votre bulle sera publiée d’ici 24h, une confirmation vous sera envoyée par
      email.
    </Content>

    <CenterContainer>
      <Button onClick={goBack}>Retour aux Bulles</Button>
    </CenterContainer>
  </Container>
);
