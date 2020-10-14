import React from 'react';

import {
  BackgroundButton,
  CenterContainer,
  ContentWrapperBackground,
  Title
} from 'components/atoms';
import Container from 'components/organisms/Contribute/Container';
import Content from 'components/organisms/Contribute/Content';

export interface ContributionSubmittedScreenProps {
  goBack: () => void;
}

export default ({ goBack }: ContributionSubmittedScreenProps) => (
  <Container>
    <ContentWrapperBackground>
      <Title>Merci pour votre demande.</Title>
      <Content>
        Elle sera très rapidement transmise au(x) source(s) concernée(s). Et
        vous serez prévenu de la réponse directement par mail.
      </Content>

      <CenterContainer>
        <BackgroundButton onClick={goBack}>
          Retour aux messages
        </BackgroundButton>
      </CenterContainer>
    </ContentWrapperBackground>
  </Container>
);
