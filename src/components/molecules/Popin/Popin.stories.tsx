import React from 'react';
import { action } from '@storybook/addon-actions';
import { BackgroundButton, Link, Paragraph } from '../../atoms';
import Popin from './Popin';
import PopinParagraph from './PopinParagraph';
import PopinBottomBar from './PopinBottomBar';
import PopinSmallText from './PopinSmallText';

export default {
  title: 'Components/Molecules/Popin'
};

export const Default = () => (
  <Popin opened={true} setOpened={action('setOpened')}>
    Hello world!
  </Popin>
);

Default.story = {
  name: 'default'
};

export const AddDismoi = () => (
  <Popin opened={true} setOpened={action('setOpened')}>
    <Paragraph>
      Pour voir les contributions de Cécile Dupéré, veuillez d’abord ajouter
      Dismoi à votre navigateur.
    </Paragraph>
    <BackgroundButton>Ajouter Dismoi à mon navigateur</BackgroundButton>
  </Popin>
);

export const Follow = () => (
  <Popin opened={true} setOpened={action('setOpened')}>
    Veuillez suivre Cécile Dupéré pour voir ses contributions.
    <BackgroundButton>Suivre</BackgroundButton>
  </Popin>
);

export const WithLinkAndLarge = () => (
  <Popin size={'large'} opened={true} setOpened={action('setOpened')}>
    <PopinParagraph>
      Dismoi est actuellement disponible sur les navigateurs Chrome, Firefox
      Edge et Opéra
    </PopinParagraph>
    <PopinParagraph>
      <strong>Chrome&nbsp;:&nbsp;</strong>
      https://chrome.google.com/webstore/search/dismoi
      <BackgroundButton>Copier</BackgroundButton>
    </PopinParagraph>
    <PopinParagraph>
      <strong>Firefox&nbsp;:&nbsp;</strong>
      https://addons.mozilla.org/fr/firefox/addon/dismoi/
      <BackgroundButton>Copier</BackgroundButton>
    </PopinParagraph>
    <PopinParagraph>
      <strong>Edge&nbsp;:&nbsp;</strong>
      https://www.dismoi.io/edge/
      <BackgroundButton>Copier</BackgroundButton>
    </PopinParagraph>
    <PopinParagraph>
      <strong>Opera&nbsp;:&nbsp;</strong>
      https://www.dismoi.io/opera/
      <BackgroundButton>Copier</BackgroundButton>
    </PopinParagraph>
  </Popin>
);

WithLinkAndLarge.story = {
  name: 'With link and large'
};

export const Install = () => (
  <Popin size={'extralarge'} opened={true} setOpened={action('setOpened')}>
    <Paragraph>
      Pour recevoir les informations de <strong>Alertoo</strong>, <br />
      veuillez d’abord ajouter DisMoi à votre navigateur
    </Paragraph>
    <BackgroundButton>Ajouter DisMoi et suivre Alertoo</BackgroundButton>
    <PopinSmallText>
      Gratuit, sans publicité, <Link>respecte votre vie privée</Link>
    </PopinSmallText>
    <PopinBottomBar />
  </Popin>
);
