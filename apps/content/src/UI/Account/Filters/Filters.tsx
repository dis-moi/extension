import React from 'react';
import { useTranslation } from 'react-i18next';
import ContentTitleTop from 'libs/components/organisms/Notification/ContentTitleTop';
import withTitle from 'apps/profiles/utils/hocs/withTitle';

export const Filters = () => {
  const { t } = useTranslation();
  return <ContentTitleTop>{t('common.filters')}</ContentTitleTop>;
};

export default withTitle<{}>('title.filters')(Filters);
