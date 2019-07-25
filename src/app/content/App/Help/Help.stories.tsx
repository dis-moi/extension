import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import { Help } from '.';

storiesOf('screens/Help', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('normal', () => <Help />);
