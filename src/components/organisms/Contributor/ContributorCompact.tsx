import React from 'react';
import { LocationDescriptor, LocationState } from 'history';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import ContributorButton from './ContributorButton';
import Link from 'components/atoms/Link';
import ContributorWrapper from 'components/atoms/Contributor/ContributorWrapper';

const Wrapper = styled(ContributorWrapper)`
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
`;

interface Props<S = LocationState> {
  contributor: StatefulContributor;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  to?: LocationDescriptor<S>;
  className?: string;
}
export const ContributorCompact = ({
  contributor,
  onSubscribe,
  onUnsubscribe,
  to,
  className
}: Props) => (
  <Wrapper className={className}>
    <Avatar contributor={contributor} size="small" to={to} />

    <ContributorInfos>
      <UserName>
        <Link to={to}>{contributor.name}</Link>
      </UserName>
    </ContributorInfos>

    <ContributorButton
      subscribed={contributor.subscribed}
      onSubscribe={onSubscribe}
      onUnsubscribe={onUnsubscribe}
    />
  </Wrapper>
);

export default styled(ContributorCompact)``;
