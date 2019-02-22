import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, ContentTitle } from '../../atoms/About';
import { ExternalLink, Time } from '../../atoms';
import { Notification } from '../../organisms';

const About = ({ close, installationDate, extensionVersion }) => (
  <Notification title="À propos" close={close}>
    <Container>
      <ContentTitle>
Le Même En Mieux V
        {extensionVersion}
      </ContentTitle>
      <Content>
        Bulles vous permet de lire et poster des messages directement sur toutes les pages du web.
        Chacun reçoit ainsi les messages de ses amis, média et experts préférés au moment où il en besoin.
      </Content>

      <Content>
        Vous avez installé le compagnon Bulles le 
        {' '}
        <Time>{installationDate}</Time>
.
      </Content>

      <nav>
        <ExternalLink href="https://www.lmem.net/contact.html">Contact</ExternalLink>
        &nbsp;
        -
        &nbsp;
        <ExternalLink href="https://choisir.lmem.net/desinstaller-meme-mieux/">Désinstaller</ExternalLink>
      </nav>
    </Container>
  </Notification>
);

About.propTypes = {
  close: PropTypes.func,
  installationDate: PropTypes.string,
  extensionVersion: PropTypes.string,
};

About.defaultProps = {
  close: () => {},
  installationDate: (new Date()).toString(),
  extensionVersion: '0.0.0'
};

export default About;
