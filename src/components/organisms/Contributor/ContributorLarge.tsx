import React from 'react';
import styled, { css } from 'styled-components';

import Button from 'components/atoms/Button';
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

export const Contributor = () => (
  <ContributorCard>
    <ContributorWrapper>
      <Avatar>
        <AvatarDefault />
      </Avatar>

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

    <ContributionExample>Voir un exemple de ses bulles</ContributionExample>

    <ContributorIntro>
      Passionné d’infos et s’intox, je vous préviens parfois (mais pas toujours
      ^^) quand vous êtes en train de consulter un hoax, c’est-à-dire un message
      poignant, révoltant ou alarmant… mais faux ! Mes sources : Hoaxbuster,
      HoaxKiller, Hoaxteam, Secuser.com.
    </ContributorIntro>
  </ContributorCard>
);

export default Contributor;
