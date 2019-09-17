import React from 'react';
import Button from 'components/atoms/Button';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/atoms/Avatar/Avatar';
import AvatarDefault from 'components/atoms/icons/AvatarDefault';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import StatType from 'components/atoms/Stat/StatType';
import ContributorButton from './ContributorButton';

const ContributorCard = styled.div`
  padding: 12px 15px 10px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 8px;

  ${UserName} {
    max-width: 100%;
  }
`;

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
  display: grid;
  grid-column-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ContributorIntro = styled.p`
  margin: 20px 0 0;
  font-size: 15px;
  color: ${props => props.theme.formBorder};
`;

const ContributionExample = styled(Button)`
  margin-top: 25px;
  font-size: 12px;
  color: ${props => props.theme.activeColor};
`;

interface Props {
  contributor: StatefulContributor;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}

export const ContributorLarge = ({
  contributor,
  onSubscribe,
  onUnsubscribe
}: Props) => (
  <ContributorCard>
    <ContributorWrapper>
      <Avatar>
        {contributor.avatar && contributor.avatar.normal.url ? (
          <img src={contributor.avatar.normal.url} alt={contributor.name} />
        ) : (
          <AvatarDefault />
        )}
      </Avatar>

      <ContributorInfos>
        <UserName>{contributor.name}</UserName>

        <StatsWrapper>
          <Stat>
            {contributor.contributions} <StatType>Bulles</StatType>
          </Stat>
        </StatsWrapper>

        <ContributorButton
          subscribed={contributor.subscribed}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      </ContributorInfos>
    </ContributorWrapper>

    <ContributionExample>Voir un exemple de ses bulles</ContributionExample>

    <ContributorIntro>{contributor.intro}</ContributorIntro>
  </ContributorCard>
);

export default ContributorLarge;
