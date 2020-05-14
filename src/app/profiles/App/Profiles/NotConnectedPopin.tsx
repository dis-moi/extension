import React from 'react';
import Popin, {
  PopinParagraph,
  PopinProps,
  PopinState
} from 'components/molecules/Popin/Popin';
import { BackgroundButton } from 'components/atoms';
import { StatefulContributor } from 'app/lmem/contributor';

export interface NotConnectedPopinState extends PopinState {
  contributor?: StatefulContributor;
}

interface NotConnectedPopinProps extends PopinProps {
  contributor?: StatefulContributor;
  addToBrowser: () => void;
}

const NotConnectedPopin = ({
  opened,
  setOpened,
  contributor,
  addToBrowser
}: NotConnectedPopinProps) => {
  return (
    <Popin opened={opened} setOpened={setOpened}>
      <PopinParagraph>
        Pour voir les contributions {contributor && `de ${contributor.name}`},
        veuillez d’abord ajouter Dismoi à votre navigateur.
      </PopinParagraph>

      <BackgroundButton onClick={addToBrowser}>
        Ajouter Dismoi à mon navigateur
      </BackgroundButton>
    </Popin>
  );
};

export default NotConnectedPopin;
