import React from 'react';
import { storiesOf } from '@storybook/react';
import Tab from './Tab';

storiesOf('atoms/Tab', module)
  .add('normal', () => <Tab>Mes abonnements</Tab>)
  .add('active', () => <Tab active>Mes abonnements</Tab>);
