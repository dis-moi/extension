import React from 'react';
import { useTranslation } from 'react-i18next';
import Popin, { PopinProps } from 'libs/components/molecules/Popin/Popin';
import PopinParagraph from 'libs/components/molecules/Popin/PopinParagraph';
import { ContributorId, StatefulContributor } from 'libs/lmem/contributor';
import ContributorButton from 'libs/components/organisms/Contributor/ContributorButton';

interface SubscribePopinProps extends PopinProps {
  contributor: StatefulContributor;
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
}

const SubscribePopin = ({
  opened,
  setOpened,
  contributor,
  subscribe,
  unsubscribe
}: SubscribePopinProps) => {
  const { t } = useTranslation();
  return (
    <Popin opened={opened} setOpened={setOpened}>
      <PopinParagraph>
        {t('profiles:popin.subscribe.message', {
          contributorName: contributor.name
        })}
      </PopinParagraph>
      <ContributorButton
        loading={contributor?.subscribing === true}
        subscribed={contributor?.subscribed}
        onSubscribe={() => {
          subscribe(contributor.id);
          setOpened(false);
        }}
        onUnsubscribe={() => unsubscribe(contributor.id)}
      />
    </Popin>
  );
};

export default SubscribePopin;
