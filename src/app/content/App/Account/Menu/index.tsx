import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { OpenButton } from 'components/atoms';
import Account from './Account';
import ScreenProps, { useUITitleEffect } from '../../../ScreenProps';

type MenuProps = ScreenProps & RouteComponentProps;

export const Menu = ({ match, ...props }: MenuProps) => {
  useUITitleEffect(props)('Account');

  return (
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
};

export default Menu;
