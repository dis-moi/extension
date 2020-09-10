import React from 'react';
import { LocationDescriptor, LocationState } from 'history';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserNameCompact';
import ContributorButton from './ContributorButton';
import ContributorNameLink from './ContributorNameLink';
import ContributorWrapper from 'components/atoms/Contributor/ContributorWrapper';

const Wrapper = styled(ContributorWrapper)`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${props => props.theme.bottomBar};

  &:first-of-type {
    border-top: 1px solid ${props => props.theme.bottomBar};
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
  onNameClick?: () => void;
  className?: string;
}
export const ContributorCompact = ({
  contributor,
  onSubscribe,
  onUnsubscribe,
  onNameClick,
  to,
  className
}: Props) => (
  <Wrapper className={className}>
    <Avatar
      contributor={contributor}
      size="small"
      to={to}
      onClick={onNameClick}
    />

    <ContributorInfos>
      <UserName>
        <ContributorNameLink onClick={onNameClick} to={to}>
          {contributor.name}
        </ContributorNameLink>
      </UserName>
    </ContributorInfos>

    <ContributorButton
      loading={contributor.subscribing}
      subscribed={contributor.subscribed}
      onSubscribe={onSubscribe}
      onUnsubscribe={onUnsubscribe}
    />
  </Wrapper>
);

export default styled(ContributorCompact)``;
