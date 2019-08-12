import React from 'react';
import BackgroundButton from 'components/atoms/Button/BackgroundButton';
import Tab from 'components/atoms/Tab/Tab';
import Container from './Container';

export const ContributorNav = () => (
  <Container>
    <Tab active>Mes abonnements</Tab>
    <Tab>Suggestions</Tab>
  </Container>
);

export default ContributorNav;
