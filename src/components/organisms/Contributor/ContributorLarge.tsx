import React from 'react';
import styled from 'styled-components';
import { LocationDescriptor, LocationState } from 'history';
import { AvatarSize, StatefulContributor } from 'libs/domain/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import {
  ContributorCard,
  ContributorWrapper,
  ContributorInfos
} from 'components/atoms/Contributor/index';
import { As } from 'types';
import ContributorNameLink from './ContributorNameLink';
import ContributorButton from './ContributorButton';

interface IntroProps {
  intro: string;
}
const ContributorIntro = styled.div.attrs<IntroProps>(
  ({ intro }: IntroProps) => ({
    dangerouslySetInnerHTML: { __html: intro }
  })
)<IntroProps>`
  margin: 16px 0 10px 0;
  font-size: ${props => props.theme.fontSizeDefault};
  color: ${props => props.theme.textColor};

  & > p {
    margin: 0;
  }

  a {
    color: ${props => props.theme.activeColor};
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    font-size: 18px;
  }
`;

interface ContributorLargeProps<S = LocationState> {
  contributor: StatefulContributor;
  avatarSize?: AvatarSize;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  className?: string;
  children?: React.ReactNode;
  onNameClick?: () => void;
  to?: LocationDescriptor<S>;
  loading?: boolean;
  usernameAs?: As;
}

const ContributorLarge = ({
  contributor,
  avatarSize,
  onSubscribe,
  onUnsubscribe,
  children,
  className,
  onNameClick,
  to,
  loading,
  usernameAs
}: ContributorLargeProps) => (
  <ContributorCard contributor={contributor} className={className}>
    <>
      <ContributorWrapper>
        <Avatar
          size={avatarSize || 'normal'}
          contributor={contributor}
          to={to}
          onClick={onNameClick}
          loading={loading}
        />

        <ContributorInfos>
          {!loading && contributor && (
            <>
              <UserName as={usernameAs}>
                <ContributorNameLink onClick={onNameClick} to={to}>
                  {contributor.name}
                </ContributorNameLink>
              </UserName>

              <ContributorButton
                loading={contributor?.subscribing === true}
                subscribed={contributor?.subscribed}
                onSubscribe={onSubscribe}
                onUnsubscribe={onUnsubscribe}
              />
            </>
          )}
        </ContributorInfos>
      </ContributorWrapper>

      {!loading && contributor && (
        <>
          <ContributorIntro intro={contributor.intro || ''} />
          {children}
        </>
      )}
    </>
  </ContributorCard>
);

export default styled(ContributorLarge)``;
