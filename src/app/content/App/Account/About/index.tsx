import React from 'react';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import withTitle from 'app/content/hocs/withTitle';
import { ExternalLink, Time } from 'components/atoms';
import { WEBSITE_DOMAIN } from 'libs/domain';
import { useFacetName } from 'libs/facets/useFacetName.hook';
import Title from './Title';
import Content from './Content';
import Container from './Container';
import withConnect from './withConnect';

export interface AboutProps {
  installationDate?: Date;
  extensionVersion: string;
}

export const About = ({ installationDate, extensionVersion }: AboutProps) => {
  const { t } = useTranslation();
  const facetName = useFacetName();

  return (
    <Container>
      <Title>
        {facetName} V{extensionVersion}
      </Title>
      <Content>{t('view.about.description')}</Content>

      {installationDate && (
        <Content>
          {t('view.about.install_date')} <Time>{installationDate}</Time>.
        </Content>
      )}

      <nav>
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.help')}`}>
          {t('menu.help')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.about')}`}>
          {t('menu.about')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.contact')}`}>
          {t('menu.contact')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.privacy')}`}>
          {t('menu.privacy')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.tos')}`}>
          {t('menu.tos')}
        </ExternalLink>{' '}
        -{' '}
        <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.uninstall')}`}>
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
