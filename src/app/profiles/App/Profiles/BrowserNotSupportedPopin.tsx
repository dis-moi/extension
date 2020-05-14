import React from 'react';
import Popin, { PopinList, PopinProps } from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';

const BrowserNotSupportedPopin = ({ opened, setOpened }: PopinProps) => (
  <Popin opened={opened} setOpened={setOpened}>
    <PopinList>
      <PopinParagraph>
        Dismoi est actuellement disponible sur les navigateurs Chrome, Firefox
        et Opéra
      </PopinParagraph>
      <PopinParagraph>
        <strong>Chrome&nbsp;:&nbsp;</strong>
        https://chrome.google.com/webstore/search/dismoi
      </PopinParagraph>
      <PopinParagraph>
        <strong>Firefox&nbsp;:&nbsp;</strong>
        https://addons.mozilla.org/fr/firefox/addon/dismoi/
      </PopinParagraph>
      <PopinParagraph>
        <strong>Opera&nbsp;:&nbsp;</strong>
        https://www.dismoi.io/opera/
      </PopinParagraph>
    </PopinList>
  </Popin>
);

export default BrowserNotSupportedPopin;
