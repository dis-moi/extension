import React from 'react';
import { Link } from 'react-router-dom';
import {Notification} from '../../organisms';

export default ({ match }) => (
  <Notification title="Account">
    <Link to={`${match.url}/data`}>Mes données</Link>
    <Link to={`${match.url}/contributions`}>Mes contributions</Link>
    <Link to={`${match.url}/filters`}>Mes filtres</Link>
    <Link to={`${match.url}/privacy`}>Vie Privée</Link>
  </Notification>
);
