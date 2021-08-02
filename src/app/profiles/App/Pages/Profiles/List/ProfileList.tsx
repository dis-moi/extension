import React, { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from 'libs/domain/contributor';
import { Categories } from 'libs/domain/category';
import { Button, CenterContainer, Title2 } from 'components/atoms';
import { Arrow } from 'components/atoms/icons';
import Link from 'components/atoms/Link/Link';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import StatsWrapper from 'components/atoms/Contributor/StatsWrapper';
import Loader from 'components/atoms/Loader';
import pathToContributor from 'app/profiles/App/pathToContributor';
import useContributorsFilters from 'app/profiles/hooks/useContributorsFilters';
import LazyOnBoarding from 'app/profiles/App/OnBoarding';
import { Subscriptions } from 'libs/domain/subscription';
import Search from 'components/molecules/Search/Search';
import ProfileTabs from '../../../ProfileTabs';
import BrowserNotSupportedPopin from '../BrowserNotSupportedPopin';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';
import onContributorExampleClick from '../../../onContributorExampleClick';
import { ContextPopinState } from '../../../../store/reducers/contextPopin.reducer';

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

export const ContributorExampleLink = styled(Link)`
  cursor: pointer;
`;

export interface ProfileListProps {
  loading?: boolean;
  contributors: StatefulContributor[];
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
  connected?: boolean;
  addToBrowser: (e: MouseEvent<HTMLButtonElement>) => void;
  categoriesLoading?: boolean;
  categories: Categories;
  subscriptions?: Subscriptions;
  setContextPopin: (payload: ContextPopinState) => void;
}

const ProfileList = ({
  loading,
  contributors = [],
  subscribe,
  unsubscribe,
  connected,
  addToBrowser,
  categoriesLoading,
  categories,
  subscriptions,
  setContextPopin
}: ProfileListProps) => {
  const { t } = useTranslation();

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

  const [
    filteredContributors,
    setFilter,
    handleChangeSearchContributors
  ] = useContributorsFilters(contributors);

  return (
    <>
      <LazyOnBoarding />
      {connected === false && (
        <Title as="h1">{t('profiles:common.sources')}</Title>
      )}

      <ProfileTabs connected={connected} />
      <Search
        categoriesLoading={categoriesLoading}
        categories={categories}
        handleChangeSearchContributors={handleChangeSearchContributors}
        setFilter={setFilter}
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
              {contributor.contribution?.example.exampleMatchingUrl && (
                <ContributorExampleLink
                  onClick={() =>
                    onContributorExampleClick(
                      contributor,
                      connected,
                      subscriptions,
                      handleSubscribe,
                      addToBrowser,
                      setContextPopin
                    )
                  }
                >
                  {t('profiles:action.real_example')}
                  <Arrow />
                </ContributorExampleLink>
              )}
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
      />

      <BrowserNotSupportedPopin
        opened={browserNotSupportedPopinOpened}
        setOpened={setBrowserNotSupportedPopinOpened}
      />
    </>
  );
};

export default ProfileList;
