import React from 'react';
import Tab from 'components/atoms/Tab/Tab';
import Container from './Container';

export const ContributorNav = () => (
  <Container>
    <Tab active>Mes abonnements</Tab>
    <Tab>Suggestions</Tab>
  </Container>
);

export default ContributorNav;
