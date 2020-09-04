import React from 'react';
import Popin, { PopinProps } from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorButton from 'components/organisms/Contributor/ContributorButton';

interface SubscribePopinProps extends PopinProps {
  contributor: StatefulContributor;
  subscribe: () => void | undefined;
  unsubscribe: () => void | undefined;
}

const SubscribePopin = ({
  opened,
  setOpened,
  contributor,
  subscribe,
  unsubscribe
}: SubscribePopinProps) => {
  return (
    <Popin opened={opened} setOpened={setOpened}>
      <PopinParagraph>
        Veuillez suivre {contributor.name} pour voir ses contributions.
      </PopinParagraph>
      <ContributorButton
        loading={contributor?.subscribing === true}
        subscribed={contributor?.subscribed}
        onSubscribe={() => {
          subscribe && subscribe();
          setOpened(false);
        }}
        onUnsubscribe={unsubscribe}
      />
    </Popin>
  );
};

export default SubscribePopin;
