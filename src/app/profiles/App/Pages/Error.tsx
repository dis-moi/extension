import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('error.common.title')}</h1>
      <p>{t('error.common.message')}</p>
    </div>
  );
};
