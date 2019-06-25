import React from 'react';
import Container from './Container';
import ContributorDescription from './ContributorDescription';
import ContributorLarge from '../Contributor/ContributorLarge';

export const ContributorNav = () => (
  <Container>
    <ContributorLarge />

    <ContributorDescription>
      Passionné d’infos et s’intox, je vous préviens parfois (mais pas toujours
      ^^) quand vous êtes en train de consulter un hoax, c’est-à-dire un message
      poignant, révoltant ou alarmant… mais faux ! Mes sources : Hoaxbuster,
      HoaxKiller, Hoaxteam, Secuser.com.
    </ContributorDescription>
  </Container>
);

export default ContributorNav;
