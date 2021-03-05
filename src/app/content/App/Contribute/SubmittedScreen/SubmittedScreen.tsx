import React from 'react';

import { useTranslation } from 'react-i18next';
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

export default ({ goBack }: ContributionSubmittedScreenProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <ContentWrapperBackground>
        <Illustration />
        <ContentTitle>{t('common.congratulations')}</ContentTitle>
        <Content>{t('view.submitted.confirm')}</Content>
        <CenterContainer>
          <Button onClick={goBack}>{t('action.go_back.submissions')}</Button>
        </CenterContainer>
      </ContentWrapperBackground>
    </Container>
  );
};
