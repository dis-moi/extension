import React from 'react';
import { useTranslation } from 'react-i18next';
import { history } from '../../store';
import Container from './Container';
import ContentTitle from './ContentTitle';
import Content from './Content';
import Illustration from './Illustration';
import BackgroundButton from 'components/atoms/Button/BackgroundButton';

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
