import React, { useState } from 'react';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from 'app/lmem/contributor';
import { trilean } from 'types';
import { Title2 } from 'components/atoms';
import { Arrow, Loading } from 'components/atoms/icons';
import Link from 'components/atoms/Link/Link';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';
import BrowserNotSupportedPopin from '../BrowserNotSupportedPopin';
import Avatar from 'components/molecules/Avatar/Avatar';
import StatsWrapper from 'components/atoms/Contributor/StatsWrapper';

const Title = styled(Title2)`
  padding-top: 30px;
  margin-bottom: 20px;
  font-size: 26px;

  @media (max-width: ${props => props.theme.tabletWidth}) {
    padding-top: 15px;
  }
`;

const List = styled(ContributorsList)`
  margin-bottom: 70px;

  @media (max-width: ${props => props.theme.tabletWidth}) {
    margin-bottom: 60px;
  }
`;

const Contributor = styled(ContributorLarge)`
  ${Avatar} {
    &,
    & > img {
      width: 90px;
      height: 90px;
    }
  }

  ${StatsWrapper} {
    svg {
      display: none;
    }
  }
`;

export interface ProfileListProps {
  loading: trilean;
  contributors: StatefulContributor[];
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
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
      <Title>Les contributeurs</Title>
      <List>
        {contributors.map(contributor => (
          <Contributor
            key={contributor.id}
            contributor={contributor}
            onSubscribe={handleSubscribe(contributor)}
            onUnsubscribe={handleUnsubscribe(contributor)}
            to={`/les-contributeurs/${contributor.id}`}
          >
            <Link to={`/les-contributeurs/${contributor.id}`}>
              Voir ses contributions
              <Arrow />
            </Link>
          </Contributor>
        ))}
      </List>

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
