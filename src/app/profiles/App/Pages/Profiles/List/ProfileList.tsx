import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import {
  Contributor,
  ContributorId,
  StatefulContributor
} from 'app/lmem/contributor';
import { Categories } from 'app/lmem/category';
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
import pathToContributor from 'app/profiles/App/pathToContributor';
import Filters from 'components/molecules/Filters/RadiosFilters';
import useContributorsFilters from 'app/profiles/App/useContributorsRadiosFilters';
import ProfileTabs from '../../../ProfileTabs';

const Title = styled(Title2)`
  padding-top: 30px;
  margin-bottom: 20px;
  font-size: 26px;

  @media (max-width: ${props => props.theme.tabletWidth}) {
    padding-top: 15px;
  }
`;

const List = styled(ContributorsList)`
  margin-top: 20px;

  & + ${CenterContainer} {
    margin-top: 20px;

    ${Button} {
      font-size: 12px;
    }
  }
`;

export const ContributorProfileListItem = styled(ContributorLarge)`
  line-height: normal;

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
  goToContributor: (contributor: Contributor) => void;
  categoriesLoading?: boolean;
  categories: Categories;
}

const ProfileList = ({
  loading,
  contributors = [],
  subscribe,
  unsubscribe,
  connected,
  addToBrowser,
  goToContributor,
  categoriesLoading,
  categories
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

  const [filteredContributors, setFilter] = useContributorsFilters(
    contributors
  );

  const handleFiltersChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setFilter(value);
  };

  return (
    <>
      {connected === false && <Title as="h1">Les sources</Title>}

      <ProfileTabs connected={connected} />

      <Filters
        onChange={handleFiltersChange}
        loading={!!categoriesLoading}
        filters={categories}
      />

      {loading ? (
        <Loader />
      ) : (
        <List>
          {filteredContributors.map(contributor => (
            <ContributorProfileListItem
              key={contributor.id}
              contributor={contributor}
              onSubscribe={handleSubscribe(contributor)}
              onUnsubscribe={handleUnsubscribe(contributor)}
              to={pathToContributor(contributor)}
            >
              <Link to={pathToContributor(contributor)}>
                Voir ses contributions
                <Arrow />
              </Link>
            </ContributorProfileListItem>
          ))}
        </List>
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
        contributors={contributors}
        onContributorClick={goToContributor}
      />

      <BrowserNotSupportedPopin
        opened={browserNotSupportedPopinOpened}
        setOpened={setBrowserNotSupportedPopinOpened}
      />
    </>
  );
};

export default ProfileList;
