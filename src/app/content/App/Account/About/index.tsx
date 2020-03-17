import React from 'react';
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

export const About = ({ installationDate, extensionVersion }: AboutProps) => (
  <Container>
    <Title>Dismoi V{extensionVersion}</Title>
    <Content>
      Lorsque vous visitez une page du web, Dismoi vous permet de lire les
      messages de vos relations et en poster à votre tour.
    </Content>

    {installationDate && (
      <Content>
        Vous l’avez installé le <Time>{installationDate}</Time>.
      </Content>
    )}

    <nav>
      <ExternalLink href={`https://${WEBSITE_DOMAIN}/aide`}>Aide</ExternalLink>{' '}
      -{' '}
      <ExternalLink href={`https://${WEBSITE_DOMAIN}/a-propos`}>
        À propos
      </ExternalLink>{' '}
      -{' '}
      <ExternalLink href={`https://${WEBSITE_DOMAIN}/contact`}>
        Contact
      </ExternalLink>{' '}
      -{' '}
      <ExternalLink href={`https://${WEBSITE_DOMAIN}/vie-privee`}>
        Vie privée
      </ExternalLink>{' '}
      - <ExternalLink href={`https://${WEBSITE_DOMAIN}/cgu`}>CGU</ExternalLink>{' '}
      -{' '}
      <ExternalLink href={`https://${WEBSITE_DOMAIN}/desinstaller`}>
        Désinstaller
      </ExternalLink>
    </nav>
  </Container>
);

export default compose(
  withConnect,
  withTitle<AboutProps>('À propos')
)(About);
