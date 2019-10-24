import React from 'react';
import Avatar from 'components/molecules/Avatar/Avatar';
import { StatefulContributor } from 'app/lmem/contributor';
import styled from 'styled-components';
import SubscriptionListItem from '../SubscriptionsListItem';

const SubscriptionsRow = styled.ul`
  display: flex;
  padding-left: 0;
  list-style-type: none;
`;

const SeeSubscriptions = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  line-height: 1;
  font-weight: bold;
  background-color: ${props => props.theme.contributorGrey};
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

interface SubscriptionsListRowProps {
  contributors: StatefulContributor[];
  rowIndex: number;
  lastRow: boolean;
  openSubscriptions: () => void;
}

const SubscriptionsListRow = ({
  contributors,
  rowIndex,
  lastRow,
  openSubscriptions
}: SubscriptionsListRowProps) => (
  <SubscriptionsRow key={`chunk${rowIndex}`}>
    {contributors.map(contributor => (
      <SubscriptionListItem key={`contributor${contributor.id}`}>
        <Avatar contributor={contributor} size="small" />
      </SubscriptionListItem>
    ))}
    {lastRow && (
      <SubscriptionListItem>
        <SeeSubscriptions onClick={openSubscriptions} title="Voir tout">
          ...
        </SeeSubscriptions>
      </SubscriptionListItem>
    )}
  </SubscriptionsRow>
);

export default SubscriptionsListRow;
