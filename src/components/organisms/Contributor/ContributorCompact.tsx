import React from 'react';
import styled, { css } from 'styled-components';

import Avatar from 'components/atoms/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Like from '../../atoms/icons/types/Like';
import Stat from 'components/atoms/Stat/Stat';
import StatType from 'components/atoms/Stat/StatType';
import ContributorButton from './ContributorButton';

const ContributorWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${props => props.theme.bottomBar};

  &:first-of-type {
    border-top: 1px solid ${props => props.theme.bottomBar};
  }

  ${Avatar} {
    width: 42px;
    height: 42px;
  }

  ${UserName} {
    font-size: 16px;
  }
`;

const ContributorInfos = styled.div`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 10px;

  ${UserName} {
    margin-bottom: 5px;
  }
`;

const StatsWrapper = styled.div`
  display: flex;

  ${Stat} {
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
    font-size: 12px;
  }
`;

const StatIcon = styled.div`
  & > svg {
    stroke: ${props => props.theme.secondaryColor};
    fill: #fff;
    transform: scale(-1, 1);
    width: 10px;
    height: auto;
    margin-right: 3px;
  }
`;

export const Contributor = () => (
  <ContributorWrapper>
    <Avatar />

    <ContributorInfos>
      <UserName>Jean Michel</UserName>

      <StatsWrapper>
        <Stat>
          <StatIcon>
            <Like />
          </StatIcon>{' '}
          120
        </Stat>
        <Stat>
          <StatIcon /> 120
        </Stat>
      </StatsWrapper>
    </ContributorInfos>

    <ContributorButton />
  </ContributorWrapper>
);

export default Contributor;
