import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Notification from 'components/organisms/Notification';
import ContributeScreen from './ContributeScreen';
import { formStoreDecorator } from '../../../../../../.storybook/config';

storiesOf('screens/Contribute/Submit', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Notification title="créer une bulle ici">{getStory()}</Notification>
    </Router>
  ))
  .add('normal', () => <ContributeScreen />);
