import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Notification from 'components/organisms/Notification';
import NoNoticeScreen from './NoNoticeScreen';

storiesOf('Extension/Notice', module)
  .addDecorator(getStory => (
    <Router>
      <Notification>{getStory()}</Notification>
    </Router>
  ))
  .add('NoNotice', () => <NoNoticeScreen />);
