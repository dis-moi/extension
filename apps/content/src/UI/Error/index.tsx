import React from 'react';
import { useTranslation } from 'react-i18next';
import { history } from '../../store';
import Container from './Container';
import ContentTitle from './ContentTitle';
import Content from './Content';
import BackgroundButton from 'src/components/atoms/Button/BackgroundButton';
import Illustration from './Illustration';

export default () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Illustration />
      <ContentTitle>{t('error.common.title')}</ContentTitle>
      <Content>{t('error.common.message')}</Content>
      <BackgroundButton onClick={history.goBack}>
        {t('action.go_back.back')}
      </BackgroundButton>
    </Container>
  );
};
