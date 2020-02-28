import React from 'react';

import {
  BackgroundButton,
  CenterContainer,
  ContentWrapperBackground
} from 'components/atoms';
import Container from 'components/organisms/Contribute/Container';
import Content from 'components/organisms/Contribute/Content';
import ContentTitle from 'components/organisms/Contribute/ContentTitle';

export interface ContributionSubmittedScreenProps {
  goBack: () => void;
}

export default ({ goBack }: ContributionSubmittedScreenProps) => (
  <Container>
    <ContentWrapperBackground>
      <ContentTitle>Merci pour votre demande.</ContentTitle>
      <Content>
        Elle sera très rapidement transmise au(x) contributeur(s) concerné(s).
        Et vous serez prévenu de la réponse directement par mail.
      </Content>

      <CenterContainer>
        <BackgroundButton onClick={goBack}>
          Retour aux messages
        </BackgroundButton>
      </CenterContainer>
    </ContentWrapperBackground>
  </Container>
);
