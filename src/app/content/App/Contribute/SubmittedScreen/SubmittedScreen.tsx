import React from 'react';

import {
  Button,
  CenterContainer,
  ContentWrapperBackground
} from 'components/atoms';
import Container from 'components/organisms/Contribute/Container';
import Content from 'components/organisms/Contribute/Content';
import ContentTitle from 'components/organisms/Contribute/ContentTitle';
import Illustration from './Illustration';

export interface ContributionSubmittedScreenProps {
  goBack: () => void;
}

export default ({ goBack }: ContributionSubmittedScreenProps) => (
  <Container>
    <ContentWrapperBackground>
      <Illustration />
      <ContentTitle>Félicitations !</ContentTitle>
      <Content>
        Votre contribution sera publiée d’ici 24h, une confirmation vous sera
        envoyée par email.
      </Content>

      <CenterContainer>
        <Button onClick={goBack}>Retour aux contributions</Button>
      </CenterContainer>
    </ContentWrapperBackground>
  </Container>
);
