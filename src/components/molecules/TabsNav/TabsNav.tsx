import React from 'react';
import Container from './Container';
import Tab from 'components/atoms/Tab/Tab';

const TabsNav = () => {
  return (
    <Container>
      <Tab active>Mes Abonnements</Tab>
      <Tab>Suggestions</Tab>
    </Container>
  );
};

export default TabsNav;
