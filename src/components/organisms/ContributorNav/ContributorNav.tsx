import React from 'react';
import BackgroundButton from 'components/atoms/Buttons/BackgroundButton';
import Tab from 'components/atoms/Tab/Tab';
import Container from './Container';

export const ContributorNav = () => (
  <Container>
    <Tab active>Mes abonnements</Tab>
    <Tab>Suggestions</Tab>
    <BackgroundButton>Inviter un ami</BackgroundButton>
  </Container>
);

export default ContributorNav;
