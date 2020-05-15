import React from 'react';
import { LocationDescriptor, LocationState } from 'history';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import ContributorButton from './ContributorButton';
import Link from 'components/atoms/Link';

const ContributorWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${props => props.theme.bottomBar};

  &:first-of-type {
    border-top: 1px solid ${props => props.theme.bottomBar};
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
    font-size: 12px;
  }
`;

interface Props<S = LocationState> {
  contributor: StatefulContributor;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  to?: LocationDescriptor<S>;
}
export const ContributorCompact = ({
  contributor,
  onSubscribe,
  onUnsubscribe,
  to
}: Props) => (
  <ContributorWrapper>
    <Avatar contributor={contributor} size="small" to={to} />

    <ContributorInfos>
      <UserName>
        <Link to={to}>{contributor.name}</Link>
      </UserName>

      <StatsWrapper>
        <Stat>{contributor.contributions} contrib.</Stat>
      </StatsWrapper>
    </ContributorInfos>

    <ContributorButton
      subscribed={contributor.subscribed}
      onSubscribe={onSubscribe}
      onUnsubscribe={onUnsubscribe}
    />
  </ContributorWrapper>
);

export default ContributorCompact;
