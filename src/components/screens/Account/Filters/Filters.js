import React from 'react';
import { ContentTitleTop } from '../../../atoms';
import { Notification } from '../../../organisms';

export default ({ close }) => (
  <Notification title="Mes Filtres" close={close}>
    <ContentTitleTop>Mes filtres</ContentTitleTop>
  </Notification>
);
