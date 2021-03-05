import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from './Container';
import LoadingBig from 'components/atoms/icons/LoadingBig';

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
