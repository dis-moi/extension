import React from 'react';
import Button from 'components/atoms/Button';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import StatType from 'components/atoms/Stat/StatType';
import ContributorButton from './ContributorButton';
import BubbleIcon from 'components/atoms/icons/Bubble';

const ContributorCard = styled.div`
  padding: 12px 15px 10px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 8px;

  ${UserName} {
    margin-bottom: 5px;
  }
`;

const ContributorWrapper = styled.div`
  display: flex;
`;

const ContributorInfos = styled.div`
  margin-left: 15px;
`;

const StatsWrapper = styled.div`
  width: 100%;

  ${BubbleIcon} {
    margin-right: 6px;
  }
`;

const ContributorIntro = styled.p`
  margin: 20px 0 0;
  font-size: 15px;
  color: ${props => props.theme.formBorder};
`;

interface ContributionExampleProps {
  highlighted?: boolean;
}

const ContributionExample = styled(Button)<ContributionExampleProps>`
  margin-top: 25px;
  font-size: 12px;
  color: ${props =>
    props.highlighted ? props.theme.highlightedLink : props.theme.activeColor};
`;

interface Props {
  contributor: StatefulContributor;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  showExampleLink?: boolean;
  highlightExampleLink?: boolean;
}

const ContributorLarge = ({
  contributor,
  onSubscribe,
  onUnsubscribe,
  showExampleLink,
  highlightExampleLink
}: Props) => (
  <ContributorCard>
    <ContributorWrapper>
      <Avatar size="normal" contributor={contributor} />

      <ContributorInfos>
        <UserName>
          <span>{contributor.name}</span>
        </UserName>

        <StatsWrapper>
          <Stat>
            <BubbleIcon /> {contributor.contributions}{' '}
            <StatType>Bulles</StatType>
          </Stat>
        </StatsWrapper>

        <ContributorButton
          subscribed={contributor.subscribed}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      </ContributorInfos>
    </ContributorWrapper>

    {showExampleLink && (
      <ContributionExample highlighted={highlightExampleLink}>
        Voir un exemple de ses bulles
      </ContributionExample>
    )}

    <ContributorIntro>{contributor.intro}</ContributorIntro>
  </ContributorCard>
);

ContributorLarge.defaultProps = {
  showExampleLink: false,
  highlightExampleLink: false
};

export default ContributorLarge;
