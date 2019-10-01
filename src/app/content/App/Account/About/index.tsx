import React from 'react';
import { compose } from 'redux';
import { ExternalLink, Time } from 'components/atoms';
import withTitle from 'app/hocs/withTitle';
import Title from './Title';
import Content from './Content';
import Container from './Container';
import withConnect from './withConnect';

export interface AboutProps {
  installationDate?: Date;
  extensionVersion: string;
}

export const About = ({ installationDate, extensionVersion }: AboutProps) => (
  <Container>
    <Title>Bulles V{extensionVersion}</Title>
    <Content>
      Lorsque vous visitez une page du web, Bulles vous permet de lire les
      messages de vos relations et en poster à votre tour.
    </Content>

    {installationDate && (
      <Content>
        Vous l’avez installé le
        <Time>{installationDate}</Time>.
      </Content>
    )}

    <nav>
      <ExternalLink href="http://www.bulles.fr/aide">Aide</ExternalLink> -{' '}
      <ExternalLink href="http://www.bulles.fr/a-propos">À propos</ExternalLink>{' '}
      - <ExternalLink href="http://www.bulles.fr/contact">Contact</ExternalLink>{' '}
      -{' '}
      <ExternalLink href="http://www.bulles.fr/vie-privee">
        Vie privée
      </ExternalLink>{' '}
      - <ExternalLink href="http://www.bulles.fr/cgu">CGU</ExternalLink> -{' '}
      <ExternalLink href="http://www.bulles.fr/desinstaller">
        Désinstaller
      </ExternalLink>
    </nav>
  </Container>
);

export default compose(
  withConnect,
  withTitle<AboutProps>('À propos')
)(About);
