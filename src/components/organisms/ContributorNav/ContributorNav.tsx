import BackgroundButton from 'components/atoms/Buttons/BackgroundButton/BackgroundButton';
import Tab from 'components/atoms/Tab/Tab';
import Container from './Container';
import React from 'react';

export const ContributorNav = () => (
  <Container>
    <Tab active>Mes abonnements</Tab>
    <Tab>Suggestions</Tab>
    <BackgroundButton>Inviter un ami</BackgroundButton>
  </Container>
);

export default ContributorNav;
