import React from 'react';
import Avatar from 'components/atoms/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import StatType from 'components/atoms/Stat/StatType';
import Container from './Container';
import ContributorInfosWrapper from './ContributorInfosWrapper';
import ContributorInfos from './ContributorInfos';
import ContributorDescription from './ContributorDescription';
import StatsWrapper from './StatsWrapper';
import ContributorButton from './ContributorButton';

export const ContributorNav = () => (
  <Container>
    <ContributorInfosWrapper>
      <Avatar />

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
    </ContributorInfosWrapper>

    <ContributorDescription>
      Passionné d’infos et s’intox, je vous préviens parfois (mais pas toujours
      ^^) quand vous êtes en train de consulter un hoax, c’est-à-dire un message
      poignant, révoltant ou alarmant… mais faux ! Mes sources : Hoaxbuster,
      HoaxKiller, Hoaxteam, Secuser.com.
    </ContributorDescription>
  </Container>
);

export default ContributorNav;
