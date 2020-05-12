import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import StatType from 'components/atoms/Stat/StatType';
import BubbleIcon from 'components/atoms/icons/Bubble';
import { ExternalLink } from 'components/atoms';
import ContributorButton from './ContributorButton';
import {
  ContributorCard,
  ContributorWrapper,
  ContributorInfos,
  StatsWrapper
} from 'components/atoms/Contributor/index';

interface IntroProps {
  intro: string;
}
const ContributorIntro = styled.div.attrs<IntroProps>(
  ({ intro }: IntroProps) => ({
    dangerouslySetInnerHTML: { __html: intro }
  })
)<IntroProps>`
  margin: 20px 0 0;
  font-size: 15px;
  color: ${props => props.theme.contributorIntro};

  & > p {
    margin: 0;
  }

  a {
    color: ${props => props.theme.activeColor};
  }
`;

interface ContributionExampleProps {
  highlighted?: boolean;
}

export const ContributorLink = styled(ExternalLink)<ContributionExampleProps>`
  display: inline-block;
  margin-top: 18px;
  font-size: 12px;
  color: ${props =>
    props.highlighted ? props.theme.highlightedLink : props.theme.activeColor};
  text-transform: uppercase;
`;

interface Props {
  contributor: StatefulContributor;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  className?: string;
  link?: React.ReactElement;
}

const ContributorLarge = ({
  contributor,
  onSubscribe,
  onUnsubscribe,
  link,
  className
}: Props) => (
  <ContributorCard className={className}>
    <ContributorWrapper>
      <Avatar size="normal" contributor={contributor} />

      <ContributorInfos>
        <UserName>
          <span>{contributor.name}</span>
        </UserName>

        <StatsWrapper>
          <Stat>
            <BubbleIcon /> {contributor.contributions}{' '}
            <StatType>contributions</StatType>
          </Stat>
        </StatsWrapper>

        <ContributorButton
          subscribed={contributor.subscribed}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      </ContributorInfos>
    </ContributorWrapper>

    <ContributorIntro
      intro={contributor.intro || 'Description non renseignée'}
    />
    {link}
  </ContributorCard>
);

ContributorLarge.defaultProps = {
  showExamshowExampleLinkpleLink: false,
  highlightExampleLink: false,
  showContributionsLink: false
};

export default styled(ContributorLarge)``;
