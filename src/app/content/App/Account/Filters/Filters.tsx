import React from 'react';
import ContentTitleTop from 'components/organisms/Notification/ContentTitleTop';
import withTitle from 'app/hocs/withTitle';

export const Filters = () => <ContentTitleTop>Mes filtres</ContentTitleTop>;

export default withTitle<{}>('Mes Filtres')(Filters);
