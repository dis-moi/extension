import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorProps {
  message?: string;
}

export default ({ message }: ErrorProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{message || t('profiles:error.common.title')}</h1>
      <p>{t('profiles:error.common.message')}</p>
    </div>
  );
};
