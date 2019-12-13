import React from 'react';
import styled from 'types/styled-components';
import DetailsContent from 'components/organisms/NoticeDetails/DetailsContent';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { StatefulContributor } from 'app/lmem/contributor';

export interface ContributorScreenProps {
  contributor: StatefulContributor;
  subscribe: () => void;
  unsubscribe: () => void;
}

const Content = styled(DetailsContent)`
  padding: 0;
`;

export const ContributorScreen = ({
  contributor,
  subscribe,
  unsubscribe
}: ContributorScreenProps) => (
  <Content>
    <ContributorLarge
      contributor={contributor}
      onSubscribe={subscribe}
      onUnsubscribe={unsubscribe}
    />
  </Content>
);

export default ContributorScreen;
