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

    <Content>
      Pour découvrir ou faire découvrir le Même en Mieux autour de vous,{' '}
      <ExternalLink href="https://choisir.lmem.net/decouvrir-exemples/">
        rendez-vous sur cette page d’exemples
      </ExternalLink>
      .
    </Content>

    <nav>
      <ExternalLink href="https://choisir.lmem.net/questions-frequentes-aide/">
        Aide
      </ExternalLink>{' '}
      - <ExternalLink href="https://www.lmem.net/projet">À propos</ExternalLink>{' '}
      -{' '}
      <ExternalLink href="https://www.lmem.net/contact.html">
        Contact
      </ExternalLink>{' '}
      -{' '}
      <ExternalLink href="https://choisir.lmem.net/charte-de-respect-de-la-vie-privee-5-regles-dor/">
        Vie privée
      </ExternalLink>{' '}
      - <ExternalLink href="https://www.lmem.net/cgu.html">CGU</ExternalLink> -{' '}
      <ExternalLink href="https://choisir.lmem.net/desinstaller-meme-mieux/">
        Désinstaller
      </ExternalLink>
    </nav>
  </Container>
);

export default compose(
  withConnect,
  withTitle<AboutProps>('À propos')
)(About);
