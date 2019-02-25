import React from 'react';
import { NotificationContentTitle } from '../../../atoms';
import { Notification } from '../../../organisms';

export default ({ close }) => (
  <Notification title="Mes Filtres" close={close}>
    <NotificationContentTitle>Mes filtres</NotificationContentTitle>
  </Notification>
);
