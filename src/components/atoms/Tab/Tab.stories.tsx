import React from 'react';
import Tab from './Tab';

export default {
  title: 'Components/Atoms/Tab'
};

export const Normal = () => <Tab to={'/mes-abonnements'}>Mes abonnements</Tab>;

Normal.story = {
  name: 'normal'
};

export const Active = () => (
  <Tab to={'/mes-abonnements'} isActive={() => true}>
    Mes abonnements
  </Tab>
);

Active.story = {
  name: 'active'
};
