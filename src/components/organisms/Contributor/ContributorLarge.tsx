import React from 'react';
import styled, { css } from 'styled-components';

import Avatar from 'components/atoms/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import StatType from 'components/atoms/Stat/StatType';
import ContributorButton from './ContributorButton';

const ContributorWrapper = styled.div`
  display: flex;
`;

const ContributorInfos = styled.div`
  flex-grow: 1;
  margin-right: 36px;
  margin-left: 15px;

  ${UserName} {
    margin-bottom: 5px;
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Contributor = () => (
  <ContributorWrapper>
    <Avatar />

    <ContributorInfos>
      <UserName>Jean Michel</UserName>

      <StatsWrapper>
        <Stat>
          120 <StatType>Bulles</StatType>
        </Stat>
        <Stat>
          120 <StatType>J'aime</StatType>
        </Stat>
        <Stat>
          120 <StatType>Abonnés</StatType>
        </Stat>
      </StatsWrapper>

      <ContributorButton />
    </ContributorInfos>
  </ContributorWrapper>
);

export default Contributor;
