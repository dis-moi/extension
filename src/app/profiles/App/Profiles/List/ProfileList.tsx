import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from 'app/lmem/contributor';
import { Button, CenterContainer, Title2 } from 'components/atoms';
import { Arrow } from 'components/atoms/icons';
import Link from 'components/atoms/Link/Link';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';
import BrowserNotSupportedPopin from '../BrowserNotSupportedPopin';
import StatsWrapper from 'components/atoms/Contributor/StatsWrapper';
import Loader from 'components/atoms/Loader';

const Title = styled(Title2)`
  padding-top: 30px;
  margin-bottom: 20px;
  font-size: 26px;

  @media (max-width: ${props => props.theme.tabletWidth}) {
    padding-top: 15px;
  }
`;

const List = styled(ContributorsList)`
  & + ${CenterContainer} {
    margin-top: 20px;

    ${Button} {
      font-size: 12px;
    }
  }
`;

const Contributor = styled(ContributorLarge)`
  ${StatsWrapper} {
    svg {
      display: none;
    }
  }

  & > ${Link} {
    display: inline-flex;
    align-items: center;

    svg {
      stroke: ${props => props.theme.Button.default};
      margin-top: 3px;
      margin-left: 5px;
      transform: rotate(180deg);
    }

    &:hover {
      svg {
        stroke: ${props => props.theme.Button.hover};
      }
    }
  }
`;

export interface ProfileListProps {
  loading?: boolean;
  contributors: StatefulContributor[];
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
  connected?: boolean;
  addToBrowser: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ProfileList = ({
  loading,
  contributors = [],
  subscribe,
  unsubscribe,
  connected,
  addToBrowser
}: ProfileListProps) => {
  const [notConnectedPopinState, setNotConnectedPopinState] = useState<
    NotConnectedPopinState
  >({ opened: false });
  const [
    browserNotSupportedPopinOpened,
    setBrowserNotSupportedPopinOpened
  ] = useState(false);

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
      {loading ? (
        <Loader />
      ) : (
        <>
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

          <CenterContainer>
            <Button>Voir plus</Button>
          </CenterContainer>
        </>
      )}

      <NotConnectedPopin
        {...notConnectedPopinState}
        setOpened={(opened: boolean) =>
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened
          })
        }
        addToBrowser={(e: MouseEvent<HTMLButtonElement>) => {
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened: false
          });
          addToBrowser(e);
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
