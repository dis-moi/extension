import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import Error from '.';
import { MemoryRouter as Router } from 'react-router';

storiesOf('Extension', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('Error', () => <Error />);
