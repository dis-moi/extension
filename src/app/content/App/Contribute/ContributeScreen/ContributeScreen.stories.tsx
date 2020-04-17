import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Notification from 'components/organisms/Notification';
import ContributeScreen from './ContributeScreen';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';

storiesOf('Extension/Contribute', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Notification title="poster une information ici">
        {getStory()}
      </Notification>
    </Router>
  ))
  .add('01-Submit', () => <ContributeScreen />);
