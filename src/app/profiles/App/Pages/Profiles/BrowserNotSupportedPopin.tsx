import React from 'react';
import { useTranslation } from 'react-i18next';
import Popin, { PopinProps } from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';

const BrowserNotSupportedPopin = ({ opened, setOpened }: PopinProps) => {
  const { t } = useTranslation();
  return (
    <Popin size={'large'} opened={opened} setOpened={setOpened}>
      <PopinParagraph>
        {t('popin.browser_not_support.disclaimer')}
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
    </Popin>
  );
};

export default BrowserNotSupportedPopin;
