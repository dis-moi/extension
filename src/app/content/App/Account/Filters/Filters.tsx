import React from 'react';
import { useTranslation } from 'react-i18next';
import ContentTitleTop from 'components/organisms/Notification/ContentTitleTop';
import withTitle from 'app/content/hocs/withTitle';

export const Filters = () => {
  const { t } = useTranslation();
  return <ContentTitleTop>{t('common.filters')}</ContentTitleTop>;
};

export default withTitle<{}>('title.filters')(Filters);
