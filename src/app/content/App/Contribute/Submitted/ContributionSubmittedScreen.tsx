import React from 'react';

import { Button, CenterContainer, ExternalLink } from 'components/atoms';
import Container from './Container';
import Content from './Content';
import ContentTitle from './ContentTitle';
import Illustration from './Illustration';
import { Contribution } from 'app/lmem/notice';

export interface ContributionSubmittedScreenProps {
  contribution: Contribution;
  close: () => void;
  goBack: () => void;
}

export default ({ contribution, goBack }: ContributionSubmittedScreenProps) => (
  <Container>
    <Illustration />
    <ContentTitle>Félicitations !</ContentTitle>
    <Content>
      Votre bulle sera publiée d’ici 24h sur :
      <ExternalLink>{contribution.url}</ExternalLink>
    </Content>

    <CenterContainer>
      <Button onClick={goBack}>Retour aux Bulles</Button>
    </CenterContainer>
  </Container>
);
