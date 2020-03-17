import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ExternalLink, OpenButton } from 'components/atoms';
import withTitle from 'app/hocs/withTitle';
import Account from './Account';
import { WEBSITE_DOMAIN } from 'app/lmem';

type MenuProps = RouteComponentProps;

export const Menu = ({ match }: MenuProps) => (
  <Account>
    <ExternalLink href={`http://${WEBSITE_DOMAIN}/vie-privee`}>
      Mes données
      <OpenButton />
    </ExternalLink>
    <Link to={`${match.url}/about`}>
      À propos
      <OpenButton />
    </Link>
  </Account>
);

export default withTitle<MenuProps>('Options')(Menu);
