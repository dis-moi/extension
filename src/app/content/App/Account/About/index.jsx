import React from 'react';
import PropTypes from 'prop-types';
import { ExternalLink, Time } from 'components/atoms';
import { Notification } from 'components/organisms';
import Title from './Title';
import Content from './Content';
import Container from './Container';

const About = ({ close, installationDate, extensionVersion }) => (
  <Notification title="À propos" close={close}>
    <Container>
      <Title>
        Le Même En Mieux V
        {extensionVersion}
      </Title>
      <Content>
          Le Même en Mieux est un assistant d’achat indépendant des vendeurs et des marques.
      </Content>

      {installationDate && (
        <Content>
          Vous l’avez installé le
          {' '}
          <Time>{installationDate}</Time>
.
        </Content>
      )}

      <Content>
        Pour découvrir ou faire découvrir le Même en Mieux autour de vous,
        {' '}
        <ExternalLink
          href="https://choisir.lmem.net/decouvrir-exemples/"
        >
          rendez-vous sur cette page d’exemples
        </ExternalLink>
        .
      </Content>

      <nav>
        <ExternalLink
          href="https://choisir.lmem.net/questions-frequentes-aide/"
        >
          Aide
        </ExternalLink>
        {' '}
        -
        {' '}
        <ExternalLink href="https://www.lmem.net/projet">À propos</ExternalLink>
        {' '}
        -
        {' '}
        <ExternalLink href="https://www.lmem.net/contact.html">Contact</ExternalLink>
        {' '}
        -
        {' '}
        <ExternalLink
          href="https://choisir.lmem.net/charte-de-respect-de-la-vie-privee-5-regles-dor/"
        >
          Vie privée
        </ExternalLink>
        {' '}
        -
        {' '}
        <ExternalLink href="https://www.lmem.net/cgu.html">CGU</ExternalLink>
        {' '}
          -
        {' '}
        <ExternalLink href="https://choisir.lmem.net/desinstaller-meme-mieux/">Désinstaller</ExternalLink>
      </nav>
    </Container>
  </Notification>
);

About.propTypes = {
  close: PropTypes.func,
  installationDate: PropTypes.string,
  extensionVersion: PropTypes.string.isRequired,
};

About.defaultProps = {
  close: () => {},
  installationDate: null,
};

export default About;
