import React from 'react';

import { BackgroundButton, CenterContainer } from 'components/atoms';
import Container from './Container';
import Content from './Content';
import ContentTitle from './ContentTitle';

export interface ContributionSubmittedScreenProps {
  goBack: () => void;
}

export default ({ goBack }: ContributionSubmittedScreenProps) => (
  <Container>
    <ContentTitle>Merci pour votre demande.</ContentTitle>
    <Content>
      Elle sera très rapidement transmise au(x) contributeur(s) concerné(s). Et
      vous serez prévenu de la réponse directement par mail.
    </Content>

    <CenterContainer>
      <BackgroundButton onClick={goBack}>Retour aux messages</BackgroundButton>
    </CenterContainer>
  </Container>
);
