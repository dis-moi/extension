import React from 'react';
import Popin, { PopinProps } from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';
import { BackgroundButton } from 'components/atoms';
import { ContributorId, StatefulContributor } from 'app/lmem/contributor';

interface SubscribePopinProps extends PopinProps {
  contributor: StatefulContributor;
  subscribe: (contributorId: ContributorId) => void;
}

const SubscribePopin = ({
  opened,
  setOpened,
  contributor,
  subscribe
}: SubscribePopinProps) => {
  return (
    <Popin opened={opened} setOpened={setOpened}>
      <PopinParagraph>
        Veuillez suivre {contributor.name} pour voir ses contributions.
      </PopinParagraph>

      <BackgroundButton onClick={() => subscribe(contributor.id)}>
        Suivre
      </BackgroundButton>
    </Popin>
  );
};

export default SubscribePopin;
