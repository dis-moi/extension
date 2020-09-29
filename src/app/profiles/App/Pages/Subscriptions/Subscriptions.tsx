import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ContributorId,
  findContributorIn,
  StatefulContributor
} from 'app/lmem/contributor';
import { Categories } from 'app/lmem/category';
import { ButtonWithIcon, Paragraph, TwoColumns } from 'components/atoms';
import {
  Aside,
  MainCol,
  SidebarBoxWithAction
} from '../Profiles/Profile/Profile';
import pathToContributor from 'app/profiles/App/pathToContributor';
import { Download } from 'components/atoms/icons';
import useContributorsFilters from 'app/profiles/App/useContributorsFilters';
import SimilarProfiles from 'app/profiles/App/SimilarProfiles';
import { ContributorProfileListItem } from '../Profiles/List/ProfileList';
import Filters from 'components/molecules/Filters/FiltersCheckboxes';

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`;

export interface SubscriptionsProps {
  subscriptions: StatefulContributor[];
  contributors: StatefulContributor[];
  subscribe: (id: ContributorId) => () => void;
  unsubscribe: (id: ContributorId) => () => void;
  className?: string;
  connected?: boolean;
  categoriesLoading?: boolean;
  categories: Categories;
}

export const Subscriptions = ({
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

  const [
    filteredSubscriptions,
    addFilter,
    removeFilter
  ] = useContributorsFilters(subscriptionsToRender, categories);

  const handleFiltersChange = ({
    target: { checked, value }
  }: ChangeEvent<HTMLInputElement>) => {
    checked ? addFilter(value) : removeFilter(value);
  };

  return (
    <>
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
          {connected === false && (
            <SidebarBoxWithAction>
              <Paragraph>
                DisMoi permet aux internautes, médias et experts de vous
                informer directement sur les pages web que vous visitez.
              </Paragraph>

              <ButtonWithIcon className="bulle-installer">
                Ajouter à mon navigateur <Download />
              </ButtonWithIcon>
            </SidebarBoxWithAction>
          )}
          <SimilarProfiles />
        </Aside>
      </TwoColumns>
    </>
  );
};

export default Subscriptions;
