import React from 'react';
import styled from 'styled-components';
import { LocationDescriptor, LocationState } from 'history';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import ContributorButton from './ContributorButton';
import {
  ContributorCard,
  ContributorWrapper,
  ContributorInfos
} from 'components/atoms/Contributor/index';
import Link from 'components/atoms/Link';

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
  contributor?: StatefulContributor;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  className?: string;
  children?: React.ReactNode;
  to?: LocationDescriptor<S>;
  loading?: boolean;
}

const ContributorLarge = ({
  contributor,
  onSubscribe,
  onUnsubscribe,
  children,
  className,
  to,
  loading
}: ContributorLargeProps) => (
  <ContributorCard className={className}>
    <>
      <ContributorWrapper>
        <Avatar
          size="normal"
          contributor={contributor}
          to={to}
          loading={loading}
        />

        <ContributorInfos>
          {!loading && contributor && (
            <>
              <UserName>
                <Link to={to}>{contributor.name}</Link>
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
          <ContributorIntro
            intro={contributor.intro || 'Description non renseignée'}
          />
          {children}
        </>
      )}
    </>
  </ContributorCard>
);

export default styled(ContributorLarge)``;
