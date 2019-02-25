import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../../../organisms';
import { Account, OpenButton } from '../../../atoms';

export default ({ match, close }) => (
  <Notification title="Account" close={close}>
    <Account>
      <Link to={`${match.url}/data`}>
        Mes données
        <OpenButton />
      </Link>
      <Link to={`${match.url}/contributions`}>
        Mes contributions
        <OpenButton />
      </Link>
      <Link to={`${match.url}/filters`}>
        Mes filtres
        <OpenButton />
      </Link>
      <Link to={`${match.url}/about`}>
        À propos
        <OpenButton />
      </Link>
    </Account>
  </Notification>
);