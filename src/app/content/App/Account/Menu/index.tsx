import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ExternalLink, OpenButton } from 'components/atoms';
import withTitle from 'app/hocs/withTitle';
import Account from './Account';
import { WEBSITE_DOMAIN } from 'app/lmem';

type MenuProps = RouteComponentProps;

export const Menu = ({ match }: MenuProps) => {
  const { t } = useTranslation();
  return (
    <Account>
      <ExternalLink href={`http://${WEBSITE_DOMAIN}/vie-privee`}>
        {t('menu.my_account')}
        <OpenButton />
      </ExternalLink>
      <Link to={`${match.url}/about`}>
        {t('menu.about')}
        <OpenButton />
      </Link>
    </Account>
  );
};

export default withTitle<MenuProps>('Options')(Menu);
