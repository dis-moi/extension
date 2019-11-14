import React from 'react';
import styled from 'types/styled-components';
import DetailsContent from 'components/organisms/NoticeDetails/DetailsContent';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import { Contributor } from 'app/lmem/contributor';

interface Props {
  contributor: Contributor;
}

const Content = styled(DetailsContent)`
  padding: 0;
`;

export const ContributorScreen = ({ contributor }: Props) => (
  <Content>
    <ContributorLarge
      contributor={contributor}
      onSubscribe={() => {}}
      onUnsubscribe={() => {}}
    />
  </Content>
);

export default ContributorScreen;
