import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { Filters } from './Filters';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';

storiesOf('screens/Filters', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('normal', () => <Filters />);
