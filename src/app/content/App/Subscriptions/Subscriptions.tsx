import React from 'react';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import Illustration from './Illustration';
import Container from './Container';
import { StatefulContributor } from 'app/lmem/contributor';
import SubscriptionsListRow from './SubscriptionsRow/SubscriptionsRow';

export interface SubscriptionsScreenProps {
  openSubscriptions: () => void;
  nbSubscribedContributors?: number;
  subscribedContributors: StatefulContributor[];
}

const Subscription = styled.div`
  margin-bottom: 20px;
`;

const SubscriptionInfo = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
`;

const pluralize = (nb: number | undefined) => (nb && nb > 1 ? '·s' : '');

const nbContributorsPerRow = 6;
const maxNbRows = 3;

type HasLengthMultipleOfResult<T = object> = (array: Array<T>) => boolean;
const hasLengthMultipleOf = (x: number): HasLengthMultipleOfResult =>
  R.compose(
    R.equals(0),
    R.modulo(R.__, x),
    R.length
  );

type AllButLast = (
  contributors: StatefulContributor[]
) => StatefulContributor[];
const allButLast: AllButLast = R.init;

const toColumnsAndRows = (openSubscriptions: () => void) =>
  R.pipe(
    R.take(nbContributorsPerRow * maxNbRows),
    R.when(hasLengthMultipleOf(nbContributorsPerRow), allButLast),
    R.splitEvery(nbContributorsPerRow),
    RA.mapIndexed((contributors: StatefulContributor[], rowIndex, rows) => (
      <SubscriptionsListRow
        contributors={contributors}
        rowIndex={rowIndex}
        lastRow={rowIndex === rows.length - 1}
        openSubscriptions={openSubscriptions}
      />
    ))
  );

const Subscriptions = ({
  openSubscriptions,
  subscribedContributors
}: SubscriptionsScreenProps) => (
  <Container>
    <Subscription>
      {subscribedContributors.length === 0 && <Illustration />}
      {toColumnsAndRows(openSubscriptions)(subscribedContributors)}
    </Subscription>

    <SubscriptionInfo>
      {subscribedContributors.length === 0 && (
        <>
          Vous n&apos;êtes abonné·e à aucun·e contributeur·ice, c&apos;est
          nécessaire au bon fonctionnement de l&apos;extension.
        </>
      )}
      {subscribedContributors.length > 0 && (
        <>
          Vous êtes abonné·e à <br />
          <strong>{subscribedContributors.length}</strong> contributeur·ice
          {pluralize(subscribedContributors.length)}.
        </>
      )}
    </SubscriptionInfo>

    <BackgroundButton onClick={openSubscriptions}>
      Gérer mes abonnements
    </BackgroundButton>
  </Container>
);

export default Subscriptions;
