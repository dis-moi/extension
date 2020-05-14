import React, { useState } from 'react';
import { ContributorId, StatefulContributor } from 'app/lmem/contributor';
import { Arrow, Loading } from 'components/atoms/icons';
import { trilean } from 'types';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import Link from 'components/atoms/Link/Link';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';
import BrowserNotSupportedPopin from '../BrowserNotSupportedPopin';

export interface ProfileListProps {
  loading: trilean;
  contributors: StatefulContributor[];
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
  showContributionsLink?: boolean;
  connected?: boolean;
}

const ProfileList = ({
  loading,
  contributors = [],
  subscribe,
  unsubscribe,
  connected
}: ProfileListProps) => {
  const [notConnectedPopinState, setNotConnectedPopinState] = useState<
    NotConnectedPopinState
  >({ opened: false });
  const [
    browserNotSupportedPopinOpened,
    setBrowserNotSupportedPopinOpened
  ] = useState(false);

  if (typeof loading === 'undefined') {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  const handleSubscribe = (contributor: StatefulContributor) => () => {
    if (connected) {
      subscribe(contributor.id);
    } else {
      setNotConnectedPopinState({ opened: true, contributor });
    }
  };

  const handleUnsubscribe = (contributor: StatefulContributor) => () => {
    if (connected) {
      unsubscribe(contributor.id);
    } else {
      setNotConnectedPopinState({ opened: true, contributor });
    }
  };

  return (
    <>
      <ContributorsList>
        {contributors.map(contributor => (
          <ContributorLarge
            key={contributor.id}
            contributor={contributor}
            onSubscribe={handleSubscribe(contributor)}
            onUnsubscribe={handleUnsubscribe(contributor)}
            link={
              <Link to={`/les-contributeurs/${contributor.id}`}>
                Voir ses contributions
                <Arrow />
              </Link>
            }
          />
        ))}
      </ContributorsList>

      <NotConnectedPopin
        {...notConnectedPopinState}
        setOpened={(opened: boolean) =>
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened
          })
        }
        addToBrowser={() => {
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened: false
          });
          setBrowserNotSupportedPopinOpened(true);
        }}
      />

      <BrowserNotSupportedPopin
        opened={browserNotSupportedPopinOpened}
        setOpened={setBrowserNotSupportedPopinOpened}
      />
    </>
  );
};

export default ProfileList;
