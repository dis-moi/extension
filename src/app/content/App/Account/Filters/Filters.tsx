import React from 'react';
import ContentTitleTop from 'components/organisms/Notification/ContentTitleTop';
import withTitle from 'app/hocs/withTitle';

interface Props {}

export const Filters = (props: Props) => (
  <ContentTitleTop>Mes filtres</ContentTitleTop>
);

export default withTitle<Props>('Mes Filtres')(Filters);
