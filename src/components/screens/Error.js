import React from 'react';
import {Notification} from '../organisms';

export default ({ location }) => (
  <Notification>
      Aucunes routes ne correspond à
    <code>{location.pathname}</code>
  </Notification>
);
