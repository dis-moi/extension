import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from 'libs/domain/contributor';
import { Categories } from 'libs/domain/category';
import { Button, CenterContainer, Title2 } from 'components/atoms';
import { Arrow, Search } from 'components/atoms/icons';
import Link from 'components/atoms/Link/Link';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import StatsWrapper from 'components/atoms/Contributor/StatsWrapper';
import Loader from 'components/atoms/Loader';
import pathToContributor from 'app/profiles/App/pathToContributor';
import useContributorsFilters from 'app/profiles/App/useContributorsFilters';
import LazyOnBoarding from 'app/profiles/App/OnBoarding';
import { Subscriptions } from 'libs/domain/subscription';
import ProfileTabs from '../../../ProfileTabs';
import BrowserNotSupportedPopin from '../BrowserNotSupportedPopin';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';
import onContributorExampleClick from '../../../onContributorExampleClick';
import { ContextPopinState } from '../../../../store/reducers/contextPopin.reducer';
import { Input, Select } from '../../../../../../components/atoms/Forms';
import { ALL } from '../../../../../../components/molecules/Filters/RadiosFilters';

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

const SearchBar = styled.div`
  display: flex;
  padding: 0 16px;

  select,
  input {
    font-size: 16px;
    box-shadow: none;
    border: none;
  }

  select {
    margin-right: 24px;
    margin-bottom: 0;
    padding: 10px 7px;
    text-transform: none;
  }

  input {
    margin-bottom: 0;
    padding: 10px 7px;
  }
`;

const SearchFilters = styled.div`
  display: flex;
  align-items: center;

  label {
    flex-shrink: 0;
    margin-right: 8px;
  }
`;

const SearchField = styled.div`
  display: flex;

  input {
    border-radius: 6px 0 0 6px;
  }
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  background-color: white;
  border-radius: 0 6px 6px 0;

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.activeColor};
  }
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

  const handleFiltersChange = ({
    target: { value }
  }: ChangeEvent<HTMLSelectElement>) => {
    setFilter(value);
  };
  return (
    <>
      <LazyOnBoarding />
      {connected === false && (
        <Title as="h1">{t('profiles:common.sources')}</Title>
      )}

      <ProfileTabs connected={connected} />

      <SearchBar>
        {!categoriesLoading && (
          <SearchFilters>
            <label htmlFor="categories">Filtrer par : </label>

            <Select
              onChange={handleFiltersChange}
              placeholder={'Filtrez la recherche'}
              id="categories"
            >
              <option value={ALL}>{t('profiles:common.all')}</option>
              {Object.keys(categories).map(catId => (
                <option key={catId} value={catId}>
                  {categories[catId]}
                </option>
              ))}
            </Select>
          </SearchFilters>
        )}
        <SearchField>
          <Input
            type={'text'}
            placeholder={t('profiles:form.placeholder.search')}
            onChange={handleChangeSearchContributors}
          />
          <SearchIcon>
            <Search />
          </SearchIcon>
        </SearchField>
      </SearchBar>

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
