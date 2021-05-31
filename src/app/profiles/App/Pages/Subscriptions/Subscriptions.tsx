import React, { ChangeEvent, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  ContributorId,
  findContributorIn,
  StatefulContributor
} from 'libs/lmem/contributor';
import { Categories } from 'libs/lmem/category';
import { TwoColumns } from 'components/atoms';
import { SlowerMessageBox } from 'components/molecules/SidebarBox';
import pathToContributor from 'app/profiles/App/pathToContributor';
import SimilarProfiles from 'app/profiles/App/SimilarProfiles';
import Filters from 'components/molecules/Filters/RadiosFilters';
import useContributorsFilters from 'app/profiles/App/useContributorsRadiosFilters';
import {
  ContributorExampleLink,
  ContributorProfileListItem
} from '../Profiles/List/ProfileList';
import { Aside, MainCol } from '../Profiles/Profile/Profile';
import ProfileTabs from '../../ProfileTabs';
import { Arrow } from '../../../../../components/atoms/icons';

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
`;

export interface SubscriptionsProps {
  subscriptions: StatefulContributor[];
  contributors: StatefulContributor[];
  subscribe: (id: ContributorId) => void;
  unsubscribe: (id: ContributorId) => void;
  className?: string;
  connected?: boolean;
  categoriesLoading?: boolean;
  categories: Categories;
}

const Subscriptions = ({
  subscriptions,
  contributors,
  subscribe,
  unsubscribe,
  connected,
  className,
  categories,
  categoriesLoading
}: SubscriptionsProps) => {
  const [initialSubscriptions, setInitialSubscriptions] = useState(
    subscriptions
  );

  useEffect(() => {
    if (initialSubscriptions.length === 0)
      setInitialSubscriptions(subscriptions);
  }, [subscriptions]);
  const { t } = useTranslation();
  const subscriptionsToRender = initialSubscriptions.map(
    findContributorIn(contributors)
  );

  const [filteredSubscriptions, setFilter] = useContributorsFilters(
    subscriptionsToRender
  );

  const handleFiltersChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setFilter(value);
  };
  return (
    <>
      <ProfileTabs connected={connected} />
      {connected === true && (
        <Filters
          onChange={handleFiltersChange}
          loading={!!categoriesLoading}
          filters={categories}
        />
      )}
      <TwoColumns>
        <MainCol>
          {connected === false ? (
            <Trans i18nKey={'profiles:view.my_subscriptions.disclaimer'}>
              <p>
                Vous devez avoir l&apos;extension Dismoi installée et activée
                pour voir cette partie.
              </p>
              <p>En cas de problème, merci de nous laisser un message.</p>
            </Trans>
          ) : (
            <ContributorsList className={className}>
              {filteredSubscriptions.map(contributor => (
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
      </TwoColumns>
    </>
  );
};

export default Subscriptions;
