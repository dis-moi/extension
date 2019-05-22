import React from 'react';
import ContentTitleTop from 'components/organisms/Notification/ContentTitleTop';
import ScreenProps, { useUITitleEffect } from '../../../ScreenProps';

interface Props extends ScreenProps {}

export default (props: Props) => {
  useUITitleEffect(props)('Mes Filtres');

  return <ContentTitleTop>Mes filtres</ContentTitleTop>;
};
