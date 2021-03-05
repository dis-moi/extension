import React from 'react';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { ExternalLink, Time } from 'components/atoms';
import withTitle from 'app/hocs/withTitle';
import Title from './Title';
import Content from './Content';
import Container from './Container';
import withConnect from './withConnect';
import { WEBSITE_DOMAIN } from 'app/lmem';

export interface AboutProps {
  installationDate?: Date;
  extensionVersion: string;
}

export const About = ({ installationDate, extensionVersion }: AboutProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>Dismoi V{extensionVersion}</Title>
      <Content>{t('view.about.description')}</Content>

      {installationDate && (
        <Content>
          {t('view.about.install_date')} <Time>{installationDate}</Time>.
        </Content>
      )}

      <nav>
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/aide`}>
          {t('menu.help')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/a-propos`}>
          {t('menu.about')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/contact`}>
          {t('menu.contact')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/vie-privee`}>
          {t('menu.privacy')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/cgu`}>CGU</ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}/desinstaller`}>
          {t('menu.uninstall')}
        </ExternalLink>
      </nav>
    </Container>
  );
};

export default compose(withConnect, withTitle<AboutProps>('À propos'))(About);
