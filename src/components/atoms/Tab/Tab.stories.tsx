import React from 'react';
import { storiesOf } from '@storybook/react';
import Tab from './Tab';

storiesOf('Components/Atoms/Tab', module)
  .add('normal', () => <Tab to={'/mes-abonnements'}>Mes abonnements</Tab>)
  .add('active', () => (
    <Tab to={'/mes-abonnements'} isActive={() => true}>
      Mes abonnements
    </Tab>
  ));
