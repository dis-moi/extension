import React from 'react';
import { useTranslation } from 'react-i18next';

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

export default ({ goBack }: ContributionSubmittedScreenProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <ContentWrapperBackground>
        <Title>{t('view.confirmation.thanks')}</Title>
        <Content>{t('view.confirmation.message')}</Content>

        <CenterContainer>
          <BackgroundButton onClick={goBack}>
            {t('action.go_back.messages')}
          </BackgroundButton>
        </CenterContainer>
      </ContentWrapperBackground>
    </Container>
  );
};
