import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ExternalLink, OpenButton } from 'components/atoms';
import withTitle from 'app/content/hocs/withTitle';
import { WEBSITE_DOMAIN } from 'libs/lmem';
import Account from './Account';

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

export default withTitle<MenuProps>('title.options')(Menu);
