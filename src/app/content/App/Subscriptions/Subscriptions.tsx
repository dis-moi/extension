import React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';

import Illustration from './Illustration';
import Container from './Container';
import Avatar from '../../../../components/molecules/Avatar/Avatar';
import { StatefulContributor } from '../../../lmem/contributor';

export interface SubscriptionsScreenProps {
  openSubscriptions: () => void;
  nbSubscribedContributors?: number;
  subscribedContributors: StatefulContributor[];
}

const SubscriptionInfo = styled.div`
  margin-bottom: 35px;
  font-size: 18px;
`;

const pluralize = (nb: number | undefined) => (nb && nb > 1 ? 's' : '');

const nbContributorsPerRow = 6;
const maxNbRows = 3;

const Subscriptions = ({
  openSubscriptions,
  subscribedContributors
}: SubscriptionsScreenProps) => (
  <Container>
    <Illustration />

    <SubscriptionInfo>
      Vous êtes abonné(e)s à <strong>{subscribedContributors.length}</strong>{' '}
      contributeur(ice){pluralize(subscribedContributors.length)}.
    </SubscriptionInfo>

    <BackgroundButton onClick={openSubscriptions}>
      Gérer mes abonnements
    </BackgroundButton>

    <table>
      <caption>Trolls</caption>
      <tbody>
        {R.splitEvery(
          nbContributorsPerRow,
          subscribedContributors.slice(0, nbContributorsPerRow * maxNbRows)
        ).map((contributorsChunk, chunkIndex) => (
          <tr key={`chunk${chunkIndex}`}>
            {contributorsChunk.map(contributor => (
              <td key={`contributor${contributor.id}`}>
                <Avatar contributor={contributor} size="small" />
              </td>
            ))}
          </tr>
        ))}
        {subscribedContributors.length > nbContributorsPerRow * maxNbRows && (
          <tr>
            <td colSpan={nbContributorsPerRow}>
              <button onClick={openSubscriptions}>...</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </Container>
);

export default Subscriptions;
