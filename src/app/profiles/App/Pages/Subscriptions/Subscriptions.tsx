import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from 'libs/domain/contributor';
import { Categories } from 'libs/domain/category';
import { useFacetName } from 'libs/facets/useFacetName.hook';
import { TwoColumns } from 'components/atoms';
import { SlowerMessageBox } from 'components/molecules/SidebarBox';
import { Arrow } from 'components/atoms/icons';
import Search from 'components/molecules/Search/Search';
import pathToContributor from 'app/profiles/App/pathToContributor';
import SimilarProfiles from 'app/profiles/App/SimilarProfiles';
import useContributorsFilters from 'app/profiles/hooks/useContributorsFilters';
import {
  ContributorExampleLink,
  ContributorProfileListItem
} from '../Profiles/List/ProfileList';
import { Aside, MainCol } from '../Profiles/Profile/Profile';
import ProfileTabs from '../../ProfileTabs';

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
`;

const TwoColumnsWithMargin = styled(TwoColumns)`
  margin-top: 20px;
`;
export interface SubscriptionsProps {
  subscribedContributors: StatefulContributor[];
  subscribe: (id: ContributorId) => void;
  unsubscribe: (id: ContributorId) => void;
  className?: string;
  connected?: boolean;
  categoriesLoading?: boolean;
  categories: Categories;
}

const Subscriptions = ({
  subscribedContributors,
  subscribe,
  unsubscribe,
  connected,
  className,
  categories,
  categoriesLoading
}: SubscriptionsProps) => {
  const { t } = useTranslation();

  const [
    filteredSubscriptions,
    setFilter,
    handleChangeSearchContributors,
    updateFilteredContributors
  ] = useContributorsFilters(subscribedContributors);

  const facetName = useFacetName();

  return (
    <>
      <ProfileTabs connected={connected} />
      {connected === true && (
        <Search
          categoriesLoading={categoriesLoading}
          categories={categories}
          handleChangeSearchContributors={handleChangeSearchContributors}
          setFilter={setFilter}
        />
      )}
      <TwoColumnsWithMargin>
        <MainCol>
          {connected === false ? (
            <Trans i18nKey={'profiles:view.my_subscriptions.disclaimer'}>
              <p>
                Vous devez avoir l&apos;extension {facetName} installée et
                activée pour voir cette partie.
              </p>
              <p>En cas de problème, merci de nous laisser un message.</p>
            </Trans>
          ) : (
            <ContributorsList className={className}>
              {filteredSubscriptions.map(contributor => (
                <ContributorProfileListItem
                  key={contributor.id}
                  contributor={contributor}
                  onSubscribe={() => {
                    subscribe(contributor.id);
                    updateFilteredContributors(contributor.id, true);
                  }}
                  onUnsubscribe={() => {
                    unsubscribe(contributor.id);
                    updateFilteredContributors(contributor.id, false);
                  }}
                  to={pathToContributor(contributor)}
                >
                  {contributor.contribution?.example.exampleMatchingUrl && (
                    <ContributorExampleLink
                      onClick={() =>
                        window.open(
                          contributor.contribution?.example.exampleMatchingUrl,
                          '_blank'
                        )
                      }
                    >
                      {t('profiles:action.real_example')}
                      <Arrow />
                    </ContributorExampleLink>
                  )}
                </ContributorProfileListItem>
              ))}
            </ContributorsList>
          )}
        </MainCol>
        <Aside>
          <SlowerMessageBox />
          <SimilarProfiles />
        </Aside>
      </TwoColumnsWithMargin>
    </>
  );
};

export default Subscriptions;
