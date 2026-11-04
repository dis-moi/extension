import React from 'react';

import { useTranslation } from 'react-i18next';
import {
  Button,
  CenterContainer,
  ContentWrapperBackground,
} from '@dismoi/ui/atoms';
import Container from '@dismoi/ui/organisms/Contribute/Container';
import Content from '@dismoi/ui/organisms/Contribute/Content';
import ContentTitle from '@dismoi/ui/organisms/Contribute/ContentTitle';
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
