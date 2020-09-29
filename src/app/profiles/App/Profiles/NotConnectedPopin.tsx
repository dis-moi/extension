import React, { MouseEvent } from 'react';
import Popin, {
  PopinProps,
  PopinState
} from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';
import { BackgroundButton } from 'components/atoms';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';
import PopinBottomBar from 'components/molecules/Popin/PopinBottomBar';

export interface NotConnectedPopinState extends PopinState {
  contributor?: StatefulContributor;
}

interface NotConnectedPopinProps extends PopinProps {
  contributor?: StatefulContributor;
  addToBrowser: (e: MouseEvent<HTMLButtonElement>) => void;
  contributors: StatefulContributor[];
  onContributorClick: (contributor: Contributor) => void;
}

const NotConnectedPopin = ({
  opened,
  setOpened,
  contributor,
  addToBrowser,
  contributors,
  onContributorClick
}: NotConnectedPopinProps) => {
  return (
    <Popin opened={opened} setOpened={setOpened}>
      <PopinParagraph>
        Pour voir les contributions {contributor && `de ${contributor.name}`},
        veuillez d’abord ajouter Dismoi à votre navigateur.
      </PopinParagraph>

      <BackgroundButton className="bulle-installer" onClick={addToBrowser}>
        Ajouter Dismoi à mon navigateur
      </BackgroundButton>
      <PopinBottomBar
        contributors={contributors}
        onContributorClick={onContributorClick}
      />
    </Popin>
  );
};

export default NotConnectedPopin;
