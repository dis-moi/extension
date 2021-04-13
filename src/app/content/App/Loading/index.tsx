import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingBig from 'components/atoms/icons/LoadingBig';
import Container from './Container';

export const Loading = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <LoadingBig />
      {t('common.loading')}
    </Container>
  );
};

export default Loading;
