import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('profiles:error.common.title')}</h1>
      <p>{t('profiles:error.common.message')}</p>
    </div>
  );
};
