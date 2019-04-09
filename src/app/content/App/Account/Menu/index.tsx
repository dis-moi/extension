import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Notification from 'components/organisms/Notification';
import { OpenButton } from 'components/atoms';
import Account from './Account';

interface OwnProps {
  close?: () => void;
}
type Props = OwnProps & RouteComponentProps;
export const Menu = ({ match, close }: Props) => (
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

export default Menu;
