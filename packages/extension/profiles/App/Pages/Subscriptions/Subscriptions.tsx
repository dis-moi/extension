import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from '@dismoi/domain/contributor';
import { Categories } from '@dismoi/domain/category';
import { FACET_NAME } from '@dismoi/domain';
import { TwoColumns } from '@dismoi/ui/atoms';
import { SlowerMessageBox } from '@dismoi/ui/molecules/SidebarBox';
import { Arrow } from '@dismoi/ui/atoms/icons';
import Search from '@dismoi/ui/molecules/Search/Search';
import pathToContributor from 'app/profiles/App/pathToContributor';
import SimilarProfiles from 'app/profiles/App/SimilarProfiles';
import useContributorsFilters from 'app/profiles/hooks/useContributorsFilters';
import {
  ContributorExampleLink,
  ContributorProfileListItem,
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
  categoriesLoading,
}: SubscriptionsProps) => {
  const { t } = useTranslation();

  const {
    filteredContributors: filteredSubscriptions,
    setFilter,
    handleChangeSearchContributors,
  } = useContributorsFilters(subscribedContributors);

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
                Vous devez avoir l&apos;extension {FACET_NAME} installée et
                activée pour voir cette partie.
              </p>
              <p>En cas de problème, merci de nous laisser un message.</p>
            </Trans>
          ) : (
            <ContributorsList className={className}>
              {filteredSubscriptions.map((contributor) => (
                <ContributorProfileListItem
                  key={contributor.id}
                  contributor={contributor}
                  onSubscribe={() => subscribe(contributor.id)}
                  onUnsubscribe={() => unsubscribe(contributor.id)}
                  to={pathToContributor(contributor)}
                >
                  {contributor.contribution?.example.exampleMatchingUrl && (
                    <ContributorExampleLink
                      onClick={() =>
                        window.open(
                          contributor.contribution?.example.exampleMatchingUrl,
                          '_blank',
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
