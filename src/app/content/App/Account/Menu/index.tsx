import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { OpenButton } from 'components/atoms';
import withTitle from 'app/hocs/withTitle';
import Account from './Account';

type MenuProps = RouteComponentProps;

export const Menu = ({ match }: MenuProps) => (
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
);

export default withTitle<MenuProps>('Account')(Menu);
