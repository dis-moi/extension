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
import useChangeLanguage from '../../../../hooks/useChangeLanguage';
import { path } from '../../../../../routes';

export interface AboutProps {
  installationDate?: Date;
  extensionVersion: string;
}

export const About = ({ installationDate, extensionVersion }: AboutProps) => {
  const { t } = useTranslation();
  const lang = useChangeLanguage();
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
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${path[lang].HELP}`}>
          {t('menu.help')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${path[lang].ABOUT}`}>
          {t('menu.about')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${path[lang].CONTACT}`}>
          {t('menu.contact')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${path[lang].PRIVACY}`}>
          {t('menu.privacy')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${path[lang].TOS}`}>
          {t('menu.tos')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${path[lang].UNINSTALL}`}>
          {t('menu.uninstall')}
        </ExternalLink>
      </nav>
    </Container>
  );
};

export default compose(
  withConnect,
  withTitle<AboutProps>('title.about')
)(About);
