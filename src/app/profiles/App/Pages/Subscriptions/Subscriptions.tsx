import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ContributorId,
  findContributorIn,
  StatefulContributor
} from 'app/lmem/contributor';
import { Categories } from 'app/lmem/category';
import { TwoColumns } from 'components/atoms';
import { SlowerMessageBox } from 'components/molecules/SidebarBox';
import { Aside, MainCol } from '../Profiles/Profile/Profile';
import pathToContributor from 'app/profiles/App/pathToContributor';
import { ContributorProfileListItem } from '../Profiles/List/ProfileList';
import SimilarProfiles from 'app/profiles/App/SimilarProfiles';
import Filters from 'components/molecules/Filters/RadiosFilters';
import useContributorsFilters from 'app/profiles/App/useContributorsRadiosFilters';
import ProfileTabs from '../../ProfileTabs';

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

  const subscriptionsToRender = initialSubscriptions.map(
    findContributorIn(contributors)
  );

  if (connected === false) {
    return (
      <>
        <p>
          Vous devez avoir l&apos;extension Dismoi installée et activée pour
          voir cette partie.
        </p>
        <p>En cas de problème, merci de nous laisser un message.</p>
      </>
    );
  }

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
      <Filters
        onChange={handleFiltersChange}
        loading={!!categoriesLoading}
        filters={categories}
      />
      <TwoColumns>
        <MainCol>
          <ContributorsList className={className}>
            {filteredSubscriptions.map(contributor => (
              <ContributorProfileListItem
                key={contributor.id}
                contributor={contributor}
                onSubscribe={() => subscribe(contributor.id)}
                onUnsubscribe={() => unsubscribe(contributor.id)}
                to={pathToContributor(contributor)}
              />
            ))}
          </ContributorsList>
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
